"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { BackgroundVideo } from "@/components/sections/BackgroundVideo";
import { Navbar } from "@/components/sections/Navbar";
import { Appear } from "@/components/motion/Appear";

// Nova hero por vídeo (Prompt 8). Tela cheia (100vh), fundo preto + vídeo HLS,
// navbar glass + CTA de captura de e-mail. Decisão híbrida: headline/CTA em
// PT-BR Tribus; tagline e "Play Video Demo" mantidos como no spec por ora.

const HEADING_EASE = [0.16, 1, 0.3, 1] as const;
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
      <BackgroundVideo />
      <Navbar />

      <section className="relative flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center w-full gap-12">
          {/* Tagline (mantida como no spec, por ora) */}
          <Appear
            as="p"
            from={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase mb-4"
          >
            BUILD A NO-CODE AI APP IN MINUTES
          </Appear>

          {/* Headline — Tribus PT-BR, em Instrument Serif */}
          <Appear
            as="h1"
            from={{ opacity: 0, y: 20 }}
            transition={{ duration: 1, ease: HEADING_EASE }}
            style={{ fontFamily: "var(--font-serif), 'Instrument Serif', serif" }}
            className="text-4xl md:text-[64px] font-medium tracking-[-0.01em] leading-[1.1] mb-6 bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent max-w-4xl"
          >
            Você não assina. Você não aluga.
            <br className="hidden md:block" /> Você possui.
          </Appear>

          {/* CTA — botão ↔ form de e-mail (Tribus PT-BR) */}
          <Appear
            as="div"
            from={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.4 }}
            className="min-h-[50px] mt-2"
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

          {/* Play demo (mantido como no spec, por ora) */}
          <Appear as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <a
              href="#"
              className="text-white/80 hover:text-white/40 transition-colors duration-300 text-[13px] font-medium tracking-wide"
            >
              Play Video Demo
            </a>
          </Appear>
        </div>
      </section>
    </div>
  );
}
