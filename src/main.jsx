import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "motion/react";
import App from "./App";
import { RouterProvider } from "./lib/router";
import "./styles/index.css";

const container = document.getElementById("root");

const tree = (
  <StrictMode>
    {/* domAnimation only: this site never uses layout or drag animations, and
        `strict` makes an accidental `motion.*` import fail loudly. */}
    <LazyMotion features={domAnimation} strict>
      <RouterProvider>
        <App />
      </RouterProvider>
    </LazyMotion>
  </StrictMode>
);

// The build prerenders every route, so in production there is markup to adopt.
// createRoot remains the path for `vite dev`, which serves an empty container.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
