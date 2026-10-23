import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookieName, verifySession } from "./auth";

/** ¿La petición actual tiene una sesión de administrador válida? */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(sessionCookieName)?.value);
}

/** Redirige al login si no hay sesión válida (para server components/actions). */
export async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}
