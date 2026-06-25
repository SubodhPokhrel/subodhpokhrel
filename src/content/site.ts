import { profile } from "./profile";

/** Site-level constants reused by SEO (metadata, sitemap, robots). */
export const site = {
  name: "Subodh Pokhrel",
  title: "Subodh Pokhrel — Designer & Developer",
  description: profile.shortBio,
  url: "https://subodhpokhrel.com",
  ogImage: "/og.png",
  locale: "en",
} as const;
