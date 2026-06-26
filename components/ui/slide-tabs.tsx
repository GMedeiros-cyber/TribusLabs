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

const DEFAULT_TABS = ["Home", "Pricing", "Features", "Docs", "Blog"];

export function SlideTabs({ tabs = DEFAULT_TABS }: { tabs?: string[] }) {
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
          key={tab}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          setPosition={setPosition}
          onClick={() => setSelected(i)}
        >
          {tab}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
}

interface TabProps {
  children: ReactNode;
  setPosition: Dispatch<SetStateAction<Position>>;
  onClick: () => void;
}

const Tab = forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, onClick }, ref) => {
    return (
      <li
        ref={ref}
        onClick={onClick}
        onMouseEnter={(e) => {
          // currentTarget (não ref.current): o parent passa um callback ref, então
          // ref.current seria undefined aqui. Assim o cursor desliza no hover.
          const el = e.currentTarget;
          const { width } = el.getBoundingClientRect();
          setPosition({ left: el.offsetLeft, width, opacity: 1 });
        }}
        className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
      >
        {children}
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
