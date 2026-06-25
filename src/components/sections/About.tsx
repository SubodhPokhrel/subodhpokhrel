import { Reveal } from "@/components/motion";
import { Panel } from "@/components/primitives/Panel";
import { Section } from "@/components/primitives/Section";
import { AuroraGlow } from "@/components/visual";
import { profile } from "@/content/profile";

/** About section — narrative bio plus a "currently" panel. */
export function About() {
  return (
    <Section id="about" eyebrow="About" title="A designer who ships.">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          {profile.longBio.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p className="text-body-lg text-muted-foreground">{paragraph}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="relative isolate overflow-hidden rounded-2xl">
            <AuroraGlow />
            <Panel className="relative flex flex-col gap-4 p-6">
              <p className="text-eyebrow text-muted-foreground uppercase">Currently</p>
              <p className="text-title">{profile.company}</p>
              <p className="text-body text-muted-foreground">{profile.availability}</p>
            </Panel>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
