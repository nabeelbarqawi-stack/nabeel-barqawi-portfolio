import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>
      <header className="admin-header">
        <div className="admin-header-inner">
          <Link href="/admin" className="admin-brand">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: "var(--accent)",
                boxShadow: "0 0 20px var(--accent-glow)",
                transform: "rotate(45deg)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Nabeel Barqawi</span>
            <span className="admin-badge">Admin</span>
          </Link>

          <nav className="admin-nav">
            <Link href="/admin/leads" className="admin-nav-link">Leads</Link>
            <Link href="/admin/invoices" className="admin-nav-link">Invoices</Link>
            <Link href="/" className="admin-nav-link">View site</Link>
            <AdminLogoutButton />
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
