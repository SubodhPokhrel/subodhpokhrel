"use client";

import { MoonIcon, SunIcon } from "@/components/primitives/Icon";
import { useMounted, useTheme } from "@/hooks";
import { cn } from "@/lib/cn";

interface ThemeToggleProps {
  className?: string;
}

/** Toggles light/dark; persists to localStorage via useTheme. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const mounted = useMounted();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "glass-button grid size-10 place-items-center rounded-full text-muted-foreground transition hover:text-foreground",
        className,
      )}
    >
      {mounted ? (
        isDark ? (
          <SunIcon size={18} />
        ) : (
          <MoonIcon size={18} />
        )
      ) : (
        <span className="size-[18px]" />
      )}
    </button>
  );
}
