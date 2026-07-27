# DONE EVENTS — LOCKED PROJECT RULES

Compact persistent memory. Full brief lives in the conversation.

## Non-negotiables

- **Frontier Dialogues (frontierdialogues.com) is the ONLY visual/interaction master.**
  Nothing else informs the design: no ARRODZ, no Papa Tom, no DeSIGNATURE system,
  no Apple/Porsche/generic-luxury/beige-agency/black-and-gold, no SaaS cards,
  no glassmorphism, no Webflow-style fade-ups.
- **The old DONE website supplies content, media and brand facts only — never design.**
- **Do not copy Frontier's source, article text, logos, photos or mascot.** The
  observable design/interaction behaviour is reimplemented in our own code; the
  graphic character device is an original DONE mark (`Glyph`), not their mascot.
- **Scroll/motion fidelity is the highest priority.** If the still frames match
  but the scrolling feels like a normal website, the build has failed. No generic
  fade-up as the primary motion architecture.
- **The fixed left chapter rail is fundamental.** It does not become a header or a
  hamburger on desktop. It is part of the artwork.
- **Giant typography is structural**, not decorative: viewport-scale words,
  intentional cropping, type behind and above media, tiny mono metadata against it.
- **One continuous chapter page** with rail anchors (HOME, CH.00–CH.07, WORK, MAIL),
  not ten conventional routes.
- **Authentic DONE content only.** No invented clients, project names, dates or
  figures. Contact facts live in `src/content/site.js` and nowhere else.
- **Verify desktop + tablet + mobile, and forward *and* reverse scrolling.**
- **Ship it:** production build, public deploy, verified on the live URL.

## Structure

- `src/content/site.js` — single source of truth for all copy/facts.
- `src/lib/motion.js` — the one scroll engine (Lenis + GSAP ScrollTrigger). Do not
  add a competing scroll library or animate via React state per frame.
- `src/components/` — motion primitives (`ChapterCover`, `PosterPlane`,
  `PinnedScene`, `MassiveType`, `MaskedType`, `ImagePlane`, `ChapterRail`,
  `Glyph`) composed into chapters. No single generic `<AnimatedSection>`.
- `prefers-reduced-motion` must yield stable finished compositions, never missing
  content.

## Deploy

GitHub Pages via `.github/workflows/deploy.yml`, Vite `base: '/done-events-website/'`.
Public URL: https://hamdanatif8-gif.github.io/done-events-website/
