import { Reveal } from "@/components/motion";
import { Section } from "@/components/primitives/Section";
import { profile } from "@/content/profile";
import { ContactForm } from "./ContactForm";
import { Socials } from "./Socials";

/** Contact section — form alongside direct links. */
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something."
      description={profile.availability}
    >
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>
        <Reveal delay={0.1}>
          <Socials />
        </Reveal>
      </div>
    </Section>
  );
}
