import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { SESSION_COOKIE, isValidSession } from "@/proxy";

// Only these tables may be deleted from the admin UI. Invoices are excluded on
// purpose — they mirror Stripe and shouldn't be removed by a row delete.
const DELETABLE = new Set(["contact_messages", "leads"]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  // This path isn't covered by the proxy matcher, so verify the admin session here.
  const cookieStore = await cookies();
  if (!isValidSession(cookieStore.get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { table, id } = body as { table?: string; id?: string };

  if (!table || !DELETABLE.has(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }
  if (!id || !UUID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const { error } = await supabaseAdmin.from(table).delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/records/delete] failed", err);
    return NextResponse.json(
      { error: "Couldn't delete — it may be referenced by an invoice." },
      { status: 500 },
    );
  }
}
