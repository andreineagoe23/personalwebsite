/**
 * Rasterises the social card and the apple-touch icon with headless Chrome.
 * Run with `npm run og` after editing scripts/og-template.html — the PNGs are
 * committed, so this is not part of the normal build.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const publicDir = resolve(root, "public");

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error("No Chrome/Chromium binary found. Checked:\n" + CHROME_CANDIDATES.join("\n"));
  process.exit(1);
}

function shoot({ url, out, width, height }) {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      // Give webfonts time to land before the frame is captured.
      "--virtual-time-budget=5000",
      `--window-size=${width},${height}`,
      `--screenshot=${out}`,
      url,
    ],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
  console.log(`wrote ${out.replace(root + "/", "")}`);
}

mkdirSync(publicDir, { recursive: true });

// 1200×630 social card
shoot({
  url: `file://${resolve(here, "og-template.html")}`,
  out: resolve(publicDir, "og.png"),
  width: 1200,
  height: 630,
});

// 180×180 apple-touch icon, rendered from the same SVG as the favicon
const iconHtml = resolve(here, ".icon.tmp.html");
writeFileSync(
  iconHtml,
  `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;width:180px;height:180px;background:#08090b}
img{width:180px;height:180px;display:block}</style>
<img src="${resolve(publicDir, "favicon.svg")}">`,
);
shoot({
  url: `file://${iconHtml}`,
  out: resolve(publicDir, "apple-touch-icon.png"),
  width: 180,
  height: 180,
});
rmSync(iconHtml, { force: true });
