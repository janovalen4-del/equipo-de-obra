"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { $Enums } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/session";
import { sessionCookieName } from "@/lib/auth";
import { isLeadStatus } from "@/lib/lead";

export async function updateLeadStatus(formData: FormData) {
  if (!(await isAuthenticated())) return;

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !isLeadStatus(status)) return;

  await prisma.lead.update({
    where: { id },
    data: { status: status as $Enums.LeadStatus },
  });

  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  if (!(await isAuthenticated())) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.lead.delete({ where: { id } });

  revalidatePath("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(sessionCookieName);
  redirect("/admin/login");
}
