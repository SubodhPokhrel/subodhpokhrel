import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { WorkGrid } from "@/components/sections/WorkGrid";

/** The landing page. */
export function HomeView() {
  return (
    <>
      <Hero />
      <About />
      <WorkGrid />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
