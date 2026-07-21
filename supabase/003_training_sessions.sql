-- ============================================================
-- PeakSkills — Training Sessions Migration
-- Run this in Supabase Studio → SQL Editor
-- ============================================================

create table training_sessions (
  id uuid primary key default uuid_generate_v4(),
  cohort_id uuid references cohorts(id) on delete cascade not null,
  title text not null,
  date date not null,
  time time not null,
  trainer text not null,
  venue text not null,
  meeting_link text,
  status text default 'Scheduled',
  created_at timestamptz default now()
);

alter table training_sessions enable row level security;

-- Allow public read (for students to view their sessions)
create policy "Public select training_sessions" on training_sessions for select using (true);

-- Allow public insert/update/delete (for admin operations without auth for now)
create policy "Public insert training_sessions" on training_sessions for insert with check (true);
create policy "Public update training_sessions" on training_sessions for update using (true);
create policy "Public delete training_sessions" on training_sessions for delete using (true);
