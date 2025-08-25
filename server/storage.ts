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
      .values({...category, translations: {}, defaultLanguage: 'en'})
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
      .values({...subcategory, translations: {}, defaultLanguage: 'en'})
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
    const [newCertificate] = await db
      .insert(certificates)
      .values({...certificate, translations: {}, defaultLanguage: 'en'})
      .returning();
    return newCertificate;
  }

  async updateCertificate(id: number, certificate: Partial<InsertCertificate>): Promise<Certificate> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(certificates)
      .set(certificate)
      .where(eq(certificates.id, id))
      .returning();
    return updated;
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
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    if (!db) throw new Error('Database not available');
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
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
      .values(team)
      .returning();
    return newTeam;
  }

  async updateTeam(id: number, team: Partial<InsertTeam>): Promise<Team> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(teams)
      .set(team)
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
    const [newPosition] = await db
      .insert(positions)
      .values({...position, translations: {}, defaultLanguage: 'en'})
      .returning();
    return newPosition;
  }

  async updatePosition(id: number, position: Partial<InsertPosition>): Promise<Position> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(positions)
      .set(position)
      .where(eq(positions.id, id))
      .returning();
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

  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    if (!db) throw new Error('Database not available');
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message || undefined;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    if (!db) throw new Error('Database not available');
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async updateContactMessage(id: number, message: Partial<ContactMessage>): Promise<ContactMessage> {
    if (!db) throw new Error('Database not available');
    const [updatedMessage] = await db
      .update(contactMessages)
      .set({ ...message, updatedAt: new Date() })
      .where(eq(contactMessages.id, id))
      .returning();
    if (!updatedMessage) throw new Error('Contact message not found');
    return updatedMessage;
  }

  async deleteContactMessage(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
  }

  // Job application methods
  async getAllJobApplications(): Promise<JobApplication[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(jobApplications).orderBy(desc(jobApplications.createdAt));
  }

  async getJobApplication(id: number): Promise<JobApplication | undefined> {
    if (!db) throw new Error('Database not available');
    const [application] = await db.select().from(jobApplications).where(eq(jobApplications.id, id));
    return application || undefined;
  }

  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    if (!db) throw new Error('Database not available');
    const [newApplication] = await db.insert(jobApplications).values(application).returning();
    return newApplication;
  }

  async updateJobApplication(id: number, application: Partial<JobApplication>): Promise<JobApplication> {
    if (!db) throw new Error('Database not available');
    const [updatedApplication] = await db
      .update(jobApplications)
      .set({ ...application, updatedAt: new Date() })
      .where(eq(jobApplications.id, id))
      .returning();
    if (!updatedApplication) throw new Error('Job application not found');
    return updatedApplication;
  }

  async deleteJobApplication(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(jobApplications).where(eq(jobApplications.id, id));
  }

  // Brevo configuration methods
  async getBrevoConfig(): Promise<BrevoConfig | undefined> {
    if (!db) throw new Error('Database not available');
    const [config] = await db.select().from(brevoConfig).limit(1);
    return config || undefined;
  }

  async createBrevoConfig(config: InsertBrevoConfig): Promise<BrevoConfig> {
    if (!db) throw new Error('Database not available');
    const [newConfig] = await db.insert(brevoConfig).values(config).returning();
    return newConfig;
  }

  async updateBrevoConfig(id: number, config: Partial<InsertBrevoConfig>): Promise<BrevoConfig> {
    if (!db) throw new Error('Database not available');
    const [updatedConfig] = await db
      .update(brevoConfig)
      .set({ ...config, updatedAt: new Date() })
      .where(eq(brevoConfig.id, id))
      .returning();
    if (!updatedConfig) throw new Error('Brevo configuration not found');
    return updatedConfig;
  }

  async deleteBrevoConfig(id: number): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(brevoConfig).where(eq(brevoConfig.id, id));
  }
}

