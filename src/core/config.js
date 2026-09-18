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
   * What actually gets recorded. 1080×1920 is 2.07 MP a frame, 62 MP/s at
   * 30fps, drawn *and* encoded through canvas capture rather than the phone's
   * native camera path — and on iOS the video track kept quitting partway
   * through a take under that load, at a length that varied with how hot and
   * busy the phone was (40s, then 35s, then 20s). 720×1280 is 56% less pixel
   * work. TikTok re-encodes everything on upload anyway, so a take that
   * survives beats a sharper one that doesn't.
   */
  outputWidth: 720,
  outputHeight: 1280,

  /** Fraction of frame height given to the quiz overlay. Camera gets the rest. */
  topZoneRatio: 0.42
};

export const CAPTURE = {
  /**
   * Rate the browser samples the canvas at. 30 matches what a phone shoots,
   * and keeping this modest leaves the encoder headroom — the failure mode
   * that matters is the video track quitting mid-take, not slight judder.
   */
  fps: 30
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
  /**
   * Bitrate is effectively the take-length dial, because nothing streams to
   * disk: `MediaRecorder` buffers the whole recording in memory and iOS Safari
   * stops the video encoder when that grows too large — audio, being tiny,
   * carries on. Measured on device: 8 Mbps died at ~40s, which is ~40MB.
   *
   *   bitrate × seconds ≈ memory, and ~40MB looks like the ceiling
   *
   * So 4 Mbps buys roughly 80s, 3 Mbps roughly 107s. Still ~3x the ~1.4 Mbps
   * default that made takes look blocky. Raising this back up shortens takes;
   * that is the trade, and it is not a subtle one.
   */
  videoBitsPerSecond: 4_000_000,
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
