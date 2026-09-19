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
  bg: '#070708',
  bgTop: '#111113',
  ink: '#F3EEE6',
  inkDim: '#8F8A82',
  /** Bone kicker — not the old mustard that read as brown on dark UI. */
  amber: '#E6DCC8',
  /** Unmarked reveal kicker; kept as a key so render code does not change. */
  violet: '#E6DCC8',
  right: '#6FBF9A',
  close: '#D4A054',
  wrong: '#C45C52',
  /** Hairline between quiz overlay and camera. */
  rule: 'rgba(243, 238, 230, 0.28)'
};

/** Recap marks that count as complete. Close is the in-between orange. */
export const MARK_RESULTS = ['right', 'close', 'wrong'];

/** RGB triples for the translucent full-frame flash on reveal/marking. */
export const FLASH_RGB = {
  neutral: '230, 220, 200',
  right: '111,191,154',
  close: '212,160,84',
  wrong: '196,92,82'
};

export const TYPE = {
  counter: '500 22px Outfit, sans-serif',
  kicker: '500 18px Outfit, sans-serif',
  question: '500 46px Outfit, sans-serif',
  answer: '600 54px "Cormorant Garamond", serif',
  idle: '600 44px "Cormorant Garamond", serif',
  questionFit: '500 {size}px Outfit, sans-serif',
  answerFit: '600 {size}px "Cormorant Garamond", serif',
  titleFit: '700 {size}px Outfit, sans-serif'
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
