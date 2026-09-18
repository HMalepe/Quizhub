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
5. **Tap the video** — the answer appears under the question on the same screen
6. **Tap** again to move to the next question
7. After the last answer, a recap lists every question — mark each ✓ Right or ✕ Wrong
8. **Generate video**, then **Download** — right answers are green, wrong ones red

**Tapping anywhere on the canvas advances**, but the camera half is the easy
thumb reach when the phone's on a tripod, so that's the one to use.

Nothing rushes you: the question sits there until you tap, then the answer
sits under it until you tap again. Marking happens after the take, not while
you're on camera.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `Space` | Advance phase |
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

The app itself makes no sound. Right/wrong stings go on in CapCut if you want
them. The downloaded file already shows green for answers you marked right and
red for ones you marked wrong.

**In CapCut:** the color flash on reveal is still a sync marker if you want a
buzzer there.

## Video quality and how long a take can run

Recording is 720×1280 at 30fps, encoded with WebCodecs (H.264 + AAC into MP4
when the browser can do it). Canvas frames are encoded directly — not via
`MediaRecorder` + `canvas.captureStream()`, which used to freeze the picture
on one frame around 30 seconds while the mic kept going.

Takes of a minute and more should play back with both picture and voice moving.
The file is still held in memory until you hit Stop, so the REC badge turns
amber on very long takes as a RAM reminder, not because the encoder is about
to die. Keep the app on screen while you film.

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
| Chrome (desktop/Android) | Fully supported; records mp4 |
| Safari (macOS/iOS 15+) | Supported; records mp4 |
| Firefox | Supported; may record WebM if H.264 isn't available |
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
