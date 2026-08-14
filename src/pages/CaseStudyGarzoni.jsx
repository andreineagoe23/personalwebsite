import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { Reveal } from "../components/Reveal";
import { Tag } from "../components/Tag";
import { Link } from "../lib/router";
import { garzoni as cs } from "../data/caseStudies";

function Rule({ index, label }) {
  return (
    <Reveal className="flex items-baseline gap-4">
      <span className="eyebrow tabular">
        {index} / {label}
      </span>
      <span className="rule flex-1 translate-y-[-0.35em]" aria-hidden="true" />
    </Reveal>
  );
}

export function CaseStudyGarzoni() {
  return (
    <article className="pt-32 pb-8 md:pt-40">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <Reveal>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back to portfolio
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none tracking-tight">
              {cs.name}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-line px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide text-accent">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {cs.status}
            </span>
          </div>
          <p className="mt-4 font-mono text-sm text-muted">{cs.tagline}</p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{cs.lede}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          {cs.links.map((l) => (
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
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {cs.facts.map((f) => (
              <div key={f.key} className="bg-ground p-5">
                <dt className="eyebrow">{f.key}</dt>
                <dd className="mt-2 font-mono text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* 01 — Constraints */}
        <section className="mt-24 md:mt-32">
          <Rule index="01" label="Constraints" />
          <Reveal delay={0.05} className="mt-6">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              What made it hard.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {cs.constraints.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.04}>
                <h3 className="flex items-center gap-2 font-mono text-xs tracking-wider text-accent uppercase">
                  <span className="h-px w-4 bg-accent-line" aria-hidden="true" />
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 02 — Architecture */}
        <section className="mt-24 md:mt-32">
          <Rule index="02" label="Architecture" />
          <Reveal delay={0.05} className="mt-6">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">One repo, one core.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <ArchitectureDiagram />
          </Reveal>
        </section>

        {/* 03 — Decisions */}
        <section className="mt-24 md:mt-32">
          <Rule index="03" label="Decisions" />
          <Reveal delay={0.05} className="mt-6">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Choices, and what they cost.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Every one of these bought something and gave something up. The trade-off is the
              interesting half.
            </p>
          </Reveal>

          <div className="mt-12 space-y-6">
            {cs.decisions.map((d) => (
              <Reveal
                key={d.title}
                as="article"
                className="rounded-2xl border border-hairline bg-surface/50 p-6 backdrop-blur-sm sm:p-8"
              >
                <h3 className="font-display text-xl leading-snug tracking-tight sm:text-2xl">
                  {d.title}
                </h3>
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="eyebrow">Problem</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{d.problem}</p>
                  </div>
                  <div>
                    <p className="eyebrow">Approach</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{d.choice}</p>
                  </div>
                  <div className="border-l-2 border-accent-line pl-4">
                    <p className="eyebrow">Trade-off</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{d.tradeoff}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 04 — Platform */}
        <section className="mt-24 md:mt-32">
          <Rule index="04" label="Platform" />
          <Reveal delay={0.05} className="mt-6">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              The unglamorous half.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              What turns a demo into something people can pay for and keep using.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
            {cs.platform.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.04}>
                <h3 className="eyebrow">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 05 — Retrospective */}
        <section className="mt-24 md:mt-32">
          <Rule index="05" label="Retrospective" />
          <Reveal delay={0.05} className="mt-6">
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              What I would do differently.
            </h2>
          </Reveal>
          <ul className="mt-12 space-y-6">
            {cs.retrospective.map((r, i) => (
              <Reveal as="li" key={r} delay={i * 0.04} className="flex gap-5">
                <span className="eyebrow tabular mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-2xl text-base leading-relaxed text-muted">{r}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <Reveal className="mt-24 border-t border-hairline pt-10 md:mt-32">
          <Link
            to="/"
            hash="#work"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors duration-200 hover:text-accent"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Back to all work
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
