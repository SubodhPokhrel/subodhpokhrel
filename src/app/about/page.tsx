import type { Metadata } from "next";
import { AboutView } from "@/views/AboutView";

export const metadata: Metadata = {
  title: "About",
  description: "About Subodh Pokhrel — designer and developer.",
};

export default function AboutPage() {
  return <AboutView />;
}
