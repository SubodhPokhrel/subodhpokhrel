import { Resend } from "resend";
import { profile } from "@/content/profile";
import { env, isEmailConfigured } from "./env";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

/** Send a contact-form submission via Resend. Throws when email is unconfigured. */
export async function sendContactEmail(data: ContactPayload): Promise<void> {
  if (!isEmailConfigured || !env.RESEND_API_KEY) {
    throw new Error("Email is not configured");
  }
  const resend = new Resend(env.RESEND_API_KEY);
  const to = env.CONTACT_TO_EMAIL ?? profile.email;
  const { error } = await resend.emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to,
    replyTo: data.email,
    subject: `Portfolio enquiry from ${data.name}`,
    text: `${data.message}\n\n— ${data.name} <${data.email}>`,
  });
  if (error) throw new Error(error.message);
}
