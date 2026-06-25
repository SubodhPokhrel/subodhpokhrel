import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PanelProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Adds a soft aurora halo. */
  glow?: boolean;
  /** Adds a gradient hairline border. */
  bordered?: boolean;
}

/** Frosted "window" panel — the site's primary surface. */
export function Panel({
  as: As = "div",
  className,
  children,
  glow = false,
  bordered = false,
}: PanelProps) {
  return (
    <As
      className={cn(
        "glass rounded-2xl",
        glow && "glow-aurora",
        bordered && "aurora-border",
        className,
      )}
    >
      {children}
    </As>
  );
}
