import { Reveal } from "@/components/motion";
import { Section } from "@/components/primitives/Section";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/content/projects";

/** /work — every project. */
export function WorkView() {
  return (
    <Section
      eyebrow="Work"
      title="Selected projects."
      description="A few things I've designed and built end to end."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
