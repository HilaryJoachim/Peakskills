-- Migration 009: Partnership Services

CREATE TABLE partnership_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS policies
ALTER TABLE partnership_services ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on partnership_services"
  ON partnership_services FOR SELECT
  USING (true);

-- Allow full access to authenticated admin users (service role)
CREATE POLICY "Allow full access to service_role on partnership_services"
  ON partnership_services FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');
