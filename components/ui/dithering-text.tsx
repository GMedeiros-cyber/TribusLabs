"use client";

import { useEffect, useState } from "react";
import { HeroDitheringBackground } from "@/components/sections/HeroDitheringBackground";

// DitheringText — tipografia preenchida pelo MESMO fundo dithering da hero.
// Técnica: máscara CSS (mask-image via SVG data URL) recorta o shader no formato
// do texto. O viewBox é dimensionado pela LARGURA REAL do texto (medida no canvas);
// com mask-size:contain a máscara escala p/ caber na coluna sem nunca cortar palavra,
// independente da largura da tela. Texto em uma linha → "QUEM" e "SOMOS?" lado a lado.

// A fonte usada DENTRO do SVG data URL (sem acesso à webfont self-hosted) e a fonte
// usada na MEDIÇÃO precisam bater p/ o viewBox refletir a largura renderizada.
const SVG_FONT = "'Arial Black',Arial,sans-serif";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

interface DitheringTextProps {
  text: string;
  className?: string;
  /** tamanho da fonte em unidades do viewBox (não em px de tela). */
  fontSize?: number;
}

export function DitheringText({
  text,
  className = "",
  fontSize = 200,
}: DitheringTextProps) {
  // largura inicial estimada (SSR / antes da medição) → evita "pulo" perceptível.
  const [width, setWidth] = useState(() => text.length * fontSize * 0.62);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = `700 ${fontSize}px ${SVG_FONT}`;
    setWidth(ctx.measureText(text).width + fontSize * 0.3);
  }, [text, fontSize]);

  const height = fontSize * 1.25;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><text x="${width / 2}" y="${height / 2}" text-anchor="middle" dominant-baseline="middle" font-family="${SVG_FONT}" font-weight="700" font-size="${fontSize}" fill="black">${escapeXml(text)}</text></svg>`;
  const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

  const maskStyle = {
    WebkitMaskImage: maskUrl,
    maskImage: maskUrl,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  } as const;

  return (
    <div className={`relative ${className}`} role="img" aria-label={text}>
      <div className="absolute inset-0" style={maskStyle}>
        <HeroDitheringBackground />
      </div>
    </div>
  );
}
