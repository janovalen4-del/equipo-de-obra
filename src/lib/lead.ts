import { z } from "zod";
import { LeadStatus } from "@prisma/client";

/** Validación del formulario de contacto público. */
export const leadSchema = z.object({
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(1).max(40),
  zone: z.string().trim().min(1).max(100),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().max(1000).optional(),
  // Honeypot: los bots lo completan; los humanos lo dejan vacío.
  website: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Derivado del enum de Prisma para evitar duplicación/desincronización.
export const LEAD_STATUSES = Object.values(LeadStatus) as LeadStatus[];
export type LeadStatusValue = LeadStatus;

export const LEAD_STATUS_LABELS: Record<LeadStatusValue, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cotizado: "Cotizado",
  ganado: "Ganado",
  perdido: "Perdido",
};

export function isLeadStatus(value: string): value is LeadStatusValue {
  return (LEAD_STATUSES as string[]).includes(value);
}
