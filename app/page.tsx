import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";

// Home real da Tribus Labs — recebe as seções incrementalmente.
// Prompt 2: Navbar + Hero. As seções abaixo do hero são placeholders âncora
// (próximas etapas) — existem para os links da navbar funcionarem e para a
// página ter altura rolável (testar o sticky-on-scroll-up).
const PLACEHOLDERS = [
  { id: "servicos", eyebrow: "SERVIÇOS", title: "O que entregamos" },
  { id: "como-funciona", eyebrow: "PROCESSO", title: "Como funciona" },
  { id: "cases", eyebrow: "RESULTADOS", title: "Cases reais" },
  { id: "contato", eyebrow: "PRÓXIMO PASSO", title: "Diagnóstico gratuito" },
];

function PlaceholderSection({
  id,
  eyebrow,
  title,
  surface,
}: {
  id: string;
  eyebrow: string;
  title: string;
  surface: boolean;
}) {
  return (
    <section
      id={id}
      className={`flex min-h-[70vh] scroll-mt-20 flex-col items-center justify-center px-6 text-center ${
        surface ? "bg-surface-1" : "bg-bg"
      }`}
    >
      <p className="text-eyebrow mb-3 text-accent">{eyebrow}</p>
      <h2 className="text-display-md text-text-primary">{title}</h2>
      <p className="text-body-md mt-3 max-w-md text-text-secondary">
        Seção em construção — chega nas próximas etapas.
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {PLACEHOLDERS.map((p, i) => (
          <PlaceholderSection key={p.id} {...p} surface={i % 2 === 0} />
        ))}
      </main>
    </>
  );
}
