"use client";

import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { DitheringText } from "@/components/ui/dithering-text";
import { ShimmerText } from "@/components/ui/shimmer-text";

// §institucional — "Quem somos?" (substitui a antiga seção de Resultados).
// Fundo: preto liso (bg-bg), sem alternância de cor pós-hero.
// Esquerda: "QUEM SOMOS?" em UMA linha (lado a lado), preenchido pelo mesmo fundo
// dithering da hero (DitheringText) — viewBox medido p/ caber sem cortar palavra.
// Direita: gancho de curiosidade (ShimmerText) + apoio. Entradas direcionais.

export function About() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12">
          {/* ESQUERDA — tipografia preenchida pelo dithering (entra da esquerda). */}
          <ScrollReveal from="left">
            <DitheringText
              text="QUEM SOMOS?"
              className="h-[160px] w-full md:h-[220px]"
            />
          </ScrollReveal>

          {/* DIREITA — gancho de curiosidade (entra da direita) */}
          <ScrollReveal from="right">
            <p className="text-eyebrow text-text-secondary">O que é a Tribus</p>

            <ShimmerText className="mt-4 block text-3xl font-bold tracking-tight md:text-4xl">
              A gente não vende ferramenta. Constrói estrutura.
            </ShimmerText>

            <p className="text-body-md mt-6 max-w-[560px] text-text-secondary">
              A Tribus nasceu pra dar às pequenas empresas o que antes só as
              grandes tinham: um sistema digital que trabalha sozinho. Não é
              agência. É laboratório — e cada projeto sai daqui pronto, no seu
              nome.
            </p>

            <a
              href="#como-funciona"
              className="group mt-8 inline-flex items-center gap-2 text-label text-accent transition-colors hover:text-accent-hover"
            >
              Veja como funciona
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
