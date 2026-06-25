import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";

/** /about — the fuller story. */
export function AboutView() {
  return (
    <>
      <About />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
