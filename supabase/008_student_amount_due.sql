-- ============================================================
-- PeakSkills — Add amount_due to Students Table
-- Run this in Supabase Studio → SQL Editor
-- ============================================================

alter table students add column amount_due numeric(10,2) default 0.00;
