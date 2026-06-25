"use client";

import { useEffect, useState } from "react";

/**
 * Heuristic for low-powered devices, used to skip the WebGL aurora in favour
 * of the lightweight CSS fallback. Conservative: only flags clearly weak HW.
 */
export function useLowEndDevice(): boolean {
  const [lowEnd, setLowEnd] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;
    setLowEnd(cores <= 4 || memory <= 4);
  }, []);

  return lowEnd;
}
