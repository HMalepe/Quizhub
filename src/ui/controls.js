/**
 * Wires DOM controls to the app. Holds no quiz logic of its own — it reads
 * state and calls handlers. Keeping it dumb means the state machine stays
 * testable without a DOM.
 */

const $ = (id) => document.getElementById(id);

export class Controls {
  constructor(handlers) {
    this.handlers = handlers;

    this.el = {
      enableCam: $('enableCamBtn'),
      permOverlay: $('permOverlay'),
      start: $('startBtn'),
      shuffle: $('shuffleBtn'),
      flip: $('flipBtn'),
      record: $('recordBtn'),
      recDot: $('recDot'),
      right: $('rightBtn'),
      wrong: $('wrongBtn'),
      download: $('downloadLink'),
      settingsBtn: $('settingsBtn'),
      settings: $('settings'),
      countdownLen: $('countdownLen'),
      questionBank: $('questionBank'),
      saveQuestions: $('saveQuestionsBtn'),
      resetQuestions: $('resetQuestionsBtn')
    };

    this._bind();
  }

  _bind() {
    const h = this.handlers;

    this.el.enableCam.addEventListener('click', () => h.onEnableCamera());
    this.el.start.addEventListener('click', () => h.onStart());
    this.el.shuffle.addEventListener('click', () => h.onShuffle());
    this.el.flip.addEventListener('click', () => h.onFlip());
    this.el.record.addEventListener('click', () => h.onToggleRecord());
    this.el.right.addEventListener('click', () => h.onMark('right'));
    this.el.wrong.addEventListener('click', () => h.onMark('wrong'));

    this.el.settingsBtn.addEventListener('click', () => {
      this.el.settings.classList.toggle('open');
    });

    this.el.countdownLen.addEventListener('change', (e) => {
      h.onCountdownChange(e.target.value);
    });

    this.el.saveQuestions.addEventListener('click', () => {
      h.onSaveQuestions(this.el.questionBank.value);
    });

    this.el.resetQuestions.addEventListener('click', () => h.onResetQuestions());

    // Keyboard shortcuts — much easier than tapping when you're mid-take
    // and the phone is on a tripod across the room with a bluetooth keyboard.
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') {
        e.preventDefault();
        h.onAdvance();
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'c') {
        h.onMark('right');
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'x') {
        h.onMark('wrong');
      } else if (e.key.toLowerCase() === 'r') {
        h.onToggleRecord();
      }
    });
  }

  enableCameraDependentControls() {
    this.el.permOverlay.style.display = 'none';
    [this.el.start, this.el.shuffle, this.el.flip, this.el.record].forEach((btn) => {
      btn.disabled = false;
    });
  }

  /** Right/Wrong are only meaningful during the reveal phase. */
  syncPhase(state) {
    const canMark = state.phase === 'reveal';
    this.el.right.disabled = !canMark;
    this.el.wrong.disabled = !canMark;
    this.el.right.classList.toggle('active', state.answerResult === 'right');
    this.el.wrong.classList.toggle('active', state.answerResult === 'wrong');
  }

  setRecording(isRecording) {
    this.el.record.textContent = isRecording ? '■ Stop' : '● Record';
    this.el.recDot.classList.toggle('on', isRecording);
    if (isRecording) this.el.download.classList.remove('show');
  }

  showDownload({ url, filename }) {
    this.el.download.href = url;
    this.el.download.download = filename;
    this.el.download.classList.add('show');
  }

  setQuestionBankText(text) {
    this.el.questionBank.value = text;
  }

  closeSettings() {
    this.el.settings.classList.remove('open');
  }

  setCountdownValue(seconds) {
    this.el.countdownLen.value = String(seconds);
  }
}
