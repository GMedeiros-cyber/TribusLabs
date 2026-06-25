"use client";

import { Globe } from "lucide-react";
import { Appear } from "@/components/motion/Appear";

// Navbar glassmorphism da nova hero por vídeo (spec do Prompt 8).
// Logo: ícone Globe placeholder até o SVG da Tribus chegar; wordmark = marca.
// Links/labels mantidos como no spec (inglês) "por ora" — decisão híbrida.
const NAV_LINKS = ["Features", "Pricing", "About"];

export function Navbar() {
  return (
    <Appear
      as="nav"
      from={{ opacity: 0, y: -20 }}
      to={{ opacity: 1, y: 0 }}
      className="relative z-20 px-6 py-6 w-full"
    >
      <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-8">
          <a href="#top" className="flex items-center gap-2">
            {/* TODO: substituir Globe pelo <Logo /> SVG da Tribus Labs */}
            <Globe className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">Tribus Labs</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-white hover:text-white/80 transition-colors text-sm font-medium cursor-pointer"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </Appear>
  );
}
