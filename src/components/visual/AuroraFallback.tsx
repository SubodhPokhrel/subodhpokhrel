import { cn } from "@/lib/cn";

interface AuroraFallbackProps {
  className?: string;
}

/**
 * Pure-CSS aurora — soft blurred gradient orbs. Zero JS, SSR-safe, and the
 * fallback whenever WebGL / motion is unavailable. Frozen by the global
 * reduced-motion rule.
 */
export function AuroraFallback({ className }: AuroraFallbackProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute top-1/3 left-1/2 size-[60vw] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background: "var(--gradient-aurora-conic)",
          animation: "float 13s var(--ease-in-out) infinite",
        }}
      />
      <div
        className="absolute top-[18%] right-[8%] size-[34vw] rounded-full opacity-40 blur-3xl"
        style={{
          background: "var(--gradient-aurora)",
          animation: "float 17s var(--ease-in-out) infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[2%] left-[10%] size-[30vw] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-aurora)" }}
      />
    </div>
  );
}
