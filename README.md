# DONE Events & Entertainment

A single-page, chapter-based digital publication for DONE Events & Entertainment,
Dubai. One continuous scroll — HOME, CH.00–CH.07, WORK, MAIL — navigated from a
fixed chapter rail.

**Live:** https://hamdanatif8-gif.github.io/done-events-website/

## Stack

- React 19 + Vite 8
- GSAP + ScrollTrigger for every scroll-linked timeline
- Lenis for wheel/touch feel (one engine, driven by the GSAP ticker)
- Self-hosted type: Archivo Variable (display/text), Anton (rail), JetBrains Mono
- No router: the site is one document with rail anchors and working back/forward

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
node scripts/optimize-images.mjs   # regenerate public/media/img from media-src/
```

## Layout

| Path | What lives there |
| --- | --- |
| `src/content/site.js` | All copy, facts, chapter definitions, contact details |
| `src/lib/motion.js` | The scroll engine and the `useScene` GSAP-context hook |
| `src/components/` | Motion primitives composed into chapters |
| `src/styles/` | Tokens, base, and per-region stylesheets |
| `media-src/` | Original photography; the build assets are generated from it |
| `public/media/img/` | Generated responsive webp/jpg set (committed) |

### Motion primitives

`ChapterRail`, `Overture`, `ChapterCover`, `PosterPlane` (the traversing poster),
`PinnedScene` (held media, travelling type), `Reel`, `MassiveType`, `MaskedType`,
`ImagePlane`, `Glyph` (the original DONE graphic device), `WorkIndex`,
`MailChapter`.

Every scroll timeline is scrubbed and therefore reversible. Under
`prefers-reduced-motion: reduce` the timelines are never created, so the
reduced-motion visitor gets the finished composition rather than a partial one.

## Content rules

Facts live in `src/content/site.js` and nowhere else. No invented clients,
project names, dates or figures. Contact: `info@doneevents.ae`,
`+971 58 555 4446`, Dubai, United Arab Emirates.

## Deployment

GitHub Actions builds and publishes to GitHub Pages on push
(`.github/workflows/deploy.yml`). Vite is configured with
`base: '/done-events-website/'`; change it if the site moves to a root domain.
