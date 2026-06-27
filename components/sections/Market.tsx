"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";

// §11/06 — O mercado já decidiu. Prova social por autoridade: empresas globais
// que adotaram IA cedo e tiveram resultado mensurável (todos verificáveis).
const COMPANIES = [
  {
    name: "Amazon",
    stat: "35% da receita",
    context:
      "vem do sistema de recomendação por IA que sugere produtos a cada cliente.",
  },
  {
    name: "Netflix",
    stat: "US$ 1 bilhão/ano",
    context:
      "economizados em retenção graças ao algoritmo que personaliza o que você assiste.",
  },
  {
    name: "JPMorgan",
    stat: "360 mil horas",
    context:
      "de análise jurídica feitas em segundos pelo sistema COIN de IA.",
  },
  {
    name: "Spotify",
    stat: "40 milhões",
    context:
      "de ouvintes no primeiro mês do Discover Weekly, a playlist gerada por IA.",
  },
  {
    name: "Airbnb",
    stat: "+20% de receita",
    context:
      "para anfitriões que usam o Smart Pricing, a precificação dinâmica por IA.",
  },
  {
    name: "McDonald's",
    stat: "-10% de desperdício",
    context:
      "com cardápios dinâmicos que ajustam ofertas por IA em tempo real.",
  },
];

const STAGGER = 0.12; // 120ms entre cards (§7) — cascata mais visível

export function Market() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <ScrollReveal>
          <p className="text-eyebrow text-text-secondary">O mercado já decidiu</p>
          <h2 className="text-display-lg mt-3 max-w-3xl text-balance text-text-primary">
            Quem entendeu cedo, saiu na frente.
          </h2>
          <p className="text-body-lg mt-4 max-w-[600px] text-text-secondary">
            As maiores empresas do mundo não usam IA por moda. Usam porque dá
            resultado mensurável. A diferença é que agora isso cabe na sua
            empresa também.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANIES.map((c, i) => (
              <ScrollReveal key={c.name} delay={i * STAGGER}>
                <div className="flex h-full flex-col rounded-lg border-[0.5px] border-border bg-surface-2 p-6">
                  <h3 className="text-heading text-text-primary">{c.name}</h3>
                  <p className="text-display-sm mt-3 text-accent">{c.stat}</p>
                  <p className="text-body-sm mt-2 text-text-secondary">
                    {c.context}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        <ScrollReveal delay={STAGGER * 2}>
          <p className="text-display-md mx-auto mt-12 max-w-3xl text-balance text-center text-text-primary">
            Seu concorrente já está se movendo. A pergunta é: e você?
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
