"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { motion } from "motion/react";

// SlideTabs (21st.dev/minhxthanh) adaptado ao projeto:
// • framer-motion → motion/react (lib já instalada, evita dependência duplicada);
// • tipado em TS estrito; "use client" (usa estado/refs/efeito);
// • cores fixas para o hero escuro (pílula em vidro + cursor branco), pois o
//   dark mode aqui é via [data-theme], não a variante `dark:` do Tailwind.

interface Position {
  left: number;
  width: number;
  opacity: number;
}

export interface SlideTab {
  label: string;
  href: string;
}

// Links reais → seções da home (scroll suave via CSS scroll-behavior + scroll-mt).
const DEFAULT_TABS: SlideTab[] = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Cases", href: "#cases" },
  { label: "Contato", href: "#contato" },
];

export function SlideTabs({ tabs = DEFAULT_TABS }: { tabs?: SlideTab[] }) {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  // Aba selecionada (default: primeira).
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<Array<HTMLLIElement | null>>([]);

  // Posiciona o cursor sob a aba selecionada ao montar / ao trocar de aba.
  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 });
    }
  }, [selected]);

  return (
    <ul
      onMouseLeave={() => {
        // Ao sair do container, volta o cursor para a aba selecionada.
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 });
        }
      }}
      className="relative flex w-fit rounded-full border border-white/20 bg-white/[0.05] p-1 backdrop-blur-sm"
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab.href}
          href={tab.href}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => setSelected(i)}
        >
          {tab.label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
}

interface TabProps {
  children: ReactNode;
  href: string;
  setPosition: Dispatch<SetStateAction<Position>>;
  onClick: () => void;
}

const Tab = forwardRef<HTMLLIElement, TabProps>(
  ({ children, href, setPosition, onClick }, ref) => {
    return (
      <li
        ref={ref}
        onMouseEnter={(e) => {
          // currentTarget (não ref.current): o parent passa um callback ref, então
          // ref.current seria undefined aqui. Assim o cursor desliza no hover.
          const el = e.currentTarget;
          const { width } = el.getBoundingClientRect();
          setPosition({ left: el.offsetLeft, width, opacity: 1 });
        }}
        className="relative z-10 block"
      >
        {/* âncora real → scroll suave pra seção (scroll-behavior global + scroll-mt) */}
        <a
          href={href}
          onClick={onClick}
          className="block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
        >
          {children}
        </a>
      </li>
    );
  },
);
Tab.displayName = "Tab";

function Cursor({ position }: { position: Position }) {
  return (
    <motion.li
      animate={{ ...position }}
      className="absolute z-0 h-7 rounded-full bg-white md:h-12"
    />
  );
}
