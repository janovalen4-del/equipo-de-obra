"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { serviceOptions } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function Contact() {
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    setSubmitting(true);

    const form = event.currentTarget;
    if (!form.reportValidity()) {
      setSubmitting(false);
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("nombre") ?? "").trim();
    const phone = String(data.get("telefono") ?? "").trim();
    const zone = String(data.get("zona") ?? "").trim();
    const service = String(data.get("servicio") ?? "").trim();
    const details = String(data.get("mensaje") ?? "").trim();
    const website = String(data.get("website") ?? "");

    const message = [
      "Hola, quiero solicitar una evaluación de un trabajo.",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Zona: ${zone}`,
      `Servicio: ${service}`,
      details ? `Detalles: ${details}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // 1) Guardar la consulta en la base de datos.
    let saved = false;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          zone,
          service,
          message: details,
          website,
        }),
      });
      saved = res.ok;
    } catch {
      saved = false;
    }

    // 2) Abrir WhatsApp si el número está configurado.
    const url = buildWhatsAppUrl(message);
    let whatsappOpened = false;
    if (url) {
      const popup = window.open(url, "_blank", "noopener,noreferrer");
      whatsappOpened = Boolean(popup);
    }

    // 3) Confirmación según lo que haya funcionado.
    if (saved && whatsappOpened) {
      setFeedback(
        "¡Gracias! Recibimos tu consulta. También se abrió WhatsApp con tu mensaje.",
      );
    } else if (saved) {
      setFeedback(
        "¡Gracias! Recibimos tu consulta y te contactaremos a la brevedad.",
      );
    } else if (whatsappOpened) {
      setFeedback(
        "Se abrió WhatsApp con tu mensaje preparado. Revisalo y presioná Enviar.",
      );
    } else {
      setFeedback(
        "No pudimos enviar tu consulta. Intentá de nuevo o escribinos por WhatsApp.",
      );
    }

    if (saved) form.reset();
    setSubmitting(false);
  }

  return (
    <section className="contact section-pad" id="contacto">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Hablemos de tu proyecto</p>
          <h2>
            Contanos qué
            <br />
            <em>necesitás resolver.</em>
          </h2>
          <p>
            Completá los datos y te contactaremos para coordinar una
            evaluación. También podés enviarnos el mensaje por WhatsApp.
          </p>
          <div className="contact-meta">
            <span className="meta-icon">⌖</span>
            <div>
              <strong>Zona de atención</strong>
              <span>{siteConfig.zone} · Consultar otras zonas</span>
            </div>
          </div>
          <div className="contact-meta">
            <span className="meta-icon">◷</span>
            <div>
              <strong>Horario de referencia</strong>
              <span>{siteConfig.hours}</span>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span>01 — CONTACTO</span>
            <h3>Solicitar una evaluación</h3>
            <p>Los campos marcados con * son obligatorios.</p>
          </div>

          {/* Honeypot anti-spam: los humanos no lo ven ni lo completan. */}
          <input
            className="hp-field"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="field-row">
            <div className="field">
              <label htmlFor="nombre">Nombre *</label>
              <input
                id="nombre"
                name="nombre"
                autoComplete="name"
                required
                maxLength={80}
                placeholder="Tu nombre"
              />
            </div>
            <div className="field">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                autoComplete="tel"
                required
                maxLength={40}
                placeholder="Tu número"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="zona">Localidad o barrio *</label>
            <input
              id="zona"
              name="zona"
              required
              maxLength={100}
              placeholder="Ej. Villa Urquiza"
            />
          </div>

          <div className="field">
            <label htmlFor="servicio">¿Qué trabajo necesitás? *</label>
            <select id="servicio" name="servicio" required>
              <option value="">Elegí un servicio</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="mensaje">Detalles del proyecto</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              maxLength={1000}
              placeholder="Contanos brevemente qué necesitás..."
            />
          </div>

          <button
            className="button button-primary button-full"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Enviando…" : "Enviar consulta"}{" "}
            <span aria-hidden="true">↗</span>
          </button>

          <p className="form-feedback" role="status" aria-live="polite">
            {feedback}
          </p>
          <small className="privacy-note">
            Al enviar, nos compartís tus datos para que podamos contactarte.
            No los usamos para otra cosa.
          </small>
        </form>
      </div>
    </section>
  );
}
