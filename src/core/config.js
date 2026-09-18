/**
 * Single source of truth for look + layout.
 * Change values here rather than hunting through the render code.
 */

export const CANVAS = {
  width: 1080,
  height: 1920,
  /** Fraction of frame height given to the quiz overlay. Camera gets the rest. */
  topZoneRatio: 0.42
};

export const CAPTURE = {
  /**
   * Ceiling on frames handed to the encoder, not a target. The recorder feeds
   * it one frame per painted frame, so the real rate is whatever the device
   * can actually draw — it degrades to an even 30 or 40 on a slow phone rather
   * than juddering. The cap only stops a 120Hz display encoding 120fps.
   */
  maxFps: 60,
  /**
   * Used only where `requestFrame()` is missing and the browser has to sample
   * the canvas on its own clock. Deliberately lower: that path can't be paced,
   * and Safari is where it lands.
   */
  fallbackFps: 30
};

/**
 * Encoder targets. MediaRecorder's default lands around 1.4 Mbps at
 * 1080×1920, which smears and blocks on any real motion — nothing like what
 * the phone's own camera app produces. Phones shoot 1080p at roughly
 * 10–20 Mbps, so ask for the same ballpark; the file is a CapCut master, not
 * something being streamed, so size matters far less than holding up to a
 * re-encode on upload.
 */
export const ENCODING = {
  videoBitsPerSecond: 12_000_000,
  audioBitsPerSecond: 128_000
};

export const COLORS = {
  bg: '#0B0D12',
  bgTop: '#12151C',
  ink: '#F4F3F0',
  inkDim: '#9BA0AC',
  amber: '#F2B705',
  violet: '#8B6CFF',
  right: '#3ECF8E',
  wrong: '#FF4D4D'
};

/** RGB triples for the translucent full-frame flash on reveal/marking. */
export const FLASH_RGB = {
  neutral: '139,108,255',
  right: '62,207,142',
  wrong: '255,77,77'
};

export const TYPE = {
  counter: '600 26px Inter, sans-serif',
  kicker: '700 24px Inter, sans-serif',
  question: '600 46px Inter, sans-serif',
  answer: '700 54px Unbounded, sans-serif',
  numeral: '900 220px Unbounded, sans-serif',
  idle: '700 44px Unbounded, sans-serif'
};

export const TIMING = {
  /** Default countdown length in seconds; user-overridable in Settings. */
  countdownSeconds: 3,
  /** Duration of the flash overlay (ms). */
  flashMs: 400
};

/**
 * Taps closer together than this count as one gesture. Guards against a
 * double-fire skipping a whole question now that nothing auto-advances.
 */
export const TAP_DEBOUNCE_MS = 300;

export const STORAGE_KEYS = {
  questions: 'trivia-reel:questions',
  countdown: 'trivia-reel:countdown'
};
