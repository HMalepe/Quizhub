/**
 * "Guess the brand" — logo questions sourced from files you drop in yourself.
 *
 * This app doesn't ship real trademarked logos. The GitHub repo and the
 * Vercel deployment are both public URLs, so anything checked in here would
 * be sitting in the open regardless of who actually plays the quiz — not
 * something to bundle on someone else's behalf. Instead this reads whatever
 * you've listed in `public/logos/manifest.json`, which starts out pointing at
 * one placeholder (not a real brand) so the feature works out of the box.
 *
 * To add your own: drop an image in `public/logos/` and add a
 * `{ "file": "...", "answer": "..." }` entry to the manifest. Same
 * `Question | Answer` mental model as the rest of the app, just with an
 * image standing in for the question text.
 */

/**
 * Marks a `[question, answer]` tuple's question as an image URL rather than
 * text. `renderer.js` checks for this prefix in the one place questions get
 * drawn, so both the live take and the generate-time re-render pick it up
 * for free.
 */
export const IMAGE_QUESTION_PREFIX = 'img:';

const MANIFEST_URL = '/logos/manifest.json';

/**
 * @returns {Promise<Array<[string, string]>>} `[img:url, brand name][]`,
 *   or `[]` if the manifest is missing/empty/malformed — never throws, since
 *   a bad manifest shouldn't block every other category from working.
 */
export async function loadLogoQuiz() {
  try {
    const res = await fetch(MANIFEST_URL);
    if (!res.ok) return [];
    const entries = await res.json();
    if (!Array.isArray(entries)) return [];

    return entries
      .filter((e) => e && typeof e.file === 'string' && typeof e.answer === 'string' && e.answer.trim())
      .map((e) => [`${IMAGE_QUESTION_PREFIX}/logos/${e.file}`, e.answer.trim()]);
  } catch {
    return [];
  }
}

/** Strips the prefix back off for anything that needs the raw image URL. */
export function imageUrlFromQuestion(question) {
  return question.startsWith(IMAGE_QUESTION_PREFIX) ? question.slice(IMAGE_QUESTION_PREFIX.length) : null;
}
