"use client";

import { useRef } from "react";
import { useScrollProgress, mapRange } from "@/hooks/useScrollUtils";

const SENTENCE =
  "Pluralist by nature. Contrarian in training. Curious enough to explore anyway. Focused on first principles, not defaults. Building things that solve real human problems.";

export default function Philosophy() {
  const pinRef = useRef<HTMLElement>(null);
  const p = useScrollProgress(pinRef as React.RefObject<HTMLElement | null>, "enter");

  const words = SENTENCE.split(" ");
  const wordStart = 0.05;
  const wordEnd = 0.85;

  return (
    <section
      ref={pinRef}
      className="philosophy-pin"
      style={{ height: "180vh", position: "relative", borderTop: "1px solid var(--hairline)" }}
    >
      <div
        className="philosophy-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ width: "100%" }}>
          {/* Eyebrow */}
          <div
            className="eyebrow philosophy-eyebrow"
            style={{
              opacity: mapRange(p, 0, 0.06, 0, 1),
              transform: `translateY(${mapRange(p, 0, 0.06, 12, 0)}px)`,
              marginBottom: 56,
            }}
          >
            <span className="eyebrow-dot" /> 01 — Philosophy
          </div>

          {/* Word-by-word reveal */}
          <p className="philosophy-prose">
            {words.map((w, i) => {
              const each = (wordEnd - wordStart) / words.length;
              const wp = mapRange(p, wordStart + i * each * 0.5, wordStart + i * each * 0.5 + each * 2, 0, 1);
              const op = 0.25 + wp * 0.75;
              return (
                <span
                  key={i}
                  style={{
                    opacity: op,
                    transition: "opacity 120ms linear",
                    display: "inline",
                    whiteSpace: "normal",
                  }}
                >
                  {w}{i < words.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
