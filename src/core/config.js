/**
 * Single source of truth for look + layout.
 * Change values here rather than hunting through the render code.
 */

export const CANVAS = {
  /**
   * Design space. Every coordinate, font size and offset in the render code is
   * written against this, and the context is scaled to the real output size —
   * so changing the output below needs no layout changes at all. Don't change
   * these two.
   */
  width: 1080,
  height: 1920,

  /**
   * What actually gets recorded. 720×1280 is 56% fewer pixels than 1080×1920,
   * which is the difference between a phone encoding in realtime and dropping
   * frames. TikTok re-encodes on upload anyway.
   */
  outputWidth: 720,
  outputHeight: 1280,

  /** Fraction of frame height given to the quiz overlay. Camera gets the rest. */
  topZoneRatio: 0.42
};

export const CAPTURE = {
  /**
   * Rate canvas snapshots are encoded at. 30 matches what a phone shoots.
   * Going higher only makes the overlay smoother — the camera half is still
   * capped by the device's own preview frame rate.
   */
  fps: 30
};

/**
 * Encoder targets for the WebCodecs recorder. 4 Mbps at 720×1280 is enough
 * motion detail for a CapCut master without drowning a phone GPU. The old
 * MediaRecorder path tied bitrate to take length because its encoder died
 * around 30–40s; that coupling is gone. Keyframes still matter: without a
 * regular IDR, players freeze on one frame while audio continues.
 */
export const ENCODING = {
  videoBitsPerSecond: 4_000_000,
  audioBitsPerSecond: 128_000,
  /** Seconds between forced video keyframes. 1s keeps downloaded files seekable. */
  keyFrameInterval: 1
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
  idle: '700 44px Unbounded, sans-serif'
};

export const TIMING = {
  /** Duration of the flash overlay (ms). */
  flashMs: 400
};

/**
 * Taps closer together than this count as one gesture. Guards against a
 * double-fire skipping a whole question now that nothing auto-advances.
 */
export const TAP_DEBOUNCE_MS = 300;

export const STORAGE_KEYS = {
  questions: 'trivia-reel:questions'
};
