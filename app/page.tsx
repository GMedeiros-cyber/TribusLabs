import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Results } from "@/components/sections/Results";
import { Services } from "@/components/sections/Services";
import { Positioning } from "@/components/sections/Positioning";
import { Process } from "@/components/sections/Process";
import { Market } from "@/components/sections/Market";
import { Cases } from "@/components/sections/Cases";

// Home real da Tribus Labs — recebe as seções incrementalmente.
// P2: Navbar + Hero · P3: Results (§02) + Services (§03) ·
// P4: Positioning (§04) + Process (§05) · P5: Market (§06) + Cases (§07).
// Resta o stub #contato (§08 CTA, próxima etapa).
// Ritmo de superfície alternado: bg → surface-1 → bg → surface-1 → ...
const PLACEHOLDERS = [
  { id: "contato", eyebrow: "PRÓXIMO PASSO", title: "Diagnóstico gratuito", surface: true },
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
      <p className="text-eyebrow mb-3 text-text-secondary">{eyebrow}</p>
      <h2 className="text-display-md text-text-primary">{title}</h2>
      <p className="text-body-md mt-3 max-w-md text-text-secondary">
        Seção em construção — chega na próxima etapa.
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
        <Results />
        <Services />
        <Positioning />
        <Process />
        <Market />
        <Cases />
        {PLACEHOLDERS.map((p) => (
          <PlaceholderSection key={p.id} {...p} />
        ))}
      </main>
    </>
  );
}
