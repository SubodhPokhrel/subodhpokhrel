import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/about", "/work", "/contact"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const work = projects.map((project) => ({
    url: `${base}/work/${project.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...work];
}
