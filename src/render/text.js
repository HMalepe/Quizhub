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
 * Shrink the font until the wrapped block fits in maxHeight. Long answers
 * ("270 at birth, 206 as an adult") otherwise overflow into the camera zone.
 *
 * @param fontTemplate e.g. '700 {size}px Unbounded, sans-serif'
 */
export function drawFitted(ctx, text, x, y, maxWidth, maxHeight, fontTemplate, startSize, minSize = 24) {
  let size = startSize;

  while (size > minSize) {
    ctx.font = fontTemplate.replace('{size}', String(size));
    const lines = wrapLines(ctx, text, maxWidth);
    const lineHeight = size * 1.15;
    if (lines.length * lineHeight <= maxHeight) break;
    size -= 2;
  }

  ctx.font = fontTemplate.replace('{size}', String(size));
  return drawWrapped(ctx, text, x, y, maxWidth, size * 1.15);
}
