import { Reveal } from "../components/Reveal";
import { profile } from "../data/profile";

const channels = [
  { label: "LinkedIn", value: "andrei-neagoe", href: profile.links.linkedin },
  { label: "GitHub", value: "andreineagoe23", href: profile.links.github },
  { label: "Garzoni", value: "garzoni.app", href: profile.links.garzoni },
  { label: "Monevo", value: "monevo.tech", href: profile.links.monevo },
];

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-hairline py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-baseline gap-4">
          <span className="eyebrow tabular">05 / Contact</span>
          <span className="rule flex-1 translate-y-[-0.35em]" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.05} className="mt-8 max-w-3xl">
          <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            Got something worth building?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Email is the fastest way to reach me — infrastructure problems, AI product work, or a
            back-end that has outgrown its architecture. I read everything.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <a
            href={`mailto:${profile.links.email}`}
            className="group inline-flex max-w-full items-baseline gap-3 font-display text-[clamp(1.5rem,5.5vw,3.5rem)] leading-none tracking-tight break-all transition-colors duration-200 hover:text-accent"
          >
            {profile.links.email}
            <span
              aria-hidden="true"
              className="text-accent transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
            >
              ↗
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => (
              <li key={c.label} className="bg-ground">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors duration-200 hover:bg-surface"
                >
                  <span className="eyebrow">{c.label}</span>
                  <span className="flex items-center justify-between gap-3 font-mono text-sm transition-colors duration-200 group-hover:text-accent">
                    {c.value}
                    <span
                      aria-hidden="true"
                      className="text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
