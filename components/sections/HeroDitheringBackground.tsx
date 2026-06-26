"use client";

import { Suspense, lazy } from "react";

// Fundo animado da hero: shader "dithering" (warp) do @paper-design/shaders-react,
// recolorido para o azul de acento do design (#60A5FA). Substitui o vídeo HLS.
// Lazy + Suspense: code-splita o bundle WebGL e evita SSR do canvas.
const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((m) => ({ default: m.Dithering })),
);

export function HeroDitheringBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        {/* mix-blend-screen + opacidade: o dither azul "brilha" sobre o preto da hero.
            Camada levemente maior (-top/h-120%) p/ o drift do parallax não revelar borda. */}
        <div className="absolute inset-x-0 -top-[10%] h-[120%] opacity-50 mix-blend-screen">
          <Dithering
            colorBack="#00000000"
            colorFront="#60A5FA"
            shape="warp"
            type="4x4"
            speed={0.25}
            minPixelRatio={1}
            className="size-full"
          />
        </div>
      </Suspense>
    </div>
  );
}
