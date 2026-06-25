import { Reveal } from "@/components/motion";
import { Badge } from "@/components/primitives/Badge";
import { Section } from "@/components/primitives/Section";
import { skillGroups } from "@/content/skills";

/** Capabilities grouped by discipline. */
export function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="What I work with.">
      <div className="grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.05}>
            <div className="flex flex-col gap-4 rounded-xl border border-border p-6">
              <h3 className="text-title">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
