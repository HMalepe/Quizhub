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

  /**
   * What the device actually gave us, which is not necessarily what was asked
   * for — the video constraints are all `ideal`, so a browser is free to hand
   * back 640×480 and say nothing. Returns null before the stream starts.
   */
  get videoSettings() {
    if (!this.stream) return null;
    const [track] = this.stream.getVideoTracks();
    return track ? track.getSettings() : null;
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
        // This is a recording, not a call. AEC/NS/AGC run in chunks and
        // pump/gate the voice — that's the crackle. The <video> stays muted
        // so there is no speaker loopback for echo cancellation to chase.
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: 1
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
 * Compares what the camera actually handed over against the canvas region it
 * has to fill, so a silent downgrade is visible before you film with it rather
 * than after, in CapCut.
 *
 * The video constraints are all `ideal`, which a browser may ignore — Safari
 * can fall back to 640×480, and filling a 1080-wide zone from that is a 132%
 * upscale. Nothing in the app fails when that happens; the footage is just
 * soft, which is exactly the kind of thing worth saying out loud.
 *
 * @param settings result of `camera.videoSettings`
 * @param targetW  width of the canvas region the feed fills
 * @param targetH  height of that region
 */
export function describeCameraQuality(settings, targetW, targetH) {
  if (!settings || !settings.width || !settings.height) {
    return { text: 'Camera resolution unavailable', warn: true };
  }

  const { width: vw, height: vh, frameRate } = settings;
  const scale = Math.max(targetW / vw, targetH / vh);
  const fps = frameRate ? ` @ ${Math.round(frameRate)}fps` : '';
  const head = `Camera ${vw}×${vh}${fps}`;

  if (scale > 1.05) {
    return {
      text: `${head} · upscaled ${Math.round((scale - 1) * 100)}% to fill the frame — footage will look soft`,
      warn: true
    };
  }

  // Landscape still fills the zone sharply, but only by cropping the sides
  // away, so the framing is tighter than the preview might suggest.
  const cropped = vw > vh ? `, sides cropped to fit portrait` : '';
  const fit = scale > 1 ? `${Math.round((scale - 1) * 100)}% upscale` : 'no upscaling';
  return { text: `${head} · ${fit}${cropped}`, warn: false };
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
