"use client";

import { motion } from "motion/react";
import type { TargetAndTransition, Transition } from "motion/react";
import { useReducedMotion } from "motion/react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useMounted } from "@/components/motion/useMounted";

// Entrada on-mount (initial→animate), variante do Reveal (que usa whileInView).
// Mesma proteção de hidratação: enquanto !mounted (SSR + 1º paint) ou com
// prefers-reduced-motion, renderiza o estado FINAL visível (sem transform),
// idêntico servidor/cliente. Ao montar (sem reduce), troca para motion.* e a
// entrada toca no cliente. Mantém o conteúdo visível sem JS.
type AppearTag = "div" | "nav" | "p" | "h1" | "section" | "span";

interface AppearProps {
  as?: AppearTag;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** estado inicial (oculto), ex.: { opacity: 0, y: 20 } */
  from: TargetAndTransition;
  /** estado final (visível) — padrão { opacity: 1, y: 0 } */
  to?: TargetAndTransition;
  transition?: Transition;
}

const DEFAULT_TO: TargetAndTransition = { opacity: 1, y: 0 };

export function Appear({
  as = "div",
  children,
  className,
  style,
  from,
  to = DEFAULT_TO,
  transition,
}: AppearProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();

  if (!mounted || reduce) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] as ElementType;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={from}
      animate={to}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}
