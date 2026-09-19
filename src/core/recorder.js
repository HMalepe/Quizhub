import {
  ALL_FORMATS,
  AudioBufferSink,
  AudioBufferSource,
  BlobSource,
  BufferTarget,
  CanvasSource,
  Input,
  Mp4OutputFormat,
  Output,
  Quality,
  WebMOutputFormat,
  canEncodeAudio,
  getFirstEncodableAudioCodec,
  getFirstEncodableVideoCodec
} from 'mediabunny';
import { CANVAS, CAPTURE, ENCODING } from './config.js';
import { MicCapture } from './micCapture.js';

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
 * Audio is recorded with a sidecar MediaRecorder on the mic track — that
 * encoder runs off the main thread, so canvas encode cannot starve it (the
 * crackle). After the take, those samples are muxed into the MP4. MicCapture
 * remains only when the browser cannot MediaRecorder the mic.
 *
 * Video uses `latencyMode: 'quality'` so the encoder is not allowed to drop
 * frames to keep a realtime budget. If we cannot encode a 30fps slot in time,
 * the current canvas is written with a duration that covers the gap — a held
 * frame, not a hole in the timeline (holes play as a hitch or a freeze).
 * Snapshots are taken after each completed paint so a frame cannot tear.
 *
 * Frame delivery for the fallback is still left to `captureStream(fps)`.
 * Driving it by hand with `captureStream(0)` plus `requestFrame()` stopped
 * delivering video after ~10 seconds on iOS Safari. Don't reintroduce that
 * on the fallback.
 */

const AUDIO_MIME_CANDIDATES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4'
];

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

export { ensureAacEncoder, pickAudioEncode };

async function pickAudioEncode(preferred, sampleRate) {
  const quality = new Quality({ bitrate: ENCODING.audioBitsPerSecond, bitrateMode: 'constant' });
  const tries = [
    { numberOfChannels: 1, sampleRate },
    { numberOfChannels: 2, sampleRate },
    { numberOfChannels: 2, sampleRate: 48000 },
    { numberOfChannels: 1, sampleRate: 48000 }
  ];
  for (const t of tries) {
    const codec = await getFirstEncodableAudioCodec(preferred, { quality, ...t });
    if (codec) return { codec, quality, ...t };
  }
  return null;
}

