import { Router } from "express";
import { TranslationService } from "../services/translationService";
import { storage } from "../storage";
import path from "path";
import fs from "fs";

const router = Router();

// Translate brochure PDF to another language
router.post("/api/admin/brochures/:id/translate", async (req, res) => {
  try {
    const { id } = req.params;
    const { targetLanguage } = req.body;

    if (!targetLanguage) {
      return res.status(400).json({ error: "Target language is required" });
    }

    // Get the original brochure
    const brochure = await storage.getBrochureById(id);
    if (!brochure) {
      return res.status(404).json({ error: "Brochure not found" });
    }

    if (!brochure.pdfUrl) {
      return res.status(400).json({ error: "Brochure has no PDF to translate" });
    }

    // Check if it's a file upload (local file) or external URL
    let pdfPath: string;
    if (brochure.pdfUrl.startsWith('/uploads/')) {
      // Local file
      pdfPath = path.join(process.cwd(), 'uploads', path.basename(brochure.pdfUrl));
      
      if (!fs.existsSync(pdfPath)) {
        return res.status(404).json({ error: "PDF file not found on server" });
      }
    } else {
      // External URL - we'll need to download it first
      return res.status(400).json({ 
        error: "Translation currently only supports uploaded PDF files, not external URLs" 
      });
    }

    // Perform translation
    const translationResult = await TranslationService.translatePdfContent(
      pdfPath,
      brochure.language || 'en',
      targetLanguage
    );

    // Generate suggested brochure data for the translation
    const translatedBrochureData = await TranslationService.generateTranslatedBrochureData(
      brochure,
      targetLanguage,
      translationResult
    );

    res.json({
      success: true,
      translationResult,
      suggestedBrochure: translatedBrochureData,
      message: `Successfully translated PDF from ${translationResult.sourceLanguage} to ${translationResult.targetLanguage}`
    });

  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ 
      error: "Translation failed", 
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Get translation status for a brochure
router.get("/api/admin/brochures/:id/translations", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get all brochures to find translations of this one
    const allBrochures = await storage.getAllBrochures();
    
    const translations = allBrochures.filter(b => {
      const metadata = b.translationMetadata as any;
      return metadata?.originalBrochureId === id ||
        (b.id === id && metadata?.originalBrochureId);
    });

    res.json({
      translations: translations.map(t => {
        const metadata = t.translationMetadata as any;
        return {
          id: t.id,
          name: t.name,
          language: t.language,
          status: t.status,
          active: t.active,
          translatedAt: metadata?.translatedAt,
          wordCount: metadata?.wordCount
        };
      })
    });

  } catch (error) {
    console.error("Error fetching translations:", error);
    res.status(500).json({ error: "Failed to fetch translations" });
  }
});

export default router;