# andreineagoe.dev — portfolio

Personal portfolio for Andrei Neagoe — full-stack software engineer (cloud infrastructure, Python
back-ends, React front-ends).

This is a portfolio, not a services site. Client work lives at [monevo.tech](https://monevo.tech).

## Stack

| Concern | Choice                                                    |
| ------- | --------------------------------------------------------- |
| Build   | Vite 8                                                    |
| UI      | React 19                                                  |
| Styling | Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`) |
| Motion  | Motion 13 (`motion/react`)                                |
| Deploy  | GitHub Actions → GitHub Pages                             |

No runtime dependencies beyond React and Motion. No CMS, no analytics, no trackers.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # serve dist/ at :4173
npm run og        # regenerate public/og.png + apple-touch-icon.png (needs Chrome)
```

## Content

All copy lives in `src/data/` — nothing user-facing is hardcoded in components:

| File            | Holds                                                        |
| --------------- | ------------------------------------------------------------ |
| `profile.js`    | Name, role, lede, links, nav sections, headline metrics       |
| `experience.js` | Roles, per-role highlights, metrics                           |
| `projects.js`   | Garzoni and Monevo — summary, metrics, pillars, links         |
| `stack.js`      | Grouped tech tags and spoken languages                        |
| `background.js` | Education, internal training, awards, archived earlier work   |

To update the site after a new role or shipped project, edit the relevant data file. Only add a
metric you can point at a real before/after for — the whole design leans on those being true.

## Design system

Tokens are defined once in `src/styles/index.css`:

- Light values on `:root`, dark values on `.dark` (both land on `<html>`), surfaced to Tailwind via
  `@theme inline` so utilities like `bg-ground` follow the theme with no var indirection.
- Theme is resolved by an inline script in `index.html` before first paint, so there is no flash.
- Accent is teal. Monevo owns amber — the two sites should not look like the same brand.
- Type: Space Grotesk (display), Inter (body), JetBrains Mono (labels and data).

`prefers-reduced-motion` is honoured throughout: `Reveal` renders plain elements, counters show
their final value, and the nav pill drops its layout animation.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
`BASE_PATH=/personalwebsite/` and publishes `dist/` to GitHub Pages.

For a custom domain: set `BASE_PATH: /` in the workflow, add a `CNAME` file to `public/`, and
update the absolute URLs in `index.html` (canonical, `og:url`, `og:image`), `public/sitemap.xml`
and `public/robots.txt`.
