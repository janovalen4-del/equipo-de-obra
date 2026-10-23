import Image from "next/image";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <section className="projects section-pad" id="proyectos">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow eyebrow-dark">Inspiración y rubros</p>
            <h2>
              Ideas para cada
              <br />
              <em>espacio.</em>
            </h2>
          </div>
          <p>
            Una selección visual ilustrativa de trabajos y ambientes
            relacionados con los servicios ofrecidos.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <figure
              key={project.number}
              className={
                project.large
                  ? "project-card project-large"
                  : "project-card"
              }
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes={
                  project.large
                    ? "(max-width: 760px) 100vw, 40vw"
                    : "(max-width: 480px) 100vw, (max-width: 760px) 50vw, 30vw"
                }
                className="project-img"
              />
              <figcaption>
                <span>{project.number}</span>
                <div>
                  <strong>{project.title}</strong>
                  <small>{project.subtitle}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="image-disclaimer">
          Las fotografías son ilustrativas y no representan necesariamente
          trabajos realizados por el equipo.
        </p>
      </div>
    </section>
  );
}
