import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

// Interactive Hover Button (inspira-ui é Vue-first; recriado fielmente em
// React/Tailwind). Efeito: no hover o texto desliza/some pra direita, um
// preenchimento accent cresce da esquerda (scale-x) e o texto reaparece da
// esquerda com a seta. Estilizado p/ o hero escuro (borda clara + fill accent).
// prefers-reduced-motion: as transições são CSS → o bloco global (§7) zera a
// duração, então o estado de hover aplica instantâneo, sem movimento.
interface InteractiveHoverButtonProps extends ComponentProps<"button"> {
  text?: string;
}

export function InteractiveHoverButton({
  text = "Button",
  className = "",
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      className={`group relative cursor-pointer overflow-hidden rounded-full border border-white/20 bg-white/[0.03] px-8 py-3 text-sm font-medium text-white backdrop-blur-sm ${className}`}
      {...props}
    >
      {/* texto padrão — define a largura; some/desliza no hover */}
      <span className="relative z-20 inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-[150%] group-hover:opacity-0">
        {text}
      </span>

      {/* texto + seta que entram da esquerda (escuro sobre o fill accent) */}
      <span className="absolute inset-0 z-10 flex -translate-x-[30%] items-center justify-center gap-2 whitespace-nowrap font-medium text-[#09090B] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        {text}
        <ArrowRight className="h-4 w-4" />
      </span>

      {/* preenchimento accent que cresce da esquerda */}
      <span
        aria-hidden
        className="absolute inset-0 z-0 origin-left scale-x-0 bg-[#60A5FA] transition-transform duration-300 group-hover:scale-x-100"
      />
    </button>
  );
}
