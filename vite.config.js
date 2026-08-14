import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The site is served from the root of neagoeandrei.com. Set BASE_PATH to
// "/personalwebsite/" to build for the bare github.io project URL instead.
const base = process.env.BASE_PATH ?? "/";

export default defineConfig(({ isSsrBuild }) => ({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2022",
    // The prerender step reads this to resolve hashed filenames for the LCP
    // image preload and the case-study chunk's modulepreload.
    manifest: !isSsrBuild,
    ...(isSsrBuild
      ? {
          // A stable, unhashed entry so the prerender script can import it, and
          // no second copy of public/ — the client build already emitted it.
          copyPublicDir: false,
          rollupOptions: { output: { entryFileNames: "entry-server.js" } },
        }
      : {
          rollupOptions: {
            output: {
              assetFileNames: "assets/[name]-[hash][extname]",
              chunkFileNames: "assets/[name]-[hash].js",
              entryFileNames: "assets/[name]-[hash].js",
            },
          },
        }),
  },
}));
