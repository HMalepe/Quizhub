import { CANVAS, COLORS, FLASH_RGB, TYPE, TIMING } from '../core/config.js';
import { drawWrapped, drawFitted } from './text.js';
import { getCachedImage } from './imageCache.js';
import { IMAGE_QUESTION_PREFIX, parseImageQuestion } from '../core/picturePacks.js';

/**
 * Composites every frame: camera into the bottom zone, quiz overlay into the
 * top zone, optional flash across the whole frame.
 *
 * Runs on requestAnimationFrame. Everything it draws is what the recorder
 * captures — there is no separate "export" path, so what you see is exactly
 * what lands in the file. That also means **a stalled draw loop is a ruined
 * take**: the encoder snapshots whatever is on the canvas, so a dead loop
 * freezes the picture while the mic keeps going. Hence the paranoia below.
 * Don't set `{ desynchronized: true }` on this context — WebCodecs reads the
 * canvas for each encoded frame and a desynced buffer can hand it stale pixels.
 */

/** How long without a paint before the watchdog steps in (ms). */
const STALL_MS = 400;

export class Renderer {
  constructor({ canvas, camera, getState }) {
    this.canvas = canvas;
    // alpha:false — every frame paints the full canvas opaquely, so there's no
    // transparency to composite. Cheaper per frame on mobile GPUs.
    this.ctx = canvas.getContext('2d', { alpha: false });
    this._overlayGradient = null;
    this.camera = camera;
    this.getState = getState;
    this.running = false;
    this._frame = null;
    this._watchdog = null;
    this._lastDrawAt = 0;
    /** Total painted frames. Read by RecordingDiagnostics to spot a dead loop. */
    this.frameCount = 0;
    /**
     * Called after a completed paint. The recorder snapshots from here so it
     * never encodes a half-drawn frame (tearing looks like a hitch).
     */
    this.onAfterDraw = null;
    this._tick = this._tick.bind(this);

    // Drawing happens in design space; the canvas is the real output size and
    // every frame starts by scaling the context to bridge the two.
    this.W = CANVAS.width;
    this.H = CANVAS.height;
    this.topH = Math.round(this.H * CANVAS.topZoneRatio);

    canvas.width = CANVAS.outputWidth;
    canvas.height = CANVAS.outputHeight;
    this.scale = CANVAS.outputWidth / CANVAS.width;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this._lastDrawAt = performance.now();
    this._tick();
    this._watchdog = setInterval(() => this._checkStall(), STALL_MS);
  }

  stop() {
    this.running = false;
    if (this._frame) cancelAnimationFrame(this._frame);
    if (this._watchdog) {
      clearInterval(this._watchdog);
      this._watchdog = null;
    }
  }

  /**
   * One rAF step. The next frame is queued in `finally` on purpose: a throw
   * in drawFrame() used to kill the loop permanently, and since `running`
   * stayed true, start() would refuse to restart it.
   */
  _tick() {
    if (!this.running) return;
    try {
      this.drawFrame();
      this._lastDrawAt = performance.now();
    } catch (err) {
      console.error('Frame draw failed:', err);
    } finally {
      this._frame = requestAnimationFrame(this._tick);
    }
  }

  /**
   * rAF doesn't fire on a hidden page and can be throttled on a visible one.
   * If it's gone quiet, paint directly so the captured stream keeps moving.
   * (A hidden page can't be rescued from here — that's what WakeLock is for.)
   */
  _checkStall() {
    if (!this.running || document.hidden) return;
    if (performance.now() - this._lastDrawAt < STALL_MS) return;
    try {
      this.drawFrame();
      this._lastDrawAt = performance.now();
    } catch (err) {
      console.error('Watchdog draw failed:', err);
    }
  }

  drawFrame() {
    const { ctx, W, H } = this;
    const state = this.getState();

    // Reset every frame rather than once: the zone drawers use save/restore
    // around their own transforms, and a stray imbalance would otherwise
    // compound silently across frames.
    ctx.setTransform(this.scale, 0, 0, this.scale, 0, 0);

    // The overlay gradient and the cover-fitted camera between them repaint
    // every pixel, so clearing first is only needed before the camera is live.
    if (!this.camera.ready) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
    }

