import { ArrowUpRightIcon, MailIcon, QrCodeIcon } from "@/components/primitives/Icon";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";

/** Email + social links (WeChat shown as a QR cue, no web deep-link). */
export function Socials() {
  return (
    <div className="flex flex-col gap-6">
      <a
        href={`mailto:${profile.email}`}
        className="hover:text-aurora inline-flex items-center gap-2 text-foreground"
      >
        <MailIcon size={18} />
        {profile.email}
      </a>
      <div className="flex flex-col gap-3">
        <p className="text-eyebrow text-muted-foreground uppercase">Elsewhere</p>
        <ul className="flex flex-col gap-3">
          {socials.map((social) => (
            <li key={social.id}>
              {social.kind === "qr" ? (
                <span className="inline-flex items-center gap-2 text-body text-muted-foreground">
                  <QrCodeIcon size={16} />
                  {social.label} — {social.handle}
                </span>
              ) : (
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-body text-muted-foreground hover:text-foreground"
                >
                  {social.label}
                  {social.handle ? (
                    <span className="text-muted-foreground/60">{social.handle}</span>
                  ) : null}
                  <ArrowUpRightIcon size={14} />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
