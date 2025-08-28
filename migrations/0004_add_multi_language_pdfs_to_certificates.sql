-- Migration: Add multi-language PDF support to certificates table
-- This migration adds separate PDF URL fields for each language (English, Macedonian, German)

-- Add new PDF URL columns for each language
ALTER TABLE "certificates" ADD COLUMN "pdf_url_en" text;
ALTER TABLE "certificates" ADD COLUMN "pdf_url_mk" text;
ALTER TABLE "certificates" ADD COLUMN "pdf_url_de" text;

-- Add indexes for better performance on new PDF URL columns
CREATE INDEX "certificates_pdf_url_en_idx" ON "certificates"("pdf_url_en");
CREATE INDEX "certificates_pdf_url_mk_idx" ON "certificates"("pdf_url_mk");
CREATE INDEX "certificates_pdf_url_de_idx" ON "certificates"("pdf_url_de");

-- Update the check constraint to ensure at least one file is provided
-- (either image or at least one PDF in any language)
ALTER TABLE "certificates" DROP CONSTRAINT "certificates_require_image_or_pdf";
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_require_image_or_pdf" 
CHECK (
  "image_url" IS NOT NULL 
  OR "pdf_url_en" IS NOT NULL 
  OR "pdf_url_mk" IS NOT NULL 
  OR "pdf_url_de" IS NOT NULL
);

-- Add a comment explaining the new structure
COMMENT ON COLUMN "certificates"."pdf_url_en" IS 'PDF URL for English language version';
COMMENT ON COLUMN "certificates"."pdf_url_mk" IS 'PDF URL for Macedonian language version';
COMMENT ON COLUMN "certificates"."pdf_url_de" IS 'PDF URL for German language version';
COMMENT ON COLUMN "certificates"."pdf_url" IS 'Legacy PDF URL field - deprecated in favor of language-specific fields';
