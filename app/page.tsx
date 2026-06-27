import { Hero } from "@/components/sections/Hero";
import { ScrollStroke } from "@/components/sections/ScrollStroke";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Positioning } from "@/components/sections/Positioning";
import { Process } from "@/components/sections/Process";
import { Market } from "@/components/sections/Market";
import { Cases } from "@/components/sections/Cases";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

// Home real da Tribus Labs — construída seção a seção (P2→P8).
// P8: nova Hero por vídeo (tela cheia, fundo preto + HLS, navbar glass embutida)
// substitui a hero anterior. Demais seções seguem abaixo ao rolar.
// Ritmo de superfície alternado: bg → surface-1 → bg → surface-1 → ...
export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Services />
        <Positioning />
        <Process />
        <Market />
        <Cases />
        {/* Traço SVG que se desenha conforme o scroll (Skiper19) — momento final. */}
        <ScrollStroke />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
