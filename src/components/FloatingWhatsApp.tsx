import { siteConfig } from "@/lib/site";
import { WhatsAppLink } from "./WhatsAppLink";

export function FloatingWhatsApp() {
  const hasNumber = Boolean(siteConfig.whatsappNumber);

  return (
    <WhatsAppLink
      className="floating-whatsapp"
      ariaLabel={
        hasNumber ? "Consultar por WhatsApp" : "Ir al formulario de contacto"
      }
      message="Hola, quiero consultar por un trabajo de construcción o refacción."
    >
      <span aria-hidden="true">↗</span>
    </WhatsAppLink>
  );
}
