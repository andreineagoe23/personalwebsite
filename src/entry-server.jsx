import { renderToString } from "react-dom/server";
import { LazyMotion, domAnimation } from "motion/react";
import App from "./App";
import { RouterProvider } from "./lib/router";
import { Home } from "./pages/Home";
import { CaseStudyGarzoni } from "./pages/CaseStudyGarzoni";
import { NotFound } from "./pages/NotFound";

// Resolved eagerly here: renderToString cannot suspend on the client's lazy
// import, so the prerender hands App a concrete component instead.
const PAGES = {
  "/": Home,
  "/work/garzoni": CaseStudyGarzoni,
};

/**
 * Renders a route to static HTML for the build. The markup must match what the
 * client produces on its first pass or hydration will discard it — which is why
 * nothing here reads from the DOM, and why the theme class is applied to <html>
 * by an inline script rather than by React.
 */
export function render(path) {
  const page = PAGES[path] ?? NotFound;

  return renderToString(
    <LazyMotion features={domAnimation} strict>
      <RouterProvider initialPath={path}>
        <App page={page} />
      </RouterProvider>
    </LazyMotion>,
  );
}
