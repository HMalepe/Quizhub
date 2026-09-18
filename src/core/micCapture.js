/**
 * Pulls PCM from a live mic track without playing it back.
 *
 * Mediabunny's MediaStreamAudioTrackSource is the wrong tool here:
 *   - On Safari it uses ScriptProcessor connected to the speakers, so the
 *     mic comes out the phone (and echo-cancellation then chews the recording).
 *   - When the encoder queue is busy it *drops* audio. Dropped AAC frames
 *     become clicks, crackle, and little silent holes.
 *
 * Preferred path is a Worker + MediaStreamTrackProcessor: the mic is read
 * off the main thread so canvas encode cannot starve it. MessagePort queues
 * samples instead of dropping them. AudioWorklet is the Safari fallback,
 * pulled by a muted GainNode so nothing plays through the speakers.
 * ScriptProcessor is last resort.
 *
 * Do not stop() the incoming camera track; cloning is only for the worker
 * transfer and that clone is what gets stopped.
 */

const WORKLET_NAME = 'trivia-mic-capture';
const WORKLET_SOURCE = `
class TriviaMicCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._chunks = [];
    this._frames = 0;
    this._target = 2048;
    this._sent = 0;
    this.port.onmessage = (event) => {
      if (event.data === 'flush') this._flush(true);
    };
  }

  _mixMono(input) {
    const frames = input[0].length;
    if (input.length === 1) return Float32Array.from(input[0]);
    const out = new Float32Array(frames);
    const n = input.length;
    for (let i = 0; i < frames; i++) {
      let sum = 0;
      for (let c = 0; c < n; c++) sum += input[c][i];
      out[i] = sum / n;
    }
    return out;
  }

  _flush(signalDone) {
    if (this._frames) {
      const data = new Float32Array(this._frames);
      let offset = 0;
      for (const chunk of this._chunks) {
        data.set(chunk, offset);
        offset += chunk.length;
      }
      this._chunks = [];
      this._frames = 0;
      this._sent += data.length;
      this.port.postMessage({ type: 'audio', data, sent: this._sent }, [data.buffer]);
    }
    if (signalDone) this.port.postMessage({ type: 'flushed', sent: this._sent });
  }

  process(inputs) {
    const input = inputs[0];
    if (!input || !input[0] || input[0].length === 0) return true;
    this._chunks.push(this._mixMono(input));
    this._frames += input[0].length;
    if (this._frames >= this._target) this._flush(false);
    return true;
  }
}
registerProcessor('${WORKLET_NAME}', TriviaMicCaptureProcessor);
`;

const WORKER_SOURCE = `
self.onmessage = async (event) => {
  if (event.data.type === 'stop') {
    try { await self.__reader.cancel(); } catch (e) {}
    return;
  }
  if (event.data.type !== 'start') return;
  const track = event.data.track;
  const processor = new MediaStreamTrackProcessor({ track });
  self.__reader = processor.readable.getReader();
  try {
    while (true) {
      const { done, value } = await self.__reader.read();
      if (done) break;
      const frames = value.numberOfFrames;
      const channels = value.numberOfChannels;
      const sampleRate = value.sampleRate;
      const mono = new Float32Array(frames);
      try {
        if (channels <= 1) {
          value.copyTo(mono, { planeIndex: 0, format: 'f32-planar' });
        } else {
          const plane = new Float32Array(frames);
          for (let c = 0; c < channels; c++) {
            value.copyTo(plane, { planeIndex: c, format: 'f32-planar' });
            for (let i = 0; i < frames; i++) mono[i] += plane[i];
          }
          const inv = 1 / channels;
          for (let i = 0; i < frames; i++) mono[i] *= inv;
        }
      } finally {
        value.close();
      }
      self.postMessage({ type: 'audio', data: mono, sampleRate }, [mono.buffer]);
    }
  } catch (err) {
    if (!err || err.name !== 'AbortError') {
      self.postMessage({ type: 'error', message: String(err && err.message ? err.message : err) });
    }
  }
  self.postMessage({ type: 'done' });
};
`;

function makeMonoBuffer(data, sampleRate) {
  const buffer = new AudioBuffer({
    length: data.length,
    numberOfChannels: 1,
    sampleRate
  });
  buffer.copyToChannel(data, 0);
  return buffer;
}

