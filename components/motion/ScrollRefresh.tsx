"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Recalcula as posições dos ScrollTriggers depois que o layout assenta
// (fontes carregando, conteúdo que muda de altura). Sem isso, triggers podem
// ser calculados em posição errada e revelar/parallax disparam na hora errada.
export function ScrollRefresh() {
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    refresh();
    // Recalcula quando as webfonts terminam de carregar (mudam a altura do texto).
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    // E após o load completo (imagens/shader).
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
