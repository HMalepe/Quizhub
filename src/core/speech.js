/**
 * Reading questions aloud.
 *
 * Two independent paths, because of a hard browser constraint:
 *
 *   LiveVoice (speechSynthesis)
 *     - Zero setup, works offline, free.
 *     - Plays to the speakers only. CANNOT be captured by MediaRecorder —
 *       speechSynthesis has no MediaStream output anywhere in the spec.
 *     - Use it as a cue so you're reacting to a voice instead of reading text.
 *       You still add the final voiceover in CapCut.
 *
 *   ClipVoice (pre-generated audio files)
 *     - Needs audio files (ElevenLabs, or record yourself).
 *     - Routed through Web Audio, so it CAN be baked into the recording.
 *     - Use it when you want the exported file already finished.
 *
 * Both expose the same speak()/cancel() shape so the caller doesn't care which
 * one is active.
 */

/* ------------------------------------------------------------------ */
/* A. Live cue voice — speechSynthesis                                 */
/* ------------------------------------------------------------------ */

export class LiveVoice {
  constructor() {
    this.supported = typeof speechSynthesis !== 'undefined';
    this.enabled = false;
    this.voice = null;
    this.rate = 1.0;
    this.pitch = 1.0;
    this._unlocked = false;
  }

  /**
   * Voice list loads asynchronously in most browsers, and in Chrome it's often
   * empty on first call until the voiceschanged event fires.
   */
  listVoices() {
    if (!this.supported) return [];
    return speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
  }

  /** Resolves once the voice list is actually populated. */
  async ready() {
    if (!this.supported) return [];
    let voices = this.listVoices();
    if (voices.length) return voices;

    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, 1500);
      speechSynthesis.addEventListener(
        'voiceschanged',
        () => {
          clearTimeout(timeout);
          resolve();
        },
        { once: true }
      );
    });

    return this.listVoices();
  }

  /**
   * Pick a decent default. Browsers ship a lot of low-quality voices; the
   * named ones below are the better-sounding defaults per platform.
   */
  async pickBestVoice() {
    const voices = await this.ready();
    if (!voices.length) return null;

    const preferred = ['Google UK English Male', 'Daniel', 'Google US English', 'Samantha', 'Alex'];
    for (const name of preferred) {
      const match = voices.find((v) => v.name === name);
      if (match) {
        this.voice = match;
        return match;
      }
    }
    this.voice = voices[0];
    return this.voice;
  }

  setVoiceByName(name) {
    const match = this.listVoices().find((v) => v.name === name);
    if (match) this.voice = match;
  }

  /**
   * iOS Safari refuses to speak unless the first utterance originates in a
   * user gesture. Call this from a click handler once, early.
   */
  unlock() {
    if (!this.supported || this._unlocked) return;
    const silent = new SpeechSynthesisUtterance('');
    silent.volume = 0;
    speechSynthesis.speak(silent);
    this._unlocked = true;
  }

  speak(text, onEnd) {
    if (!this.supported || !this.enabled || !text) {
      if (onEnd) onEnd();
      return;
    }
    this.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    if (onEnd) {
      let fired = false;
      const fireOnce = () => {
        if (fired) return;
        fired = true;
        onEnd();
      };
      utterance.onend = fireOnce;
      // Chrome occasionally drops onend on long utterances; this is the
      // documented workaround — a timeout floor based on rough speech rate.
      const estimatedMs = (text.split(/\s+/).length / 2.5) * 1000 + 800;
      setTimeout(fireOnce, estimatedMs / this.rate);
    }

    speechSynthesis.speak(utterance);
  }

  cancel() {
    if (this.supported) speechSynthesis.cancel();
  }
}

/* ------------------------------------------------------------------ */
/* B. Recordable voice — pre-generated audio clips                     */
/* ------------------------------------------------------------------ */

/**
 * Plays audio files through Web Audio, exposing a MediaStream destination that
 * the recorder can mix into the captured file.
 *
 * Expects clips keyed by question index — generate them once with ElevenLabs
 * or record yourself, drop them in /public/voice/ as q0.mp3, q1.mp3, ...
 */
export class ClipVoice {
  constructor() {
    this.ctx = null;
    this.dest = null;
    this.buffers = new Map();
    this.current = null;
    this.enabled = false;
    this.basePath = '/voice/';
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.dest = this.ctx.createMediaStreamDestination();
  }

  /** Audio track to hand to the recorder, or null if unused. */
  getStreamTrack() {
    if (!this.dest) return null;
    const [track] = this.dest.stream.getAudioTracks();
    return track || null;
  }

  async resume() {
    if (this.ctx && this.ctx.state === 'suspended') await this.ctx.resume();
  }

  /**
   * Fetch and decode a clip. Missing files are not an error — they just mean
   * that question has no voiceover, which is a fine state to be in.
   */
  async load(index) {
    if (this.buffers.has(index)) return this.buffers.get(index);
    this.init();

    try {
      const res = await fetch(`${this.basePath}q${index}.mp3`);
      if (!res.ok) throw new Error(`no clip for question ${index}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = await this.ctx.decodeAudioData(arrayBuffer);
      this.buffers.set(index, buffer);
      return buffer;
    } catch {
      this.buffers.set(index, null);
      return null;
    }
  }

  /** Preload a range so playback isn't gated on a network round-trip. */
  async preload(count) {
    const tasks = [];
    for (let i = 0; i < count; i++) tasks.push(this.load(i));
    await Promise.all(tasks);
  }

  async speak(index) {
    if (!this.enabled) return;
    this.init();
    await this.resume();

    const buffer = await this.load(index);
    if (!buffer) return;

    this.cancel();

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination); // audible while filming
    source.connect(this.dest); // captured into the recording
    source.start();
    this.current = source;
  }

  cancel() {
    if (this.current) {
      try {
        this.current.stop();
      } catch {
        /* already finished */
      }
      this.current = null;
    }
  }
}
