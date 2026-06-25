/**
 * Tiny in-memory fixed-window rate limiter for the contact endpoint.
 * Per-instance and resets on serverless cold start — adequate for spam control.
 * Stale keys are evicted so the map can't grow without bound.
 */
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_HITS = 5;
const MAX_KEYS = 10_000;
const hits = new Map<string, number[]>();

function sweep(now: number): void {
  for (const [key, times] of hits) {
    const recent = times.filter((time) => now - time < WINDOW_MS);
    if (recent.length === 0) hits.delete(key);
    else hits.set(key, recent);
  }
}

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  if (hits.size > MAX_KEYS) sweep(now);

  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
