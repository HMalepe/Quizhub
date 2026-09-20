import {
  ALL_FORMATS,
  AudioSample,
  BlobSource,
  BufferTarget,
  Conversion,
  Input,
  Mp4OutputFormat,
  Output,
  Quality
} from 'mediabunny';
import { CANVAS, ENCODING } from './config.js';
import { ensureAacEncoder } from './recorder.js';
import { Renderer } from '../render/renderer.js';
import { getSting, mixStingInto, stingHits } from './stings.js';
import { imageUrlFromQuestion } from './picturePacks.js';
import { preloadImages } from '../render/imageCache.js';

/**
 * Rebuilds the overlay snapshot that should be on screen at `time` seconds
 * into the take, using the phase log captured while recording and the recap
 * marks. Live takes always recorded the answer in white; this is where green,
 * orange (close), and red get applied. The 1/8 counter stays off the download.
 */
export function overlayStateAt(time, questions, timeline, marks, quizTitle = '') {
  let current = { phase: 'idle', index: 0 };
  for (const event of timeline) {
    if (event.t <= time + 1e-3) current = event;
    else break;
  }

  const pair = questions[current.index] || ['', ''];
  const phase = current.phase === 'question' || current.phase === 'reveal' || current.phase === 'title'
    ? current.phase
    : 'idle';

  return {
    phase,
    quizTitle,
    index: current.index,
    total: questions.length,
    question: pair[0],
    answer: pair[1],
    answerResult: phase === 'reveal' ? marks[current.index] || null : null,
    showCounter: false,
    flashUntil: 0
  };
}

/**
 * Re-encodes a recorded take, redrawing the quiz overlay so marked answers
 * land green / orange / red. The mic is copied as packets — transcoding it
 * to mix stings used to drop the whole track and leave a silent download.
 * Stings are mixed in a second pass only when that pass still has audible
 * duration; otherwise the colored file keeps the original voice.
 */
export async function colorizeTake({ blob, questions, timeline, marks, stingPicks, quizTitle, onProgress }) {
  await ensureAacEncoder();

  const hits = stingHits(timeline, marks, stingPicks);
  const colored = await colorizeOnce({ blob, questions, timeline, marks, quizTitle, onProgress });

  if (!hits.length) {
    return fileResult(colored);
  }

  try {
    const mixed = await mixStingsOntoFile(colored.blob, hits);
    if (mixed && await blobAudioSeconds(mixed.blob) >= 0.2) {
      return fileResult(mixed);
    }
  } catch (err) {
    console.warn('Sting mix generate failed; keeping the mic.', err);
  }

  return fileResult(colored);
}

function fileResult(file) {
  return {
    url: URL.createObjectURL(file.blob),
    filename: `trivia-reel-${Date.now()}${file.ext}`
  };
}

async function colorizeOnce({ blob, questions, timeline, marks, quizTitle, onProgress }) {
  // The per-sample `process` callback below draws synchronously — it can't
  // await a logo image mid-conversion. `main.js` already preloads these
  // before Start, but don't lean on that state surviving to generate time;
  // make it true here too.
  const logoUrls = questions.map(([q]) => imageUrlFromQuestion(q)).filter(Boolean);
  if (logoUrls.length) await preloadImages(logoUrls);

  const input = new Input({
    source: new BlobSource(blob),
    formats: ALL_FORMATS
  });

  const format = new Mp4OutputFormat({ fastStart: 'in-memory' });
  const target = new BufferTarget();
  const output = new Output({ format, target });

  const canvas = document.createElement('canvas');
  canvas.width = CANVAS.outputWidth;
  canvas.height = CANVAS.outputHeight;
  const renderer = new Renderer({
    canvas,
    camera: { ready: false, video: { videoWidth: 0, videoHeight: 0 } },
    getState: () => ({ phase: 'idle', index: 0, total: 0, question: '', answer: '', answerResult: null, showCounter: false, flashUntil: 0 })
  });

  const conversion = await Conversion.init({
    input,
    output,
    showWarnings: false,
    copy: { mode: 'preferred', shiftTolerance: Infinity },
    video: {
      forceTranscode: true,
      processedWidth: CANVAS.outputWidth,
      processedHeight: CANVAS.outputHeight,
      quality: new Quality({ bitrate: ENCODING.videoBitsPerSecond, bitrateMode: 'variable' }),
      keyFrameInterval: ENCODING.keyFrameInterval,
      hardwareAcceleration: 'prefer-hardware',
      process: (sample) => {
        const state = overlayStateAt(sample.timestamp, questions, timeline, marks, quizTitle);
        const ctx = renderer.ctx;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        sample.draw(ctx, 0, 0, canvas.width, canvas.height);
        ctx.setTransform(renderer.scale, 0, 0, renderer.scale, 0, 0);
        renderer.drawOverlayZone(state);
        return canvas;
      }
    }
  });

  if (!conversion.isValid) {
    const reason = (conversion.discardedTracks || []).map((d) => d.reason).join(', ') || 'unknown';
    throw new Error(`Could not colorize the take (${reason}).`);
  }

  if (conversion.discardedTracks && conversion.discardedTracks.length) {
    console.warn(
      'Generate discarded tracks:',
      conversion.discardedTracks.map((d) => d.reason).join(', ')
    );
  }

  if (onProgress) conversion.onProgress = onProgress;
  await conversion.execute();

  const mimeType = output.format.mimeType;
  const ext = output.format.fileExtension;
  return {
    blob: new Blob([output.target.buffer], { type: mimeType }),
    mimeType,
    ext
  };
}

