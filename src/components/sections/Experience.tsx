import { Reveal } from "@/components/motion";
import { Section } from "@/components/primitives/Section";
import { experience } from "@/content/experience";

/** Experience timeline. */
export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked.">
      <div className="flex flex-col gap-12">
        {experience.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <div className="grid gap-4 border-t border-border pt-8 md:grid-cols-[1fr_2fr]">
              <div className="flex flex-col gap-1">
                <p className="text-title">{item.org}</p>
                <p className="text-caption text-muted-foreground">{item.period}</p>
                {item.location ? (
                  <p className="text-caption text-muted-foreground">{item.location}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-body-lg">{item.role}</p>
                <p className="text-body text-muted-foreground">{item.summary}</p>
                {item.highlights ? (
                  <ul className="flex flex-col gap-2">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="text-body text-muted-foreground">
                        — {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
