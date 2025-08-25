-- Migration: Add pdf_url to certificates table and make image_url optional
-- This migration adds a new PDF URL field and makes the image URL field optional

-- Add the new pdf_url column
ALTER TABLE "certificates" ADD COLUMN "pdf_url" text;

-- Make image_url optional by removing NOT NULL constraint
ALTER TABLE "certificates" ALTER COLUMN "image_url" DROP NOT NULL;

-- Add index for better performance on pdf_url
CREATE INDEX "certificates_pdf_url_idx" ON "certificates"("pdf_url");

-- Add a check constraint to ensure at least one of image_url or pdf_url is provided
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_require_image_or_pdf" 
CHECK ("image_url" IS NOT NULL OR "pdf_url" IS NOT NULL);
