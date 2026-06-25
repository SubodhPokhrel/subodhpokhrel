import Link from "next/link";
import { Tilt } from "@/components/motion";
import { Badge } from "@/components/primitives/Badge";
import { ArrowUpRightIcon } from "@/components/primitives/Icon";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

/** A single project card with hover-tilt; title links to the case study. */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Tilt className="h-full">
      <article className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Link href={`/work/${project.slug}`} className="hover:text-aurora text-title">
              {project.title}
            </Link>
            <p className="text-caption text-muted-foreground">{project.year}</p>
          </div>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="text-muted-foreground transition-colors group-hover:text-foreground"
            >
              <ArrowUpRightIcon />
            </a>
          ) : null}
        </div>
        <p className="flex-1 text-body text-muted-foreground">{project.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </article>
    </Tilt>
  );
}