// In-memory storage implementation for development
export class MemStorage implements IStorage {
  private users: User[] = [];
  private productsData: Product[] = [];
  private mediaData: Media[] = [];
  private companyInfoData: CompanyInfo[] = [];
  private newsData: NewsArticle[] = [];
  private certificateCategoriesData: CertificateCategory[] = [];
  private certificateSubcategoriesData: CertificateSubcategory[] = [];
  private certificatesData: Certificate[] = [];
  private brochuresData: Brochure[] = [];
  private brochureCategoriesData: BrochureCategory[] = [];
  private projectsData: Project[] = [];
  private teamsData: Team[] = [];
  private positionsData: Position[] = [];
  private galleryCategoriesData: GalleryCategory[] = [];
  private galleryItemsData: GalleryItem[] = [];
  private contactMessagesData: ContactMessage[] = [];
  private jobApplicationsData: JobApplication[] = [];

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getAdminUser(): Promise<User | undefined> {
    return this.users.find(user => user.role === 'admin');
  }

  async createUser(user: InsertUser): Promise<User> {
    // Prevent creating multiple admin users
    if (user.role === 'admin') {
      const existingAdmin = await this.getAdminUser();
      if (existingAdmin) {
        throw new Error('An admin user already exists. Only one admin user is allowed.');
      }
    }
    const newUser: User = {
      ...user,
      id: `user_${Date.now()}`,
      email: user.email ?? null,
      role: user.role ?? "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = {
      ...this.users[index],
      ...user,
      updatedAt: new Date()
    };
    return this.users[index];
  }

