"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { WhatsAppLink } from "./WhatsAppLink";

export function Faq() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="faq section-pad" id="preguntas">
      <div className="container faq-layout">
        <div>
          <p className="eyebrow eyebrow-dark">Preguntas frecuentes</p>
          <h2>
            Antes de
            <br />
            <em>empezar.</em>
          </h2>
          <p className="faq-intro">
            Si tenés otra consulta, escribinos y la conversamos.
          </p>
          <WhatsAppLink
            className="text-link"
            message="Hola, tengo una consulta sobre un trabajo de obra."
          >
            Hacer una consulta <span aria-hidden="true">↗</span>
          </WhatsAppLink>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <article className="faq-item" key={faq.question}>
              <h3>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={open.has(index)}
                  onClick={() => toggle(index)}
                >
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </button>
              </h3>
              <div className="faq-answer" hidden={!open.has(index)}>
                <p>{faq.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
