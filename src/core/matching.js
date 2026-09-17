/**
 * Compares what you said against the stored answer. Deliberately forgiving —
 * you'll say "stapes" for an answer stored as "The stapes, in the ear", not
 * the whole sentence.
 *
 * This is a heuristic, not a grader. It will occasionally get it wrong on
 * ambiguous or very short answers, which is exactly why the manual Right/Wrong
 * buttons stay live even when auto-detection is on — treat this as a fast
 * first guess you can correct, not a verdict.
 */

const STOPWORDS = new Set([
  'a', 'an', 'the', 'in', 'on', 'at', 'of', 'to', 'and', 'or', 'is', 'are',
  'was', 'were', 'it', 'its', "it's", 'this', 'that', 'these', 'those',
  'i', 'think', 'its', 'roughly', 'about', 'approximately', 'mostly'
]);

const NUMBER_WORDS = {
  zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5',
  six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
  eleven: '11', twelve: '12', thirteen: '13', fourteen: '14', fifteen: '15',
  sixteen: '16', seventeen: '17', eighteen: '18', nineteen: '19', twenty: '20'
};

/**
 * Lowercase, strip punctuation, collapse whitespace, and fold number words to
 * digits ("four" -> "4") so "4" and "Four" compare equal. Trivia answers are
 * disproportionately small counting numbers, so this is worth the ~20 entries.
 */
function normalize(text) {
  const base = String(text)
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return base
    .split(' ')
    .map((w) => NUMBER_WORDS[w] || w)
    .join(' ');
}

function significantWords(text) {
  return normalize(text)
    .split(' ')
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
}

/** Levenshtein distance, used as a fallback for short numeric/single-word answers. */
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;

  const row = new Array(n + 1);
  for (let j = 0; j <= n; j++) row[j] = j;

  for (let i = 1; i <= m; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = row[j];
      row[j] = a[i - 1] === b[j - 1]
        ? prev
        : 1 + Math.min(prev, row[j], row[j - 1]);
      prev = temp;
    }
  }
  return row[n];
}

function similarityRatio(a, b) {
  const maxLen = Math.max(a.length, b.length);
  if (!maxLen) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

/**
 * @param {string} transcript what the speech recognizer heard
 * @param {string} answer the stored correct answer
 * @returns {{isMatch: boolean, confidence: number, reason: string}}
 */
export function matchAnswer(transcript, answer) {
  const t = normalize(transcript);
  const a = normalize(answer);

  if (!t) {
    return { isMatch: false, confidence: 0, reason: 'nothing heard' };
  }

  // Exact or near-exact — rare, but cheap to check first.
  if (t === a) {
    return { isMatch: true, confidence: 1, reason: 'exact match' };
  }

  // Keyword containment: any significant word from the answer appears as a
  // whole word in what was heard. Handles "stapes" matching
  // "The stapes, in the ear" — the common case for short factual answers.
  const answerWords = significantWords(answer);
  const transcriptWords = new Set(normalize(transcript).split(' '));

  if (answerWords.length) {
    const hits = answerWords.filter((w) => transcriptWords.has(w));
    const coverage = hits.length / answerWords.length;
    if (coverage >= 0.5 || (answerWords.length === 1 && hits.length === 1)) {
      return { isMatch: true, confidence: coverage, reason: `matched: ${hits.join(', ')}` };
    }
  }

  // Fallback for short/numeric answers with no long "significant" words
  // ("Four", "300,000 km per second", "Au") — whole-string similarity.
  const ratio = similarityRatio(t, a);
  if (ratio >= 0.6) {
    return { isMatch: true, confidence: ratio, reason: 'close phonetic match' };
  }

  return { isMatch: false, confidence: Math.max(ratio, answerWords.length ? 0 : 0), reason: 'no overlap' };
}
