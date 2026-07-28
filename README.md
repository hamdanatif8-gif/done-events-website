# DONE Events & Entertainment

The website for DONE Events & Entertainment — a Dubai events company working in
event planning, creative direction, production, entertainment and hospitality.

One continuous page, read as a publication: an overture, eight chapters, a work
index, an FAQ, a finale and an event brief, with a fixed chapter rail that is
navigation and identity at the same time.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173/done-events-website/
npm run build    # production build into dist/
npm run lint
```

Deployment is automatic: pushing to the release branch builds and publishes
`dist/` to the `gh-pages` branch (`.github/workflows/deploy.yml`).

## How it is put together

| Path | What lives there |
| --- | --- |
| `src/content/site.js` | **All company facts, copy, media provenance and form options.** Nothing factual lives anywhere else. |
| `src/components/characterFamily.js` | Geometry for the nine-member DONE crew. |
| `src/components/Character.jsx` | Renders one crew member with its volume and shading. |
| `src/lib/characterMotion.js` | Each character's idle loop and scroll gesture. |
| `src/lib/motion.js` | The single scroll engine: Lenis + GSAP ScrollTrigger. |
| `src/components/` | The scenes. Major scenes have their own choreography rather than sharing one animation. |
| `src/styles/` | Tokens, base, chapter, crew, work + mail. |
| `media-src/` | Full-size source photography. `scripts/optimize-images.mjs` generates the responsive set into `public/media/img/`. |

### Editing copy

Change `src/content/site.js`. Chapter text, services, the methodology, the FAQ,
the event-brief options and the contact details are all there.

### Media provenance

Every photograph is classified in `src/content/site.js` before it can render:

- `done` — verified DONE photography, cleared for publication
- `supplied` — delivered with the project, provenance **not** established
- `synthetic` — confirmed machine-generated, permanently withheld

Only `done` and `supplied` images reach the components. Two files were removed
from the repository as synthetic: `hero-runway.png` (its C2PA manifest declares
`digitalSourceType: trainedAlgorithmicMedia` alongside a watermark assertion)
and `beach-skyline.jpg`.

The remaining eight photographs are marked `supplied`: they look photographic,
but they carry no capture metadata and no verified source was provided, so they
are published under that flag rather than presented as confirmed. Setting
`PUBLISH_UNVERIFIED = false` in `src/content/site.js` withholds all of them at
once and falls back to the graphic system.

**To add verified DONE photography:** drop the file in `media-src/`, run
`node scripts/optimize-images.mjs`, then add an entry to `library` in
`src/content/site.js` with `provenance: 'done'` and honest alt text.

### Motion

One scroll engine drives everything (`src/lib/motion.js`); no component runs its
own scroll loop. Animations are declared inside `useScene`, which scopes them to
a `gsap.context` and skips them entirely under `prefers-reduced-motion` so the
reduced-motion visitor gets the finished composition rather than a half-played
one. Scenes are built from scrubbed `fromTo` pairs, so scrolling back up
reconstructs them exactly.

### Content honesty

The site names no clients, no projects, no figures, no awards and no
partnerships, because none were verified. Capabilities that depend on
circumstance — authority approvals, artist bookings, confidentiality
arrangements — are worded to say so. The event brief summarises what the
visitor typed; it never estimates crew, load, timings or cost.
