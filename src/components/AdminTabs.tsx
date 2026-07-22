"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs: [string, string][] = [
  ["Leads", "/admin/leads"],
  ["Messages", "/admin/messages"],
  ["Invoices", "/admin/invoices"],
];

export default function AdminTabs() {
  const pathname = usePathname();

  return (
    <div className="admin-tabs">
      {tabs.map(([label, href]) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className={`admin-tab ${active ? "active" : ""}`}>
            {label}
          </Link>
        );
      })}
    </div>
  );
}
