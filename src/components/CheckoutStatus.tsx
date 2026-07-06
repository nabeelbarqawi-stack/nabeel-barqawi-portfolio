"use client";

import { useEffect, useState } from "react";

export default function CheckoutStatus({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState<"checking" | "paid" | "pending" | "unknown">("checking");

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    async function poll() {
      try {
        const res = await fetch(`/api/checkout/status?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();
        if (cancelled) return;

        if (data.status === "paid") {
          setStatus("paid");
          return;
        }
        attempts += 1;
        if (attempts < 6) {
          setTimeout(poll, 2000);
        } else {
          setStatus("pending");
        }
      } catch {
        if (!cancelled) setStatus("unknown");
      }
    }
    poll();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (status === "paid") {
    return <p style={{ fontSize: 16, color: "var(--fg)" }}>Payment confirmed — thanks! Check your email for details.</p>;
  }
  if (status === "checking") {
    return <p style={{ fontSize: 16, color: "var(--fg-dim)" }}>Confirming your payment…</p>;
  }
  return (
    <p style={{ fontSize: 16, color: "var(--fg-dim)" }}>
      Still processing — this can take a minute. We&apos;ll email you as soon as it&apos;s confirmed.
    </p>
  );
}
