# Equipo de Obra — Landing page (Next.js)

Landing page para un negocio de construcción y refacciones, migrada de una demo
HTML/CSS/JS vanilla a **Next.js + TypeScript**. La demo original se conserva en
`legacy/` como referencia de diseño.

## Demo en vivo

- **Sitio:** https://equipo-de-obra.vercel.app
- **Panel:** https://equipo-de-obra.vercel.app/admin/login → usuario `admin`, contraseña `demo1234`

La demo se sirve sin base de datos (el formulario no guarda; lo avisa en el sitio).

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript** estricto
- **Prisma 6** + SQLite local (listo para Postgres)
- CSS propio (diseño original portado 1:1 a `globals.css`)
- `next/font` (DM Sans + Manrope auto-hospedadas) y `next/image`

## Ejecutar localmente

```bash
npm install       # instala y genera el cliente de Prisma (postinstall)
npx prisma db push # crea la base SQLite local (una sola vez)
npm run dev       # http://localhost:3000
npm run build     # build de producción
npm run start     # sirve el build
npm run lint      # ESLint
```

## Panel de administración (`/admin`)

- Login: `http://localhost:3000/admin/login`
- Credenciales de desarrollo: usuario `admin`, contraseña `admin123`
  (definidas en `.env.local`; **cambiarlas antes de publicar**).
- Ahí se ven las consultas que llegan del formulario, se les cambia el estado
  (nuevo → contactado → cotizado → ganado/perdido), se eliminan y se exportan a CSV.

## Configuración

Copiá `.env.example` a `.env.local` y completá:

| Variable                        | Descripción                                        |
| ------------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`   | Número de WhatsApp (internacional, sin `+`/espacios) |
| `NEXT_PUBLIC_PHONE`             | Teléfono visible (opcional)                        |
| `NEXT_PUBLIC_EMAIL`             | Email de contacto (opcional)                       |
| `NEXT_PUBLIC_SITE_URL`          | URL canónica del sitio en producción               |
| `ADMIN_USERNAME`                | Usuario del panel `/admin`                         |
| `ADMIN_PASSWORD`                | Contraseña del panel (fuerte y única)              |
| `AUTH_SECRET`                   | Clave para firmar la sesión (`openssl rand -base64 32`) |
| `RESEND_API_KEY` / `FROM` / `TO`| Email de notificación (opcional)                   |

Además, en el archivo `.env` (que lee Prisma): `DATABASE_URL` (SQLite local o Postgres).

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

## Qué se hizo

**Fase 1 — Migración + SEO**
- Diseño responsive portado 1:1, preservando accesibilidad (skip-link, ARIA,
  foco visible, `prefers-reduced-motion`).
- Fuentes auto-hospedadas con `next/font` (sin requests a Google).
- Imágenes optimizadas con `next/image` (`srcset`, lazy-loading, `priority` en hero).
- SEO: metadata (title/description/Open Graph/Twitter), canonical, JSON-LD
  (`HomeAndConstructionBusiness` + `FAQPage`), `sitemap.xml`, `robots.txt`, icono y OG image.
- Formulario y enlaces de WhatsApp con número configurable por entorno.

**Fase 2 — Backend + panel**
- `POST /api/leads`: valida (Zod), honeypot + rate-limit, guarda en DB y
  notifica por email (Resend opcional).
- Panel `/admin` con login propio (sesión firmada HMAC, cookie httpOnly),
  listado de consultas, cambio de estado, eliminación y export CSV.
- `proxy.ts` protege `/admin` (en Next 16, `middleware` se renombró a `proxy`).

## Pendiente

- **Fase 3 — Funcionalidades**: cotizador orientativo, agenda de visitas,
  galería antes/después, testimonios, portfolio real, blog.
- **Antes de producción**: migrar la base a Postgres (Neon/Supabase), reemplazar
  fotos de Unsplash por imágenes propias, completar datos reales (WhatsApp, email,
  `AUTH_SECRET` y `ADMIN_PASSWORD` fuertes) y confirmar afirmaciones comerciales.
