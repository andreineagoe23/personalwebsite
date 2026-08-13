import { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * A ~50-line router. The site has two pages and a 404; pulling in a routing
 * library to serve that would cost more gzipped bytes than the pages weigh.
 *
 * Paths here are always base-relative ("/", "/work/garzoni"). The deploy base
 * (e.g. "/personalwebsite/") is stripped on read and re-added on write.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const RouterContext = createContext({ path: "/", navigate: () => {} });

export function toAppPath(pathname) {
  const stripped = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  const normalised = stripped.replace(/\/+$/, "");
  return normalised === "" ? "/" : normalised;
}

/**
 * Trailing slash on nested paths so internal links match the canonical URL and
 * skip the host's directory redirect.
 */
export function toHref(appPath) {
  if (appPath === "/") return `${BASE}/`;
  return `${BASE}${appPath}/`;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => toAppPath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(toAppPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((appPath, { hash = "" } = {}) => {
    window.history.pushState({}, "", toHref(appPath) + hash);
    setPath(toAppPath(window.location.pathname));

    // Wait a frame so the destination page has rendered its anchors.
    requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, []);

  return <RouterContext value={{ path, navigate }}>{children}</RouterContext>;
}

export function useRouter() {
  return useContext(RouterContext);
}

/**
 * Internal link. Falls back to default browser behaviour for modified clicks
 * so cmd/ctrl-click still opens a new tab.
 */
export function Link({ to, hash = "", className = "", children, onClick, ...rest }) {
  const { navigate } = useRouter();
  const href = toHref(to) + hash;

  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to, { hash });
  };

  return (
    <a href={href} onClick={handle} className={className} {...rest}>
      {children}
    </a>
  );
}
