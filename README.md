# Trivia Reel

Films split-screen trivia reaction videos. Quiz overlay on top, your live camera
below, both composited onto a single canvas and recorded to one downloadable file.

No split-screen editing afterwards — the file comes out already stacked and synced.

## Setup

```bash
npm install
npm run dev
```

Open the `localhost` URL it prints. Allow camera access when prompted.

> **Camera access needs a secure context.** `localhost` counts as secure, so
> `npm run dev` works on your machine. A bare LAN IP (`192.168.x.x`) does *not*
> — see "Testing on your phone" below.

## Using it

1. **Enable camera** — grants permission, starts the preview
2. **Record** — starts capturing (red REC dot appears)
3. **Start** — first question appears
4. Question holds ~1.6s, then the countdown runs, then the answer reveals
5. **Tap ✓ Right or ✕ Wrong** — the answer text on the canvas recolors green or red
6. **Tap the canvas** to move to the next question
7. **Stop**, then **Download video**

Tap the canvas at any point to skip ahead — skip the question hold, cut the
countdown short, whatever the take needs.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `Space` | Advance phase |
| `→` / `C` | Mark correct |
| `←` / `X` | Mark wrong |
| `R` | Toggle recording |

## Editing your questions

**Settings → Questions**, one per line:

```
What planet has the shortest day? | Jupiter — about 10 hours
Which organ produces insulin? | The pancreas
```

Everything before the first `|` is the question, everything after is the answer
(so answers can contain pipes). Saved to `localStorage` — persists across reloads.
**Reset to defaults** restores the built-in bank.

## The video is silent — on purpose

No audio track is recorded. You add countdown ticks, the buzzer, and right/wrong
stings in CapCut, which means you can retime them freely instead of being stuck
with whatever played during filming.

**In CapCut:** the visual countdown numerals and the color flash on reveal are
your sync markers. Drop a tick on each numeral change, a buzzer on the reveal
flash, and a success/fail sting when the answer turns green or red.

## Testing on your phone

Camera access needs HTTPS, so a LAN IP won't work. Options:

**Tunnel (quickest):**
```bash
npm run dev
npx localtunnel --port 5173
```
Open the `https://` URL it gives you on your phone.

**Or deploy** (see below) and just use the live URL.

## Deploying

Free and takes about a minute:

**Vercel**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

**GitHub Pages** — build, then publish `dist/`. Set `base` in `vite.config.js`
to your repo name (`base: '/trivia-reel/'`) or assets will 404.

## Browser support

| Browser | Status |
|---|---|
| Chrome (desktop/Android) | Fully supported |
| Safari (macOS/iOS 15+) | Supported; records mp4 |
| Firefox | Supported; records WebM |
| Older iOS Safari | `MediaRecorder` may be missing — the quiz still runs, so you can screen-record externally |

If the download won't play, try Chrome first — that isolates whether it's a
codec issue or something else.

## Project layout

See `CLAUDE.md` for full architecture notes. Short version:

```
src/core/      state machine, questions, camera, recorder (no DOM/canvas)
src/render/    the canvas draw loop and text helpers
src/ui/        DOM wiring and styles
src/main.js    wires it all together
```

Colors, fonts, timings and the top/bottom split ratio all live in
`src/core/config.js` — start there for look changes.
