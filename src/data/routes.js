/**
 * Route table shared by the client router and the post-build prerender script,
 * so a new page cannot exist in the app without also getting a real HTML file
 * and its own metadata.
 *
 * Plain data only — scripts/prerender-routes.mjs imports this in Node.
 */
export const SITE_URL = "https://andreineagoe23.github.io/personalwebsite";

export const routes = [
  {
    id: "home",
    path: "/",
    title: "Andrei Neagoe — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer working across AWS infrastructure, Python back-ends and React front-ends. Serverless services and Terraform at Framestore; sole engineer behind Garzoni, an AI financial learning platform on web, iOS and Android.",
  },
  {
    id: "garzoni",
    path: "/work/garzoni",
    title: "Garzoni — Case Study | Andrei Neagoe",
    description:
      "How I designed, built and shipped Garzoni solo: a pnpm monorepo spanning a Django/DRF API, a React 19 web app and an Expo mobile app, with an OpenAI-backed tutor, cross-platform billing and a production pipeline.",
  },
];

export const notFound = {
  id: "not-found",
  title: "Page not found — Andrei Neagoe",
  description: "That page does not exist.",
};

export const routeByPath = (path) => routes.find((r) => r.path === path);
