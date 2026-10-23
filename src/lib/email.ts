import { siteConfig } from "./site";

export type LeadNotification = {
  name: string;
  phone: string;
  zone: string;
  service: string;
  message?: string | null;
};

export async function sendLeadNotification(
  lead: LeadNotification,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;

  if (!apiKey || !from || !to) return false;

  const text = [
    `Nueva consulta desde ${siteConfig.name}`,
    `Nombre: ${lead.name}`,
    `Teléfono: ${lead.phone}`,
    `Zona: ${lead.zone}`,
    `Servicio: ${lead.service}`,
    lead.message ? `Detalles: ${lead.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `Nueva consulta — ${lead.name} (${lead.service})`,
        text,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
