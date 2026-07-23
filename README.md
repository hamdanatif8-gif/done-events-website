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
- `/portfolio` — Format-led portfolio stories
- `/about` — Company approach and delivery model
- `/contact` — Event brief form

Shared business copy and service data live in `src/content/siteContent.js`. Reusable navigation, media and page-intro components live in `src/components`.

## Protected hero media

The following approved media files must remain byte-for-byte unchanged unless DONE explicitly authorizes a new edit:

- `public/media/hero-authority.mp4`
- `public/media/hero-authority.webm`
- `public/media/hero-authority-poster.jpg`

Responsive crop and overlay treatment is controlled in `src/pages/Home.css`.

Approved event photography remains in its original files. The `-640` and `-960` JPG/WebP files are non-destructive responsive derivatives used by `EventImage.jsx`.

## Form delivery

The event brief is structured for Netlify Forms with a matching static form shell in `index.html`. On hosts without a verified form backend, the interface preserves the entered details and offers a prefilled email fallback to `info@doneevents.ae`.

SPA fallbacks are included for Netlify, GitHub Pages and OpenAI Sites hosting.

`SITE_URL` sets the production origin used for absolute social-card URLs. It defaults to the configured OpenAI Sites origin and is supplied automatically by Netlify or the included GitHub Pages workflow. `VITE_BASE_PATH` can set a sub-path deployment base; the GitHub Pages workflow derives it from the repository name.
