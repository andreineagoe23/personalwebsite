import { useEffect } from "react";
import { Backdrop } from "./components/Backdrop";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { CaseStudyGarzoni } from "./pages/CaseStudyGarzoni";
import { NotFound } from "./pages/NotFound";
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

    const url = `${SITE_URL}${path === "/" ? "/" : path}`;
    setMeta('meta[property="og:url"]', url);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);
  }, [route, path]);
}

export default function App() {
  const { path } = useRouter();
  const Page = PAGES[path];
  const route = routeByPath(path) ?? notFound;

  useDocumentMeta(route, Page ? path : "/404");
  useHashLanding();

  return (
    <>
      <Backdrop />
      <Nav />
      <main id="main">{Page ? <Page /> : <NotFound />}</main>
      <Footer />
    </>
  );
}
