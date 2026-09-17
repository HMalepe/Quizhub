/**
 * Wraps getUserMedia and keeps a hidden <video> element fed with the stream.
 * The video element is never shown — it's a texture source for the canvas.
 */
export class Camera {
  constructor() {
    this.facing = 'user';
    this.stream = null;
    this.video = document.createElement('video');
    this.video.playsInline = true;
    this.video.muted = true;
    this.video.autoplay = true;
  }

  get isMirrored() {
    // Front camera should be mirrored so it matches what you see in a mirror.
    // Rear camera should not.
    return this.facing === 'user';
  }

  get ready() {
    return Boolean(this.video.videoWidth);
  }

  async start() {
    this.stop();
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: this.facing,
        width: { ideal: 1080 },
        height: { ideal: 1920 }
      },
      // Mic audio is deliberately off: the recorded file is silent and you
      // add sound in CapCut. If you ever want your voice baked in, flip this
      // to true and add the mic track in recorder.js.
      audio: false
    });
    this.video.srcObject = this.stream;
    await this.video.play();
  }

  async flip() {
    this.facing = this.facing === 'user' ? 'environment' : 'user';
    await this.start();
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }
}

/**
 * Turns a raw getUserMedia error into something a human can act on.
 */
export function describeCameraError(err) {
  const name = err && err.name;
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
    return 'Camera permission was denied. Allow camera access for this site in your browser settings, then reload.';
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'No camera found on this device.';
  }
  if (name === 'NotReadableError') {
    return 'The camera is already in use by another app. Close it and try again.';
  }
  if (!window.isSecureContext) {
    return 'Camera access requires HTTPS or localhost. Deploy the app or run it on localhost.';
  }
  return `Camera failed to start: ${err && err.message ? err.message : 'unknown error'}`;
}
