import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Centered content container with consistent edge padding. */
export function Container({ as: As = "div", className, children }: ContainerProps) {
  return <As className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", className)}>{children}</As>;
}
