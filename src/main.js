import './ui/styles.css';

import { CANVAS, STORAGE_KEYS } from './core/config.js';
import { loadQuestions, shuffled } from './core/questions.js';
import { SECTIONS, CATEGORY_BANK } from './core/categoryBank.js';
import { loadPackIndex, loadPack, imageUrlFromQuestion } from './core/picturePacks.js';
import { preloadImages } from './render/imageCache.js';
import { QuizMachine } from './core/quizMachine.js';
import { Camera, describeCameraError, describeCameraQuality } from './core/camera.js';
import { CanvasRecorder, isRecordingSupported, prefetchEncoders } from './core/recorder.js';
import { WakeLock } from './core/wakeLock.js';
import { RecordingDiagnostics } from './core/recordingDiagnostics.js';
import { Renderer } from './render/renderer.js';
import { clearTextLayoutCache } from './render/text.js';
import { Controls } from './ui/controls.js';
import { playSting } from './core/stings.js';

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
let timeline = [];
let rawTake = null;
let generating = false;
let generateToken = 0;
let restarting = false;

function logTimeline(state) {
  if (!recorder.recording) return;
  if (state.phase !== 'question' && state.phase !== 'reveal' && state.phase !== 'title') return;
  const last = timeline[timeline.length - 1];
  if (last && last.phase === state.phase && last.index === state.index) return;
  timeline.push({
    t: recorder.elapsedSeconds,
    phase: state.phase,
    index: state.index
  });
}

async function stopRecordingQuietly() {
  if (!recorder.recording) return;
  diagnostics.stop();
  try {
    rawTake = await recorder.stop();
  } catch (err) {
    alert(`Could not finish the recording: ${err.message}`);
    rawTake = null;
  } finally {
    controls.setRecording(false);
    wakeLock.release();
  }
}

const machine = new QuizMachine({
  questions,
  onChange: (state) => {
    latestState = state;
    controls.syncPhase(state);
    logTimeline(state);
    if (state.phase === 'review' && recorder.recording) {
      void stopRecordingQuietly();
    }
  }
});

const renderer = new Renderer({
  canvas,
  camera,
  getState: () => latestState || machine.snapshot()
});
renderer.onAfterDraw = () => recorder.captureFrame();

const diagnostics = new RecordingDiagnostics({ recorder, camera, renderer });
diagnostics.onUpdate = (report) => controls.showDiagnostics(report);

/** Picture rounds, keyed by the `__pack:<id>` value their <option> carries. */
const picturePacks = new Map();

function quizDisplayName(value) {
  if (!value) return '';
  if (value === '__custom') return 'My Questions';
  const pack = picturePacks.get(value);
  if (pack) return pack.name;
  return `Can You Pass as ${value}`;
}

