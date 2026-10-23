import { WhatsAppLink } from "./WhatsAppLink";

export function FloatingWhatsApp() {
  return (
    <WhatsAppLink
      className="floating-whatsapp"
      ariaLabel="Consultar por WhatsApp"
      message="Hola, quiero consultar por un trabajo de construcción o refacción."
    >
      <span aria-hidden="true">↗</span>
    </WhatsAppLink>
  );
}
