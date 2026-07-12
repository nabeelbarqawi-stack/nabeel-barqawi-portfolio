"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="admin-nav-link" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", padding: 0 }}>
      Log out
    </button>
  );
}
