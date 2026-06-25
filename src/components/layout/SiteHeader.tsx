"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Logo } from "@/components/primitives/Logo";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { Nav } from "./Nav";
import { ThemeToggle } from "./ThemeToggle";

/** Slim sticky header — transparent at the top, frosted and condensed on scroll. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300 ease-out",
        scrolled
          ? "border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ease-out sm:px-8",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <Logo />
        <div className="flex items-center gap-6">
          <Nav className="hidden md:flex" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button href="/contact" size="sm" variant="secondary" className="hidden sm:inline-flex">
              Get in touch
            </Button>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
