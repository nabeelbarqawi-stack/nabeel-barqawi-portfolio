const FORMSPREE_FORM_ID = "xqewjded"; // same form Contact.tsx uses

export async function notifyFormspree(payload: Record<string, string>) {
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[formspree] notify rejected", res.status, body);
    }
  } catch (err) {
    console.error("[formspree] notify failed", err);
  }
}
