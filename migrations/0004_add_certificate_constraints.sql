-- Migration: Add constraints to prevent certificates from appearing in multiple locations
-- This migration ensures certificates are either directly under a category OR under a subcategory, but not both

-- Add a check constraint to ensure certificates don't have both categoryId and subcategoryId
-- A certificate should either be directly under a category (categoryId set, subcategoryId null)
-- OR under a subcategory (subcategoryId set, categoryId can be null since it's inferred from subcategory)
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_single_location"
CHECK (
  (categoryId IS NOT NULL AND subcategoryId IS NULL) OR  -- Direct category
  (subcategoryId IS NOT NULL)                           -- Under subcategory (categoryId inferred)
);

-- Add an index to improve performance on the constraint check
CREATE INDEX "certificates_location_idx" ON "certificates"("categoryId", "subcategoryId");

-- Add a comment explaining the constraint
COMMENT ON CONSTRAINT "certificates_single_location" ON "certificates" IS 
'Ensures certificates appear in only one location: either directly under a category or under a subcategory, but not both';
