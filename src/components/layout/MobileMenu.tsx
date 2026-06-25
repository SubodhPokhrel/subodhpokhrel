"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/primitives/Icon";
import { Logo } from "@/components/primitives/Logo";
import { primaryNav } from "@/content/navigation";
import { socials } from "@/content/socials";
import { useLockBodyScroll } from "@/hooks";

const PANEL_ID = "mobile-menu-panel";

/** Mobile slide-over navigation — a proper modal dialog (focus trap, Escape, route-close). */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);

  // Close on any navigation so the scroll lock is always released.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: move focus in, trap Tab, close on Escape, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        className="grid size-10 place-items-center rounded-full text-foreground"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={PANEL_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full text-foreground"
            >
              <CloseIcon />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-6 pt-8" aria-label="Mobile">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-h2 text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-wrap gap-4 px-6 py-8">
            {socials
              .filter((social) => social.kind === "link")
              .map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-muted-foreground hover:text-foreground"
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
