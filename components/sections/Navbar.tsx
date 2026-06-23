"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";

// --ease-out (§7)
const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Cases", href: "#cases" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // §9 — sticky-on-scroll-up via MotionValue (NUNCA addEventListener('scroll')).
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 8);
    if (menuOpen) return; // não esconde a navbar com o menu aberto
    if (latest > previous && latest > 120) {
      setHidden(true); // descendo → esconde
    } else {
      setHidden(false); // subindo → reaparece
    }
  });

  // menu mobile: fecha no Escape e trava o scroll do body enquanto aberto.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={reduce ? false : { y: -4, opacity: 0 }}
      animate={{
        y: hidden && !reduce ? "-100%" : 0,
        opacity: hidden && !reduce ? 0 : 1,
      }}
      transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || menuOpen ? "navbar-scrolled" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6 md:h-16 md:px-12">
        {/* Logo (esquerda) */}
        {/* TODO: substituir por <Logo /> SVG */}
        <a
          href="#top"
          className="shrink-0 font-display text-base font-semibold tracking-tight text-text-primary md:text-lg"
        >
          TRIBUS LABS
        </a>

        {/* Nav links (centro, desktop) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-label text-text-secondary transition-colors hover:text-text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Direita: toggle + CTA + hamburger (mobile) */}
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Button
            href="#contato"
            variant="primary"
            className="whitespace-nowrap px-3.5 text-[13px] md:px-6 md:text-[15px]"
          >
            Diagnóstico gratuito
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-2 text-text-primary transition-colors hover:border-border-hover md:hidden"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="hidden text-label sm:inline">Menu</span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="navbar-scrolled border-t border-border md:hidden"
          >
            <ul className="mx-auto flex max-w-[1200px] flex-col px-6 py-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-heading text-text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
