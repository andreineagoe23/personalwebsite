import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { Tag } from "../components/Tag";
import { archive, education, training } from "../data/background";

export function Background() {
  return (
    <Section
      id="background"
      index="04 / Background"
      title="Where it came from."
      lede="A BCS-accredited computer science degree, ongoing internal engineering programmes at Framestore, and the university work that led here."
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal className="rounded-2xl border border-hairline bg-surface/50 p-6 backdrop-blur-sm sm:p-8">
            <p className="eyebrow">Education</p>
            <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight sm:text-3xl">
              {education.degree}
            </h3>
            <p className="mt-2 text-base text-muted">{education.institution}</p>
            <p className="eyebrow mt-3">{education.period}</p>

            <p className="mt-6 text-sm leading-relaxed text-muted">{education.note}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{education.detail}</p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {education.modules.map((m) => (
                <li key={m}>
                  <Tag>{m}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <p className="eyebrow">Earlier work</p>
            <ul className="mt-5 divide-y divide-hairline border-y border-hairline">
              {archive.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-6 py-4 transition-colors duration-200"
                  >
                    <span className="min-w-0">
                      <span className="font-mono text-sm transition-colors duration-200 group-hover:text-accent">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-faint">
                        {item.blurb}
                      </span>
                    </span>
                    <span className="eyebrow shrink-0">{item.year}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.05}>
            <p className="eyebrow">Training & awards</p>
            <ul className="mt-5 space-y-7">
              {training.map((t) => (
                <li key={t.id} className="border-l border-hairline pl-5">
                  <h3 className="font-mono text-sm tracking-tight">{t.title}</h3>
                  <p className="eyebrow mt-1.5">{t.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{t.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
