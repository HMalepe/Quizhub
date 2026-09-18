import { TIMING, TAP_DEBOUNCE_MS } from './config.js';

/**
 * Quiz phase state machine.
 *
 *   idle ──tap──> question ──tap──> countdown
 *                                       │
 *                                (hits 0 or tap)
 *                                       ▼
 *                                    reveal ──tap──> question (next)
 *
 * The countdown is the only phase on a clock. `question` and `reveal` both
 * wait for you: a question needs however long it takes to read aloud, and
 * reveal needs an open beat to tap Right/Wrong before moving on.
 *
 * Emits changes via onChange so the renderer and UI stay dumb — they read
 * state, they don't own it.
 */
export class QuizMachine {
  constructor({ questions, onChange }) {
    this.questions = questions;
    this.onChange = onChange || (() => {});
    this.index = 0;
    this.phase = 'idle'; // 'idle' | 'question' | 'countdown' | 'reveal'
    this.countdownValue = 0;
    this.countdownSeconds = TIMING.countdownSeconds;
    this.answerResult = null; // null | 'right' | 'wrong'
    this.flashUntil = 0;
    this._timer = null;
    this._lastAdvanceAt = 0;
  }

  setQuestions(questions) {
    this.questions = questions;
    this.index = 0;
    if (this.phase !== 'idle') this.showQuestion();
    else this._emit();
  }

  setCountdownSeconds(seconds) {
    const n = Number.parseInt(seconds, 10);
    this.countdownSeconds = Number.isFinite(n) && n > 0 ? n : TIMING.countdownSeconds;
    this._emit();
  }

  get current() {
    return this.questions[this.index] || ['', ''];
  }

  _clearTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  _emit() {
    this.onChange(this.snapshot());
  }

  snapshot() {
    return {
      phase: this.phase,
      index: this.index,
      total: this.questions.length,
      question: this.current[0],
      answer: this.current[1],
      countdownValue: this.countdownValue,
      answerResult: this.answerResult,
      flashUntil: this.flashUntil
    };
  }

  start() {
    this.index = 0;
    this.showQuestion();
  }

  /**
   * No timer here on purpose — the question holds until you tap. It used to
   * auto-advance after 1.6s, which meant a tap intended to start the countdown
   * often landed on an already-running countdown and revealed the answer
   * instead, eating the question.
   */
  showQuestion() {
    this._clearTimer();
    if (!this.questions.length) return;
    this.phase = 'question';
    this.answerResult = null;
    this._emit();
  }

  startCountdown() {
    this._clearTimer();
    this.phase = 'countdown';
    this.countdownValue = this.countdownSeconds;
    this._emit();

    const step = () => {
      if (this.countdownValue <= 0) {
        this.reveal();
        return;
      }
      this._timer = setTimeout(() => {
        this.countdownValue -= 1;
        this._emit();
        step();
      }, 1000);
    };
    step();
  }

  reveal() {
    this._clearTimer();
    this.phase = 'reveal';
    this.answerResult = null;
    this.flashUntil = performance.now() + TIMING.flashMs;
    this._emit();
    // No timer here on purpose — waits for you to mark and tap on.
  }

  /** @param {'right'|'wrong'} result */
  mark(result) {
    if (this.phase !== 'reveal') return;
    this.answerResult = result;
    this.flashUntil = performance.now() + TIMING.flashMs;
    this._emit();
  }

  next() {
    this._clearTimer();
    this.index = (this.index + 1) % this.questions.length;
    this.showQuestion();
  }

  /**
   * Single entry point for a screen tap — advances whatever phase we're in.
   *
   * Taps are now the only thing driving question → countdown → next, so a
   * stray double-fire (a mobile ghost click, a fumbled double-tap) costs a
   * whole question: it would run question → countdown → reveal in one gesture.
   * Anything inside TAP_DEBOUNCE_MS of the last advance is treated as that
   * same gesture and ignored.
   */
  advance() {
    const now = performance.now();
    if (now - this._lastAdvanceAt < TAP_DEBOUNCE_MS) return;
    this._lastAdvanceAt = now;

    switch (this.phase) {
      case 'idle':
        this.showQuestion();
        break;
      case 'question':
        this.startCountdown();
        break;
      case 'countdown':
        this.reveal();
        break;
      case 'reveal':
        this.next();
        break;
    }
  }

  destroy() {
    this._clearTimer();
  }
}
