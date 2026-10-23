export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={footer ? "brand brand-footer" : "brand"}
      href="#inicio"
      aria-label="Equipo de Obra, inicio"
    >
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <path
            d="M5 34V16L20 5l15 11v18H23V23h-6v11H5Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 17h4m8 0h4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="brand-copy">
        EQUIPO <b>DE OBRA</b>
        <small>Construcción · Refacciones</small>
      </span>
    </a>
  );
}
