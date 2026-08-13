import { motion, useReducedMotion } from "motion/react";
import { fadeUp, viewport } from "../lib/motion";

/**
 * Scroll-triggered entrance. With reduced motion the element is simply present —
 * no opacity fade, no transform, nothing to re-trigger on scroll.
 */
export function Reveal({ as = "div", delay = 0, className = "", children, ...rest }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
