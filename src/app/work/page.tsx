import type { Metadata } from "next";
import { WorkView } from "@/views/WorkView";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects designed and built by Subodh Pokhrel.",
};

export default function WorkPage() {
  return <WorkView />;
}
