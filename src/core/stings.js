/**
 * Game-show reactions for recap marks.
 *
 * Filming stays silent — nothing is wired to speakers while the mic is live,
 * so these cannot leak into the take. They land in two places only:
 *   - a short speaker preview when you tap Right / Close / Wrong on the recap
 *   - mixed onto the download at each reveal timestamp when the video is
 *     generated
 *
 * Each question picks a different reaction from the bank for that mark, so
 * an eight-question take is not the same ding eight times. The pick is
 * index-based, so the recap preview matches the file.
 */

const cache = new Map();

/** Peak of the synthesized sting before it is added on top of the mic. */
const STING_GAIN = 0.62;

const RIGHT_BANK = [
  'applause',
  'cheer',
  'chime',
  'fanfare',
  'whistleClap',
  'bigCheer',
  'sparkle',
  'stadium'
];

const WRONG_BANK = [
  'buzzer',
  'gasp',
  'failHorn',
  'aww',
  'doubleBuzzer',
  'shockGasp',
  'wah',
  'lowBuzzer'
];

const CLOSE_BANK = [
  'ooh',
  'softGasp',
  'hmm'
];

const BANKS = {
  right: RIGHT_BANK,
  wrong: WRONG_BANK,
  close: CLOSE_BANK
};

/**
 * Reveal events that should play a sting in the download.
 * `t` is seconds from the start of the take, matching the recording timeline.
 */
export function stingHits(timeline, marks) {
  const hits = [];
  if (!timeline || !marks) return hits;
  for (const event of timeline) {
    if (event.phase !== 'reveal') continue;
    const kind = marks[event.index];
    if (kind === 'right' || kind === 'wrong' || kind === 'close') {
      hits.push({ t: event.t, kind, index: event.index });
    }
  }
  return hits;
}

export function pickStingId(kind, index) {
  const bank = BANKS[kind];
  if (!bank) return null;
  return bank[((index % bank.length) + bank.length) % bank.length];
}

export function getSting(kind, sampleRate, index = 0) {
  const id = pickStingId(kind, index);
  if (!id) return new Float32Array(0);
  const rate = Math.round(sampleRate);
  const key = `${id}:${rate}`;
  if (!cache.has(key)) cache.set(key, synthesize(id, rate));
  return cache.get(key);
}

/**
 * Mix `sting` (mono) into `dest` (mono frames starting at `destStart` seconds).
 * Linear-interpolates if the sting was built at a different sample rate.
 */
export function mixStingInto(dest, destRate, destStart, sting, stingRate, stingTime, gain = STING_GAIN) {
  if (!dest.length || !sting.length) return;
  for (let i = 0; i < dest.length; i++) {
    const stingPos = ((destStart + i / destRate) - stingTime) * stingRate;
    if (stingPos < 0 || stingPos >= sting.length - 1) continue;
    const j = Math.floor(stingPos);
    const frac = stingPos - j;
    const s = sting[j] * (1 - frac) + sting[j + 1] * frac;
    const mixed = dest[i] + s * gain;
    dest[i] = mixed > 1 ? 1 : mixed < -1 ? -1 : mixed;
  }
}

let previewCtx = null;

/** Speaker preview after the take. Do not call this while recording. */
export async function playSting(kind, index = 0) {
  if (!BANKS[kind]) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  if (!previewCtx) previewCtx = new Ctx();
  if (previewCtx.state === 'suspended') {
    try { await previewCtx.resume(); } catch { /* autoplay lock */ }
  }
  const samples = getSting(kind, previewCtx.sampleRate, index);
  if (!samples.length) return;
  const buffer = previewCtx.createBuffer(1, samples.length, previewCtx.sampleRate);
  buffer.getChannelData(0).set(samples);
  const src = previewCtx.createBufferSource();
  src.buffer = buffer;
  src.connect(previewCtx.destination);
  src.start();
}

