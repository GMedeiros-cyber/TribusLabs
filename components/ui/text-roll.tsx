"use client";

import { motion } from "motion/react";
import React from "react";

import { cn } from "@/lib/utils";

// TextRoll (Skiper58 / 21st.dev). Lista vertical de palavras com efeito de "roll"
// no hover: a palavra sobe e a cópia abaixo entra, letra a letra (stagger).
// Adaptado ao projeto: import de `motion/react` (não framer-motion) e default
// left-aligned p/ a hero. As palavras são as mesmas da tipografia 3D anterior.

const DEFAULT_WORDS = [
  "FUTURO",
  "SISTEMA",
  "ESTRUTURA",
  "CONTROLE",
  "RESULTADO",
  "DOMINIO",
];

interface TextRollListProps {
  words?: string[];
  className?: string;
  /** centraliza o stagger (efeito a partir do meio da palavra). */
  center?: boolean;
}

export const TextRollList = ({
  words = DEFAULT_WORDS,
  className,
  center = false,
}: TextRollListProps) => {
  return (
    <ul
      className={cn(
        "flex w-full flex-col items-start justify-center gap-1.5",
        className,
      )}
    >
      {words.map((word, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-start overflow-visible"
          key={index}
        >
          <div className="relative flex items-start">
            <TextRoll
              center={center}
              className="text-5xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-7xl"
            >
              {word}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  );
};

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export { TextRoll };
