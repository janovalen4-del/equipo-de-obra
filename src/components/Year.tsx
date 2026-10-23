"use client";

/** Año actual, calculado en el cliente para que siempre esté actualizado. */
export function Year() {
  return <>{new Date().getFullYear()}</>;
}