function synthesize(id, sr) {
  switch (id) {
    case 'applause': return synthesizeApplause(sr, 0xA11A, 1.15, 62);
    case 'cheer': return synthesizeCheer(sr, 0xC4EE);
    case 'chime': return synthesizeChime(sr);
    case 'fanfare': return synthesizeFanfare(sr);
    case 'whistleClap': return synthesizeWhistleClap(sr, 0xC15E);
    case 'bigCheer': return synthesizeBigCheer(sr, 0xB19);
    case 'sparkle': return synthesizeSparkle(sr);
    case 'stadium': return synthesizeApplause(sr, 0x57AD, 1.35, 38);
    case 'buzzer': return synthesizeBuzzer(sr, 110, 146.8, 0.48, 7);
    case 'gasp': return synthesizeGasp(sr, 0x6A5, 0.36, 1400);
    case 'failHorn': return synthesizeFailHorn(sr);
    case 'aww': return synthesizeAww(sr, 0xA001);
    case 'doubleBuzzer': return synthesizeDoubleBuzzer(sr);
    case 'shockGasp': return synthesizeShockGasp(sr);
    case 'wah': return synthesizeWah(sr);
    case 'lowBuzzer': return synthesizeBuzzer(sr, 78, 98, 0.62, 5);
    case 'ooh': return synthesizeOoh(sr);
    case 'softGasp': return synthesizeGasp(sr, 0x50F, 0.42, 1100);
    case 'hmm': return synthesizeHmm(sr);
    default: return new Float32Array(0);
  }
}

function synthesizeApplause(sr, seed, duration, clapCount) {
  const rng = mulberry32(seed);
  const out = new Float32Array(Math.floor(sr * duration));
  for (let c = 0; c < clapCount; c++) {
    const t0 = 0.03 + rng() * (duration - 0.1);
    const swell = Math.sin(Math.PI * (t0 / duration));
    addClap(out, sr, t0, rng, (0.28 + rng() * 0.22) * swell);
  }
  return normalize(out, 0.86);
}

function synthesizeCheer(sr, seed) {
  const rng = mulberry32(seed);
  const out = synthesizeApplause(sr, seed ^ 0x111, 1.05, 48);
  addWhoop(out, sr, 0.04, 420, 980, 0.32, 0.28);
  addWhoop(out, sr, 0.12, 560, 1320, 0.28, 0.22);
  addWhoop(out, sr, 0.2 + rng() * 0.08, 380, 860, 0.3, 0.18);
  return normalize(out, 0.86);
}

function synthesizeBigCheer(sr, seed) {
  const rng = mulberry32(seed);
  const out = synthesizeApplause(sr, seed ^ 0x222, 1.28, 70);
  addWhoop(out, sr, 0.02, 380, 1100, 0.4, 0.26);
  addWhoop(out, sr, 0.1, 520, 1480, 0.36, 0.24);
  addWhoop(out, sr, 0.18, 300, 720, 0.42, 0.2);
  addWhoop(out, sr, 0.28 + rng() * 0.1, 640, 1600, 0.3, 0.16);
  return normalize(out, 0.86);
}

function synthesizeChime(sr) {
  const out = new Float32Array(Math.floor(sr * 0.58));
  addBell(out, sr, { freq: 784.0, start: 0, dur: 0.38, amp: 0.55 });
  addBell(out, sr, { freq: 1046.5, start: 0.11, dur: 0.47, amp: 0.7 });
  addBell(out, sr, { freq: 1568.0, start: 0.11, dur: 0.28, amp: 0.18 });
  return normalize(out, 0.86);
}

function synthesizeSparkle(sr) {
  const out = new Float32Array(Math.floor(sr * 0.7));
  addBell(out, sr, { freq: 659.3, start: 0, dur: 0.22, amp: 0.45 });
  addBell(out, sr, { freq: 830.6, start: 0.08, dur: 0.24, amp: 0.5 });
  addBell(out, sr, { freq: 987.8, start: 0.16, dur: 0.28, amp: 0.55 });
  addBell(out, sr, { freq: 1318.5, start: 0.24, dur: 0.42, amp: 0.62 });
  return normalize(out, 0.86);
}

function synthesizeFanfare(sr) {
  const out = new Float32Array(Math.floor(sr * 0.72));
  addBrass(out, sr, { freq: 261.6, start: 0, dur: 0.16, amp: 0.42 });
  addBrass(out, sr, { freq: 329.6, start: 0.14, dur: 0.16, amp: 0.46 });
  addBrass(out, sr, { freq: 392.0, start: 0.28, dur: 0.16, amp: 0.5 });
  addBrass(out, sr, { freq: 523.3, start: 0.42, dur: 0.28, amp: 0.58 });
  return normalize(out, 0.86);
}

