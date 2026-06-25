import { Hero } from "@/components/sections/Hero";
import { Results } from "@/components/sections/Results";
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
        <Results />
        <Services />
        <Positioning />
        <Process />
        <Market />
        <Cases />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
