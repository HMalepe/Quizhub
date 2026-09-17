# CLAUDE.md

Context for Claude Code working in this repo.

## What this app is

A single-purpose tool for filming split-screen trivia reaction videos for TikTok/Reels.

The screen is one 1080×1920 canvas:
- **Top 42%** — quiz overlay (question, countdown numeral, answer)
- **Bottom 58%** — live camera feed of the person reacting

Both halves are drawn to the *same* canvas every frame, and `MediaRecorder`
captures that canvas. So the downloaded file is already composited — no
split-screen editing needed afterwards.

## Deliberate design decisions — do not "fix" these

These look like omissions but are intentional. Check here before changing them.

1. **The recording has no audio track.** Not a bug. The user adds countdown
   ticks, buzzer, and right/wrong stings in CapCut, so baking audio in would
   lock the timing. `camera.js` requests `audio: false`; `recorder.js` builds
   a video-only `MediaStream`.

2. **The `reveal` phase does not auto-advance.** Every other phase has a timer.
   Reveal waits indefinitely because the user needs an open beat to tap
   Right/Wrong before moving on.

3. **Front camera is mirrored, rear is not.** `Camera.isMirrored` — matches
   what people expect from a selfie view.

4. **`answerResult` resets to `null` on every new question.** Unmarked answers
   render in neutral white; that's a valid state, not an error.

5. **The canvas is a fixed 1080×1920 regardless of screen size.** CSS scales it
   for display. Never set canvas width/height from `clientWidth` — output
   resolution must stay constant for consistent recordings.

## Architecture

```
src/
├── main.js              Entry point. Wires modules together. The only file
│                        that knows about all the others.
├── core/
│   ├── config.js        Colors, fonts, timings, layout ratios. Change look here.
│   ├── questions.js     Default bank, parse/stringify, shuffle, localStorage.
│   ├── quizMachine.js   Phase state machine. No DOM, no canvas — pure logic.
│   ├── camera.js        getUserMedia wrapper + human-readable error messages.
│   └── recorder.js      MediaRecorder wrapper + codec probing.
├── render/
│   ├── text.js          Canvas text wrapping and auto-fit helpers.
│   └── renderer.js      The rAF draw loop. Composites camera + overlay.
└── ui/
    ├── controls.js      DOM event wiring. Holds no quiz logic.
    └── styles.css       Panel/overlay styling (not canvas — canvas is drawn in JS).
```

**Data flow is one-directional:**
`QuizMachine` owns state → emits snapshots via `onChange` → `main.js` caches the
snapshot → `Renderer` reads it each frame via `getState()`, `Controls` syncs
button states.

The renderer never mutates state. The state machine never touches the DOM.
Keep it that way — it's what makes the machine testable in isolation.

## Phase state machine

```
idle ──tap──> question ──(1.6s auto, or tap)──> countdown
                                                     │
                                            (hits 0, or tap)
                                                     ▼
                                        reveal ──tap──> question (next index)
                                           │
                                    Right/Wrong buttons
                                    recolor the answer
```

`machine.advance()` is the single entry for a tap — it dispatches on
current phase. Canvas click and the spacebar both call it.

## Adding to the canvas

All canvas drawing lives in `render/renderer.js`. Rules:
- Pull colors/fonts from `core/config.js`, never hardcode hex or font strings.
- Use `drawFitted()` from `render/text.js` for any user-supplied text —
  long answers overflow into the camera zone otherwise.
- Anything you draw is captured in the recording. There is no separate export
  path, so don't draw debug UI onto the canvas — put it in the DOM panel.

## Constraints worth knowing

- **`getUserMedia` requires a secure context.** Works on `localhost` and HTTPS.
  A bare LAN IP (`192.168.x.x`) will fail — use a tunnel to test on a phone.
- **Codec support varies.** `recorder.js` probes a preference list; Safari
  generally gives mp4, Chrome gives WebM. Don't hardcode a mime type.
- **iOS Safari is the fragile target.** If recording misbehaves, that's the
  first place to check. Chrome on Android/desktop is reliable.

## Commands

```bash
npm install
npm run dev       # localhost:5173 — secure context, camera works
npm run build     # → dist/
npm run preview   # serve the production build locally
```

## Keyboard shortcuts (in controls.js)

- `Space` — advance phase
- `→` or `C` — mark Correct
- `←` or `X` — mark Wrong
- `R` — toggle recording

Useful when the phone/laptop is on a tripod and the user has a bluetooth remote.

## Things likely to be asked for next

If asked to add these, here's where they'd go:
- **Score tracking across a session** → new state on `QuizMachine`, rendered in
  `drawOverlayZone`
- **Question categories / filtering** → extend the parse format in
  `questions.js` (a second pipe field), filter before `setQuestions`
- **Custom overlay themes** → additional exported theme objects in `config.js`,
  swap which one `renderer.js` imports
- **Importing questions from a CSV/JSON file** → new module in `core/`, feed
  output into `machine.setQuestions()`
