/**
 * Renderiza un bloque JSON-LD. Escapa "<" para evitar el cierre prematuro de
 * la etiqueta <script> (defensa en profundidad, aunque el dato hoy es estático).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u005cu003c"),
      }}
    />
  );
}
