export const garzoni = {
  id: "garzoni",
  name: "Garzoni",
  tagline: "AI-powered financial learning platform",
  role: "Founder & sole engineer",
  period: "2024 — Present",
  status: "Live on web, iOS and Android",

  lede: "Garzoni teaches personal finance the way a language app teaches vocabulary — ten-minute lessons, daily streaks, spaced repetition, and AI tools that let you rehearse a money decision before you make it. I designed, built, shipped and now run all of it: the API, the web app, the mobile app, the billing, the infrastructure and the content pipeline.",

  facts: [
    { key: "Role", value: "Founder & sole engineer" },
    { key: "Duration", value: "21 months, ongoing" },
    { key: "Surfaces", value: "Web, iOS, Android" },
    { key: "Scale", value: "~250k lines · 900+ commits" },
    { key: "Backend", value: "Django 5.2 · DRF · Celery" },
    { key: "Clients", value: "React 19 · Expo" },
  ],

  links: [
    { label: "garzoni.app", href: "https://www.garzoni.app", primary: true },
    { label: "App Store", href: "https://apps.apple.com/app/id6761790801" },
    {
      label: "Google Play",
      href: "https://play.google.com/store/apps/details?id=app.garzoni.mobile",
    },
  ],

  /** The framing: what made this hard, before any technology is mentioned. */
  constraints: [
    {
      title: "One engineer, three surfaces",
      body: "Web, iOS and Android had to stay in lockstep with no team to divide them between. Anything duplicated across clients was going to drift, so the architecture had to make sharing the default rather than a discipline.",
    },
    {
      title: "Real money, three payment rails",
      body: "Subscriptions sell through Stripe on web, StoreKit on iOS and Play Billing on Android. A user who subscribes on their phone must be entitled on the web the moment they log in — from three systems that disagree about what a subscription even is.",
    },
    {
      title: "LLM cost scales with users, not revenue",
      body: "An AI tutor, voice tutoring, vision-based receipt parsing and a daily re-ranked learning path all bill per call. On a free tier, naive implementations lose money linearly with signups.",
    },
    {
      title: "Store review is a hard gate",
      body: "Apple and Google review every release. Financial-education content invites extra scrutiny, so the compliance position — education, not advice; no bank execution; no custody — had to be designed in, not bolted on.",
    },
  ],

  /** The core of the page: decisions with their trade-offs stated honestly. */
  decisions: [
    {
      title: "A pnpm monorepo with a shared TypeScript core",
      problem:
        "Two clients on different runtimes (browser and React Native) needed identical domain types, API contracts, validation and design tokens.",
      choice:
        "One repository: a Django API, a React 19 web app, an Expo mobile app, and a TypeScript core package that both clients depend on. Types, API client, formatting and design tokens are defined once and consumed everywhere.",
      tradeoff:
        "Builds and CI are heavier than three small repos, and a careless change in core can break both clients at once. In exchange, an API change surfaces as a type error in every consumer at compile time instead of as a bug report from a phone.",
    },
    {
      title: "Function calling instead of free-form generation",
      problem:
        "A tutor that answers in prose is impossible to verify, easy to hallucinate with, and cannot drive the app's own UI.",
      choice:
        "The tutor is built on OpenAI function calling. The model chooses from a fixed set of tools — look up a lesson, run a budget calculation, open a simulator — and the app executes them. Retrieval runs over the curriculum itself with pgvector, so answers cite material that actually exists.",
      tradeoff:
        "It constrains what the tutor can say, and every new capability means defining a new tool rather than editing a prompt. That constraint is the point: the model routes, the application computes, and any number it quotes came from real code.",
    },
    {
      title: "Hash short-circuiting the daily re-rank",
      problem:
        "The learning path is re-ranked daily by an LLM. Most users' inputs do not change between days, so most of those calls would pay to produce a result identical to yesterday's.",
      choice:
        "The inputs that determine ranking are hashed. If the hash matches the last run, the previous ranking is reused and no model call is made.",
      tradeoff:
        "Ranking can lag a change until the next cycle, and the hash has to cover every genuine input or results go stale. The cost curve flattens against inactive users, which is most of any free tier.",
    },
    {
      title: "RevenueCat as the single entitlement authority",
      problem:
        "Stripe, App Store and Play each model subscriptions differently. Reconciling three webhook formats, three renewal semantics and three refund flows into one answer to 'what is this user entitled to?' is its own product.",
      choice:
        "All three rails feed RevenueCat, and the backend asks one question — what is this user entitled to — then enforces per-tier quotas and paywalls behind that single answer.",
      tradeoff:
        "A third party sits on the revenue path and takes a cut. Worth it: cross-platform entitlement is a notorious source of silent, revenue-losing bugs, and it is not where a solo engineer should be spending their originality.",
    },
    {
      title: "Health-gated deploys and automated backups",
      problem:
        "With no one else on call, a bad deploy at the wrong moment is an outage that lasts until I happen to look at my phone.",
      choice:
        "Deploys are gated on health checks, backups run automatically, Sentry reports errors, and CI enforces pinned dependencies, vulnerability auditing and secret scanning before anything ships.",
      tradeoff:
        "Slower releases and occasional false-positive rollbacks. Preferable to discovering a migration failure from a user's review on the App Store.",
    },
  ],

  /** Delivery surface — the unglamorous half that makes it a product. */
  platform: [
    {
      title: "Engagement",
      items: [
        "Streaks, daily and weekly missions",
        "Leagues and leaderboards",
        "Spaced-repetition review",
        "XP and progression",
      ],
    },
    {
      title: "Identity & safety",
      items: [
        "JWT auth, Google and Apple sign-in",
        "Brute-force protection",
        "reCAPTCHA Enterprise",
        "Sentry error tracking",
      ],
    },
    {
      title: "Money features",
      items: [
        "Plaid open-banking budgeting",
        "Statement import",
        "Receipt analysis via GPT-4o vision",
        "Per-tier quotas and paywalls",
      ],
    },
    {
      title: "Reach",
      items: [
        "EN/RO localisation",
        "Shared design tokens across web and mobile",
        "Cloudflare edge caching",
        "20+ backend test suites",
      ],
    },
  ],

  /** What I would change — the section that separates a build log from a case study. */
  retrospective: [
    "The monorepo earned itself back within weeks, but I set it up after the second client already existed. Doing that first would have saved a painful migration of duplicated types.",
    "I under-invested in the content pipeline early. Lessons started as code, and moving them to data later cost more than authoring them as data from the start would have.",
    "Cost controls like hash short-circuiting were retrofitted once the bill made them obvious. On the next AI feature I would budget the per-call cost during design, alongside latency.",
  ],
};
