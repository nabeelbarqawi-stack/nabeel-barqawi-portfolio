"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import JoinDrawer from "./JoinDrawer";

/** Optional personalization for the contact drawer, set by whatever opens it. */
export type JoinContext = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  button?: string;
  intent?: string; // stored as contact_messages.intent so you can tell submissions apart
  success?: string;
  successNote?: string;
};

type SiteUIContextValue = {
  openJoin: (ctx?: JoinContext) => void;
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
  const [joinCtx, setJoinCtx] = useState<JoinContext | undefined>(undefined);
  const openJoin = useCallback((ctx?: JoinContext) => {
    setJoinCtx(ctx);
    setJoinOpen(true);
  }, []);
  const closeJoin = useCallback(() => setJoinOpen(false), []);

  return (
    <SiteUIContext.Provider value={{ openJoin, closeJoin }}>
      {children}
      <JoinDrawer open={joinOpen} onClose={closeJoin} context={joinCtx} />
    </SiteUIContext.Provider>
  );
}
