import './ui/styles.css';

import { CANVAS, TIMING, STORAGE_KEYS } from './core/config.js';
import {
  DEFAULT_QUESTIONS,
  loadQuestions,
  saveQuestions,
  parseQuestionText,
  stringifyQuestions,
  shuffled
} from './core/questions.js';
import { SECTIONS, CATEGORY_BANK } from './core/categoryBank.js';
import { QuizMachine } from './core/quizMachine.js';
import { Camera, describeCameraError, describeCameraQuality } from './core/camera.js';
import { CanvasRecorder, isRecordingSupported } from './core/recorder.js';
import { WakeLock } from './core/wakeLock.js';
import { RecordingDiagnostics } from './core/recordingDiagnostics.js';
import { Renderer } from './render/renderer.js';
import { clearTextLayoutCache } from './render/text.js';
import { Controls } from './ui/controls.js';

const canvas = document.getElementById('stage');
const camera = new Camera();
const recorder = new CanvasRecorder(canvas);
const wakeLock = new WakeLock();

// The camera fills everything below the overlay zone — that's the region the
// negotiated resolution has to cover without being upscaled. Measured against
// the real output size, not the design space, since that's the pixel count the
// feed actually has to supply.
const cameraZoneHeight =
  CANVAS.outputHeight - Math.round(CANVAS.outputHeight * CANVAS.topZoneRatio);

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

const diagnostics = new RecordingDiagnostics({ recorder, camera, renderer });
diagnostics.onUpdate = (report) => controls.showDiagnostics(report);

const controls = new Controls({
  onEnableCamera: async () => {
    try {
      await camera.start();
      controls.enableCameraDependentControls();
      controls.showCameraInfo(
        describeCameraQuality(camera.videoSettings, CANVAS.outputWidth, cameraZoneHeight)
      );
      renderer.start();
      if (!isRecordingSupported()) {
        console.warn('MediaRecorder unavailable — you can still film the screen externally.');
      }
    } catch (err) {
      alert(describeCameraError(err));
    }
  },

  onStart: () => machine.start(),

  onCategoryChange: (value) => {
    if (!value) return;
    questions = value === '__custom' ? loadQuestions() : shuffled(CATEGORY_BANK[value]);
    machine.setQuestions(questions);
    controls.setQuestionBankText(stringifyQuestions(questions));
  },

  onShuffle: () => {
    questions = shuffled(questions);
    machine.setQuestions(questions);
    controls.setQuestionBankText(stringifyQuestions(questions));
  },

  onAdvance: () => machine.advance(),

  onMark: (result) => machine.mark(result),

  onToggleRecord: async () => {
    if (!recorder.recording) {
      try {
        recorder.audioTrack = camera.audioTrack;
        recorder.start();
        diagnostics.start();
        controls.setRecording(true);
        // A sleeping screen stops requestAnimationFrame, which freezes the
        // canvas mid-take while the mic keeps going. Hold the screen awake.
        wakeLock.request();
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        // Before stop(), so the last poll still sees the live track state.
        diagnostics.stop();
        const result = await recorder.stop();
        controls.setRecording(false);
        controls.showDownload(result);
      } catch (err) {
        diagnostics.stop();
        controls.setRecording(false);
        alert(`Could not finish the recording: ${err.message}`);
      } finally {
        wakeLock.release();
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
    controls.setCategorySelectValue('__custom');
    controls.closeSettings();
  },

  onResetQuestions: () => {
    questions = [...DEFAULT_QUESTIONS];
    saveQuestions(questions);
    machine.setQuestions(questions);
    controls.setQuestionBankText(stringifyQuestions(questions));
    controls.setCategorySelectValue('__custom');
  }
});

// Tapping the canvas is the primary interaction during a take.
canvas.addEventListener('click', () => machine.advance());

// Coming back from a hidden page needs two things put right: the browser drops
// the wake lock while hidden, and iOS pauses the <video> the canvas draws from.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  camera.resume();
  wakeLock.reacquire();
});

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

controls.populateCategories(SECTIONS);
controls.setQuestionBankText(stringifyQuestions(questions));
latestState = machine.snapshot();
controls.syncPhase(latestState);

// Text layout is cached by measured width, and Unbounded/Inter load async —
// anything measured before they arrive was measured in the fallback face.
// Drop those entries once the real fonts are in.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(clearTextLayoutCache);
}

// Draw the idle frame before camera permission is granted, so the canvas
// isn't just black behind the permission overlay.
renderer.drawFrame();

window.addEventListener('beforeunload', () => {
  machine.destroy();
  renderer.stop();
  camera.stop();
  wakeLock.release();
});
