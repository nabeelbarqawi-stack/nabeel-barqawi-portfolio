import { supabaseAdmin } from "@/lib/supabase-admin";
import InvoiceForm from "@/components/InvoiceForm";

export const dynamic = "force-dynamic";

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ leadId?: string }>;
}) {
  const { leadId } = await searchParams;

  let lead: { id: string; name: string; email: string; program_slug: string; cohort_id: string | null } | null = null;
  if (leadId) {
    const { data } = await supabaseAdmin.from("leads").select("*").eq("id", leadId).maybeSingle();
    lead = data;
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">New invoice</h1>
      <p className="admin-subtitle">
        {lead ? `Sending to ${lead.name} (${lead.email})` : "Not tied to any lead — for ad-hoc or corporate billing."}
      </p>

      <div style={{ marginTop: 40 }}>
        <InvoiceForm
          leadId={lead?.id}
          initialProgramSlug={lead?.program_slug}
          initialCohortId={lead?.cohort_id}
          initialClientName={lead?.name}
          initialClientEmail={lead?.email}
        />
      </div>
    </div>
  );
}
