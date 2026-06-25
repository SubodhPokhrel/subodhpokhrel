import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Small pill used for tech tags and meta labels. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-2/60 px-3 py-1 text-caption text-muted-foreground backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
