"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger helper — seconds. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  once?: boolean;
}

/** Fade + rise into view on scroll. No-ops under reduced motion. */
export function Reveal({ children, className, delay = 0, y = 16, once = true }: RevealProps) {
  // Always render the same element (no hydration mismatch). Under reduced
  // motion the transition is instant — content appears without an opacity fade.
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: reduce ? 0 : 0.6,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
