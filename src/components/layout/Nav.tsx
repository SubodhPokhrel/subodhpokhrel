"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/navigation";
import { cn } from "@/lib/cn";

interface NavProps {
  className?: string;
}

/** Desktop primary navigation with active-route state. */
export function Nav({ className }: NavProps) {
  const pathname = usePathname();
  return (
    <nav className={cn("flex items-center gap-8", className)} aria-label="Primary">
      {primaryNav.map((item) => {
        const active =
          pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-body transition-colors",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
