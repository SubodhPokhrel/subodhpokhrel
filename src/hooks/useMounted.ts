"use client";

import { useEffect, useState } from "react";

/** True after the component has mounted on the client (avoids hydration mismatch). */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
