import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/session";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const header = [
    "fecha",
    "nombre",
    "telefono",
    "zona",
    "servicio",
    "estado",
    "mensaje",
  ];

  const rows = leads.map((lead) => [
    lead.createdAt.toISOString(),
    lead.name,
    lead.phone,
    lead.zone,
    lead.service,
    lead.status,
    lead.message ?? "",
  ]);

  const escape = (cell: string) => `"${cell.replace(/"/g, '""')}"`;
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => escape(String(cell))).join(","))
    .join("\n");

  // BOM para que Excel detecte UTF-8 correctamente.
  return new NextResponse("\uFEFF" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="leads.csv"',
    },
  });
}
