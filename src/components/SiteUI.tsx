"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import JoinDrawer from "./JoinDrawer";

type SiteUIContextValue = {
  openJoin: () => void;
  closeJoin: () => void;
};

const SiteUIContext = createContext<SiteUIContextValue | null>(null);

export function useSiteUI(): SiteUIContextValue {
  const ctx = useContext(SiteUIContext);
  if (!ctx) throw new Error("useSiteUI must be used within <SiteUIProvider>");
  return ctx;
}

export default function SiteUIProvider({ children }: { children: ReactNode }) {
  const [joinOpen, setJoinOpen] = useState(false);
  const openJoin = useCallback(() => setJoinOpen(true), []);
  const closeJoin = useCallback(() => setJoinOpen(false), []);

  return (
    <SiteUIContext.Provider value={{ openJoin, closeJoin }}>
      {children}
      <JoinDrawer open={joinOpen} onClose={closeJoin} />
    </SiteUIContext.Provider>
  );
}
