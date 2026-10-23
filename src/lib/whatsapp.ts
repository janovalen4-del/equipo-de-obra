import { siteConfig } from "./site";

/**
 * Construye una URL `wa.me` para un mensaje predefinido.
 * Devuelve `null` si el número de WhatsApp no está configurado,
 * para que la UI redirija al formulario en modo demo.
 */
export function buildWhatsAppUrl(message: string): string | null {
  const number = siteConfig.whatsappNumber.replace(/[^\d]/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
