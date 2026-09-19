# CLAUDE.md

Context for Claude Code working in this repo.

## What this app is

A single-purpose tool for filming split-screen trivia reaction videos for TikTok/Reels.

The screen is one portrait canvas (drawn in 1080×1920 design space, recorded
at `CANVAS.outputWidth/Height` — currently 720×1280):
- **Top 42%** — quiz overlay (question, then answer underneath on reveal)
- **Bottom 58%** — live camera feed of the person reacting

Both halves are drawn to the *same* canvas every frame. WebCodecs encodes
those canvas snapshots plus the mic into one MP4. So the downloaded file is
already composited, with your voice on it — no split-screen editing needed
afterwards.

## Deliberate design decisions — do not "fix" these

These look like omissions but are intentional. Check here before changing them.

1. **The recording carries exactly one audio track: the mic.** Your answering
   voice is the content and has to stay in sync with the footage, so it's baked
   in — `camera.js` requests mic audio, and `main.js` assigns
   `recorder.audioTrack` from `camera.audioTrack` at record time. The mic is
   recorded with a sidecar MediaRecorder (native, off-thread) and muxed into
   the MP4 after the take. Don't encode the mic on the main thread next to
   canvas WebCodecs — that starves the capture and comes out as crackle.
   Capture PCM with MicCapture during the take and mux it after video encode
   stops. Sidecar MediaRecorder is only the fallback when PCM capture cannot
   start; Safari's audio/mp4 sidecar often muxes an empty track.
   Don't add app sound *during filming*, and don't wire an AudioContext node
   to `destination` while the mic is live — that howls or leaks into the take.
   AEC/NS/AGC stay off — they gate the voice in a recording. Right/wrong
   stings are mixed onto the download at generate time (the last clap,
   gasp, or buzzer you previewed on that recap row), and a speaker preview plays on the
   recap tap after the take has already stopped. Don't play anything during
   the live take.

2. **`camera.video` stays `muted` even though the stream carries audio.**
   An unmuted element plays your own mic back through the speakers and howls.

3. **A stalled draw loop is a ruined take, so the renderer is defensive.**
   `captureStream` / WebCodecs samples whatever is on the canvas; if nothing
   repaints it keeps encoding the last frame while the mic records on, giving
   you good audio over frozen video. Three guards, all load-bearing — don't
   strip them as redundant:
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

4. **Frame delivery for the MediaRecorder fallback is left to
   `captureStream(CAPTURE.fps)` — do not drive it by hand.** The primary
   recorder is WebCodecs (`CanvasSource.add()` from the canvas itself). The
   fallback still uses `captureStream`. Sampling on the browser's clock paces
   frames unevenly, and `captureStream(0)` + `requestFrame()` after each paint
   **stopped delivering video roughly 10 seconds into a take on iOS Safari,
   while audio kept recording**. Safari exposes `requestFrame` as a function,
   so no feature test distinguishes the working implementation from the broken
   one. Do not put `requestFrame` on the fallback.

5. **Do not put recording back on `MediaRecorder` + `canvas.captureStream()`.**
   That pairing froze video on one frame around 30–40s while audio continued,
   on both iOS Safari and desktop Chrome. Bitrate, timeslice, and manual
   `requestFrame` all failed to fix it. The working path encodes canvas
   snapshots with WebCodecs (Mediabunny `CanvasSource`), a sidecar
   `MediaRecorder` on the mic (off the main thread so encode cannot starve
   it), `latencyMode: 'quality'` so the video encoder cannot drop frames, a
   keyframe every `ENCODING.keyFrameInterval` seconds, and a real MP4 with
   duration metadata. If a 30fps slot is missed, the current canvas is
   written with a duration that covers the gap — a held frame, not a hole.
   Snapshots are taken from `Renderer.onAfterDraw` so a paint cannot tear.
   `MediaRecorder` for *video* remains only when `VideoEncoder` is missing.

   **Verify any recording change with a take over a minute long.** A failure at
   30s is invisible to every 5–6 second test.

