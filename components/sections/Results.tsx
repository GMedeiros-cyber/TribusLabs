"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

// §11/02 — Resultados que entregamos. Mostra VALOR DE NEGÓCIO (o que o cliente
// ganha), nunca dor/problema. Número grande em accent + label + contexto curto.
const RESULTS = [
  {
    value: "R$ 15 mil",
    label: "Recuperados em 2 passeios",
    context:
      "ROI real de um cliente que automatizou atendimento e cobrança.",
  },
  {
    value: "24h",
    label: "De atendimento sem parar",
    context:
      "Seu agente de IA responde, agenda e cobra mesmo fora do horário comercial.",
  },
  {
    value: "0",
    label: "Leads perdidos por demora",
    context: "Toda mensagem no WhatsApp respondida na hora, mesmo no pico.",
  },
  {
    value: "30 dias",
    label: "Da primeira conversa à entrega",
    context: "Sistema completo no ar, pronto pra operar.",
  },
];

const STAGGER = 0.06; // 60ms entre cards (§7)

export function Results() {
  return (
    <section
      id="resultados"
      className="scroll-mt-20 bg-surface-1 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <Parallax>
          <Reveal>
            {/* eyebrow em secondary (regra global — AA) */}
            <p className="text-eyebrow text-text-secondary">O que você ganha</p>
            <h2 className="text-display-lg mt-3 max-w-3xl text-balance text-text-primary">
              Resultado que aparece no caixa, não no relatório.
            </h2>
          </Reveal>
        </Parallax>

        <Parallax className="mt-12" amount={28}>
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RESULTS.map((r, i) => (
              <Reveal key={r.label} delay={i * STAGGER}>
                <div className="flex h-full flex-col">
                  <dt>
                    <span className="text-display-md text-accent">{r.value}</span>
                    <span className="text-eyebrow mt-3 block text-text-secondary">
                      {r.label}
                    </span>
                  </dt>
                  <dd className="text-body-sm mt-2 text-text-secondary">
                    {r.context}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Parallax>
      </div>
    </section>
  );
}
