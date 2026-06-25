import type { Metadata } from "next";
import { StorybookView } from "@/views/StorybookView";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

export default function StorybookPage() {
  return <StorybookView />;
}
