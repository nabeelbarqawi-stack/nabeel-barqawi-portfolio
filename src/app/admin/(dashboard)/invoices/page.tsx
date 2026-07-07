import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getProgram } from "@/lib/programs";

export const dynamic = "force-dynamic";

export default async function AdminInvoicesPage() {
  const { data: invoices, error } = await supabaseAdmin
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin/invoices] failed to load invoices", error);
  }

  return (
    <div className="admin-container">
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Invoices</h1>
          <p className="admin-subtitle">Every invoice sent, and its payment status.</p>
        </div>
        <Link href="/admin/invoices/new" className="btn btn--primary btn--sm">
          New invoice
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Created</th>
              <th>Client</th>
              <th>Program</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(invoices ?? []).map((invoice) => (
              <tr key={invoice.id}>
                <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
                <td>
                  {invoice.client_name}
                  <div style={{ fontSize: 12, color: "var(--fg-dimmer)" }}>{invoice.client_email}</div>
                </td>
                <td>{invoice.program_slug ? getProgram(invoice.program_slug)?.name ?? invoice.program_slug : "—"}</td>
                <td style={{ maxWidth: 260 }}>{invoice.description}</td>
                <td>${(invoice.amount_cents / 100).toFixed(2)}</td>
                <td>
                  <span className={`admin-pill ${invoice.status === "paid" ? "admin-pill--paid" : "admin-pill--open"}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>
                  {invoice.hosted_invoice_url && (
                    <a href={invoice.hosted_invoice_url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
                      View
                    </a>
                  )}
                </td>
              </tr>
            ))}
            {(invoices ?? []).length === 0 && (
              <tr className="admin-empty-row">
                <td colSpan={7}>No invoices yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