6. **Bitrate is a quality knob, not a take-length dial.** The old
   `bitrate × seconds ≈ memory` theory was wrong for the freeze (halving
   bitrate did not double the time) and does not apply to the WebCodecs path.
   4 Mbps at 720×1280 is the current quality target. Raising it costs GPU/CPU
   and file size, not a hard 40s ceiling.

7. **`recorder._canvasStream` is held on the instance on the MediaRecorder
   fallback — do not inline it back into a local.** Only the video *track*
   goes into the stream handed to `MediaRecorder`, so the `MediaStream`
   returned by `captureStream()` becomes unreachable the moment `start()`
   returns. Safari stops the underlying canvas capture once that stream is
   collected. The WebCodecs path does not use this stream.

8. **`MediaRecorder.start()` (fallback only) takes no timeslice.** Chunked
   Safari MP4 often has no duration written. The WebCodecs path writes one
   finalized MP4 with Fast Start (`fastStart: 'in-memory'`). Don't "fix"
   duration by adding a timeslice to the fallback.

9. **Text layout is cached, and the cache is cleared on `document.fonts.ready`.**
   `drawFitted()` measures per word per candidate size; re-running that 60x a
   second on unchanged text is pure waste. The invalidation is not optional:
   anything measured before Unbounded/Inter load was measured in the fallback
   face and would be wrong for the rest of the session.

10. **Nothing is on a clock — `question` and `reveal` wait for a tap,
    indefinitely.** After the last reveal, the machine goes to `review`.
    Right/Wrong is not a live canvas tap: you mark the recap list, then
    `colorizeTake()` re-encodes the overlay so those marks land as green /
    orange / red in the download, without the live 1/8 counter. Don't put
    live marking or a timer back on the take.

    `advance()` also debounces taps within `TAP_DEBOUNCE_MS`. With taps as the
    only driver, one ghost click would run question → reveal → next in a
    single gesture. Review does not advance on tap.

11. **Front camera only, and the feed is always mirrored.** This is a
    selfie-reaction tool — there is no rear camera, no `facingMode` toggle and
    no Flip button (all three existed once and were deliberately removed).
    `renderer.drawCameraZone()` mirrors unconditionally, because a selfie view
    is what people expect to see of themselves. Don't add a rear-camera path
    back without asking; it would also mean re-solving the mic track dying
    whenever the stream is rebuilt mid-take.

12. **Live `answerResult` is always `null`.** Green / orange / red is applied at
    generate time from `machine.marks`, not during filming. Unmarked recap
    rows stay unmarked until you tap Right, Close, or Wrong on the list. The
    1/8 counter is live-only (`showCounter`); generate sets it false.

13. **The canvas records at `CANVAS.outputWidth/Height` but every coordinate,
    font size and offset in the render code is written in a fixed 1080×1920
    design space.** `Renderer` sizes the element to the output and starts each
    frame with `ctx.setTransform(scale, …)` to bridge the two, so the output
    resolution can change without touching a single layout number. Output is
    currently 720×1280, dropped from 1080×1920 to cut encoder load — see the
    take-length entry above.

    CSS scales the element for display. Never set canvas width/height from
    `clientWidth`: output resolution must stay constant for consistent
    recordings, and it must come from config, not layout.

14. **`startBtn` is gated on camera AND a chosen category, not camera alone.**
    After Enable camera & mic, the same overlay switches to a category picker
    — Start stays on that screen and stays disabled until a real bank is
    chosen. `Controls._updateStartEnabled()` tracks both `_cameraEnabled` and
    `_categoryChosen`. Picking a built-in (or "My Questions") is what calls
    `machine.setQuestions()` with the right bank, so Start without a category
    behind it isn't a state worth allowing.

