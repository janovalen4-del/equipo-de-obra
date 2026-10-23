// Limitador simple en memoria. Suficiente para un sitio chico;
// en producción serverless cada instancia reinicia el contador.

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 10;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}
