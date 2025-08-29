import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";
import fsSync from "fs";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { translationService } from "./services/translationService";
import translationRoutes from "./routes/translation";
// import { brevoService } from "./services/brevoService";
import {
  insertProductSchema,
  insertMediaSchema,
  insertCompanyInfoSchema,
  insertNewsArticleSchema,
  insertCertificateSchema,
  insertCertificateCategorySchema,
  insertCertificateSubcategorySchema,
  insertSubcategoryItemSchema,
  insertProductCategorySchema,
  insertProductSubcategorySchema,
  insertBrochureSchema,
  insertBrochureCategorySchema,
  insertProjectSchema,
  insertTeamSchema,
  insertPositionSchema,
  insertGalleryCategorySchema,
  insertGalleryItemSchema,
  insertContactMessageSchema,
  insertJobApplicationSchema,

  loginSchema,
  updateUserSchema,
  insertUserSchema,
} from "@shared/schema";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');

// Get current directory path for ES modules compatibility
const getCurrentDir = () => {
  try {
    // For ES modules, use import.meta.url
    if (typeof import.meta !== 'undefined' && import.meta.url) {
      return path.dirname(new URL(import.meta.url).pathname);
    }
    // Fallback for CommonJS
    return __dirname;
  } catch {
    // Final fallback
    return process.cwd();
  }
};

const currentDir = getCurrentDir();

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
    fileSize: 100 * 1024 * 1024, // 100MB limit (increased from 10MB)
  },
  fileFilter: (req, file, cb) => {
    console.log('Multer file filter:', {
      originalname: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      fieldname: file.fieldname
    });
    
    // More permissive MIME type checking
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf'
    ];
    
    const allowedExtensions = /\.(jpeg|jpg|png|gif|webp|pdf)$/i;
    const hasValidExtension = allowedExtensions.test(file.originalname);
    const hasValidMimeType = allowedMimeTypes.includes(file.mimetype);
    
    console.log('File validation:', {
      hasValidExtension,
      hasValidMimeType,
      extension: path.extname(file.originalname).toLowerCase(),
      mimetype: file.mimetype
    });

    // Accept file if either extension or MIME type is valid
    if (hasValidExtension || hasValidMimeType) {
      return cb(null, true);
    } else {
      const error = `File type not allowed. Got: ${file.mimetype}, ${path.extname(file.originalname)}. Allowed extensions: ${allowedExtensions.source}, Allowed MIME types: ${allowedMimeTypes.join(', ')}`;
      console.error('File rejected:', error);
      cb(new Error(error));
    }
  }
});

