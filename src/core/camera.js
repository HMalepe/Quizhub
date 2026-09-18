/**
 * Wraps getUserMedia and keeps a hidden <video> element fed with the stream.
 * The video element is never shown — it's a texture source for the canvas.
 *
 * Front camera only — this is a selfie-reaction tool, so there's no rear
 * camera and no flipping. The feed is always mirrored (see renderer.js).
 */
export class Camera {
  constructor() {
    this.stream = null;
    this.video = document.createElement('video');
    this.video.playsInline = true;
    // Must stay muted even though the stream carries mic audio: an unmuted
    // element would play your own mic back through the speakers and howl.
    this.video.muted = true;
    this.video.autoplay = true;
  }

  /** Mic track for the recorder to mix in, or null before the stream starts. */
  get audioTrack() {
    if (!this.stream) return null;
    const [track] = this.stream.getAudioTracks();
    return track || null;
  }

  get ready() {
    return Boolean(this.video.videoWidth);
  }

  async start() {
    this.stop();
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1080 },
        height: { ideal: 1920 }
      },
      // Your answering voice is the one sound that has to be in the file —
      // it's the content, and it has to stay in sync with the footage.
      // Everything else (ticks, buzzer, stings) still gets added in CapCut.
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    });
    this.video.srcObject = this.stream;
    await this.video.play();
  }

  /**
   * Re-play the element after the page comes back from hidden. iOS pauses a
   * backgrounded <video>, and a paused element hands `drawImage` the same
   * stale frame forever — frozen video over live audio.
   */
  async resume() {
    if (!this.stream || !this.video.paused) return;
    try {
      await this.video.play();
    } catch {
      /* nothing more to do — the next resume attempt will retry */
    }
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
    return 'Camera or microphone permission was denied. Allow both for this site in your browser settings, then reload.';
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'No camera or microphone found on this device.';
  }
  if (name === 'NotReadableError') {
    return 'The camera or microphone is already in use by another app. Close it and try again.';
  }
  if (!window.isSecureContext) {
    return 'Camera and mic access require HTTPS or localhost. Deploy the app or run it on localhost.';
  }
  return `Camera failed to start: ${err && err.message ? err.message : 'unknown error'}`;
}
