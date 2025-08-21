// Enhanced schema with translation support for dynamic content
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, serial } from "drizzle-orm/pg-core";

// Example of enhanced news articles with translations
export const newsArticlesTranslatable = pgTable("news_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Original fields
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  
  // Translation fields - JSONB for flexibility
  translations: jsonb("translations").default('{}').$type<{
    en?: { title?: string; subtitle?: string; description?: string };
    mk?: { title?: string; subtitle?: string; description?: string };
    de?: { title?: string; subtitle?: string; description?: string };
  }>(),
  
  // Metadata
  imageUrl: text("image_url"),
  author: text("author"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  sections: jsonb("sections").default('[]'),
  defaultLanguage: text("default_language").notNull().default("en"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced products with translations
export const productsTranslatable = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Original fields
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  
  // Translation fields
  translations: jsonb("translations").default('{}').$type<{
    en?: { name?: string; description?: string; category?: string };
    mk?: { name?: string; description?: string; category?: string };
    de?: { name?: string; description?: string; category?: string };
  }>(),
  
  // Other fields
  subcategory: text("subcategory"),
  specifications: jsonb("specifications"),
  images: text("images").array(),
  brochureUrl: text("brochure_url"),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  defaultLanguage: text("default_language").notNull().default("en"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Certificate categories with translations
export const certificateCategoriesTranslatable = pgTable("certificate_categories", {
  id: serial("id").primaryKey(),
  
  // Original fields
  title: text("title").notNull(),
  description: text("description"),
  
  // Translation fields
  translations: jsonb("translations").default('{}').$type<{
    en?: { title?: string; description?: string };
    mk?: { title?: string; description?: string };
    de?: { title?: string; description?: string };
  }>(),
  
  // Other fields
  sortOrder: integer("sort_order").default(0),
  status: text("status").notNull().default("active"),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});