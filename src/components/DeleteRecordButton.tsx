"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteRecordButton({
  table,
  id,
  label = "this record",
}: {
  table: "contact_messages" | "leads";
  id: string;
  label?: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete ${label}? This can't be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/records/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table, id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        window.alert(data.error || "Failed to delete.");
        setDeleting(false);
        return;
      }
      router.refresh();
    } catch {
      window.alert("Network error — please try again.");
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="btn btn--ghost btn--sm admin-btn-danger"
      style={{ whiteSpace: "nowrap" }}
      aria-label={`Delete ${label}`}
    >
      {deleting ? "…" : "Delete"}
    </button>
  );
}
