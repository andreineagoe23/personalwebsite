import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The site is served from the root of neagoeandrei.com. Set BASE_PATH to
// "/personalwebsite/" to build for the bare github.io project URL instead.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2022",
    // Rolldown's default chunking is good enough for a single-page site; a
    // hand-rolled manualChunks map just fragments the critical path here.
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
});
