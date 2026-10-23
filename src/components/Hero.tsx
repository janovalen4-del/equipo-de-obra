import Image from "next/image";
import { heroImage } from "@/lib/content";
import { WhatsAppLink } from "./WhatsAppLink";

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-image" role="img" aria-label={heroImage.alt}>
        <Image
          src={heroImage.src}
          alt=""
          fill
          priority
          sizes="(max-width: 760px) 100vw, 70vw"
          className="hero-photo"
        />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> Construcción y mantenimiento
          </p>
          <h1>
            Tu proyecto merece
            <br />
            <em>una buena base.</em>
          </h1>
          <p className="hero-lead">
            Soluciones de obra y refacción con planificación, comunicación
            directa y atención al detalle, desde el primer contacto hasta la
            entrega.
          </p>
          <div className="hero-actions">
            <WhatsAppLink
              className="button button-primary"
              message="Hola, quiero solicitar una evaluación para mi proyecto."
            >
              Hablemos de tu proyecto <span aria-hidden="true">↗</span>
            </WhatsAppLink>
            <a className="button button-quiet" href="#servicios">
              Conocer servicios <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="check-mark" aria-hidden="true">
              ✓
            </span>{" "}
            Atención en CABA y Zona Norte. Consultá por otras zonas.
          </div>
        </div>

        <div className="hero-aside">
          <span className="aside-number">
            01 <i>/ 04</i>
          </span>
          <p>Un equipo coordinado para acompañar las distintas etapas de tu obra.</p>
          <a href="#proceso" aria-label="Conocer nuestro proceso">
            Descubrí cómo trabajamos <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>

      <div className="hero-bottom container">
        <span>PLANIFICACIÓN</span>
        <span className="hero-bottom-line" />
        <span>EJECUCIÓN</span>
        <span className="hero-bottom-line" />
        <span>ENTREGA</span>
      </div>
    </section>
  );
}
