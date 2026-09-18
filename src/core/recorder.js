import {
  BufferTarget,
  CanvasSource,
  MediaStreamAudioTrackSource,
  Mp4OutputFormat,
  Output,
  Quality,
  WebMOutputFormat,
  canEncodeAudio,
  getFirstEncodableAudioCodec,
  getFirstEncodableVideoCodec
} from 'mediabunny';
import { CANVAS, CAPTURE, ENCODING } from './config.js';

/**
 * Records the composited canvas to a file, with the mic mixed in.
 *
 * Primary path is WebCodecs via Mediabunny: each painted canvas is encoded
 * directly (H.264 + AAC into MP4). That is the path that actually survives a
 * 60s+ take. The old `canvas.captureStream()` + `MediaRecorder` path is kept
 * only as a fallback for browsers without VideoEncoder — on iOS Safari and
 * desktop Chrome it is the thing that froze video on one frame around 30s
 * while the mic track kept recording.
 *
 * Do not switch the primary path back to captureStream. Safari stops handing
 * canvas frames to MediaRecorder partway through a take; Chrome's muxer often
 * writes a GOP so long that players freeze on the last keyframe. WebCodecs
 * forces a keyframe every `ENCODING.keyFrameInterval` seconds and timestamps
 * video against wall-clock so it stays aligned with the mic.
 *
 * Frame delivery for the fallback is still left to `captureStream(fps)`.
 * Driving it by hand with `captureStream(0)` plus `requestFrame()` stopped
 * delivering video after ~10 seconds on iOS Safari. Don't reintroduce that
 * on the fallback.
 */

const MIME_CANDIDATES = [
  'video/mp4;codecs=avc1',
  'video/webm;codecs=vp9',
  'video/webm;codecs=vp8',
  'video/webm',
  'video/mp4'
];

let aacPolyfill = null;

/** Load the WASM AAC encoder when the browser has no native AudioEncoder AAC. */
export function prefetchEncoders() {
  ensureAacEncoder().catch((err) => {
    console.warn('AAC encoder prefetch failed:', err);
  });
}

async function ensureAacEncoder() {
  if (!aacPolyfill) {
    aacPolyfill = (async () => {
      if (await canEncodeAudio('aac')) return;
      const { registerAacEncoder } = await import('@mediabunny/aac-encoder');
      registerAacEncoder();
    })();
  }
  return aacPolyfill;
}

function pickMimeType() {
  if (typeof MediaRecorder === 'undefined') return null;
  for (const type of MIME_CANDIDATES) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return '';
}

function nowMs() {
  if (typeof document !== 'undefined' && document.timeline) {
    return Number(document.timeline.currentTime);
  }
  return performance.now();
}

function videoEncodeOptions() {
  return {
    width: CANVAS.outputWidth,
    height: CANVAS.outputHeight,
    frameRate: CAPTURE.fps,
    quality: new Quality({ bitrate: ENCODING.videoBitsPerSecond }),
    latencyMode: 'realtime'
  };
}

export function isRecordingSupported() {
  if (typeof VideoEncoder !== 'undefined') return true;
  return typeof MediaRecorder !== 'undefined' && pickMimeType() !== null;
}

export class CanvasRecorder {
  constructor(canvas) {
    this.canvas = canvas;
    this.recorder = null;
    this.chunks = [];
    this.recording = false;
    this.lastUrl = null;
    /**
     * Audio track mixed into the recording — main.js assigns the camera's mic
     * track here at record time. Left null, the recording comes out silent.
     */
    this.audioTrack = null;
    /** @see _startMediaRecorder() — retained so Safari can't collect the canvas capture. */
    this._canvasStream = null;
    this.byteCount = 0;
    this._engine = null;
    this._starting = false;
    this._encodedVideoFrames = 0;
    this._resetWebCodecs();
  }

  _resetWebCodecs() {
    this._output = null;
    this._target = null;
    this._videoSource = null;
    this._audioSource = null;
    this._captureTimer = null;
    this._captureRaf = 0;
    this._readyForMoreFrames = true;
    this._lastFrameNumber = -1;
    this._startTime = 0;
  }

  /** Live capture track, or a stand-in the diagnostics can poll. */
  get videoTrack() {
    if (this._engine === 'webcodecs') {
      return {
        readyState: this.recording ? 'live' : 'ended',
        muted: false,
        enabled: true
      };
    }
    if (!this._canvasStream) return null;
    const [track] = this._canvasStream.getVideoTracks();
    return track || null;
  }

