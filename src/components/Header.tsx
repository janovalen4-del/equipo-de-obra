"use client";

import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { WhatsAppLink } from "./WhatsAppLink";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#preguntas", label: "Preguntas" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Brand />

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primaryNav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          className={open ? "primary-nav open" : "primary-nav"}
          id="primaryNav"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <WhatsAppLink
            className="nav-cta"
            message="Hola, quiero consultar por un trabajo de construcción o refacción."
          >
            Solicitar evaluación <span aria-hidden="true">↗</span>
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}
