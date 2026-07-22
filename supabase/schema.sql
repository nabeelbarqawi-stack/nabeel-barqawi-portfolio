-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- This migrates from the earlier instant-checkout schema (signups) to the
-- lead-capture + manual-invoice schema (leads + invoices). Safe to run even
-- if the old `signups` table has no real data yet.

drop table if exists signups cascade;

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

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  program_slug text not null,
  cohort_id uuid references cohorts(id),
  name text not null,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),          -- null for ad-hoc invoices
  program_slug text,                            -- optional context, for display + cohort linkage
  cohort_id uuid references cohorts(id),        -- copied from the lead at invoice-creation time
  client_name text not null,
  client_email text not null,
  description text not null,
  amount_cents int not null,
  currency text not null default 'usd',
  stripe_customer_id text not null,
  stripe_invoice_id text unique not null,
  hosted_invoice_url text,
  status text not null default 'open' check (status in ('open','paid','void','uncollectible')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

-- Inbound messages from the site's "Join the community" form (name + email +
-- note). Kept separate from `leads` on purpose: leads are program-specific
-- (non-null program_slug, feed the invoices pipeline); these are open-ended.
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  intent text,          -- form source, e.g. "Join the community"
  message text,         -- the note (optional)
  created_at timestamptz not null default now()
);

create index if not exists leads_cohort_id_idx on leads(cohort_id);
create index if not exists invoices_lead_id_idx on invoices(lead_id);
create index if not exists invoices_status_idx on invoices(status);
create index if not exists contact_messages_created_at_idx on contact_messages(created_at desc);

create or replace function increment_cohort_seat(p_cohort_id uuid)
returns int language sql as $$
  update cohorts set seats_taken = seats_taken + 1
  where id = p_cohort_id and seats_taken < capacity
  returning seats_taken;
$$;

alter table cohorts enable row level security;
alter table leads enable row level security;
alter table invoices enable row level security;
alter table contact_messages enable row level security;
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
