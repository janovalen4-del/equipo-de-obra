import { services } from "@/lib/content";
import { WhatsAppLink } from "./WhatsAppLink";

export function Services() {
  return (
    <section className="services section-pad" id="servicios">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow eyebrow-dark">Qué hacemos</p>
            <h2>
              Servicios para avanzar
              <br />
              <em>con confianza.</em>
            </h2>
          </div>
          <p>
            Contanos qué tenés en mente. Podemos conversar sobre un trabajo
            puntual o una refacción que combine varios rubros.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article
              key={service.title}
              className={
                service.featured
                  ? "service-card service-card-featured"
                  : "service-card"
              }
            >
              <span className="service-icon" aria-hidden="true">
                {service.icon}
              </span>
              <span className="service-no">{service.no}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.featured ? (
                <WhatsAppLink className="button button-dark" message={service.message}>
                  Contar mi idea <span aria-hidden="true">↗</span>
                </WhatsAppLink>
              ) : (
                <WhatsAppLink className="text-link" message={service.message}>
                  Consultar servicio <span aria-hidden="true">↗</span>
                </WhatsAppLink>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