function synthesizeWhistleClap(sr, seed) {
  const rng = mulberry32(seed);
  const out = synthesizeApplause(sr, seed ^ 0x333, 1.0, 44);
  const n = Math.floor(sr * 0.38);
  for (let i = 0; i < n; i++) {
    const u = i / n;
    const f = 2200 + 1800 * u;
    const env = Math.sin(Math.PI * u);
    const t = i / sr;
    const wobble = 1 + 0.012 * Math.sin(2 * Math.PI * 12 * t);
    out[i] += Math.sin(2 * Math.PI * f * wobble * t) * env * 0.34;
  }
  // a few extra late claps under the whistle
  addClap(out, sr, 0.08, rng, 0.3);
  addClap(out, sr, 0.14, rng, 0.28);
  return normalize(out, 0.86);
}

function synthesizeBuzzer(sr, fA, fB, duration, pulseHz) {
  const n = Math.floor(sr * duration);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const env = Math.min(1, t / 0.006) * Math.exp(-t * 2.8);
    const pulse = 0.72 + 0.28 * Math.sign(Math.sin(2 * Math.PI * pulseHz * t) || 1);
    const a = Math.sign(Math.sin(2 * Math.PI * fA * t) || 1);
    const b = Math.sign(Math.sin(2 * Math.PI * fB * t) || 1);
    out[i] = (a * 0.5 + b * 0.42) * env * pulse * 0.55;
  }
  return normalize(out, 0.86);
}

function synthesizeDoubleBuzzer(sr) {
  const out = new Float32Array(Math.floor(sr * 0.7));
  const first = synthesizeBuzzer(sr, 130, 170, 0.28, 9);
  const second = synthesizeBuzzer(sr, 100, 155, 0.32, 8);
  out.set(first, 0);
  const offset = Math.floor(sr * 0.34);
  for (let i = 0; i < second.length && offset + i < out.length; i++) {
    out[offset + i] += second[i];
  }
  return normalize(out, 0.86);
}

function synthesizeGasp(sr, seed, duration, formant) {
  const rng = mulberry32(seed);
  const n = Math.floor(sr * duration);
  const out = new Float32Array(n);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const attack = 0.07;
    const env = t < attack ? t / attack : Math.exp(-(t - attack) * 12);
    const raw = noise(rng);
    lp = lp * 0.88 + raw * 0.12;
    const hp = raw - lp;
    const form = Math.sin(2 * Math.PI * formant * t) * 0.18;
    out[i] = (hp * 0.72 + lp * 0.18 + form) * env;
  }
  return normalize(out, 0.86);
}

function synthesizeShockGasp(sr) {
  const out = synthesizeGasp(sr, 0x5C0C, 0.32, 1700);
  const buzz = synthesizeBuzzer(sr, 120, 160, 0.4, 8);
  const mixed = new Float32Array(Math.max(out.length, buzz.length + Math.floor(sr * 0.12)));
  mixed.set(out, 0);
  const offset = Math.floor(sr * 0.12);
  for (let i = 0; i < buzz.length && offset + i < mixed.length; i++) {
    mixed[offset + i] += buzz[i] * 0.85;
  }
  return normalize(mixed, 0.86);
}

function synthesizeFailHorn(sr) {
  const duration = 0.78;
  const n = Math.floor(sr * duration);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const u = t / duration;
    const f = 420 * (1 - 0.72 * u);
    const env = Math.min(1, t / 0.02) * (1 - u * 0.35);
    const s =
      Math.sin(2 * Math.PI * f * t)
      + 0.45 * Math.sin(2 * Math.PI * f * 2 * t)
      + 0.18 * Math.sin(2 * Math.PI * f * 3 * t);
    out[i] = s * env * 0.42;
  }
  return normalize(out, 0.86);
}

function synthesizeWah(sr) {
  const duration = 0.7;
  const n = Math.floor(sr * duration);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const u = t / duration;
    const f = 380 * Math.pow(0.45, u);
    const env = Math.min(1, t / 0.015) * Math.exp(-t * 1.6);
    const mute = 0.55 + 0.45 * Math.sin(2 * Math.PI * 5 * t);
    const s = Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(2 * Math.PI * f * 2.02 * t);
    out[i] = s * env * mute * 0.5;
  }
  return normalize(out, 0.86);
}

function synthesizeAww(sr, seed) {
  const rng = mulberry32(seed);
  const duration = 0.85;
  const n = Math.floor(sr * duration);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const u = t / duration;
    const env = Math.min(1, t / 0.05) * Math.exp(-t * 2.1);
    const f1 = 520 * (1 - 0.28 * u);
    const f2 = 840 * (1 - 0.22 * u);
    const voice =
      Math.sin(2 * Math.PI * f1 * t) * 0.45
      + Math.sin(2 * Math.PI * f2 * t) * 0.28
      + Math.sin(2 * Math.PI * (f1 * 0.5) * t) * 0.12;
    out[i] = voice * env;
  }
  // a few people rustling underneath
  for (let c = 0; c < 12; c++) {
    addClap(out, sr, 0.08 + rng() * 0.4, rng, 0.08);
  }
  return normalize(out, 0.86);
}