function mixAudioData(audioData) {
  const frames = audioData.numberOfFrames;
  const channels = audioData.numberOfChannels;
  const mono = new Float32Array(frames);
  if (channels <= 1) {
    audioData.copyTo(mono, { planeIndex: 0, format: 'f32-planar' });
    return mono;
  }
  const plane = new Float32Array(frames);
  for (let c = 0; c < channels; c++) {
    audioData.copyTo(plane, { planeIndex: c, format: 'f32-planar' });
    for (let i = 0; i < frames; i++) mono[i] += plane[i];
  }
  const inv = 1 / channels;
  for (let i = 0; i < frames; i++) mono[i] *= inv;
  return mono;
}

export class MicCapture {
  constructor() {
    this.onBuffer = null;
    this._ctx = null;
    this._source = null;
    this._node = null;
    this._mute = null;
    this._processor = null;
    this._reader = null;
    this._abort = null;
    this._worker = null;
    this._done = null;
    this._worklet = false;
    this._flushed = null;
    this._sampleRate = 48000;
    this._track = null;
    this._enabled = false;
    this.mode = 'none';
    this.receivedFrames = 0;
    this.sentFrames = 0;
  }

  get sampleRate() {
    return this._sampleRate;
  }

  get active() {
    return this.mode !== 'none';
  }

