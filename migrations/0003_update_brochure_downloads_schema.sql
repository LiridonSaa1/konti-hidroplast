-- Migration: Update brochure_downloads table schema
-- Add full_name field and remove phone field

-- Add full_name column
ALTER TABLE brochure_downloads ADD COLUMN full_name TEXT NOT NULL DEFAULT '';

-- Remove phone column
ALTER TABLE brochure_downloads DROP COLUMN phone;

-- Remove the default value constraint for full_name after data migration
ALTER TABLE brochure_downloads ALTER COLUMN full_name DROP DEFAULT;
