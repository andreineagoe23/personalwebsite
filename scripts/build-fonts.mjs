/**
 * Downloads the latin subset of each webfont into public/fonts so they are
 * served same-origin.
 *
 * Google Fonts cost five cross-origin requests and ~163 KB here: a render-path
 * stylesheet, then DNS + TLS to a second host before a single glyph arrives.
 * All three families are variable, so one file each covers every weight we use.
 * Self-hosting also means no third-party request from a visitor's browser.
 *
 * Run with `npm run fonts` to refresh. Output is committed.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "..", "public", "fonts");

const CSS_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600" +
  "&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap";

// A modern UA is required or Google serves legacy formats instead of woff2.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const FILENAMES = {
  Inter: "inter-latin.woff2",
  "JetBrains Mono": "jetbrains-mono-latin.woff2",
  "Space Grotesk": "space-grotesk-latin.woff2",
};

const css = await (await fetch(CSS_URL, { headers: { "User-Agent": UA } })).text();

// Only the latin block of each family; the site has no cyrillic or greek copy.
const blocks = [...css.matchAll(/\/\*\s*latin\s*\*\/\s*@font-face\s*\{([^}]*)\}/g)];

const seen = new Set();
mkdirSync(outDir, { recursive: true });

for (const [, body] of blocks) {
  const family = body.match(/font-family:\s*'([^']+)'/)?.[1];
  const url = body.match(/url\(([^)]+)\)/)?.[1];
  if (!family || !url || seen.has(family)) continue;
  seen.add(family);

  const file = FILENAMES[family];
  if (!file) continue;

  const bytes = Buffer.from(await (await fetch(url, { headers: { "User-Agent": UA } })).arrayBuffer());
  writeFileSync(resolve(outDir, file), bytes);
  console.log(`${family.padEnd(16)} → public/fonts/${file} (${(bytes.length / 1024).toFixed(1)} KB)`);
}
