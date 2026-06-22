"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

// PROMPT §4 — next-themes wired to the data-theme attribute, dark by default,
// system preference disabled. suppressHydrationWarning on <html> (layout.tsx)
// + next-themes' inline script prevent any flash of the wrong theme on load.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
