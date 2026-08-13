const NODES = [
  { x: 40, y: 24, w: 270, h: 68, title: "React 19 web app", sub: "Vercel · Cloudflare edge" },
  { x: 610, y: 24, w: 270, h: 68, title: "Expo mobile app", sub: "iOS + Android · EAS releases" },
  {
    x: 230,
    y: 148,
    w: 460,
    h: 68,
    title: "Shared TypeScript core",
    sub: "types · API client · validation · design tokens",
    accent: true,
  },
  {
    x: 230,
    y: 272,
    w: 460,
    h: 68,
    title: "Django 5.2 / DRF API",
    sub: "Railway · Docker · health-gated deploys",
    accent: true,
  },
  { x: 20, y: 396, w: 250, h: 68, title: "Postgres + pgvector", sub: "relational + embeddings" },
  { x: 300, y: 396, w: 200, h: 68, title: "Redis + Celery", sub: "queues · scheduled jobs" },
  {
    x: 530,
    y: 396,
    w: 370,
    h: 68,
    title: "OpenAI · RevenueCat · Plaid",
    sub: "tutor · entitlements · banking",
  },
];

const EDGES = [
  "M175 92 L175 120 Q175 130 190 130 L340 130 Q355 130 355 140 L355 148",
  "M745 92 L745 120 Q745 130 730 130 L580 130 Q565 130 565 140 L565 148",
  "M460 216 L460 272",
  "M400 340 L400 366 Q400 376 385 376 L160 376 Q145 376 145 386 L145 396",
  "M460 340 L460 396",
  "M520 340 L520 366 Q520 376 535 376 L700 376 Q715 376 715 386 L715 396",
];

/**
 * Inline SVG rather than an image: it inherits the theme tokens, stays sharp at
 * any zoom, and the labels are real text for screen readers and search.
 */
export function ArchitectureDiagram() {
  return (
    <figure className="mt-10">
      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <svg
          viewBox="0 0 920 480"
          role="img"
          aria-labelledby="arch-title arch-desc"
          className="h-auto w-full min-w-[640px]"
        >
          <title id="arch-title">Garzoni system architecture</title>
          <desc id="arch-desc">
            A React 19 web app and an Expo mobile app both depend on a shared TypeScript core, which
            talks to a Django 5.2 DRF API. The API is backed by Postgres with pgvector, Redis with
            Celery, and third-party services: OpenAI, RevenueCat and Plaid.
          </desc>

          {EDGES.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="var(--hairline-strong)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}

          {NODES.map((n) => (
            <g key={n.title}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx="12"
                fill="var(--surface)"
                stroke={n.accent ? "var(--accent-line)" : "var(--hairline-strong)"}
                strokeWidth="1.5"
              />
              <text
                x={n.x + n.w / 2}
                y={n.y + 28}
                textAnchor="middle"
                fill={n.accent ? "var(--accent)" : "var(--text)"}
                style={{ fontFamily: "var(--font-mono)", fontSize: 15 }}
              >
                {n.title}
              </text>
              <text
                x={n.x + n.w / 2}
                y={n.y + 50}
                textAnchor="middle"
                fill="var(--faint)"
                style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
              >
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-4 text-xs leading-relaxed text-faint">
        One repository, one set of types. Both clients depend on the same core, so an API change
        fails at compile time in every consumer rather than at runtime on someone's phone.
      </figcaption>
    </figure>
  );
}
