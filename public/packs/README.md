# Picture rounds

Each folder here is one picture round in the category picker: a set of images
plus a `manifest.json` saying what each one's answer is. `index.json` is the
registry of rounds the picker offers.

The rounds that ship populated are **logos** (one placeholder) and **flags**
(eight). Every other folder — celebrities, footballers, animals, food,
landmarks, cars, album covers — is an empty round waiting for your images.
Picking an empty round tells you which folder to fill.

## Adding pictures to a round

1. Drop image files into the round's folder, e.g. `public/packs/animals/`.
   PNG, JPG, SVG and WebP all work — it's an `<img>` under the hood.
2. Add an entry per image to that folder's `manifest.json`:
   ```json
   [
     { "file": "giraffe.jpg", "answer": "A giraffe" },
     { "file": "pangolin.jpg", "answer": "A pangolin" }
   ]
   ```
3. Rebuild/redeploy. The round picks them up.

`file` is the filename inside that folder. `answer` is exactly what appears on
reveal — same as the answer half of `Question | Answer` everywhere else in the
app.

Rounds are shuffled and have no fixed length, so two pictures or fifty both
work. Eight is what the text categories use, if you want them to feel the same.

## Adding a whole new round

Make a folder, give it a `manifest.json`, and add a line to `index.json`:

```json
{ "id": "sneakers", "dir": "sneakers", "name": "Sneakers — name the shoe", "prompt": "What sneaker is this?" }
```

`prompt` is the line drawn above the picture on the canvas. No code change
needed.

## Why most rounds ship empty

Because the pictures aren't mine to give you.

Celebrity photos are owned by the photographers and agencies who shot them.
Brand logos and club crests are trademarks. Album covers, film stills and most
food and wildlife photography on the internet are somebody's copyrighted work
too. This repo and its Vercel deployment are both public URLs, so anything
committed in here is published to the open internet the moment it's pushed —
regardless of who actually plays the quiz on it.

So the app ships the mechanism and you supply pictures you have the right to
use: your own photos, properly licensed stock, or public-domain and CC0 sources
like Wikimedia Commons, Unsplash or Pexels (check each image's licence —
"free to view" is not "free to redistribute").

Flags are the exception and ship populated: national flags carry no copyright,
and those SVGs are drawn in this repo rather than copied from anywhere.

None of this stops you putting whatever you like in these folders locally. It's
the *committing to a public repo* part that publishes it — if you'd rather keep
a round private, keep the repo private, or keep those files out of git.
