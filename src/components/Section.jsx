import { Reveal } from "./Reveal";

export function Section({ id, index, title, lede, children, className = "" }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="flex items-baseline gap-4">
          <span className="eyebrow tabular">{index}</span>
          <span className="rule flex-1 translate-y-[-0.35em]" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.05} className="mt-6 max-w-3xl">
          <h2 className="font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl">{title}</h2>
          {lede ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lede}</p>
          ) : null}
        </Reveal>

        <div className="mt-14 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
