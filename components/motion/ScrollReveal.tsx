"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** atraso em segundos — use index * 0.1 para stagger entre cards. */
  delay?: number;
}

// Revelação cinematográfica ligada ao scroll (GSAP ScrollTrigger + useGSAP).
// Entra de { opacity: 0, y: 60 } → { opacity: 1, y: 0 } quando o elemento chega
// a 80% da viewport; reverte ao sair pra cima (toggleActions play/reverse).
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
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
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
