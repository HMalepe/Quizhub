# CLAUDE.md

Context for Claude Code working in this repo.

## What this app is

A single-purpose tool for filming split-screen trivia reaction videos for TikTok/Reels.

The screen is one 1080×1920 canvas:
- **Top 42%** — quiz overlay (question, countdown numeral, answer)
- **Bottom 58%** — live camera feed of the person reacting

Both halves are drawn to the *same* canvas every frame, and `MediaRecorder`
captures that canvas plus the mic. So the downloaded file is already
composited, with your voice on it — no split-screen editing needed afterwards.

## Deliberate design decisions — do not "fix" these

These look like omissions but are intentional. Check here before changing them.

1. **The recording carries exactly one audio track: the mic.** Your answering
   voice is the content and has to stay in sync with the footage, so it's baked
   in — `camera.js` requests mic audio, and `main.js` assigns
   `recorder.audioTrack` from `camera.audioTrack` at record time. Everything
   *app-generated* (countdown ticks, buzzer, right/wrong stings) still goes on
   in CapCut, so that timing stays free. Don't add app sound to the recording.

2. **`camera.video` stays `muted` even though the stream carries audio.**
   An unmuted element plays your own mic back through the speakers and howls.

3. **A stalled draw loop is a ruined take, so the renderer is defensive.**
   `captureStream` samples whatever is on the canvas; if nothing repaints it
   keeps emitting the last frame while the mic records on, giving you good
   audio over frozen video. Three guards, all load-bearing — don't strip them
   as redundant:
   - `Renderer._tick()` queues the next frame in `finally`. A throw used to
     kill the loop permanently, and since `running` stayed true, `start()`
     refused to revive it.
   - `Renderer._checkStall()` is a `setInterval` watchdog that paints directly
     when rAF has gone quiet for `STALL_MS` on a *visible* page.
   - `WakeLock` holds the screen awake while recording, because rAF does not
     fire on a hidden page and no watchdog can fix that from inside. The
     browser drops the lock when hidden, so `main.js` re-acquires it on
     `visibilitychange` — and resumes `camera.video` there too, since iOS
     pauses a backgrounded video element and a paused one hands `drawImage`
     the same stale frame forever.

4. **Only the countdown is on a clock — `question` and `reveal` wait for a
   tap, indefinitely.** Reveal needs an open beat to tap Right/Wrong before
   moving on. Question needs however long it takes to read aloud, which is not
   a number this code can guess: it used to auto-advance after 1.6s
   (`TIMING.questionHoldMs`, now gone) and the result was that a tap meant to
   *start* the countdown instead landed on an already-running one and revealed
   the answer, eating the question. Don't put a timer back on either phase.

   `advance()` also debounces taps within `TAP_DEBOUNCE_MS`. With taps as the
   only driver, one ghost click would run question → countdown → reveal in a
   single gesture.

5. **Front camera only, and the feed is always mirrored.** This is a
   selfie-reaction tool — there is no rear camera, no `facingMode` toggle and
   no Flip button (all three existed once and were deliberately removed).
   `renderer.drawCameraZone()` mirrors unconditionally, because a selfie view
   is what people expect to see of themselves. Don't add a rear-camera path
   back without asking; it would also mean re-solving the mic track dying
   whenever the stream is rebuilt mid-take.

6. **`answerResult` resets to `null` on every new question.** Unmarked answers
   render in neutral white; that's a valid state, not an error.

7. **The canvas is a fixed 1080×1920 regardless of screen size.** CSS scales it
   for display. Never set canvas width/height from `clientWidth` — output
   resolution must stay constant for consistent recordings.

8. **`startBtn` is gated on camera AND a chosen category, not camera alone.**
   `Controls._updateStartEnabled()` tracks both `_cameraEnabled` and
   `_categoryChosen` and only enables Start when both are true. The category
   `<select>` starts on a disabled, unselected placeholder — picking a
   built-in category (or "My Questions") is what calls `machine.setQuestions()`
   with the right bank in the first place, so Start being enabled without a
   real bank behind it isn't a state worth allowing.

9. **There is no text-to-speech and no speech recognition.** Both existed once
   (`speech.js`, `answerListener.js`, `matching.js`) and were deliberately
   removed: the app should make no sound of its own, and marking Right/Wrong
   is a manual tap. Don't reintroduce either without asking.

## Architecture

```
src/
├── main.js              Entry point. Wires modules together. The only file
│                        that knows about all the others.
├── core/
│   ├── config.js         Colors, fonts, timings, layout ratios. Change look here.
│   ├── questions.js      Default bank, parse/stringify, shuffle, localStorage.
│   ├── quizMachine.js    Phase state machine. No DOM, no canvas — pure logic.
│   ├── camera.js         getUserMedia wrapper (front cam + mic) + errors.
│   ├── categoryBank.js   "Can You Pass As..." — 50 built-in categories (8
│   │                     sections × ~6 categories, 8 Qs each, 400 total).
│   ├── wakeLock.js      Holds the screen awake while recording.
│   └── recorder.js       MediaRecorder wrapper + codec probing.
├── render/
│   ├── text.js          Canvas text wrapping and auto-fit helpers.
│   └── renderer.js      The rAF draw loop + stall watchdog. Composites
│                        camera + overlay.
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
idle ──tap──> question ──tap──> countdown
                                    │
                             (hits 0, or tap)
                                    ▼
                        reveal ──tap──> question (next index)
                           │
                    Right/Wrong buttons
                    recolor the answer
```

The countdown is the only phase on a clock. `question` and `reveal` both wait
for a tap, indefinitely.

`machine.advance()` is the single entry for a tap — it dispatches on
current phase. Canvas click and the spacebar both call it, and it debounces
anything within `TAP_DEBOUNCE_MS` of the previous advance.

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
- **Custom overlay themes** → additional exported theme objects in `config.js`,
  swap which one `renderer.js` imports
- **Importing questions from a CSV/JSON file** → new module in `core/`, feed
  output into `machine.setQuestions()`

## Category picker

Built-in categories live in `core/categoryBank.js` as `SECTIONS` (8 sections,
grouping 50 "Can You Pass as..." categories, 8 questions each — 400 total).
`main.js` builds a flat `CATEGORY_BANK` name → questions lookup from it.

The `#categorySelect` dropdown in the panel is populated from `SECTIONS` via
`Controls.populateCategories()` (one `<optgroup>` per section), plus a
"My Questions (custom)" option that maps to whatever's in `localStorage`
(the same bank the Settings → Questions textarea edits). Picking anything
calls `machine.setQuestions()` with that bank, shuffled for built-ins.

This intentionally did *not* extend the `Question | Answer` textarea parse
format with a category field (the previous roadmap note here suggested a
second pipe field) — the 400 built-in questions are curated, named batches
rather than user-taggable rows, so a separate lookup module fit better than
teaching `questions.js` about categories. The textarea format is unchanged;
"My Questions" still means whatever the user pasted in Settings.
