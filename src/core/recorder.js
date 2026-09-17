import { CANVAS } from './config.js';

/**
 * Records the composited canvas to a file.
 *
 * Video-only by design — no audio track at all. Sound goes on in CapCut,
 * which means you're free to retime the countdown and buzzer without being
 * locked to whatever the app played during filming.
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
     * Optional audio track mixed into the recording. Set this to a track from
     * ClipVoice.getStreamTrack() if you want voiceover baked into the file.
     * Left null, the recording is silent by design (sound added in CapCut).
     */
    this.audioTrack = null;
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

    const stream = this.canvas.captureStream(CANVAS.fps);
    const tracks = [...stream.getVideoTracks()];
    if (this.audioTrack) tracks.push(this.audioTrack);
    const output = new MediaStream(tracks);

    this.chunks = [];
    this.recorder = mimeType
      ? new MediaRecorder(output, { mimeType })
      : new MediaRecorder(output);

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
