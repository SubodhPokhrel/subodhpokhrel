import type { Project } from "@/types";

/**
 * Real shipped sites with PLACEHOLDER case-study copy (derived from the
 * project names). Replace summaries and add cover/gallery images in /public.
 */
export const projects: Project[] = [
  {
    slug: "spark-os",
    title: "Spark OS",
    tagline: "Brand & product site for a software studio",
    year: "2025",
    summary:
      "Marketing and product experience for SparkOS — a clean, fast, conversion-focused presence.",
    role: ["Design", "Frontend"],
    tech: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://spark-os.com",
    featured: true,
    placeholder: true,
  },
  {
    slug: "cellzen",
    title: "Cellzen",
    tagline: "Storefront for mobiles & accessories",
    year: "2024",
    summary: "Product catalog and storefront with a crisp, modern interface.",
    role: ["Design", "Frontend"],
    tech: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://cellzen.com",
    featured: true,
    placeholder: true,
  },
  {
    slug: "ansportia",
    title: "Ansportia",
    tagline: "Sports brand digital experience",
    year: "2025",
    summary: "Energetic, responsive brand site for a sports venture.",
    role: ["Design", "Frontend"],
    tech: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://ansportia.com",
    featured: true,
    placeholder: true,
  },
  {
    slug: "pokhrel-flex-printing",
    title: "Pokhrel Flex Printing",
    tagline: "Services site for a printing studio",
    year: "2024",
    summary: "Service showcase and enquiry site for a flex-printing business.",
    role: ["Design", "Frontend", "WordPress"],
    tech: ["WordPress", "HTML", "CSS"],
    liveUrl: "https://pokhrelflexprinting.com",
    placeholder: true,
  },
  {
    slug: "yogini-arts",
    title: "Yogini Arts",
    tagline: "Portfolio for an arts & crafts studio",
    year: "2024",
    summary: "Visual-first portfolio highlighting handmade work and commissions.",
    role: ["Design", "Frontend"],
    tech: ["WordPress", "HTML", "CSS"],
    liveUrl: "https://yoginiarts.com",
    placeholder: true,
  },
];

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
