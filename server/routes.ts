import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertProductSchema,
  insertMediaSchema,
  insertCompanyInfoSchema,
  insertNewsArticleSchema,
  insertCertificateSchema,
  insertBrochureSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}
