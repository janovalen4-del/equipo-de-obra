import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Equipo de Obra | Construcción y refacciones",
    template: "%s | Equipo de Obra",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: siteConfig.name,
    title: "Equipo de Obra | Construcción y refacciones",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Equipo de Obra | Construcción y refacciones",
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#101a2a",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es-AR"
      className={`${dmSans.variable} ${manrope.variable}`}
    >
      <body>
        <JsonLd data={localBusinessJsonLd} />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
