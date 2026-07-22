import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getProgram } from "@/lib/programs";
import DeleteRecordButton from "@/components/DeleteRecordButton";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const { data: leads, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin/leads] failed to load leads", error);
  }

  return (
    <div className="admin-container">
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Leads</h1>
          <p className="admin-subtitle">Everyone who filled out a program sign-up form.</p>
        </div>
        <Link href="/admin/invoices/new" className="btn btn--ghost btn--sm">
          New invoice
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Created</th>
              <th>Program</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((lead) => (
              <tr key={lead.id}>
                <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                <td>{getProgram(lead.program_slug)?.name ?? lead.program_slug}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td style={{ maxWidth: 260 }}>{lead.message || "—"}</td>
                <td>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <Link
                      href={`/admin/invoices/new?leadId=${lead.id}`}
                      className="btn btn--ghost btn--sm"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Send invoice
                    </Link>
                    <DeleteRecordButton table="leads" id={lead.id} label={`lead ${lead.name}`} />
                  </div>
                </td>
              </tr>
            ))}
            {(leads ?? []).length === 0 && (
              <tr className="admin-empty-row">
                <td colSpan={6}>No leads yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
