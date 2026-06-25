import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/primitives/Icon";
import { Container } from "@/components/primitives/Container";
import { Logo } from "@/components/primitives/Logo";
import { profile } from "@/content/profile";
import { primaryNav } from "@/content/navigation";
import { socials } from "@/content/socials";

/** Minimal footer — identity, slim navigation, and a quiet legal line. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-12 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-caption text-muted-foreground">{profile.shortBio}</p>
          </div>
          <div className="flex gap-16">
            <nav className="flex flex-col gap-3" aria-label="Footer">
              <span className="text-eyebrow text-muted-foreground uppercase">Site</span>
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-caption text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <span className="text-eyebrow text-muted-foreground uppercase">Connect</span>
              {socials
                .filter((social) => social.kind === "link")
                .map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-caption text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {social.label}
                    <ArrowUpRightIcon size={13} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted-foreground/70">
            © {profile.name}. All rights reserved.
          </p>
          <p className="text-caption text-muted-foreground/70">{profile.location}</p>
        </div>
      </Container>
    </footer>
  );
}
