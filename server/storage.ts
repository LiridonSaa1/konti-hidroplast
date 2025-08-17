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
  type Brochure,
  type InsertBrochure,
  type Project,
  type InsertProject,
  users,
  products,
  media,
  companyInfo,
  newsArticles,
  certificates,
  brochures,
  projects,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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
  
  // Certificate methods
  getAllCertificates(): Promise<Certificate[]>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  updateCertificate(id: string, certificate: Partial<InsertCertificate>): Promise<Certificate>;
  deleteCertificate(id: string): Promise<void>;
  
  // Brochure methods
  getAllBrochures(): Promise<Brochure[]>;
  createBrochure(brochure: InsertBrochure): Promise<Brochure>;
  updateBrochure(id: string, brochure: Partial<InsertBrochure>): Promise<Brochure>;
  deleteBrochure(id: string): Promise<void>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    const [updated] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }
  
  // Media methods
  async getAllMedia(): Promise<Media[]> {
    return await db.select().from(media).orderBy(desc(media.createdAt));
  }

  async getMediaByCategory(category: string): Promise<Media[]> {
    return await db.select().from(media).where(eq(media.category, category));
  }

  async createMedia(mediaItem: InsertMedia): Promise<Media> {
    const [newMedia] = await db
      .insert(media)
      .values(mediaItem)
      .returning();
    return newMedia;
  }

  async deleteMedia(id: string): Promise<void> {
    await db.delete(media).where(eq(media.id, id));
  }
  
  // Company info methods
  async getAllCompanyInfo(): Promise<CompanyInfo[]> {
    return await db.select().from(companyInfo);
  }

  async getCompanyInfoByKey(key: string): Promise<CompanyInfo | undefined> {
    const [info] = await db.select().from(companyInfo).where(eq(companyInfo.key, key));
    return info || undefined;
  }

  async upsertCompanyInfo(info: InsertCompanyInfo): Promise<CompanyInfo> {
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
    return await db.select().from(newsArticles).orderBy(desc(newsArticles.createdAt));
  }

  async getNews(id: string): Promise<NewsArticle | undefined> {
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.id, id));
    return article || undefined;
  }

  async createNews(news: InsertNewsArticle): Promise<NewsArticle> {
    const [newNews] = await db
      .insert(newsArticles)
      .values(news)
      .returning();
    return newNews;
  }

  async updateNews(id: string, news: Partial<InsertNewsArticle>): Promise<NewsArticle> {
    const [updated] = await db
      .update(newsArticles)
      .set({ ...news, updatedAt: new Date() })
      .where(eq(newsArticles.id, id))
      .returning();
    return updated;
  }

  async deleteNews(id: string): Promise<void> {
    await db.delete(newsArticles).where(eq(newsArticles.id, id));
  }
  
  // Certificate methods
  async getAllCertificates(): Promise<Certificate[]> {
    return await db.select().from(certificates).orderBy(desc(certificates.createdAt));
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const [newCertificate] = await db
      .insert(certificates)
      .values(certificate)
      .returning();
    return newCertificate;
  }

  async updateCertificate(id: string, certificate: Partial<InsertCertificate>): Promise<Certificate> {
    const [updated] = await db
      .update(certificates)
      .set(certificate)
      .where(eq(certificates.id, id))
      .returning();
    return updated;
  }

  async deleteCertificate(id: string): Promise<void> {
    await db.delete(certificates).where(eq(certificates.id, id));
  }
  
  // Brochure methods
  async getAllBrochures(): Promise<Brochure[]> {
    return await db.select().from(brochures).orderBy(desc(brochures.createdAt));
  }

  async createBrochure(brochure: InsertBrochure): Promise<Brochure> {
    const [newBrochure] = await db
      .insert(brochures)
      .values(brochure)
      .returning();
    return newBrochure;
  }

  async updateBrochure(id: string, brochure: Partial<InsertBrochure>): Promise<Brochure> {
    const [updated] = await db
      .update(brochures)
      .set(brochure)
      .where(eq(brochures.id, id))
      .returning();
    return updated;
  }

  async deleteBrochure(id: string): Promise<void> {
    await db.delete(brochures).where(eq(brochures.id, id));
  }
  
  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const [updated] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updated;
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }
}

export const storage = new DatabaseStorage();
