import { useEffect } from "react";

/**
 * The document is rendered by React, so the anchor a deep link points at does
 * not exist yet when the browser resolves the hash. Re-run the scroll once the
 * first paint has happened.
 */
export function useHashLanding() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash === "#top") return;

    const target = document.querySelector(hash);
    if (!target) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  }, []);
}
