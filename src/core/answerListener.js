/**
 * Listens for your spoken answer and accumulates a transcript across the
 * question + countdown window, for comparison against the stored answer
 * once reveal happens.
 *
 * Browser support is genuinely uneven — this is the honest state as of
 * writing:
 *   - Chrome (desktop & Android): reliable
 *   - Safari (macOS): workable
 *   - Safari (iOS): flaky — permission prompts and silent stalls are common
 *   - Firefox: unsupported without flags
 *
 * Because of that unevenness, this is built as an assist, never an
 * authority: it proposes a mark, main.js applies it via machine.mark(), and
 * your manual Right/Wrong buttons stay fully live so a misheard answer is a
 * one-tap fix, not a re-take.
 *
 * Mobile browsers frequently stop a "continuous" recognition session after a
 * few seconds of silence even with continuous:true — this restarts it
 * automatically while listening is meant to be active, so a pause before you
 * answer doesn't cut it off.
 */
export class AnswerListener {
  constructor() {
    const Impl = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.supported = Boolean(Impl);
    this.enabled = false;
    this._shouldBeListening = false;
    this._transcript = '';
    this.onTranscriptChange = () => {};
    this.onPermissionDenied = null;

    if (!this.supported) return;

    this.recognition = new Impl();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      let finalChunk = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalChunk += event.results[i][0].transcript + ' ';
        }
      }
      if (finalChunk) {
        this._transcript = (this._transcript + ' ' + finalChunk).trim();
        this.onTranscriptChange(this._transcript);
      }
    };

    this.recognition.onerror = (event) => {
      // 'no-speech' and 'aborted' are routine — not worth surfacing.
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.warn('Speech recognition error:', event.error);
      }
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this._shouldBeListening = false;
        if (this.onPermissionDenied) this.onPermissionDenied();
      }
    };

    this.recognition.onend = () => {
      // Browsers end the session on their own after a pause. Restart it
      // transparently if we're still supposed to be listening.
      if (this._shouldBeListening) {
        try {
          this.recognition.start();
        } catch {
          // Already starting — ignorable race between onend and a manual start().
        }
      }
    };
  }

  get transcript() {
    return this._transcript;
  }

  clearTranscript() {
    this._transcript = '';
  }

  start() {
    if (!this.supported || !this.enabled) return;
    this._shouldBeListening = true;
    this.clearTranscript();
    try {
      this.recognition.start();
    } catch {
      // Already running — fine, onend's restart logic will keep it alive.
    }
  }

  stop() {
    this._shouldBeListening = false;
    if (this.supported) {
      try {
        this.recognition.stop();
      } catch {
        /* not running */
      }
    }
  }
}
