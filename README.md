# Trivia Reel

Films split-screen trivia reaction videos. Quiz overlay on top, your live camera
below, both composited onto a single canvas and recorded to one downloadable file.

No split-screen editing afterwards — the file comes out already stacked and synced.

## Setup

```bash
npm install
npm run dev
```

Open the `localhost` URL it prints. Allow camera and microphone access when
prompted — your voice is recorded along with the video.

> **Camera and mic access need a secure context.** `localhost` counts as secure,
> so `npm run dev` works on your machine. A bare LAN IP (`192.168.x.x`) does
> *not* — see "Testing on your phone" below.

## Using it

1. **Enable camera & mic** — grants permission, starts the preview
2. **Pick a category** — Start stays disabled until you choose one
3. **Record** — starts capturing (red REC dot appears)
4. **Start** — first question appears, and **waits for you**
5. **Tap the video** — starts the countdown, which runs down and reveals the answer
6. **Tap ✓ Right or ✕ Wrong** — the answer text on the canvas recolors green or red
7. **Tap the video** again to move to the next question
8. **Stop**, then **Download video**

**Tapping anywhere on the canvas advances**, but the camera half is the easy
thumb reach when the phone's on a tripod, so that's the one to use.

Nothing rushes you: the question sits there until you tap, and so does the
answer. The countdown is the only thing on a clock — and a tap during it cuts
it short if you already know the answer.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `Space` | Advance phase |
| `→` / `C` | Mark correct |
| `←` / `X` | Mark wrong |
| `R` | Toggle recording |

## Picking a category

The dropdown above **Start** holds 50 built-in "Can You Pass as..." batches —
8 questions each, grouped by section (Generations & Eras, Professions,
Nationalities & Culture, and so on). Pick one and its questions load, shuffled.

**Start stays disabled until you've picked something**, since that's what loads
a question set in the first place. Choose **My Questions (custom)** to use your
own bank instead — see below.

## Editing your questions

**Settings → Questions**, one per line:

```
What planet has the shortest day? | Jupiter — about 10 hours
Which organ produces insulin? | The pancreas
```

Everything before the first `|` is the question, everything after is the answer
(so answers can contain pipes). Saved to `localStorage` — persists across reloads.
**Reset to defaults** restores the built-in bank.

## Your voice is recorded — nothing else is

The file comes out with one audio track: your mic. That's the content, and it
stays in sync with the footage, so you're not re-recording your answers
separately.

The app itself makes no sound. Countdown ticks, the buzzer, and right/wrong
stings go on in CapCut, which means you can retime them freely instead of being
stuck with whatever played during filming.

**In CapCut:** the visual countdown numerals and the color flash on reveal are
your sync markers. Drop a tick on each numeral change, a buzzer on the reveal
flash, and a success/fail sting when the answer turns green or red.

## Video quality and how long a take can run

The recording asks the encoder for well above the browser default, which lands
near 1.4 Mbps at 1080×1920 and visibly smears on motion. Recording runs at
30fps, which is what a phone shoots.

**Quality and take length are the same dial.** Nothing streams to disk — the
whole take is held in memory until you stop — and iOS Safari cuts the video off
when that gets too large, leaving audio running over a frozen frame. Measured on
an iPhone: 8 Mbps stopped around 40 seconds. The current 4 Mbps is set to roughly
double that.

The REC badge counts up while recording and turns amber as you approach the
limit, so you can wrap a take rather than lose the end of it. If you want longer
takes, lower `ENCODING.videoBitsPerSecond` in `src/core/config.js` — the time you
get scales inversely with it.

## Keep the app in front while recording

The video is captured from the canvas as it's drawn on screen, so the app has
to stay visible for the picture to keep moving. While recording it holds a
screen wake lock to stop the phone sleeping on you mid-take.

What it can't survive is you switching to another app or locking the phone
yourself — browsers stop handing out animation frames to a hidden page, so the
video would freeze while your voice kept recording. Start the take, leave the
app on screen, stop the take.

## Testing on your phone

Camera and mic access need HTTPS, so a LAN IP won't work. Options:

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
