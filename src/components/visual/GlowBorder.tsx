import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

/** Wraps content in an aurora hairline border with an optional halo. */
export function GlowBorder({ children, className, glow = true }: GlowBorderProps) {
  return (
    <div className={cn("aurora-border rounded-2xl", glow && "glow-aurora", className)}>
      {children}
    </div>
  );
}
