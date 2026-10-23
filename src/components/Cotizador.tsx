"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  TARIFAS_POR_M2,
  FACTOR_ESTADO,
  FACTOR_ZONA,
  RUBRO_LABELS,
  RUBRO_HELP,
  ESTADO_LABELS,
  ZONA_LABELS,
} from "@/lib/tarifas";
import type { Rubro, Estado, Zona } from "@/lib/tarifas";
import { WhatsAppLink } from "./WhatsAppLink";

const formatPesos = (value: number) =>
  value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

export function Cotizador() {
  const [rubro, setRubro] = useState<Rubro>("construccion");
  const [m2, setM2] = useState("");
  const [estado, setEstado] = useState<Estado>("bueno");
  const [zona, setZona] = useState<Zona>("caba");
  const [calculado, setCalculado] = useState(false);

  const metros = Number(m2);
  const valido = Number.isFinite(metros) && metros > 0 && metros <= 10000;

  const rango = useMemo(() => {
    if (!valido) return null;
    const [min, max] = TARIFAS_POR_M2[rubro];
    const factorEstado = FACTOR_ESTADO[estado];
    const factorZona = FACTOR_ZONA[zona];
    return {
      min: Math.round(metros * min * factorEstado * factorZona),
      max: Math.round(metros * max * factorEstado * factorZona),
    };
  }, [rubro, metros, estado, zona, valido]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valido) return;
    setCalculado(true);
  }

  const mensajeWhatsApp = rango
    ? `Hola, usé el cotizador orientativo del sitio. ${RUBRO_LABELS[rubro]} — ${metros} m² — ${ZONA_LABELS[zona]}. El estimado dio entre ${formatPesos(rango.min)} y ${formatPesos(rango.max)}. Quisiera una cotización real.`
    : "";

  return (
    <section className="cotizador section-pad" id="cotizador">
      <div className="container cotizador-grid">
        <div className="cotizador-copy">
          <p className="eyebrow eyebrow-dark">Cotizador orientativo</p>
          <h2>
            Estimá tu proyecto
            <br />
            <em>en un minuto.</em>
          </h2>
          <p>
            Elegí el rubro, la superficie aproximada y la zona para obtener un
            rango de referencia.
          </p>
          <ul className="cotizador-notes">
            <li>
              El resultado es un <strong>estimado orientativo</strong>, no un
              precio final.
            </li>
            <li>
              Puede variar según medidas exactas, materiales y estado real del
              lugar.
            </li>
            <li>
              La cotización definitiva la definimos después de evaluar el
              trabajo.
            </li>
          </ul>
        </div>

        <form className="cotizador-card" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="cot-rubro">¿Qué trabajo necesitás?</label>
            <select
              id="cot-rubro"
              value={rubro}
              onChange={(event) => {
                setRubro(event.target.value as Rubro);
                setCalculado(false);
              }}
            >
              {(Object.keys(RUBRO_LABELS) as Rubro[]).map((key) => (
                <option key={key} value={key}>
                  {RUBRO_LABELS[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="cot-m2">Superficie aproximada (m²)</label>
            <input
              id="cot-m2"
              type="number"
              inputMode="numeric"
              min="1"
              max="10000"
              placeholder="Ej. 40"
              value={m2}
              onChange={(event) => {
                setM2(event.target.value);
                setCalculado(false);
              }}
              required
            />
            <small className="cotizador-help">{RUBRO_HELP[rubro]}</small>
          </div>

          <div className="field">
            <span className="cotizador-label">Estado del lugar</span>
            <div className="cotizador-radios">
              {(Object.keys(ESTADO_LABELS) as Estado[]).map((key) => (
                <label
                  key={key}
                  className={
                    estado === key
                      ? "cotizador-radio cotizador-radio--on"
                      : "cotizador-radio"
                  }
                >
                  <input
                    type="radio"
                    name="estado"
                    value={key}
                    checked={estado === key}
                    onChange={() => {
                      setEstado(key);
                      setCalculado(false);
                    }}
                  />
                  {ESTADO_LABELS[key]}
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="cot-zona">Zona</label>
            <select
              id="cot-zona"
              value={zona}
              onChange={(event) => {
                setZona(event.target.value as Zona);
                setCalculado(false);
              }}
            >
              {(Object.keys(ZONA_LABELS) as Zona[]).map((key) => (
                <option key={key} value={key}>
                  {ZONA_LABELS[key]}
                </option>
              ))}
            </select>
          </div>

          <button
            className="button button-primary button-full"
            type="submit"
            disabled={!valido}
          >
            Calcular estimado
          </button>

          {calculado && rango && (
            <div className="cotizador-result" role="status">
              <span className="cotizador-result__label">
                Estimado orientativo
              </span>
              <span className="cotizador-result__range">
                {formatPesos(rango.min)} — {formatPesos(rango.max)}
              </span>
              <p className="cotizador-result__disclaimer">
                ⚠️ Este es un <strong>estimado de referencia</strong>, no un
                precio final. El valor real puede variar según las medidas
                exactas, los materiales, el estado real del lugar y la
                complejidad del trabajo. La cotización definitiva la definimos
                después de evaluar tu proyecto.
              </p>
              <WhatsAppLink
                className="button button-dark"
                message={mensajeWhatsApp}
              >
                Recibir cotización real <span aria-hidden="true">↗</span>
              </WhatsAppLink>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
