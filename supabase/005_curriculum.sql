-- ============================================================
-- PeakSkills — Curriculum Tables Migration
-- Run this in Supabase Studio → SQL Editor
-- ============================================================

-- 1. Modules Table
create table modules (
  id uuid primary key default uuid_generate_v4(),
  program_id uuid references programs(id) on delete cascade not null,
  title text not null,
  description text,
  order_index integer default 0,
  created_at timestamptz default now()
);

-- 2. Course Materials Table
create table course_materials (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references modules(id) on delete cascade not null,
  title text not null,
  url text not null, -- Google Drive / External Link
  type text default 'Link', -- e.g. PDF, Video, Link
  created_at timestamptz default now()
);

-- 3. Assignments Table
create table assignments (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references modules(id) on delete cascade not null,
  title text not null,
  description text,
  due_date text, -- Optional due date info
  created_at timestamptz default now()
);

-- RLS Policies
alter table modules enable row level security;
alter table course_materials enable row level security;
alter table assignments enable row level security;

-- Public read access for students
create policy "Public select modules" on modules for select using (true);
create policy "Public select course_materials" on course_materials for select using (true);
create policy "Public select assignments" on assignments for select using (true);

-- Admin write access (currently public to allow app to write without auth)
create policy "Public insert modules" on modules for insert with check (true);
create policy "Public update modules" on modules for update using (true);
create policy "Public delete modules" on modules for delete using (true);

create policy "Public insert course_materials" on course_materials for insert with check (true);
create policy "Public update course_materials" on course_materials for update using (true);
create policy "Public delete course_materials" on course_materials for delete using (true);

create policy "Public insert assignments" on assignments for insert with check (true);
create policy "Public update assignments" on assignments for update using (true);
create policy "Public delete assignments" on assignments for delete using (true);
