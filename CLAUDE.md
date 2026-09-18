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

4. **Frame delivery is left to `captureStream(CAPTURE.fps)` — do not drive it
   by hand.** Sampling on the browser's clock paces frames unevenly (16–95ms
   apart against a 33ms ideal) and `captureStream(0)` + `requestFrame()` after
   each paint measurably fixes that: ~25 → ~30fps, median gap 39 → 29ms in
   desktop Chrome. It also **stopped delivering video roughly 10 seconds into a
   take on iOS Safari, while audio kept recording** — a ruined take, on the one
   platform this is actually filmed on. Safari exposes `requestFrame` as a
   function, so no feature test distinguishes the working implementation from
   the broken one. Even pacing is not worth that trade.

5. **Takes stop partway through on iOS Safari, cause still unknown, and the
   length is NOT bitrate-bound.** Measured on device: 8 Mbps stopped at ~40s,
   halving to 4 Mbps stopped at ~35s. If it were the memory ceiling it looked
   like, halving the bitrate would have doubled the time. It didn't, so the
   limit is time-based, not size-based, and `bitrate × seconds ≈ memory` is
   dead as a theory. Don't resurrect it.

   Three explanations have now been wrong — screen sleep, manual frame capture,
   and that memory ceiling — because every layer fails with the same symptom
   (frozen video, audio continues) and none of it reproduces in desktop Chrome.
   `core/recordingDiagnostics.js` exists to end that: it polls the draw loop,
   camera feed, capture track, recorder and encoder during a take and reports
   the first one that stops, by name and timestamp, in the panel. **Read it
   before theorising.** Its fault detection is tested by deliberately killing
   each layer — see the sabotage tests in the scratchpad approach described in
   that file's header.

6. **The bitrate is set explicitly at all, because the default is terrible.**
   MediaRecorder lands near 1.4 Mbps at 1080×1920, which blocks and smears on
   motion. It briefly ran at 16 Mbps on the reasoning that a too-high ask
   clamps harmlessly — true of desktop Chrome's software VP9, never verified on
   an iPhone, and it is exactly the assumption the length ceiling above
   punctured. Treat encoder settings as unproven until they have survived a
   long take on a real device.

   **Verify any recording change with a take over a minute long.** A failure at
   10s was invisible to every 5–6 second test that shipped it, and the 40s one
   would have slipped past a 30s test just as easily.

7. **`recorder._canvasStream` is held on the instance on purpose — do not
   inline it back into a local.** Only the video *track* goes into the stream
   handed to `MediaRecorder`, so the `MediaStream` returned by
   `captureStream()` becomes unreachable the moment `start()` returns. Safari
   stops the underlying canvas capture once that stream is collected, and the
   result is video frozen on its last frame seconds into a take while the mic
   — owned by `camera`, still referenced — records on. It looks exactly like a
   stalled draw loop and is not one. `stop()` releases it, and only it; the mic
   track has to survive for the next take.

8. **`recorder.start()` takes no timeslice.** Chunked recording is a common iOS
   workaround, but it produces a container with no duration written: the blob
   reports `duration === Infinity`, seeking breaks, and a 75s take measured
   zero presented frames. One blob at `stop()` keeps the metadata intact.

9. **Text layout is cached, and the cache is cleared on `document.fonts.ready`.**
   `drawFitted()` measures per word per candidate size; re-running that 60x a
   second on unchanged text is pure waste. The invalidation is not optional:
   anything measured before Unbounded/Inter load was measured in the fallback
   face and would be wrong for the rest of the session.

10. **Only the countdown is on a clock — `question` and `reveal` wait for a
    tap, indefinitely.** Reveal needs an open beat to tap Right/Wrong before
    moving on. Question needs however long it takes to read aloud, which is not
    a number this code can guess: it used to auto-advance after 1.6s
    (`TIMING.questionHoldMs`, now gone) and the result was that a tap meant to
    *start* the countdown instead landed on an already-running one and revealed
    the answer, eating the question. Don't put a timer back on either phase.

    `advance()` also debounces taps within `TAP_DEBOUNCE_MS`. With taps as the
    only driver, one ghost click would run question → countdown → reveal in a
    single gesture.

