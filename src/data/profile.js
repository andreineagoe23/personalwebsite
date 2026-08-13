export const profile = {
  name: "Andrei Neagoe",
  role: "Full-Stack Software Engineer",
  focus: ["Cloud & Infrastructure", "Python Back-ends", "React Front-ends"],
  location: "London, UK",
  status: {
    label: "Open to interesting problems",
    tone: "open",
  },
  // Two sentences, load-bearing. The rest of the page is the evidence.
  lede: "I build the infrastructure and the interface on top of it. At Framestore I design and ship serverless AWS services and the Terraform that provisions them, and maintain the event-driven messaging platform connecting the company's internal applications.",
  sublede:
    "Alongside that I am the sole engineer behind Garzoni, an AI-powered financial learning platform live on web, iOS and Android. I care about the numbers that follow a decision — latency, cost, reliability.",
  links: {
    email: "neagoeandrei23@gmail.com",
    github: "https://github.com/andreineagoe23",
    linkedin: "https://linkedin.com/in/andrei-neagoe-29a937256",
    garzoni: "https://www.garzoni.app",
    monevo: "https://monevo.tech",
  },
};

/**
 * The three numbers that open the page. Each one is a before/after from
 * production work, not a benchmark.
 */
export const headlineMetrics = [
  {
    id: "cache",
    from: 0.8,
    to: 0.16,
    unit: "s",
    decimals: 2,
    label: "Repeat link loads",
    note: "ElastiCache layer in front of RDS Postgres",
    context: "Framestore · Public Links",
  },
  {
    id: "coldstart",
    from: 19,
    to: 5,
    unit: "s",
    decimals: 0,
    label: "Lambda cold start",
    note: "Memory profiling and a scheduled warmer",
    context: "Framestore · Public Links",
  },
  {
    id: "package",
    from: 18,
    to: 1,
    unit: "MB",
    decimals: 0,
    label: "Deployment package",
    note: "Dependency pruning and layer restructuring",
    context: "Framestore · Public Links",
  },
];

export const navSections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];