function synthesizeOoh(sr) {
  const duration = 0.7;
  const n = Math.floor(sr * duration);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const u = t / duration;
    const env = Math.min(1, t / 0.06) * Math.sin(Math.PI * Math.min(1, u * 1.15));
    const f = 380 + 90 * Math.sin(2 * Math.PI * 2.2 * t);
    const s =
      Math.sin(2 * Math.PI * f * t)
      + 0.35 * Math.sin(2 * Math.PI * (f * 2.05) * t)
      + 0.12 * Math.sin(2 * Math.PI * (f * 3.1) * t);
    out[i] = s * env * 0.42;
  }
  return normalize(out, 0.86);
}

function synthesizeHmm(sr) {
  const duration = 0.55;
  const n = Math.floor(sr * duration);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const env = Math.min(1, t / 0.04) * Math.exp(-t * 3.4);
    const f = 180 + 20 * Math.sin(2 * Math.PI * 6 * t);
    const s = Math.sin(2 * Math.PI * f * t) + 0.4 * Math.sin(2 * Math.PI * f * 2 * t);
    out[i] = s * env * 0.48;
  }
  return normalize(out, 0.86);
}

function addClap(out, sr, t0, rng, amp) {
  const start = Math.floor(t0 * sr);
  const n = Math.floor(sr * (0.012 + rng() * 0.012));
  let prev = 0;
  for (let i = 0; i < n && start + i < out.length; i++) {
    const t = i / sr;
    const env = Math.exp(-t * (140 + rng() * 80));
    const raw = noise(rng);
    const hp = raw - prev * 0.55;
    prev = raw;
    out[start + i] += hp * env * amp;
  }
}

function addWhoop(out, sr, t0, f0, f1, dur, amp) {
  const start = Math.floor(t0 * sr);
  const n = Math.floor(dur * sr);
  for (let i = 0; i < n && start + i < out.length; i++) {
    const u = i / n;
    const f = f0 + (f1 - f0) * u * u;
    const env = Math.sin(Math.PI * u);
    const t = i / sr;
    out[start + i] += Math.sin(2 * Math.PI * f * t) * env * amp;
  }
}

function addBell(out, sampleRate, { freq, start, dur, amp }) {
  const startI = Math.floor(start * sampleRate);
  const len = Math.floor(dur * sampleRate);
  for (let i = 0; i < len; i++) {
    const idx = startI + i;
    if (idx >= out.length) break;
    const t = i / sampleRate;
    const env = (1 - Math.exp(-t * 380)) * Math.exp(-t * 7.2);
    const s =
      Math.sin(2 * Math.PI * freq * t)
      + 0.32 * Math.sin(2 * Math.PI * freq * 2 * t)
      + 0.1 * Math.sin(2 * Math.PI * freq * 3 * t);
    out[idx] += s * env * amp;
  }
}

function addBrass(out, sr, { freq, start, dur, amp }) {
  const startI = Math.floor(start * sr);
  const len = Math.floor(dur * sr);
  for (let i = 0; i < len; i++) {
    const idx = startI + i;
    if (idx >= out.length) break;
    const t = i / sr;
    const env = Math.min(1, t / 0.012) * Math.exp(-t * 5.5);
    const s =
      Math.sin(2 * Math.PI * freq * t)
      + 0.5 * Math.sin(2 * Math.PI * freq * 2 * t)
      + 0.28 * Math.sin(2 * Math.PI * freq * 3 * t)
      + 0.12 * Math.sin(2 * Math.PI * freq * 4 * t);
    out[idx] += s * env * amp;
  }
}

function normalize(out, peak) {
  let max = 0;
  for (let i = 0; i < out.length; i++) {
    const a = Math.abs(out[i]);
    if (a > max) max = a;
  }
  if (max < 1e-6) return out;
  const g = peak / max;
  for (let i = 0; i < out.length; i++) out[i] *= g;
  return out;
}

function mulberry32(a) {
  let seed = a >>> 0;
  return function rng() {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function noise(rng) {
  return rng() * 2 - 1;
}
