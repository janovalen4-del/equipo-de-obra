import { siteConfig } from "./site";
import { faqs } from "./content";

/** Datos estructurados LocalBusiness para SEO local. */
export const localBusinessJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${siteConfig.siteUrl}/#business`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.siteUrl,
  image: `${siteConfig.siteUrl}/opengraph-image`,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "CABA y Zona Norte, Buenos Aires, Argentina",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "19:00",
  },
  ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
};

/** Datos estructurados FAQPage (preguntas frecuentes como rich result). */
export const faqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
