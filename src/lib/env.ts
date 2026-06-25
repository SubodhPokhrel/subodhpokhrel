import { z } from "zod";

/**
 * Server-side environment access. Import this ONLY from server code
 * (route handlers, server components) — never from client components.
 * All email vars are optional so the site builds & runs without secrets;
 * the contact route degrades to a mailto fallback when unconfigured.
 */
const schema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.email().optional(),
  CONTACT_FROM_EMAIL: z.email().default("onboarding@resend.dev"),
  NEXT_PUBLIC_SITE_URL: z.url().default("https://subodhpokhrel.com"),
});

export const env = schema.parse(process.env);

/** True only when we can actually deliver mail via Resend. */
export const isEmailConfigured = Boolean(env.RESEND_API_KEY && env.CONTACT_TO_EMAIL);
