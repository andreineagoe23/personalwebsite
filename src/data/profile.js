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

// Lives in public/, so it is resolved against the deploy base rather than "/".
export const cvUrl = `${import.meta.env.BASE_URL}AndreiNeagoe-CV.pdf`;
export const cvFilename = "AndreiNeagoe-CV.pdf";

export const navSections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];
