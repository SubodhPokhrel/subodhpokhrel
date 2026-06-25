import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Uppercase overline label with a leading hairline — sits above section titles. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-eyebrow text-muted-foreground uppercase",
        className,
      )}
    >
      <span className="inline-block h-px w-6 bg-foreground/40" aria-hidden="true" />
      {children}
    </p>
  );
}
