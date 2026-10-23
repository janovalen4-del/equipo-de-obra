import { values } from "@/lib/content";

export function Intro() {
  return (
    <section className="intro section-pad">
      <div className="container intro-grid">
        <div>
          <p className="eyebrow eyebrow-dark">
            Un solo contacto, distintas soluciones
          </p>
          <h2>
            De la idea inicial
            <br />
            al <em>último detalle.</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            Coordinar distintos rubros puede ser complejo. Nuestro enfoque es
            ayudarte a ordenar las necesidades, definir el alcance y avanzar con
            una comunicación clara durante el trabajo.
          </p>
          <a className="text-link" href="#contacto">
            Contanos qué necesitás <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="container value-grid">
        {values.map((value) => (
          <article className="value-item" key={value.index}>
            <span className="value-index">{value.index}</span>
            <div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
