import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { Tag } from "../components/Tag";
import { languages, stack } from "../data/stack";

export function Stack() {
  return (
    <Section
      id="stack"
      index="03 / Stack"
      title="What I reach for."
      lede="Weighted towards what I actually ship with — AWS and Terraform on the infrastructure side, Django and FastAPI behind the API, React and Expo in front of it."
    >
      <div className="divide-y divide-hairline border-y border-hairline">
        {stack.map((group, i) => (
          <Reveal
            key={group.id}
            delay={i * 0.04}
            className="grid grid-cols-1 gap-4 py-7 md:grid-cols-12 md:gap-8"
          >
            <h3 className="eyebrow md:col-span-3 md:pt-1">{group.label}</h3>
            <ul className="flex flex-wrap gap-1.5 md:col-span-9">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal className="grid grid-cols-1 gap-4 py-7 md:grid-cols-12 md:gap-8">
          <h3 className="eyebrow md:col-span-3 md:pt-1">Spoken</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-9">
            {languages.map((l) => (
              <li key={l.name} className="font-mono text-xs text-muted">
                {l.name}
                <span className="ml-2 text-faint">{l.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
