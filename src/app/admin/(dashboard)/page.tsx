import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <div className="admin-container">
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-subtitle">Leads, invoices, and payments in one place.</p>
        </div>
        <Link href="/admin/invoices/new" className="btn btn--primary btn--sm">
          New invoice
        </Link>
      </div>

      <div className="admin-hub-grid">
        <Link href="/admin/leads" className="admin-hub-card">
          <div className="admin-hub-card-title">Leads</div>
          <div className="admin-hub-card-desc">Everyone who filled out a sign-up form, across all programs.</div>
        </Link>
        <Link href="/admin/messages" className="admin-hub-card">
          <div className="admin-hub-card-title">Messages</div>
          <div className="admin-hub-card-desc">Everyone who submitted the community / contact form — name, email, and note.</div>
        </Link>
        <Link href="/admin/invoices" className="admin-hub-card">
          <div className="admin-hub-card-title">Invoices</div>
          <div className="admin-hub-card-desc">Every invoice sent, its status, and a link to create a new one.</div>
        </Link>
      </div>
    </div>
  );
}
