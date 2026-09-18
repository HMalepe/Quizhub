import {
  ALL_FORMATS,
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

/**
 * Rebuilds the overlay snapshot that should be on screen at `time` seconds
 * into the take, using the phase log captured while recording and the recap
 * marks. Live takes always recorded the answer in white; this is where green
 * and red get applied.
 */
export function overlayStateAt(time, questions, timeline, marks) {
  let current = { phase: 'idle', index: 0 };
  for (const event of timeline) {
    if (event.t <= time + 1e-3) current = event;
    else break;
  }

  const pair = questions[current.index] || ['', ''];
  const phase = current.phase === 'question' || current.phase === 'reveal'
    ? current.phase
    : 'idle';

  return {
    phase,
    index: current.index,
    total: questions.length,
    question: pair[0],
    answer: pair[1],
    answerResult: phase === 'reveal' ? marks[current.index] || null : null,
    flashUntil: 0
  };
}

/**
 * Re-encodes a recorded take, redrawing the quiz overlay so marked answers
 * land green (right) or red (wrong). Audio packets are copied, never
 * transcoded — a second AAC pass is where crackle comes back.
 */
export async function colorizeTake({ blob, questions, timeline, marks, onProgress }) {
  await ensureAacEncoder();

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
    getState: () => ({ phase: 'idle', index: 0, total: 0, question: '', answer: '', answerResult: null, flashUntil: 0 })
  });

  const conversion = await Conversion.init({
    input,
    output,
    showWarnings: false,
    // Copy the already-encoded mic. A second AAC pass is where crackle comes
    // back. Shift tolerance lets the muxer keep A/V lock without resampling.
    copy: { mode: 'preferred', shiftTolerance: Infinity },
    video: {
      forceTranscode: true,
      processedWidth: CANVAS.outputWidth,
      processedHeight: CANVAS.outputHeight,
      quality: new Quality({ bitrate: ENCODING.videoBitsPerSecond, bitrateMode: 'variable' }),
      keyFrameInterval: ENCODING.keyFrameInterval,
      hardwareAcceleration: 'prefer-hardware',
      process: (sample) => {
        const state = overlayStateAt(sample.timestamp, questions, timeline, marks);
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

  if (onProgress) conversion.onProgress = onProgress;
  await conversion.execute();

  const mimeType = output.format.mimeType;
  const ext = output.format.fileExtension;
  const outBlob = new Blob([output.target.buffer], { type: mimeType });
  return {
    url: URL.createObjectURL(outBlob),
    filename: `trivia-reel-${Date.now()}${ext}`
  };
}
