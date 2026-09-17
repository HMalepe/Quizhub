/**
 * Single source of truth for look + layout.
 * Change values here rather than hunting through the render code.
 */

export const CANVAS = {
  width: 1080,
  height: 1920,
  /** Fraction of frame height given to the quiz overlay. Camera gets the rest. */
  topZoneRatio: 0.42,
  fps: 30
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
  /** How long the question sits on screen before the countdown auto-starts (ms). */
  questionHoldMs: 1600,
  /** Default countdown length in seconds; user-overridable in Settings. */
  countdownSeconds: 3,
  /** Duration of the flash overlay (ms). */
  flashMs: 400
};

export const STORAGE_KEYS = {
  questions: 'trivia-reel:questions',
  countdown: 'trivia-reel:countdown'
};
