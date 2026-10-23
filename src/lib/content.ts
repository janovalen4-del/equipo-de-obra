/**
 * Contenido editable de la landing.
 * Para un negocio real, reemplazá textos y fotos (hoy ilustrativas de Unsplash)
 * por información verificada e imágenes propias.
 */

export type Service = {
  icon: string;
  no: string;
  title: string;
  description: string;
  message: string;
  featured?: boolean;
};

export type Project = {
  src: string;
  alt: string;
  number: string;
  title: string;
  subtitle: string;
  large?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Value = {
  index: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const heroImage = {
  src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920",
  alt: "Estructura arquitectónica moderna en construcción",
} as const;

export const values: Value[] = [
  {
    index: "01",
    title: "Coordinación clara",
    description:
      "Un punto de contacto para conversar sobre el alcance y los próximos pasos.",
  },
  {
    index: "02",
    title: "Trabajo planificado",
    description:
      "Revisamos las necesidades antes de definir tareas, materiales y tiempos.",
  },
  {
    index: "03",
    title: "Atención al detalle",
    description:
      "Buscamos que cada etapa se realice con orden, prolijidad y seguimiento.",
  },
];

export const services: Service[] = [
  {
    icon: "⌂",
    no: "01 / OBRA",
    title: "Construcción general",
    description:
      "Mampostería, contrapisos, ampliaciones y trabajos de obra según las características del proyecto.",
    message: "Hola, quiero consultar por construcción general.",
  },
  {
    icon: "ϟ",
    no: "02 / INSTALACIONES",
    title: "Electricidad",
    description:
      "Consultas por instalaciones, iluminación, tableros y detección de fallas según evaluación técnica.",
    message: "Hola, quiero consultar por un trabajo de electricidad.",
  },
  {
    icon: "⌁",
    no: "03 / METAL",
    title: "Herrería",
    description:
      "Rejas, portones, estructuras y soluciones metálicas a definir según las medidas y necesidades.",
    message: "Hola, quiero consultar por un trabajo de herrería.",
  },
  {
    icon: "▱",
    no: "04 / TERMINACIONES",
    title: "Pintura e impermeabilización",
    description:
      "Trabajos de pintura interior y exterior, tratamiento de superficies y consultas por humedad.",
    message: "Hola, quiero consultar por pintura o impermeabilización.",
  },
  {
    icon: "◫",
    no: "05 / RENOVACIÓN",
    title: "Refacciones",
    description:
      "Renovación de ambientes, baños, cocinas y mejoras funcionales para espacios existentes.",
    message: "Hola, quiero consultar por una refacción.",
  },
  {
    icon: "↗",
    no: "¿TENÉS UN PROYECTO?",
    title: "Lo evaluamos juntos",
    description:
      "Si no sabés qué rubro necesitás, describinos la idea y vemos cuáles serían los próximos pasos.",
    message:
      "Hola, tengo un proyecto y necesito orientación para definir los trabajos.",
    featured: true,
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Nos contás",
    description: "Nos compartís la idea, la zona y qué necesitás resolver.",
  },
  {
    number: "02",
    title: "Evaluamos",
    description: "Revisamos el alcance y, si corresponde, coordinamos una visita.",
  },
  {
    number: "03",
    title: "Definimos",
    description:
      "Conversamos sobre tareas, materiales, costos y tiempos estimados.",
  },
  {
    number: "04",
    title: "Coordinamos",
    description: "Con las condiciones acordadas, organizamos los próximos pasos.",
  },
];

export const projects: Project[] = [
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200",
    alt: "Estructura de una obra en construcción",
    number: "01",
    title: "Obra y ampliaciones",
    subtitle: "Construcción general",
    large: true,
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    alt: "Interior residencial moderno",
    number: "02",
    title: "Renovación de ambientes",
    subtitle: "Refacciones",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
    alt: "Terminaciones de un ambiente residencial",
    number: "03",
    title: "Terminaciones",
    subtitle: "Detalles y acabados",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Escribinos con una breve descripción del trabajo, la zona y, si tenés, fotos o medidas. Con esa información podemos conversar sobre los próximos pasos.",
  },
  {
    question: "¿Trabajan fuera de CABA?",
    answer:
      "La zona de referencia es CABA y Zona Norte. Consultanos por tu localidad para confirmar si podemos evaluar el proyecto.",
  },
  {
    question: "¿Puedo pedir varios trabajos juntos?",
    answer:
      "Sí, podés describir varios rubros en una misma consulta. El alcance y la posibilidad de coordinarlos se evalúan según cada proyecto.",
  },
  {
    question: "¿Cómo se coordina una visita de evaluación?",
    answer:
      "En la primera conversación acordamos si corresponde una visita para relevar medidas y detalles. Las visitas se coordinan según la zona y la disponibilidad.",
  },
  {
    question: "¿El cotizador del sitio da el precio final?",
    answer:
      "No. El cotizador te da un estimado orientativo de referencia para que tengas una idea del rango. El precio final puede variar según las medidas exactas, los materiales y el estado real del lugar, y se define después de evaluar el trabajo.",
  },
];

export const serviceOptions: string[] = [
  "Construcción general",
  "Electricidad",
  "Herrería",
  "Pintura e impermeabilización",
  "Refacción integral",
  "Varios rubros / necesito orientación",
];
