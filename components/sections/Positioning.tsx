"use client";

import { Check, X } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

// §11/04 — Posicionamento diferencial. Por QUE a Tribus (não como).
// Cada ponto contrasta a "negação" (riscada) com a "afirmação" (accent).
const CONTRASTS = [
  { no: "Mensalidade de agência", yes: "Projeto com preço fixo" },
  { no: "Ferramenta avulsa que você aluga", yes: "Sistema completo e integrado" },
  { no: "Dependência eterna de fornecedor", yes: "Código e dados são seus" },
];

const STAGGER = 0.12; // 120ms entre cards (§7) — cascata mais visível

export function Positioning() {
  return (
    // seção de respiro/impacto — padding vertical maior (120px desktop)
    <section className="bg-surface-1 py-24 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <ScrollReveal>
          <p className="text-eyebrow text-text-secondary">Por que a Tribus</p>
          <h2 className="text-display-lg mt-3 max-w-3xl text-balance text-text-primary">
            Agência te cobra pra sempre. A Tribus te entrega a chave.
          </h2>
          <p className="text-body-lg mt-4 max-w-[640px] text-text-secondary">
            Toda mensalidade de agência é um aluguel: você paga eternamente por
            algo que nunca é seu. Quando para de pagar, perde tudo. Aqui o sistema
            é construído, entregue, e a propriedade passa pra você.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CONTRASTS.map((c, i) => (
            <ScrollReveal key={c.yes} delay={i * STAGGER}>
              <div className="flex h-full flex-col gap-4 rounded-lg border-[0.5px] border-border bg-surface-2 p-6">
                {/* negação — secondary (AA) + riscado + X */}
                <div className="flex items-center gap-3">
                  <X
                    className="h-5 w-5 shrink-0 text-text-secondary"
                    aria-hidden
                  />
                  <span className="text-body-sm text-text-secondary line-through">
                    {c.no}
                  </span>
                </div>
                {/* afirmação — accent + check */}
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <span className="text-body-md font-medium text-text-primary">
                    {c.yes}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
