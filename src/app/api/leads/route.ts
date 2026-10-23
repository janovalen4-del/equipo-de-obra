import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema } from "@/lib/lead";
import { sendLeadNotification } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";
import { clientIp } from "@/lib/ip";

export async function POST(request: Request) {
  if (isRateLimited(`lead:${clientIp(request)}`)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { name, phone, zone, service, message, website } = parsed.data;

  // Honeypot: si el campo oculto viene completo, es un bot. Respondemos OK
  // para no dar pistas, pero no guardamos nada.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        zone,
        service,
        message: message?.trim() ? message.trim() : null,
      },
    });

    // Notificación por email sin bloquear la respuesta.
    void sendLeadNotification(lead);

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("[leads] Error al guardar la consulta", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