  get chunkCount() {
    return this._engine === 'webcodecs' ? this._encodedVideoFrames : this.chunks.length;
  }

  async start() {
    if (this.recording || this._starting) return;
    this._starting = true;

    try {
      if (this.lastUrl) {
        URL.revokeObjectURL(this.lastUrl);
        this.lastUrl = null;
      }

      this.chunks = [];
      this.byteCount = 0;
      this._encodedVideoFrames = 0;
      this.recorder = null;

      const usedWebCodecs = await this._tryStartWebCodecs();
      if (!usedWebCodecs) this._startMediaRecorder();

      this.recording = true;
      if (this._engine === 'webcodecs') this._beginCapture();
    } catch (err) {
      await this._abortWebCodecs();
      throw err;
    } finally {
      this._starting = false;
    }
  }

  async _tryStartWebCodecs() {
    if (typeof VideoEncoder === 'undefined') return false;

    try {
      await ensureAacEncoder();
    } catch (err) {
      console.warn('AAC encoder unavailable, will try whatever the browser has:', err);
    }

    const encodeOpts = videoEncodeOptions();
    const mp4 = new Mp4OutputFormat({ fastStart: 'in-memory' });
    let format = mp4;
    let videoCodec = await getFirstEncodableVideoCodec(mp4.getSupportedVideoCodecs(), encodeOpts);

    if (!videoCodec) {
      format = new WebMOutputFormat();
      videoCodec = await getFirstEncodableVideoCodec(format.getSupportedVideoCodecs(), encodeOpts);
    }
    if (!videoCodec) return false;

    const preferredAudio = format instanceof Mp4OutputFormat
      ? ['aac', ...format.getSupportedAudioCodecs().filter((c) => c !== 'aac')]
      : ['opus', ...format.getSupportedAudioCodecs().filter((c) => c !== 'opus')];
    const audioCodec = await getFirstEncodableAudioCodec(preferredAudio, {
      quality: new Quality({ bitrate: ENCODING.audioBitsPerSecond })
    });

    const target = new BufferTarget();
    const output = new Output({ format, target });

    const videoSource = new CanvasSource(this.canvas, {
      codec: videoCodec,
      quality: new Quality({ bitrate: ENCODING.videoBitsPerSecond, bitrateMode: 'variable' }),
      keyFrameInterval: ENCODING.keyFrameInterval,
      latencyMode: 'realtime',
      hardwareAcceleration: 'prefer-hardware',
      contentHint: 'motion',
      onEncodedPacket: (packet) => {
        this._encodedVideoFrames += 1;
        this.byteCount += packet.byteLength;
      }
    });
    output.addVideoTrack(videoSource, { frameRate: CAPTURE.fps });

    if (this.audioTrack && audioCodec) {
      const audioSource = new MediaStreamAudioTrackSource(this.audioTrack, {
        codec: audioCodec,
        quality: new Quality({ bitrate: ENCODING.audioBitsPerSecond })
      });
      audioSource.errorPromise.catch((err) => {
        console.error('Audio encode failed:', err);
      });
      output.addAudioTrack(audioSource);
      this._audioSource = audioSource;
    } else if (this.audioTrack && !audioCodec) {
      console.warn('Mic is live but this browser cannot encode audio; recording video only.');
    }

    this._engine = 'webcodecs';
    this._output = output;
    this._target = target;
    this._videoSource = videoSource;
    this._startTime = nowMs();
    await output.start();
    this.recorder = { state: 'recording' };
    return true;
  }

  _beginCapture() {
    this._readyForMoreFrames = true;
    this._lastFrameNumber = -1;
    void this._addVideoFrame();
    this._captureTimer = setInterval(() => {
      void this._addVideoFrame();
    }, 1000 / CAPTURE.fps);
    const tick = () => {
      if (!this.recording || this._engine !== 'webcodecs') return;
      void this._addVideoFrame();
      this._captureRaf = requestAnimationFrame(tick);
    };
    this._captureRaf = requestAnimationFrame(tick);
  }

