"use client";

import { useCallback, useEffect, useState } from "react";
import type { Theme } from "@/types";

interface UseTheme {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
}

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/**
 * Read/update the theme on `<html data-theme>`. Every instance stays in sync by
 * observing the attribute, so multiple toggles never drift apart. The initial
 * value is applied pre-paint by the bootstrap script in the root layout.
 */
export function useTheme(): UseTheme {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(readTheme());
    const observer = new MutationObserver(() => setThemeState(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const onStorage = (event: StorageEvent) => {
      if (event.key === "theme") setThemeState(readTheme());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage may be unavailable (private mode) — ignore */
    }
    setThemeState(next);
  }, []);

  const toggle = useCallback(() => {
    // Derive from the live DOM so concurrent toggles never flip the wrong way.
    setTheme(readTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggle };
}
