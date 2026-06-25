"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useLowEndDevice, useMounted } from "@/hooks";
import { cn } from "@/lib/cn";
import { AuroraFallback } from "./AuroraFallback";

const AuroraCanvas = dynamic(() => import("./AuroraCanvas").then((m) => m.AuroraCanvas), {
  ssr: false,
  loading: () => <AuroraFallback />,
});

interface AuroraProps {
  className?: string;
}

/**
 * Public aurora backdrop. Renders nothing until mounted, so the very first
 * paint is the plain (white) page background — no flash of a saturated gradient
 * before hydration — then fades the aurora in. Uses the WebGL canvas on capable
 * devices and the CSS fallback otherwise (reduced motion or low-end hardware).
 */
export function Aurora({ className }: AuroraProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const lowEnd = useLowEndDevice();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-opacity duration-700 ease-out",
        mounted ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {mounted ? reduce || lowEnd ? <AuroraFallback /> : <AuroraCanvas /> : null}
    </div>
  );
}
