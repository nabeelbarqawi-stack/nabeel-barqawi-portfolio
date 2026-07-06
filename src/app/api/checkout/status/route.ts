import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("signups")
      .select("status")
      .eq("stripe_checkout_session_id", sessionId)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ status: "unknown" });
    }
    return NextResponse.json({ status: data.status });
  } catch (err) {
    console.error("[checkout/status] failed", err);
    return NextResponse.json({ error: "Failed to check status" }, { status: 500 });
  }
}
