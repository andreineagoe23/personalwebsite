import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this repo from /personalwebsite/. Set BASE_PATH=/ when
// deploying to a custom domain (or anywhere the site sits at the root).
const base = process.env.BASE_PATH ?? "/personalwebsite/";

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
