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
  type Team,
  type InsertTeam,
  users,
  products,
  media,
  companyInfo,
  newsArticles,
  certificates,
  brochures,
  projects,
  teams,
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
  
  // Team methods
  getAllTeams(): Promise<Team[]>;
  getTeam(id: number): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: number, team: Partial<InsertTeam>): Promise<Team>;
  deleteTeam(id: number): Promise<void>;
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

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error('Database not available');
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
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
      .values(product)
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
      .values(news)
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
  
  // Certificate methods
  async getAllCertificates(): Promise<Certificate[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(certificates).orderBy(desc(certificates.createdAt));
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    if (!db) throw new Error('Database not available');
    const [newCertificate] = await db
      .insert(certificates)
      .values(certificate)
      .returning();
    return newCertificate;
  }

  async updateCertificate(id: string, certificate: Partial<InsertCertificate>): Promise<Certificate> {
    if (!db) throw new Error('Database not available');
    const [updated] = await db
      .update(certificates)
      .set(certificate)
      .where(eq(certificates.id, id))
      .returning();
    return updated;
  }

  async deleteCertificate(id: string): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(certificates).where(eq(certificates.id, id));
  }
  
  // Brochure methods
  async getAllBrochures(): Promise<Brochure[]> {
    if (!db) throw new Error('Database not available');
    return await db.select().from(brochures).orderBy(desc(brochures.createdAt));
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
      .set(brochure)
      .where(eq(brochures.id, id))
      .returning();
    return updated;
  }

  async deleteBrochure(id: string): Promise<void> {
    if (!db) throw new Error('Database not available');
    await db.delete(brochures).where(eq(brochures.id, id));
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
      .values(project)
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
    return await db.select().from(teams).orderBy(desc(teams.createdAt));
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
}

// In-memory storage implementation for development
export class MemStorage implements IStorage {
  private users: User[] = [];
  private productsData: Product[] = [];
  private mediaData: Media[] = [];
  private companyInfoData: CompanyInfo[] = [];
  private newsData: NewsArticle[] = [];
  private certificatesData: Certificate[] = [];
  private brochuresData: Brochure[] = [];
  private projectsData: Project[] = [];
  private teamsData: Team[] = [];

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      ...user,
      id: `user_${Date.now()}`
    };
    this.users.push(newUser);
    return newUser;
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
      excerpt: news.excerpt ?? null,
      imageUrl: news.imageUrl ?? null,
      author: news.author ?? null,
      published: news.published ?? null,
      publishedAt: news.publishedAt ?? null,
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
  async getAllCertificates(): Promise<Certificate[]> {
    return this.certificatesData.sort((a, b) => {
      const aTime = a.createdAt?.getTime() || 0;
      const bTime = b.createdAt?.getTime() || 0;
      return bTime - aTime;
    });
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const newCertificate: Certificate = {
      ...certificate,
      id: `cert_${Date.now()}`,
      imageUrl: certificate.imageUrl ?? null,
      pdfUrl: certificate.pdfUrl ?? null,
      validFrom: certificate.validFrom ?? null,
      validUntil: certificate.validUntil ?? null,
      active: certificate.active ?? null,
      sortOrder: certificate.sortOrder ?? null,
      createdAt: new Date()
    };
    this.certificatesData.push(newCertificate);
    return newCertificate;
  }

  async updateCertificate(id: string, certificate: Partial<InsertCertificate>): Promise<Certificate> {
    const index = this.certificatesData.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Certificate not found');
    
    this.certificatesData[index] = {
      ...this.certificatesData[index],
      ...certificate
    };
    return this.certificatesData[index];
  }

  async deleteCertificate(id: string): Promise<void> {
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

  async createBrochure(brochure: InsertBrochure): Promise<Brochure> {
    const newBrochure: Brochure = {
      ...brochure,
      id: `brochure_${Date.now()}`,
      description: brochure.description ?? null,
      active: brochure.active ?? null,
      sortOrder: brochure.sortOrder ?? null,
      createdAt: new Date()
    };
    this.brochuresData.push(newBrochure);
    return newBrochure;
  }

  async updateBrochure(id: string, brochure: Partial<InsertBrochure>): Promise<Brochure> {
    const index = this.brochuresData.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Brochure not found');
    
    this.brochuresData[index] = {
      ...this.brochuresData[index],
      ...brochure
    };
    return this.brochuresData[index];
  }

  async deleteBrochure(id: string): Promise<void> {
    const index = this.brochuresData.findIndex(b => b.id === id);
    if (index !== -1) {
      this.brochuresData.splice(index, 1);
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
}

// Use in-memory storage for development, or database storage if DATABASE_URL is provided
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
