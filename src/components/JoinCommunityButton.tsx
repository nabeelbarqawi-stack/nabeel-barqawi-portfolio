"use client";

import type { CSSProperties, ReactNode } from "react";
import { useSiteUI } from "./SiteUI";

/** Opens the "Join the community" drawer from anywhere. */
export default function JoinCommunityButton({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const { openJoin } = useSiteUI();
  return (
    <button type="button" className={className} style={style} onClick={openJoin}>
      {children}
    </button>
  );
}
