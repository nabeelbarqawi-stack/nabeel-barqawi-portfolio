import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Service-role client — server-only, bypasses RLS. Never import this from a
// client component or expose these env vars with a NEXT_PUBLIC_ prefix.
// Lazily constructed so `next build` succeeds without the env vars; they are
// only required when a query actually runs.
let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  }
  return client;
}

export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const c = getClient() as unknown as Record<string | symbol, unknown>;
    const value = c[prop];
    return typeof value === "function" ? (value as (...a: unknown[]) => unknown).bind(c) : value;
  },
});

export type Cohort = {
  id: string;
  program_slug: string;
  label: string;
  capacity: number;
  seats_taken: number;
  is_open: boolean;
  starts_at: string | null;
};

export async function getOpenCohort(programSlug: string): Promise<Cohort | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("cohorts")
      .select("*")
      .eq("program_slug", programSlug)
      .eq("is_open", true)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("[supabase-admin] getOpenCohort failed", error);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[supabase-admin] getOpenCohort threw", err);
    return null;
  }
}
