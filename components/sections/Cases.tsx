"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type Case = {
  segment: string;
  name: string;
  challenge: string;
  result: string;
  context: string;
  placeholder?: boolean;
};

// NÃO inventar resultados de clientes inexistentes: 1 case real + placeholders
// claramente marcados pra Gabriel preencher depois.
const CASES: Case[] = [
  {
    segment: "Excursões escolares",
    name: "Empresa de excursões escolares",
    challenge: "Leads no WhatsApp se perdiam e as cobranças ficavam pra trás.",
    result: "R$ 15 mil",
    context:
      "recuperados em 2 passeios — com agente de WhatsApp, CRM e assistente de cobrança.",
  },
  // TODO: case a confirmar com Gabriel
  {
    segment: "Segmento a confirmar",
    name: "Próximo case",
    challenge: "Desafio operacional a documentar.",
    result: "A confirmar",
    context: "Resultado a validar com o cliente antes de publicar.",
    placeholder: true,
  },
  // TODO: case a confirmar com Gabriel
  {
    segment: "Segmento a confirmar",
    name: "Próximo case",
    challenge: "Desafio operacional a documentar.",
    result: "A confirmar",
    context: "Resultado a validar com o cliente antes de publicar.",
    placeholder: true,
  },
];

export function Cases() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Dot ativo via IntersectionObserver (sem scroll listener — perf §13).
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.index));
          }
        });
      },
      { root, threshold: 0.6 },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(i, CASES.length - 1));
    cardRefs.current[clamped]?.scrollIntoView({
      behavior,
      inline: "start",
      block: "nearest",
    });
  };

  const step = (dir: 1 | -1) => {
    const root = scrollerRef.current;
    const card = cardRefs.current[0];
    if (!root || !card) return;
    root.scrollBy({ left: dir * (card.offsetWidth + 16), behavior });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <section id="cases" className="scroll-mt-20 bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="px-6 md:px-12">
          <ScrollReveal>
            <p className="text-eyebrow text-text-secondary">Resultados reais</p>
            <h2 className="text-display-lg mt-3 max-w-3xl text-balance text-text-primary">
              Não é promessa. É o que já entregamos.
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          {/* carousel — scroll-snap horizontal, peek do próximo card */}
          <div
            ref={scrollerRef}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Cases reais"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 px-6 pb-2 md:scroll-pl-12 md:px-12"
          >
            {CASES.map((c, i) => (
              <article
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-index={i}
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${CASES.length}`}
                className={`flex h-auto w-[calc(100vw-64px)] shrink-0 snap-start flex-col rounded-lg bg-surface-1 p-6 sm:w-[360px] ${
                  c.placeholder
                    ? "border border-dashed border-border-hover"
                    : "border-[0.5px] border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-eyebrow text-text-secondary">
                    {c.segment}
                  </span>
                  {c.placeholder && (
                    <span className="rounded-pill border-[0.5px] border-border-hover px-2 py-0.5 text-caption text-text-secondary">
                      a confirmar
                    </span>
                  )}
                </div>
                <h3 className="text-heading mt-2 text-text-primary">{c.name}</h3>
                <p className="text-body-sm mt-3 text-text-secondary">
                  {c.challenge}
                </p>
                <div className="mt-auto pt-6">
                  <p className="text-display-sm text-accent">{c.result}</p>
                  <p className="text-body-sm mt-1 text-text-secondary">
                    {c.context}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* controles: setas (desktop) + dots */}
          <div className="mt-6 flex items-center justify-center gap-4 px-6 md:px-12">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Case anterior"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary md:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {CASES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir para o case ${i + 1}`}
                  aria-current={active === i ? "true" : undefined}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    active === i ? "bg-accent" : "bg-text-muted hover:bg-text-secondary"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Próximo case"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary md:inline-flex"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
