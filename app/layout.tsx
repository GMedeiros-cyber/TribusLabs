import type { Metadata } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// DESIGN.md §3 — Space Grotesk (display), Inter (body), JetBrains Mono (mono).
// Variable names match the doc exactly so var(--font-display/-body/-mono) work
// directly in CSS (as §9 button styles use them).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Hero serif (heading da nova hero por vídeo). Peso único 400.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

// §13 — SEO. metadataBase é placeholder até o domínio final ser confirmado.
// TODO: confirmar domínio de produção da Tribus Labs.
const SITE_URL = "https://tribuslabs.com.br";

const DESCRIPTION =
  "Sistemas de automação e agentes de IA que a sua empresa possui, não aluga. " +
  "Site, WhatsApp automático, CRM próprio e agente que atende, agenda e cobra. " +
  "Guarulhos/SP.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tribus Labs — Funcionários digitais para a sua empresa",
  description: DESCRIPTION,
  openGraph: {
    title: "Tribus Labs — Funcionários digitais para a sua empresa",
    description: DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    siteName: "Tribus Labs",
    url: SITE_URL,
  },
};

// §13 — JSON-LD Organization (schema.org) injetado no <head> via <script>.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tribus Labs",
  description: DESCRIPTION,
  url: SITE_URL,
  areaServed: "Guarulhos/SP",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Guarulhos",
    addressRegion: "SP",
    addressCountry: "BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // JSON.stringify de objeto controlado (sem input do usuário) — seguro.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
