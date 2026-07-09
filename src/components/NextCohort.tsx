import Link from "next/link";
import { getOpenCohort } from "@/lib/supabase-admin";

export default async function NextCohort() {
  const cohort = await getOpenCohort("five-week-program");
  if (!cohort) return null;

  const remaining = cohort.capacity - cohort.seats_taken;
  if (remaining <= 0) return null;

  const dateLabel = cohort.starts_at
    ? new Date(cohort.starts_at).toLocaleDateString("en-US", { month: "long", day: "numeric" })
    : null;

  return (
    <div className="activity-banner">
      <div className="container activity-banner-inner">
        <span className="activity-dot" />
        <span className="activity-text">
          Next cohort — <strong>{cohort.label}</strong>
          {dateLabel && <> starts {dateLabel}</>} · {remaining} of {cohort.capacity} spots left
        </span>
        <Link href="/programs/five-week-program" className="activity-link">
          See details
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M3 6 H9 M6 3 L9 6 L6 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
