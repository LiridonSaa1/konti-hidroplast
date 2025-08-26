import { 
  type User, 
  type InsertUser,
  type Product,
  type InsertProduct,
  type Media,
  type InsertMedia,
  type CompanyInfo,
  type InsertCompanyInfo,
  type NewsArticle,
  type InsertNewsArticle,
  type Certificate,
  type InsertCertificate,
  type CertificateCategory,
  type InsertCertificateCategory,
  type CertificateSubcategory,
  type InsertCertificateSubcategory,
  type SubcategoryItem,
  type InsertSubcategoryItem,
  type ProductCategory,
  type InsertProductCategory,
  type ProductSubcategory,
  type InsertProductSubcategory,
  type Brochure,
  type InsertBrochure,
  type BrochureCategory,
  type InsertBrochureCategory,
  type Project,
  type InsertProject,
  type Team,
  type InsertTeam,
  type Position,
  type InsertPosition,
  type GalleryCategory,
  type InsertGalleryCategory,
  type GalleryItem,
  type InsertGalleryItem,
  type ContactMessage,
  type InsertContactMessage,
  type JobApplication,
  type InsertJobApplication,
  type BrevoConfig,
  type InsertBrevoConfig,
  users,
  products,
  media,
  companyInfo,
  newsArticles,
  certificates,
  certificateCategories,
  certificateSubcategories,
  subcategoryItems,
  productCategories,
  productSubcategories,
  brochures,
  brochureCategories,
  projects,
  teams,
  positions,
  galleryCategories,
  galleryItems,
  contactMessages,
  jobApplications,
  brevoConfig,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getAdminUser(): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  
  // Media methods
  getAllMedia(): Promise<Media[]>;
  getMediaByCategory(category: string): Promise<Media[]>;
  createMedia(media: InsertMedia): Promise<Media>;
  deleteMedia(id: string): Promise<void>;
  
  // Company info methods
  getAllCompanyInfo(): Promise<CompanyInfo[]>;
  getCompanyInfoByKey(key: string): Promise<CompanyInfo | undefined>;
  upsertCompanyInfo(info: InsertCompanyInfo): Promise<CompanyInfo>;
  
  // News methods
  getAllNews(): Promise<NewsArticle[]>;
  getNews(id: string): Promise<NewsArticle | undefined>;
  createNews(news: InsertNewsArticle): Promise<NewsArticle>;
  updateNews(id: string, news: Partial<InsertNewsArticle>): Promise<NewsArticle>;
  deleteNews(id: string): Promise<void>;
  
  // Certificate Category methods
  getAllCertificateCategories(): Promise<CertificateCategory[]>;
  getCertificateCategory(id: number): Promise<CertificateCategory | undefined>;
  createCertificateCategory(category: InsertCertificateCategory): Promise<CertificateCategory>;
  updateCertificateCategory(id: number, category: Partial<InsertCertificateCategory>): Promise<CertificateCategory>;
  deleteCertificateCategory(id: number): Promise<void>;

  // Certificate Subcategory methods
  getAllCertificateSubcategories(): Promise<CertificateSubcategory[]>;
  getCertificateSubcategoriesByCategory(categoryId: number): Promise<CertificateSubcategory[]>;
  getCertificateSubcategory(id: number): Promise<CertificateSubcategory | undefined>;
  createCertificateSubcategory(subcategory: InsertCertificateSubcategory): Promise<CertificateSubcategory>;
  updateCertificateSubcategory(id: number, subcategory: Partial<InsertCertificateSubcategory>): Promise<CertificateSubcategory>;
  deleteCertificateSubcategory(id: number): Promise<void>;

  // Subcategory Items methods
  getAllSubcategoryItems(): Promise<SubcategoryItem[]>;
  getSubcategoryItemsByCategory(categoryId: number): Promise<SubcategoryItem[]>;
  getSubcategoryItemsBySubcategory(subcategoryId: number): Promise<SubcategoryItem[]>;
  getSubcategoryItem(id: number): Promise<SubcategoryItem | undefined>;
  createSubcategoryItem(item: InsertSubcategoryItem): Promise<SubcategoryItem>;
  updateSubcategoryItem(id: number, item: Partial<InsertSubcategoryItem>): Promise<SubcategoryItem>;
  deleteSubcategoryItem(id: number): Promise<void>;

  // Product Category methods
  getAllProductCategories(): Promise<ProductCategory[]>;
  getProductCategory(id: number): Promise<ProductCategory | undefined>;
  createProductCategory(category: InsertProductCategory): Promise<ProductCategory>;
  updateProductCategory(id: number, category: Partial<InsertProductCategory>): Promise<ProductCategory>;
  deleteProductCategory(id: number): Promise<void>;

  // Product Subcategory methods
  getAllProductSubcategories(): Promise<ProductSubcategory[]>;
  getProductSubcategoriesByCategory(categoryId: number): Promise<ProductSubcategory[]>;
  getProductSubcategory(id: number): Promise<ProductSubcategory | undefined>;
  createProductSubcategory(subcategory: InsertProductSubcategory): Promise<ProductSubcategory>;
  updateProductSubcategory(id: number, subcategory: Partial<InsertProductSubcategory>): Promise<ProductSubcategory>;
  deleteProductSubcategory(id: number): Promise<void>;

  // Certificate methods
  getAllCertificates(): Promise<Certificate[]>;
  getCertificatesByCategory(categoryId: number): Promise<Certificate[]>;
  getCertificatesBySubcategory(subcategoryId: number): Promise<Certificate[]>;
  getCertificate(id: number): Promise<Certificate | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  updateCertificate(id: number, certificate: Partial<InsertCertificate>): Promise<Certificate>;
  deleteCertificate(id: number): Promise<void>;
  
  // Brochure methods
  getAllBrochures(): Promise<Brochure[]>;
  getBrochuresByLanguage(language: string): Promise<Brochure[]>;
  getBrochuresByCategory(category: string): Promise<Brochure[]>;
  getBrochuresByLanguageAndCategory(language: string, category: string): Promise<Brochure[]>;
  getBrochuresByTranslationGroup(translationGroup: string): Promise<Brochure[]>;
  getActiveBrochures(): Promise<Brochure[]>;
  getBrochureById(id: string): Promise<Brochure | undefined>;
  createBrochure(brochure: InsertBrochure): Promise<Brochure>;
  updateBrochure(id: string, brochure: Partial<InsertBrochure>): Promise<Brochure>;
  deleteBrochure(id: string): Promise<void>;
  
  // Brochure category methods
  getAllBrochureCategories(): Promise<BrochureCategory[]>;
  getBrochureCategory(id: number): Promise<BrochureCategory | undefined>;
  createBrochureCategory(category: InsertBrochureCategory): Promise<BrochureCategory>;
  updateBrochureCategory(id: number, category: Partial<InsertBrochureCategory>): Promise<BrochureCategory>;
  deleteBrochureCategory(id: number): Promise<void>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  
  // Team methods
  getAllTeams(): Promise<Team[]>;
  getTeam(id: number): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: number, team: Partial<InsertTeam>): Promise<Team>;
  deleteTeam(id: number): Promise<void>;
  
  // Position methods
  getAllPositions(): Promise<Position[]>;
  getPosition(id: number): Promise<Position | undefined>;
  createPosition(position: InsertPosition): Promise<Position>;
  updatePosition(id: number, position: Partial<InsertPosition>): Promise<Position>;
  deletePosition(id: number): Promise<void>;
  
  // Gallery category methods
  getAllGalleryCategories(): Promise<GalleryCategory[]>;
  getGalleryCategory(id: number): Promise<GalleryCategory | undefined>;
  createGalleryCategory(category: InsertGalleryCategory): Promise<GalleryCategory>;
  updateGalleryCategory(id: number, category: Partial<InsertGalleryCategory>): Promise<GalleryCategory>;
  deleteGalleryCategory(id: number): Promise<void>;
  
  // Gallery item methods
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  getGalleryItemsByCategory(categoryId: number): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem>;
  deleteGalleryItem(id: number): Promise<void>;
  
  // Contact message methods
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  updateContactMessage(id: number, message: Partial<ContactMessage>): Promise<ContactMessage>;
  deleteContactMessage(id: number): Promise<void>;
  
  // Job application methods
  getAllJobApplications(): Promise<JobApplication[]>;
  getJobApplication(id: number): Promise<JobApplication | undefined>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  updateJobApplication(id: number, application: Partial<JobApplication>): Promise<JobApplication>;
  deleteJobApplication(id: number): Promise<void>;
  
  // Brevo configuration methods
  getBrevoConfig(): Promise<BrevoConfig | undefined>;
  createBrevoConfig(config: InsertBrevoConfig): Promise<BrevoConfig>;
  updateBrevoConfig(id: number, config: Partial<InsertBrevoConfig>): Promise<BrevoConfig>;
  deleteBrevoConfig(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    if (!db) {
      throw new Error('Database connection not available');
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    if (!db) throw new Error('Database not available');
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) throw new Error('Database not available');
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(users);
  }

  async getAdminUser(): Promise<User | undefined> {
    if (!db) throw new Error('Database not available');
    const [user] = await db.select().from(users).where(eq(users.role, 'admin'));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error('Database not available');
    
    // Prevent creating multiple admin users
    if (insertUser.role === 'admin') {
      const existingAdmin = await this.getAdminUser();
      if (existingAdmin) {
        throw new Error('An admin user already exists. Only one admin user is allowed.');
      }
    }
    
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(users)
      .set({ ...user, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(users).where(eq(users.id, id));
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    if (!db) throw new Error('Database not available');
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    if (!db) throw new Error('Database not available');
    const [newProduct] = await db
      .insert(products)
      .values({...product, translations: {}, defaultLanguage: 'en'})
      .returning();
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(products).where(eq(products.id, id));
  }
  
  // Media methods
  async getAllMedia(): Promise<Media[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(media).orderBy(desc(media.createdAt));
  }

  async getMediaByCategory(category: string): Promise<Media[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(media).where(eq(media.category, category));
  }

  async createMedia(mediaItem: InsertMedia): Promise<Media> {
    if (!db) throw new Error('Database not available');
    const [newMedia] = await db
      .insert(media)
      .values(mediaItem)
      .returning();
    return newMedia;
  }

  async deleteMedia(id: string): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(media).where(eq(media.id, id));
  }
  
  // Company info methods
  async getAllCompanyInfo(): Promise<CompanyInfo[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(companyInfo);
  }

  async getCompanyInfoByKey(key: string): Promise<CompanyInfo | undefined> {
    if (!db) throw new Error('Database not available');
    const [info] = await db.select().from(companyInfo).where(eq(companyInfo.key, key));
    return info || undefined;
  }

  async upsertCompanyInfo(info: InsertCompanyInfo): Promise<CompanyInfo> {
    if (!db) throw new Error('Database not available');
    const [upserted] = await db
      .insert(companyInfo)
      .values(info)
      .onConflictDoUpdate({
        target: companyInfo.key,
        set: { ...info, updatedAt: new Date() },
      })
      .returning();
    return upserted;
  }
  
  // News methods
  async getAllNews(): Promise<NewsArticle[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(newsArticles).orderBy(desc(newsArticles.createdAt));
  }

  async getNews(id: string): Promise<NewsArticle | undefined> {
    if (!db) throw new Error('Database not available');
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.id, id));
    return article || undefined;
  }

  async createNews(news: InsertNewsArticle): Promise<NewsArticle> {
    if (!db) throw new Error('Database not available');
    const [newNews] = await db
      .insert(newsArticles)
      .values({...news, translations: {}, defaultLanguage: 'en'})
      .returning();
    return newNews;
  }

  async updateNews(id: string, news: Partial<InsertNewsArticle>): Promise<NewsArticle> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(newsArticles)
      .set({ ...news, updatedAt: new Date() })
      .where(eq(newsArticles.id, id))
      .returning();
    return updated;
  }

  async deleteNews(id: string): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(newsArticles).where(eq(newsArticles.id, id));
  }
  
  // Certificate Category methods
  async getAllCertificateCategories(): Promise<CertificateCategory[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(certificateCategories).orderBy(certificateCategories.sortOrder);
  }

  async getCertificateCategory(id: number): Promise<CertificateCategory | undefined> {
    if (!db) throw new Error('Database not available');
    const result = await db.select().from(certificateCategories).where(eq(certificateCategories.id, id));
    return result[0];
  }

  async createCertificateCategory(category: InsertCertificateCategory): Promise<CertificateCategory> {
    if (!db) throw new Error('Database not available');
    const [newCategory] = await db
      .insert(certificateCategories)
      .values(category)
      .returning();
    return newCategory;
  }

  async updateCertificateCategory(id: number, category: Partial<InsertCertificateCategory>): Promise<CertificateCategory> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(certificateCategories)
      .set(category)
      .where(eq(certificateCategories.id, id))
      .returning();
    return updated;
  }

  async deleteCertificateCategory(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(certificateCategories).where(eq(certificateCategories.id, id));
  }

  // Certificate Subcategory methods
  async getAllCertificateSubcategories(): Promise<CertificateSubcategory[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(certificateSubcategories).orderBy(certificateSubcategories.sortOrder);
  }

  async getCertificateSubcategoriesByCategory(categoryId: number): Promise<CertificateSubcategory[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(certificateSubcategories)
      .where(eq(certificateSubcategories.categoryId, categoryId))
      .orderBy(certificateSubcategories.sortOrder);
  }

  async getCertificateSubcategory(id: number): Promise<CertificateSubcategory | undefined> {
    if (!db) throw new Error('Database not available');
    const result = await db.select().from(certificateSubcategories).where(eq(certificateSubcategories.id, id));
    return result[0];
  }

  async createCertificateSubcategory(subcategory: InsertCertificateSubcategory): Promise<CertificateSubcategory> {
    if (!db) throw new Error('Database not available');
    const [newSubcategory] = await db
      .insert(certificateSubcategories)
      .values(subcategory)
      .returning();
    return newSubcategory;
  }

  async updateCertificateSubcategory(id: number, subcategory: Partial<InsertCertificateSubcategory>): Promise<CertificateSubcategory> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(certificateSubcategories)
      .set(subcategory)
      .where(eq(certificateSubcategories.id, id))
      .returning();
    return updated;
  }

  async deleteCertificateSubcategory(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(certificateSubcategories).where(eq(certificateSubcategories.id, id));
  }

  // Product Category methods
  async getAllProductCategories(): Promise<ProductCategory[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(productCategories).orderBy(productCategories.sortOrder);
  }

  async getProductCategory(id: number): Promise<ProductCategory | undefined> {
    if (!db) throw new Error('Database not available');
    const result = await db.select().from(productCategories).where(eq(productCategories.id, id));
    return result[0];
  }

  async createProductCategory(category: InsertProductCategory): Promise<ProductCategory> {
    if (!db) throw new Error('Database not available');
    const [newCategory] = await db
      .insert(productCategories)
      .values(category)
      .returning();
    return newCategory;
  }

  async updateProductCategory(id: number, category: Partial<InsertProductCategory>): Promise<ProductCategory> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(productCategories)
      .set(category)
      .where(eq(productCategories.id, id))
      .returning();
    return updated;
  }

  async deleteProductCategory(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(productCategories).where(eq(productCategories.id, id));
  }

  // Product Subcategory methods
  async getAllProductSubcategories(): Promise<ProductSubcategory[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(productSubcategories).orderBy(productSubcategories.sortOrder);
  }

  async getProductSubcategoriesByCategory(categoryId: number): Promise<ProductSubcategory[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(productSubcategories)
      .where(eq(productSubcategories.categoryId, categoryId))
      .orderBy(productSubcategories.sortOrder);
  }

  async getProductSubcategory(id: number): Promise<ProductSubcategory | undefined> {
    if (!db) throw new Error('Database not available');
    const result = await db.select().from(productSubcategories).where(eq(productSubcategories.id, id));
    return result[0];
  }

  async createProductSubcategory(subcategory: InsertProductSubcategory): Promise<ProductSubcategory> {
    if (!db) throw new Error('Database not available');
    const [newSubcategory] = await db
      .insert(productSubcategories)
      .values(subcategory)
      .returning();
    return newSubcategory;
  }

  async updateProductSubcategory(id: number, subcategory: Partial<InsertProductSubcategory>): Promise<ProductSubcategory> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(productSubcategories)
      .set(subcategory)
      .where(eq(productSubcategories.id, id))
      .returning();
    return updated;
  }

  async deleteProductSubcategory(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(productSubcategories).where(eq(productSubcategories.id, id));
  }

  // Subcategory Items methods
  async getAllSubcategoryItems(): Promise<SubcategoryItem[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(subcategoryItems).orderBy(subcategoryItems.sortOrder);
  }

  async getSubcategoryItemsByCategory(categoryId: number): Promise<SubcategoryItem[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(subcategoryItems)
      .where(eq(subcategoryItems.categoryId, categoryId))
      .orderBy(subcategoryItems.sortOrder);
  }

  async getSubcategoryItemsBySubcategory(subcategoryId: number): Promise<SubcategoryItem[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(subcategoryItems)
      .where(eq(subcategoryItems.subcategoryId, subcategoryId))
      .orderBy(subcategoryItems.sortOrder);
  }

  async getSubcategoryItem(id: number): Promise<SubcategoryItem | undefined> {
    if (!db) throw new Error('Database not available');
    const result = await db.select().from(subcategoryItems).where(eq(subcategoryItems.id, id));
    return result[0];
  }

  async createSubcategoryItem(item: InsertSubcategoryItem): Promise<SubcategoryItem> {
    if (!db) throw new Error('Database not available');
    const [newItem] = await db
      .insert(subcategoryItems)
      .values(item)
      .returning();
    return newItem;
  }

  async updateSubcategoryItem(id: number, item: Partial<InsertSubcategoryItem>): Promise<SubcategoryItem> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(subcategoryItems)
      .set(item)
      .where(eq(subcategoryItems.id, id))
      .returning();
    return updated;
  }

  async deleteSubcategoryItem(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(subcategoryItems).where(eq(subcategoryItems.id, id));
  }

  // Certificate methods
  async getAllCertificates(): Promise<Certificate[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(certificates).orderBy(certificates.sortOrder);
  }

  async getCertificatesByCategory(categoryId: number): Promise<Certificate[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(certificates)
      .where(eq(certificates.categoryId, categoryId))
      .orderBy(certificates.sortOrder);
  }

  async getCertificatesBySubcategory(subcategoryId: number): Promise<Certificate[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(certificates)
      .where(eq(certificates.subcategoryId, subcategoryId))
      .orderBy(certificates.sortOrder);
  }

  async getCertificate(id: number): Promise<Certificate | undefined> {
    if (!db) throw new Error('Database not available');
    const result = await db.select().from(certificates).where(eq(certificates.id, id));
    return result[0];
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    if (!db) throw new Error('Database not available');
    console.log('=== Storage: Creating Certificate ===');
    console.log('Received certificate data:', JSON.stringify(certificate, null, 2));
    console.log('Database connection status:', !!db);
    
    try {
      const [newCertificate] = await db
        .insert(certificates)
        .values(certificate)
        .returning();
      
      console.log('Created certificate result:', JSON.stringify(newCertificate, null, 2));
      console.log('Translations field value:', newCertificate.translations);
      console.log('Default language field value:', newCertificate.defaultLanguage);
      return newCertificate;
    } catch (error) {
      console.error('Error creating certificate:', error);
      throw error;
    }
  }

  async updateCertificate(id: number, certificate: Partial<InsertCertificate>): Promise<Certificate> {
    if (!db) throw new Error('Database not available');
    console.log('=== Storage: Updating Certificate ===');
    console.log('Certificate ID:', id);
    console.log('Update data:', JSON.stringify(certificate, null, 2));
    console.log('Database connection status:', !!db);
    
    try {
      const [updated] = await db
        .update(certificates)
        .set(certificate)
        .where(eq(certificates.id, id))
        .returning();
      
      console.log('Updated certificate result:', JSON.stringify(updated, null, 2));
      console.log('Translations field value:', updated.translations);
      console.log('Default language field value:', updated.defaultLanguage);
      return updated;
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw error;
    }
  }

  async deleteCertificate(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(certificates).where(eq(certificates.id, id));
  }
  
  // Brochure methods
  async getAllBrochures(): Promise<Brochure[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(brochures).orderBy(desc(brochures.createdAt));
  }

  async getBrochuresByLanguage(language: string): Promise<Brochure[]> {
    if (!db) throw new Error('Database not available');
    return await db
      .select()
      .from(brochures)
      .where(and(eq(brochures.language, language), eq(brochures.active, true)))
      .orderBy(brochures.sortOrder, desc(brochures.createdAt));
  }

  async getBrochuresByCategory(category: string): Promise<Brochure[]> {
    if (!db) throw new Error('Database not available');
    return await db
      .select()
      .from(brochures)
      .where(and(eq(brochures.category, category), eq(brochures.active, true)))
      .orderBy(brochures.sortOrder, desc(brochures.createdAt));
  }

  async getBrochuresByLanguageAndCategory(language: string, category: string): Promise<Brochure[]> {
    if (!db) throw new Error('Database not available');
    return await db
      .select()
      .from(brochures)
      .where(and(
        eq(brochures.language, language),
        eq(brochures.category, category),
        eq(brochures.active, true)
      ))
      .orderBy(brochures.sortOrder, desc(brochures.createdAt));
  }

  async getBrochuresByTranslationGroup(translationGroup: string): Promise<Brochure[]> {
    if (!db) throw new Error('Database not available');
    return await db
      .select()
      .from(brochures)
      .where(eq(brochures.translationGroup, translationGroup))
      .orderBy(brochures.language, desc(brochures.createdAt));
  }

  async getActiveBrochures(): Promise<Brochure[]> {
    if (!db) throw new Error('Database not available');
    return await db
      .select()
      .from(brochures)
      .where(eq(brochures.active, true))
      .orderBy(brochures.sortOrder, desc(brochures.createdAt));
  }

  async getBrochureById(id: string): Promise<Brochure | undefined> {
    if (!db) throw new Error('Database not available');
    const [brochure] = await db.select().from(brochures).where(eq(brochures.id, id));
    return brochure || undefined;
  }

  async createBrochure(brochure: InsertBrochure): Promise<Brochure> {
    if (!db) throw new Error('Database not available');
    const [newBrochure] = await db
      .insert(brochures)
      .values(brochure)
      .returning();
    return newBrochure;
  }

  async updateBrochure(id: string, brochure: Partial<InsertBrochure>): Promise<Brochure> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(brochures)
      .set({ ...brochure, updatedAt: new Date() })
      .where(eq(brochures.id, id))
      .returning();
    return updated;
  }

  async deleteBrochure(id: string): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(brochures).where(eq(brochures.id, id));
  }
  
  // Brochure category methods
  async getAllBrochureCategories(): Promise<BrochureCategory[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(brochureCategories).orderBy(asc(brochureCategories.sortOrder), desc(brochureCategories.createdAt));
  }

  async getBrochureCategory(id: number): Promise<BrochureCategory | undefined> {
    if (!db) throw new Error('Database not available');
    const [category] = await db.select().from(brochureCategories).where(eq(brochureCategories.id, id));
    return category || undefined;
  }

  async createBrochureCategory(category: InsertBrochureCategory & { translations?: any }): Promise<BrochureCategory> {
    if (!db) throw new Error('Database not available');
    const [newCategory] = await db
      .insert(brochureCategories)
      .values({
        ...category, 
        translations: category.translations || {}, 
        defaultLanguage: 'en'
      })
      .returning();
    return newCategory;
  }

  async updateBrochureCategory(id: number, category: Partial<InsertBrochureCategory> & { translations?: any }): Promise<BrochureCategory> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(brochureCategories)
      .set({ ...category, updatedAt: new Date() })
      .where(eq(brochureCategories.id, id))
      .returning();
    return updated;
  }

  async deleteBrochureCategory(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(brochureCategories).where(eq(brochureCategories.id, id));
  }
  
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    if (!db) throw new Error('Database not available');
    console.log("=== Storage: getAllProjects called ===");
    try {
      const result = await db.select().from(projects).orderBy(desc(projects.createdAt));
      console.log("Storage: Projects fetched successfully:", result.length);
      return result;
    } catch (error) {
      console.error("Storage: Error fetching projects:", error);
      throw error;
    }
  }

  async getProject(id: number): Promise<Project | undefined> {
    if (!db) throw new Error('Database not available');
    console.log("=== Storage: getProject called ===");
    console.log("Project ID:", id);
    try {
      const [project] = await db.select().from(projects).where(eq(projects.id, id));
      console.log("Storage: Project found:", project);
      return project || undefined;
    } catch (error) {
      console.error("Storage: Error fetching project:", error);
      throw error;
    }
  }

  async createProject(project: InsertProject): Promise<Project> {
    if (!db) throw new Error('Database not available');
    const [newProject] = await db
      .insert(projects)
      .values({...project, translations: {}, defaultLanguage: 'en'})
      .returning();
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updated;
  }

  async deleteProject(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(projects).where(eq(projects.id, id));
  }
  
  // Team methods
  async getAllTeams(): Promise<Team[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(teams).orderBy(asc(teams.sortOrder), desc(teams.createdAt));
  }

  async getTeam(id: number): Promise<Team | undefined> {
    if (!db) throw new Error('Database not available');
    const [team] = await db.select().from(teams).where(eq(teams.id, id));
    return team || undefined;
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    if (!db) throw new Error('Database not available');
    const [newTeam] = await db
      .insert(teams)
      .values({ ...team, createdAt: new Date(), updatedAt: new Date() })
      .returning();
    return newTeam;
  }

  async updateTeam(id: number, team: Partial<InsertTeam>): Promise<Team> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(teams)
      .set({ ...team, updatedAt: new Date() })
      .where(eq(teams.id, id))
      .returning();
    return updated;
  }

  async deleteTeam(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(teams).where(eq(teams.id, id));
  }
  
  // Position methods
  async getAllPositions(): Promise<Position[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(positions).orderBy(asc(positions.sortOrder));
  }

  async getPosition(id: number): Promise<Position | undefined> {
    if (!db) throw new Error('Database not available');
    const [position] = await db.select().from(positions).where(eq(positions.id, id));
    return position || undefined;
  }

  async createPosition(position: InsertPosition): Promise<Position> {
    if (!db) throw new Error('Database not available');
    console.log('Storage: Creating new position');
    console.log('Storage: Position data to create:', position);
    
    const [newPosition] = await db
      .insert(positions)
      .values({ ...position, createdAt: new Date(), updatedAt: new Date() })
      .returning();
    
    console.log('Storage: Created position result:', newPosition);
    return newPosition;
  }

  async updatePosition(id: number, position: Partial<InsertPosition>): Promise<Position> {
    if (!db) throw new Error('Database not available');
    console.log('Storage: Updating position with ID:', id);
    console.log('Storage: Position data to update:', position);
    
    const [updated] = await db
      .update(positions)
      .set({ ...position, updatedAt: new Date() })
      .where(eq(positions.id, id))
      .returning();
    
    console.log('Storage: Updated position result:', updated);
    return updated;
  }

  async deletePosition(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(positions).where(eq(positions.id, id));
  }

  // Gallery category methods
  async getAllGalleryCategories(): Promise<GalleryCategory[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(galleryCategories).orderBy(asc(galleryCategories.sortOrder));
  }

  async getGalleryCategory(id: number): Promise<GalleryCategory | undefined> {
    if (!db) throw new Error('Database not available');
    const [category] = await db.select().from(galleryCategories).where(eq(galleryCategories.id, id));
    return category || undefined;
  }

  async createGalleryCategory(insertCategory: InsertGalleryCategory): Promise<GalleryCategory> {
    if (!db) throw new Error('Database not available');
    const [category] = await db
      .insert(galleryCategories)
      .values({...insertCategory, translations: {}, defaultLanguage: 'en'})
      .returning();
    return category;
  }

  async updateGalleryCategory(id: number, category: Partial<InsertGalleryCategory>): Promise<GalleryCategory> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(galleryCategories)
      .set({ ...category, updatedAt: new Date() })
      .where(eq(galleryCategories.id, id))
      .returning();
    return updated;
  }

  async deleteGalleryCategory(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(galleryCategories).where(eq(galleryCategories.id, id));
  }

  // Gallery item methods
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder));
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    if (!db) throw new Error('Database not available');
    const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
    return item || undefined;
  }

  async getGalleryItemsByCategory(categoryId: number): Promise<GalleryItem[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(galleryItems)
      .where(eq(galleryItems.categoryId, categoryId))
      .orderBy(asc(galleryItems.sortOrder));
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    if (!db) throw new Error('Database not available');
    const [item] = await db
      .insert(galleryItems)
      .values(insertItem)
      .returning();
    return item;
  }

  async updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(galleryItems)
      .set({ ...item, updatedAt: new Date() })
      .where(eq(galleryItems.id, id))
      .returning();
    return updated;
  }

  async deleteGalleryItem(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(galleryItems).where(eq(galleryItems.id, id));
  }

  // Contact message methods - in-memory storage for development
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return this.contactMessagesData.sort((a, b) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessagesData.find(message => message.id === id);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now(),
      phone: message.phone ?? null,
      company: message.company ?? null,
      status: "unread",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.contactMessagesData.push(newMessage);
    return newMessage;
  }

  async updateContactMessage(id: number, message: Partial<ContactMessage>): Promise<ContactMessage> {
    const index = this.contactMessagesData.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Contact message not found');
    
    this.contactMessagesData[index] = {
      ...this.contactMessagesData[index],
      ...message,
      updatedAt: new Date()
    };
    return this.contactMessagesData[index];
  }

  async deleteContactMessage(id: number): Promise<void> {
    const index = this.contactMessagesData.findIndex(m => m.id === id);
    if (index !== -1) {
      this.contactMessagesData.splice(index, 1);
    }
  }

  // Job application methods - in-memory storage for development
  async getAllJobApplications(): Promise<JobApplication[]> {
    return this.jobApplicationsData.sort((a, b) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getJobApplication(id: number): Promise<JobApplication | undefined> {
    return this.jobApplicationsData.find(application => application.id === id);
  }

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const newApplication: JobApplication = {
      ...application,
      id: Date.now(),
      phoneNumber: application.phoneNumber ?? null,
      experience: application.experience ?? null,
      coverLetter: application.coverLetter ?? null,
      resumeUrl: application.resumeUrl ?? null,
      status: "pending",
      notes: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.jobApplicationsData.push(newApplication);
    return newApplication;
  }

  async updateJobApplication(id: number, application: Partial<JobApplication>): Promise<JobApplication> {
    const index = this.jobApplicationsData.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Job application not found');
    
    this.jobApplicationsData[index] = {
      ...this.jobApplicationsData[index],
      ...application,
      updatedAt: new Date()
    };
    return this.jobApplicationsData[index];
  }

  async deleteJobApplication(id: number): Promise<void> {
    const index = this.jobApplicationsData.findIndex(a => a.id === id);
    if (index !== -1) {
      this.jobApplicationsData.splice(index, 1);
    }
  }

  // Brevo configuration methods - in-memory storage for development
  private brevoConfigData: BrevoConfig | null = null;
  
  async getBrevoConfig(): Promise<BrevoConfig | undefined> {
    return this.brevoConfigData || undefined;
  }

  async createBrevoConfig(config: InsertBrevoConfig): Promise<BrevoConfig> {
    const newConfig: BrevoConfig = {
      ...config,
      id: 1,
      brevoApiKey: config.brevoApiKey ?? null,
      validatedSenderEmail: config.validatedSenderEmail ?? null,
      templateId: config.templateId ?? null,
      isActive: config.isActive ?? null,
      recipientEmail: config.recipientEmail || "admin@kontihidroplast.com",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.brevoConfigData = newConfig;
    return newConfig;
  }

  async updateBrevoConfig(id: number, config: Partial<InsertBrevoConfig>): Promise<BrevoConfig> {
    if (!this.brevoConfigData) throw new Error('Brevo configuration not found');
    
    this.brevoConfigData = {
      ...this.brevoConfigData,
      ...config,
      updatedAt: new Date()
    };
    return this.brevoConfigData;
  }

  async deleteBrevoConfig(id: number): Promise<void> {
    this.brevoConfigData = null;
  }
}

// Create storage instance lazily to ensure environment variables are loaded
let _storage: IStorage | null = null;

function getStorage(): IStorage {
  if (!_storage) {
    console.log("=== STORAGE INITIALIZATION ===");
    console.log("process.env.DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("process.env.DATABASE_URL value:", process.env.DATABASE_URL);
    console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
    console.log("=================================");
    
    _storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
  }
  return _storage;
}

// Export storage as a getter that initializes when first accessed
export const storage = new Proxy({} as IStorage, {
  get(target, prop) {
    return getStorage()[prop as keyof IStorage];
  }
});
