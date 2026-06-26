"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { HeroDitheringBackground } from "@/components/sections/HeroDitheringBackground";
import { Navbar } from "@/components/sections/Navbar";
import { Appear } from "@/components/motion/Appear";
import { Parallax } from "@/components/motion/Parallax";
import { LayeredText } from "@/components/ui/layered-text";

// Nova hero por vídeo (Prompt 8). Tela cheia (100vh), fundo preto + vídeo HLS,
// navbar glass + CTA de captura de e-mail. Decisão híbrida: headline/CTA em
// PT-BR Tribus; tagline e "Play Video Demo" mantidos como no spec por ora.

const PROMPT_TEXT = "Seu melhor e-mail para o diagnóstico";
const SUCCESS_TEXT = "Pronto! Retornamos em até 24h";
const TYPE_MS = 60;
const RESET_MS = 4000;

export function Hero() {
  const [mode, setMode] = useState<"button" | "form">("button");
  const [submitted, setSubmitted] = useState(false);
  const [typed, setTyped] = useState("");
  const [email, setEmail] = useState("");

  // Typewriter: digita o placeholder ao abrir o form e ao confirmar o envio.
  useEffect(() => {
    if (mode !== "form") return;
    const target = submitted ? SUCCESS_TEXT : PROMPT_TEXT;
    let i = 0;
    const id = setInterval(() => {
      setTyped(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        return;
      }
      i++;
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [mode, submitted]);

  // Após enviar, volta ao estado de botão em 4s.
  useEffect(() => {
    if (!submitted) return;
    const id = setTimeout(() => {
      setSubmitted(false);
      setMode("button");
      setEmail("");
    }, RESET_MS);
    return () => clearTimeout(id);
  }, [submitted]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar ao backend/n8n/webhook
    setSubmitted(true);
  };

  return (
    <div
      id="top"
      className="relative bg-black h-screen w-full flex flex-col overflow-hidden selection:bg-white selection:text-black"
    >
      <Parallax className="absolute inset-0 pointer-events-none" amount={80}>
        <HeroDitheringBackground />
      </Parallax>
      <Navbar />

      <section className="relative flex-1 flex items-center px-6">
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* COLUNA ESQUERDA — tipografia 3D (LayeredText). Oculta no mobile p/ evitar overflow do skew. */}
          <Appear
            as="div"
            from={{ opacity: 0, x: -20 }}
            to={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex justify-start order-1"
          >
            <LayeredText className="text-white" />
          </Appear>

          {/* COLUNA DIREITA — na ponta: tagline + CTA "Diagnóstico gratuito" (botão ↔ form) */}
          <div className="order-2 flex flex-col items-center md:items-end gap-8 text-center md:text-right">
          {/* Tagline */}
          <Appear
            as="p"
            from={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase"
          >
            BUILD A NO-CODE AI APP IN MINUTES
          </Appear>

          {/* CTA — botão ↔ form de e-mail (Tribus PT-BR) */}
          <Appear
            as="div"
            from={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.4 }}
            className="min-h-[50px]"
          >
            <AnimatePresence mode="wait">
              {mode === "button" ? (
                <motion.button
                  key="button"
                  type="button"
                  onClick={() => setMode("form")}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-10 py-3 text-[14px] font-medium border border-white/10 rounded-full hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300 text-white/90 backdrop-blur-sm cursor-pointer"
                >
                  Diagnóstico gratuito
                </motion.button>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 pl-5 pr-1.5 py-1.5 text-[14px] font-medium border border-white/20 rounded-full bg-white/[0.02] backdrop-blur-sm w-full max-w-[320px] focus-within:border-white/40 transition-colors duration-300"
                >
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={typed}
                    aria-label="E-mail para diagnóstico gratuito"
                    className="flex-1 min-w-0 bg-transparent text-white placeholder:text-white/45 outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Enviar e-mail"
                    className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-white text-black hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={submitted ? "check" : "arrow"}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex"
                      >
                        {submitted ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Appear>
          </div>
        </div>
      </section>
    </div>
  );
}
