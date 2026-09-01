export const experience = [
  {
    id: "framestore",
    company: "Framestore",
    role: "Associate Software Developer",
    period: "Jul 2025 — Present",
    start: "2025-07",
    location: "London",
    summary:
      "My team owns the internal applications production runs on — planning, video review, file transfer, task import — so the work spans the whole surface: a new serverless AWS service and the Terraform behind it, the event-driven bus every other application talks through, and the React front-ends people actually sit in front of. Around ten products in a year.",
    highlights: [
      {
        title: "Public Links — serverless back-end",
        body: "Built the service end to end: API Gateway in front of a Step Functions Express chain across five Python Lambdas over RDS Postgres, batch S3 pre-signed URLs, and an ElastiCache layer that cut repeat link loads from 348ms to 21ms. The cache key had to be agreed with the legacy application, which invalidated on a different key — a rename stayed invisible until the TTL expired.",
        tags: ["API Gateway", "Step Functions", "Lambda", "RDS Postgres", "ElastiCache", "S3"],
      },
      {
        title: "Infrastructure as code",
        body: "Provisioned the full stack in Terraform — Lambda, API Gateway, CloudFront, WAF, ElastiCache, VPC, IAM — with per-environment remote state and GitLab CI deployment, including isolated per-developer AWS environments now standard on the team.",
        tags: ["Terraform", "CloudFront", "WAF", "VPC", "IAM", "GitLab CI"],
      },
      {
        title: "Hardening and cold-start work",
        body: "Locked the public endpoint behind AWS WAF and a CloudFront origin lock, then took cold invocations from 100% to 2–3% and average response from 3.3s to 290ms through Lambda memory profiling, an 18MB → 1MB deployment package and a scheduled warmer. A single logging standard across the chain means one query follows a request from edge to response.",
        tags: ["AWS WAF", "CloudFront", "Performance", "Profiling", "Observability"],
      },
      {
        title: "Events Bus",
        body: "Maintained Framestore's messaging platform on RabbitMQ, MongoDB and Ansible: proved with data that long message processing was starving broker heartbeats, moved callbacks onto a thread pool and acknowledged after processing rather than before, added per-service broker authentication, and led the client rollout across 12 downstream applications.",
        tags: ["RabbitMQ", "MongoDB", "Ansible", "Concurrency"],
      },
      {
        title: "Features owned end to end",
        body: "Impersonation sessions in Filestore — permission model, nested session, a permanent indicator in the UI, chained impersonation blocked, a separate audit trail per session, and the support documentation. In Fetch, product features and a back-end refactor: domain-specific exceptions, a monolithic module split per entity, and a health check that checks something.",
        tags: ["Django", "Python", "Auth", "Auditing", "Refactoring"],
      },
      {
        title: "Front-end and real-time",
        body: "Multi-participant remote cursors and canvas annotation over shared video in Framecast using WebRTC and Janus DataChannels, and Flock's React scheduling Gantt — grouping counters, an availability heatmap, and date-windowed fetching so a wide range no longer stalls the grid.",
        tags: ["React", "WebRTC", "Janus", "Canvas"],
      },
    ],
    /**
     * Before/after pairs from the Public Links build. These render as animated
     * deltas rather than plain figures — they are the load-bearing evidence for
     * this role, so they get to occupy space.
     */
    deltas: [
      {
        id: "cache",
        from: 348,
        to: 21,
        unit: "ms",
        decimals: 0,
        label: "Repeat link loads",
        note: "ElastiCache layer in front of RDS Postgres",
        context: "Public Links",
      },
      {
        id: "response",
        from: 3.3,
        to: 0.29,
        unit: "s",
        decimals: 2,
        label: "Average response",
        note: "Memory profiling, a 1MB package and a scheduled warmer",
        context: "Public Links",
      },
      {
        id: "coldstart",
        from: 100,
        to: 3,
        unit: "%",
        decimals: 0,
        label: "Cold invocations",
        note: "From every request paying the start-up cost to almost none",
        context: "Public Links",
      },
    ],
    /**
     * The year reconstructed from closed tickets. The highlights above say what
     * the work was; this says how wide it was — which is the part a list of
     * technologies never manages to convey.
     */
    products: [
      {
        id: "public-links",
        name: "Public Links",
        kind: "New public service",
        period: "Jun — Aug 2026",
        body: "A serverless AWS service replacing the path clients use to view and download their material, taken from a query audit through to observability — and the React UI wired to the real API, loading states included.",
      },
      {
        id: "events-bus",
        name: "Events Bus",
        kind: "Internal messaging",
        period: "May — Jul 2026",
        body: "Heartbeat starvation on long-running tasks, a routing bug on identifiers containing dots, an authentication rework separating native broker users from hashed keys for REST and UI, and alerting into Sentry and Google Chat.",
      },
      {
        id: "legacy",
        name: "Legacy modernisation",
        kind: "Internal services",
        period: "Mar — Jul 2026",
        body: "Python 2 → 3 and 3.8 → 3.9, RPM packaging → Docker and Ansible, CentOS 7 → EL9. Plus a read-only proxy in front of the Jira API — GET only, bodies dropped, cookies isolated, rate limited, tokens masked in logs — and a webhook proof of concept driving an orchestrator workflow.",
      },
      {
        id: "fetch",
        name: "Fetch",
        kind: "Task import for production",
        period: "Jan — Apr 2026",
        body: "Rebranded end to end — code, URLs, logo, log dashboards — then shipped prep imports, department exclusions, template autocompletion and filtered item counters, over a back end split into per-entity modules.",
      },
      {
        id: "filestore",
        name: "Filestore",
        kind: "File storage",
        period: "Nov 2025 — Feb 2026",
        body: "Impersonation sessions built from the permission model up to the audit trail, alongside two repositories consolidated, a database migration, and the staging and production deploys behind them.",
      },
      {
        id: "flock",
        name: "Flock",
        kind: "Resource planning",
        period: "Aug 2025 — Jan 2026",
        body: "A React Gantt UI: counts at every grouping level, a fast toggle for on-hold bookings, an availability heatmap from spike to implementation, and requests chunked by time window.",
      },
      {
        id: "framecast",
        name: "Framecast",
        kind: "Collaborative video review",
        period: "Jul — Sep 2025",
        body: "React over WebRTC and Janus: remote cursors for every participant, annotation on a canvas layer above playing video, group-gated session controls, and favourite rooms kept locally.",
      },
    ],
  },
  {
    id: "brixton-radio",
    company: "Brixton Radio",
    role: "Data Automation Developer",
    period: "Sep 2024 — Mar 2025",
    start: "2024-09",
    location: "London",
    summary:
      "Designed the automated data pipeline behind a live broadcast schedule and its social analytics.",
    highlights: [
      {
        title: "Automated data extraction",
        body: "Reduced manual data processing by 40% by designing an API-driven extraction system handling high-volume social media and analytics data.",
        tags: ["Python", "REST APIs", "Automation"],
      },
      {
        title: "Scheduling integration",
        body: "Integrated Google Calendar and Forms to streamline management of 50+ weekly radio shows, improving metadata accuracy by 30% in a fast-moving broadcast environment.",
        tags: ["Google APIs", "Ops tooling"],
      },
    ],
    metrics: [
      { value: "40%", label: "less manual data processing" },
      { value: "50+", label: "weekly shows managed" },
      { value: "30%", label: "better metadata accuracy" },
    ],
  },
];
