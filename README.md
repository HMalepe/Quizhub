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

## Listening for your answer

**Settings → Listen for your answer** turns on speech recognition. While a
question is up (and through the countdown), it listens; the instant reveal
happens, it compares what it heard against the stored answer and auto-marks
Right or Wrong.

**Treat this as a fast first guess, not a verdict.** The comparison is fuzzy —
"stapes" correctly matches an answer stored as "The stapes, in the ear" — but
it will occasionally get it wrong, especially on:
- Answers where the spoken form differs from the written one ("gold" won't
  match an answer stored as "Au")
- Background noise or overlapping speech
- Very short or ambiguous answers

That's exactly why the **Right/Wrong buttons stay live** even with this on —
a misheard answer is a one-tap correction, not a re-take. The Settings panel
also shows what it last heard, so you can see why it marked what it marked.

Needs a **separate microphone permission** from the camera — the browser will
prompt the first time you enable it.

### Browser support (the honest version)

| Browser | Behaviour |
|---|---|
| Chrome (desktop/Android) | Reliable |
| Safari (macOS) | Workable |
| Safari (iOS) | Flaky — permission prompts and silent stalls are known issues |
| Firefox | Unsupported without flags — the toggle disables itself |

If it's unreliable on your phone, test on desktop Chrome first to confirm
whether it's a platform limitation or something else. The manual buttons work
everywhere regardless.

### Using both the voice cue and answer-listening together

Works, but there's an ordering issue the app already handles: if the read-aloud
voice were listening for your answer *while* it's still speaking the question,
the mic would hear the app's own voice and treat it as your answer. So when
both are on, listening deliberately starts only after the question finishes
being read — see the `onQuestionShown` handler in `main.js` if you're
modifying this.

## Reading questions aloud

**Settings → Read questions aloud** turns on a browser voice that reads each
question as it appears. Pick a voice and adjust the speed.

When it's on, the countdown waits for the voice to finish instead of starting
on the usual 1.6s timer — otherwise it would cut the question off mid-sentence.

**Important: this voice is not in the recorded file.** Browser speech
synthesis plays to your speakers and has no `MediaStream` output, so
`MediaRecorder` can't capture it. Treat it as a *cue* — it means you react to
a voice rather than reading text off a screen, which looks markedly more
natural. Add the final voiceover in CapCut.

### Baking a voice into the recording

If you want the exported file already finished, use pre-generated audio clips
instead. `ClipVoice` in `src/core/speech.js` handles this:

1. Generate audio for each question (ElevenLabs free tier, or record yourself)
2. Save them as `public/voice/q0.mp3`, `q1.mp3`, … matching question order
3. In `main.js`, swap `LiveVoice` for `ClipVoice` and assign its track to
   the recorder:
   ```js
   recorder.audioTrack = clipVoice.getStreamTrack();
   ```

That path routes through Web Audio, which *can* be captured, so the voiceover
lands in the downloaded file.

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
