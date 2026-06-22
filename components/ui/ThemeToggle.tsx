"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

// Returns false during SSR + first paint, true after hydration — without
// calling setState inside an effect (satisfies react-hooks/set-state-in-effect).
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false, // server snapshot
  );
}

// PROMPT §5 — toggles data-theme, moon/sun icon, aria-label "Alternar tema",
// 150ms fade. (Final visual polish will key off DESIGN.md tokens later.)
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme !== "light"; // dark is the default
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Alternar tema"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary"
    >
      {/* cross-fade sun (dark mode) / moon (light mode), 150ms */}
      <Sun
        aria-hidden
        className="absolute h-5 w-5 transition-opacity duration-150"
        style={{ opacity: mounted && isDark ? 1 : 0 }}
      />
      <Moon
        aria-hidden
        className="absolute h-5 w-5 transition-opacity duration-150"
        style={{ opacity: mounted && !isDark ? 1 : 0 }}
      />
    </button>
  );
}
