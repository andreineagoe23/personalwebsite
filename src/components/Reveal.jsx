import { useLayoutEffect, useRef } from "react";

/**
 * Scroll-triggered entrance.
 *
 * The markup is prerendered, so this renders *visible* and only hides elements
 * that are still below the fold when the client mounts — done in a layout
 * effect, before paint, so nothing already on screen can blink out and back in.
 * That keeps the reveal effect without letting it delay the largest paint.
 *
 * With reduced motion it does nothing at all.
 */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Anything within the first viewport stays exactly as it was rendered.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.classList.add("reveal-armed");
    el.style.transitionDelay = delay ? `${delay}s` : "";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -72px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
