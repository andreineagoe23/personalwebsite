import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { cvFilename, cvUrl, navSections, profile } from "../data/profile";
import { Link, useRouter } from "../lib/router";
import { ThemeToggle } from "./ThemeToggle";

function useActiveSection(enabled) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const targets = navSections.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      // Band across the upper-middle of the viewport, so a section becomes
      // "active" once its heading is comfortably on screen.
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

const DownloadIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
  </svg>
);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { path } = useRouter();
  const onHome = path === "/";
  const active = useActiveSection(onHome);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-hairline bg-ground/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="group flex min-h-11 items-center gap-2.5" aria-label={profile.name}>
            <span className="grid h-7 w-7 place-items-center rounded-md border border-hairline font-mono text-[0.6875rem] text-accent transition-colors duration-200 group-hover:border-accent-line">
              AN
            </span>
            <span className="font-display text-sm tracking-tight">{profile.name}</span>
          </Link>

          <div className="flex items-center gap-1">
            <ul className="mr-2 hidden items-center gap-1 md:flex">
              {navSections.map((s) => (
                <li key={s.id}>
                  {/* Always a router link: from a case-study page these need to
                      go home first, and on home the router handles the scroll. */}
                  <Link
                    to="/"
                    hash={`#${s.id}`}
                    aria-current={active === s.id ? "true" : undefined}
                    className={`relative inline-flex min-h-9 items-center rounded-full px-3 py-2 font-mono text-xs tracking-wide transition-colors duration-200 ${
                      active === s.id
                        ? "border border-accent-line text-accent"
                        : "border border-transparent text-muted hover:text-text"
                    }`}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={cvUrl}
              download={cvFilename}
              className="mr-1 hidden min-h-9 items-center gap-1.5 rounded-full border border-accent-line px-3 py-2 font-mono text-xs tracking-wide text-accent transition-colors duration-200 hover:bg-accent-soft sm:inline-flex"
            >
              CV
              <DownloadIcon className="h-3 w-3" />
            </a>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-muted transition-colors duration-200 hover:border-accent-line hover:text-accent md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <m.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ground/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {navSections.map((s, i) => (
                <m.li
                  key={s.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35 }}
                >
                  <Link
                    to="/"
                    hash={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-hairline py-4 font-display text-3xl tracking-tight"
                  >
                    <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                    {s.label}
                  </Link>
                </m.li>
              ))}

              <m.li
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * navSections.length, duration: 0.35 }}
                className="mt-6"
              >
                <a
                  href={cvUrl}
                  download={cvFilename}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-accent-line px-5 py-2.5 font-mono text-sm text-accent"
                >
                  Download CV
                  <DownloadIcon className="h-4 w-4" />
                </a>
              </m.li>
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
