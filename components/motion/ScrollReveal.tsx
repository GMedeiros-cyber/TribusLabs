"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** atraso em segundos — use index * 0.1 para stagger entre cards. */
  delay?: number;
  /** sentido da entrada: "up" (padrão), "down", "left" ou "right". */
  from?: Direction;
}

// Deslocamento inicial por direção (o elemento entra a partir desse offset → 0).
const OFFSET = 80;
const FROM_OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: OFFSET }, // começa abaixo, sobe
  down: { y: -OFFSET }, // começa acima, desce
  left: { x: -OFFSET }, // começa à esquerda, entra pra direita
  right: { x: OFFSET }, // começa à direita, entra pra esquerda
};

// Revelação cinematográfica ligada ao scroll (GSAP ScrollTrigger + useGSAP).
// Entra de { opacity: 0, +offset direcional } → { opacity: 1, x/y: 0 } quando o
// elemento chega a 85% da viewport e PERMANECE visível (play none none none).
// • Client-only via useGSAP → sem execução no SSR (server renderiza um <div>
//   neutro e VISÍVEL; o opacity:0 só entra após montar, antes do paint, sem
//   flash e sem mismatch de hidratação).
// • Respeita prefers-reduced-motion via gsap.matchMedia: se reduzido, nenhum
//   tween é criado → o conteúdo fica no estado final (visível), sem animar.
// • Cleanup automático do useGSAP + mm.revert() ao desmontar.
export function ScrollReveal({
  children,
  className,
  delay = 0,
  from = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          ...FROM_OFFSET[from],
          duration: 0.9,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            // sem reverse: depois de entrar, fica visível (não some ao subir).
            toggleActions: "play none none none",
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [from, delay] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