  async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return this.productsData.sort((a, b) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.productsData.find(product => product.id === id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: `product_${Date.now()}`,
      subcategory: product.subcategory ?? null,
      description: product.description ?? null,
      specifications: product.specifications ?? null,
      images: product.images ?? null,
      brochureUrl: product.brochureUrl ?? null,
      featured: product.featured ?? null,
      active: product.active ?? null,
      sortOrder: product.sortOrder ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.productsData.push(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    const index = this.productsData.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    
    this.productsData[index] = {
      ...this.productsData[index],
      ...product,
      updatedAt: new Date()
    };
    return this.productsData[index];
  }

  async deleteProduct(id: string): Promise<void> {
    const index = this.productsData.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productsData.splice(index, 1);
    }
  }

  // Media methods
  async getAllMedia(): Promise<Media[]> {
    return this.mediaData.sort((a, b) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getMediaByCategory(category: string): Promise<Media[]> {
    return this.mediaData.filter(m => m.category === category);
  }

  async createMedia(media: InsertMedia): Promise<Media> {
    const newMedia: Media = {
      ...media,
      id: `media_${Date.now()}`,
      altText: media.altText ?? null,
      fileSize: media.fileSize ?? null,
      mimeType: media.mimeType ?? null,
      createdAt: new Date()
    };
    this.mediaData.push(newMedia);
    return newMedia;
  }

  async deleteMedia(id: string): Promise<void> {
    const index = this.mediaData.findIndex(m => m.id === id);
    if (index !== -1) {
      this.mediaData.splice(index, 1);
    }
  }

  // Company info methods
  async getAllCompanyInfo(): Promise<CompanyInfo[]> {
    return this.companyInfoData;
  }

  async getCompanyInfoByKey(key: string): Promise<CompanyInfo | undefined> {
    return this.companyInfoData.find(info => info.key === key);
  }

  async upsertCompanyInfo(info: InsertCompanyInfo): Promise<CompanyInfo> {
    const existingIndex = this.companyInfoData.findIndex(i => i.key === info.key);
    
    if (existingIndex !== -1) {
      this.companyInfoData[existingIndex] = {
        ...this.companyInfoData[existingIndex],
        ...info,
        updatedAt: new Date()
      };
      return this.companyInfoData[existingIndex];
    } else {
      const newInfo: CompanyInfo = {
        ...info,
        id: `info_${Date.now()}`,
        updatedAt: new Date()
      };
      this.companyInfoData.push(newInfo);
      return newInfo;
    }
  }

  // News methods
  async getAllNews(): Promise<NewsArticle[]> {
    return this.newsData.sort((a, b) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getNews(id: string): Promise<NewsArticle | undefined> {
    return this.newsData.find(news => news.id === id);
  }

  async createNews(news: InsertNewsArticle): Promise<NewsArticle> {
    const newNews: NewsArticle = {
      ...news,
      id: `news_${Date.now()}`,
      description: news.description ?? null,
      subtitle: news.subtitle ?? null,
      imageUrl: news.imageUrl ?? null,
      author: news.author ?? null,
      published: news.published ?? null,
      publishedAt: news.publishedAt ?? null,
      sections: news.sections ?? [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.newsData.push(newNews);
    return newNews;
  }

  async updateNews(id: string, news: Partial<InsertNewsArticle>): Promise<NewsArticle> {
    const index = this.newsData.findIndex(n => n.id === id);
    if (index === -1) throw new Error('News article not found');
    
    this.newsData[index] = {
      ...this.newsData[index],
      ...news,
      updatedAt: new Date()
    };
    return this.newsData[index];
  }

  async deleteNews(id: string): Promise<void> {
    const index = this.newsData.findIndex(n => n.id === id);
    if (index !== -1) {
      this.newsData.splice(index, 1);
    }
  }

  // Certificate methods
  // Certificate Category methods
  async getAllCertificateCategories(): Promise<CertificateCategory[]> {
    return this.certificateCategoriesData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getCertificateCategory(id: number): Promise<CertificateCategory | undefined> {
    return this.certificateCategoriesData.find(c => c.id === id);
  }

  async createCertificateCategory(category: InsertCertificateCategory): Promise<CertificateCategory> {
    const newCategory: CertificateCategory = {
      ...category,
      id: Date.now(),
      description: category.description ?? null,
      status: category.status || "active",
      sortOrder: category.sortOrder ?? 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.certificateCategoriesData.push(newCategory);
    return newCategory;
  }

  async updateCertificateCategory(id: number, category: Partial<InsertCertificateCategory>): Promise<CertificateCategory> {
    const index = this.certificateCategoriesData.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Certificate category not found');
    
    this.certificateCategoriesData[index] = {
      ...this.certificateCategoriesData[index],
      ...category,
      updatedAt: new Date()
    };
    return this.certificateCategoriesData[index];
  }

  async deleteCertificateCategory(id: number): Promise<void> {
    const index = this.certificateCategoriesData.findIndex(c => c.id === id);
    if (index !== -1) {
      this.certificateCategoriesData.splice(index, 1);
    }
  }

  // Certificate Subcategory methods
  async getAllCertificateSubcategories(): Promise<CertificateSubcategory[]> {
    return this.certificateSubcategoriesData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getCertificateSubcategoriesByCategory(categoryId: number): Promise<CertificateSubcategory[]> {
    return this.certificateSubcategoriesData
      .filter(s => s.categoryId === categoryId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getCertificateSubcategory(id: number): Promise<CertificateSubcategory | undefined> {
    return this.certificateSubcategoriesData.find(s => s.id === id);
  }

  async createCertificateSubcategory(subcategory: InsertCertificateSubcategory): Promise<CertificateSubcategory> {
    const newSubcategory: CertificateSubcategory = {
      ...subcategory,
      id: Date.now(),
      description: subcategory.description ?? null,
      status: subcategory.status || "active",
      sortOrder: subcategory.sortOrder ?? 0,
      categoryId: subcategory.categoryId ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.certificateSubcategoriesData.push(newSubcategory);
    return newSubcategory;
  }

  async updateCertificateSubcategory(id: number, subcategory: Partial<InsertCertificateSubcategory>): Promise<CertificateSubcategory> {
    const index = this.certificateSubcategoriesData.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Certificate subcategory not found');
    
    this.certificateSubcategoriesData[index] = {
      ...this.certificateSubcategoriesData[index],
      ...subcategory,
      updatedAt: new Date()
    };
    return this.certificateSubcategoriesData[index];
  }

  async deleteCertificateSubcategory(id: number): Promise<void> {
    const index = this.certificateSubcategoriesData.findIndex(s => s.id === id);
    if (index !== -1) {
      this.certificateSubcategoriesData.splice(index, 1);
    }
  }

  // Certificate methods
  async getAllCertificates(): Promise<Certificate[]> {
    return this.certificatesData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getCertificatesByCategory(categoryId: number): Promise<Certificate[]> {
    return this.certificatesData
      .filter(c => c.categoryId === categoryId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getCertificatesBySubcategory(subcategoryId: number): Promise<Certificate[]> {
    return this.certificatesData
      .filter(c => c.subcategoryId === subcategoryId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getCertificate(id: number): Promise<Certificate | undefined> {
    return this.certificatesData.find(c => c.id === id);
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const newCertificate: Certificate = {
      ...certificate,
      id: Date.now(),
      status: certificate.status || "active",
      sortOrder: certificate.sortOrder ?? 0,
      categoryId: certificate.categoryId ?? null,
      subcategoryId: certificate.subcategoryId ?? null,
      downloadUrl: certificate.downloadUrl ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.certificatesData.push(newCertificate);
    return newCertificate;
  }

  async updateCertificate(id: number, certificate: Partial<InsertCertificate>): Promise<Certificate> {
    const index = this.certificatesData.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Certificate not found');
    
    this.certificatesData[index] = {
      ...this.certificatesData[index],
      ...certificate,
      updatedAt: new Date()
    };
    return this.certificatesData[index];
  }

  async deleteCertificate(id: number): Promise<void> {
    const index = this.certificatesData.findIndex(c => c.id === id);
    if (index !== -1) {
      this.certificatesData.splice(index, 1);
    }
  }

  // Brochure methods
  async getAllBrochures(): Promise<Brochure[]> {
    return this.brochuresData.sort((a, b) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getBrochuresByLanguage(language: string): Promise<Brochure[]> {
    return this.brochuresData
      .filter(brochure => brochure.language === language && brochure.active)
      .sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) {
          return (a.sortOrder || 0) - (b.sortOrder || 0);
        }
        const aTime = a.createdAt?.getTime() || 0;
        const bTime = b.createdAt?.getTime() || 0;
        return bTime - aTime;
      });
  }

  async getBrochuresByCategory(category: string): Promise<Brochure[]> {
    return this.brochuresData
      .filter(brochure => brochure.category === category && brochure.active)
      .sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) {
          return (a.sortOrder || 0) - (b.sortOrder || 0);
        }
        const aTime = a.createdAt?.getTime() || 0;
        const bTime = b.createdAt?.getTime() || 0;
        return bTime - aTime;
      });
  }

  async getBrochuresByLanguageAndCategory(language: string, category: string): Promise<Brochure[]> {
    return this.brochuresData
      .filter(brochure => 
        brochure.language === language && 
        brochure.category === category && 
        brochure.active
      )
      .sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) {
          return (a.sortOrder || 0) - (b.sortOrder || 0);
        }
        const aTime = a.createdAt?.getTime() || 0;
        const bTime = b.createdAt?.getTime() || 0;
        return bTime - aTime;
      });
  }

  async getBrochuresByTranslationGroup(translationGroup: string): Promise<Brochure[]> {
    return this.brochuresData
      .filter(brochure => brochure.translationGroup === translationGroup)
      .sort((a, b) => {
        if (a.language !== b.language) {
          return a.language.localeCompare(b.language);
        }
        const aTime = a.createdAt?.getTime() || 0;
        const bTime = b.createdAt?.getTime() || 0;
        return bTime - aTime;
      });
  }

  async getActiveBrochures(): Promise<Brochure[]> {
    return this.brochuresData
      .filter(brochure => brochure.active)
      .sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) {
          return (a.sortOrder || 0) - (b.sortOrder || 0);
        }
        const aTime = a.createdAt?.getTime() || 0;
        const bTime = b.createdAt?.getTime() || 0;
        return bTime - aTime;
      });
  }

  async getBrochureById(id: string): Promise<Brochure | undefined> {
    return this.brochuresData.find(brochure => brochure.id === id);
  }

  async createBrochure(brochure: InsertBrochure): Promise<Brochure> {
    const newBrochure: Brochure = {
      ...brochure,
      id: `brochure_${Date.now()}`,
      description: brochure.description ?? null,
      active: brochure.active ?? null,
      sortOrder: brochure.sortOrder ?? null,
      imageUrl: brochure.imageUrl ?? null,
      translationGroup: brochure.translationGroup ?? null,
      translationMetadata: brochure.translationMetadata ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.brochuresData.push(newBrochure);
    return newBrochure;
  }

  async updateBrochure(id: string, brochure: Partial<InsertBrochure>): Promise<Brochure> {
    const index = this.brochuresData.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Brochure not found');
    
    this.brochuresData[index] = {
      ...this.brochuresData[index],
      ...brochure,
      updatedAt: new Date()
    };
    return this.brochuresData[index];
  }

  async deleteBrochure(id: string): Promise<void> {
    const index = this.brochuresData.findIndex(b => b.id === id);
    if (index !== -1) {
      this.brochuresData.splice(index, 1);
    }
  }
  
  // Brochure category methods
  async getAllBrochureCategories(): Promise<BrochureCategory[]> {
    return this.brochureCategoriesData.sort((a, b) => {
      // Primary sort by sortOrder (ascending, with null values last)
      const aOrder = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const bOrder = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      
      // Secondary sort by createdAt (descending)
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getBrochureCategory(id: number): Promise<BrochureCategory | undefined> {
    return this.brochureCategoriesData.find(category => category.id === id);
  }

  async createBrochureCategory(category: InsertBrochureCategory): Promise<BrochureCategory> {
    const newCategory: BrochureCategory = {
      ...category,
      id: this.brochureCategoriesData.length + 1,
      description: category.description ?? null,
      active: category.active ?? null,
      sortOrder: category.sortOrder ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: category.status ?? "active"
    };
    this.brochureCategoriesData.push(newCategory);
    return newCategory;
  }

  async updateBrochureCategory(id: number, category: Partial<InsertBrochureCategory>): Promise<BrochureCategory> {
    const index = this.brochureCategoriesData.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Brochure category not found');
    
    this.brochureCategoriesData[index] = {
      ...this.brochureCategoriesData[index],
      ...category,
      updatedAt: new Date()
    };
    return this.brochureCategoriesData[index];
  }

  async deleteBrochureCategory(id: number): Promise<void> {
    const index = this.brochureCategoriesData.findIndex(c => c.id === id);
    if (index !== -1) {
      this.brochureCategoriesData.splice(index, 1);
    }
  }
  
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return this.projectsData.sort((a, b) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsData.find(project => project.id === id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: this.projectsData.length + 1,
      description: project.description ?? null,
      imageUrl: project.imageUrl ?? null,
      pdfUrl: project.pdfUrl ?? null,
      status: project.status ?? null,
      sortOrder: project.sortOrder ?? 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.projectsData.push(newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const index = this.projectsData.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    this.projectsData[index] = {
      ...this.projectsData[index],
      ...project,
      updatedAt: new Date()
    };
    return this.projectsData[index];
  }

  async deleteProject(id: number): Promise<void> {
    const index = this.projectsData.findIndex(p => p.id === id);
    if (index !== -1) {
      this.projectsData.splice(index, 1);
    }
  }
  
  // Team methods
  async getAllTeams(): Promise<Team[]> {
    return this.teamsData.sort((a, b) => {
      // Primary sort by sortOrder (ascending, with null values last)
      const aOrder = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const bOrder = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      
      // Secondary sort by createdAt (descending)
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getTeam(id: number): Promise<Team | undefined> {
    return this.teamsData.find(team => team.id === id);
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    const newTeam: Team = {
      ...team,
      id: this.teamsData.length + 1,
      imageUrl: team.imageUrl ?? null,
      active: team.active ?? null,
      sortOrder: team.sortOrder ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.teamsData.push(newTeam);
    return newTeam;
  }

  async updateTeam(id: number, team: Partial<InsertTeam>): Promise<Team> {
    const index = this.teamsData.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Team member not found');
    
    this.teamsData[index] = {
      ...this.teamsData[index],
      ...team,
      updatedAt: new Date()
    };
    return this.teamsData[index];
  }

  async deleteTeam(id: number): Promise<void> {
    const index = this.teamsData.findIndex(t => t.id === id);
    if (index !== -1) {
      this.teamsData.splice(index, 1);
    }
  }
  
  // Position methods
  async getAllPositions(): Promise<Position[]> {
    return this.positionsData.sort((a, b) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async getPosition(id: number): Promise<Position | undefined> {
    return this.positionsData.find(position => position.id === id);
  }

  async createPosition(position: InsertPosition): Promise<Position> {
    const newPosition: Position = {
      ...position,
      id: this.positionsData.length + 1,
      description: position.description ?? null,
      active: position.active ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.positionsData.push(newPosition);
    return newPosition;
  }

  async updatePosition(id: number, position: Partial<InsertPosition>): Promise<Position> {
    const index = this.positionsData.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Position not found');
    
    this.positionsData[index] = {
      ...this.positionsData[index],
      ...position,
      updatedAt: new Date()
    };
    return this.positionsData[index];
  }

  async deletePosition(id: number): Promise<void> {
    const index = this.positionsData.findIndex(p => p.id === id);
    if (index !== -1) {
      this.positionsData.splice(index, 1);
    }
  }

  // Gallery category methods
  async getAllGalleryCategories(): Promise<GalleryCategory[]> {
    return this.galleryCategoriesData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getGalleryCategory(id: number): Promise<GalleryCategory | undefined> {
    return this.galleryCategoriesData.find(category => category.id === id);
  }

  async createGalleryCategory(category: InsertGalleryCategory): Promise<GalleryCategory> {
    const newCategory: GalleryCategory = {
      ...category,
      id: Date.now(),
      imageUrl: category.imageUrl || null,
      status: category.status || "active",
      sortOrder: category.sortOrder || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.galleryCategoriesData.push(newCategory);
    return newCategory;
  }

  async updateGalleryCategory(id: number, category: Partial<InsertGalleryCategory>): Promise<GalleryCategory> {
    const index = this.galleryCategoriesData.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Gallery category not found');
    
    this.galleryCategoriesData[index] = {
      ...this.galleryCategoriesData[index],
      ...category,
      updatedAt: new Date()
    };
    return this.galleryCategoriesData[index];
  }

  async deleteGalleryCategory(id: number): Promise<void> {
    const index = this.galleryCategoriesData.findIndex(c => c.id === id);
    if (index !== -1) {
      this.galleryCategoriesData.splice(index, 1);
    }
  }

  // Gallery item methods
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return this.galleryItemsData.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItemsData.find(item => item.id === id);
  }

  async getGalleryItemsByCategory(categoryId: number): Promise<GalleryItem[]> {
    return this.galleryItemsData
      .filter(item => item.categoryId === categoryId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const newItem: GalleryItem = {
      ...item,
      id: Date.now(),
      status: item.status || "active",
      sortOrder: item.sortOrder || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.galleryItemsData.push(newItem);
    return newItem;
  }

  async updateGalleryItem(id: number, item: Partial<InsertGalleryItem>): Promise<GalleryItem> {
    const index = this.galleryItemsData.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Gallery item not found');
    
    this.galleryItemsData[index] = {
      ...this.galleryItemsData[index],
      ...item,
      updatedAt: new Date()
    };
    return this.galleryItemsData[index];
  }

  async deleteGalleryItem(id: number): Promise<void> {
    const index = this.galleryItemsData.findIndex(i => i.id === id);
    if (index !== -1) {
      this.galleryItemsData.splice(index, 1);
    }
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
