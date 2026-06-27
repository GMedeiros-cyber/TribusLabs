import { AtSign, MessageCircle } from "lucide-react";

// Footer institucional — theme-aware (tokens). surface-1 + borda superior 0.5px.
const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Cases", href: "#cases" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  return (
    <footer className="border-t-[0.5px] border-border bg-bg px-6 py-12 md:px-12">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* Coluna 1 — marca */}
        <div>
          {/* TODO: substituir por <Logo /> SVG */}
          <p className="font-display text-lg font-semibold tracking-tight text-text-primary">
            TRIBUS LABS
          </p>
          <p className="text-body-sm mt-3 max-w-xs text-text-secondary">
            Funcionários digitais pra quem tem empresa real.
          </p>
        </div>

        {/* Coluna 2 — navegação */}
        <nav aria-label="Navegação do rodapé">
          <p className="text-eyebrow text-text-secondary">Navegação</p>
          <ul className="mt-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-body-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Coluna 3 — contato */}
        <div>
          <p className="text-eyebrow text-text-secondary">Contato</p>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              {/* TODO: trocar pelo número real da Tribus Labs */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/tribuslabs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <AtSign className="h-4 w-4" aria-hidden="true" />
                @tribuslabs
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1200px] border-t-[0.5px] border-border pt-6">
        <p className="text-caption text-text-secondary">
          © 2026 Tribus Labs. Guarulhos/SP.
        </p>
      </div>
    </footer>
  );
}
