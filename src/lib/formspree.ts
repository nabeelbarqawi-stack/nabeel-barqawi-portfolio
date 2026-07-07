const FORMSPREE_FORM_ID = "xqewjded"; // same form Contact.tsx uses

export async function notifyFormspree(payload: Record<string, string>) {
  try {
    await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[formspree] notify failed", err);
  }
}