async function mixStingsOntoFile(blob, hits) {
  const input = new Input({
    source: new BlobSource(blob),
    formats: ALL_FORMATS
  });

  const format = new Mp4OutputFormat({ fastStart: 'in-memory' });
  const target = new BufferTarget();
  const output = new Output({ format, target });

  const conversion = await Conversion.init({
    input,
    output,
    showWarnings: false,
    copy: { mode: 'preferred', shiftTolerance: Infinity },
    audio: {
      forceTranscode: true,
      quality: new Quality({ bitrate: ENCODING.audioBitsPerSecond, bitrateMode: 'constant' }),
      process: (sample) => mixStingsIntoSample(sample, hits)
    }
  });

  if (!conversion.isValid || !conversionKeepsAudio(conversion)) return null;
  await conversion.execute();

  const mimeType = output.format.mimeType;
  const ext = output.format.fileExtension;
  return {
    blob: new Blob([output.target.buffer], { type: mimeType }),
    mimeType,
    ext
  };
}

function conversionKeepsAudio(conversion) {
  return (conversion.utilizedTracks || []).some((track) => {
    try {
      return typeof track.isAudioTrack === 'function' ? track.isAudioTrack() : track.codecType === 'audio';
    } catch {
      return false;
    }
  });
}

async function blobAudioSeconds(blob) {
  try {
    const input = new Input({
      source: new BlobSource(blob),
      formats: ALL_FORMATS
    });
    const track = await input.getPrimaryAudioTrack();
    if (!track) return 0;
    return await track.computeDuration();
  } catch {
    return 0;
  }
}

/**
 * Adds a reaction onto a decoded mic chunk wherever a marked reveal overlaps
 * this sample. Unrelated chunks pass through untouched. Failures return the
 * original sample so a sting mix cannot silence the take.
 */
export function mixStingsIntoSample(sample, hits) {
  try {
    const start = sample.timestamp;
    const end = start + sample.duration;
    const rate = sample.sampleRate;
    const overlapping = [];
    for (const hit of hits) {
      const sting = getSting(hit.kind, rate, hit.pick ?? hit.index);
      if (!sting.length) continue;
      const stingEnd = hit.t + sting.length / rate;
      if (hit.t < end && stingEnd > start) overlapping.push({ hit, sting });
    }
    if (!overlapping.length) return sample;

    const audioBuffer = sample.toAudioBuffer();
    const frames = audioBuffer.length;
    const scratch = new Float32Array(frames);
    for (const { hit, sting } of overlapping) {
      mixStingInto(scratch, rate, start, sting, rate, hit.t);
    }

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const data = audioBuffer.getChannelData(c);
      for (let i = 0; i < frames; i++) {
        const add = scratch[i];
        if (!add) continue;
        const mixed = data[i] + add;
        data[i] = Math.tanh(mixed);
      }
    }

    const parts = AudioSample.fromAudioBuffer(audioBuffer, start);
    return parts.length === 1 ? parts[0] : parts;
  } catch (err) {
    console.warn('Sting mix failed; keeping this mic chunk.', err);
    return sample;
  }
}
