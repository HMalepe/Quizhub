import { TIMING, TAP_DEBOUNCE_MS, MARK_RESULTS } from './config.js';

/**
 * Quiz phase state machine.
 *
 *   idle ──tap──> question ──tap──> reveal ──tap──> question (next)
 *                                                    │
 *                                             (last answer)
 *                                                    ▼
 *                                                 review
 *
 * Nothing is on a clock. Right/Wrong is not a live tap — you mark the
 * recap after the last question, then the download is colored from those
 * marks. `answerResult` on the live snapshot stays null on purpose.
 *
 * Emits changes via onChange so the renderer and UI stay dumb — they read
 * state, they don't own it.
 */
export class QuizMachine {
  constructor({ questions, onChange }) {
    this.questions = questions;
    this.onChange = onChange || (() => {});
    this.index = 0;
    this.phase = 'idle'; // 'idle' | 'question' | 'reveal' | 'review'
    this.marks = [];
    this.stingPicks = [];
    this.flashUntil = 0;
    this._lastAdvanceAt = 0;
    this._resetMarks();
  }

  _resetMarks() {
    this.marks = this.questions.map(() => null);
    this.stingPicks = this.questions.map(() => 0);
  }

  setQuestions(questions) {
    this.questions = questions;
    this.index = 0;
    this._resetMarks();
    if (this.phase !== 'idle') this.showQuestion();
    else this._emit();
  }

  get current() {
    return this.questions[this.index] || ['', ''];
  }

  get allMarked() {
    return this.marks.length > 0 && this.marks.every((m) => MARK_RESULTS.includes(m));
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
      answerResult: null,
      showCounter: true,
      marks: this.marks.slice(),
      stingPicks: this.stingPicks.slice(),
      questions: this.questions,
      flashUntil: this.flashUntil
    };
  }

  resetToIdle() {
    this.index = 0;
    this.phase = 'idle';
    this.flashUntil = 0;
    this._lastAdvanceAt = 0;
    this._resetMarks();
    this._emit();
  }

  start() {
    this.index = 0;
    this._resetMarks();
    this.showQuestion();
  }

  /**
   * No timer here on purpose — the question holds until you tap. Auto-advance
   * used to eat the question: a tap meant to reveal the answer landed after
   * the machine had already moved on.
   */
  showQuestion() {
    if (!this.questions.length) return;
    this.phase = 'question';
    this._emit();
  }

  reveal() {
    this.phase = 'reveal';
    this.flashUntil = performance.now() + TIMING.flashMs;
    this._emit();
  }

  /** Recap marking — not used during the live take. Same button again cycles the sting. */
  markAt(index, result) {
    if (index < 0 || index >= this.marks.length) return;
    if (!MARK_RESULTS.includes(result)) return;
    if (this.marks[index] === result) {
      this.stingPicks[index] += 1;
    } else {
      this.marks[index] = result;
      this.stingPicks[index] = 0;
    }
    this._emit();
  }

  next() {
    if (this.index >= this.questions.length - 1) {
      this.phase = 'review';
      this._emit();
      return;
    }
    this.index += 1;
    this.showQuestion();
  }

  /**
   * Single entry point for a screen tap — advances whatever phase we're in.
   * Review does not advance; marking happens in the panel.
   *
   * Taps are the only driver, so a stray double-fire (a mobile ghost click)
   * would run question → reveal → next in one gesture and skip the answer.
   * Anything inside TAP_DEBOUNCE_MS of the last advance is the same gesture.
   */
  advance() {
    if (this.phase === 'review') return;
    const now = performance.now();
    if (now - this._lastAdvanceAt < TAP_DEBOUNCE_MS) return;
    this._lastAdvanceAt = now;

    switch (this.phase) {
      case 'idle':
        this.showQuestion();
        break;
      case 'question':
        this.reveal();
        break;
      case 'reveal':
        this.next();
        break;
    }
  }

  destroy() {
    /* no timers to clear */
  }
}
