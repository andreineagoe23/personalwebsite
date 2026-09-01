import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { MetricDelta } from "../components/MetricDelta";
import { TagRow } from "../components/Tag";
import { experience } from "../data/experience";

function Role({ role }) {
  return (
    <Reveal as="article" className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <h3 className="font-display text-2xl leading-tight tracking-tight">{role.company}</h3>
          <p className="mt-2 text-sm text-muted">{role.role}</p>
          <p className="eyebrow mt-4">{role.period}</p>
          <p className="eyebrow mt-1">{role.location}</p>
        </div>
      </div>

      <div className="lg:col-span-9">
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">{role.summary}</p>

        {role.deltas ? (
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 border-y border-hairline py-8 sm:grid-cols-3">
            {role.deltas.map((metric, i) => (
              <MetricDelta key={metric.id} metric={metric} index={i} compact />
            ))}
          </div>
        ) : null}

        {role.metrics ? (
          <dl className="mt-8 grid grid-cols-3 gap-x-6 gap-y-4 border-y border-hairline py-5">
            {role.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block font-display tabular text-xl leading-none tracking-tight text-accent sm:text-2xl">
                    {m.value}
                  </span>
                  <span className="mt-2 block text-xs leading-snug text-faint">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <ul className="mt-8 space-y-8">
          {role.highlights.map((h) => (
            <li key={h.title}>
              <h4 className="flex items-start gap-3 font-mono text-sm tracking-tight">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {h.title}
              </h4>
              <p className="mt-2 pl-[1.125rem] text-sm leading-relaxed text-muted">{h.body}</p>
              <div className="pl-[1.125rem]">
                <TagRow items={h.tags} />
              </div>
            </li>
          ))}
        </ul>

        {role.products ? <Roadmap products={role.products} /> : null}
      </div>
    </Reveal>
  );
}

/**
 * The same year read the other way round: not what the work was, but how many
 * separate products it landed on. Reconstructed from closed tickets, newest
 * first, so the top of the list is also the most recent thing shipped.
 */
function Roadmap({ products }) {
  return (
    <div className="mt-12 border-t border-hairline pt-8">
      <p className="eyebrow">A year across the estate</p>
      <ol className="mt-6 divide-y divide-hairline border-y border-hairline">
        {products.map((p) => (
          <li
            key={p.id}
            className="grid grid-cols-1 gap-x-8 gap-y-2 py-5 sm:grid-cols-12 sm:gap-y-1"
          >
            <div className="sm:col-span-3">
              <p className="eyebrow">{p.period}</p>
            </div>
            <div className="sm:col-span-9">
              <h5 className="font-mono text-sm tracking-tight">
                {p.name}
                <span className="ml-2 text-xs text-faint">{p.kind}</span>
              </h5>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="02 / Experience"
      title="Where the production work happens."
      lede="Serverless services, the Terraform under them, the message bus everything else talks through — and the ten-odd internal products that sit on top."
    >
      <div className="divide-y divide-hairline">
        {experience.map((role, i) => (
          <div key={role.id} className={i === 0 ? "pb-16" : "py-16 last:pb-0"}>
            <Role role={role} />
          </div>
        ))}
      </div>
    </Section>
  );
}
