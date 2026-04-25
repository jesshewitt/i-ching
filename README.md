# i-ching

A small progressive web app for the I Ching. Works as a reference or for 3-coin readings.

The English text is an original translation from Richard Wilhelm's 1924 German edition (public domain), produced under `translation/`. See `translation/style-guide.md` for terminology decisions and `translation/build.mjs` for the source of truth.

## Licensing

Two licenses cover this repository:

- **Application code** (everything outside `site/data/*.json` and `translation/hexagrams-wilhelm.json`) is under the MIT license. See `LICENSE`.
- **Translation text** (`site/data/hexagrams.json`, `site/data/trigrams.json`, `translation/hexagrams-wilhelm.json`) is dedicated to the public domain under CC0 1.0 Universal. See `LICENSE-translation`. Translated by Claude (Anthropic), 2026, from Richard Wilhelm's 1924 German edition. Edited by Jess Hewitt.

## Running locally

The app is a static site under `site/`. Because it uses client-side routing, a dev server that serves `index.html` as a fallback for unknown paths is required.

```
npx serve -s site
```

The `-s` flag rewrites any unknown path to `index.html` so reloads on deep URLs (e.g. `/reading/12345`) work.

## Tests

```
node --test
```

Covers PRNG determinism and the shape/uniqueness of the hexagram data. Requires Node 22+ for JSON module imports.

## Project structure

```
site/
  index.html            entry point
  manifest.json         PWA manifest
  sw.js                 service worker (network-first, offline fallback to index.html)
  css/main.css          styling (CSS custom properties, prefers-color-scheme)
  fonts/                self-hosted Lora (latin), Noto Serif TC (CJK subset), and Noto Sans Symbols 2 (Yijing hexagrams subset) woff2
  img/                  app icons (192, 512)
  data/
    hexagrams.json      64 hexagrams (Wilhelm 1924, fresh English translation)
    trigrams.json       8 trigrams
  js/
    app.js              router (History API, click interception)
    html.js             tagged-template helper with auto-escape
    rng.js              xmur3 + mulberry32 seeded PRNG
    theme.js            three-state theme cycle (auto/light/dark) with localStorage persistence
    views/
      components/       header, footer
      pages/            home, about, hexagram, trigram, reading, error404
test/
  smoke.test.js         node:test suite
netlify.toml            publish dir + SPA redirect
```

## Routing

Client-side via the History API. Routes:

- `/` - list of trigrams and hexagrams
- `/about` - about page
- `/trigram/:value` - reference view for a given trigram, where value is its 3-character binary pattern (e.g. `777` for Ch'ien, `888` for K'un)
- `/hexagram/:id` - reference view for a given hexagram (1-64)
- `/reading/:seed` - 3-coin reading. The seed is baked into the URL, so any reading is reproducible and shareable.

## Regenerating the JSON data

The canonical source for the live hexagram text is `translation/build.mjs`, which contains all 64 hexagram entries as inline JS objects. Run `node translation/build.mjs` to regenerate `translation/hexagrams-wilhelm.json`, then copy that to `site/data/hexagrams.json`.

The trigram data is generated similarly: `translation/build-trigrams.mjs` contains the 8 trigrams (with their Schuo Gua associations) as inline JS objects and writes directly to `site/data/trigrams.json`. The `unicode` field holds the glyph character (e.g. `☰`) rather than an HTML entity.

`translation/extract.mjs` fetches the German source for any given hexagram from schuledesrades.org for reference when editing.
