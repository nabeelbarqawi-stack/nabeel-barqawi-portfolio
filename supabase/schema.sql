-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).

create table if not exists cohorts (
  id uuid primary key default gen_random_uuid(),
  program_slug text not null check (program_slug in ('five-week-program', 'corporate-workshop')),
  label text not null,
  capacity int not null check (capacity > 0),
  seats_taken int not null default 0 check (seats_taken >= 0),
  is_open boolean not null default true,
  starts_at date,
  created_at timestamptz not null default now()
);

create table if not exists signups (
  id uuid primary key default gen_random_uuid(),
  program_slug text not null,
  cohort_id uuid references cohorts(id),
  name text not null,
  email text not null,
  message text,
  stripe_checkout_session_id text unique not null,
  stripe_payment_intent_id text,
  status text not null default 'pending' check (status in ('pending','paid','failed','expired')),
  amount_cents int not null,
  currency text not null default 'usd',
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists signups_cohort_id_idx on signups(cohort_id);
create index if not exists signups_status_idx on signups(status);

create or replace function increment_cohort_seat(p_cohort_id uuid)
returns int language sql as $$
  update cohorts set seats_taken = seats_taken + 1
  where id = p_cohort_id and seats_taken < capacity
  returning seats_taken;
$$;

alter table cohorts enable row level security;
alter table signups enable row level security;
-- No policies added on purpose: zero public access. All reads/writes go
-- through the Supabase service-role key from server-side API routes only,
-- which bypasses RLS by design.

-- Example: open the first 5-Week Program cohort with 8 seats.
-- Edit label/capacity/starts_at to match reality, then run:
-- insert into cohorts (program_slug, label, capacity, starts_at)
-- values ('five-week-program', 'Cohort 1 — Starts TBD', 8, null);

-- Example: open a Corporate Workshop "cohort" purely for capacity display
-- (seats_taken incremented manually by you after closing a deal):
-- insert into cohorts (program_slug, label, capacity, starts_at)
-- values ('corporate-workshop', 'Q3 2026 workshops', 6, null);
