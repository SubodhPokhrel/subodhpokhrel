/** Small, pure helpers shared across the app. */

export const isBrowser = typeof window !== "undefined";

/** URL-friendly slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Clamp a number to an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** `[0, 1, ..., n-1]` — handy for stagger indices. */
export function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i);
}

/** Pad a single-digit ordinal, e.g. 3 -> "03" (used for section numbering). */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}
