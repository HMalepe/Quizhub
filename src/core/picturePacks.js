/**
 * Picture rounds — "what brand is this?", "who is this?", "what animal is
 * this?" — built from image files you drop in yourself.
 *
 * This generalises what used to be the logos-only bank. A pack is a folder of
 * images plus a `manifest.json` listing them; `public/packs/index.json` is the
 * registry of packs the picker offers. Adding a round means adding a folder
 * and an index entry, with no code change.
 *
 * The app ships the mechanism, not the pictures. Celebrity photos, brand
 * logos, club crests and most food/animal photography belong to somebody —
 * photographers, agencies, trademark holders — and this repo and its Vercel
 * deployment are both public URLs, so anything committed here sits in the open
 * regardless of who actually plays the quiz. The flags pack is the exception
 * and ships populated: national flags carry no copyright, and those SVGs are
 * drawn in this repo rather than copied from anywhere.
 */

/**
 * Marks a `[question, answer]` tuple's question as a picture rather than text.
 * The payload after the prefix is `<url>` or `<url>|<prompt>` — `renderer.js`
 * checks for this prefix in the one place questions get drawn, so the live
 * take and the generate-time re-render both pick it up for free.
 */
export const IMAGE_QUESTION_PREFIX = 'img:';

const INDEX_URL = '/packs/index.json';

/**
 * @typedef {{id: string, name: string, prompt: string, dir: string}} Pack
 */

/**
 * Reads the pack registry. Never throws — a missing or malformed index means
 * no picture rounds in the picker, not a broken category list.
 * @returns {Promise<Pack[]>}
 */
export async function loadPackIndex() {
  try {
    const res = await fetch(INDEX_URL);
    if (!res.ok) return [];
    const packs = await res.json();
    if (!Array.isArray(packs)) return [];

    return packs.filter(
      (p) => p && typeof p.id === 'string' && typeof p.name === 'string' && typeof p.dir === 'string'
    );
  } catch {
    return [];
  }
}

/**
 * Reads one pack's manifest into question tuples. Returns `[]` for a missing,
 * empty or malformed manifest, which `main.js` treats as "this round has no
 * pictures yet" rather than an error.
 * @param {Pack} pack
 * @returns {Promise<Array<[string, string]>>}
 */
export async function loadPack(pack) {
  try {
    const res = await fetch(`/packs/${pack.dir}/manifest.json`);
    if (!res.ok) return [];
    const entries = await res.json();
    if (!Array.isArray(entries)) return [];

    const prompt = (pack.prompt || '').trim();
    return entries
      .filter((e) => e && typeof e.file === 'string' && typeof e.answer === 'string' && e.answer.trim())
      .map((e) => [imageQuestion(`/packs/${pack.dir}/${e.file}`, prompt), e.answer.trim()]);
  } catch {
    return [];
  }
}

/** Builds the `img:` question string for a picture and its on-screen prompt. */
export function imageQuestion(url, prompt) {
  return prompt
    ? `${IMAGE_QUESTION_PREFIX}${url}|${prompt}`
    : `${IMAGE_QUESTION_PREFIX}${url}`;
}

/**
 * Splits an `img:` question back into its parts. Returns nulls for a plain
 * text question, so callers can use it as the "is this a picture?" test too.
 * Splits on the first `|` — pack URLs are built from a folder and a filename,
 * so a pipe past that point belongs to the prompt.
 * @returns {{url: string, prompt: string} | {url: null, prompt: null}}
 */
export function parseImageQuestion(question) {
  if (typeof question !== 'string' || !question.startsWith(IMAGE_QUESTION_PREFIX)) {
    return { url: null, prompt: null };
  }
  const payload = question.slice(IMAGE_QUESTION_PREFIX.length);
  const split = payload.indexOf('|');
  return split === -1
    ? { url: payload, prompt: '' }
    : { url: payload.slice(0, split), prompt: payload.slice(split + 1) };
}

/** Just the image URL — for preloading and for the recap list's thumbnail. */
export function imageUrlFromQuestion(question) {
  return parseImageQuestion(question).url;
}
