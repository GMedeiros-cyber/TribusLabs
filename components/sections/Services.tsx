"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Database,
  Globe,
  LayoutGrid,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

// §11/03 — O que entregamos. 6 "funcionários digitais" como cards (§9).
type Service = { icon: LucideIcon; title: string; description: string };

const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "Site que converte",
    description:
      "Não só um site que existe. Um site pensado pra transformar visita em cliente.",
  },
  {
    icon: MessagesSquare,
    title: "Automação dos canais",
    description:
      "WhatsApp, Instagram e mais — respondendo e organizando sozinhos.",
  },
  {
    icon: Bot,
    title: "Agente de IA",
    description: "Atende, agenda e cobra pela sua empresa. 24 horas por dia.",
  },
  {
    icon: Database,
    title: "Banco de dados e CRM",
    description: "Seus contatos e histórico organizados. Seu, pra sempre.",
  },
  {
    icon: LayoutGrid,
    title: "Estrutura digital completa",
    description: "A infraestrutura que antes só empresa grande tinha.",
  },
  {
    icon: Sparkles,
    title: "Conteúdo visual",
    description: "Material pensado pra atrair e vender, não só pra postar.",
  },
];

const STAGGER = 0.12; // 120ms entre cards (§7) — cascata mais visível

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-20 bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <ScrollReveal>
          <p className="text-eyebrow text-text-secondary">Serviços</p>
          <h2 className="text-display-lg mt-3 max-w-3xl text-balance text-text-primary">
            Seis funcionários digitais. Um sistema só.
          </h2>
          <p className="text-body-lg mt-4 max-w-[600px] text-text-secondary">
            Cada peça resolve uma parte da sua operação. Juntas, elas
            substituem o trabalho de um time inteiro.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.title} delay={i * STAGGER}>
                  <article className="service-card h-full">
                    <Icon className="h-6 w-6 text-accent" aria-hidden />
                    <h3 className="text-heading mt-4 text-text-primary">
                      {s.title}
                    </h3>
                    <p className="text-body-sm mt-2 text-text-secondary">
                      {s.description}
                    </p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
      </div>
    </section>
  );
}
