import { CAPTURE, ENCODING } from './config.js';

/**
 * Records the composited canvas to a file.
 *
 * Carries one audio track: your mic, so your answering voice is in the file
 * and in sync with the footage. App-generated sound (ticks, buzzer, stings)
 * still goes on in CapCut, so you can retime it freely.
 *
 * Codec note: Safari historically only supports MP4 here while Chrome/Firefox
 * prefer WebM, so we probe in preference order rather than hardcoding.
 */

const MIME_CANDIDATES = [
  'video/mp4;codecs=avc1', // Safari-friendly, and CapCut ingests mp4 cleanly
  'video/webm;codecs=vp9',
  'video/webm;codecs=vp8',
  'video/webm',
  'video/mp4'
];

export function pickMimeType() {
  if (typeof MediaRecorder === 'undefined') return null;
  for (const type of MIME_CANDIDATES) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return '';
}

export function isRecordingSupported() {
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
    this._videoTrack = null;
    this._manualFrames = false;
    this._lastFrameAt = 0;
  }

  /**
   * Called by the renderer after each painted frame.
   *
   * When the browser supports it we drive capture by hand rather than letting
   * `captureStream(fps)` sample the canvas on its own clock. Two independent
   * clocks — our draw loop and the sampler — drift against each other, and the
   * recorded gaps come out uneven (measured 16–95ms against a 33ms ideal) even
   * though every frame was drawn on time. Handing the encoder exactly one
   * frame per drawn frame, gated to the target rate, keeps the cadence even.
   */
  captureFrame() {
    if (!this.recording || !this._manualFrames) return;
    const now = performance.now();
    if (now - this._lastFrameAt < 1000 / CAPTURE.maxFps - 1) return;
    this._lastFrameAt = now;
    this._videoTrack.requestFrame();
  }

  start() {
    if (this.recording) return;

    const mimeType = pickMimeType();
    if (mimeType === null) {
      throw new Error('MediaRecorder is not supported in this browser.');
    }

    // Revoke the previous blob URL so repeated takes don't leak memory.
    if (this.lastUrl) {
      URL.revokeObjectURL(this.lastUrl);
      this.lastUrl = null;
    }

    // frameRate 0 means "only capture when requestFrame() is called". Safari's
    // support for that is shaky and a track that never emits would record a
    // frozen video, so fall back to automatic sampling when it's missing.
    const probe = this.canvas.captureStream(0);
    const [probeTrack] = probe.getVideoTracks();
    this._manualFrames = Boolean(probeTrack && typeof probeTrack.requestFrame === 'function');

    let stream;
    if (this._manualFrames) {
      stream = probe;
    } else {
      probe.getTracks().forEach((t) => t.stop());
      stream = this.canvas.captureStream(CAPTURE.fallbackFps);
    }

    [this._videoTrack] = stream.getVideoTracks();
    this._lastFrameAt = 0;

    const tracks = [...stream.getVideoTracks()];
    if (this.audioTrack) tracks.push(this.audioTrack);
    const output = new MediaStream(tracks);

    this.chunks = [];
    const options = {
      videoBitsPerSecond: ENCODING.videoBitsPerSecond,
      audioBitsPerSecond: ENCODING.audioBitsPerSecond
    };
    if (mimeType) options.mimeType = mimeType;
    this.recorder = new MediaRecorder(output, options);

    this.recorder.ondataavailable = (event) => {
      if (event.data && event.data.size) this.chunks.push(event.data);
    };

    this.recorder.start();
    this.recording = true;
  }

  /** @returns {Promise<{url: string, filename: string}>} */
  stop() {
    return new Promise((resolve, reject) => {
      if (!this.recorder || !this.recording) {
        reject(new Error('Not currently recording.'));
        return;
      }

      this.recorder.onstop = () => {
        const mimeType = this.recorder.mimeType || 'video/webm';
        const blob = new Blob(this.chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        this.lastUrl = url;
        this.recording = false;
        resolve({ url, filename: `trivia-reel-${Date.now()}.${ext}` });
      };

      this.recorder.onerror = (event) => {
        this.recording = false;
        reject(event.error || new Error('Recording failed.'));
      };

      this.recorder.stop();
    });
  }
}