15. **There is no text-to-speech and no speech recognition.** Both existed once
    (`speech.js`, `answerListener.js`, `matching.js`) and were deliberately
    removed: marking Right/Wrong is still a manual tap, not speech. Don't
    reintroduce TTS or recognition without asking. Yay/buzzer stings are
    generate-time (the last clap / gasp / buzzer previewed on that recap
    row; tap the same mark again to cycle) — never during the live take.

## Architecture

```
src/
├── main.js              Entry point. Wires modules together. The only file
│                        that knows about all the others.
├── core/
│   ├── config.js         Colors, fonts, timings, layout, capture rate and
│   │                     encoder bitrate / keyframe interval. Change look
│   │                     and quality here.
│   ├── questions.js      Default bank, parse/stringify, shuffle, localStorage.
│   ├── quizMachine.js    Phase state machine. No DOM, no canvas — pure logic.
│   ├── camera.js         getUserMedia wrapper (front cam + mic) + errors.
│   ├── categoryBank.js   "Can You Pass As..." — 60 built-in categories (9
│   │                     sections × ~6-10 categories, 8 Qs each, 480 total).
│   ├── wakeLock.js      Holds the screen awake while recording.
│   ├── recordingDiagnostics.js  Polls every layer during a take; names the
│   │                     first one that stops. Read it before theorising.
│   ├── colorizeTake.js   Re-encodes a take with recap marks as green/orange/red
│   │                     and mixes a per-question clap / gasp / buzzer onto reveals.
│   ├── stings.js         Recap preview + generate mix. Same mark again cycles the bank.
│   └── recorder.js       WebCodecs/Mediabunny recorder + MediaRecorder fallback.
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
idle ──tap──> title ──tap──> question ──tap──> reveal ──tap──> question (next index)
                                  │
                           (last answer)
                                  ▼
                               review ──mark recap──> generate video
```

`question` and `reveal` both wait for a tap, indefinitely. On reveal the
answer is drawn under the original question on the same overlay — the
question does not leave the frame. After the last answer the recap list
is where Right/Wrong happens; the download is colored from those marks.

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
- **Codec support varies.** The WebCodecs path prefers H.264 + AAC in MP4
  (CapCut-friendly). Chrome/Safari usually get that; Firefox may land on WebM.
  `MediaRecorder` is only the fallback when `VideoEncoder` is missing. Don't
  hardcode a mime type.
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
- `R` — toggle recording

Useful when the phone/laptop is on a tripod and the user has a bluetooth remote.

## Things likely to be asked for next

If asked to add these, here's where they'd go:
- **Score tracking across a session** → `machine.marks` already holds the
  recap; render a score in `drawOverlayZone` if you want it on the canvas
- **Custom overlay themes** → additional exported theme objects in `config.js`,
  swap which one `renderer.js` imports
- **Importing questions from a CSV/JSON file** → new module in `core/`, feed
  output into `machine.setQuestions()`

## Category picker

Built-in categories live in `core/categoryBank.js` as `SECTIONS` (9 sections,
grouping 60 "Can You Pass as..." categories, 8 questions each — 480 total).
`main.js` builds a flat `CATEGORY_BANK` name → questions lookup from it.

The `#categorySelect` dropdown lives on the start overlay (shown right after
camera and mic are on) and is populated from `SECTIONS` via
`Controls.populateCategories()` (one `<optgroup>` per section), plus a
"My Questions (custom)" option that maps to whatever's in `localStorage`
(the same bank the Settings → Questions textarea edits). Picking anything
calls `machine.setQuestions()` with that bank, shuffled for built-ins. Start
on that overlay then shows the quiz-name title card.

This intentionally did *not* extend the `Question | Answer` textarea parse
format with a category field (the previous roadmap note here suggested a
second pipe field) — the 400 built-in questions are curated, named batches
rather than user-taggable rows, so a separate lookup module fit better than
teaching `questions.js` about categories. The textarea format is unchanged;
"My Questions" still means whatever the user pasted in Settings.
