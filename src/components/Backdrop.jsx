/**
 * The page's only decoration: a blueprint grid and a soft accent bloom over the
 * top of the document. Absolute rather than fixed — a fixed backdrop parks the
 * same vignette on screen at every scroll position, which reads as a smudge.
 */
export function Backdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1600px] overflow-hidden"
      aria-hidden="true"
    >
      <div className="backdrop-grid absolute inset-0" />
      <div
        className="absolute -top-48 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
        style={{ background: "var(--accent-soft)" }}
      />
    </div>
  );
}
