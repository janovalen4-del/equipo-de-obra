import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const sessionCookieName = "admin_session";
export const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;

function getSecret(): string {
  return process.env.AUTH_SECRET ?? "";
}

export function signSession(username: string, expiresAtMs: number): string {
  const payload = Buffer.from(
    JSON.stringify({ sub: username, exp: expiresAtMs }),
  ).toString("base64url");
  const signature = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

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

export function verifyPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  const a = createHash("sha256").update(submitted).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
