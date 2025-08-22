import { pgTable, serial, varchar, text, timestamp, integer, jsonb, boolean, unique, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const projects = pgTable("projects", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	imageUrl: varchar("image_url", { length: 500 }),
	pdfUrl: varchar("pdf_url", { length: 500 }),
	status: varchar({ length: 50 }).default('active'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	sortOrder: integer("sort_order").default(0),
	translations: jsonb().default({}),
	defaultLanguage: text("default_language").default('en').notNull(),
});

export const newsArticles = pgTable("news_articles", {
	id: varchar().default(gen_random_uuid()).primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	imageUrl: text("image_url"),
	author: text(),
	published: boolean().default(false),
	publishedAt: timestamp("published_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	subtitle: text(),
	sections: jsonb().default([]),
	sortOrder: integer("sort_order").default(0),
	translations: jsonb().default({}),
	defaultLanguage: text("default_language").default('en').notNull(),
});

export const companyInfo = pgTable("company_info", {
	id: varchar().default(gen_random_uuid()).primaryKey().notNull(),
	key: text().notNull(),
	value: text().notNull(),
	category: text().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("company_info_key_unique").on(table.key),
]);

export const media = pgTable("media", {
	id: varchar().default(gen_random_uuid()).primaryKey().notNull(),
	filename: text().notNull(),
	originalName: text("original_name").notNull(),
	url: text().notNull(),
	category: text().notNull(),
	altText: text("alt_text"),
	fileSize: integer("file_size"),
	mimeType: text("mime_type"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const products = pgTable("products", {
	id: varchar().default(gen_random_uuid()).primaryKey().notNull(),
	name: text().notNull(),
	category: text().notNull(),
	subcategory: text(),
	description: text(),
	specifications: jsonb(),
	images: text().array(),
	brochureUrl: text("brochure_url"),
	featured: boolean().default(false),
	active: boolean().default(true),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	translations: jsonb().default({}),
	defaultLanguage: text("default_language").default('en').notNull(),
});

export const users = pgTable("users", {
	id: varchar().default(gen_random_uuid()).primaryKey().notNull(),
	username: text().notNull(),
	password: text().notNull(),
	email: text(),
	role: text().default('admin').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_username_unique").on(table.username),
]);

export const brochures = pgTable("brochures", {
	id: varchar().default(gen_random_uuid()).primaryKey().notNull(),
	name: text().notNull(),
	category: text().notNull(),
	pdfUrl: text("pdf_url").notNull(),
	description: text(),
	active: boolean().default(true),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	title: text().notNull(),
	status: text().default('active').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	imageUrl: text("image_url"),
	language: text().default('en').notNull(),
	translationMetadata: jsonb("translation_metadata"),
	translationGroup: text("translation_group"),
});

export const teams = pgTable("teams", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	position: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	imageUrl: varchar("image_url", { length: 500 }),
	active: boolean().default(true),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const positions = pgTable("positions", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text(),
	active: boolean().default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	translations: jsonb().default({}),
	defaultLanguage: text("default_language").default('en').notNull(),
}, (table) => [
	unique("positions_title_unique").on(table.title),
]);

export const galleryItems = pgTable("gallery_items", {
	id: serial().primaryKey().notNull(),
	categoryId: integer("category_id").notNull(),
	imageUrl: varchar("image_url", { length: 500 }).notNull(),
	status: varchar({ length: 50 }).default('active'),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [galleryCategories.id],
			name: "gallery_items_category_id_gallery_categories_id_fk"
		}),
]);

export const galleryCategories = pgTable("gallery_categories", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	imageUrl: varchar("image_url", { length: 500 }),
	status: varchar({ length: 50 }).default('active'),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	translations: jsonb().default({}),
	defaultLanguage: text("default_language").default('en').notNull(),
});

export const certificateCategories = pgTable("certificate_categories", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	sortOrder: integer("sort_order").default(0),
	status: text().default('active').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	translations: jsonb().default({}),
	defaultLanguage: text("default_language").default('en').notNull(),
});

export const certificateSubcategories = pgTable("certificate_subcategories", {
	id: serial().primaryKey().notNull(),
	categoryId: integer("category_id"),
	title: text().notNull(),
	description: text(),
	sortOrder: integer("sort_order").default(0),
	status: text().default('active').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	translations: jsonb().default({}),
	defaultLanguage: text("default_language").default('en').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [certificateCategories.id],
			name: "certificate_subcategories_category_id_certificate_categories_id"
		}),
]);

export const contactMessages = pgTable("contact_messages", {
	id: serial().primaryKey().notNull(),
	fullName: text("full_name").notNull(),
	email: text().notNull(),
	phone: text(),
	company: text(),
	message: text().notNull(),
	status: text().default('unread').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const brevoConfig = pgTable("brevo_config", {
	id: serial().primaryKey().notNull(),
	apiKey: text("api_key").notNull(),
	senderEmail: text("sender_email").notNull(),
	senderName: text("sender_name").notNull(),
	templateId: integer("template_id"),
	isActive: boolean("is_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	recipientEmail: text("recipient_email").default('admin@kontihidroplast.com').notNull(),
	brevoApiKey: text("brevo_api_key"),
	validatedSenderEmail: text("validated_sender_email"),
});

export const jobApplications = pgTable("job_applications", {
	id: serial().primaryKey().notNull(),
	fullName: text("full_name").notNull(),
	email: text().notNull(),
	phoneNumber: text("phone_number"),
	position: text().notNull(),
	experience: text(),
	coverLetter: text("cover_letter"),
	resumeUrl: text("resume_url"),
	status: text().default('pending').notNull(),
	notes: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const certificates = pgTable("certificates", {
	id: serial().primaryKey().notNull(),
	categoryId: integer("category_id"),
	subcategoryId: integer("subcategory_id"),
	imageUrl: text("image_url").notNull(),
	sortOrder: integer("sort_order").default(0),
	status: text().default('active').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	title: text().notNull(),
	downloadUrl: text("download_url"),
	translations: jsonb().default({}),
	defaultLanguage: text("default_language").default('en').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [certificateCategories.id],
			name: "certificates_category_id_certificate_categories_id_fk"
		}),
	foreignKey({
			columns: [table.subcategoryId],
			foreignColumns: [certificateSubcategories.id],
			name: "certificates_subcategory_id_certificate_subcategories_id_fk"
		}),
]);

export const brochureCategories = pgTable("brochure_categories", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	status: text().default('active').notNull(),
	active: boolean().default(true),
	sortOrder: integer("sort_order").default(0),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	translations: jsonb().default({}),
	defaultLanguage: text("default_language").default('en').notNull(),
});
