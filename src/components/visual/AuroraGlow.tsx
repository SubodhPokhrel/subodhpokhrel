import { cn } from "@/lib/cn";

interface AuroraGlowProps {
  className?: string;
}

/**
 * A contained aurora wash meant to sit BEHIND a glass surface, so the panel's
 * backdrop blur has something colorful to refract — the liquid-glass effect.
 * Pair with a `relative isolate overflow-hidden` parent and a `.glass` panel.
 */
export function AuroraGlow({ className }: AuroraGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="absolute top-0 left-1/2 size-[150%] -translate-x-1/2 opacity-70 blur-3xl"
        style={{ background: "var(--gradient-aurora-conic)" }}
      />
    </div>
  );
}
