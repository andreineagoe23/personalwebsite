import { Section } from "../components/Section";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";

export function Work() {
  return (
    <Section
      id="work"
      index="01 / Work"
      title="Products I own end to end."
      lede="Two things I built and still run — one a shipped consumer product on three platforms, one a studio site. Both are live, and both are mine from schema to pixel."
    >
      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
