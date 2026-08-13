import { motion, useReducedMotion } from "motion/react";
import portrait from "../assets/portrait.jpeg";
import { profile } from "../data/profile";
import { fadeUp, stagger } from "../lib/motion";

const record = [
  { key: "Role", value: "Software Developer" },
  { key: "Company", value: "Framestore" },
  { key: "Since", value: "Jul 2025" },
  { key: "Building", value: "Garzoni" },
  { key: "Based", value: "London, UK" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const animate = reduced ? undefined : "show";

  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.div
          variants={stagger(0.1, 0.09)}
          initial={reduced ? false : "hidden"}
          animate={animate}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-line px-3 py-1 font-mono text-[0.6875rem] tracking-wide text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {profile.status.label}
              </span>
              <span className="eyebrow">{profile.location}</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-8 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92]"
            >
              Andrei
              <br />
              Neagoe<span className="text-accent">.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 font-mono text-sm tracking-tight text-muted">
              {profile.role}
            </motion.p>

            {/* One string rather than a list — separators never orphan onto a new line. */}
            <motion.p
              variants={fadeUp}
              className="mt-3 font-mono text-[0.6875rem] leading-relaxed tracking-wider text-faint uppercase"
            >
              {profile.focus.join("  ·  ")}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              {profile.lede}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              {profile.sublede}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ground transition-opacity duration-200 hover:opacity-90"
              >
                View work
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href={`mailto:${profile.links.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm text-muted transition-colors duration-200 hover:border-accent-line hover:text-accent"
              >
                {profile.links.email}
              </a>
            </motion.div>
          </div>

          {/* Dossier record card — portrait plus the facts, in mono. */}
          {/* On lg the card stretches to the left column's height and the photo
              absorbs the slack, so the two columns always end on the same line. */}
          <motion.div variants={fadeUp} className="lg:relative lg:col-span-5">
            <div className="group w-full rounded-2xl border border-hairline bg-surface/60 p-4 shadow-panel backdrop-blur-sm lg:absolute lg:inset-0 lg:flex lg:flex-col">
              {/* Desaturated to sit inside the dossier; returns to colour on hover. */}
              <div className="relative aspect-3/4 overflow-hidden rounded-xl border border-hairline lg:aspect-auto lg:min-h-0 lg:flex-1">
                <img
                  src={portrait}
                  alt="Andrei Neagoe"
                  width="768"
                  height="1024"
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                  <span className="font-mono text-[0.625rem] tracking-widest text-white/80 uppercase">
                    andrei_neagoe
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-widest text-white/60">
                    LDN · GMT+1
                  </span>
                </div>
              </div>

              <dl className="mt-4 divide-y divide-hairline">
                {record.map((row) => (
                  <div key={row.key} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="eyebrow">{row.key}</dt>
                    <dd className="font-mono text-xs text-text">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
