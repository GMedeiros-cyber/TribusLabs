import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";

// TEMPORARY QA page (PROMPT 1b §6). Valida tokens da TRIBUS_LABS_DESIGN.md:
// escala tipográfica (§3), cores semânticas (§2), botões (§9) e o toggle —
// tudo reagindo a dark/light. Será substituída pelas seções reais depois.

const typeScale = [
  { cls: "text-display-xl", spec: "Space Grotesk · 700 · 72/44px · LS -3px", sample: "O sistema é seu." },
  { cls: "text-display-lg", spec: "Space Grotesk · 700 · 56/36px · LS -2.5px", sample: "O sistema é seu." },
  { cls: "text-display-md", spec: "Space Grotesk · 700 · 40/28px · LS -2px", sample: "O sistema é seu." },
  { cls: "text-display-sm", spec: "Space Grotesk · 600 · 30/24px · LS -1px", sample: "O sistema é seu." },
  { cls: "text-heading", spec: "Space Grotesk · 600 · 20/18px · LS -0.5px", sample: "Heading de componente" },
  { cls: "text-body-lg", spec: "Inter · 400 · 18/17px · LH 1.7", sample: "Você não assina. Você não aluga. Você possui." },
  { cls: "text-body-md", spec: "Inter · 400 · 16/15px · LH 1.65", sample: "Você não assina. Você não aluga. Você possui." },
  { cls: "text-body-sm", spec: "Inter · 400 · 14px · LH 1.6", sample: "Você não assina. Você não aluga. Você possui." },
  { cls: "text-label", spec: "Inter · 500 · 13px · LS 0.04em", sample: "Label / badge" },
  { cls: "text-eyebrow", spec: "JetBrains Mono · 400 · 11px · LS 0.1em · uppercase", sample: "Tribus Labs · Guarulhos/SP" },
  { cls: "text-caption", spec: "Inter · 400 · 12px · LH 1.5", sample: "Caption / rodapé" },
] as const;

const colorTokens = [
  { token: "--color-bg", dark: "#09090B", light: "#FAFAFA" },
  { token: "--color-surface-1", dark: "#111115", light: "#F4F4F5" },
  { token: "--color-surface-2", dark: "#1C1C22", light: "#FFFFFF" },
  { token: "--color-surface-3", dark: "#27272D", light: "#E4E4E7" },
  { token: "--color-border", dark: "rgba(255,255,255,.07)", light: "rgba(0,0,0,.07)" },
  { token: "--color-border-hover", dark: "rgba(255,255,255,.13)", light: "rgba(0,0,0,.13)" },
  { token: "--color-accent", dark: "#60A5FA", light: "#2563EB" },
  { token: "--color-accent-hover", dark: "#93C5FD", light: "#1D4ED8" },
  { token: "--color-accent-fg", dark: "#09090B", light: "#FFFFFF" },
  { token: "--color-text-primary", dark: "#F4F4F5", light: "#09090B" },
  { token: "--color-text-secondary", dark: "#A1A1AA", light: "#52525B" },
  { token: "--color-text-muted", dark: "#52525B", light: "#71717A" },
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-eyebrow mb-3 text-accent">{children}</p>
  );
}

export default function QAPage() {
  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 border-b border-border bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-eyebrow text-text-secondary">
            Tribus Labs · QA de tokens
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-20 px-6 py-16">
        <section>
          <SectionLabel>Tipografia · §3</SectionLabel>
          <h2 className="text-display-sm">Escala tipográfica</h2>
          <div className="mt-8 flex flex-col divide-y divide-border">
            {typeScale.map((t) => (
              <div
                key={t.cls}
                className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <span className={`${t.cls} min-w-0 break-words`}>{t.sample}</span>
                <span className="shrink-0 text-right">
                  <code className="text-label text-accent">{t.cls}</code>
                  <span className="text-caption block text-text-muted">{t.spec}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionLabel>Cores · §2</SectionLabel>
          <h2 className="text-display-sm">Cores semânticas</h2>
          <p className="text-body-sm mt-2 text-text-secondary">
            Swatch ao vivo (via <code className="font-mono">var()</code>) — alterne
            o tema e veja cada token mudar. Hex de cada modo abaixo.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colorTokens.map((c) => (
              <div
                key={c.token}
                className="overflow-hidden rounded-lg border border-border bg-surface-1"
              >
                <div
                  className="h-20 w-full border-b border-border"
                  style={{ backgroundColor: `var(${c.token})` }}
                />
                <div className="flex flex-col gap-1 p-3">
                  <code className="text-label break-all text-text-primary">
                    {c.token}
                  </code>
                  <span className="text-caption text-text-muted">
                    dark {c.dark}
                  </span>
                  <span className="text-caption text-text-muted">
                    light {c.light}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionLabel>Componentes · §9</SectionLabel>
          <h2 className="text-display-sm">Botões</h2>
          <p className="text-body-sm mt-2 text-text-secondary">
            Passe o mouse (hover), clique (active) e navegue por teclado (focus).
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="primary">Quero conhecer</Button>
            <Button variant="secondary">Saber mais</Button>
          </div>
          <div className="mt-8 rounded-lg border border-border bg-surface-1 p-6">
            <p className="text-body-sm text-text-secondary">
              Card de superfície (<code className="font-mono">--color-surface-1</code>)
              com borda <code className="font-mono">--color-border</code> e radius-lg —
              profundidade por degraus de cor, sem box-shadow no dark (§6).
            </p>
          </div>
        </section>

        <footer className="text-caption text-text-muted">
          QA temporária — TRIBUS_LABS_DESIGN.md v1.0. Será substituída pelas seções
          reais (hero, serviços, cases, CTA).
        </footer>
      </main>
    </div>
  );
}
