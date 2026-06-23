"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

// --ease-out (§7)
const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];

// §11/05 — Como funciona. 3 etapas: diagnóstico → construção → entrega.
const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Entendemos onde sua operação trava. O que toma seu tempo, o que faz você perder cliente, o que dá pra automatizar.",
  },
  {
    n: "02",
    title: "Construção",
    desc: "Desenvolvemos tudo sob medida pro seu negócio. Site, agente, automações e CRM — integrados desde o primeiro dia.",
  },
  {
    n: "03",
    title: "Entrega das chaves",
    desc: "O sistema vai pro ar e a propriedade é sua. Acesso total, dados na sua mão, sem cordão umbilical.",
  },
];

const STAGGER = 0.06; // 60ms entre steps (§7)

// Conector horizontal entre steps (desktop) — cresce com scaleX 0→1 da esquerda.
// 1px, accent @30%. Some no mobile. Respeita reduced-motion (estado final direto).
function Connector({ delay }: { delay: number }) {
  const reduce = useReducedMotion();
  const className =
    "absolute left-14 right-[-1.5rem] top-5 hidden h-px origin-left bg-accent/30 md:block";

  if (reduce) return <div className={className} aria-hidden />;

  return (
    <motion.div
      aria-hidden
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay }}
    />
  );
}

export function Process() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <Reveal>
          <p className="text-eyebrow text-text-secondary">Processo</p>
          <h2 className="text-display-lg mt-3 max-w-3xl text-balance text-text-primary">
            Do diagnóstico à chave na mão.
          </h2>
          <p className="text-body-lg mt-4 max-w-[600px] text-text-secondary">
            Três etapas. Sem enrolação, sem mensalidade surpresa. Quando termina,
            o sistema é seu.
          </p>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * STAGGER} className="relative">
                {i < STEPS.length - 1 && (
                  <Connector delay={i * STAGGER + 0.15} />
                )}
                <span className="flex h-10 items-center font-mono text-4xl font-medium leading-none text-accent">
                  {s.n}
                </span>
                <h3 className="text-heading mt-4 text-text-primary">{s.title}</h3>
                <p className="text-body-sm mt-2 max-w-xs text-text-secondary">
                  {s.desc}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
