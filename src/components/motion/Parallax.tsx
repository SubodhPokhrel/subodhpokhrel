"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";
import { useMounted } from "@/hooks";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** 0 = none, 1 = strong. */
  speed?: number;
}

/** Subtle scroll-linked vertical parallax (GPU transform). Disabled under reduced motion. */
export function Parallax({ children, className, speed = 0.2 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduce = useReducedMotion();
  const mounted = useMounted();
  const reduce = prefersReduce && mounted;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = speed * 60;
  const y = useTransform(scrollYProgress, [0, 1], [`${-range}px`, `${range}px`]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
