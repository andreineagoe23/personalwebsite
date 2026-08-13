export const experience = [
  {
    id: "framestore",
    company: "Framestore",
    role: "Software Developer",
    period: "Jul 2025 — Present",
    start: "2025-07",
    location: "London",
    summary:
      "Serverless AWS services and the Terraform behind them, plus the event-driven messaging platform that connects Framestore's internal applications.",
    highlights: [
      {
        title: "Public Links — serverless back-end",
        body: "API Gateway, Step Functions and five Python Lambdas over RDS Postgres, with S3 pre-signed URLs and an ElastiCache layer that cut repeat link loads from 0.8s to 0.16s.",
        tags: ["API Gateway", "Step Functions", "Lambda", "RDS Postgres", "ElastiCache", "S3"],
      },
      {
        title: "Infrastructure as code",
        body: "Provisioned the full stack in Terraform — Lambda, API Gateway, CloudFront, WAF, ElastiCache, VPC, IAM — with per-environment remote state and GitLab CI deployment, including isolated per-developer AWS environments now used across the team.",
        tags: ["Terraform", "CloudFront", "WAF", "VPC", "IAM", "GitLab CI"],
      },
      {
        title: "Hardening and cold-start work",
        body: "Locked the public API behind AWS WAF and a CloudFront origin lock, and cut cold-start latency from ~19s to ~5s through Lambda memory profiling, an 18MB → 1MB deployment package and a scheduled warmer.",
        tags: ["AWS WAF", "CloudFront", "Performance", "Profiling"],
      },
      {
        title: "Events Bus",
        body: "Maintained Framestore's messaging platform on RabbitMQ, MongoDB and Ansible: moved message callbacks onto a thread pool to eliminate heartbeat starvation and connection-drop storms, added per-service broker authentication, and led the client rollout across 12 downstream applications.",
        tags: ["RabbitMQ", "MongoDB", "Ansible", "Concurrency"],
      },
      {
        title: "Front-end and real-time",
        body: "Enhanced Flock's React scheduling UI and built collaborative annotation in Framecast using WebRTC, Janus DataChannels and custom canvas layers, alongside support work and sprint planning in an Agile team.",
        tags: ["React", "WebRTC", "Janus", "Canvas"],
      },
    ],
    metrics: [
      { value: "12", label: "apps migrated onto the new bus client" },
      { value: "5×", label: "faster repeat link loads" },
      { value: "18→1", label: "MB deployment package" },
    ],
  },
  {
    id: "brixton-radio",
    company: "Brixton Radio",
    role: "Project Manager — Data Automation",
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
