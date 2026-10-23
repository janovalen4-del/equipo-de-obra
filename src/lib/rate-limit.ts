// Limitador simple en memoria. Suficiente para un sitio chico; en producción
// serverless multi-instancia conviene moverlo a un store compartido (p. ej. Redis).

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 10;
const MAX_ENTRIES = 5000;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  // Evita el crecimiento sin límite del Map: al superar un umbral,
  // borramos las claves sin hits recientes.
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
