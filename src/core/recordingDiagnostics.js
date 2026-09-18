/**
 * Watches a recording in flight and reports which layer fails first.
 *
 * If a take comes out with frozen video over live audio, this names which
 * layer died first. The WebCodecs recorder encodes canvas snapshots directly;
 * the MediaRecorder fallback still uses captureStream. Both are polled:
 *
 *   - the draw loop    — is the canvas still being painted?
 *   - the camera feed  — is the <video> still advancing?
 *   - the capture track— is the encoder still being fed (live stand-in, or
 *                        canvas.captureStream() on the fallback)?
 *   - the recorder     — is it still in a recording state?
 *   - the encoder      — are new video bytes still arriving?
 *
 * Whichever fires first names the culprit. Cheap enough to leave running:
 * a handful of property reads twice a second.
 */

const POLL_MS = 500;
/** No new encoded bytes for this long counts as the encoder having given up. */
const BYTES_STALL_MS = 4000;
/** A counter must sit unchanged this long before it counts as stopped. */
const STUCK_MS = 1600;

export class RecordingDiagnostics {
  constructor({ recorder, camera, renderer }) {
    this.recorder = recorder;
    this.camera = camera;
    this.renderer = renderer;
    this.onUpdate = () => {};

    this._timer = null;
    this.reset();
  }

  reset() {
    this.startedAt = 0;
    this.faults = [];
    this.last = null;
    this._prev = null;
    this._lastBytesAt = 0;
    this._lastBytes = 0;
    this._framesStuckSince = 0;
    this._camStuckSince = 0;
  }

  get elapsed() {
    return this.startedAt ? (performance.now() - this.startedAt) / 1000 : 0;
  }

  start() {
    this.reset();
    this.startedAt = performance.now();
    this._lastBytesAt = this.startedAt;
    this._poll();
    this._timer = setInterval(() => this._poll(), POLL_MS);
  }

  stop() {
    clearInterval(this._timer);
    this._timer = null;
    this._poll();
  }

  /** Recorded once per fault — repeats of the same fault are ignored. */
  _fault(what) {
    if (this.faults.some((f) => f.what === what)) return;
    this.faults.push({ at: +this.elapsed.toFixed(1), what });
  }

  _snapshot() {
    const track = this.recorder.videoTrack;
    const video = this.camera.video;
    return {
      t: +this.elapsed.toFixed(1),
      recorderState: this.recorder.recorder ? this.recorder.recorder.state : 'none',
      trackState: track ? track.readyState : 'none',
      trackMuted: track ? track.muted : null,
      trackEnabled: track ? track.enabled : null,
      frames: this.renderer.frameCount,
      videoPaused: video.paused,
      videoTime: +video.currentTime.toFixed(2),
      chunks: this.recorder.chunkCount,
      bytes: this.recorder.byteCount
    };
  }

  _poll() {
    const now = this._snapshot();
    const before = this._prev;

    if (now.bytes > this._lastBytes) {
      this._lastBytes = now.bytes;
      this._lastBytesAt = performance.now();
    }

    if (before) {
      // Ordered so the innermost, most specific failure is named rather than
      // the knock-on effects it causes further out.
      if (now.trackState !== 'live') this._fault(`capture track ${now.trackState}`);
      if (now.trackMuted === true) this._fault('capture track muted');
      if (now.trackEnabled === false) this._fault('capture track disabled');
      if (now.recorderState !== 'recording') this._fault(`recorder ${now.recorderState}`);
      if (now.videoPaused) this._fault('camera <video> paused');

      // Counters need to be stuck for a sustained window, not one poll. The
      // stall watchdog repaints every STALL_MS (400ms) against a 500ms poll,
      // so a single quiet interval is normal on a degraded-but-alive loop.
      // A false fault here would point at the wrong layer, which is the exact
      // failure this whole module exists to stop.
      this._camStuckSince = now.videoTime === before.videoTime ? this._camStuckSince || performance.now() : 0;
      this._framesStuckSince = now.frames === before.frames ? this._framesStuckSince || performance.now() : 0;

      if (this._camStuckSince && performance.now() - this._camStuckSince > STUCK_MS) {
        this._fault('camera feed not advancing');
      }
      if (this._framesStuckSince && performance.now() - this._framesStuckSince > STUCK_MS) {
        this._fault('draw loop not painting');
      }
      // WebCodecs emits packets during the take. MediaRecorder fallback only
      // lands bytes at stop(), so ignore a zero count until the first packet.
      if (now.chunks > 0 && performance.now() - this._lastBytesAt > BYTES_STALL_MS) {
        this._fault(`no encoded bytes for ${Math.round((performance.now() - this._lastBytesAt) / 1000)}s`);
      }
    }

    this._prev = now;
    this.last = now;
    this.onUpdate(this.report());
  }

  /** Compact enough to read off a phone mid-take. */
  report() {
    const s = this.last;
    if (!s) return { line: '', faults: [], ok: true };

    const size = s.bytes ? `${(s.bytes / 1e6).toFixed(1)}MB` : 'encoding…';
    // Rate as well as total: a loop kept alive by the stall watchdog is still
    // painting, just far slower, and that shows up here and nowhere else.
    const fps = s.t > 0 ? (s.frames / s.t).toFixed(0) : '–';
    const line =
      `${s.t}s · track ${s.trackState}${s.trackMuted ? '/muted' : ''} · rec ${s.recorderState} · ` +
      `cam ${s.videoTime}s · ${s.frames} frames (${fps}/s) · ${size}`;

    return {
      line,
      faults: this.faults.map((f) => `${f.at}s ${f.what}`),
      ok: this.faults.length === 0
    };
  }
}
