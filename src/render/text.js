/**
 * Canvas text helpers. The 2D context has no wrapping or auto-fit, so these
 * do the measuring by hand.
 */

/**
 * Greedy word wrap. Returns the lines rather than drawing them, so callers can
 * measure block height before deciding where to put it.
 */
export function wrapLines(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  if (!words.length) return [''];

  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  lines.push(line);
  return lines;
}

/**
 * Draw wrapped text centred on (x, y) — y is the vertical centre of the whole
 * block, not the first baseline.
 */
export function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = wrapLines(ctx, text, maxWidth);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => ctx.fillText(line, x, startY + i * lineHeight));
  return lines.length;
}

/**
 * Fitting is measured, not cheap: each candidate size re-wraps the text, and
 * every wrap calls measureText per word. The draw loop re-runs it 60x a second
 * on text that hasn't changed, which is pure waste and shows up as dropped
 * frames on a phone. The result only depends on the arguments, so cache it.
 */
const layoutCache = new Map();
const LAYOUT_CACHE_MAX = 300;

/**
 * Web fonts load async. Anything measured before they arrive was measured in
 * the fallback face and is wrong, so `main.js` calls this once fonts settle.
 */
export function clearTextLayoutCache() {
  layoutCache.clear();
}

function fitLayout(ctx, text, maxWidth, maxHeight, fontTemplate, startSize, minSize) {
  const key = `${fontTemplate}|${startSize}|${minSize}|${maxWidth}|${maxHeight}|${text}`;
  const hit = layoutCache.get(key);
  if (hit) return hit;

  let size = startSize;
  let lines;
  while (true) {
    ctx.font = fontTemplate.replace('{size}', String(size));
    lines = wrapLines(ctx, text, maxWidth);
    if (size <= minSize || lines.length * (size * 1.15) <= maxHeight) break;
    size -= 2;
  }

  // Bounded so a long session across the 400-question bank can't grow without
  // limit. Plain FIFO eviction — hit rate barely matters at this size.
  if (layoutCache.size >= LAYOUT_CACHE_MAX) {
    layoutCache.delete(layoutCache.keys().next().value);
  }
  const layout = { size, lines, font: fontTemplate.replace('{size}', String(size)) };
  layoutCache.set(key, layout);
  return layout;
}

/**
 * Shrink the font until the wrapped block fits in maxHeight. Long answers
 * ("270 at birth, 206 as an adult") otherwise overflow into the camera zone.
 *
 * @param fontTemplate e.g. '700 {size}px Unbounded, sans-serif'
 */
export function drawFitted(ctx, text, x, y, maxWidth, maxHeight, fontTemplate, startSize, minSize = 24) {
  const { lines, size, font } = fitLayout(ctx, text, maxWidth, maxHeight, fontTemplate, startSize, minSize);

  ctx.font = font;
  const lineHeight = size * 1.15;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, startY + i * lineHeight);
  }
  return lines.length;
}
