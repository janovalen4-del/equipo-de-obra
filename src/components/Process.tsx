import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section className="process section-pad" id="proceso">
      <div className="container">
        <div className="section-heading section-heading-light">
          <div>
            <p className="eyebrow">Cómo trabajamos</p>
            <h2>
              Un proceso simple,
              <br />
              <em>paso a paso.</em>
            </h2>
          </div>
          <p>
            La primera conversación sirve para entender el trabajo y definir la
            mejor forma de evaluarlo. El alcance, los costos y los plazos se
            confirman antes de comenzar.
          </p>
        </div>

        <div className="process-grid">
          {processSteps.map((step) => (
            <article className="process-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
