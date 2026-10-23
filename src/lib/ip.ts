/**
 * Obtiene la IP del cliente de forma robusta para rate-limiting.
 * En Vercel (destino de deploy), estos headers los reescribe el proxy de borde
 * con la IP real, por lo que el primer valor es confiable. Fuera de un proxy
 * de confianza, `x-forwarded-for` puede ser suplantado; para self-hosting
 * conviene leer la IP del socket.
 */
export function clientIp(request: Request): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const vercelForwarded = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) return vercelForwarded.split(",")[0].trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return "unknown";
}
