"use client";

/**
 * Año actual renderizado en el cliente. `suppressHydrationWarning` evita el
 * aviso si el año cambia entre el prerender del servidor y la hidratación.
 */
export function Year() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
