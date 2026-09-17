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
import { LiveVoice } from './core/speech.js';
import { AnswerListener } from './core/answerListener.js';
import { matchAnswer } from './core/matching.js';
import { Renderer } from './render/renderer.js';
import { Controls } from './ui/controls.js';

const canvas = document.getElementById('stage');
const camera = new Camera();
const recorder = new CanvasRecorder(canvas);
const voice = new LiveVoice();
const listener = new AnswerListener();

let questions = loadQuestions();
let latestState = null;

const machine = new QuizMachine({
  questions,
  onChange: (state) => {
    latestState = state;
    controls.syncPhase(state);
  },
  onQuestionShown: (questionText) => {
    // If both features are on, don't start listening until the TTS has
    // finished speaking — otherwise the mic hears the app's own voice
    // reading the question and treats it as your answer.
    if (voice.enabled) {
      voice.speak(questionText, () => {
        if (listener.enabled) listener.start();
        if (machine.phase === 'question') machine.startCountdown();
      });
    } else if (listener.enabled) {
      listener.start();
    }
  },
  onReveal: (answerText) => {
    if (!listener.enabled) return;
    const heard = listener.transcript;
    listener.stop();
    controls.showHeardTranscript(heard);

    if (!heard) return; // nothing to grade — leave it for a manual tap
    const result = matchAnswer(heard, answerText);
    machine.mark(result.isMatch ? 'right' : 'wrong');
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
      // Must happen inside this click handler — iOS Safari gates speech on a
      // user gesture and silently no-ops otherwise.
      voice.unlock();
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
  },

  onVoiceToggle: async (on) => {
    voice.enabled = on;
    machine.setHoldForVoice(on);
    if (on) {
      const voices = await voice.ready();
      if (!voice.voice) await voice.pickBestVoice();
      controls.populateVoices(voices, voice.voice ? voice.voice.name : null);
    } else {
      voice.cancel();
    }
  },

  onVoiceChange: (name) => voice.setVoiceByName(name),

  onVoiceRateChange: (rate) => {
    voice.rate = rate;
  },

  onListenToggle: (on) => {
    listener.enabled = on;
    if (!on) listener.stop();
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

if (!voice.supported) {
  controls.disableVoiceUI('Speech synthesis is not available in this browser.');
}

if (!listener.supported) {
  controls.disableListenUI('Speech recognition is not available in this browser.');
} else {
  listener.onPermissionDenied = () => {
    controls.disableListenUI('Microphone permission was denied.');
    alert('Microphone access was denied, so answer listening has been turned off. You can still mark Right/Wrong manually.');
  };
}

// Draw the idle frame before camera permission is granted, so the canvas
// isn't just black behind the permission overlay.
renderer.drawFrame();

window.addEventListener('beforeunload', () => {
  machine.destroy();
  renderer.stop();
  camera.stop();
  voice.cancel();
  listener.stop();
});
