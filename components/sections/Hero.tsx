"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

// HEADLINE — escolha do Gabriel. Opção 1 ativa por padrão.
// Para trocar: comente a OPTION_1 e descomente a 2 ou 3 (ajuste o `active`).
const HEADLINE_OPTION_1 = {
  headline: "Você não assina. Você não aluga. Você possui.",
  subhead:
    "Funcionários digitais que atendem, agendam e cobram pela sua empresa. O sistema é seu, pra sempre — sem mensalidade de agência.",
};
// const HEADLINE_OPTION_2 = {
//   headline: "Uma empresa só. Tudo resolvido.",
//   subhead:
//     "Site, automação, agente de IA e CRM próprio. A estrutura digital que antes só empresa grande tinha — agora cabe na sua.",
// };
// const HEADLINE_OPTION_3 = {
//   headline: "Pare de fazer o trabalho que dois fariam.",
//   subhead:
//     "A Tribus constrói os funcionários digitais que cuidam da sua operação 24h. Você foca no negócio. O sistema faz o resto.",
// };
const { headline, subhead } = HEADLINE_OPTION_1;

// Social proof (acima da dobra) — número em JetBrains Mono, label em Inter.
const STATS = [
  { value: "R$ 15.000", label: "recuperados em 2 passeios" },
  { value: "100%", label: "do sistema é do cliente" },
  { value: "30 dias", label: "para a entrega completa" },
];

const STAGGER = 0.06; // 60ms entre elementos (§7)

export function Hero() {
  return (
    <section
      id="top"
      className="hero-bg relative flex min-h-[90vh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center md:pt-32"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        {/* 1 · eyebrow — §01 pede "muted"; uso text-secondary p/ passar AA (4.5:1) */}
        <Reveal delay={STAGGER * 0}>
          <p className="text-eyebrow text-text-secondary">
            TRIBUS LABS · GUARULHOS/SP
          </p>
        </Reveal>

        {/* 2 · headline */}
        <Reveal delay={STAGGER * 1} className="mt-5">
          <h1 className="text-display-xl text-balance text-text-primary">
            {headline}
          </h1>
        </Reveal>

        {/* 3 · subheadline */}
        <Reveal delay={STAGGER * 2} className="mt-6">
          <p className="text-body-lg mx-auto max-w-[580px] text-text-secondary">
            {subhead}
          </p>
        </Reveal>

        {/* 4 · CTAs (gap 12px) */}
        <Reveal delay={STAGGER * 3} className="mt-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href="#contato" variant="primary">
              Diagnóstico gratuito
            </Button>
            <Button href="#como-funciona" variant="secondary">
              Ver como funciona
            </Button>
          </div>
        </Reveal>

        {/* 5 · social proof — empilha no mobile, linha c/ divisor no desktop */}
        <Reveal delay={STAGGER * 4} className="mt-14 w-full">
          <dl className="mx-auto flex max-w-2xl flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0">
            {STATS.map((s) => (
              <div
                key={s.value}
                className="flex flex-1 flex-col items-center gap-1 px-6 py-3 sm:py-0"
              >
                <dt className="font-mono text-sm font-medium text-text-primary">
                  {s.value}
                </dt>
                <dd className="text-caption text-text-secondary">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
