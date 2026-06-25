"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useLowEndDevice, useMounted } from "@/hooks";
import { AuroraFallback } from "./AuroraFallback";

const AuroraCanvas = dynamic(() => import("./AuroraCanvas").then((m) => m.AuroraCanvas), {
  ssr: false,
  loading: () => <AuroraFallback />,
});

interface AuroraProps {
  className?: string;
}

/**
 * Public aurora backdrop. Renders the WebGL canvas on capable devices and the
 * CSS fallback otherwise (server render, reduced motion, or low-end hardware).
 */
export function Aurora({ className }: AuroraProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const lowEnd = useLowEndDevice();

  if (!mounted || reduce || lowEnd) return <AuroraFallback className={className} />;
  return <AuroraCanvas className={className} />;
}
