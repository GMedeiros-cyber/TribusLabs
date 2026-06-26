import type { ComponentProps } from "react";

// ShimmerText (equivalente ao 21st.dev/tom_ui/shimmer-text — recriado em
// React/Tailwind porque o projeto não tem components.json p/ a shadcn CLN).
// O brilho varre o texto via background-position animado, clipado ao texto.
// prefers-reduced-motion: o bloco global em globals.css (§7) já zera a duração
// das animações → o texto fica estático e legível (sem tratamento extra).
export function ShimmerText({
  children,
  className = "",
  ...props
}: ComponentProps<"span">) {
  return (
    <span className={`shimmer-text ${className}`} {...props}>
      {children}
    </span>
  );
}
