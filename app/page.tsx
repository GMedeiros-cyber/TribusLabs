import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Results } from "@/components/sections/Results";
import { Services } from "@/components/sections/Services";
import { Positioning } from "@/components/sections/Positioning";
import { Process } from "@/components/sections/Process";
import { Market } from "@/components/sections/Market";
import { Cases } from "@/components/sections/Cases";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

// Home real da Tribus Labs — construída seção a seção (P2→P6).
// P2: Navbar + Hero · P3: Results (§02) + Services (§03) ·
// P4: Positioning (§04) + Process (§05) · P5: Market (§06) + Cases (§07) ·
// P6: CTA (§08, #contato, sempre dark) + Footer. Página completa de ponta a ponta.
// Ritmo de superfície alternado: bg → surface-1 → bg → surface-1 → ...
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
