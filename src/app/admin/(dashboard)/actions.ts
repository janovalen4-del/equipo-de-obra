"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/session";
import { sessionCookieName } from "@/lib/auth";
import { isLeadStatus } from "@/lib/lead";

export async function updateLeadStatus(formData: FormData) {
  await requireAuth();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !isLeadStatus(status)) return;

  try {
    await prisma.lead.update({ where: { id }, data: { status } });
    revalidatePath("/admin");
  } catch (error) {
    console.error("[admin] Error al actualizar el estado", error);
  }
}

export async function deleteLead(formData: FormData) {
  await requireAuth();

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await prisma.lead.delete({ where: { id } });
    revalidatePath("/admin");
  } catch (error) {
    console.error("[admin] Error al eliminar la consulta", error);
  }
}

export async function logout() {
  const store = await cookies();
  store.delete(sessionCookieName);
  redirect("/admin/login");
}
