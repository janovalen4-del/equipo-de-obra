import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Cotizador } from "@/components/Cotizador";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { faqJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Hero />
      <Intro />
      <Services />
      <Process />
      <Projects />
      <Cotizador />
      <Faq />
      <Contact />
    </>
  );
}
