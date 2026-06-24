"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// Returns false during SSR + first client paint, true after hydration — without
// setState in an effect (satisfies react-hooks/set-state-in-effect). Same pattern
// as ThemeToggle. Use to defer reduce-motion-dependent rendering past the first
// paint so the server HTML is byte-identical to the client's first render
// (avoids useReducedMotion() hydration mismatch — null on server, real on client).
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false, // server snapshot
  );
}
