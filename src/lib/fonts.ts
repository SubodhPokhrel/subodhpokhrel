import localFont from "next/font/local";

/**
 * Self-hosted variable fonts.
 *
 * The .woff2 files live in `src/fonts/` and are served from our own origin via
 * `next/font/local` — no third-party font CDN request is ever made by the browser.
 * Each font is exposed as a CSS variable consumed by the `@theme` block in
 * `globals.css` (`--font-inter`, `--font-jetbrains-mono`).
 *
 * See docs/COMPLIANCE.md — "Fonts must be self-hosted".
 */

export const fontSans = localFont({
  src: [
    { path: "../fonts/Inter-Variable.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/Inter-Variable-Italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const fontMono = localFont({
  src: [{ path: "../fonts/JetBrainsMono-Variable.woff2", weight: "100 800", style: "normal" }],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", "monospace"],
});

/** Combined font variable class for the <html> element. */
export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
