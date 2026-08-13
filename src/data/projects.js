export const projects = [
  {
    id: "garzoni",
    name: "Garzoni",
    tagline: "AI-powered financial learning platform",
    role: "Founder & sole engineer",
    period: "2024 — Present",
    status: "Live on web, iOS and Android",
    summary:
      "A personal finance education platform built the way a language app is built: ten-minute lessons, daily streaks, spaced repetition, and AI tools that let you rehearse the decision before you make it. I built and shipped the entire product solo — API, web app, mobile app, billing, infrastructure and content pipeline.",
    metrics: [
      { value: "~250k", label: "lines across the monorepo" },
      { value: "900+", label: "commits over 21 months" },
      { value: "3", label: "shipped platforms" },
      { value: "20+", label: "backend test suites" },
    ],
    pillars: [
      {
        title: "Architecture",
        body: "A pnpm monorepo spanning a Django 5.2 / DRF / Celery API, a React 19 web app and an Expo mobile app sharing a single TypeScript core — one set of types, one set of design tokens, three surfaces.",
        tags: ["Django 5.2", "DRF", "Celery", "React 19", "Expo", "TypeScript", "pnpm"],
      },
      {
        title: "AI layer",
        body: "An AI tutor built on OpenAI function calling with RAG over the curriculum (pgvector), voice tutoring through Whisper and TTS, receipt analysis via GPT-4o vision, and a learning path re-ranked daily by an LLM — hash-short-circuited so unchanged inputs never pay for a second inference.",
        tags: ["OpenAI", "Function calling", "RAG", "pgvector", "Whisper", "GPT-4o vision"],
      },
      {
        title: "Commercial layer",
        body: "Three-tier subscriptions with cross-platform entitlements through RevenueCat — Stripe Web Billing, App Store and Play IAP reconciled into one source of truth — plus Plaid open-banking budgeting with statement import, and per-tier quotas and paywalls.",
        tags: ["RevenueCat", "Stripe", "App Store IAP", "Play IAP", "Plaid"],
      },
      {
        title: "Platform",
        body: "Gamification (streaks, daily and weekly missions, leagues, leaderboards, spaced-repetition review), JWT auth with Google and Apple sign-in, brute-force protection, reCAPTCHA Enterprise, Sentry, and Celery scheduled jobs behind 20+ backend test suites.",
        tags: ["JWT", "OAuth", "reCAPTCHA Enterprise", "Sentry", "Celery"],
      },
      {
        title: "Production",
        body: "Run end to end: Docker, Railway, Vercel and EAS store releases, Cloudflare edge caching, health-gated deploys and automated backups, with CI enforcing pinned dependencies, vulnerability auditing and secret scanning — plus EN/RO localisation across web and mobile.",
        tags: ["Docker", "Railway", "Vercel", "EAS", "Cloudflare", "CI/CD"],
      },
    ],
    caseStudy: "/work/garzoni",
    links: [
      { label: "garzoni.app", href: "https://www.garzoni.app", primary: true },
      { label: "App Store", href: "https://apps.apple.com/app/id6761790801" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=app.garzoni.mobile",
      },
    ],
  },
  {
    id: "monevo",
    name: "Monevo",
    tagline: "Design and build studio site",
    role: "Design & build",
    period: "2025 — Present",
    status: "Live",
    summary:
      "A studio site for the client work I take on outside Framestore. Built as a single long-form page with a WebGL fluid-simulation hero rendered on a real-time canvas, motion tuned to stay under a frame budget, and typography doing most of the work.",
    metrics: [
      { value: "WebGL", label: "real-time fluid sim hero" },
      { value: "4", label: "live client projects shipped" },
    ],
    pillars: [
      {
        title: "Front-end",
        body: "React and Vite with Motion for choreography, a hand-rolled OGL fluid simulation behind the hero, and a token-driven light/dark system that flips without a flash.",
        tags: ["React", "Vite", "Motion", "OGL", "Tailwind"],
      },
      {
        title: "Delivery",
        body: "Hand-built rather than page-built: semantic markup, structured data and metadata, and Core Web Vitals treated as an acceptance criterion rather than a post-launch cleanup.",
        tags: ["SEO", "Core Web Vitals", "Accessibility"],
      },
    ],
    links: [{ label: "monevo.tech", href: "https://monevo.tech", primary: true }],
  },
];
