-- ============================================================
-- PeakSkills — Attendance Tracking Migration
-- Run this in Supabase Studio → SQL Editor
-- ============================================================

create table attendance (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references training_sessions(id) on delete cascade not null,
  student_id text references students(id) on delete cascade not null,
  status text not null check (status in ('Present', 'Absent', 'Late')),
  created_at timestamptz default now(),
  unique(session_id, student_id)
);

alter table attendance enable row level security;

-- Allow public read (for students to view their own attendance, and admins to view all)
create policy "Public select attendance" on attendance for select using (true);

-- Allow public insert/update/delete (for admin operations without auth for now)
create policy "Public insert attendance" on attendance for insert with check (true);
create policy "Public update attendance" on attendance for update using (true);
create policy "Public delete attendance" on attendance for delete using (true);
