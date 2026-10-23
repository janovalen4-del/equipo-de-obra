// Tarifas del cotizador. Valores de referencia (oct 2026): AJUSTAR con precios reales.

export type Rubro =
  | "construccion"
  | "electricidad"
  | "herreria"
  | "pintura"
  | "refaccion";

export type Estado = "bueno" | "regular" | "malo";

export type Zona = "caba" | "norte" | "otra";

export const TARIFAS_POR_M2: Record<Rubro, [number, number]> = {
  construccion: [800_000, 1_600_000], // AJUSTAR
  electricidad: [40_000, 120_000], // AJUSTAR
  herreria: [150_000, 400_000], // AJUSTAR
  pintura: [4_000, 12_000], // AJUSTAR
  refaccion: [700_000, 2_800_000], // AJUSTAR
};

export const FACTOR_ESTADO: Record<Estado, number> = {
  bueno: 1.0,
  regular: 1.2,
  malo: 1.4,
};

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
