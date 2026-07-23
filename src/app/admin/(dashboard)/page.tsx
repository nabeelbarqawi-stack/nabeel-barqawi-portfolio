import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

async function countOf(table: string): Promise<number> {
  const { count, error } = await supabaseAdmin.from(table).select("*", { count: "exact", head: true });
  if (error) {
    console.error(`[admin] count(${table}) failed`, error);
    return 0;
  }
  return count ?? 0;
}

export default async function AdminHomePage() {
  const [leads, messages, invoices] = await Promise.all([
    countOf("leads"),
    countOf("contact_messages"),
    countOf("invoices"),
  ]);

  const cards = [
    { href: "/admin/leads", stat: leads, title: "Leads", desc: "Everyone who filled out a program sign-up form." },
    { href: "/admin/messages", stat: messages, title: "Database", desc: "Everyone who's reached out — form submissions and imported contacts." },
    { href: "/admin/invoices", stat: invoices, title: "Invoices", desc: "Every invoice sent, its status, and a link to create a new one." },
  ];

  return (
    <div className="admin-container">
      <div className="admin-toolbar">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-subtitle">Leads, contact database, invoices, and payments in one place.</p>
        </div>
        <Link href="/admin/invoices/new" className="btn btn--primary btn--sm">
          New invoice
        </Link>
      </div>

      <div className="admin-hub-grid">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="admin-hub-card">
            <div className="admin-hub-stat">{c.stat}</div>
            <div className="admin-hub-card-title">{c.title}</div>
            <div className="admin-hub-card-desc">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
