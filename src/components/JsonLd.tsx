/**
 * Renderiza un bloque JSON-LD. El contenido actual es estático y de confianza,
 * por lo que no requiere sanitización. Si en el futuro proviene de datos
 * dinámicos (CMS, inputs), agregá un escape de `<` para prevenir XSS.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
