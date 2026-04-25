"use client";

import { useState, useCallback } from "react";
import { useChatKit, ChatKit } from "@openai/chatkit-react";

function getDeviceId(): string {
  try {
    let id = localStorage.getItem("nabeel_device_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("nabeel_device_id", id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

export default function ChatKitWidget() {
  const [open, setOpen] = useState(false);

  const getClientSecret = useCallback(
    async (_current: string | null): Promise<string> => {
      const res = await fetch("/api/chatkit/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId: getDeviceId() }),
      });
      if (!res.ok) throw new Error("Failed to get chat session");
      const { client_secret } = await res.json();
      return client_secret;
    },
    []
  );

  const { control } = useChatKit({
    api: { getClientSecret },
    theme: {
      colorScheme: "light",
      radius: "round",
      color: {
        accent: { primary: "#CF4F36", level: 2 },
      },
    },
    startScreen: {
      greeting: "Hi! I'm Nabeel's AI. Ask me about his work, experience, or how to collaborate.",
    },
    composer: {
      placeholder: "Ask about my work, experience, or how I build AI products…",
    },
    header: { enabled: false },
  });

  return (
    <>
      {/* Panel — always mounted so the session/iframe persists; shown via visibility */}
      <div
        style={{
          position: "fixed",
          bottom: 88,
          right: 24,
          width: "min(400px, calc(100vw - 32px))",
          height: "min(640px, calc(100dvh - 120px))",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow:
            "0 32px 80px -16px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.07)",
          border: "1px solid rgba(0,0,0,0.08)",
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          visibility: open ? "visible" : "hidden",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transform: open ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)",
          transition: "opacity 200ms ease, transform 200ms ease, visibility 200ms ease",
        }}
      >
        {/* Custom header */}
        <div
          style={{
            background: "#1C1A19",
            padding: "18px 20px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#F5F3F0",
                letterSpacing: "-0.022em",
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              Nabeel AI
            </p>
            <p
              style={{
                fontSize: 12,
                color: "rgba(245,243,240,0.46)",
                margin: "3px 0 0",
                letterSpacing: "0.01em",
                lineHeight: 1.4,
              }}
            >
              Turning complex into clear.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 0 2px rgba(74,222,128,0.28)",
                display: "block",
                flexShrink: 0,
              }}
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "transparent",
                border: "none",
                color: "rgba(245,243,240,0.40)",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                lineHeight: 1,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ChatKit body — relative container gives the absolutely-positioned iframe
            explicit pixel bounds so the web component can measure itself */}
        <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
          <ChatKit
            control={control}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "block",
            }}
          />
        </div>
      </div>

      {/* FAB toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat with Nabeel AI"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#CF4F36",
          border: "none",
          boxShadow:
            "0 4px 16px rgba(207,79,54,0.38), 0 2px 6px rgba(0,0,0,0.10)",
          cursor: "pointer",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          transition: "transform 180ms ease, box-shadow 180ms ease",
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 5L5 15M5 5l10 10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M4 8C4 6.9 4.9 6 6 6h10c1.1 0 2 .9 2 2v6.5c0 1.1-.9 2-2 2H12.5l-3 2.5V16.5H6c-1.1 0-2-.9-2-2V8z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </>
  );
}
