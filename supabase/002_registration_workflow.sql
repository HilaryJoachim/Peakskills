-- ============================================================
-- PeakSkills — Registration Workflow Supabase Migration
-- Run this in Supabase Studio → SQL Editor
-- ============================================================

-- ── ENUMS ────────────────────────────────────────────────────

create type application_status as enum (
  'Application Submitted', 
  'Under Review', 
  'Approved - Awaiting Payment', 
  'Rejected', 
  'More Info Requested'
);

create type student_status as enum (
  'Approved - Awaiting Payment', 
  'Active Student', 
  'Suspended', 
  'Completed', 
  'Archived'
);

create type learning_mode as enum ('Online', 'Physical');

-- ── APPLICATIONS ──────────────────────────────────────────────

create table applications (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone_number text not null,
  organization text not null,
  job_title text not null,
  program_id uuid references programs(id) on delete set null,
  session_id uuid references cohorts(id) on delete set null,
  learning_mode learning_mode default 'Physical',
  participants_count int default 1,
  status application_status default 'Application Submitted',
  activation_token text, -- for account creation
  submitted_at timestamptz default now(),
  approved_at timestamptz
);

-- ── STUDENTS ──────────────────────────────────────────────────

create table students (
  id text primary key, -- e.g., PS-2026-0001
  application_id uuid references applications(id) on delete cascade unique,
  password_hash text,
  status student_status default 'Approved - Awaiting Payment',
  payment_status text default 'Unpaid',
  payment_deadline timestamptz,
  created_at timestamptz default now()
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────

alter table applications enable row level security;
alter table students enable row level security;

-- Public can insert new applications (for the registration form)
create policy "Public insert applications" on applications for insert with check (true);

-- Usually, we would lock down select/update to authenticated admins only. 
-- For a low-budget or initial setup without a rigid RLS setup:
create policy "Public select applications" on applications for select using (true);
create policy "Public update applications" on applications for update using (true);

create policy "Public select students" on students for select using (true);
create policy "Public insert students" on students for insert with check (true);
create policy "Public update students" on students for update using (true);
