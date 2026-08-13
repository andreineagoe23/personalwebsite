import { Link } from "../lib/router";
import { Reveal } from "../components/Reveal";

export function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-32 pb-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-tight">
            No route
            <br />
            to that page<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
            The address you followed does not resolve to anything here. It may have moved, or never
            existed.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ground transition-opacity duration-200 hover:opacity-90"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              >
                ←
              </span>
              Back to the portfolio
            </Link>
            <Link
              to="/work/garzoni"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-2.5 text-sm text-muted transition-colors duration-200 hover:border-accent-line hover:text-accent"
            >
              Garzoni case study
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
