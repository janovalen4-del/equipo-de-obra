import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionCookieName, verifySession } from "@/lib/auth";

/**
 * Protege /admin (excepto /admin/login). Se ejecuta antes de renderizar.
 * La verificación de seguridad real también se hace dentro de cada
 * server component y server action (defensa en profundidad).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLogin = pathname === "/admin/login";
  const authed = verifySession(
    request.cookies.get(sessionCookieName)?.value,
  );

  if (isLogin && authed) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLogin && !authed) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
