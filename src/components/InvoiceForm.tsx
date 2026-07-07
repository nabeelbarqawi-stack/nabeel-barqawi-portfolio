"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROGRAMS, PROGRAM_SLUGS, type ProgramSlug } from "@/lib/programs";

export default function InvoiceForm({
  leadId,
  initialProgramSlug,
  initialCohortId,
  initialClientName,
  initialClientEmail,
}: {
  leadId?: string;
  initialProgramSlug?: string;
  initialCohortId?: string | null;
  initialClientName?: string;
  initialClientEmail?: string;
}) {
  const router = useRouter();
  const [programSlug, setProgramSlug] = useState<ProgramSlug | "">((initialProgramSlug as ProgramSlug) || "");
  const [clientName, setClientName] = useState(initialClientName || "");
  const [clientEmail, setClientEmail] = useState(initialClientEmail || "");
  const [description, setDescription] = useState(initialProgramSlug ? PROGRAMS[initialProgramSlug as ProgramSlug]?.name ?? "" : "");
  const [amount, setAmount] = useState(
    initialProgramSlug && PROGRAMS[initialProgramSlug as ProgramSlug]?.priceCents
      ? String(PROGRAMS[initialProgramSlug as ProgramSlug].priceCents! / 100)
      : ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleProgramChange(slug: ProgramSlug | "") {
    setProgramSlug(slug);
    if (!slug) return;
    const program = PROGRAMS[slug];
    if (!description) setDescription(program.name);
    if (!amount && program.priceCents) setAmount(String(program.priceCents / 100));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const amountCents = Math.round(parseFloat(amount) * 100);
    if (!amountCents || amountCents <= 0) {
      setError("Enter a valid amount");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/invoices/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          programSlug: programSlug || undefined,
          cohortId: initialCohortId || undefined,
          clientName,
          clientEmail,
          description,
          amountCents,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setSubmitting(false);
        return;
      }

      router.push("/admin/invoices");
    } catch {
      setError("Network error — please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate style={{ maxWidth: 480 }}>
      <div className="field">
        <label htmlFor="inv-name" className="field-label active">Client name</label>
        <input
          id="inv-name"
          type="text"
          required
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="field-input"
        />
      </div>

      <div className="field">
        <label htmlFor="inv-email" className="field-label active">Client email</label>
        <input
          id="inv-email"
          type="email"
          required
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          className="field-input"
        />
      </div>

      <div className="field">
        <label htmlFor="inv-program" className="field-label active">Program (optional)</label>
        <select
          id="inv-program"
          value={programSlug}
          onChange={(e) => handleProgramChange(e.target.value as ProgramSlug | "")}
          className="field-input"
        >
          <option value="">None — ad hoc</option>
          {PROGRAM_SLUGS.map((slug) => (
            <option key={slug} value={slug}>{PROGRAMS[slug].name}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="inv-description" className="field-label active">Description</label>
        <input
          id="inv-description"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="field-input"
        />
      </div>

      <div className="field">
        <label htmlFor="inv-amount" className="field-label active">Amount (USD)</label>
        <input
          id="inv-amount"
          type="number"
          min="0"
          step="0.01"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="field-input"
        />
      </div>

      {error && <span className="field-error">{error}</span>}

      <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
        {submitting ? "Sending…" : "Send invoice"}
      </button>
    </form>
  );
}