  async start(track) {
    await this.stop();
    this.receivedFrames = 0;
    this.sentFrames = 0;
    this._sampleRate = track.getSettings().sampleRate || 48000;
    this._track = track;
    this._enabled = false;

    if (typeof MediaStreamTrackProcessor !== 'undefined') {
      this.mode = 'processor';
      return;
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    this._ctx = new AudioContextCtor();
    if (this._ctx.state === 'suspended') await this._ctx.resume();
    this._sampleRate = this._ctx.sampleRate;
    this._source = this._ctx.createMediaStreamSource(new MediaStream([track]));
    this._mute = this._ctx.createGain();
    this._mute.gain.value = 0;

    try {
      await this._startWorklet();
    } catch (err) {
      console.warn('AudioWorklet mic capture unavailable, using ScriptProcessor:', err);
      this._startScriptProcessor();
    }
  }

  enable() {
    if (this._enabled) return;
    this._enabled = true;
    if (this.mode === 'processor' && this._track) {
      if (!this._startWorker(this._track)) this._startProcessor(this._track);
    }
  }

  _startWorker(track) {
    if (typeof Worker === 'undefined' || typeof MediaStreamTrackProcessor === 'undefined') return false;
    let clone;
    try {
      clone = track.clone();
    } catch {
      return false;
    }
    try {
      const blob = new Blob([WORKER_SOURCE], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      this._worker = new Worker(url);
      URL.revokeObjectURL(url);
      this._worker.onmessage = (event) => this._onWorkerMessage(event.data);
      this._worker.postMessage({ type: 'start', track: clone }, [clone]);
      this.mode = 'worker';
      return true;
    } catch (err) {
      console.warn('Mic worker capture failed, using main thread:', err);
      try { clone.stop(); } catch { /* already transferred */ }
      if (this._worker) {
        this._worker.terminate();
        this._worker = null;
      }
      return false;
    }
  }

  _onWorkerMessage(message) {
    if (!message) return;
    if (message.type === 'audio' && message.data && message.data.length) {
      this._sampleRate = message.sampleRate || this._sampleRate;
      this.sentFrames += message.data.length;
      this.receivedFrames += message.data.length;
      this._emit(message.data);
    }
    if (message.type === 'error') console.error('Mic worker:', message.message);
    if (message.type === 'done' && this._done) this._done();
  }

  _startProcessor(track) {
    this._abort = new AbortController();
    const processor = new MediaStreamTrackProcessor({ track });
    this._reader = processor.readable.getReader();
    this.mode = 'processor';
    void this._pumpProcessor(this._abort.signal);
  }

  async _pumpProcessor(signal) {
    try {
      while (!signal.aborted) {
        const { done, value } = await this._reader.read();
        if (done || signal.aborted) {
          if (value) value.close();
          break;
        }
        try {
          this._sampleRate = value.sampleRate || this._sampleRate;
          const data = mixAudioData(value);
          this.sentFrames += data.length;
          this.receivedFrames += data.length;
          this._emit(data);
        } finally {
          value.close();
        }
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return;
      console.error('Mic processor failed:', err);
    }
  }

  async _startWorklet() {
    const blob = new Blob([WORKLET_SOURCE], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    try {
      await this._ctx.audioWorklet.addModule(url);
    } finally {
      URL.revokeObjectURL(url);
    }

    this._node = new AudioWorkletNode(this._ctx, WORKLET_NAME, {
      numberOfInputs: 1,
      numberOfOutputs: 1
    });
    this._node.port.onmessage = (event) => this._onWorkletMessage(event.data);
    this._source.connect(this._node);
    this._node.connect(this._mute);
    this._mute.connect(this._ctx.destination);
    this._worklet = true;
    this.mode = 'worklet';
  }

  _startScriptProcessor() {
    const bufferSize = 8192;
    this._processor = this._ctx.createScriptProcessor(bufferSize, 1, 1);
    this._processor.onaudioprocess = (event) => {
      const input = event.inputBuffer;
      const data = new Float32Array(input.length);
      input.copyFromChannel(data, 0);
      this.sentFrames += data.length;
      this.receivedFrames += data.length;
      this._emit(data);
    };
    this._source.connect(this._processor);
    this._processor.connect(this._mute);
    this._mute.connect(this._ctx.destination);
    this._worklet = false;
    this.mode = 'script';
  }

  _onWorkletMessage(message) {
    if (!message) return;
    if (message.type === 'audio' && message.data && message.data.length) {
      this.receivedFrames += message.data.length;
      if (typeof message.sent === 'number') this.sentFrames = message.sent;
      this._emit(message.data);
    }
    if (typeof message.sent === 'number') this.sentFrames = message.sent;
    if (message.type === 'flushed' && this._flushed) this._flushed();
  }

  _emit(data) {
    if (!this.onBuffer || !data.length) return;
    this.onBuffer(makeMonoBuffer(data, this._sampleRate));
  }

  async resume() {
    if (this._ctx && this._ctx.state === 'suspended') {
      try {
        await this._ctx.resume();
      } catch {
        /* next visibilitychange will retry */
      }
    }
  }

  async flush() {
    if (this.mode === 'worker' && this._worker) {
      const done = new Promise((resolve) => {
        this._done = resolve;
        setTimeout(resolve, 800);
      });
      try { this._worker.postMessage({ type: 'stop' }); } catch { /* terminating */ }
      await done;
      this._done = null;
      await new Promise((resolve) => setTimeout(resolve, 40));
      return;
    }
    if (this.mode === 'processor') {
      await new Promise((resolve) => setTimeout(resolve, 80));
      return;
    }
    if (!this._worklet || !this._node) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return;
    }
    await new Promise((resolve) => {
      this._flushed = resolve;
      this._node.port.postMessage('flush');
      setTimeout(resolve, 400);
    });
    this._flushed = null;
    const waitUntil = performance.now() + 2000;
    while (this.receivedFrames < this.sentFrames && performance.now() < waitUntil) {
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  }

  async stop() {
    this.onBuffer = null;
    if (this._abort) {
      this._abort.abort();
      this._abort = null;
    }
    if (this._worker) {
      try { this._worker.terminate(); } catch { /* already down */ }
      this._worker.onmessage = null;
      this._worker = null;
    }
    if (this._reader) {
      try { await this._reader.cancel(); } catch { /* already closed */ }
      this._reader = null;
    }
    if (this._processor) {
      try { this._processor.disconnect(); } catch { /* already down */ }
      this._processor.onaudioprocess = null;
      this._processor = null;
    }
    if (this._node) {
      try { this._node.disconnect(); } catch { /* already down */ }
      this._node.port.onmessage = null;
      this._node = null;
    }
    if (this._source) {
      try { this._source.disconnect(); } catch { /* already down */ }
      this._source = null;
    }
    if (this._mute) {
      try { this._mute.disconnect(); } catch { /* already down */ }
      this._mute = null;
    }
    if (this._ctx) {
      try { await this._ctx.close(); } catch { /* already closed */ }
      this._ctx = null;
    }
    this._worklet = false;
    this._enabled = false;
    this._track = null;
    this.mode = 'none';
  }
}
