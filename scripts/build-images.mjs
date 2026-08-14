/**
 * Re-encodes the portrait to WebP so the LCP image ships ~35% smaller, keeping
 * the JPEG as a fallback for the handful of clients that need it.
 *
 * There is no WebP encoder on a stock macOS (no sips support, no cwebp), so
 * this drives the one that is already installed: Chrome's canvas encoder. The
 * page posts the encoded bytes back to a short-lived local server.
 *
 * Run with `npm run images` after replacing src/assets/portrait.jpeg. Output is
 * committed, so this is not part of the normal build.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const assets = resolve(here, "..", "src", "assets");
const SOURCE = resolve(assets, "portrait.jpeg");
const QUALITY = 0.82;
const PORT = 8931;

// The portrait renders about 380 CSS px wide. 768 covers 2x screens; 420 covers
// 1x, where the full-size file would be four times the pixels actually used.
const WIDTHS = [
  { width: 768, out: "portrait.webp" },
  { width: 420, out: "portrait-420.webp" },
];

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];
const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error("No Chrome/Chromium found; cannot encode WebP.");
  process.exit(1);
}

const jpeg = readFileSync(SOURCE);

const page = `<!doctype html><meta charset="utf-8"><body><script>
(async () => {
  const widths = ${JSON.stringify(WIDTHS.map((w) => w.width))};
  const img = new Image();
  img.src = "/source.jpeg";
  await img.decode();
  for (const w of widths) {
    const h = Math.round((img.naturalHeight / img.naturalWidth) * w);
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);
    const blob = await new Promise((r) => c.toBlob(r, "image/webp", ${QUALITY}));
    await fetch("/done?w=" + w, { method: "POST", body: blob });
  }
})();
</script></body>`;

const results = new Map();
let resolveDone;
const finished = new Promise((r) => (resolveDone = r));

const server = createServer((req, res) => {
  if (req.url === "/source.jpeg") {
    res.writeHead(200, { "content-type": "image/jpeg" }).end(jpeg);
    return;
  }
  if (req.url?.startsWith("/done") && req.method === "POST") {
    const width = Number(new URL(req.url, "http://x").searchParams.get("w"));
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      res.writeHead(200).end("ok");
      results.set(width, Buffer.concat(chunks));
      if (results.size === WIDTHS.length) resolveDone(results);
    });
    return;
  }
  res.writeHead(200, { "content-type": "text/html" }).end(page);
});

server.listen(PORT);

// Must be async: a sync spawn would block the event loop and the server above
// would never answer the page's own requests.
const child = spawn(
  chrome,
  ["--headless=new", "--disable-gpu", "--no-sandbox", `http://localhost:${PORT}/`],
  { stdio: "ignore" },
);

const encoded = await Promise.race([
  finished,
  new Promise((_, reject) => setTimeout(() => reject(new Error("encode timed out")), 45000)),
]);

child.kill();
server.close();

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
for (const { width, out } of WIDTHS) {
  const bytes = encoded.get(width);
  writeFileSync(resolve(assets, out), bytes);
  console.log(`${String(width).padStart(4)}w → src/assets/${out.padEnd(20)} ${kb(bytes.length)}`);
}
console.log(`source portrait.jpeg ${kb(jpeg.length)}`);
