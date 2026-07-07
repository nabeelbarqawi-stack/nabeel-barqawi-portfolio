import Link from "next/link";
import AdminTabs from "@/components/AdminTabs";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
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

          <AdminTabs />

          <div className="admin-utility-nav">
            <Link href="/admin/invoices/new" className="btn btn--ghost btn--sm">New invoice</Link>
            <Link href="/" className="admin-nav-link">View site</Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
