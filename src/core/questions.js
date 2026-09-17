import { STORAGE_KEYS } from './config.js';

/**
 * Default bank. Science-leaning, with a few that are commonly-believed-wrong
 * (ant brain ratio, Saturn moon count) since those drive comments.
 */
export const DEFAULT_QUESTIONS = [
  ['What planet has the shortest day?', 'Jupiter — about 10 hours'],
  ['What colour do you get mixing red and green light?', 'Yellow'],
  ["What's the hardest natural substance on Earth?", 'Diamond'],
  ["Which gas makes up most of Earth's atmosphere?", 'Nitrogen'],
  ["What's the smallest bone in the human body?", 'The stapes, in the ear'],
  ['Which planet has the most moons?', 'Saturn'],
  ["What's the only metal that's liquid at room temperature?", 'Mercury'],
  ['What part of the cell contains its DNA?', 'The nucleus'],
  ["What's the speed of light, roughly?", '300,000 km per second'],
  ['Which organ produces insulin?', 'The pancreas'],
  ["What's the most abundant element in the universe?", 'Hydrogen'],
  ['How many chambers does a human heart have?', 'Four'],
  ["What's the chemical symbol for gold?", 'Au'],
  ['Which animal has the largest brain relative to body size?', 'The ant'],
  ['What causes tides on Earth?', "The Moon's gravity, mostly"],
  ['What force keeps planets orbiting the sun?', 'Gravity'],
  ['Which blood type is the universal donor?', 'O negative'],
  ["What's the largest organ in the human body?", 'The skin'],
  ['How many bones is an adult human born with vs left with?', '270 at birth, 206 as an adult'],
  ['Which country has the most natural lakes?', 'Canada']
];

/**
 * Parse the textarea format: one question per line, "Question | Answer".
 * Answers may themselves contain "|" — everything after the first pipe is the answer.
 * @returns {Array<[string, string]>} valid pairs only; malformed lines are dropped.
 */
export function parseQuestionText(raw) {
  return raw
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      const pipeIndex = trimmed.indexOf('|');
      if (pipeIndex === -1) return null;
      const question = trimmed.slice(0, pipeIndex).trim();
      const answer = trimmed.slice(pipeIndex + 1).trim();
      if (!question || !answer) return null;
      return [question, answer];
    })
    .filter(Boolean);
}

/** Serialise back into the textarea format. */
export function stringifyQuestions(questions) {
  return questions.map(([q, a]) => `${q} | ${a}`).join('\n');
}

/** Fisher–Yates. Returns a new array; does not mutate the input. */
export function shuffled(questions) {
  const copy = [...questions];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function loadQuestions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.questions);
    if (!stored) return [...DEFAULT_QUESTIONS];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_QUESTIONS];
  } catch {
    return [...DEFAULT_QUESTIONS];
  }
}

export function saveQuestions(questions) {
  try {
    localStorage.setItem(STORAGE_KEYS.questions, JSON.stringify(questions));
  } catch {
    // Storage unavailable (private mode, quota) — non-fatal, questions just
    // won't persist across reloads.
  }
}
