export function Tag({ children, tone = "default" }) {
  const tones = {
    default: "border-hairline text-muted",
    accent: "border-accent-line text-accent",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-xs leading-none tracking-tight whitespace-nowrap ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function TagRow({ items, tone }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
