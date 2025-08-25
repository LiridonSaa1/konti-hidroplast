-- Add product categories table
CREATE TABLE IF NOT EXISTS "product_categories" (
  "id" serial PRIMARY KEY NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "sort_order" integer DEFAULT 0,
  "status" text DEFAULT 'active' NOT NULL,
  "translations" jsonb DEFAULT '{}'::jsonb,
  "default_language" text DEFAULT 'en' NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

-- Add product subcategories table
CREATE TABLE IF NOT EXISTS "product_subcategories" (
  "id" serial PRIMARY KEY NOT NULL,
  "category_id" integer REFERENCES "product_categories"("id"),
  "title" text NOT NULL,
  "description" text,
  "sort_order" integer DEFAULT 0,
  "status" text DEFAULT 'active' NOT NULL,
  "translations" jsonb DEFAULT '{}'::jsonb,
  "default_language" text DEFAULT 'en' NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

-- Add some sample data for testing
INSERT INTO "product_categories" ("title", "description", "sort_order", "status") VALUES
  ('Water Supply Systems', 'High-quality PE and PP pipes for potable water distribution networks', 1, 'active'),
  ('Sewerage Systems', 'Robust sewerage pipes designed for wastewater collection and treatment systems', 2, 'active'),
  ('Gas Pipeline Systems', 'Safe and reliable gas distribution systems', 3, 'active'),
  ('Cable Protection Systems', 'Protective solutions for electrical and communication cables', 4, 'active');

-- Add sample subcategories
INSERT INTO "product_subcategories" ("category_id", "title", "description", "sort_order", "status") VALUES
  (1, 'Pressure Pipes', 'High-pressure water distribution pipes', 1, 'active'),
  (1, 'Drainage Pipes', 'Low-pressure drainage and irrigation pipes', 2, 'active'),
  (2, 'Gravity Sewers', 'Gravity-fed sewerage systems', 1, 'active'),
  (2, 'Pressure Sewers', 'Pressurized sewerage systems', 2, 'active'),
  (3, 'Gas Distribution', 'Residential and commercial gas distribution', 1, 'active'),
  (3, 'Gas Transmission', 'High-pressure gas transmission lines', 2, 'active'),
  (4, 'Cable Ducts', 'Protective ducts for electrical cables', 1, 'active'),
  (4, 'Cable Tubes', 'Flexible protection for communication cables', 2, 'active');
