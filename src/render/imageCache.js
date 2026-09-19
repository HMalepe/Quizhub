/**
 * Loads and caches images used as canvas questions (logo quizzes). Shared
 * module-level cache — both the live `Renderer` and the throwaway one
 * `colorizeTake.js` builds for the generate pass read from the same Map, so
 * a logo only has to load once per session even though generate spins up a
 * second `Renderer` instance.
 *
 * `getCachedImage()` never awaits: `Renderer.drawFrame()` runs on a tight
 * loop and can't block on a network fetch. It kicks off a load the first
 * time a URL is seen and returns null until that load lands, so a fresh
 * logo question draws nothing for a frame or two rather than throwing.
 */
const cache = new Map();

/** Synchronous read. Returns a ready-to-draw HTMLImageElement, or null while loading/failed. */
export function getCachedImage(url) {
  let entry = cache.get(url);
  if (!entry) {
    entry = { img: null, promise: null };
    cache.set(url, entry);
    entry.promise = loadOne(url).then((img) => {
      entry.img = img;
    });
  }
  return entry.img;
}

function loadOne(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    // A missing/broken logo file shouldn't take the question down — draw
    // nothing for that slot rather than throwing mid-frame.
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/**
 * Awaited before Start (live) and before the generate pass, so the first
 * paint of each logo question is already loaded rather than blank.
 */
export async function preloadImages(urls) {
  await Promise.all(
    [...new Set(urls)].map((url) => {
      getCachedImage(url); // ensures cache.get(url) exists and load has started
      return cache.get(url).promise;
    })
  );
}