11. **Front camera only, and the feed is always mirrored.** This is a
    selfie-reaction tool — there is no rear camera, no `facingMode` toggle and
    no Flip button (all three existed once and were deliberately removed).
    `renderer.drawCameraZone()` mirrors unconditionally, because a selfie view
    is what people expect to see of themselves. Don't add a rear-camera path
    back without asking; it would also mean re-solving the mic track dying
    whenever the stream is rebuilt mid-take.

12. **`answerResult` resets to `null` on every new question.** Unmarked answers
    render in neutral white; that's a valid state, not an error.

13. **The canvas is a fixed 1080×1920 regardless of screen size.** CSS scales it
    for display. Never set canvas width/height from `clientWidth` — output
    resolution must stay constant for consistent recordings.

14. **`startBtn` is gated on camera AND a chosen category, not camera alone.**
    `Controls._updateStartEnabled()` tracks both `_cameraEnabled` and
    `_categoryChosen` and only enables Start when both are true. The category
    `<select>` starts on a disabled, unselected placeholder — picking a
    built-in category (or "My Questions") is what calls `machine.setQuestions()`
    with the right bank in the first place, so Start being enabled without a
    real bank behind it isn't a state worth allowing.

15. **There is no text-to-speech and no speech recognition.** Both existed once
    (`speech.js`, `answerListener.js`, `matching.js`) and were deliberately
    removed: the app should make no sound of its own, and marking Right/Wrong
    is a manual tap. Don't reintroduce either without asking.

## Architecture

```
src/
├── main.js              Entry point. Wires modules together. The only file
│                        that knows about all the others.
├── core/
│   ├── config.js         Colors, fonts, timings, layout, capture rate and
│   │                     encoder bitrate. Change look and quality here.
│   ├── questions.js      Default bank, parse/stringify, shuffle, localStorage.
│   ├── quizMachine.js    Phase state machine. No DOM, no canvas — pure logic.
│   ├── camera.js         getUserMedia wrapper (front cam + mic) + errors.
│   ├── categoryBank.js   "Can You Pass As..." — 50 built-in categories (8
│   │                     sections × ~6 categories, 8 Qs each, 400 total).
│   ├── wakeLock.js      Holds the screen awake while recording.
│   ├── recordingDiagnostics.js  Polls every layer during a take; names the
│   │                     first one that stops. Read it before theorising.
│   └── recorder.js       MediaRecorder wrapper + codec probing.
├── render/
│   ├── text.js          Canvas text wrapping and auto-fit, with a layout
│   │                    cache (invalidated once web fonts load).
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
- **The panel reports what the camera actually negotiated.** Video constraints
  are all `ideal`, so a browser may quietly hand back something far smaller —
  Safari can give 640×480, which is a 132% upscale to fill the 1080×1114 camera
  zone and looks soft. `describeCameraQuality()` compares the negotiated
  settings against that zone and `#camInfo` shows the verdict, amber when it's
  a downgrade. Nothing breaks when it happens, which is exactly why it needs
  saying out loud.
- **The camera's own frame rate caps the bottom half of the frame.** `camera.js`
  requests no `frameRate`, so the device picks — typically 30fps, which is what
  phone video is anyway. Drawing or capturing faster than that doesn't make the
  *person* move more smoothly, only the overlay. Adding
  `frameRate: { ideal: 60 }` to the video constraints is the lever, but it is
  untested: with width/height also `ideal`, a phone that can't do 1080p60 on
  the front camera may satisfy the frame rate by dropping resolution, which
  would be a bad trade for TikTok. Test on real hardware before adopting it —
  the fake device used in the automated tests is pinned at 20fps and ignores
  the constraint entirely.

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
