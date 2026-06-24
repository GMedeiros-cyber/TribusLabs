"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useMounted } from "@/components/motion/useMounted";

// --ease-out (DESIGN.md §7) = cubic-bezier(0, 0, 0.2, 1)
const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** atraso em segundos — use 0.06 * index para stagger de 60ms (§7). */
  delay?: number;
}

// §7 — reveal scroll-triggered: opacity 0→1 + translateY 24px→0, 400ms, ease-out,
// dispara ao entrar na viewport (once). prefers-reduced-motion → estado final direto.
// Antes de montar (SSR + 1º paint) renderiza o estado FINAL (visível, sem
// transform): HTML idêntico servidor/cliente (sem mismatch) e conteúdo visível
// sem JS. Só anima depois de montado, se reduce-motion estiver desligado.
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
