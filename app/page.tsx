import { ThemeToggle } from "@/components/ui/ThemeToggle";

// TEMPORARY placeholder. The real QA page (PROMPT §6 — typographic scale +
// color swatches + Button variants) is built once TRIBUS_LABS_DESIGN.md is
// provided. This page only proves the foundation: fonts + dark/light toggle.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
      <header className="flex items-center justify-between">
        <span className="font-mono text-sm uppercase tracking-widest opacity-60">
          Tribus Labs
        </span>
        <ThemeToggle />
      </header>

      <h1 className="font-display text-3xl font-semibold">
        Fundação técnica pronta.
      </h1>

      <p className="font-body leading-relaxed opacity-80">
        Next.js + Tailwind v4 + next-themes configurados. As fontes (Space
        Grotesk / Inter / JetBrains Mono) e o toggle dark/light já funcionam —
        use o botão acima para alternar o tema.
      </p>

      <div className="rounded-md border border-current/15 p-4 text-sm leading-relaxed opacity-80">
        <strong className="font-display font-semibold">
          Aguardando TRIBUS_LABS_DESIGN.md.
        </strong>{" "}
        Os tokens reais (cores §2, espaçamento §4, radius §5, motion §7), o
        componente Button (§9) e a página de QA com a escala tipográfica (§3) +
        swatches serão construídos assim que a especificação for fornecida. As
        cores atuais são placeholders neutros — não o design final.
      </div>
    </main>
  );
}
