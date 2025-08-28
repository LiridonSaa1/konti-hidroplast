-- Migration: Deprecate legacy pdf_url field and update constraints
-- This migration updates the constraint to use the new language-specific PDF fields
-- and marks the legacy pdf_url field as deprecated

-- Update the check constraint to only use the new language-specific PDF fields
ALTER TABLE "certificates" DROP CONSTRAINT "certificates_require_image_or_pdf";
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_require_image_or_pdf" 
CHECK (
  "image_url" IS NOT NULL 
  OR "pdf_url_en" IS NOT NULL 
  OR "pdf_url_mk" IS NOT NULL 
  OR "pdf_url_de" IS NOT NULL
);

-- Add a comment explaining the deprecated field
COMMENT ON COLUMN "certificates"."pdf_url" IS 'DEPRECATED: Use pdf_url_en instead for English PDFs';

-- Add a comment explaining the new structure
COMMENT ON COLUMN "certificates"."pdf_url_en" IS 'PDF URL for English language version (replaces legacy pdf_url)';
COMMENT ON COLUMN "certificates"."pdf_url_mk" IS 'PDF URL for Macedonian language version';
COMMENT ON COLUMN "certificates"."pdf_url_de" IS 'PDF URL for German language version';
