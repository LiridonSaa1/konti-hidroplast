import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Products table for managing all products
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  description: text("description"),
  specifications: jsonb("specifications"),
  images: text("images").array(),
  brochureUrl: text("brochure_url"),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Media/Photos table for managing images
export const media = pgTable("media", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  url: text("url").notNull(),
  category: text("category").notNull(), // hero, gallery, products, certificates, etc.
  altText: text("alt_text"),
  fileSize: integer("file_size"),
  mimeType: text("mime_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Company information table
export const companyInfo = pgTable("company_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  category: text("category").notNull(), // contact, social, branding, etc.
  updatedAt: timestamp("updated_at").defaultNow(),
});

// News articles table
export const newsArticles = pgTable("news_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description"), // Optional - content is now in sections
  imageUrl: text("image_url"),
  author: text("author"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  sections: jsonb("sections").default('[]'), // Array of article sections
  sortOrder: integer("sort_order").default(0),
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Certificate Categories table
export const certificateCategories = pgTable("certificate_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0),
  status: text("status").notNull().default("active"), // active, inactive
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Certificate Subcategories table
export const certificateSubcategories = pgTable("certificate_subcategories", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => certificateCategories.id),
  title: text("title").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0),
  status: text("status").notNull().default("active"), // active, inactive
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Product Categories table
export const productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0),
  status: text("status").notNull().default("active"), // active, inactive
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Product Subcategories table
export const productSubcategories = pgTable("product_subcategories", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => productCategories.id),
  title: text("title").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0),
  status: text("status").notNull().default("active"), // active, inactive
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Certificates table
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => certificateCategories.id),
  subcategoryId: integer("subcategory_id").references(() => certificateSubcategories.id),
  subcategoryItemId: integer("subcategory_item_id").references(() => subcategoryItems.id),
  title: text("title").notNull(),
  imageUrl: text("image_url"), // Made optional since we now have both image and PDF
  pdfUrl: text("pdf_url"), // Legacy PDF URL field - DEPRECATED, use pdfUrlEn instead
  pdfUrlEn: text("pdf_url_en"), // PDF URL for English language (replaces legacy pdfUrl)
  pdfUrlMk: text("pdf_url_mk"), // PDF URL for Macedonian language
  pdfUrlDe: text("pdf_url_de"), // PDF URL for German language
  downloadUrl: text("download_url"),
  sortOrder: integer("sort_order").default(0),
  status: text("status").notNull().default("active"), // active, inactive
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Subcategory Items table
export const subcategoryItems = pgTable("subcategory_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => certificateCategories.id).notNull(),
  subcategoryId: integer("subcategory_id").references(() => certificateSubcategories.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").default(0),
  active: boolean("active").default(true),
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Brochures table
export const brochures = pgTable("brochures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  language: text("language").notNull().default("en"), // en, mk, de
  pdfUrl: text("pdf_url").notNull(),
  imageUrl: text("image_url"),
  description: text("description"),
  status: text("status").notNull().default("active"), // active, inactive, draft
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
  translationGroup: text("translation_group"), // Links related language versions
  translationMetadata: jsonb("translation_metadata"), // For tracking translations
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Brochure categories table
export const brochureCategories = pgTable("brochure_categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"), // active, inactive
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message").notNull(),
  status: text("status").notNull().default("unread"), // unread, read, replied
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Job applications table
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number"),
  position: text("position").notNull(), // What position they're applying for
  experience: text("experience"), // Years of experience or brief description
  coverLetter: text("cover_letter"), // Cover letter or motivation
  resumeUrl: text("resume_url"), // URL to uploaded resume/CV
  status: text("status").notNull().default("pending"), // pending, reviewed, shortlisted, rejected, hired
  notes: text("notes"), // Admin notes
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Brochure downloads table
export const brochureDownloads = pgTable("brochure_downloads", {
  id: serial("id").primaryKey(),
  brochureId: integer("brochure_id").notNull(),
  brochureName: text("brochure_name").notNull(),
  brochureCategory: text("brochure_category").notNull(),
  fullName: text("full_name").notNull(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  description: text("description"),
  downloadDate: timestamp("download_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Brevo configuration table
export const brevoConfig = pgTable("brevo_config", {
  id: serial("id").primaryKey(),
  apiKey: text("api_key"), // SMTP key for email sending (optional)
  brevoApiKey: text("brevo_api_key"), // Brevo API key for API operations (optional)
  senderEmail: text("sender_email").notNull(), // SMTP login email for authentication
  validatedSenderEmail: text("validated_sender_email"), // Validated email for "from" field
  senderName: text("sender_name").notNull(),
  recipientEmail: text("recipient_email").notNull().default("admin@kontihidroplast.com"), // Where to send contact form notifications
  templateId: integer("template_id"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Contact message schemas
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

// Job application schemas
export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  status: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBrochureDownloadSchema = createInsertSchema(brochureDownloads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;

export type BrochureDownload = typeof brochureDownloads.$inferSelect;
export type InsertBrochureDownload = z.infer<typeof insertBrochureDownloadSchema>;

export const insertBrevoConfigSchema = createInsertSchema(brevoConfig).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Login schema for authentication
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Update user profile schema
export const updateUserSchema = z.object({
  username: z.string().min(1, "Username is required").optional(),
  email: z.string().email("Invalid email").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  translations: true,
  defaultLanguage: true,
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
  createdAt: true,
});

export const insertCompanyInfoSchema = createInsertSchema(companyInfo).omit({
  id: true,
  updatedAt: true,
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCertificateCategorySchema = createInsertSchema(certificateCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCertificateSubcategorySchema = createInsertSchema(certificateSubcategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductCategorySchema = createInsertSchema(productCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductSubcategorySchema = createInsertSchema(productSubcategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSubcategoryItemSchema = createInsertSchema(subcategoryItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBrochureSchema = createInsertSchema(brochures, {
  title: z.string().min(1, "Title is required"),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  language: z.enum(["en", "mk", "de"]).default("en"),
  pdfUrl: z.string().min(1, "PDF URL is required"),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "draft"]).default("active"),
  active: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  translationGroup: z.string().optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBrochureCategorySchema = createInsertSchema(brochureCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  defaultLanguage: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertBrevoConfig = z.infer<typeof insertBrevoConfigSchema>;
export type BrevoConfig = typeof brevoConfig.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;

export type InsertCompanyInfo = z.infer<typeof insertCompanyInfoSchema>;
export type CompanyInfo = typeof companyInfo.$inferSelect;

export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type NewsArticle = typeof newsArticles.$inferSelect;

export type InsertCertificateCategory = z.infer<typeof insertCertificateCategorySchema>;
export type CertificateCategory = typeof certificateCategories.$inferSelect;

export type InsertCertificateSubcategory = z.infer<typeof insertCertificateSubcategorySchema>;
export type CertificateSubcategory = typeof certificateSubcategories.$inferSelect;

export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type ProductCategory = typeof productCategories.$inferSelect;

export type InsertProductSubcategory = z.infer<typeof insertProductSubcategorySchema>;
export type ProductSubcategory = typeof productSubcategories.$inferSelect;

export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificates.$inferSelect;

export type InsertSubcategoryItem = z.infer<typeof insertSubcategoryItemSchema>;
export type SubcategoryItem = typeof subcategoryItems.$inferSelect;

export type InsertBrochure = z.infer<typeof insertBrochureSchema>;
export type Brochure = typeof brochures.$inferSelect;

export type InsertBrochureCategory = z.infer<typeof insertBrochureCategorySchema>;
export type BrochureCategory = typeof brochureCategories.$inferSelect;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  pdfUrl: varchar("pdf_url", { length: 500 }),
  status: varchar("status", { length: 50 }).default("active"),
  sortOrder: integer("sort_order").default(0),
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Gallery categories table
export const galleryCategories = pgTable("gallery_categories", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  status: varchar("status", { length: 50 }).default("active"),
  sortOrder: integer("sort_order").default(0),
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Gallery items table
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => galleryCategories.id).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  status: varchar("status", { length: 50 }).default("active"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGalleryCategorySchema = createInsertSchema(galleryCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertGalleryCategory = z.infer<typeof insertGalleryCategorySchema>;
export type GalleryCategory = typeof galleryCategories.$inferSelect;

export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Teams table
export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;

// Positions table
export const positions = pgTable("positions", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull().unique(),
  description: text("description"),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
  translations: jsonb("translations").default('{}'),
  defaultLanguage: text("default_language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPositionSchema = createInsertSchema(positions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPosition = z.infer<typeof insertPositionSchema>;
export type Position = typeof positions.$inferSelect;