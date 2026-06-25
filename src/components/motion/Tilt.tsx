"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useMounted } from "@/hooks";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
}

/** Pointer-driven 3D tilt for cards. Flat (no tilt) under reduced motion. */
export function Tilt({ children, className, max = 7 }: TiltProps) {
  const prefersReduce = useReducedMotion();
  const mounted = useMounted();
  const reduce = prefersReduce && mounted;
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 15 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