function pickAudioMimeType() {
  if (typeof MediaRecorder === 'undefined') return null;
  for (const type of AUDIO_MIME_CANDIDATES) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return '';
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
    quality: new Quality({ bitrate: ENCODING.videoBitsPerSecond, bitrateMode: 'variable' }),
    latencyMode: 'quality'
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
    this._mediaStartedAt = 0;
    this._resetWebCodecs();
  }

  _resetWebCodecs() {
    this._output = null;
    this._target = null;
    this._videoSource = null;
    this._audioSource = null;
    this._micCapture = null;
    this._sidecar = null;
    this._sidecarChunks = [];
    this._pcmChunks = [];
    this._audioChain = Promise.resolve();
    this._captureTimer = null;
    this._readyForMoreFrames = true;
    this._lastFrameNumber = -1;
    this._owedFrame = -1;
    this._startTime = 0;
    this._stopping = false;
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

  get elapsedSeconds() {
    if (!this.recording) return 0;
    if (this._engine === 'webcodecs' && this._startTime) {
      return (nowMs() - this._startTime) / 1000;
    }
    if (this._mediaStartedAt) return (nowMs() - this._mediaStartedAt) / 1000;
    return 0;
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

    this._pcmChunks = [];
    let audioSampleRate = 48000;
    if (this.audioTrack && this.audioTrack.getSettings) {
      audioSampleRate = this.audioTrack.getSettings().sampleRate || audioSampleRate;
    }

    // PCM first. Sidecar MediaRecorder is a fallback: Safari's audio/mp4
    // sidecar often muxes an empty track, which plays as silence.
    if (this.audioTrack) {
      const micCapture = new MicCapture();
      try {
        await micCapture.start(this.audioTrack);
        if (micCapture.active) {
          this._micCapture = micCapture;
          audioSampleRate = micCapture.sampleRate || audioSampleRate;
        } else {
          await micCapture.stop();
        }
      } catch (err) {
        console.warn('Mic capture failed:', err);
        await micCapture.stop();
      }
    }

    const sidecarMime = (!this._micCapture && this.audioTrack) ? pickAudioMimeType() : null;
    const useSidecar = Boolean(!this._micCapture && this.audioTrack && sidecarMime);

    const wantAudio = Boolean(this._micCapture || useSidecar);
    const encode = wantAudio ? await pickAudioEncode(preferredAudio, audioSampleRate) : null;

    const target = new BufferTarget();
    const output = new Output({ format, target });

    const videoSource = new CanvasSource(this.canvas, {
      codec: videoCodec,
      quality: new Quality({ bitrate: ENCODING.videoBitsPerSecond, bitrateMode: 'variable' }),
      keyFrameInterval: ENCODING.keyFrameInterval,
      latencyMode: 'quality',
      hardwareAcceleration: 'prefer-hardware',
      contentHint: 'motion',
      onEncodedPacket: (packet) => {
        this._encodedVideoFrames += 1;
        this.byteCount += packet.byteLength;
      }
    });
    output.addVideoTrack(videoSource, { frameRate: CAPTURE.fps });

    if (wantAudio && encode) {
      const audioSource = new AudioBufferSource({
        codec: encode.codec,
        quality: encode.quality,
        transform: { numberOfChannels: encode.numberOfChannels, sampleRate: encode.sampleRate }
      }, { startTimestamp: 0 });
      output.addAudioTrack(audioSource);
      this._audioSource = audioSource;
    } else {
      if (this._micCapture) {
        await this._micCapture.stop();
        this._micCapture = null;
      }
      if (this.audioTrack && wantAudio && !encode) {
        console.warn('Mic is live but this browser cannot encode audio; recording video only.');
      }
    }

    this._engine = 'webcodecs';
    this._output = output;
    this._target = target;
    this._videoSource = videoSource;
    await output.start();
    // Clock starts after the encoder is actually open. Starting it earlier
    // made video cover the init delay while the mic was still discarded, so
    // the file had a frozen first second and short audio.
    this._startTime = nowMs();
    if (this._micCapture && this._audioSource) {
      this._micCapture.onBuffer = (buffer) => {
        this._pcmChunks.push(buffer);
      };
      this._micCapture.enable();
    }
    if (useSidecar && this._audioSource) this._startSidecarAudio();

    this.recorder = { state: 'recording' };
    return true;
  }

  _enqueueAudio(buffer) {
    if (!this._audioSource) return;
    this._audioChain = this._audioChain
      .then(() => {
        if (!this._audioSource) return;
        return this._audioSource.add(buffer);
      })
      .catch((err) => {
        console.error('Audio encode failed:', err);
      });
  }

  _startSidecarAudio() {
    const mimeType = pickAudioMimeType();
    if (mimeType === null || !this.audioTrack) return;
    this._sidecarChunks = [];
    const options = { audioBitsPerSecond: ENCODING.audioBitsPerSecond };
    if (mimeType) options.mimeType = mimeType;
    this._sidecar = new MediaRecorder(new MediaStream([this.audioTrack]), options);
    this._sidecar.ondataavailable = (event) => {
      if (event.data && event.data.size) this._sidecarChunks.push(event.data);
    };
    this._sidecar.start();
  }

  _stopSidecarAudio() {
    return new Promise((resolve) => {
      if (!this._sidecar) {
        resolve(null);
        return;
      }
      const recorder = this._sidecar;
      const finish = () => {
        const mimeType = recorder.mimeType || 'audio/webm';
        const blob = new Blob(this._sidecarChunks, { type: mimeType });
        this._sidecar = null;
        this._sidecarChunks = [];
        resolve(blob.size ? blob : null);
      };
      recorder.onstop = finish;
      recorder.onerror = finish;
      try {
        if (typeof recorder.requestData === 'function') recorder.requestData();
        recorder.stop();
      } catch {
        finish();
      }
    });
  }

  async _ingestSidecarAudio(blob) {
    if (!blob || !this._audioSource) return;
    const input = new Input({
      source: new BlobSource(blob),
      formats: ALL_FORMATS
    });
    const track = await input.getPrimaryAudioTrack();
    if (!track) return;
    const sink = new AudioBufferSink(track);
    for await (const wrapped of sink.buffers()) {
      await this._audioSource.add(wrapped.buffer);
    }
  }

  _beginCapture() {
    this._readyForMoreFrames = true;
    this._lastFrameNumber = -1;
    this._owedFrame = -1;
    this.captureFrame();
    // Safety net if the draw loop stalls: keep writing the last canvas so the
    // file has a continuous video track instead of a hole that players freeze on.
    this._captureTimer = setInterval(() => {
      if (!this.recording || this._engine !== 'webcodecs') return;
      const expected = Math.floor(((nowMs() - this._startTime) / 1000) * CAPTURE.fps);
      if (expected - this._lastFrameNumber >= 2) this.captureFrame();
    }, 1000 / CAPTURE.fps);
  }

  /**
   * Snapshot the canvas into the next 30fps slot. Called after each completed
   * paint so we never encode a half-drawn frame. Safe to call often — duplicate
   * slot numbers are ignored.
   */
  captureFrame() {
    if (!this.recording || this._stopping || this._engine !== 'webcodecs') return;
    if (!this._videoSource || !this._output || this._output.state !== 'started') return;

    const elapsedSeconds = (nowMs() - this._startTime) / 1000;
    const frameNumber = Math.max(0, Math.floor(elapsedSeconds * CAPTURE.fps + 1e-6));
    if (frameNumber <= this._lastFrameNumber) return;

    if (!this._readyForMoreFrames) {
      this._owedFrame = frameNumber;
      return;
    }

    void this._commitVideo(frameNumber);
  }

  async _commitVideo(frameNumber) {
    if (!this._videoSource || !this._output || this._output.state !== 'started') return;
    if (frameNumber <= this._lastFrameNumber) return;

    const from = this._lastFrameNumber + 1;
    const fps = CAPTURE.fps;
    this._readyForMoreFrames = false;
    try {
      // Duration covers every skipped slot so the timeline has no holes.
      await this._videoSource.add(from / fps, (frameNumber - this._lastFrameNumber) / fps);
      this._lastFrameNumber = frameNumber;
      // Let queued mic worklet messages run. Video encode is heavy; without
      // a yield the port overflows and those samples never get muxed.
      await new Promise((resolve) => setTimeout(resolve, 0));
    } catch (err) {
      console.error('Frame encode failed:', err);
    } finally {
      this._readyForMoreFrames = true;
      if (this.recording && this._owedFrame > this._lastFrameNumber) {
        const next = this._owedFrame;
        this._owedFrame = this._lastFrameNumber;
        void this._commitVideo(next);
      }
    }
  }

  async resumeCapture() {
    if (this._micCapture) await this._micCapture.resume();
  }

  _stopCapture() {
    if (this._captureTimer) {
      clearInterval(this._captureTimer);
      this._captureTimer = null;
    }
  }

  async _abortWebCodecs() {
    this._stopCapture();
    if (this._micCapture) {
      this._micCapture.onBuffer = null;
      await this._micCapture.stop();
    }
    await this._stopSidecarAudio().catch(() => null);
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
    this._mediaStartedAt = nowMs();
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
    this._stopping = true;
    this._stopCapture();

    const lastFrame = Math.max(0, Math.floor(((nowMs() - this._startTime) / 1000) * CAPTURE.fps));
    const waitUntil = performance.now() + 2000;
    while (!this._readyForMoreFrames && performance.now() < waitUntil) {
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    if (lastFrame > this._lastFrameNumber) await this._commitVideo(lastFrame);

    if (this._micCapture) {
      await this._micCapture.flush();
      this._micCapture.onBuffer = null;
      await this._micCapture.stop();
      this._micCapture = null;
    }

    const sidecarBlob = await this._stopSidecarAudio();
    if (this._audioSource && this._pcmChunks.length) {
      for (const buf of this._pcmChunks) {
        await this._audioSource.add(buf);
      }
    } else if (sidecarBlob && this._audioSource) {
      await this._ingestSidecarAudio(sidecarBlob);
    } else if (this._audioSource) {
      console.warn('No mic samples were captured; the file will be silent.');
    }
    this._pcmChunks = [];

    await this._audioChain;

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
    return { url, filename: `trivia-reel-${Date.now()}${ext}`, blob };
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
        resolve({ url, filename: `trivia-reel-${Date.now()}.${ext}`, blob });
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
