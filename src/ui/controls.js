/**
 * Wires DOM controls to the app. Holds no quiz logic of its own — it reads
 * state and calls handlers. Keeping it dumb means the state machine stays
 * testable without a DOM.
 */

const $ = (id) => document.getElementById(id);

/**
 * Soft memory reminder, not an encoder ceiling. The take still lives in RAM
 * until you hit Stop, so wrap a very long one rather than filling the tab.
 */
const RECORDING_WARN_SECONDS = 180;

export class Controls {
  constructor(handlers) {
    this.handlers = handlers;
    this._cameraEnabled = false;
    this._categoryChosen = false;

    this.el = {
      enableCam: $('enableCamBtn'),
      permOverlay: $('permOverlay'),
      camInfo: $('camInfo'),
      diag: $('diag'),
      categorySelect: $('categorySelect'),
      start: $('startBtn'),
      shuffle: $('shuffleBtn'),
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
    [this.el.shuffle, this.el.record].forEach((btn) => {
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
    if (isRecording) this.el.download.classList.remove('show');

    clearInterval(this._recTimer);
    if (!isRecording) {
      this.el.recDot.textContent = 'REC';
      this.el.recDot.classList.remove('near-limit');
      return;
    }

    // Elapsed time on the badge so you can wrap a long take before the tab's
    // memory fills — the file is still held in RAM until Stop.
    const startedAt = Date.now();
    const tick = () => {
      const secs = Math.floor((Date.now() - startedAt) / 1000);
      const mm = String(Math.floor(secs / 60)).padStart(2, '0');
      const ss = String(secs % 60).padStart(2, '0');
      this.el.recDot.textContent = `REC ${mm}:${ss}`;
      this.el.recDot.classList.toggle('near-limit', secs >= RECORDING_WARN_SECONDS);
    };
    tick();
    this._recTimer = setInterval(tick, 1000);
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

  /**
   * Live recording diagnostics. Faults stay on screen after the take ends —
   * the whole point is to still be readable once something has gone wrong.
   * @param {{line: string, faults: string[], ok: boolean}} report
   */
  showDiagnostics({ line, faults, ok }) {
    this.el.diag.hidden = false;
    this.el.diag.classList.toggle('fault', !ok);
    this.el.diag.textContent = ok
      ? line
      : `${line}\n\nFIRST FAULT:\n${faults.map((f) => `  ${f}`).join('\n')}`;
  }

  /** @param {{text: string, warn: boolean}} info */
  showCameraInfo({ text, warn }) {
    this.el.camInfo.textContent = text;
    this.el.camInfo.classList.toggle('warn', warn);
    this.el.camInfo.hidden = false;
  }
}
