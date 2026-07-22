import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  intent: string | null;
  message: string | null;
  created_at: string;
};

export default async function AdminMessagesPage() {
  const { data, error } = await supabaseAdmin
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin/messages] failed to load messages", error);
  }

  const messages = (data ?? []) as ContactMessage[];

  return (
    <div className="admin-container">
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Messages</h1>
          <p className="admin-subtitle">Everyone who submitted the &ldquo;Join the community&rdquo; form.</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Created</th>
              <th>Source</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <td>{new Date(m.created_at).toLocaleDateString()}</td>
                <td>{m.intent || "—"}</td>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td style={{ maxWidth: 260 }}>{m.message || "—"}</td>
                <td>
                  <a
                    href={`mailto:${m.email}`}
                    className="btn btn--ghost btn--sm"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Reply
                  </a>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr className="admin-empty-row">
                <td colSpan={6}>No messages yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
