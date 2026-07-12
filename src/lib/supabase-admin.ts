import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Service-role client — server-only, bypasses RLS. Never import this from a
// client component or expose these env vars with a NEXT_PUBLIC_ prefix.
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
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
