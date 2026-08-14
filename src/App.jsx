import { lazy, Suspense, useEffect } from "react";
import { Backdrop } from "./components/Backdrop";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

// Split off the home bundle: most visitors never open the case study, and the
// case-study HTML modulepreloads this chunk so direct visits pay no round trip.
const CaseStudyGarzoni = lazy(() =>
  import("./pages/CaseStudyGarzoni").then((m) => ({ default: m.CaseStudyGarzoni })),
);
import { useHashLanding } from "./lib/useHashLanding";
import { useRouter } from "./lib/router";
import { notFound, routeByPath, SITE_URL } from "./data/routes";

const PAGES = {
  "/": Home,
  "/work/garzoni": CaseStudyGarzoni,
};

/** Keeps the head in step with the client-side route. */
function useDocumentMeta(route, path) {
  useEffect(() => {
    document.title = route.title;

    const setMeta = (selector, value) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };
    setMeta('meta[name="description"]', route.description);
    setMeta('meta[property="og:title"]', route.title);
    setMeta('meta[property="og:description"]', route.description);
    setMeta('meta[name="twitter:title"]', route.title);
    setMeta('meta[name="twitter:description"]', route.description);

    // Trailing slash to match the prerendered canonical for the same route.
    const url = `${SITE_URL}${path === "/" ? "/" : `${path}/`}`;
    setMeta('meta[property="og:url"]', url);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);
  }, [route, path]);
}

/**
 * `page` lets the prerender pass in an already-resolved component: renderToString
 * cannot suspend on a lazy import, and the client still code-splits normally.
 */
export default function App({ page }) {
  const { path } = useRouter();
  const Page = page ?? PAGES[path];
  const route = routeByPath(path) ?? notFound;

  useDocumentMeta(route, Page ? path : "/404");
  useHashLanding();

  return (
    <>
      <Backdrop />
      <Nav />
      <main id="main">
        {/* min-height keeps the footer from jumping while a route chunk loads */}
        <Suspense fallback={<div className="min-h-screen" />}>
          {Page ? <Page /> : <NotFound />}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
