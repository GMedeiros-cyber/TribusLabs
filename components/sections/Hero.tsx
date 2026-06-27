"use client";

import { HeroDitheringBackground } from "@/components/sections/HeroDitheringBackground";
import { Navbar } from "@/components/sections/Navbar";
import { Appear } from "@/components/motion/Appear";
import { Parallax } from "@/components/motion/Parallax";
import { TextRollList } from "@/components/ui/text-roll";
import { ShimmerText } from "@/components/ui/shimmer-text";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// Hero tela cheia (100vh): fundo dithering (com Parallax) + navbar centralizada.
// Tipografia (TextRoll, roll no hover) à esquerda; bloco de CTA no CANTO INFERIOR DIREITO
// (ShimmerText em cima + Interactive Hover Button embaixo). O botão rola pra
// #contato (form de qualificação na seção CTA).

export function Hero() {
  const scrollToContato = () => {
    const el = document.getElementById("contato");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div
      id="top"
      className="relative bg-black h-screen w-full flex flex-col overflow-hidden selection:bg-white selection:text-black"
    >
      {/* Camada de FUNDO decorativa — único lugar com Parallax (movimento contínuo). */}
      <Parallax className="absolute inset-0 pointer-events-none" amount={120}>
        <HeroDitheringBackground />
      </Parallax>
      <Navbar />

      <section className="relative flex-1 flex items-center px-6">
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* Tipografia (roll no hover) — canto esquerdo (onde foi sinalizado). */}
          <Appear
            as="div"
            from={{ opacity: 0, x: -20 }}
            to={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-start"
          >
            <TextRollList className="text-white" />
          </Appear>
        </div>
      </section>

      {/* Bloco de CTA — canto inferior direito: frase (shimmer) + botão. */}
      <Appear
        as="div"
        from={{ opacity: 0, y: 16 }}
        to={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 right-0 z-10 flex flex-col items-center gap-4 p-6 text-center md:items-end md:p-12 md:text-right"
      >
        <ShimmerText className="max-w-xs text-2xl font-bold tracking-tight md:max-w-sm md:text-3xl">
          Descubra onde a Tribus pode te ajudar, hoje!
        </ShimmerText>
        <InteractiveHoverButton
          text="Diagnóstico gratuito"
          onClick={scrollToContato}
          aria-label="Diagnóstico gratuito — ir para o formulário de contato"
        />
      </Appear>
    </div>
  );
}
