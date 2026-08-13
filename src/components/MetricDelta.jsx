import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { EASE, viewport } from "../lib/motion";

/**
 * A before → after pair from production work. The number counts from the old
 * value to the new one, and the bar underneath shows the same ratio spatially
 * so the size of the win reads without doing arithmetic.
 */
export function MetricDelta({ metric, index = 0, compact = false }) {
  const { from, to, unit, decimals = 0, label, note, context } = metric;
  const ref = useRef(null);
  const inView = useInView(ref, viewport);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? to : from);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(from, to, {
      duration: 1.1,
      delay: 0.15 + index * 0.12,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, index]);

  const ratio = Math.max(to / from, 0.04);
  const factor = from / to;

  return (
    <div ref={ref} className="group relative">
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow">{label}</span>
        <span className="font-mono text-[0.625rem] tracking-wider text-faint">
          {factor >= 2 ? `${factor.toFixed(factor >= 10 ? 0 : 1)}×` : `−${Math.round((1 - ratio) * 100)}%`}
        </span>
      </div>

      <div className={`flex items-baseline gap-3 ${compact ? "mt-3" : "mt-4"}`}>
        <span
          className={`font-display tabular leading-none tracking-tight ${
            compact ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl"
          }`}
        >
          {display.toFixed(decimals)}
          <span className={`ml-0.5 text-muted ${compact ? "text-base" : "text-xl sm:text-2xl"}`}>
            {unit}
          </span>
        </span>
        <span className="font-mono text-xs text-faint line-through decoration-1">
          {from.toFixed(decimals)}
          {unit}
        </span>
      </div>

      <div className="mt-5 space-y-1.5" aria-hidden="true">
        <div className="h-px w-full bg-hairline-strong" />
        <motion.div
          className="h-[3px] rounded-full bg-accent"
          initial={reduced ? false : { width: "100%" }}
          animate={inView || reduced ? { width: `${ratio * 100}%` } : undefined}
          transition={{ duration: 1.1, delay: 0.15 + index * 0.12, ease: EASE }}
          style={reduced ? { width: `${ratio * 100}%` } : undefined}
        />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{note}</p>
      {context ? <p className="mt-1 font-mono text-[0.6875rem] text-faint">{context}</p> : null}
    </div>
  );
}
