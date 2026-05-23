-- Run in Supabase: Dashboard → SQL → New query → Run
-- Must be the SAME project as NEXT_PUBLIC_SUPABASE_URL on Vercel.

create extension if not exists "pgcrypto";

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company text,
  service text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- If you created the table earlier with different column names, fix or recreate:
-- alter table public.contact_requests rename column name to full_name;

alter table public.contact_requests enable row level security;

-- Service role (used by /api/contact) bypasses RLS. No insert policy required.

-- Verify: Table Editor should list contact_requests with columns above.
