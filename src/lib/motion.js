/**
 * Shared easing and viewport settings for the little motion that is left.
 *
 * Entrance animations moved to CSS (see `.rise` and `.reveal-*` in
 * styles/index.css) because the site is prerendered — anything that starts at
 * opacity 0 in the HTML would hold back the largest paint until hydration.
 * Motion now only drives the mobile menu and the metric counters.
 */
export const EASE = [0.22, 0.8, 0.24, 1];

export const viewport = { once: true, margin: "-72px" };
