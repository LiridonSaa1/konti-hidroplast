import { relations } from "drizzle-orm/relations";
import { galleryCategories, galleryItems, certificateCategories, certificateSubcategories, certificates } from "./schema";

export const galleryItemsRelations = relations(galleryItems, ({one}) => ({
	galleryCategory: one(galleryCategories, {
		fields: [galleryItems.categoryId],
		references: [galleryCategories.id]
	}),
}));

export const galleryCategoriesRelations = relations(galleryCategories, ({many}) => ({
	galleryItems: many(galleryItems),
}));

export const certificateSubcategoriesRelations = relations(certificateSubcategories, ({one, many}) => ({
	certificateCategory: one(certificateCategories, {
		fields: [certificateSubcategories.categoryId],
		references: [certificateCategories.id]
	}),
	certificates: many(certificates),
}));

export const certificateCategoriesRelations = relations(certificateCategories, ({many}) => ({
	certificateSubcategories: many(certificateSubcategories),
	certificates: many(certificates),
}));

export const certificatesRelations = relations(certificates, ({one}) => ({
	certificateCategory: one(certificateCategories, {
		fields: [certificates.categoryId],
		references: [certificateCategories.id]
	}),
	certificateSubcategory: one(certificateSubcategories, {
		fields: [certificates.subcategoryId],
		references: [certificateSubcategories.id]
	}),
}));