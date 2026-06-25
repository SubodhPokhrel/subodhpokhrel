import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "design",
    title: "Design",
    skills: [
      "UI/UX Design",
      "Graphic Design",
      "Design Systems",
      "Branding",
      "Prototyping",
      "Figma",
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "HTML & CSS",
      "Motion",
    ],
  },
  {
    id: "backend",
    title: "Backend & CMS",
    skills: ["Python", "Node.js", "WordPress", "REST APIs"],
  },
  {
    id: "devops",
    title: "Tooling & DevOps",
    skills: ["Git", "Docker", "CI/CD", "Vercel", "Linux"],
  },
];
