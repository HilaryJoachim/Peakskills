-- ============================================================
-- PeakSkills - Add Tag to Gallery
-- ============================================================

ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS tag text DEFAULT 'EVENT';
