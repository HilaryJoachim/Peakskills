-- ============================================================
-- PeakSkills - CMS Module Additions
-- ============================================================

-- ── COMPANY SETTINGS ─────────────────────────────────────────
create table company_settings (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null default 'PeakSkills',
  description text,
  phone_numbers jsonb default '[]',
  email_addresses jsonb default '[]',
  office_address text,
  whatsapp_number text,
  social_media_links jsonb default '{}',
  google_maps_location text,
  updated_at timestamptz default now()
);

-- Insert default row
insert into company_settings (
  company_name, 
  description,
  phone_numbers,
  email_addresses,
  office_address
) values (
  'PeakSkills',
  'Empowering professionals with top-tier training and development programs.',
  '["+255 123 456 789"]',
  '["info@peakskills.com"]',
  'Dar es Salaam, Tanzania'
);

-- ── USER ROLES (Optional for Admin Auth Migration) ───────────
create type user_role as enum ('admin', 'content_manager', 'student');

create table user_roles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid, -- Would reference auth.users(id) if using Supabase Auth
  email text,
  role user_role not null default 'student',
  created_at timestamptz default now()
);

insert into user_roles (email, role) values ('admin@peakskills.com', 'admin');

-- ── RLS POLICIES ─────────────────────────────────────────────
alter table company_settings enable row level security;
create policy "Public read company settings" on company_settings for select using (true);
create policy "Admin all company settings" on company_settings for all using (true);

alter table user_roles enable row level security;
create policy "Public read user roles" on user_roles for select using (true);

-- ── BUCKETS ──────────────────────────────────────────────────
-- Create a public bucket named "media" for storing uploads
insert into storage.buckets (id, name, public) 
values ('media', 'media', true)
on conflict (id) do nothing;

-- Allow public read access to the media bucket
create policy "Public Access" 
on storage.objects for select 
using (bucket_id = 'media');

-- Allow public insert access (since admin uses custom JWT auth)
create policy "Public Insert" 
on storage.objects for insert 
with check (bucket_id = 'media');

-- Allow public delete access
create policy "Public Delete" 
on storage.objects for delete 
using (bucket_id = 'media');