// Error handling middleware for multer
const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  } else if (err) {
    console.error('File upload error:', err);
    return res.status(400).json({ error: err.message });
  }
  next();
};

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

  // Determine if we're in production mode
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // In production, serve from dist/public/uploads (handled by serveStatic in vite.ts)
    console.log('🚀 Production mode: Uploads will be served from dist/public/uploads');
  } else {
    // In development, serve from both locations for maximum compatibility
    console.log('🔧 Development mode: Serving uploads from multiple locations');
    
    // First, try to serve from dist/public/uploads (production build location)
    const distUploadsPath = path.join(currentDir, '..', 'dist', 'public', 'uploads');
    if (fsSync.existsSync(distUploadsPath)) {
      console.log('✅ Serving from dist/public/uploads:', distUploadsPath);
      app.use('/uploads', express.static(distUploadsPath));
    } else {
      console.log('⚠️ dist/public/uploads not found, serving from root uploads');
      app.use('/uploads', express.static(uploadDir));
    }
    
    // Also serve from root uploads as fallback
    app.use('/uploads', express.static(uploadDir));
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    const distUploadsPath = path.join(currentDir, '..', 'dist', 'public', 'uploads');
    const rootUploadsExists = fsSync.existsSync(uploadDir);
    const distUploadsExists = fsSync.existsSync(distUploadsPath);
    
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uploadDir: uploadDir,
      distUploadsPath: distUploadsPath,
      rootUploadsExists,
      distUploadsExists,
      serverTime: Date.now(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

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
  app.post("/api/upload", upload.single('file'), handleMulterError, async (req: Request, res: Response) => {
    try {
      console.log('=== File Upload Request ===');
      console.log('Headers:', req.headers);
      console.log('File:', req.file);
      
      if (!req.file) {
        console.log('No file in request');
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log('File details:', {
        originalname: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: req.file.path
      });

      const fileExtension = path.extname(req.file.originalname);
      const fileName = `${req.file.filename}${fileExtension}`;
      const oldPath = req.file.path;
      
      // Save to root uploads directory (for development)
      const rootUploadPath = path.join(uploadDir, fileName);
      
      // Save to dist/public/uploads directory (for production)
      const distUploadPath = path.join(currentDir, '..', 'dist', 'public', 'uploads', fileName);
      
      console.log('File paths:', { 
        oldPath, 
        rootUploadPath, 
        distUploadPath, 
        fileName 
      });

      // Rename file to include extension in root uploads
      await fs.rename(oldPath, rootUploadPath);
      console.log('✅ File saved to root uploads directory:', rootUploadPath);
      
      // Copy to dist/public/uploads for production (only if dist folder exists)
      try {
        const distDir = path.join(currentDir, '..', 'dist');
        if (fsSync.existsSync(distDir)) {
          // Ensure dist/public/uploads directory exists
          const distUploadsDir = path.dirname(distUploadPath);
          if (!fsSync.existsSync(distUploadsDir)) {
            await fs.mkdir(distUploadsDir, { recursive: true });
            console.log('✅ Created dist/public/uploads directory:', distUploadsDir);
          }
          
          // Copy file to production directory
          await fs.copyFile(rootUploadPath, distUploadPath);
          console.log('✅ File copied to production directory:', distUploadPath);
          
          // Verify the file was copied successfully
          if (fsSync.existsSync(distUploadPath)) {
            console.log('✅ File verification successful in production directory');
          } else {
            console.log('❌ File verification failed in production directory');
          }
        } else {
          console.log('ℹ️ Dist directory not found, skipping production copy (normal during development)');
        }
      } catch (copyError) {
        console.log('⚠️ Warning: Could not copy to production directory:', (copyError as Error).message);
        console.log('This is normal during development if dist folder doesn\'t exist yet');
      }

      // Return the public URL
      const fileUrl = `/uploads/${fileName}`;
      
      console.log('Upload successful:', { fileUrl, size: req.file.size });

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

  // Public Company Info routes (no authentication required)
  app.get("/api/company-info/:key", async (req, res) => {
    try {
      const info = await storage.getCompanyInfoByKey(req.params.key);
      if (!info) {
        return res.status(404).json({ error: "Company info not found" });
      }
      res.json(info);
    } catch (error) {
      console.error("Error fetching public company info:", error);
      res.status(500).json({ error: "Failed to fetch company info" });
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

  // Subcategory Items routes
  app.get("/api/admin/subcategory-items", async (req: Request, res: Response) => {
    try {
      const categoryId = req.query.categoryId as string;
      const subcategoryId = req.query.subcategoryId as string;
      
      let items;
      if (subcategoryId) {
        items = await storage.getSubcategoryItemsBySubcategory(parseInt(subcategoryId));
      } else if (categoryId) {
        items = await storage.getSubcategoryItemsByCategory(parseInt(categoryId));
      } else {
        items = await storage.getAllSubcategoryItems();
      }
      res.json(items);
    } catch (error) {
      console.error("Error fetching subcategory items:", error);
      res.status(500).json({ error: "Failed to fetch subcategory items" });
    }
  });

  app.get("/api/admin/subcategory-items/:id", async (req: Request, res: Response) => {
    try {
      const item = await storage.getSubcategoryItem(parseInt(req.params.id));
      if (!item) {
        return res.status(404).json({ error: "Subcategory item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error fetching subcategory item:", error);
      res.status(500).json({ error: "Failed to fetch subcategory item" });
    }
  });

  app.post("/api/admin/subcategory-items", async (req: Request, res: Response) => {
    try {
      const itemData = insertSubcategoryItemSchema.parse(req.body);
      const item = await storage.createSubcategoryItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error creating subcategory item:", error);
      res.status(400).json({ error: "Invalid subcategory item data" });
    }
  });

  app.put("/api/admin/subcategory-items/:id", async (req: Request, res: Response) => {
    try {
      const itemData = insertSubcategoryItemSchema.parse(req.body);
      const item = await storage.updateSubcategoryItem(parseInt(req.params.id), itemData);
      res.json(item);
    } catch (error) {
      console.error("Error updating subcategory item:", error);
      res.status(400).json({ error: "Failed to update subcategory item" });
    }
  });

  app.delete("/api/admin/subcategory-items/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteSubcategoryItem(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting subcategory item:", error);
      res.status(500).json({ error: "Failed to delete subcategory item" });
    }
  });

  // Public Subcategory Items endpoint (for certificates page)
  app.get("/api/subcategory-items", async (req: Request, res: Response) => {
    try {
      const categoryId = req.query.categoryId as string;
      const subcategoryId = req.query.subcategoryId as string;
      
      let items;
      if (subcategoryId) {
        items = await storage.getSubcategoryItemsBySubcategory(parseInt(subcategoryId));
      } else if (categoryId) {
        items = await storage.getSubcategoryItemsByCategory(parseInt(categoryId));
      } else {
        items = await storage.getAllSubcategoryItems();
      }
      
      // Only return active items for public access
      const activeItems = items.filter(item => item.active === true);
      res.json(activeItems);
    } catch (error) {
      console.error("Error fetching public subcategory items:", error);
      res.status(500).json({ error: "Failed to fetch subcategory items" });
    }
  });

  // Certificates routes
  app.get("/api/admin/certificates", async (req, res) => {
    try {
      // Set cache-busting headers to prevent 304 responses
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'ETag': `"${Date.now()}"` // Dynamic ETag to prevent caching
      });
      
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
      // Set cache-busting headers to prevent 304 responses
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'ETag': `"${Date.now()}"` // Dynamic ETag to prevent caching
      });
      
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
      console.log('=== Certificate Create Request ===');
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      
      const certificateData = insertCertificateSchema.parse(req.body);
      console.log('Parsed certificate data:', JSON.stringify(certificateData, null, 2));
      console.log('Image URL being stored:', certificateData.imageUrl);
      
      const certificate = await storage.createCertificate(certificateData);
      console.log('Created certificate result:', JSON.stringify(certificate, null, 2));
      console.log('Final image URL in database:', certificate.imageUrl);
      
      res.status(201).json(certificate);
    } catch (error) {
      console.error("Error creating certificate:", error);
      res.status(400).json({ error: "Invalid certificate data" });
    }
  });

  app.put("/api/admin/certificates/:id", async (req, res) => {
    try {
      console.log('=== Certificate Update Request ===');
      console.log('Certificate ID:', req.params.id);
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      
      const certificateData = insertCertificateSchema.parse(req.body);
      console.log('Parsed certificate data:', JSON.stringify(certificateData, null, 2));
      console.log('Image URL being stored:', certificateData.imageUrl);
      
      const certificate = await storage.updateCertificate(parseInt(req.params.id), certificateData);
      console.log('Updated certificate result:', JSON.stringify(certificate, null, 2));
      console.log('Final image URL in database:', certificate.imageUrl);
      
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

  // Product Categories routes
  app.get("/api/admin/product-categories", async (req, res) => {
    try {
      const categories = await storage.getAllProductCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching product categories:", error);
      res.status(500).json({ error: "Failed to fetch product categories" });
    }
  });

  app.get("/api/admin/product-categories/:id", async (req, res) => {
    try {
      const category = await storage.getProductCategory(parseInt(req.params.id));
      if (!category) {
        return res.status(404).json({ error: "Product category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching product category:", error);
      res.status(500).json({ error: "Failed to fetch product category" });
    }
  });

  app.post("/api/admin/product-categories", async (req, res) => {
    try {
      const categoryData = insertProductCategorySchema.parse(req.body);
      const category = await storage.createProductCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating product category:", error);
      res.status(400).json({ error: "Invalid product category data" });
    }
  });

  app.put("/api/admin/product-categories/:id", async (req, res) => {
    try {
      const categoryData = insertProductCategorySchema.parse(req.body);
      const category = await storage.updateProductCategory(parseInt(req.params.id), categoryData);
      res.json(category);
    } catch (error) {
      console.error("Error updating product category:", error);
      res.status(400).json({ error: "Invalid product category data" });
    }
  });

  app.delete("/api/admin/product-categories/:id", async (req, res) => {
    try {
      await storage.deleteProductCategory(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product category:", error);
      res.status(500).json({ error: "Failed to delete product category" });
    }
  });

  // Product Subcategories routes
  app.get("/api/admin/product-subcategories", async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string;
      let subcategories;
      if (categoryId) {
        subcategories = await storage.getProductSubcategoriesByCategory(parseInt(categoryId));
      } else {
        subcategories = await storage.getAllProductSubcategories();
      }
      res.json(subcategories);
    } catch (error) {
      console.error("Error fetching product subcategories:", error);
      res.status(500).json({ error: "Failed to fetch product subcategories" });
    }
  });

  app.get("/api/admin/product-subcategories/:id", async (req, res) => {
    try {
      const subcategory = await storage.getProductSubcategory(parseInt(req.params.id));
      if (!subcategory) {
        return res.status(404).json({ error: "Product subcategory not found" });
      }
      res.json(subcategory);
    } catch (error) {
      console.error("Error fetching product subcategory:", error);
      res.status(500).json({ error: "Failed to fetch product subcategory" });
    }
  });

  app.post("/api/admin/product-subcategories", async (req, res) => {
    try {
      const subcategoryData = insertProductSubcategorySchema.parse(req.body);
      const subcategory = await storage.createProductSubcategory(subcategoryData);
      res.status(201).json(subcategory);
    } catch (error) {
      console.error("Error creating product subcategory:", error);
      res.status(400).json({ error: "Invalid product subcategory data" });
    }
  });

  app.put("/api/admin/product-subcategories/:id", async (req, res) => {
    try {
      const subcategoryData = insertProductSubcategorySchema.parse(req.body);
      const subcategory = await storage.updateProductSubcategory(parseInt(req.params.id), subcategoryData);
      res.json(subcategory);
    } catch (error) {
      console.error("Error updating product subcategory:", error);
      res.status(400).json({ error: "Invalid product subcategory data" });
    }
  });

  app.delete("/api/admin/product-subcategories/:id", async (req, res) => {
    try {
      await storage.deleteProductSubcategory(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product subcategory:", error);
      res.status(500).json({ error: "Failed to delete product subcategory" });
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
  // Public endpoint for projects (no authentication required)
  app.get("/api/projects", async (req, res) => {
    try {
      const { language } = req.query;
      const projects = await storage.getAllProjects();
      // Only return active projects for public view, sorted by sortOrder
      const activeProjects = projects
        .filter(project => project.status === "active")
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
      
      // If language is specified, we could filter or enhance the response
      // For now, we return all projects with their full translation data
      res.json(activeProjects);
    } catch (error) {
      console.error("Error fetching public projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/admin/projects", requireAuth, async (req: any, res) => {
    try {
      console.log("=== Fetching projects ===");
      console.log("User ID:", req.userId);
      const projects = await storage.getAllProjects();
      console.log("Projects fetched:", projects.length);
      console.log("First project:", projects[0]);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/admin/projects/:id", requireAuth, async (req: any, res) => {
    try {
      console.log("=== Fetching single project ===");
      console.log("Project ID:", req.params.id);
      console.log("User ID:", req.userId);
      const project = await storage.getProject(parseInt(req.params.id));
      console.log("Project found:", project);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/admin/projects", requireAuth, async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.patch("/api/admin/projects/:id", requireAuth, async (req, res) => {
    try {
      const projectData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(parseInt(req.params.id), projectData);
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.delete("/api/admin/projects/:id", requireAuth, async (req, res) => {
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
      console.log('POST /api/admin/positions - Request body:', req.body);
      const positionData = insertPositionSchema.parse(req.body);
      console.log('Parsed position data:', positionData);
      const position = await storage.createPosition(positionData);
      console.log('Created position result:', position);
      res.status(201).json(position);
    } catch (error) {
      console.error("Error creating position:", error);
      res.status(400).json({ error: "Invalid position data" });
    }
  });

  app.patch("/api/admin/positions/:id", async (req, res) => {
    try {
      console.log('PATCH /api/admin/positions/:id - Request body:', req.body);
      const positionData = insertPositionSchema.partial().parse(req.body);
      console.log('Parsed position data:', positionData);
      const position = await storage.updatePosition(parseInt(req.params.id), positionData);
      console.log('Updated position result:', position);
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
      console.log('=== Processing Contact Form Submission ===');
      
      const validatedData = insertContactMessageSchema.parse(req.body);
      console.log('Contact form data validated:', {
        fullName: validatedData.fullName,
        email: validatedData.email,
        hasPhone: !!validatedData.phone,
        hasCompany: !!validatedData.company,
        messageLength: validatedData.message.length
      });
      
      // Save contact message to database
      const contactMessage = await storage.createContactMessage(validatedData);
      console.log('Contact message saved to database with ID:', contactMessage.id);
      
      // Check if Brevo is configured before attempting to send emails
      let emailsSent = false;
      let notificationSent = false;
      let autoReplySent = false;
      
      try {
        const { brevoService } = await import('./services/brevoService.js');
        const isBrevoConfigured = await brevoService.isBrevoConfigured();
        if (!isBrevoConfigured) {
          console.log('Brevo not configured - skipping email sending');
        } else {
          // Send email notifications via Brevo
          try {
            console.log('Attempting to send contact notification email...');
            notificationSent = await brevoService.sendContactNotification(validatedData);
            console.log('Contact notification email result:', notificationSent);
          } catch (emailError) {
            console.error('Contact notification email failed:', emailError);
          }
          
          try {
            console.log('Attempting to send auto-reply email...');
            autoReplySent = await brevoService.sendAutoReply(validatedData);
            console.log('Auto-reply email result:', autoReplySent);
          } catch (emailError) {
            console.error('Auto-reply email failed:', emailError);
          }
          
          emailsSent = notificationSent || autoReplySent;
          console.log('Email sending summary:', { notificationSent, autoReplySent, emailsSent });
        }
      } catch (brevoError) {
        console.error('Brevo service import or initialization failed:', brevoError);
        console.log('Continuing without email functionality');
      }
      
      res.status(201).json({ 
        message: 'Contact message sent successfully',
        id: contactMessage.id,
        emailsSent,
        notificationSent,
        autoReplySent
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
      
      // Send email notifications via Brevo (with error handling)
      try {
        const { brevoService } = await import('./services/brevoService.js');
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

  // Public Brochures API (no authentication required)
  app.get("/api/brochures", async (req, res) => {
    try {
      const { language, category } = req.query;
      let brochures;

      if (language && category) {
        brochures = await storage.getBrochuresByLanguageAndCategory(
          language as string, 
          category as string
        );
      } else if (language) {
        brochures = await storage.getBrochuresByLanguage(language as string);
      } else if (category) {
        brochures = await storage.getBrochuresByCategory(category as string);
      } else {
        brochures = await storage.getActiveBrochures();
      }

      res.json(brochures);
    } catch (error) {
      console.error("Error fetching public brochures:", error);
      res.status(500).json({ error: "Failed to fetch brochures" });
    }
  });

  // Get a specific brochure by ID (public)
  app.get("/api/brochures/:id", async (req, res) => {
    try {
      const brochure = await storage.getBrochureById(req.params.id);
      if (!brochure) {
        return res.status(404).json({ error: "Brochure not found" });
      }
      
      // Only return active brochures to public
      if (!brochure.active) {
        return res.status(404).json({ error: "Brochure not found" });
      }
      
      res.json(brochure);
    } catch (error) {
      console.error("Error fetching brochure:", error);
      res.status(500).json({ error: "Failed to fetch brochure" });
    }
  });

  // Get brochures by translation group (admin only)
  app.get("/api/admin/brochures/group/:translationGroup", requireAuth, async (req, res) => {
    try {
      const brochures = await storage.getBrochuresByTranslationGroup(req.params.translationGroup);
      res.json(brochures);
    } catch (error) {
      console.error("Error fetching brochures by translation group:", error);
      res.status(500).json({ error: "Failed to fetch brochures" });
    }
  });

  // Link brochures with same name/category to same translation group (admin utility)
  app.post("/api/admin/brochures/group-similar", requireAuth, async (req, res) => {
    try {
      const allBrochures = await storage.getAllBrochures();
      const updates = [];
      
      // Group brochures by name and category
      const groups = new Map<string, typeof allBrochures>();
      
      for (const brochure of allBrochures) {
        const key = `${brochure.name}-${brochure.category}`;
        if (!groups.has(key)) {
          groups.set(key, []);
        }
        groups.get(key)!.push(brochure);
      }
      
      // Assign same translation group to brochures with same name/category
      for (const [key, brochures] of Array.from(groups.entries())) {
        if (brochures.length > 1) {
          // Find existing translation group or create new one
          const existingGroup = brochures.find((b: any) => b.translationGroup)?.translationGroup;
          const groupId = existingGroup || `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          
          // Update all brochures in this group
          for (const brochure of brochures) {
            if (brochure.translationGroup !== groupId) {
              await storage.updateBrochure(brochure.id, { translationGroup: groupId });
              updates.push({ id: brochure.id, name: brochure.name, language: brochure.language, groupId });
            }
          }
        }
      }
      
      res.json({ 
        message: "Successfully grouped similar brochures", 
        updatedBrochures: updates.length,
        updates 
      });
    } catch (error) {
      console.error("Error grouping brochures:", error);
      res.status(500).json({ error: "Failed to group brochures" });
    }
  });

  // Add default descriptions to brochures that are missing them (admin utility)
  app.post("/api/admin/brochures/add-descriptions", requireAuth, async (req, res) => {
    try {
      const allBrochures = await storage.getAllBrochures();
      const updates = [];
      
      const defaultDescriptions = {
        en: {
          'Water-supply systems': 'High-quality pipes and fittings for reliable water supply systems. Professional grade materials with European standards compliance.',
          'Sewerage systems': 'Durable sewerage pipes and components for efficient wastewater management. Built to withstand heavy loads and chemical exposure.',
          'Gas': 'Premium gas pipeline systems designed for safe and efficient gas distribution. Meets all safety standards and regulations.',
          'Cable protection': 'Protective conduits and ducting systems for cable installations. Ensures long-term protection against environmental factors.',
          'default': 'Professional pipe solutions engineered for durability and performance. Manufactured to European quality standards.'
        },
        mk: {
          'Water-supply systems': 'Висококвалитетни цевки и фитинзи за сигурни системи за водоснабдување. Професионални материјали со европски стандарди.',
          'Sewerage systems': 'Издржливи канализациски цевки за ефикасно управување со отпадни води. Изградени да издржат големи оптоварувања.',
          'Gas': 'Премиум системи за гасоводи дизајнирани за безбедна дистрибуција на гас. Ги исполнува сите безбедносни стандарди.',
          'Cable protection': 'Заштитни системи за кабли и инсталации. Обезбедува долгорочна заштита од környезетски фактори.',
          'default': 'Професионални решенија за цевки инженерирани за издржливост и перформанси. Произведени според европски стандарди.'
        },
        de: {
          'Water-supply systems': 'Hochwertige Rohre und Fittings für zuverlässige Wasserversorgungssysteme. Professionelle Materialien nach europäischen Standards.',
          'Sewerage systems': 'Langlebige Abwasserrohre für effizientes Abwassermanagement. Entwickelt für hohe Belastungen und Chemikalienbeständigkeit.',
          'Gas': 'Premium-Gaspipelinesysteme für sichere Gasverteilung. Erfüllt alle Sicherheitsstandards und Vorschriften.',
          'Cable protection': 'Schutzrohre und Kanalsysteme für Kabelinstallationen. Gewährleistet langfristigen Schutz vor Umwelteinflüssen.',
          'default': 'Professionelle Rohrlösungen für Langlebigkeit und Leistung. Nach europäischen Qualitätsstandards hergestellt.'
        }
      };
      
      // Add descriptions to brochures that don't have them
      for (const brochure of allBrochures) {
        if (!brochure.description || brochure.description.trim() === '') {
          const lang = brochure.language as keyof typeof defaultDescriptions;
          const langDescriptions = defaultDescriptions[lang] || defaultDescriptions.en;
          const categoryDesc = langDescriptions[brochure.category as keyof typeof langDescriptions];
          const description = categoryDesc || langDescriptions.default;
          
          await storage.updateBrochure(brochure.id, { description });
          updates.push({ 
            id: brochure.id, 
            name: brochure.name, 
            language: brochure.language, 
            category: brochure.category,
            description: description.substring(0, 50) + '...'
          });
        }
      }
      
      res.json({ 
        message: "Successfully added descriptions to brochures", 
        updatedBrochures: updates.length,
        updates 
      });
    } catch (error) {
      console.error("Error adding descriptions:", error);
      res.status(500).json({ error: "Failed to add descriptions" });
    }
  });

  // Brochure downloads tracking
  app.post("/api/brochure-downloads", async (req, res) => {
    try {
      const downloadData = req.body;
      
      // Create download record
      const download = await storage.createBrochureDownload(downloadData);
      
      // Send email notifications using Brevo service
      let userEmailSent = false;
      let adminEmailSent = false;
      
      try {
        // Send email to user with download link
        const { EmailService } = await import('./services/emailService.js');
        const emailService = new EmailService();
        
        if (downloadData.pdfUrl) {
          userEmailSent = await emailService.sendBrochureDownloadEmail(
            downloadData.fullName,
            downloadData.email,
            downloadData.companyName,
            downloadData.brochureName,
            downloadData.brochureCategory,
            downloadData.pdfUrl
          );
        }
        
        // Send notification to admin
        const { brevoService } = await import('./services/brevoService.js');
        adminEmailSent = await brevoService.sendBrochureDownloadNotification(downloadData);
        
      } catch (emailError) {
        console.error('Error sending email notifications:', emailError);
      }
      
      res.json({ 
        ...download, 
        userEmailSent, 
        adminEmailSent,
        message: userEmailSent ? "Download recorded and email sent successfully" : "Download recorded but email failed to send"
      });
    } catch (error) {
      console.error("Error creating brochure download record:", error);
      res.status(500).json({ error: "Failed to create download record" });
    }
  });

  app.get("/api/admin/brochure-downloads", requireAuth, async (req, res) => {
    try {
      const downloads = await storage.getAllBrochureDownloads();
      res.json(downloads);
    } catch (error) {
      console.error("Error fetching brochure downloads:", error);
      res.status(500).json({ error: "Failed to fetch downloads" });
    }
  });

  app.delete("/api/admin/brochure-downloads/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteBrochureDownload(parseInt(req.params.id));
      res.json({ message: "Download record deleted successfully" });
    } catch (error) {
      console.error("Error deleting brochure download record:", error);
      res.status(500).json({ error: "Failed to delete download record" });
    }
  });

  // Validate download link hash
  app.post("/api/validate-download-link", async (req, res) => {
    try {
      const { hash, email, brochure, timestamp } = req.body;
      
      // Basic validation
      if (!hash || !email || !brochure || !timestamp) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Check if link is expired (24 hours)
      const linkTimestamp = parseInt(timestamp);
      const now = Date.now();
      const linkAge = now - linkTimestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (linkAge > maxAge) {
        return res.status(400).json({ error: "Download link has expired" });
      }

      // Generate expected hash
      const crypto = await import('crypto');
      const expectedHash = crypto.createHash('sha256').update(`${brochure}-${email}-${timestamp}`).digest('hex');
      
      if (hash !== expectedHash) {
        return res.status(400).json({ error: "Invalid download link" });
      }

      res.json({ valid: true });
    } catch (error) {
      console.error("Error validating download link:", error);
      res.status(500).json({ error: "Failed to validate link" });
    }
  });

  // Get brochure URL for download
  app.post("/api/get-brochure-url", async (req, res) => {
    try {
      const { brochureName, email } = req.body;
      
      // Find the brochure URL based on name
      // This would typically query your brochures table
      // For now, we'll use a mapping based on the static data
      const brochureUrls: { [key: string]: string } = {
        "PE 80/100": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
        "PE 100 RC": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-PE100-RC_EN_2021_compressed.pdf",
        "PE FITTINGS FOR BUTT WELDING": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
        "ELECTROFUSION FITTINGS": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
        "KONTI KAN": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-cevki-en.pdf",
        "KONTI KAN SPIRAL": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral-cevki-en.pdf",
        "KONTI KAN FITTINGS": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
        "KONTI KAN PPHM FITTINGS": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pphm-fitinzi.pdf",
        "KCH": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-pp-hm-2023-en.pdf",
        "PPHM HIGH PERFORMANCE": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pphm-visoki-performansi-en.pdf",
        "DRAINAGE PIPES": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-drenaza-en.pdf",
        "POLYPROPYLENE MANHOLES": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/polipropilenski-sahti-en.pdf",
        "GAS PIPES": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/priroden-gas-en.pdf",
        "PETROL GAS": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/petrol-gas-en.pdf",
        "KONTI KAN DUCT": "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/konti-kan-dakt-en.pdf"
      };

      const pdfUrl = brochureUrls[brochureName];
      
      if (!pdfUrl) {
        return res.status(404).json({ error: "Brochure not found" });
      }

      res.json({ pdfUrl });
    } catch (error) {
      console.error("Error getting brochure URL:", error);
      res.status(500).json({ error: "Failed to get brochure URL" });
    }
  });

  // Track actual download
  app.post("/api/track-actual-download", async (req, res) => {
    try {
      const { brochureName, email, downloadDate } = req.body;
      
      // This could be used to track when users actually download the PDF
      // For now, we'll just log it
      console.log(`Actual download tracked: ${brochureName} by ${email} at ${downloadDate}`);
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error tracking actual download:", error);
      res.status(500).json({ error: "Failed to track download" });
    }
  });

  // Download PDF for a specific brochure
  app.get("/api/brochures/:id/download", async (req, res) => {
    try {
      const brochure = await storage.getBrochureById(req.params.id);
      if (!brochure || !brochure.active) {
        return res.status(404).json({ error: "Brochure not found" });
      }

      if (!brochure.pdfUrl) {
        return res.status(404).json({ error: "PDF not available" });
      }

      // If it's a relative URL (uploaded file), serve from uploads directory
      if (brochure.pdfUrl.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), brochure.pdfUrl);
        try {
          await fs.access(filePath);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `attachment; filename="${brochure.name}.pdf"`);
          return res.sendFile(filePath);
        } catch (fileError) {
          return res.status(404).json({ error: "PDF file not found" });
        }
      } else {
        // External URL - redirect to it
        res.redirect(brochure.pdfUrl);
      }
    } catch (error) {
      console.error("Error downloading brochure PDF:", error);
      res.status(500).json({ error: "Failed to download PDF" });
    }
  });

  // Get positions (public) - for team display on About Us page
  app.get("/api/positions", async (req, res) => {
    try {
      console.log('=== /api/positions endpoint called ===');
      const positions = await storage.getAllPositions();
      console.log('Raw positions from storage:', positions);
      
      // Filter only active positions for public API
      const activePositions = positions.filter(pos => pos.active);
      console.log('Active positions:', activePositions);
      
      // If no positions found, return some test data
      if (activePositions.length === 0) {
        console.log('No positions found, returning test data');
        const testPositions = [
          {
            id: 1,
            title: 'Commerce',
            active: true,
            translations: {
              en: { title: 'Commerce' },
              mk: { title: 'Комерција' },
              de: { title: 'Handel' }
            },
            defaultLanguage: 'en',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        return res.json(testPositions);
      }
      
      res.json(activePositions);
    } catch (error) {
      console.error("Error fetching positions:", error);
      res.status(500).json({ error: "Failed to fetch positions" });
    }
  });

  // Get brochure categories (public)
  app.get("/api/brochure-categories", async (req, res) => {
    try {
      const categories = await storage.getAllBrochureCategories();
      // Filter only active categories for public API
      const activeCategories = categories.filter(cat => cat.active);
      res.json(activeCategories);
    } catch (error) {
      console.error("Error fetching brochure categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Register translation routes
  app.use(translationRoutes);

  const httpServer = createServer(app);
  return httpServer;
}