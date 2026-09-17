import { CANVAS, COLORS, FLASH_RGB, TYPE, TIMING } from '../core/config.js';
import { drawWrapped, drawFitted } from './text.js';

/**
 * Composites every frame: camera into the bottom zone, quiz overlay into the
 * top zone, optional flash across the whole frame.
 *
 * Runs on requestAnimationFrame. Everything it draws is what MediaRecorder
 * captures — there is no separate "export" path, so what you see is exactly
 * what lands in the file.
 */
export class Renderer {
  constructor({ canvas, camera, getState }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.camera = camera;
    this.getState = getState;
    this.running = false;
    this._frame = null;

    this.W = CANVAS.width;
    this.H = CANVAS.height;
    this.topH = Math.round(this.H * CANVAS.topZoneRatio);
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.drawFrame();
      this._frame = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    this.running = false;
    if (this._frame) cancelAnimationFrame(this._frame);
  }

  drawFrame() {
    const { ctx, W, H } = this;
    const state = this.getState();

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    this.drawCameraZone();
    this.drawOverlayZone(state);
    this.drawFlash(state);
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

    const grad = ctx.createLinearGradient(0, 0, 0, topH);
    grad.addColorStop(0, COLORS.bgTop);
    grad.addColorStop(1, COLORS.bg);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, topH);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (state.total) {
      ctx.fillStyle = COLORS.inkDim;
      ctx.font = TYPE.counter;
      ctx.fillText(`${state.index + 1} / ${state.total}`, W / 2, 62);
    }

    switch (state.phase) {
      case 'idle':
        this.drawIdle();
        break;
      case 'question':
        this.drawQuestion(state);
        break;
      case 'countdown':
        this.drawCountdown(state);
        break;
      case 'reveal':
        this.drawReveal(state);
        break;
    }
  }

  drawIdle() {
    const { ctx, W, topH } = this;
    ctx.fillStyle = COLORS.ink;
    ctx.font = TYPE.idle;
    drawWrapped(ctx, 'Tap to start', W / 2, topH / 2, W * 0.8, 54);
  }

  drawKicker(label, color) {
    const { ctx, W } = this;
    ctx.fillStyle = color;
    ctx.font = TYPE.kicker;
    ctx.fillText(label, W / 2, 138);
  }

  drawQuestion(state) {
    const { ctx, W, topH } = this;
    this.drawKicker('QUESTION', COLORS.amber);
    ctx.fillStyle = COLORS.ink;
    drawFitted(
      ctx,
      state.question,
      W / 2,
      topH * 0.56,
      W * 0.82,
      topH * 0.5,
      '600 {size}px Inter, sans-serif',
      46
    );
  }

  drawCountdown(state) {
    const { ctx, W, topH } = this;
    this.drawKicker('GET READY', COLORS.amber);

    // Pulse on the leading edge of each second.
    const intoSecond = performance.now() % 1000;
    const pulse = intoSecond < 140 ? 1.12 : 1;

    ctx.save();
    ctx.translate(W / 2, topH * 0.6);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = COLORS.amber;
    ctx.font = TYPE.numeral;
    ctx.fillText(String(state.countdownValue), 0, 0);
    ctx.restore();
  }

  drawReveal(state) {
    const { ctx, W, topH } = this;

    const kickerColor =
      state.answerResult === 'right' ? COLORS.right
      : state.answerResult === 'wrong' ? COLORS.wrong
      : COLORS.violet;

    const kickerLabel =
      state.answerResult === 'right' ? 'CORRECT'
      : state.answerResult === 'wrong' ? 'WRONG'
      : 'ANSWER';

    this.drawKicker(kickerLabel, kickerColor);

    ctx.fillStyle =
      state.answerResult === 'right' ? COLORS.right
      : state.answerResult === 'wrong' ? COLORS.wrong
      : COLORS.ink;

    drawFitted(
      ctx,
      state.answer,
      W / 2,
      topH * 0.58,
      W * 0.85,
      topH * 0.46,
      '700 {size}px Unbounded, sans-serif',
      54
    );
  }

  /** Full-frame tint that decays out — fires on reveal and on marking. */
  drawFlash(state) {
    const now = performance.now();
    if (now >= state.flashUntil) return;

    const rgb =
      state.answerResult === 'right' ? FLASH_RGB.right
      : state.answerResult === 'wrong' ? FLASH_RGB.wrong
      : FLASH_RGB.neutral;

    const alpha = ((state.flashUntil - now) / TIMING.flashMs) * 0.35;
    this.ctx.fillStyle = `rgba(${rgb},${Math.max(alpha, 0)})`;
    this.ctx.fillRect(0, 0, this.W, this.H);
  }
}
