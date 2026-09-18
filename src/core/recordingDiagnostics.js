/**
 * Watches a recording in flight and reports which layer fails first.
 *
 * Takes stop partway through on iOS Safari with video frozen and audio still
 * running. Three theories have been wrong about why — screen sleep, manual
 * frame capture, and a memory ceiling — because the symptom is identical no
 * matter which layer breaks, and none of it reproduces in desktop Chrome. That
 * ambiguity is the actual problem, so this resolves it: it polls every layer
 * that could stop and records the FIRST one that does, with a timestamp.
 *
 * The layers, outermost to innermost:
 *   - the draw loop    — is the canvas still being painted?
 *   - the camera feed  — is the <video> still advancing?
 *   - the capture track— is canvas.captureStream() still live and unmuted?
 *   - the recorder     — is MediaRecorder still 'recording'?
 *   - the encoder      — are new bytes still arriving?
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
      // Only meaningful once chunks actually flow. With no timeslice set,
      // ondataavailable fires once at stop, so bytes legitimately sit at zero
      // for the whole take and a stall check here would cry wolf immediately.
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

    // Bytes only land at stop() unless a timeslice is set, so show them as
    // pending rather than a misleading 0.0MB mid-take.
    const size = s.bytes ? `${(s.bytes / 1e6).toFixed(1)}MB` : 'size at stop';
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