    this.drawCameraZone();
    this.drawOverlayZone(state);
    this.drawFlash(state);
    this.frameCount++;
    if (this.onAfterDraw) this.onAfterDraw();
  }

  /** Bottom zone: camera feed, cover-cropped so it always fills without stretch. */
  drawCameraZone() {
    const { ctx, W, H, topH, camera } = this;
    if (!camera.ready) return;

    const destH = H - topH;
    const { videoWidth: vw, videoHeight: vh } = camera.video;

    // Cover fit: scale so the smaller dimension still fills, then centre-crop.
    const scale = Math.max(W / vw, destH / vh);
    const srcW = W / scale;
    const srcH = destH / scale;
    const srcX = (vw - srcW) / 2;
    const srcY = (vh - srcH) / 2;

    // Always mirrored — front camera only, and a selfie view is what people
    // expect to see of themselves.
    ctx.save();
    ctx.translate(W, topH);
    ctx.scale(-1, 1);
    ctx.drawImage(camera.video, srcX, srcY, srcW, srcH, 0, 0, W, destH);
    ctx.restore();
  }

  /** Top zone: gradient panel + whatever the current phase calls for. */
  drawOverlayZone(state) {
    const { ctx, W, topH } = this;

    // Fixed coords and colors, so build it once rather than every frame.
    if (!this._overlayGradient) {
      const grad = ctx.createLinearGradient(0, 0, 0, topH);
      grad.addColorStop(0, COLORS.bgTop);
      grad.addColorStop(1, COLORS.bg);
      this._overlayGradient = grad;
    }
    ctx.fillStyle = this._overlayGradient;
    ctx.fillRect(0, 0, W, topH);

    ctx.strokeStyle = COLORS.rule;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, topH - 1);
    ctx.lineTo(W, topH - 1);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (
      state.showCounter !== false
      && state.total
      && (state.phase === 'question' || state.phase === 'reveal')
    ) {
      ctx.fillStyle = COLORS.inkDim;
      ctx.font = TYPE.counter;
      ctx.fillText(`${state.index + 1} / ${state.total}`, W / 2, 62);
    }

    switch (state.phase) {
      case 'idle':
        this.drawIdle('Tap to start');
        break;
      case 'title':
        this.drawTitle(state);
        break;
      case 'question':
        this.drawQuestion(state);
        break;
      case 'reveal':
        this.drawReveal(state);
        break;
      case 'review':
        this.drawIdle('Scroll down to mark your answers');
        break;
    }
  }

  drawIdle(message) {
    const { ctx, W, topH } = this;
    ctx.fillStyle = COLORS.ink;
    ctx.font = TYPE.idle;
    drawWrapped(ctx, message, W / 2, topH / 2, W * 0.8, 54);
  }

  drawKicker(label, color) {
    const { ctx, W } = this;
    ctx.fillStyle = color;
    ctx.font = TYPE.kicker;
    ctx.letterSpacing = '7px';
    ctx.fillText(label, W / 2, 138);
    ctx.letterSpacing = '0px';
  }

  drawTitle(state) {
    const { ctx, W, topH } = this;
    const raw = (state.quizTitle || '').trim() || 'Trivia Reel';
    const prefix = 'Can You Pass as ';
    const kicker = raw.startsWith(prefix) ? 'CAN YOU PASS AS' : 'QUIZ';
    const name = raw.startsWith(prefix) ? raw.slice(prefix.length) : raw;

    this.drawKicker(kicker, COLORS.amber);
    ctx.fillStyle = COLORS.ink;
    drawFitted(
      ctx,
      name,
      W / 2,
      topH * 0.52,
      W * 0.82,
      topH * 0.42,
      TYPE.titleFit,
      72
    );
  }

  drawQuestion(state) {
    this.drawKicker('QUESTION', COLORS.amber);
    this.drawQuestionText(state.question);
  }

  /**
   * Same slot in both phases so the question doesn't jump when the answer
   * appears under it. Upper half of the overlay; the lower half is reserved
   * for the answer. Live takes always draw the answer in white; green / orange
   * / red is applied later from the recap marks when the download is generated.
   *
   * A picture-round question carries an image instead of text — see
   * `picturePacks.js` for the `img:` prefix that marks one. Same slot, same
   * box, just drawImage instead of drawFitted.
   */
  drawQuestionText(question) {
    if (question.startsWith(IMAGE_QUESTION_PREFIX)) {
      const { url, prompt } = parseImageQuestion(question);
      this.drawQuestionImage(url, prompt);
      return;
    }
    const { ctx, W, topH } = this;
    ctx.fillStyle = COLORS.ink;
    drawFitted(
      ctx,
      question,
      W / 2,
      topH * 0.38,
      W * 0.82,
      topH * 0.28,
      TYPE.questionFit,
      46
    );
  }

  /**
   * Contain-fits the picture into the same slot `drawQuestionText` would have
   * used, centered, with the pack's prompt ("Who is this?") as a dim line
   * above it. A pack without a prompt gets the taller box the logos round
   * always had, so nothing shifts for a round that doesn't need the line.
   *
   * `getCachedImage` is synchronous and returns null while a fresh picture is
   * still loading — that frame draws the prompt without the image rather than
   * blocking the draw loop on a fetch. `main.js` preloads a chosen pack before
   * Start, so in practice this only matters on the very first paint.
   */
  drawQuestionImage(url, prompt) {
    const { ctx, W, topH } = this;

    if (prompt) {
      ctx.fillStyle = COLORS.inkDim;
      drawFitted(ctx, prompt, W / 2, topH * 0.24, W * 0.78, topH * 0.09, TYPE.questionFit, 38);
    }

    const img = getCachedImage(url);
    if (!img) return;

    const boxW = W * 0.78;
    const boxH = topH * (prompt ? 0.3 : 0.34);
    const boxX = (W - boxW) / 2;
    const boxY = topH * (prompt ? 0.28 : 0.2);

    const scale = Math.min(boxW / img.naturalWidth, boxH / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, boxX + (boxW - dw) / 2, boxY + (boxH - dh) / 2, dw, dh);
  }

  drawReveal(state) {
    const { ctx, W, topH } = this;
    const look = markLook(state.answerResult);

    this.drawKicker(look.kicker, look.kickerColor);
    this.drawQuestionText(state.question);

    ctx.fillStyle = look.answerColor;

    drawFitted(
      ctx,
      state.answer,
      W / 2,
      topH * 0.74,
      W * 0.85,
      topH * 0.28,
      TYPE.answerFit,
      44
    );
  }

  /** Full-frame tint that decays out — fires on reveal and on marking. */
  drawFlash(state) {
    const now = performance.now();
    if (now >= state.flashUntil) return;

    const { flash } = markLook(state.answerResult);
    const alpha = ((state.flashUntil - now) / TIMING.flashMs) * 0.35;
    this.ctx.fillStyle = `rgba(${flash},${Math.max(alpha, 0)})`;
    this.ctx.fillRect(0, 0, this.W, this.H);
  }
}

function markLook(result) {
  if (result === 'right') {
    return { kicker: 'CORRECT', kickerColor: COLORS.right, answerColor: COLORS.right, flash: FLASH_RGB.right };
  }
  if (result === 'close') {
    return { kicker: 'CLOSE ENOUGH', kickerColor: COLORS.close, answerColor: COLORS.close, flash: FLASH_RGB.close };
  }
  if (result === 'wrong') {
    return { kicker: 'WRONG', kickerColor: COLORS.wrong, answerColor: COLORS.wrong, flash: FLASH_RGB.wrong };
  }
  return { kicker: 'ANSWER', kickerColor: COLORS.violet, answerColor: COLORS.ink, flash: FLASH_RGB.neutral };
}
