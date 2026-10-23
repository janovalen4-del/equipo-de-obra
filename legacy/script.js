/* Equipo de Obra — interacciones sin dependencias externas */
(() => {
  "use strict";

  // IMPORTANTE: reemplazá este número por uno real, en formato internacional
  // sin +, espacios ni guiones, antes de usar la página para un negocio real.
  // El número ficticio está vacío a propósito para evitar enviar consultas a terceros.
  const WHATSAPP_NUMBER = "";

  const menuToggle = document.querySelector("#menuToggle");
  const primaryNav = document.querySelector("#primaryNav");
  const year = document.querySelector("#year");
  const contactForm = document.querySelector("#contactForm");
  const formFeedback = document.querySelector("#formFeedback");

  if (year) year.textContent = new Date().getFullYear();

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      primaryNav.classList.toggle("open", open);
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        primaryNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      }
    });
  }

  function makeWhatsAppUrl(message) {
    if (!WHATSAPP_NUMBER) return null;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    const message = link.dataset.message || "Hola, quiero consultar por un trabajo de construcción o refacción.";
    const url = makeWhatsAppUrl(message);

    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      // En la demo no se envían datos a un número inventado.
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const contact = document.querySelector("#contacto");
        if (contact) contact.scrollIntoView({ behavior: "smooth" });
        if (formFeedback) {
          formFeedback.textContent = "Demo: configurá tu número de WhatsApp en script.js para activar este contacto.";
        }
      });
    }
  });

  // Acordeón FAQ accesible con botones y atributos ARIA.
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.closest(".faq-item")?.querySelector(".faq-answer");
      if (!answer) return;
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.hidden = isOpen;
    });
  });

  // Formulario: valida y prepara un mensaje. No simula que se envió al servidor.
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      formFeedback.textContent = "";

      if (!contactForm.reportValidity()) return;

      const data = new FormData(contactForm);
      const name = String(data.get("nombre") || "").trim();
      const phone = String(data.get("telefono") || "").trim();
      const zone = String(data.get("zona") || "").trim();
      const service = String(data.get("servicio") || "").trim();
      const details = String(data.get("mensaje") || "").trim();

      const message = [
        "Hola, quiero solicitar una evaluación de un trabajo.",
        `Nombre: ${name}`,
        `Teléfono: ${phone}`,
        `Zona: ${zone}`,
        `Servicio: ${service}`,
        details ? `Detalles: ${details}` : ""
      ].filter(Boolean).join("\n");

      const url = makeWhatsAppUrl(message);

      if (!url) {
        formFeedback.textContent = "El formulario está validado, pero WhatsApp aún no está configurado. Abrí script.js y completá WHATSAPP_NUMBER con el número autorizado del negocio.";
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
      formFeedback.textContent = "Se abrió WhatsApp con tu mensaje preparado. Revisalo y presioná Enviar en WhatsApp.";
    });
  }
})();
