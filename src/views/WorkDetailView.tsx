import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/primitives/Icon";
import { Section } from "@/components/primitives/Section";
import type { Project } from "@/types";

interface WorkDetailViewProps {
  project: Project;
}

/** /work/[slug] — a single project case study. */
export function WorkDetailView({ project }: WorkDetailViewProps) {
  return (
    <Section eyebrow={project.year} title={project.title} description={project.tagline}>
      <div className="flex flex-col gap-12">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-4">
            <p className="text-body-lg text-muted-foreground">{project.summary}</p>
            {project.description?.map((paragraph) => (
              <p key={paragraph} className="text-body text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-border p-6">
            <div className="flex flex-col gap-1">
              <span className="text-eyebrow text-muted-foreground uppercase">Role</span>
              <span className="text-body">{project.role.join(", ")}</span>
            </div>
            {project.liveUrl ? (
              <Button href={project.liveUrl} external variant="secondary">
                Visit site
                <ArrowUpRightIcon size={16} />
              </Button>
            ) : null}
          </div>
        </div>
        <div>
          <Button href="/work" variant="ghost">
            All work
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </div>
    </Section>
  );
}
