import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "motion/react";
import App from "./App";
import { RouterProvider } from "./lib/router";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* domAnimation only: this site never uses layout or drag animations, and
        `strict` makes an accidental `motion.*` import fail loudly. */}
    <LazyMotion features={domAnimation} strict>
      <RouterProvider>
        <App />
      </RouterProvider>
    </LazyMotion>
  </StrictMode>,
);
