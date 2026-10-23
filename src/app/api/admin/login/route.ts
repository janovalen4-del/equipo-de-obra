import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  signSession,
  verifyPassword,
  sessionCookieName,
  sessionMaxAgeSeconds,
} from "@/lib/auth";
import { isRateLimited } from "@/lib/rate-limit";
import { clientIp } from "@/lib/ip";

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(`login:ip:${ip}`)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const username = String(body?.username ?? "");
  const password = String(body?.password ?? "");

  // Límite también por usuario, para dificultar fuerza bruta dirigida.
  if (isRateLimited(`login:user:${username}`)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const expectedUsername = process.env.ADMIN_USERNAME ?? "";

  if (
    !expectedUsername ||
    username !== expectedUsername ||
    !verifyPassword(password)
  ) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = signSession(
    username,
    Date.now() + sessionMaxAgeSeconds * 1000,
  );

  const store = await cookies();
  store.set(sessionCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionMaxAgeSeconds,
  });

  return NextResponse.json({ ok: true });
}
