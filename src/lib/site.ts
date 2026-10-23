/**
 * Configuración del negocio, centralizada y alimentada por variables de entorno.
 * Solo se exponen valores con el prefijo NEXT_PUBLIC_ (no secretos).
 */
export const siteConfig = {
  name: "Equipo de Obra",
  tagline: "Construcción · Refacciones",
  description:
    "Equipo de Obra: construcción, electricidad, herrería, pintura y refacciones en CABA y Zona Norte. Contanos qué necesitás y coordinamos una evaluación.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://equipodeobra.com.ar",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "",
  zone: "CABA · Zona Norte",
  hours: "Lunes a sábados · 8 a 19 hs",
} as const;
