import type { Metadata } from "next";
import { ContactView } from "@/views/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Subodh Pokhrel.",
};

export default function ContactPage() {
  return <ContactView />;
}
