import { MARK_RESULTS } from '../core/config.js';

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
      startStepCam: $('startStepCam'),
      startStepQuiz: $('startStepQuiz'),
      camInfo: $('camInfo'),
      diag: $('diag'),
      categorySelect: $('categorySelect'),
      start: $('startBtn'),
      shuffle: $('shuffleBtn'),
      record: $('recordBtn'),
      recDot: $('recDot'),
      review: $('review'),
      reviewList: $('reviewList'),
      generate: $('generateBtn'),
      download: $('downloadLink'),
      restartTop: $('restartTop'),
      restartBottom: $('restartBottom')
    };

    this._bind();
  }

  _bind() {
    const h = this.handlers;

    this.el.enableCam.addEventListener('click', () => h.onEnableCamera());
    this.el.start.addEventListener('click', () => {
      this.hideStartOverlay();
      h.onStart();
    });

    this.el.categorySelect.addEventListener('change', (e) => {
      this._categoryChosen = Boolean(e.target.value);
      this._updateStartEnabled();
      h.onCategoryChange(e.target.value);
    });
    this.el.shuffle.addEventListener('click', () => h.onShuffle());
    this.el.record.addEventListener('click', () => h.onToggleRecord());
    this.el.generate.addEventListener('click', () => h.onGenerate());

    this.el.restartTop.addEventListener('click', () => h.onRestart());
    this.el.restartBottom.addEventListener('click', () => h.onRestart());

    // Keyboard shortcuts — much easier than tapping when you're mid-take
    // and the phone is on a tripod across the room with a bluetooth keyboard.
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (e.code === 'Space') {
        e.preventDefault();
        h.onAdvance();
      } else if (e.key.toLowerCase() === 'r') {
        h.onToggleRecord();
      }
    });
  }

  enableCameraDependentControls() {
    this._cameraEnabled = true;
    this.el.startStepCam.hidden = true;
    this.el.startStepQuiz.hidden = false;
    this.el.permOverlay.classList.add('is-quiz');
    this.el.permOverlay.style.display = '';
    this.el.categorySelect.disabled = false;
    this._updateStartEnabled();
    this.setRestartVisible(true);
  }

  /** Start needs both camera access and a chosen category/question set. */
  _updateStartEnabled() {
    const ready = this._cameraEnabled && this._categoryChosen;
    this.el.start.disabled = !ready;
    this.el.shuffle.disabled = !ready;
  }

  hideStartOverlay() {
    this.el.permOverlay.style.display = 'none';
    this.el.record.disabled = !this._cameraEnabled;
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

  /** Review list is shown after the last answer; live Right/Wrong is gone. */
  syncPhase(state) {
    if (state.phase === 'review') this.showReview(state);
    else this.hideReview();
  }

  showReview(state) {
    this.el.review.hidden = false;
    this.el.reviewList.innerHTML = '';

    state.questions.forEach(([question, answer], index) => {
      const item = document.createElement('div');
      item.className = 'review-item';

      const q = document.createElement('p');
      q.className = 'review-q';
      q.textContent = `${index + 1}. ${question}`;

      const a = document.createElement('p');
      a.className = 'review-a';
      a.textContent = answer;

      const row = document.createElement('div');
      row.className = 'row';

      const right = document.createElement('button');
      right.type = 'button';
      right.className = 'right';
      right.textContent = '✓ Right';
      right.classList.toggle('active', state.marks[index] === 'right');
      right.addEventListener('click', () => this.handlers.onMarkAt(index, 'right'));

      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'close';
      close.textContent = '≈ Close';
      close.classList.toggle('active', state.marks[index] === 'close');
      close.addEventListener('click', () => this.handlers.onMarkAt(index, 'close'));

      const wrong = document.createElement('button');
      wrong.type = 'button';
      wrong.className = 'wrong';
      wrong.textContent = '✕ Wrong';
      wrong.classList.toggle('active', state.marks[index] === 'wrong');
      wrong.addEventListener('click', () => this.handlers.onMarkAt(index, 'wrong'));

      row.append(right, close, wrong);
      item.append(q, a, row);
      this.el.reviewList.appendChild(item);
    });

    this.el.generate.disabled = !state.marks.every((m) => MARK_RESULTS.includes(m));
  }

  hideReview() {
    this.el.review.hidden = true;
  }

  setGenerating(progress) {
    if (progress == null) {
      this.el.generate.disabled = false;
      this.el.generate.textContent = 'Generate video';
      return;
    }
    this.el.generate.disabled = true;
    this.el.generate.textContent = `Generating ${Math.round(progress * 100)}%…`;
  }

  setRecording(isRecording) {
    this.el.record.textContent = isRecording ? '■ Stop' : '● Record';
    this.el.record.classList.toggle('is-live', isRecording);
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

  setRestartVisible(on) {
    this.el.restartTop.hidden = !on;
    this.el.restartBottom.hidden = !on;
  }

  /**
   * Back to the landing overlay: camera off, category unpicked, take discarded.
   * Enable camera & mic is the next step.
   */
  resetToLanding() {
    this._cameraEnabled = false;
    this._categoryChosen = false;
    this.el.permOverlay.style.display = '';
    this.el.permOverlay.classList.remove('is-quiz');
    this.el.startStepCam.hidden = false;
    this.el.startStepQuiz.hidden = true;
    this.el.categorySelect.disabled = true;
    this.el.categorySelect.selectedIndex = 0;
    [this.el.start, this.el.shuffle, this.el.record].forEach((btn) => {
      btn.disabled = true;
    });
    this.setRecording(false);
    this.setGenerating(null);
    this.hideReview();
    this.el.download.classList.remove('show');
    this.el.download.removeAttribute('href');
    this.el.camInfo.hidden = true;
    this.el.diag.hidden = true;
    this.setRestartVisible(false);
  }
}
