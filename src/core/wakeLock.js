/**
 * Keeps the screen awake while recording.
 *
 * This exists because of a specific failure: filming with the phone on a
 * tripod, you don't touch the screen, it sleeps — and `requestAnimationFrame`
 * stops firing on a hidden page. The canvas then stops being repainted, so
 * `captureStream` emits the same frame forever while the mic track keeps
 * recording. The result is a take with good audio over frozen video.
 *
 * The lock is released by the browser whenever the page is hidden, so it has
 * to be re-acquired on the way back — see `reacquire()`.
 *
 * Unsupported browsers (iOS Safari before 16.4) just no-op. Recording still
 * works there; the screen timeout is the user's problem to avoid.
 */
export class WakeLock {
  constructor() {
    this.supported = typeof navigator !== 'undefined' && 'wakeLock' in navigator;
    this._sentinel = null;
    this._wanted = false;
  }

  get held() {
    return Boolean(this._sentinel);
  }

  async request() {
    this._wanted = true;
    if (!this.supported || this._sentinel) return;

    try {
      this._sentinel = await navigator.wakeLock.request('screen');
      this._sentinel.addEventListener('release', () => {
        this._sentinel = null;
      });
    } catch {
      // Rejects if the page is hidden or the OS refuses (low battery, etc).
      // Not fatal — the recording is still running.
      this._sentinel = null;
    }
  }

  /** Call on visibilitychange: the browser drops the lock when hidden. */
  async reacquire() {
    if (this._wanted && !this._sentinel) await this.request();
  }

  async release() {
    this._wanted = false;
    if (!this._sentinel) return;
    try {
      await this._sentinel.release();
    } catch {
      /* already gone */
    }
    this._sentinel = null;
  }
}
