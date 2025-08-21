import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { translationService } from "./services/translationService";
import translationRoutes from "./routes/translation";
import { brevoService } from "./services/brevoService";
import {
  insertProductSchema,
  insertMediaSchema,
  insertCompanyInfoSchema,
  insertNewsArticleSchema,
  insertCertificateSchema,
  insertCertificateCategorySchema,
  insertCertificateSubcategorySchema,
  insertBrochureSchema,
  insertBrochureCategorySchema,
  insertProjectSchema,
  insertTeamSchema,
  insertPositionSchema,
  insertGalleryCategorySchema,
  insertGalleryItemSchema,
  insertContactMessageSchema,
  insertJobApplicationSchema,
  insertBrevoConfigSchema,
  loginSchema,
  updateUserSchema,
  insertUserSchema,
} from "@shared/schema";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

// Configure multer with file validation
const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png, gif) and PDFs are allowed'));
    }
  }
});

// Session management with simple in-memory store for now
const sessions = new Map<string, { userId: string; expiresAt: number }>();

// Helper function to generate session token
function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Middleware to check authentication
function requireAuth(req: any, res: any, next: any) {
  const sessionToken = req.headers.authorization?.replace('Bearer ', '');
  
  if (!sessionToken) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const session = sessions.get(sessionToken);
  if (!session || session.expiresAt < Date.now()) {
    if (session) {
      sessions.delete(sessionToken);
    }
    return res.status(401).json({ error: 'Session expired' });
  }

  req.userId = session.userId;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Ensure upload directory exists
  await ensureUploadDir();

  // Serve uploaded files statically
  app.use('/uploads', express.static(uploadDir));

  // Initialize admin user if none exists
  async function initializeAdminUser() {
    try {
      // Check if any admin user exists (regardless of username)
      const existingAdmin = await storage.getAdminUser();
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await storage.createUser({
          username: 'admin',
          password: hashedPassword,
          email: 'admin@kontihidroplast.com',
          role: 'admin'
        });
        console.log('Default admin user created: admin/admin123');
      } else {
        console.log(`Admin user already exists: ${existingAdmin.username}`);
      }
    } catch (error) {
      console.error('Error initializing admin user:', error);
    }
  }

  await initializeAdminUser();

  // Authentication routes
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const sessionToken = generateSessionToken();
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

      sessions.set(sessionToken, { userId: user.id, expiresAt });

      // Don't send password in response
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        user: userWithoutPassword,
        token: sessionToken
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ error: 'Invalid login data' });
    }
  });

  app.get('/api/auth/me', requireAuth, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.userId);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Auth check error:', error);
      res.status(500).json({ error: 'Failed to check authentication' });
    }
  });

  app.put('/api/auth/profile', requireAuth, async (req: any, res) => {
    try {
      const updateData = updateUserSchema.parse(req.body);
      
      // Hash password if provided
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      const updatedUser = await storage.updateUser(req.userId, updateData);
      const { password: _, ...userWithoutPassword } = updatedUser;

      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(400).json({ error: 'Failed to update profile' });
    }
  });

  app.post('/api/auth/logout', requireAuth, (req: any, res) => {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    if (sessionToken) {
      sessions.delete(sessionToken);
    }
    res.json({ message: 'Logged out successfully' });
  });

  // Admin route to clean up duplicate users (emergency use only)
  app.post('/api/auth/cleanup-users', requireAuth, async (req: any, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const adminUsers = allUsers.filter(user => user.role === 'admin');
      
      if (adminUsers.length <= 1) {
        return res.json({ message: 'No duplicate admin users found', adminCount: adminUsers.length });
      }

      // Keep the most recently updated admin user, delete the rest
      const sortedAdmins = adminUsers.sort((a, b) => {
        const aTime = a.updatedAt?.getTime() || 0;
        const bTime = b.updatedAt?.getTime() || 0;
        return bTime - aTime;
      });

      const keepUser = sortedAdmins[0];
      const deleteUsers = sortedAdmins.slice(1);

      for (const user of deleteUsers) {
        await storage.deleteUser(user.id);
      }

      res.json({ 
        message: `Cleaned up ${deleteUsers.length} duplicate admin users`, 
        keptUser: keepUser.username,
        deletedCount: deleteUsers.length
      });
    } catch (error) {
      console.error('User cleanup error:', error);
      res.status(500).json({ error: 'Failed to cleanup users' });
    }
  });

  // File upload endpoint
  app.post("/api/upload", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileExtension = path.extname(req.file.originalname);
      const fileName = `${req.file.filename}${fileExtension}`;
      const oldPath = req.file.path;
      const newPath = path.join(uploadDir, fileName);

      // Rename file to include extension
      await fs.rename(oldPath, newPath);

      // Return the public URL
      const fileUrl = `/uploads/${fileName}`;

      res.json({ 
        url: fileUrl,
        originalName: req.file.originalname,
        size: req.file.size
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Admin Panel API Routes

  // Products routes
  app.get("/api/admin/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/admin/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/admin/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.put("/api/admin/products/:id", async (req, res) => {
    try {
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, productData);
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.delete("/api/admin/products/:id", async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Media routes
  app.get("/api/admin/media", async (req, res) => {
    try {
      const { category } = req.query;
      const media = category 
        ? await storage.getMediaByCategory(category as string)
        : await storage.getAllMedia();
      res.json(media);
    } catch (error) {
      console.error("Error fetching media:", error);
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  app.post("/api/admin/media", async (req, res) => {
    try {
      const mediaData = insertMediaSchema.parse(req.body);
      const media = await storage.createMedia(mediaData);
      res.status(201).json(media);
    } catch (error) {
      console.error("Error creating media:", error);
      res.status(400).json({ error: "Invalid media data" });
    }
  });

  app.delete("/api/admin/media/:id", async (req, res) => {
    try {
      await storage.deleteMedia(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting media:", error);
      res.status(500).json({ error: "Failed to delete media" });
    }
  });

  // Company Info routes
  app.get("/api/admin/company-info", requireAuth, async (req, res) => {
    try {
      const info = await storage.getAllCompanyInfo();
      res.json(info);
    } catch (error) {
      console.error("Error fetching company info:", error);
      res.status(500).json({ error: "Failed to fetch company info" });
    }
  });

  app.get("/api/admin/company-info/:key", requireAuth, async (req, res) => {
    try {
      const info = await storage.getCompanyInfoByKey(req.params.key);
      if (!info) {
        return res.status(404).json({ error: "Company info not found" });
      }
      res.json(info);
    } catch (error) {
      console.error("Error fetching company info by key:", error);
      res.status(500).json({ error: "Failed to fetch company info" });
    }
  });

  app.post("/api/admin/company-info", requireAuth, async (req, res) => {
    try {
      const infoData = insertCompanyInfoSchema.parse(req.body);
      const info = await storage.upsertCompanyInfo(infoData);
      res.json(info);
    } catch (error) {
      console.error("Error updating company info:", error);
      res.status(400).json({ error: "Invalid company info data" });
    }
  });

  // Public News routes (no authentication required)
  app.get("/api/news", async (req, res) => {
    try {
      const allNews = await storage.getAllNews();
      // Filter to only show published articles for public consumption
      const publishedNews = allNews.filter(article => article.published);
      // Sort by creation date, most recent first
      const sortedNews = publishedNews.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
      res.json(sortedNews);
    } catch (error) {
      console.error("Error fetching published news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const article = await storage.getNews(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "News article not found" });
      }
      // Only allow access to published articles
      if (!article.published) {
        return res.status(404).json({ error: "Article not found or not published" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error fetching news article:", error);
      res.status(500).json({ error: "Failed to fetch news article" });
    }
  });

  // Admin News routes (authentication required)
  app.get("/api/admin/news", requireAuth, async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/admin/news/:id", requireAuth, async (req, res) => {
    try {
      const article = await storage.getNews(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "News article not found" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error fetching news article:", error);
      res.status(500).json({ error: "Failed to fetch news article" });
    }
  });

  app.post("/api/admin/news", requireAuth, async (req, res) => {
    try {
      console.log("Received news data:", JSON.stringify(req.body, null, 2));
      
      // Convert publishedAt string to Date if it exists
      const requestData = { ...req.body };
      if (requestData.publishedAt && typeof requestData.publishedAt === 'string') {
        requestData.publishedAt = new Date(requestData.publishedAt);
      }
      
      const newsData = insertNewsArticleSchema.parse(requestData);
      console.log("Parsed news data:", JSON.stringify(newsData, null, 2));
      const article = await storage.createNews(newsData);
      console.log("Created article:", JSON.stringify(article, null, 2));
      res.status(201).json(article);
    } catch (error) {
      console.error("Error creating news article:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      res.status(400).json({ error: "Invalid news data", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.put("/api/admin/news/:id", requireAuth, async (req, res) => {
    try {
      // Convert publishedAt string to Date if it exists
      const requestData = { ...req.body };
      if (requestData.publishedAt && typeof requestData.publishedAt === 'string') {
        requestData.publishedAt = new Date(requestData.publishedAt);
      }
      
      const newsData = insertNewsArticleSchema.partial().parse(requestData);
      const article = await storage.updateNews(req.params.id, newsData);
      res.json(article);
    } catch (error) {
      console.error("Error updating news article:", error);
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  app.delete("/api/admin/news/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteNews(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting news article:", error);
      res.status(500).json({ error: "Failed to delete news article" });
    }
  });

  // Certificate Categories routes
  app.get("/api/admin/certificate-categories", async (req, res) => {
    try {
      const categories = await storage.getAllCertificateCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching certificate categories:", error);
      res.status(500).json({ error: "Failed to fetch certificate categories" });
    }
  });

  app.get("/api/admin/certificate-categories/:id", async (req, res) => {
    try {
      const category = await storage.getCertificateCategory(parseInt(req.params.id));
      if (!category) {
        return res.status(404).json({ error: "Certificate category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching certificate category:", error);
      res.status(500).json({ error: "Failed to fetch certificate category" });
    }
  });

  app.post("/api/admin/certificate-categories", async (req, res) => {
    try {
      const categoryData = insertCertificateCategorySchema.parse(req.body);
      const category = await storage.createCertificateCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating certificate category:", error);
      res.status(400).json({ error: "Invalid certificate category data" });
    }
  });

  app.put("/api/admin/certificate-categories/:id", async (req, res) => {
    try {
      const categoryData = insertCertificateCategorySchema.partial().parse(req.body);
      const category = await storage.updateCertificateCategory(parseInt(req.params.id), categoryData);
      res.json(category);
    } catch (error) {
      console.error("Error updating certificate category:", error);
      res.status(400).json({ error: "Invalid certificate category data" });
    }
  });

  app.delete("/api/admin/certificate-categories/:id", async (req, res) => {
    try {
      await storage.deleteCertificateCategory(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting certificate category:", error);
      res.status(500).json({ error: "Failed to delete certificate category" });
    }
  });

  // Certificate Subcategories routes
  app.get("/api/admin/certificate-subcategories", async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string;
      if (categoryId) {
        const subcategories = await storage.getCertificateSubcategoriesByCategory(parseInt(categoryId));
        res.json(subcategories);
      } else {
        const subcategories = await storage.getAllCertificateSubcategories();
        res.json(subcategories);
      }
    } catch (error) {
      console.error("Error fetching certificate subcategories:", error);
      res.status(500).json({ error: "Failed to fetch certificate subcategories" });
    }
  });

  app.get("/api/admin/certificate-subcategories/:id", async (req, res) => {
    try {
      const subcategory = await storage.getCertificateSubcategory(parseInt(req.params.id));
      if (!subcategory) {
        return res.status(404).json({ error: "Certificate subcategory not found" });
      }
      res.json(subcategory);
    } catch (error) {
      console.error("Error fetching certificate subcategory:", error);
      res.status(500).json({ error: "Failed to fetch certificate subcategory" });
    }
  });

  app.post("/api/admin/certificate-subcategories", async (req, res) => {
    try {
      const subcategoryData = insertCertificateSubcategorySchema.parse(req.body);
      const subcategory = await storage.createCertificateSubcategory(subcategoryData);
      res.status(201).json(subcategory);
    } catch (error) {
      console.error("Error creating certificate subcategory:", error);
      res.status(400).json({ error: "Invalid certificate subcategory data" });
    }
  });

  app.put("/api/admin/certificate-subcategories/:id", async (req, res) => {
    try {
      const subcategoryData = insertCertificateSubcategorySchema.partial().parse(req.body);
      const subcategory = await storage.updateCertificateSubcategory(parseInt(req.params.id), subcategoryData);
      res.json(subcategory);
    } catch (error) {
      console.error("Error updating certificate subcategory:", error);
      res.status(400).json({ error: "Invalid certificate subcategory data" });
    }
  });

  app.delete("/api/admin/certificate-subcategories/:id", async (req, res) => {
    try {
      await storage.deleteCertificateSubcategory(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting certificate subcategory:", error);
      res.status(500).json({ error: "Failed to delete certificate subcategory" });
    }
  });

  // Certificates routes
  app.get("/api/admin/certificates", async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string;
      const subcategoryId = req.query.subcategoryId as string;
      
      let certificates;
      if (subcategoryId) {
        certificates = await storage.getCertificatesBySubcategory(parseInt(subcategoryId));
      } else if (categoryId) {
        certificates = await storage.getCertificatesByCategory(parseInt(categoryId));
      } else {
        certificates = await storage.getAllCertificates();
      }
      res.json(certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ error: "Failed to fetch certificates" });
    }
  });

  app.get("/api/admin/certificates/:id", async (req, res) => {
    try {
      const certificate = await storage.getCertificate(parseInt(req.params.id));
      if (!certificate) {
        return res.status(404).json({ error: "Certificate not found" });
      }
      res.json(certificate);
    } catch (error) {
      console.error("Error fetching certificate:", error);
      res.status(500).json({ error: "Failed to fetch certificate" });
    }
  });

  app.post("/api/admin/certificates", async (req, res) => {
    try {
      const certificateData = insertCertificateSchema.parse(req.body);
      const certificate = await storage.createCertificate(certificateData);
      res.status(201).json(certificate);
    } catch (error) {
      console.error("Error creating certificate:", error);
      res.status(400).json({ error: "Invalid certificate data" });
    }
  });

  app.put("/api/admin/certificates/:id", async (req, res) => {
    try {
      const certificateData = insertCertificateSchema.partial().parse(req.body);
      const certificate = await storage.updateCertificate(parseInt(req.params.id), certificateData);
      res.json(certificate);
    } catch (error) {
      console.error("Error updating certificate:", error);
      res.status(400).json({ error: "Invalid certificate data" });
    }
  });

  app.delete("/api/admin/certificates/:id", async (req, res) => {
    try {
      await storage.deleteCertificate(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting certificate:", error);
      res.status(500).json({ error: "Failed to delete certificate" });
    }
  });

  // Brochures routes
  app.get("/api/admin/brochures", async (req, res) => {
    try {
      const brochures = await storage.getAllBrochures();
      res.json(brochures);
    } catch (error) {
      console.error("Error fetching brochures:", error);
      res.status(500).json({ error: "Failed to fetch brochures" });
    }
  });

  app.post("/api/admin/brochures", async (req, res) => {
    try {
      const brochureData = insertBrochureSchema.parse(req.body);
      const brochure = await storage.createBrochure(brochureData);
      res.status(201).json(brochure);
    } catch (error) {
      console.error("Error creating brochure:", error);
      res.status(400).json({ error: "Invalid brochure data" });
    }
  });

  app.put("/api/admin/brochures/:id", async (req, res) => {
    try {
      const brochureData = insertBrochureSchema.partial().parse(req.body);
      const brochure = await storage.updateBrochure(req.params.id, brochureData);
      res.json(brochure);
    } catch (error) {
      console.error("Error updating brochure:", error);
      res.status(400).json({ error: "Invalid brochure data" });
    }
  });

  app.delete("/api/admin/brochures/:id", async (req, res) => {
    try {
      await storage.deleteBrochure(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting brochure:", error);
      res.status(500).json({ error: "Failed to delete brochure" });
    }
  });

  // Brochure categories routes
  app.get("/api/admin/brochure-categories", async (req, res) => {
    try {
      const categories = await storage.getAllBrochureCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching brochure categories:", error);
      res.status(500).json({ error: "Failed to fetch brochure categories" });
    }
  });

  app.get("/api/admin/brochure-categories/:id", async (req, res) => {
    try {
      const category = await storage.getBrochureCategory(parseInt(req.params.id));
      if (!category) {
        return res.status(404).json({ error: "Brochure category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching brochure category:", error);
      res.status(500).json({ error: "Failed to fetch brochure category" });
    }
  });

  app.post("/api/admin/brochure-categories", async (req, res) => {
    try {
      const categoryData = insertBrochureCategorySchema.parse(req.body);
      const category = await storage.createBrochureCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating brochure category:", error);
      res.status(400).json({ error: "Invalid brochure category data" });
    }
  });

  app.patch("/api/admin/brochure-categories/:id", async (req, res) => {
    try {
      const categoryData = insertBrochureCategorySchema.partial().parse(req.body);
      const category = await storage.updateBrochureCategory(parseInt(req.params.id), categoryData);
      res.json(category);
    } catch (error) {
      console.error("Error updating brochure category:", error);
      res.status(400).json({ error: "Invalid brochure category data" });
    }
  });

  app.delete("/api/admin/brochure-categories/:id", async (req, res) => {
    try {
      await storage.deleteBrochureCategory(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting brochure category:", error);
      res.status(500).json({ error: "Failed to delete brochure category" });
    }
  });

  // Projects routes
  app.get("/api/admin/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/admin/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.patch("/api/admin/projects/:id", async (req, res) => {
    try {
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(parseInt(req.params.id), projectData);
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.delete("/api/admin/projects/:id", async (req, res) => {
    try {
      await storage.deleteProject(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Team routes
  app.get("/api/admin/teams", async (req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ error: "Failed to fetch teams" });
    }
  });

  app.post("/api/admin/teams", async (req, res) => {
    try {
      const teamData = insertTeamSchema.parse(req.body);
      const team = await storage.createTeam(teamData);
      res.status(201).json(team);
    } catch (error) {
      console.error("Error creating team:", error);
      res.status(400).json({ error: "Invalid team data" });
    }
  });

  app.patch("/api/admin/teams/:id", async (req, res) => {
    try {
      const teamData = insertTeamSchema.partial().parse(req.body);
      const team = await storage.updateTeam(parseInt(req.params.id), teamData);
      res.json(team);
    } catch (error) {
      console.error("Error updating team:", error);
      res.status(400).json({ error: "Invalid team data" });
    }
  });

  app.delete("/api/admin/teams/:id", async (req, res) => {
    try {
      await storage.deleteTeam(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting team:", error);
      res.status(500).json({ error: "Failed to delete team" });
    }
  });

  // Position routes
  app.get("/api/admin/positions", async (req, res) => {
    try {
      const positions = await storage.getAllPositions();
      res.json(positions);
    } catch (error) {
      console.error("Error fetching positions:", error);
      res.status(500).json({ error: "Failed to fetch positions" });
    }
  });

  app.post("/api/admin/positions", async (req, res) => {
    try {
      const positionData = insertPositionSchema.parse(req.body);
      const position = await storage.createPosition(positionData);
      res.status(201).json(position);
    } catch (error) {
      console.error("Error creating position:", error);
      res.status(400).json({ error: "Invalid position data" });
    }
  });

  app.patch("/api/admin/positions/:id", async (req, res) => {
    try {
      const positionData = insertPositionSchema.partial().parse(req.body);
      const position = await storage.updatePosition(parseInt(req.params.id), positionData);
      res.json(position);
    } catch (error) {
      console.error("Error updating position:", error);
      res.status(400).json({ error: "Invalid position data" });
    }
  });

  app.delete("/api/admin/positions/:id", async (req, res) => {
    try {
      await storage.deletePosition(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting position:", error);
      res.status(500).json({ error: "Failed to delete position" });
    }
  });

  // Public Gallery routes (no authentication required)
  app.get('/api/gallery-categories', async (req, res) => {
    try {
      const categories = await storage.getAllGalleryCategories();
      // Only return active categories for public use
      const activeCategories = categories.filter(category => category.status === 'active');
      res.json(activeCategories);
    } catch (error) {
      console.error('Error fetching public gallery categories:', error);
      res.status(500).json({ error: 'Failed to fetch gallery categories' });
    }
  });

  app.get('/api/gallery-items', async (req, res) => {
    try {
      const items = await storage.getAllGalleryItems();
      // Only return active items for public use
      const activeItems = items.filter(item => item.status === 'active');
      res.json(activeItems);
    } catch (error) {
      console.error('Error fetching public gallery items:', error);
      res.status(500).json({ error: 'Failed to fetch gallery items' });
    }
  });

  // Public Certificate routes (no authentication required)
  app.get('/api/certificate-categories', async (req, res) => {
    try {
      const categories = await storage.getAllCertificateCategories();
      // Only return active categories for public use
      const activeCategories = categories.filter(category => category.status === 'active');
      res.json(activeCategories);
    } catch (error) {
      console.error('Error fetching public certificate categories:', error);
      res.status(500).json({ error: 'Failed to fetch certificate categories' });
    }
  });

  app.get('/api/certificate-subcategories', async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string;
      let subcategories;
      
      if (categoryId) {
        subcategories = await storage.getCertificateSubcategoriesByCategory(parseInt(categoryId));
      } else {
        subcategories = await storage.getAllCertificateSubcategories();
      }
      
      // Only return active subcategories for public use
      const activeSubcategories = subcategories.filter(subcategory => subcategory.status === 'active');
      res.json(activeSubcategories);
    } catch (error) {
      console.error('Error fetching public certificate subcategories:', error);
      res.status(500).json({ error: 'Failed to fetch certificate subcategories' });
    }
  });

  app.get('/api/certificates', async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string;
      const subcategoryId = req.query.subcategoryId as string;
      
      let certificates;
      if (subcategoryId) {
        certificates = await storage.getCertificatesBySubcategory(parseInt(subcategoryId));
      } else if (categoryId) {
        certificates = await storage.getCertificatesByCategory(parseInt(categoryId));
      } else {
        certificates = await storage.getAllCertificates();
      }
      
      // Only return active certificates for public use
      const activeCertificates = certificates.filter(certificate => certificate.status === 'active');
      res.json(activeCertificates);
    } catch (error) {
      console.error('Error fetching public certificates:', error);
      res.status(500).json({ error: 'Failed to fetch certificates' });
    }
  });

  // Gallery Categories routes
  app.get('/api/admin/gallery-categories', requireAuth, async (req, res) => {
    try {
      const categories = await storage.getAllGalleryCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching gallery categories:', error);
      res.status(500).json({ error: 'Failed to fetch gallery categories' });
    }
  });

  app.post('/api/admin/gallery-categories', requireAuth, async (req, res) => {
    try {
      const validatedData = insertGalleryCategorySchema.parse(req.body);
      const category = await storage.createGalleryCategory(validatedData);
      res.status(201).json(category);
    } catch (error: any) {
      console.error('Error creating gallery category:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to create gallery category' });
    }
  });

  app.patch('/api/admin/gallery-categories/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertGalleryCategorySchema.partial().parse(req.body);
      const category = await storage.updateGalleryCategory(id, validatedData);
      res.json(category);
    } catch (error: any) {
      console.error('Error updating gallery category:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid data', details: error.errors });
      }
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: 'Gallery category not found' });
      }
      res.status(500).json({ error: 'Failed to update gallery category' });
    }
  });

  app.delete('/api/admin/gallery-categories/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteGalleryCategory(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting gallery category:', error);
      res.status(500).json({ error: 'Failed to delete gallery category' });
    }
  });

  // Gallery Items routes
  app.get('/api/admin/gallery-items', requireAuth, async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : null;
      const items = categoryId 
        ? await storage.getGalleryItemsByCategory(categoryId)
        : await storage.getAllGalleryItems();
      res.json(items);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      res.status(500).json({ error: 'Failed to fetch gallery items' });
    }
  });

  app.post('/api/admin/gallery-items', requireAuth, async (req, res) => {
    try {
      const validatedData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validatedData);
      res.status(201).json(item);
    } catch (error: any) {
      console.error('Error creating gallery item:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to create gallery item' });
    }
  });

  app.patch('/api/admin/gallery-items/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertGalleryItemSchema.partial().parse(req.body);
      const item = await storage.updateGalleryItem(id, validatedData);
      res.json(item);
    } catch (error: any) {
      console.error('Error updating gallery item:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid data', details: error.errors });
      }
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: 'Gallery item not found' });
      }
      res.status(500).json({ error: 'Failed to update gallery item' });
    }
  });

  app.delete('/api/admin/gallery-items/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteGalleryItem(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      res.status(500).json({ error: 'Failed to delete gallery item' });
    }
  });

  // Contact message routes
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Save contact message to database
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Send email notifications via Brevo
      try {
        await Promise.all([
          brevoService.sendContactNotification(validatedData),
          brevoService.sendAutoReply(validatedData)
        ]);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Still return success since the message was saved
      }
      
      res.status(201).json({ 
        message: 'Contact message sent successfully',
        id: contactMessage.id 
      });
    } catch (error: any) {
      console.error('Error processing contact message:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to process contact message' });
    }
  });

  // Admin contact message routes
  app.get('/api/admin/contact-messages', requireAuth, async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
  });

  app.get('/api/admin/contact-messages/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const message = await storage.getContactMessage(id);
      if (!message) {
        return res.status(404).json({ error: 'Contact message not found' });
      }
      res.json(message);
    } catch (error) {
      console.error('Error fetching contact message:', error);
      res.status(500).json({ error: 'Failed to fetch contact message' });
    }
  });

  app.patch('/api/admin/contact-messages/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const message = await storage.updateContactMessage(id, updates);
      res.json(message);
    } catch (error: any) {
      console.error('Error updating contact message:', error);
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: 'Contact message not found' });
      }
      res.status(500).json({ error: 'Failed to update contact message' });
    }
  });

  app.delete('/api/admin/contact-messages/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContactMessage(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting contact message:', error);
      res.status(500).json({ error: 'Failed to delete contact message' });
    }
  });

  // Brevo configuration routes
  app.get('/api/admin/brevo-config', requireAuth, async (req, res) => {
    try {
      const config = await storage.getBrevoConfig();
      if (!config) {
        return res.json(null);
      }
      
      // Don't expose the API keys in responses
      const { apiKey, brevoApiKey, ...safeConfig } = config;
      res.json({ 
        ...safeConfig, 
        hasApiKey: !!apiKey,
        hasBrevoApiKey: !!brevoApiKey 
      });
    } catch (error) {
      console.error('Error fetching Brevo config:', error);
      res.status(500).json({ error: 'Failed to fetch Brevo configuration' });
    }
  });

  app.post('/api/admin/brevo-config', requireAuth, async (req, res) => {
    try {
      const validatedData = insertBrevoConfigSchema.parse(req.body);
      const config = await storage.createBrevoConfig(validatedData);
      
      // Test the connection
      const isWorking = await brevoService.testConnection();
      
      const { apiKey, brevoApiKey, ...safeConfig } = config;
      res.status(201).json({ 
        ...safeConfig, 
        hasApiKey: !!apiKey,
        hasBrevoApiKey: !!brevoApiKey,
        connectionTest: isWorking 
      });
    } catch (error: any) {
      console.error('Error creating Brevo config:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to create Brevo configuration' });
    }
  });

  app.patch('/api/admin/brevo-config/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBrevoConfigSchema.partial().parse(req.body);
      const config = await storage.updateBrevoConfig(id, validatedData);
      
      // Test the connection if config is active
      let connectionTest = false;
      if (config.isActive) {
        connectionTest = await brevoService.testConnection();
      }
      
      const { apiKey, brevoApiKey, ...safeConfig } = config;
      res.json({ 
        ...safeConfig, 
        hasApiKey: !!apiKey,
        hasBrevoApiKey: !!brevoApiKey,
        connectionTest 
      });
    } catch (error: any) {
      console.error('Error updating Brevo config:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid data', details: error.errors });
      }
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: 'Brevo configuration not found' });
      }
      res.status(500).json({ error: 'Failed to update Brevo configuration' });
    }
  });

  app.post('/api/admin/brevo-config/test', requireAuth, async (req, res) => {
    try {
      const isWorking = await brevoService.testConnection();
      res.json({ success: isWorking });
    } catch (error) {
      console.error('Error testing Brevo connection:', error);
      res.status(500).json({ error: 'Failed to test Brevo connection' });
    }
  });

  // Test email sending endpoint
  app.post('/api/admin/brevo-config/test-email', requireAuth, async (req, res) => {
    try {
      const config = await storage.getBrevoConfig();
      if (!config) {
        return res.status(404).json({ error: 'Brevo config not found' });
      }

      console.log('Testing email with config:', {
        senderEmail: config.senderEmail,
        senderName: config.senderName,
        recipientEmail: config.recipientEmail,
        isActive: config.isActive
      });

      // Send a test contact notification
      const testContactData = {
        fullName: "Email Test User",
        email: "test@example.com",
        phoneNumber: "123-456-7890",
        subject: "Brevo Configuration Test",
        message: "This is a test email to verify your recipient email configuration is working correctly.",
        createdAt: new Date()
      };

      const success = await brevoService.sendContactNotification(testContactData);
      
      res.json({ 
        success,
        recipientEmail: config.recipientEmail,
        senderEmail: config.senderEmail,
        senderName: config.senderName,
        message: success ? 'Test email sent successfully! Check your recipient email inbox (including spam folder).' : 'Failed to send test email.'
      });
    } catch (error: any) {
      console.error('Test email error:', error);
      res.status(500).json({ error: 'Test email failed', details: error?.message || 'Unknown error' });
    }
  });

  // Job application routes
  app.get('/api/admin/job-applications', requireAuth, async (req, res) => {
    try {
      const applications = await storage.getAllJobApplications();
      res.json(applications);
    } catch (error) {
      console.error('Error fetching job applications:', error);
      res.status(500).json({ error: 'Failed to fetch job applications' });
    }
  });

  app.get('/api/admin/job-applications/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getJobApplication(id);
      if (!application) {
        return res.status(404).json({ error: 'Job application not found' });
      }
      res.json(application);
    } catch (error) {
      console.error('Error fetching job application:', error);
      res.status(500).json({ error: 'Failed to fetch job application' });
    }
  });

  app.post('/api/job-applications', async (req, res) => {
    try {
      const validatedData = insertJobApplicationSchema.parse(req.body);
      
      // Save job application to database
      const application = await storage.createJobApplication(validatedData);
      
      // Send email notifications via Brevo
      try {
        await Promise.all([
          brevoService.sendJobApplicationNotification(validatedData),
          brevoService.sendJobApplicationAutoReply(validatedData)
        ]);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Still return success since the application was saved
      }
      
      res.status(201).json({ 
        message: 'Job application submitted successfully', 
        id: application.id 
      });
    } catch (error: any) {
      console.error('Error creating job application:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid data', details: error.errors });
      }
      res.status(500).json({ error: 'Failed to submit job application' });
    }
  });

  app.patch('/api/admin/job-applications/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.updateJobApplication(id, req.body);
      res.json(application);
    } catch (error: any) {
      console.error('Error updating job application:', error);
      if (error.message.includes('not found')) {
        return res.status(404).json({ error: 'Job application not found' });
      }
      res.status(500).json({ error: 'Failed to update job application' });
    }
  });

  app.delete('/api/admin/job-applications/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteJobApplication(id);
      res.json({ message: 'Job application deleted successfully' });
    } catch (error) {
      console.error('Error deleting job application:', error);
      res.status(500).json({ error: 'Failed to delete job application' });
    }
  });

  // Register translation routes
  app.use(translationRoutes);

  const httpServer = createServer(app);
  return httpServer;
}