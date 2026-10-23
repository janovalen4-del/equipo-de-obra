import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookieName, verifySession } from "./auth";

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(sessionCookieName)?.value);
}

export async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}
