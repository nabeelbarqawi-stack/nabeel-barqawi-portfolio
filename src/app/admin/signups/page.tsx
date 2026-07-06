import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export default async function AdminSignupsPage() {
  const { data: signups, error } = await supabaseAdmin
    .from("signups")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin/signups] failed to load signups", error);
  }

  return (
    <main style={{ padding: "48px 24px", fontFamily: "monospace", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 20, marginBottom: 24 }}>Sign-ups</h1>
      {error && <p style={{ color: "#e05b3a" }}>Failed to load sign-ups.</p>}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
            <th style={{ padding: "8px 12px" }}>Created</th>
            <th style={{ padding: "8px 12px" }}>Program</th>
            <th style={{ padding: "8px 12px" }}>Name</th>
            <th style={{ padding: "8px 12px" }}>Email</th>
            <th style={{ padding: "8px 12px" }}>Status</th>
            <th style={{ padding: "8px 12px" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {(signups ?? []).map((s) => (
            <tr key={s.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 12px" }}>{new Date(s.created_at).toLocaleString()}</td>
              <td style={{ padding: "8px 12px" }}>{s.program_slug}</td>
              <td style={{ padding: "8px 12px" }}>{s.name}</td>
              <td style={{ padding: "8px 12px" }}>{s.email}</td>
              <td style={{ padding: "8px 12px" }}>{s.status}</td>
              <td style={{ padding: "8px 12px" }}>
                ${(s.amount_cents / 100).toFixed(2)} {s.currency.toUpperCase()}
              </td>
            </tr>
          ))}
          {(signups ?? []).length === 0 && (
            <tr>
              <td colSpan={6} style={{ padding: "24px 12px", color: "#888" }}>No sign-ups yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
