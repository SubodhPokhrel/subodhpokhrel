/** Shared domain types. Content in `src/content/*` is typed against these. */

export type Theme = "light" | "dark";

export interface NavItem {
  label: string;
  href: string;
}

export type SocialKind = "link" | "qr";

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  handle?: string;
  kind: SocialKind;
  /** For `kind: "qr"` (e.g. WeChat) — path to a QR image in /public. */
  qrSrc?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  location?: string;
  summary: string;
  highlights?: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  summary: string;
  description?: string[];
  role: string[];
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  cover?: string;
  gallery?: string[];
  featured?: boolean;
  /** Marks content that still needs real copy/assets. */
  placeholder?: boolean;
}

export interface Profile {
  name: string;
  firstName: string;
  roleline: string;
  location: string;
  company?: string;
  email: string;
  shortBio: string;
  longBio: string[];
  availability?: string;
  resumeUrl?: string;
}
