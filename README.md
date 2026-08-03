# NOVA_AI — Clear. Precise. Automated.

A single-page cinematic site for NovaAI: AI automation, AI integration and
AI-agent development. One fixed, scroll-scrubbed video carries a three-state
opening narrative, then the page settles into a calm near-black editorial
sequence.

React 19 · TypeScript (strict) · Vite · Tailwind CSS v4 · GSAP ScrollTrigger ·
Framer Motion · lucide-react

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc -b, strict
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
```

Node 20+ is required. The production build is deployable as-is; `base` is set
to `'./'` so `dist/` works both at a domain root (Netlify) and from a
repository sub-path (GitHub Pages) without rebuilding.

---

## Replacing the hero footage

The site ships with a **generated placeholder clip**, not the intended footage.
The supplied source URL
(`d8j0ntlcm91z4.cloudfront.net/…/hf_20260729_102822_….mp4`) is blocked by the
egress policy of the environment this project was built in, so it could not be
downloaded. In its place, `scripts/scene.html` renders a deterministic clip
matching the specified art direction — hanging white cable forms with glowing
gold tips, an organic brain-like mass lit from within by warm orange light,
blue-grey atmosphere, mist, bokeh and fine grain.

Swap in the real footage with one command:

```bash
npm run media                       # downloads the default source URL
npm run media -- ./your-clip.mp4    # or encodes a local file
SOURCE_URL=https://… npm run media  # or a different URL
```

That regenerates every file in `public/media/`:

| File                    | Size   | Codec | Used by                        |
| ----------------------- | ------ | ----- | ------------------------------ |
| `nova-hero.webm`        | 1920px | VP9   | Desktop — Chrome/Firefox/Edge  |
| `nova-hero.mp4`         | 1920px | H.264 | Desktop — Safari               |
| `nova-hero-mobile.webm` | 960px  | VP9   | Small screens — Chrome/Firefox |
| `nova-hero-mobile.mp4`  | 960px  | H.264 | Small screens — Safari         |
| `nova-hero-poster.jpg`  | 1920px | JPEG  | Poster and reduced-motion      |

Two codecs are offered as `<source>` children of **one** `<video>` element, so
the browser downloads exactly one file. Every encode places a keyframe every 12
frames (`-g 12 -keyint_min 12 -sc_threshold 0`). That density is what makes
scrubbing seek smoothly; a sparse GOP is the usual cause of a hero video that
lurches or sticks under scroll. Keep it if you re-encode by hand.

Source paths live in `src/content/media.ts`.

### Also replace before launch

`src/content/navigation.ts` carries a placeholder contact address
(`hello@novaai.systems`) used by the consultation form's error state and the
`<noscript>` block. Point it at a real inbox.

---

## The video engine

`src/components/video/ScrollVideo.tsx` + `src/hooks/useVideoScrub.ts`.

One fixed full-viewport layer, one `<video>`, one ScrollTrigger. Scroll
progress is read from a single trigger, smoothed on a `requestAnimationFrame`
loop (`smoothed += (target - smoothed) * 0.12`) and mapped onto
`progress * (duration - 0.05)`. A seek is only committed when the delta clears
a threshold, so micro-scrolls never thrash the decoder.

No frames are extracted in the browser. There is no canvas cache, no
`ImageBitmap` pool, and no second video engine anywhere on the page.

**Tiers.** Chosen once on first render and never swapped on resize:

| Condition                                       | Behaviour                                                              |
| ----------------------------------------------- | ---------------------------------------------------------------------- |
| Fine pointer, viewport > 820px                  | Full scrub — 0.12 smoothing, 0.03s seek threshold, no rate cap          |
| Coarse pointer **or** viewport ≤ 820px          | Throttled scrub — 0.18 smoothing, 0.09s threshold, ≤ 1 seek per 70ms    |
| `prefers-reduced-motion: reduce`                | No video element rendered at all — poster only, static                  |
| Seeking stalls 3× for >1.2s                     | Drops to poster automatically at runtime                                |

**Readiness.** Scrubbing never starts before the element reports a finite
duration *and* a decoded frame (`requestVideoFrameCallback` where supported,
otherwise `seeked`/`loadeddata`/`canplay`). Until then the poster holds the
full composition — the page never shows black or a broken-media icon. Content
never waits on media: the arrival sequence starts on poster load or after
1200ms, whichever comes first.

**Fallback order.** Local encodes → the remote CloudFront URL (retained
verbatim as specified) → poster-only. A `MEDIA_ERR_ABORTED` is explicitly *not*
treated as a failure, so an element detached mid-request cannot demote the
page.

**Cleanup.** Every ScrollTrigger, rAF handle, media listener and
`visibilitychange` listener is released on unmount. All scrub work halts while
`document.hidden` is true and snaps to target on resume rather than playing
catch-up.

---

## Motion system

GSAP and Framer Motion never drive the same transform on the same element.

- **GSAP ScrollTrigger** owns scroll: the master narrative timeline, the video
  timeline, the settle into near-black, the process rail, and the marquee.
- **Framer Motion** owns everything else: the arrival sequence, in-view
  reveals, hover and press states, the mobile menu, and the magnetic pull.

Where both are needed, the GSAP target is a wrapper and the Framer target is
its children.

Three reveal families only — editorial line mask (`MaskText`), supporting copy
(`Reveal family="copy"`), and panel (`Reveal family="panel"`). Each scene has
one dominant movement and one supporting movement. Maximum entrance blur is
zero; nothing on the page carries a permanent blur filter.

`MaskText` has two drivers: `inview` self-animates via Framer Motion, and
`external` renders inert markup with `[data-mask-line]` hooks for GSAP to
drive inside the pinned narrative.

---

## Reduced motion

`prefers-reduced-motion: reduce` changes the page structurally, not
cosmetically:

- No `<video>` element is rendered — the poster is the hero, with no drift.
- The narrative stops being a sticky three-state stage and becomes three
  full-height sections in normal document flow. **Every word remains present
  and readable.**
- The marquee is replaced by a static wrapped list of the same terms.
- The process rail and stages render at full presence immediately.
- Magnetic pull, smooth anchor scrolling and mask reveals are all disabled.

---

## Accessibility

Semantic landmarks, a single `<h1>`, ordered headings, and a skip link.
The video layer is `aria-hidden` with a screen-reader description of the
footage. The marquee is `aria-hidden` with a readable `sr-only` list beside it.
The mobile menu traps Tab, closes on Escape, locks background scroll,
restores focus to its trigger, and closes on selection. All interactive
targets are at least 44px. No information is available through hover alone.
Form fields have real labels, `aria-invalid`, `aria-describedby` error
association, focus-moves-to-first-error, and an `aria-live` status region.

---

## Performance notes

- One ScrollTrigger for the narrative timeline, one for the video scrub, one
  for the video settle, one for the process rail, one for the marquee's
  on-screen toggle. No per-word triggers.
- No React state is written on scroll. The nav's condensed state is the only
  scroll-driven state change, behind a rAF gate and a hysteresis band
  (80px on, 40px off) so the pill cannot flicker.
- Only transform and opacity are animated. `will-change` is set on mask lines
  and the marquee track only, and dropped entirely under reduced motion.
- Backdrop blur is 12px (subtle glass) and 20px (strong glass, used on exactly
  two controls). Grain sits at 0.025 opacity.
- Fonts are preconnected and `display=swap`; the poster is preloaded with
  `fetchpriority="high"`. `ScrollTrigger.refresh()` runs after
  `document.fonts.ready` so late font metrics cannot desynchronise the
  timeline.
- The marquee pauses when scrolled off screen and when the tab is hidden.

---

## Deployment

`netlify.toml` is configured for `npm run build` → `dist/`, with an SPA
redirect and immutable caching for `/media/*` and `/assets/*`.

The consultation form is Netlify Forms compatible: `index.html` carries a
hidden static mirror named `consultation` so the build-time bot registers the
fields, and the React form posts URL-encoded to `/` with a matching
`form-name` plus a honeypot. Off Netlify the POST fails cleanly and the form
shows its error state with a mailto fallback — success and error states are
both reachable.

---

## Project structure

```
src/
  app/App.tsx                     composition + ScrollTrigger refresh
  components/
    navigation/                   Navigation, MobileMenu
    video/                        ScrollVideo, VideoFallback
    motion/                       Reveal, MaskText, MagneticButton
    sections/                     ScrollNarrative, Capabilities, CapabilityStrip,
                                  Process, FinalCTA, ConsultationForm, Footer
    ui/                           GlassButton, GlassBadge, SectionLabel
  hooks/                          useReducedMotion, useMediaQuery,
                                  useVideoScrub, useBodyScrollLock
  content/                        navigation, capabilities, process, media
  lib/gsap.ts                     single plugin registration
  styles/                         tokens.css, globals.css
scripts/
  fetch-media.sh                  one-command media rebuild
  scene.html                      generator for the placeholder footage
```
