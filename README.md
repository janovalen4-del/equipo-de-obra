# Equipo de Obra — Landing page (Next.js)

Landing page para un negocio de construcción y refacciones, migrada de una demo
HTML/CSS/JS vanilla a **Next.js + TypeScript**. La demo original se conserva en
`legacy/` como referencia de diseño.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript** estricto
- CSS propio (diseño original portado 1:1 a `globals.css`)
- `next/font` (DM Sans + Manrope auto-hospedadas) y `next/image`

## Ejecutar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # sirve el build
npm run lint     # ESLint
```

## Configuración

Copiá `.env.example` a `.env.local` y completá:

| Variable                        | Descripción                                        |
| ------------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | Número de WhatsApp (internacional, sin `+`/espacios) |
| `NEXT_PUBLIC_PHONE`             | Teléfono visible (opcional)                        |
| `NEXT_PUBLIC_EMAIL`             | Email de contacto (opcional)                       |
| `NEXT_PUBLIC_SITE_URL`          | URL canónica del sitio en producción               |

Sin número de WhatsApp, los enlaces redirigen al formulario (modo demo).

## Estructura

```
src/
  app/               # layout, página, sitemap, robots, icono
  components/        # secciones y componentes reutilizables
  lib/               # configuración, contenido y helpers tipados
```

- `src/lib/site.ts` — configuración central del negocio (env).
- `src/lib/content.ts` — textos y datos de la landing (servicios, proceso, FAQ, proyectos).
- `src/lib/whatsapp.ts` — construcción de URLs `wa.me`.
- `src/lib/jsonld.ts` — datos estructurados (LocalBusiness + FAQ).

## Qué se migró (Fase 1)

- Diseño responsive portado 1:1, preservando accesibilidad (skip-link, ARIA,
  foco visible, `prefers-reduced-motion`).
- Fuentes auto-hospedadas con `next/font` (sin requests a Google).
- Imágenes optimizadas con `next/image` (`srcset`, lazy-loading, `priority` en hero).
- SEO: metadata (title/description/Open Graph/Twitter), canonical, JSON-LD
  (`HomeAndConstructionBusiness` + `FAQPage`), `sitemap.xml`, `robots.txt`, icono.
- Formulario y enlaces de WhatsApp con número configurable por entorno.

## Pendiente

- **Fase 2 — Backend**: persistir leads (PostgreSQL + API route), notificaciones
  por email, panel de administración.
- **Fase 3 — Funcionalidades**: cotizador orientativo, agenda de visitas,
  galería antes/después, testimonios, portfolio real, blog.
- Antes de producción: reemplazar fotos de Unsplash por imágenes propias,
  datos reales del negocio y confirmar afirmaciones comerciales.
