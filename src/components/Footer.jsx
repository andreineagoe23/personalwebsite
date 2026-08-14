import { profile } from "../data/profile";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs text-faint">
          © {year} {profile.name} · {profile.location}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            className="inline-flex min-h-11 items-center font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="inline-flex min-h-11 items-center font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="inline-flex min-h-11 items-center font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
            href={`mailto:${profile.links.email}`}
          >
            Email
          </a>
          <a
            className="inline-flex min-h-11 items-center font-mono text-xs text-faint transition-colors duration-200 hover:text-accent"
            href="#top"
          >
            ↑ Top
          </a>
        </div>
      </div>
    </footer>
  );
}
