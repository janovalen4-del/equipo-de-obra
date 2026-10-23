// Limitador en memoria. Para serverless multi-instancia, usar Redis.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;
const MAX_ENTRIES = 5000;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (hits.size > MAX_ENTRIES) {
    for (const [k, arr] of hits) {
      if (!arr.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}
