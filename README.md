# DONE Events & Entertainment

Production React/Vite website for DONE Events & Entertainment in Dubai.

## Local development

```bash
npm install
npm run dev
```

Create the production build with:

```bash
npm run build
```

## Site structure

- `/` — Home
- `/services` — Services and event categories
- `/portfolio` — Project-led selected work
- `/about` — Company approach and delivery model
- `/contact` — Event brief form

Shared business copy and service data live in `src/content/siteContent.js`. Reusable navigation, media and page-intro components live in `src/components`.

## Protected hero media

The hero media was re-cut in this revision under explicit client instruction (the "final creative and
production rebuild" mandate). Current state:

- `public/media/hero-authority.mp4` — 1280x720, 8.33s, seamless loop, AAC audio track
- `public/media/hero-authority.webm` — VP9/Opus equivalent
- `public/media/hero-authority-poster.jpg` — optimised first-frame poster

The loop is seamless: the final second of the clip is cross-dissolved over the opening second, so the
wrap point is invisible.

AUDIO — REQUIRES CLIENT CONFIRMATION. The muxed audio bed is taken from the client-supplied source
file and normalised to -18 LUFS / -1.5 dBTP. Its licensing has not been verified and its character is
club/EDM. It is muted by default and only plays if the visitor presses the sound control. To ship
without audio, re-encode with `-an` and set `soundEnabled={false}` on `<HeroVideo />` in
`src/pages/Home.jsx`.

Source footage note: the WhatsApp-supplied file is 848x480 and is predominantly nightclub footage.
The 1280x720 aerial Dubai material already in the project is higher quality and on-brand, so it was
retained as the hero source rather than downgraded.

Responsive crop and overlay treatment is controlled in `src/pages/Home.css`.

Nightclub photography has been withdrawn from the shipped bundle and preserved in `_unused-assets/`.
`EventImage` accepts a `focus` prop (object-position) so one photograph can be art-directed
differently in different compositions without duplicating files.

Approved event photography remains in its original files. The `-640` and `-960` JPG/WebP files are non-destructive responsive derivatives used by `EventImage.jsx`.

## Form delivery

The event brief is structured for Netlify Forms with a matching static form shell in `index.html`. On hosts without a verified form backend, the interface preserves the entered details and offers a prefilled email fallback to `info@doneevents.ae`.

SPA fallbacks are included for Netlify, GitHub Pages and OpenAI Sites hosting.

`SITE_URL` sets the production origin used for absolute social-card URLs. It defaults to the configured OpenAI Sites origin and is supplied automatically by Netlify or the included GitHub Pages workflow. `VITE_BASE_PATH` can set a sub-path deployment base; the GitHub Pages workflow derives it from the repository name.

## Content integrity

`src/content/siteContent.js` is the single source of truth for business copy. No client names,
project names, venues, guest counts, founding dates, awards or statistics are present. Blocks that
are ready to receive verified data are marked `CONTENT PLACEHOLDER`.

## Outstanding items for the client

1. Hero audio licensing and brand approval (see above).
2. Privacy and Terms pages do not exist, so no footer links to them were created.
3. No verified social handles were supplied, so no social links were created.
4. Client logo strip is stubbed as a capability strip until written permission to display client
   marks is confirmed.