const controls = new Controls({
  onEnableCamera: async () => {
    try {
      await camera.start();
      controls.enableCameraDependentControls();
      controls.showCameraInfo(
        describeCameraQuality(camera.videoSettings, CANVAS.outputWidth, cameraZoneHeight)
      );
      renderer.start();
      prefetchEncoders();
      if (!isRecordingSupported()) {
        console.warn('Recording unavailable — you can still film the screen externally.');
      }
    } catch (err) {
      alert(describeCameraError(err));
    }
  },

  onStart: () => machine.start(),

  onCategoryChange: async (value) => {
    if (!value) return;

    const pack = picturePacks.get(value);
    if (pack) {
      const packQuestions = await loadPack(pack);
      if (!packQuestions.length) {
        alert(
          `No pictures in the "${pack.name}" round yet. Drop images in ` +
          `public/packs/${pack.dir}/ and list them in that folder's manifest.json, ` +
          'then redeploy — see public/packs/README.md.'
        );
        controls.setCategorySelectValue('');
        return;
      }
      // Preload before Start so the first paint of question 1 isn't blank —
      // getCachedImage() is synchronous and returns null until a URL loads.
      await preloadImages(packQuestions.map(([q]) => imageUrlFromQuestion(q)));
      questions = shuffled(packQuestions);
    } else {
      questions = value === '__custom' ? loadQuestions() : shuffled(CATEGORY_BANK[value]);
    }

    machine.setQuestions(questions);
    machine.setQuizTitle(quizDisplayName(value));
  },

  onShuffle: () => {
    questions = shuffled(questions);
    machine.setQuestions(questions);
  },

  onAdvance: () => machine.advance(),

  onMarkAt: (index, result) => {
    machine.markAt(index, result);
    // Recap only — recording has already stopped, so this cannot leak into the mic.
    if (result === 'right' || result === 'wrong' || result === 'close') {
      void playSting(result, machine.stingPicks[index]);
    }
  },

  onGenerate: async () => {
    if (generating) return;
    if (!rawTake) {
      alert('Record a take first, then mark your answers to generate the video.');
      return;
    }
    if (!machine.allMarked) {
      alert('Mark every question right, close, or wrong before generating.');
      return;
    }

    generating = true;
    const token = ++generateToken;
    controls.setGenerating(0);
    try {
      const { colorizeTake } = await import('./core/colorizeTake.js');
      const blob = rawTake.blob || (await fetch(rawTake.url).then((r) => r.blob()));
      const result = await colorizeTake({
        blob,
        questions: machine.questions,
        timeline,
        marks: machine.marks,
        stingPicks: machine.stingPicks,
        quizTitle: machine.quizTitle,
        onProgress: (progress) => {
          if (token !== generateToken) return;
          controls.setGenerating(progress);
        }
      });
      if (token !== generateToken) {
        URL.revokeObjectURL(result.url);
        return;
      }
      controls.showDownload(result);
    } catch (err) {
      if (token !== generateToken) return;
      console.error(err);
      alert(`Could not generate the video: ${err.message}`);
      if (rawTake) controls.showDownload(rawTake);
    } finally {
      if (token !== generateToken) return;
      generating = false;
      controls.setGenerating(null);
      if (latestState && latestState.phase === 'review') controls.showReview(latestState);
    }
  },

  onToggleRecord: async () => {
    if (!recorder.recording) {
      try {
        if (rawTake?.url) URL.revokeObjectURL(rawTake.url);
        rawTake = null;
        timeline = [];
        recorder.audioTrack = camera.audioTrack;
        if (!recorder.audioTrack) {
          throw new Error('Microphone is not available. Tap Restart, then Enable camera & mic, and allow both.');
        }
        await recorder.start();
        const state = machine.snapshot();
        if (state.phase === 'question' || state.phase === 'reveal' || state.phase === 'title') {
          timeline.push({ t: 0, phase: state.phase, index: state.index });
        }
        diagnostics.start();
        controls.setRecording(true);
        // A sleeping screen stops requestAnimationFrame, which freezes the
        // canvas mid-take while the mic keeps going. Hold the screen awake.
        wakeLock.request();
      } catch (err) {
        alert(err.message);
      }
    } else {
      await stopRecordingQuietly();
    }
  },

  onRestart: () => { void restartToLanding(); }
});

async function restartToLanding() {
  if (restarting) return;
  restarting = true;
  generateToken += 1;
  generating = false;
  try {
    diagnostics.stop();
    if (recorder.recording) {
      try {
        await recorder.stop();
      } catch {
        /* still going back to landing */
      }
    }
    controls.setRecording(false);
    wakeLock.release();
    renderer.stop();
    camera.stop();
    recorder.audioTrack = null;
    if (rawTake?.url) URL.revokeObjectURL(rawTake.url);
    rawTake = null;
    timeline = [];
    machine.resetToIdle();
    questions = loadQuestions();
    machine.setQuestions(questions);
    controls.resetToLanding();
    renderer.drawFrame();
  } finally {
    restarting = false;
  }
}

// Tapping the canvas is the primary interaction during a take.
canvas.addEventListener('click', () => machine.advance());

// Coming back from a hidden page needs two things put right: the browser drops
// the wake lock while hidden, and iOS pauses the <video> the canvas draws from.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  camera.resume();
  void recorder.resumeCapture();
  wakeLock.reacquire();
});

controls.populateCategories(SECTIONS);
latestState = machine.snapshot();
controls.syncPhase(latestState);

// Picture rounds come from a manifest rather than the bundle, so the picker
// gets them once the index lands. Only the registry is fetched here — a pack's
// own images wait until that round is actually chosen.
void loadPackIndex().then((packs) => {
  if (!packs.length) return;
  for (const pack of packs) picturePacks.set(`__pack:${pack.id}`, pack);
  controls.addPicturePacks(packs.map((p) => ({ value: `__pack:${p.id}`, label: p.name })));
});

// Text layout is cached by measured width, and the webfonts load async —
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
