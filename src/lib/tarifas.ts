/**
 * Tarifas de referencia del cotizador orientativo.
 *
 * ⚠️ IMPORTANTE: son VALORES DE REFERENCIA de mercado (Argentina, relevados
 * en octubre de 2026) usados SOLO como punto de partida. AJUSTALOS con los
 * precios reales del negocio — se desactualizan con la inflación.
 *
 * El resultado que ve el cliente es un ESTIMADO ORIENTATIVO, nunca un precio
 * final. La cotización definitiva se define tras evaluar el trabajo.
 *
 * Fuentes de referencia: Cámara Argentina de la Construcción, IDECBA (CABA),
 * Sismat, UOCRA y relevamientos de mercado de pintura/refacción.
 */

export type Rubro =
  | "construccion"
  | "electricidad"
  | "herreria"
  | "pintura"
  | "refaccion";

export type Estado = "bueno" | "regular" | "malo";

export type Zona = "caba" | "norte" | "otra";

/** Rango de precio por m² [mínimo, máximo], en pesos argentinos (ARS). AJUSTAR. */
export const TARIFAS_POR_M2: Record<Rubro, [number, number]> = {
  // AJUSTAR: ampliaciones / mampostería / contrapisos (obra parcial).
  construccion: [800_000, 1_600_000],
  // AJUSTAR: instalación / renovación eléctrica, por m² de propiedad (aproximado).
  electricidad: [40_000, 120_000],
  // AJUSTAR: rejas, portones y estructuras metálicas.
  herreria: [150_000, 400_000],
  // AJUSTAR: mano de obra de pintura interior/exterior (referencia bien relevada).
  pintura: [4_000, 12_000],
  // AJUSTAR: renovación integral de ambientes (baño/cocina suelen estar arriba).
  refaccion: [700_000, 2_800_000],
};

/** Factor por estado del lugar. AJUSTAR. */
export const FACTOR_ESTADO: Record<Estado, number> = {
  bueno: 1.0,
  regular: 1.2,
  malo: 1.4,
};

/** Factor por zona, incluye viáticos/traslado. AJUSTAR. */
export const FACTOR_ZONA: Record<Zona, number> = {
  caba: 1.0,
  norte: 1.05,
  otra: 1.15,
};

export const RUBRO_LABELS: Record<Rubro, string> = {
  construccion: "Construcción general",
  electricidad: "Electricidad",
  herreria: "Herrería",
  pintura: "Pintura e impermeabilización",
  refaccion: "Refacción integral",
};

export const RUBRO_HELP: Record<Rubro, string> = {
  construccion: "m² aproximados de la ampliación o superficie a intervenir.",
  electricidad: "m² aproximados de la propiedad (instalación/renovación).",
  herreria: "m² aproximados de rejas, portones o estructuras metálicas.",
  pintura: "m² de pared o techo a pintar.",
  refaccion: "m² aproximados del ambiente a renovar.",
};

export const ESTADO_LABELS: Record<Estado, string> = {
  bueno: "Bueno",
  regular: "Regular",
  malo: "A reformar",
};

export const ZONA_LABELS: Record<Zona, string> = {
  caba: "CABA",
  norte: "Zona Norte (GBA)",
  otra: "Otra zona (consultar)",
};
