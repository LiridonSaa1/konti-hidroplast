import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Simple in-memory storage for development
export class SimpleStorage {
  private users: Map<string, any> = new Map();
  private contactMessages: any[] = [];
  private jobApplications: any[] = [];

  constructor() {
    this.initializeAdminUser();
  }

  private async initializeAdminUser() {
    // Create default admin user if none exists
    if (this.users.size === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = {
        id: uuidv4(),
        username: 'admin',
        password: hashedPassword,
        email: 'admin@kontihidroplast.com',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.set(adminUser.id, adminUser);
      console.log('✅ Default admin user created: admin/admin123');
    }
  }

  // User methods
  async getUser(id: string) {
    return Array.from(this.users.values()).find(user => user.id === id);
  }

  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getAllUsers() {
    return Array.from(this.users.values());
  }

  async getAdminUser() {
    return Array.from(this.users.values()).find(user => user.role === 'admin');
  }

  async createUser(userData: any) {
    const user = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id: string, userData: any) {
    const user = this.users.get(id);
    if (!user) throw new Error('User not found');
    
    const updatedUser = { ...user, ...userData, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string) {
    this.users.delete(id);
  }

  // Contact message methods
  async createContactMessage(messageData: any) {
    const message = {
      id: Date.now(),
      ...messageData,
      createdAt: new Date()
    };
    this.contactMessages.push(message);
    return message;
  }

  async getAllContactMessages() {
    return this.contactMessages;
  }

  async getContactMessage(id: number) {
    return this.contactMessages.find(msg => msg.id === id);
  }

  // Job application methods
  async createJobApplication(applicationData: any) {
    const application = {
      id: Date.now(),
      ...applicationData,
      createdAt: new Date()
    };
    this.jobApplications.push(application);
    return application;
  }

  async getAllJobApplications() {
    return this.jobApplications;
  }

  async getJobApplication(id: number) {
    return this.jobApplications.find(app => app.id === id);
  }

  async updateJobApplication(id: number, applicationData: any) {
    const index = this.jobApplications.findIndex(app => app.id === id);
    if (index === -1) throw new Error('Job application not found');
    
    this.jobApplications[index] = { ...this.jobApplications[index], ...applicationData };
    return this.jobApplications[index];
  }

  async deleteJobApplication(id: number) {
    const index = this.jobApplications.findIndex(app => app.id === id);
    if (index !== -1) {
      this.jobApplications.splice(index, 1);
    }
  }

  // Company info methods (simplified)
  async getAllCompanyInfo() {
    return [];
  }

  async getCompanyInfoByKey(key: string) {
    return null;
  }

  async upsertCompanyInfo(info: any) {
    return info;
  }

  // Product methods (simplified)
  async getAllProducts() {
    return [];
  }

  async getProduct(id: string) {
    return null;
  }

  async createProduct(product: any) {
    return product;
  }

  async updateProduct(id: string, product: any) {
    return product;
  }

  async deleteProduct(id: string) {
    // No-op
  }

  // Media methods (simplified)
  async getAllMedia() {
    return [];
  }

  async getMediaByCategory(category: string) {
    return [];
  }

  async createMedia(media: any) {
    return media;
  }

  async deleteMedia(id: string) {
    // No-op
  }

  // News methods (simplified)
  async getAllNews() {
    return [];
  }

  async getNews(id: string) {
    return null;
  }

  async createNews(news: any) {
    return news;
  }

  async updateNews(id: string, news: any) {
    return news;
  }

  async deleteNews(id: string) {
    // No-op
  }

  // Certificate methods (simplified)
  async getAllCertificates() {
    return [];
  }

  async getCertificate(id: string) {
    return null;
  }

  async createCertificate(certificate: any) {
    return certificate;
  }

  async updateCertificate(id: string, certificate: any) {
    return certificate;
  }

  async deleteCertificate(id: string) {
    // No-op
  }

  // Certificate category methods
  async getAllCertificateCategories() {
    return [];
  }

  async getCertificateCategory(id: string) {
    return null;
  }

  async createCertificateCategory(category: any) {
    return category;
  }

  async updateCertificateCategory(id: string, category: any) {
    return category;
  }

  async deleteCertificateCategory(id: string) {
    // No-op
  }

  // Certificate subcategory methods
  async getAllCertificateSubcategories() {
    return [];
  }

  async getCertificateSubcategory(id: string) {
    return null;
  }

  async getCertificateSubcategoriesByCategory(categoryId: string) {
    return [];
  }

  async createCertificateSubcategory(subcategory: any) {
    return subcategory;
  }

  async updateCertificateSubcategory(id: string, subcategory: any) {
    return subcategory;
  }

  async deleteCertificateSubcategory(id: string) {
    // No-op
  }

  // Subcategory item methods
  async getAllSubcategoryItems() {
    return [];
  }

  async getSubcategoryItem(id: string) {
    return null;
  }

  async getSubcategoryItemsBySubcategory(subcategoryId: string) {
    return [];
  }

  async createSubcategoryItem(item: any) {
    return item;
  }

  async updateSubcategoryItem(id: string, item: any) {
    return item;
  }

  async deleteSubcategoryItem(id: string) {
    // No-op
  }

  // Product category methods
  async getAllProductCategories() {
    return [];
  }

  async getProductCategory(id: string) {
    return null;
  }

  async createProductCategory(category: any) {
    return category;
  }

  async updateProductCategory(id: string, category: any) {
    return category;
  }

  async deleteProductCategory(id: string) {
    // No-op
  }

  // Product subcategory methods
  async getAllProductSubcategories() {
    return [];
  }

  async getProductSubcategory(id: string) {
    return null;
  }

  async getProductSubcategoriesByCategory(categoryId: string) {
    return [];
  }

  async createProductSubcategory(subcategory: any) {
    return subcategory;
  }

  async updateProductSubcategory(id: string, subcategory: any) {
    return subcategory;
  }

  async deleteProductSubcategory(id: string) {
    // No-op
  }

  // Brochure methods (simplified)
  async getAllBrochures() {
    return [];
  }

  async getBrochureById(id: string) {
    return null;
  }

  async getActiveBrochures() {
    return [];
  }

  async createBrochure(brochure: any) {
    return brochure;
  }

  async updateBrochure(id: string, brochure: any) {
    return brochure;
  }

  async deleteBrochure(id: string) {
    // No-op
  }

  // Project methods (simplified)
  async getAllProjects() {
    return [];
  }

  async getProject(id: string) {
    return null;
  }

  async createProject(project: any) {
    return project;
  }

  async updateProject(id: string, project: any) {
    return project;
  }

  async deleteProject(id: string) {
    // No-op
  }

  // Team methods (simplified)
  async getAllTeams() {
    return [];
  }

  async getTeam(id: string) {
    return null;
  }

  async createTeam(team: any) {
    return team;
  }

  async updateTeam(id: string, team: any) {
    return team;
  }

  async deleteTeam(id: string) {
    // No-op
  }

  // Position methods (simplified)
  async getAllPositions() {
    return [];
  }

  async getPosition(id: string) {
    return null;
  }

  async createPosition(position: any) {
    return position;
  }

  async updatePosition(id: string, position: any) {
    return position;
  }

  async deletePosition(id: string) {
    // No-op
  }

  // Gallery methods (simplified)
  async getAllGalleryCategories() {
    return [];
  }

  async getGalleryCategory(id: string) {
    return null;
  }

  async createGalleryCategory(category: any) {
    return category;
  }

  async updateGalleryCategory(id: string, category: any) {
    return category;
  }

  async deleteGalleryCategory(id: string) {
    // No-op
  }

  async getAllGalleryItems() {
    return [];
  }

  async getGalleryItem(id: string) {
    return null;
  }

  async createGalleryItem(item: any) {
    return item;
  }

  async updateGalleryItem(id: string, item: any) {
    return item;
  }

  async deleteGalleryItem(id: string) {
    // No-op
  }

  // Brochure category methods (simplified)
  async getAllBrochureCategories() {
    return [];
  }

  async getBrochureCategory(id: number) {
    return null;
  }

  async createBrochureCategory(category: any) {
    return category;
  }

  async updateBrochureCategory(id: number, category: any) {
    return category;
  }

  async deleteBrochureCategory(id: number) {
    // No-op
  }

  // Brochure download methods (simplified)
  async createBrochureDownload(download: any) {
    return download;
  }

  async getAllBrochureDownloads() {
    return [];
  }

  async getBrochureDownload(id: number) {
    return null;
  }

  async updateBrochureDownload(id: number, download: any) {
    return download;
  }

  async deleteBrochureDownload(id: number) {
    // No-op
  }
}

export const storage = new SimpleStorage();