  async _addVideoFrame() {
    if (!this._videoSource || !this._readyForMoreFrames) return;
    if (!this._output || this._output.state !== 'started') return;

    const elapsedSeconds = (nowMs() - this._startTime) / 1000;
    const frameNumber = Math.round(elapsedSeconds * CAPTURE.fps);
    if (frameNumber < 0 || frameNumber === this._lastFrameNumber) return;

    this._lastFrameNumber = frameNumber;
    this._readyForMoreFrames = false;
    try {
      await this._videoSource.add(frameNumber / CAPTURE.fps, 1 / CAPTURE.fps);
    } catch (err) {
      console.error('Frame encode failed:', err);
    } finally {
      this._readyForMoreFrames = true;
    }
  }

  _stopCapture() {
    if (this._captureTimer) {
      clearInterval(this._captureTimer);
      this._captureTimer = null;
    }
    if (this._captureRaf) {
      cancelAnimationFrame(this._captureRaf);
      this._captureRaf = 0;
    }
  }

  async _abortWebCodecs() {
    this._stopCapture();
    if (this._output && (this._output.state === 'started' || this._output.state === 'pending')) {
      try {
        await this._output.cancel();
      } catch {
        /* already torn down */
      }
    }
    this._resetWebCodecs();
    this._engine = null;
  }

  _startMediaRecorder() {
    const mimeType = pickMimeType();
    if (mimeType === null) {
      throw new Error('MediaRecorder is not supported in this browser.');
    }

    this._canvasStream = this.canvas.captureStream(CAPTURE.fps);
    const tracks = [...this._canvasStream.getVideoTracks()];
    if (this.audioTrack) tracks.push(this.audioTrack);
    const output = new MediaStream(tracks);

    const options = {
      videoBitsPerSecond: ENCODING.videoBitsPerSecond,
      audioBitsPerSecond: ENCODING.audioBitsPerSecond,
      videoKeyFrameIntervalDuration: ENCODING.keyFrameInterval * 1000,
      videoKeyFrameIntervalCount: Math.round(CAPTURE.fps * ENCODING.keyFrameInterval)
    };
    if (mimeType) options.mimeType = mimeType;
    this.recorder = new MediaRecorder(output, options);

    this.recorder.ondataavailable = (event) => {
      if (event.data && event.data.size) {
        this.chunks.push(event.data);
        this.byteCount += event.data.size;
      }
    };

    // No timeslice: chunked Safari MP4 often has no duration and won't seek.
    this.recorder.start();
    this._engine = 'mediarecorder';
  }

  /** @returns {Promise<{url: string, filename: string}>} */
  stop() {
    if (this._engine === 'webcodecs') return this._stopWebCodecs();
    return this._stopMediaRecorder();
  }

  async _stopWebCodecs() {
    if (!this._output || !this.recording) {
      throw new Error('Not currently recording.');
    }

    this.recording = false;
    this._stopCapture();

    const waitUntil = performance.now() + 2000;
    while (!this._readyForMoreFrames && performance.now() < waitUntil) {
      await new Promise((resolve) => setTimeout(resolve, 20));
    }

    try {
      await this._output.finalize();
    } catch (err) {
      await this._abortWebCodecs();
      this.recorder = { state: 'inactive' };
      throw err;
    }

    const buffer = this._target.buffer;
    const mimeType = this._output.format.mimeType;
    const ext = this._output.format.fileExtension;
    const blob = new Blob([buffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    this.lastUrl = url;
    this.recorder = { state: 'inactive' };
    this._resetWebCodecs();
    this._engine = null;
    return { url, filename: `trivia-reel-${Date.now()}${ext}` };
  }

  _stopMediaRecorder() {
    return new Promise((resolve, reject) => {
      if (!this.recorder || !this.recording) {
        reject(new Error('Not currently recording.'));
        return;
      }

      const releaseCanvasStream = () => {
        if (!this._canvasStream) return;
        this._canvasStream.getTracks().forEach((t) => t.stop());
        this._canvasStream = null;
      };

      this.recorder.onstop = () => {
        const mimeType = this.recorder.mimeType || 'video/webm';
        const blob = new Blob(this.chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        this.lastUrl = url;
        this.recording = false;
        this._engine = null;
        releaseCanvasStream();
        resolve({ url, filename: `trivia-reel-${Date.now()}.${ext}` });
      };

      this.recorder.onerror = (event) => {
        this.recording = false;
        this._engine = null;
        releaseCanvasStream();
        reject(event.error || new Error('Recording failed.'));
      };

      this.recorder.stop();
    });
  }
}
