"use client";

import { Appear } from "@/components/motion/Appear";
import { SlideTabs } from "@/components/ui/slide-tabs";

// Navbar do hero: logo Tribus Labs (canto sup. esq., absoluto) + SlideTabs
// CENTRALIZADA. Botões Sign Up/Login removidos — a slide-nav substitui a navbar
// antiga (decisão do usuário). Logo: public/logo_tribus_labs.svg.

export function Navbar() {
  return (
    <Appear
      as="nav"
      from={{ opacity: 0, y: -20 }}
      to={{ opacity: 1, y: 0 }}
      className="relative z-20 px-6 py-6 w-full"
    >
      {/* relative: âncora p/ o logo absoluto à esquerda; SlideTabs centralizada via mx-auto */}
      <div className="relative flex items-center justify-center max-w-6xl mx-auto">
        <a
          href="#top"
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo_tribus_labs.svg"
            alt="Tribus Labs"
            width={200}
            className="h-auto w-[140px] md:w-[180px]"
          />
        </a>

        <SlideTabs />
      </div>
    </Appear>
  );
}
