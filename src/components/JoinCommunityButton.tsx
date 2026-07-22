"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSiteUI, type JoinContext } from "./SiteUI";

/** Opens the contact drawer from anywhere, optionally personalized via `context`. */
export default function JoinCommunityButton({
  children,
  className,
  style,
  context,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  context?: JoinContext;
}) {
  const { openJoin } = useSiteUI();
  return (
    <button type="button" className={className} style={style} onClick={() => openJoin(context)}>
      {children}
    </button>
  );
}
