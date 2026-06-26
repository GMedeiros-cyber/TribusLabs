"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** deslocamento total em px: entra em +amount/2 e sai em -amount/2. */
  amount?: number;
}

// Parallax sutil ligado ao scroll (GSAP ScrollTrigger + useGSAP).
// O elemento entra deslocado para baixo (+amount/2) e sai deslocado para cima
// (-amount/2), com scrub 1:1 → drift mais "rápido" que a página = profundidade.
// • Client-only via useGSAP → sem execução no SSR, sem mismatch de hidratação
//   (no servidor renderiza um <div> neutro; o transform só entra após montar).
// • Respeita prefers-reduced-motion via gsap.matchMedia (não anima se reduzido).
// • Cleanup automático do useGSAP + mm.revert() ao desmontar.
export function Parallax({ children, className, amount = 48 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { y: amount / 2 },
          {
            y: -amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
