-- Migration: Add subcategory_item_id to certificates table
-- This migration adds a new column to link certificates to specific subcategory items

-- Add the new column
ALTER TABLE "certificates" ADD COLUMN "subcategory_item_id" integer;

-- Add foreign key constraint
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_subcategory_item_id_subcategory_items_id_fk" 
FOREIGN KEY ("subcategory_item_id") REFERENCES "subcategory_items"("id") ON DELETE SET NULL;

-- Add index for better performance
CREATE INDEX "certificates_subcategory_item_id_idx" ON "certificates"("subcategory_item_id");
