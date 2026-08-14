import { Reveal } from "./Reveal";
import { TagRow } from "./Tag";
import { Link } from "../lib/router";

function Metrics({ metrics }) {
  if (!metrics?.length) return null;
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-hairline py-6 sm:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label}>
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <span className="block font-display tabular text-2xl leading-none tracking-tight sm:text-3xl">
              {m.value}
            </span>
            <span className="mt-2 block text-xs leading-snug text-faint">{m.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectCard({ project }) {
  const { name, tagline, role, period, status, summary, metrics, pillars, links, caseStudy } =
    project;

  return (
    <Reveal
      as="article"
      className="relative overflow-hidden rounded-2xl border border-hairline bg-surface/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-hairline-strong sm:p-9"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-3xl leading-none tracking-tight sm:text-4xl">{name}</h3>
            {status ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-line px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-accent">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {status}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-base text-muted">{tagline}</p>
        </div>

        <p className="font-mono text-[0.6875rem] tracking-wider text-faint uppercase">
          {role}
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          {period}
        </p>
      </div>

      <p className="mt-7 max-w-3xl text-base leading-relaxed text-muted md:text-lg">{summary}</p>

      <Metrics metrics={metrics} />

      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {pillars.map((p) => (
          <div key={p.title}>
            <h4 className="flex items-center gap-2 font-mono text-xs tracking-wider text-accent uppercase">
              <span className="h-px w-4 bg-accent-line" aria-hidden="true" />
              {p.title}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            <TagRow items={p.tags} />
          </div>
        ))}
      </div>

      {links?.length ? (
        <div className="mt-9 flex flex-wrap gap-3">
          {caseStudy ? (
            <Link
              to={caseStudy}
              className="group inline-flex items-center gap-2 rounded-full border border-accent-line px-4 py-2 font-mono text-xs text-accent transition-colors duration-200 hover:bg-accent-soft"
            >
              Read the case study
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          ) : null}
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-colors duration-200 ${
                l.primary
                  ? "bg-accent text-ground hover:opacity-90"
                  : "border border-hairline text-muted hover:border-accent-line hover:text-accent"
              }`}
            >
              {l.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </Reveal>
  );
}
