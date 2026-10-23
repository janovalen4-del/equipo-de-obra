import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const sessionCookieName = "admin_session";
export const sessionMaxAgeSeconds = 60 * 60 * 24 * 7; // 7 días

// Aviso temprano si la clave de sesión falta o es débil.
if (!process.env.AUTH_SECRET) {
  console.error(
    "[auth] AUTH_SECRET no está definido. El login no funcionará hasta configurarlo en .env.local.",
  );
} else if (process.env.AUTH_SECRET.length < 16) {
  console.warn(
    "[auth] AUTH_SECRET es débil. Generá una clave larga y aleatoria (openssl rand -base64 32).",
  );
}

function getSecret(): string {
  return process.env.AUTH_SECRET ?? "";
}

/** Firma un token de sesión (payload en base64url + HMAC-SHA256). */
export function signSession(username: string, expiresAtMs: number): string {
  const payload = Buffer.from(
    JSON.stringify({ sub: username, exp: expiresAtMs }),
  ).toString("base64url");
  const signature = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

/** Verifica firma y expiración de un token de sesión. */
export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  const actual = Buffer.from(signature);
  const reference = Buffer.from(expected);
  if (actual.length !== reference.length || !timingSafeEqual(actual, reference)) {
    return false;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

/** Compara la contraseña contra ADMIN_PASSWORD con comparación de tiempo constante. */
export function verifyPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;

  // Hasheamos ambos lados para comparar siempre la misma longitud
  // (evita filtrar la longitud por timing).
  const a = createHash("sha256").update(submitted).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
