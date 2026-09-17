/**
 * Wires DOM controls to the app. Holds no quiz logic of its own — it reads
 * state and calls handlers. Keeping it dumb means the state machine stays
 * testable without a DOM.
 */

const $ = (id) => document.getElementById(id);

export class Controls {
  constructor(handlers) {
    this.handlers = handlers;
    this._cameraEnabled = false;
    this._categoryChosen = false;

    this.el = {
      enableCam: $('enableCamBtn'),
      permOverlay: $('permOverlay'),
      categorySelect: $('categorySelect'),
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

    this.el.categorySelect.addEventListener('change', (e) => {
      this._categoryChosen = Boolean(e.target.value);
      this._updateStartEnabled();
      h.onCategoryChange(e.target.value);
    });
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
    this._cameraEnabled = true;
    this.el.categorySelect.disabled = false;
    [this.el.shuffle, this.el.flip, this.el.record].forEach((btn) => {
      btn.disabled = false;
    });
    this._updateStartEnabled();
  }

  /** Start needs both camera access and a chosen category/question set. */
  _updateStartEnabled() {
    this.el.start.disabled = !(this._cameraEnabled && this._categoryChosen);
  }

  /** Builds the category picker: one <optgroup> per section, plus a "My Questions" option. */
  populateCategories(sections) {
    const select = this.el.categorySelect;
    select.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Choose a category…';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    sections.forEach(({ section, categories }) => {
      const group = document.createElement('optgroup');
      group.label = section;
      categories.forEach(({ name }) => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = `Can You Pass as ${name}`;
        group.appendChild(opt);
      });
      select.appendChild(group);
    });

    const customGroup = document.createElement('optgroup');
    customGroup.label = 'Other';
    const customOpt = document.createElement('option');
    customOpt.value = '__custom';
    customOpt.textContent = 'My Questions (custom)';
    customGroup.appendChild(customOpt);
    select.appendChild(customGroup);
  }

  /** Reflects an in-code category change (e.g. after editing/resetting custom questions). */
  setCategorySelectValue(value) {
    this.el.categorySelect.value = value;
    this._categoryChosen = Boolean(value);
    this._updateStartEnabled();
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
    // Flipping rebuilds the camera stream, which kills the mic track the
    // recorder is holding — the rest of the take would come out silent.
    this.el.flip.disabled = isRecording;
    this.el.flip.title = isRecording ? 'Stop recording first — flipping would cut the audio' : '';
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
