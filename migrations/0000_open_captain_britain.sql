-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"image_url" varchar(500),
	"pdf_url" varchar(500),
	"status" varchar(50) DEFAULT 'active',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"sort_order" integer DEFAULT 0,
	"translations" jsonb DEFAULT '{}'::jsonb,
	"default_language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news_articles" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image_url" text,
	"author" text,
	"published" boolean DEFAULT false,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"subtitle" text,
	"sections" jsonb DEFAULT '[]'::jsonb,
	"sort_order" integer DEFAULT 0,
	"translations" jsonb DEFAULT '{}'::jsonb,
	"default_language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_info" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"value" text NOT NULL,
	"category" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "company_info_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"filename" text NOT NULL,
	"original_name" text NOT NULL,
	"url" text NOT NULL,
	"category" text NOT NULL,
	"alt_text" text,
	"file_size" integer,
	"mime_type" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"subcategory" text,
	"description" text,
	"specifications" jsonb,
	"images" text[],
	"brochure_url" text,
	"featured" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"translations" jsonb DEFAULT '{}'::jsonb,
	"default_language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text,
	"role" text DEFAULT 'admin' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "brochures" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"pdf_url" text NOT NULL,
	"description" text,
	"active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"title" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"image_url" text,
	"language" text DEFAULT 'en' NOT NULL,
	"translation_metadata" jsonb,
	"translation_group" text
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"image_url" varchar(500),
	"active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"translations" jsonb DEFAULT '{}'::jsonb,
	"default_language" text DEFAULT 'en' NOT NULL,
	CONSTRAINT "positions_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "gallery_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer NOT NULL,
	"image_url" varchar(500) NOT NULL,
	"status" varchar(50) DEFAULT 'active',
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "gallery_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"image_url" varchar(500),
	"status" varchar(50) DEFAULT 'active',
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"translations" jsonb DEFAULT '{}'::jsonb,
	"default_language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "certificate_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"sort_order" integer DEFAULT 0,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"translations" jsonb DEFAULT '{}'::jsonb,
	"default_language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "certificate_subcategories" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer,
	"title" text NOT NULL,
	"description" text,
	"sort_order" integer DEFAULT 0,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"translations" jsonb DEFAULT '{}'::jsonb,
	"default_language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"company" text,
	"message" text NOT NULL,
	"status" text DEFAULT 'unread' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "brevo_config" (
	"id" serial PRIMARY KEY NOT NULL,
	"api_key" text NOT NULL,
	"sender_email" text NOT NULL,
	"sender_name" text NOT NULL,
	"template_id" integer,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"recipient_email" text DEFAULT 'admin@kontihidroplast.com' NOT NULL,
	"brevo_api_key" text,
	"validated_sender_email" text
);
--> statement-breakpoint
CREATE TABLE "job_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"position" text NOT NULL,
	"experience" text,
	"cover_letter" text,
	"resume_url" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "certificates" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" integer,
	"subcategory_id" integer,
	"image_url" text NOT NULL,
	"sort_order" integer DEFAULT 0,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"title" text NOT NULL,
	"download_url" text,
	"translations" jsonb DEFAULT '{}'::jsonb,
	"default_language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brochure_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'active' NOT NULL,
	"active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"translations" jsonb DEFAULT '{}'::jsonb,
	"default_language" text DEFAULT 'en' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_category_id_gallery_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."gallery_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certificate_subcategories" ADD CONSTRAINT "certificate_subcategories_category_id_certificate_categories_id" FOREIGN KEY ("category_id") REFERENCES "public"."certificate_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_category_id_certificate_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."certificate_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_subcategory_id_certificate_subcategories_id_fk" FOREIGN KEY ("subcategory_id") REFERENCES "public"."certificate_subcategories"("id") ON DELETE no action ON UPDATE no action;
*/