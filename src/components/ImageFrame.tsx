import { ImageSquare } from "@phosphor-icons/react/dist/ssr";
import type { CSSProperties } from "react";

/**
 * Fills its (positioned) parent with either a real image or a styled
 * placeholder. Swap a placeholder for a real photo by passing `src`
 * (drop the file in /public and point here).
 */
export default function ImageFrame({
  src,
  alt,
  fit = "cover",
  position,
  placeholder = "Add a photo",
  padded = false,
}: {
  src?: string;
  alt: string;
  fit?: "cover" | "contain";
  /** CSS object-position, e.g. "60% center" to bias a cover crop */
  position?: string;
  placeholder?: string;
  /** contain-fit logos sit inside padding */
  padded?: boolean;
}) {
  const fill: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%" };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ ...fill, objectFit: fit, objectPosition: position, padding: padded ? "2px" : 0 }}
      />
    );
  }

  return (
    <div
      style={{
        ...fill,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        color: "#6b6980",
        background: "rgba(255,255,255,0.015)",
      }}
      aria-label={alt}
    >
      <ImageSquare size={22} weight="bold" />
      <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.02em" }}>{placeholder}</span>
    </div>
  );
}
