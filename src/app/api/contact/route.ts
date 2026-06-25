import { z } from "zod";
import { sendContactEmail } from "@/lib/email";
import { isEmailConfigured } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  // Reject control characters so the name can't break the email subject line.
  name: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[^\r\n]+$/, "Name must be a single line"),
  email: z.email(),
  message: z.string().min(10).max(5000),
});

/** Best-effort client IP from the trusted edge — never the spoofable leftmost XFF entry. */
function clientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  // The rightmost XFF entry is the one appended by our own proxy/platform.
  const last = request.headers.get("x-forwarded-for")?.split(",").pop()?.trim();
  return last || "unknown";
}

export async function POST(request: Request) {
  if (!checkRateLimit(clientIp(request))) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  // No email provider configured — tell the client to use the mailto fallback.
  if (!isEmailConfigured) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    await sendContactEmail(parsed.data);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
