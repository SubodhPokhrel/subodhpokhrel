import { Reveal } from "@/components/motion";
import { Button } from "@/components/primitives/Button";
import { ArrowRightIcon } from "@/components/primitives/Icon";
import { Section } from "@/components/primitives/Section";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

/** Featured-work grid with a link to the full work index. */
export function WorkGrid() {
  return (
    <Section id="work" eyebrow="Selected work" title="Things I've built.">
      <div className="flex flex-col gap-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <div>
          <Button href="/work" variant="secondary">
            View all work
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </div>
    </Section>
  );
}
