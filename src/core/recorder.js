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
 *
 * Frame delivery is left to `captureStream(fps)`, which samples the canvas on
 * the browser's own clock. Driving it by hand with `captureStream(0)` plus
 * `requestFrame()` paces frames more evenly and was tried — it stopped
 * delivering video after ~10 seconds on iOS Safari while audio kept recording,
 * which is a ruined take. Safari exposes `requestFrame` as a function, so no
 * feature test can tell the working implementation from the broken one. Even
 * pacing is not worth that. Don't reintroduce it.
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
    /** @see start() — retained so Safari can't collect the canvas capture. */
    this._canvasStream = null;
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

    // Held on the instance, not in a local. Only the video *track* ends up in
    // the stream handed to MediaRecorder, so the MediaStream that owns the
    // canvas capture would otherwise be unreachable the moment start() returns.
    // Safari stops the underlying capture when that stream is collected: the
    // video freezes on its last frame a few seconds in while the mic track —
    // owned by `camera`, and therefore still referenced — records on happily.
    this._canvasStream = this.canvas.captureStream(CAPTURE.fps);
    const tracks = [...this._canvasStream.getVideoTracks()];
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

    // Deliberately no timeslice. Chunked recording is a common iOS workaround,
    // but it yields a container with no duration written: the blob plays with
    // `duration === Infinity`, which breaks seeking and made a 75s take report
    // zero presented frames in testing. One blob at stop() keeps the metadata.
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

      // Only the canvas capture — the mic track belongs to `camera` and has to
      // survive for the next take.
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
        releaseCanvasStream();
        resolve({ url, filename: `trivia-reel-${Date.now()}.${ext}` });
      };

      this.recorder.onerror = (event) => {
        this.recording = false;
        releaseCanvasStream();
        reject(event.error || new Error('Recording failed.'));
      };

      this.recorder.stop();
    });
  }
}
