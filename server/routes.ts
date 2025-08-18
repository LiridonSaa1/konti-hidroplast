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
import {
  insertProductSchema,
  insertMediaSchema,
  insertCompanyInfoSchema,
  insertNewsArticleSchema,
  insertCertificateSchema,
  insertBrochureSchema,
  insertBrochureCategorySchema,
  insertProjectSchema,
  insertTeamSchema,
  insertPositionSchema,
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
      const existingAdmin = await storage.getUserByUsername('admin');
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await storage.createUser({
          username: 'admin',
          password: hashedPassword,
          email: 'admin@kontihidroplast.com',
          role: 'admin'
        });
        console.log('Default admin user created: admin/admin123');
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
  app.get("/api/admin/company-info", async (req, res) => {
    try {
      const info = await storage.getAllCompanyInfo();
      res.json(info);
    } catch (error) {
      console.error("Error fetching company info:", error);
      res.status(500).json({ error: "Failed to fetch company info" });
    }
  });

  app.get("/api/admin/company-info/:key", async (req, res) => {
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

  app.post("/api/admin/company-info", async (req, res) => {
    try {
      const infoData = insertCompanyInfoSchema.parse(req.body);
      const info = await storage.upsertCompanyInfo(infoData);
      res.json(info);
    } catch (error) {
      console.error("Error updating company info:", error);
      res.status(400).json({ error: "Invalid company info data" });
    }
  });

  // News routes
  app.get("/api/admin/news", async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/admin/news/:id", async (req, res) => {
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

  app.post("/api/admin/news", async (req, res) => {
    try {
      const newsData = insertNewsArticleSchema.parse(req.body);
      const article = await storage.createNews(newsData);
      res.status(201).json(article);
    } catch (error) {
      console.error("Error creating news article:", error);
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  app.put("/api/admin/news/:id", async (req, res) => {
    try {
      const newsData = insertNewsArticleSchema.partial().parse(req.body);
      const article = await storage.updateNews(req.params.id, newsData);
      res.json(article);
    } catch (error) {
      console.error("Error updating news article:", error);
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  app.delete("/api/admin/news/:id", async (req, res) => {
    try {
      await storage.deleteNews(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting news article:", error);
      res.status(500).json({ error: "Failed to delete news article" });
    }
  });

  // Certificates routes
  app.get("/api/admin/certificates", async (req, res) => {
    try {
      const certificates = await storage.getAllCertificates();
      res.json(certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ error: "Failed to fetch certificates" });
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
      const certificate = await storage.updateCertificate(req.params.id, certificateData);
      res.json(certificate);
    } catch (error) {
      console.error("Error updating certificate:", error);
      res.status(400).json({ error: "Invalid certificate data" });
    }
  });

  app.delete("/api/admin/certificates/:id", async (req, res) => {
    try {
      await storage.deleteCertificate(req.params.id);
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

  // Register translation routes
  app.use(translationRoutes);

  const httpServer = createServer(app);
  return httpServer;
}