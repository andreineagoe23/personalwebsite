/**
 * Emits a real HTML file for every route, plus a 404.html.
 *
 * GitHub Pages has no server-side rewrite, so a client-only router would make
 * /work/garzoni return a hard 404 to crawlers. Rather than the redirect hack,
 * each route gets its own index.html: same app bundle, per-route <title>,
 * description, canonical and og tags. Served at 200 with correct metadata,
 * then the router renders the matching page with no flash.
 *
 * 404.html gets the same treatment with noindex, so genuinely unknown paths
 * still boot the app and render the NotFound view — with a 404 status.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { notFound, routes, SITE_URL } from "../src/data/routes.js";

const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, "..", "dist");
const template = readFileSync(resolve(dist, "index.html"), "utf8");

/**
 * Resolve hashed asset filenames from Vite's manifest so each page can preload
 * exactly what it needs: the home page preloads the LCP portrait (otherwise it
 * is only discovered once the JS has parsed), and the case study modulepreloads
 * its own lazy chunk so a direct visit does not pay an extra round trip.
 */
function readManifest() {
  for (const p of [resolve(dist, ".vite", "manifest.json"), resolve(dist, "manifest.json")]) {
    try {
      return JSON.parse(readFileSync(p, "utf8"));
    } catch {
      /* try the next location */
    }
  }
  return {};
}

const manifest = readManifest();
const entries = Object.entries(manifest);

// The SSR bundle renders each route to static markup, so the page is readable
// before any JavaScript runs and the client hydrates it in place.
const { render } = await import(resolve(here, "..", "dist-ssr", "entry-server.js"));

const findAsset = (test) => {
  for (const [key, chunk] of entries) {
    if (typeof chunk.file === "string" && test(chunk.file, key)) return `/${chunk.file}`;
    for (const asset of chunk.assets ?? []) {
      if (test(asset, key)) return `/${asset}`;
    }
  }
  return null;
};

const portrait768 = findAsset((f) => /portrait-(?!420)[^/]*\.webp$/.test(f));
const portrait420 = findAsset((f) => /portrait-420-[^/]*\.webp$/.test(f));
const caseStudyChunk = findAsset((f, key) => key.includes("CaseStudyGarzoni") && f.endsWith(".js"));

// Must mirror the <picture> in Hero.jsx, or the preload fetches a size the
// browser then declines to use and the image is downloaded twice.
const PORTRAIT_SIZES = "(min-width: 1024px) 380px, calc(100vw - 4.5rem)";

const preloadFor = (routeId) => {
  const tags = [];
  if (routeId === "home" && portrait768 && portrait420) {
    tags.push(
      `<link rel="preload" as="image" type="image/webp" ` +
        `imagesrcset="${portrait420} 420w, ${portrait768} 768w" ` +
        `imagesizes="${PORTRAIT_SIZES}" fetchpriority="high" />`,
    );
  }
  if (routeId === "garzoni" && caseStudyChunk) {
    tags.push(`<link rel="modulepreload" href="${caseStudyChunk}" />`);
  }
  return tags;
};

/** Replace the content="..." of a meta tag matched by attribute. */
function setMeta(html, attr, name, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`, "i");
  return re.test(html) ? html.replace(re, `$1${escapeAttr(value)}$2`) : html;
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeText(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderPage(route, url, { noindex = false, preloads = [], path = "/" } = {}) {
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeText(route.title)}</title>`);
  html = setMeta(html, "name", "description", route.description);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/i,
    `$1${escapeAttr(url)}$2`,
  );
  if (noindex) {
    html = html.replace("</head>", '  <meta name="robots" content="noindex" />\n  </head>');
  }
  const markup = render(path);
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${markup}</div>`,
  );
  if (preloads.length) {
    html = html.replace("</head>", `  ${preloads.join("\n  ")}\n  </head>`);
  }
  return html;
}

/**
 * Static hosts serve /work/garzoni/index.html and 301 the slashless form to it,
 * so the canonical, og:url and sitemap all use the trailing slash — otherwise
 * every canonical points at a URL that redirects.
 */
const canonicalUrl = (path) => `${SITE_URL}${path === "/" ? "/" : `${path}/`}`;

const written = [];

for (const route of routes) {
  const url = canonicalUrl(route.path);
  const outDir = route.path === "/" ? dist : resolve(dist, route.path.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  const outFile = resolve(outDir, "index.html");
  writeFileSync(
    outFile,
    renderPage(route, url, { preloads: preloadFor(route.id), path: route.path }),
  );
  written.push(outFile.replace(dist + "/", ""));
}

writeFileSync(
  resolve(dist, "404.html"),
  renderPage(notFound, `${SITE_URL}/404`, { noindex: true, path: "/__not_found__" }),
);
written.push("404.html");

// Sitemap lists only the real, indexable routes.
const urls = routes
  .map(
    (r) => `  <url>
    <loc>${canonicalUrl(r.path)}</loc>
    <changefreq>monthly</changefreq>
    <priority>${r.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n");

writeFileSync(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);
written.push("sitemap.xml");

console.log(`prerendered ${written.length} files:\n  ${written.join("\n  ")}`);
