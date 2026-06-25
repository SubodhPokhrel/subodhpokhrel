import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GradientTextProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Applies the animated aurora gradient to its text. Use sparingly (see UI_DISCIPLINE). */
export function GradientText({ as: As = "span", className, children }: GradientTextProps) {
  return <As className={cn("text-aurora", className)}>{children}</As>;
}
