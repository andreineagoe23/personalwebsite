# Portfolio — Andrei Neagoe

Personal portfolio for Andrei Neagoe — full-stack software engineer (cloud infrastructure, Python
back-ends, React front-ends).

This is a portfolio, not a services site. Client work lives at [monevo.tech](https://monevo.tech).

Live: <https://andreineagoe23.github.io/personalwebsite/>

## Stack

| Concern | Choice                                                     |
| ------- | ---------------------------------------------------------- |
| Build   | Vite 8                                                     |
| UI      | React 19                                                   |
| Styling | Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`) |
| Motion  | Motion 13 via `LazyMotion` + `domAnimation`                |
| Routing | ~50 lines in `src/lib/router.jsx`                          |
| Deploy  | GitHub Actions → GitHub Pages                              |

Two runtime dependencies: React and Motion. No router library, no CMS, no analytics, no trackers.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # vite build + prerender routes → dist/
npm run preview   # serve dist/ at :4173
npm run og        # regenerate public/og.png + apple-touch-icon.png (needs Chrome)
```

## Routes

Declared once in `src/data/routes.js`, consumed by both the client router and the build:

| Path            | Page                        |
| --------------- | --------------------------- |
| `/`             | Portfolio                   |
| `/work/garzoni` | Garzoni case study          |
| anything else   | 404 (`src/pages/NotFound`)  |

`scripts/prerender-routes.mjs` runs after `vite build` and writes a real `index.html` for every
route, plus `404.html` and `sitemap.xml`. GitHub Pages has no server-side rewrite, so without this
a client-only router would serve `/work/garzoni` as a hard 404 to crawlers. Each generated file
carries its own `<title>`, description, canonical and Open Graph tags; `404.html` also gets
`noindex`.

Adding a route means adding it to `routes.js` and `PAGES` in `App.jsx` — the HTML file, metadata
and sitemap entry follow automatically.

## Content

All copy lives in `src/data/` — nothing user-facing is hardcoded in components:

| File              | Holds                                                       |
| ----------------- | ----------------------------------------------------------- |
| `profile.js`      | Name, role, lede, links, nav sections, CV path               |
| `experience.js`   | Roles, highlights, and the before/after deltas per role      |
| `projects.js`     | Garzoni and Monevo cards on the home page                    |
| `caseStudies.js`  | Long-form Garzoni case study                                 |
| `stack.js`        | Grouped tech tags and spoken languages                       |
| `background.js`   | Education, internal training, awards, archived earlier work  |
| `routes.js`       | Route table and per-route metadata                           |

Only add a metric you can point at a real before/after for — the design leans on those being true.

The CV lives at `public/AndreiNeagoe-CV.pdf` and is linked from the nav, the hero and the mobile
menu. Replacing the file is enough; the filename is referenced once, in `profile.js`.

## Design system

Tokens are defined once in `src/styles/index.css`:

- Light values on `:root`, dark values on `.dark` (both land on `<html>`), surfaced to Tailwind via
  `@theme inline` so utilities like `bg-ground` follow the theme with no var indirection.
- Theme is resolved by an inline script in `index.html` before first paint, so there is no flash.
- Accent is teal. Monevo owns amber — the two sites should not look like the same brand.
- Type: Space Grotesk (display), Inter (body), JetBrains Mono (labels and data).
- The architecture diagram is inline SVG referencing the same tokens, so it themes for free and its
  labels stay real text.

`prefers-reduced-motion` is honoured throughout: `Reveal` renders plain elements, counters show
their final value, and scroll behaviour switches to instant.

`LazyMotion` is mounted with `strict`, which makes an accidental `motion.*` import throw — use
`m.*` instead. Layout and drag animations are not available under `domAnimation` by design.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
`BASE_PATH=/personalwebsite/` and publishes `dist/` to GitHub Pages.

For a custom domain: set `BASE_PATH: /` in the workflow, add a `CNAME` file to `public/`, and
update `SITE_URL` in `src/data/routes.js` plus the absolute URLs in `index.html` and
`public/robots.txt`.
