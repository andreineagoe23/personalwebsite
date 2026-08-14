# Portfolio — Andrei Neagoe

Personal portfolio for Andrei Neagoe — full-stack software engineer (cloud infrastructure, Python
back-ends, React front-ends).

This is a portfolio, not a services site. Client work lives at [monevo.tech](https://monevo.tech).

Live: <https://neagoeandrei.com/>

## Stack

| Concern | Choice                                                     |
| ------- | ---------------------------------------------------------- |
| Build   | Vite 8                                                     |
| UI      | React 19                                                   |
| Styling | Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`) |
| Motion  | CSS keyframes; Motion 13 (`LazyMotion`) only for menu + counters |
| Routing | ~50 lines in `src/lib/router.jsx`                          |
| Render  | Prerendered to static HTML at build, hydrated on the client |
| Deploy  | GitHub Actions → GitHub Pages                              |

Two runtime dependencies: React and Motion. No router library, no CMS, no analytics, no trackers.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # vite build + prerender routes → dist/
npm run preview   # serve dist/ at :4173
npm run og        # regenerate public/og.png + apple-touch-icon.png (needs Chrome)
npm run images    # re-encode the portrait to WebP at 2 widths (needs Chrome)
npm run fonts     # re-download the self-hosted woff2 files
```

## Routes

Declared once in `src/data/routes.js`, consumed by both the client router and the build:

| Path            | Page                        |
| --------------- | --------------------------- |
| `/`             | Portfolio                   |
| `/work/garzoni` | Garzoni case study          |
| anything else   | 404 (`src/pages/NotFound`)  |

`scripts/prerender-routes.mjs` runs after `vite build` and `build:ssr`. It renders each route to
static HTML through `src/entry-server.jsx` and writes a real `index.html` for every route, plus
`404.html` and `sitemap.xml`. The client hydrates that markup rather than building it from scratch. GitHub Pages has no server-side rewrite, so without this
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

## Performance

The page is prerendered, so content is readable before any JavaScript runs. Two rules keep it that
way:

- **Nothing that carries content may start at `opacity: 0` in the HTML.** Entrance animation is CSS
  (`.rise`), which runs at first paint. Scroll reveals arm themselves in a layout effect and only
  for elements already below the fold, so they never delay the largest paint.
- **The LCP image is preloaded** with `imagesrcset` mirroring the `<picture>` in `Hero.jsx`. If the
  two ever disagree the browser downloads the portrait twice.

Fonts are self-hosted in `public/fonts` — no third-party request on the render path. The portrait
ships as WebP at 420w and 768w with a JPEG fallback.

Measured cold on a throttled connection (1.6 Mbps, 150 ms RTT, 4x CPU):

| | FCP | LCP | CLS |
| --- | --- | --- | --- |
| Desktop | ~1.5 s | ~2.6 s | 0 |
| Mobile | ~1.5 s | ~1.5 s | 0 |

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

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to
GitHub Pages, served at <https://neagoeandrei.com> via `public/CNAME`.

DNS lives at GoDaddy: four `A` records on the apex pointing at GitHub Pages
(`185.199.108–111.153`), and `www` as a `CNAME` to `andreineagoe23.github.io.` so it redirects to
the apex.

To build for the bare `github.io` project URL instead — useful for a preview deploy — run
`BASE_PATH=/personalwebsite/ npm run build`. Changing domain again means updating `SITE_URL` in
`src/data/routes.js`, `public/CNAME`, `public/robots.txt` and the absolute URLs in `index.html`.
