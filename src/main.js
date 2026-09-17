import './ui/styles.css';

import { TIMING, STORAGE_KEYS } from './core/config.js';
import {
  DEFAULT_QUESTIONS,
  loadQuestions,
  saveQuestions,
  parseQuestionText,
  stringifyQuestions,
  shuffled
} from './core/questions.js';
import { QuizMachine } from './core/quizMachine.js';
import { Camera, describeCameraError } from './core/camera.js';
import { CanvasRecorder, isRecordingSupported } from './core/recorder.js';
import { Renderer } from './render/renderer.js';
import { Controls } from './ui/controls.js';

const canvas = document.getElementById('stage');
const camera = new Camera();
const recorder = new CanvasRecorder(canvas);

let questions = loadQuestions();
let latestState = null;

const machine = new QuizMachine({
  questions,
  onChange: (state) => {
    latestState = state;
    controls.syncPhase(state);
  }
});

const renderer = new Renderer({
  canvas,
  camera,
  getState: () => latestState || machine.snapshot()
});

const controls = new Controls({
  onEnableCamera: async () => {
    try {
      await camera.start();
      controls.enableCameraDependentControls();
      renderer.start();
      if (!isRecordingSupported()) {
        console.warn('MediaRecorder unavailable — you can still film the screen externally.');
      }
    } catch (err) {
      alert(describeCameraError(err));
    }
  },

  onStart: () => machine.start(),

  onShuffle: () => {
    questions = shuffled(questions);
    machine.setQuestions(questions);
    controls.setQuestionBankText(stringifyQuestions(questions));
  },

  onFlip: async () => {
    try {
      await camera.flip();
    } catch (err) {
      alert(describeCameraError(err));
    }
  },

  onAdvance: () => machine.advance(),

  onMark: (result) => machine.mark(result),

  onToggleRecord: async () => {
    if (!recorder.recording) {
      try {
        recorder.start();
        controls.setRecording(true);
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        const result = await recorder.stop();
        controls.setRecording(false);
        controls.showDownload(result);
      } catch (err) {
        controls.setRecording(false);
        alert(`Could not finish the recording: ${err.message}`);
      }
    }
  },

  onCountdownChange: (value) => {
    machine.setCountdownSeconds(value);
    try {
      localStorage.setItem(STORAGE_KEYS.countdown, String(machine.countdownSeconds));
    } catch {
      /* non-fatal */
    }
  },

  onSaveQuestions: (raw) => {
    const parsed = parseQuestionText(raw);
    if (!parsed.length) {
      alert('No valid questions found. Each line needs the format:\n\nQuestion | Answer');
      return;
    }
    questions = parsed;
    saveQuestions(questions);
    machine.setQuestions(questions);
    controls.closeSettings();
  },

  onResetQuestions: () => {
    questions = [...DEFAULT_QUESTIONS];
    saveQuestions(questions);
    machine.setQuestions(questions);
    controls.setQuestionBankText(stringifyQuestions(questions));
  }
});

// Tapping the canvas is the primary interaction during a take.
canvas.addEventListener('click', () => machine.advance());

// ---- restore persisted settings ----
const storedCountdown = (() => {
  try {
    return localStorage.getItem(STORAGE_KEYS.countdown);
  } catch {
    return null;
  }
})();

if (storedCountdown) {
  machine.setCountdownSeconds(storedCountdown);
  controls.setCountdownValue(machine.countdownSeconds);
} else {
  controls.setCountdownValue(TIMING.countdownSeconds);
}

controls.setQuestionBankText(stringifyQuestions(questions));
latestState = machine.snapshot();
controls.syncPhase(latestState);

// Draw the idle frame before camera permission is granted, so the canvas
// isn't just black behind the permission overlay.
renderer.drawFrame();

window.addEventListener('beforeunload', () => {
  machine.destroy();
  renderer.stop();
  camera.stop();
});
