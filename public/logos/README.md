# Logo quiz

"My Logos" in the category picker builds its questions from this folder,
not from anything bundled with the app. Nothing in here is shipped by the
project itself except `sample-acme.svg` — a placeholder, not a real brand —
so the feature has something to show before you've added your own.

## Adding your own logos

1. Drop an image file in this folder (`public/logos/`) — PNG, JPG, SVG, WebP
   all work, since it's just an `<img>` under the hood.
2. Add a line to `manifest.json`:
   ```json
   { "file": "your-file.png", "answer": "The Brand Name" }
   ```
3. Rebuild/redeploy. "My Logos" will pick it up.

`file` is the filename inside this folder; `answer` is exactly what should
appear on reveal, same as the answer half of `Question | Answer` everywhere
else in the app.

## Why this isn't pre-loaded with real logos

This repo and its deployment are both public URLs. Whatever image files ship
in `public/logos/` are sitting in the open the moment they're committed,
independent of who you intend to actually use the app. Real club crests and
brand marks are trademarks, and redistributing them from a public repo isn't
something to do on your own say-so — so the app ships the mechanism, and you
supply the images you have the rights to use.
