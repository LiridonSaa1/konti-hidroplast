import OpenAI from "openai";

// Only create OpenAI client if API key is available
let openai: OpenAI | null = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
  }
} catch (error) {
  console.warn("OpenAI client initialization failed:", error);
}

interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  wordCount: number;
}

interface SuggestedBrochure {
  name: string;
  category: string;
  language: string;
  description: string;
  status: string;
  active: boolean;
  sortOrder: number;
  imageUrl: string;
  translationMetadata: {
    sourceLanguage: string;
    originalBrochureId: string;
    wordCount: number;
    translatedAt: string;
  };
}

export class TranslationService {
  private getLanguageName(code: string): string {
    const languages: Record<string, string> = {
      'en': 'English',
      'mk': 'Macedonian (North Macedonia)',
      'de': 'German'
    };
    return languages[code] || code;
  }

  async extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
    // For now, return a placeholder since we don't have PDF parsing set up
    // This would need a proper PDF parsing library in production
    throw new Error("PDF text extraction is not currently available. Please ensure the OPENAI_API_KEY is configured for translations.");
  }

  async translateText(
    text: string, 
    sourceLanguage: string, 
    targetLanguage: string
  ): Promise<TranslationResult> {
    if (!openai) {
      throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.");
    }

    try {
      const sourceLangName = this.getLanguageName(sourceLanguage);
      const targetLangName = this.getLanguageName(targetLanguage);

      const prompt = `Translate the following technical document text from ${sourceLangName} to ${targetLangName}. 
      
Maintain the original formatting, technical terminology, and structure as much as possible. 
This is content from a brochure for PE and PP pipes manufacturing company, so preserve industry-specific terms.

Original text:
${text}

Translated text:`;

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a professional technical translator specializing in industrial and manufacturing documentation. 
            Translate accurately while preserving technical terms, measurements, and product specifications.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.3,
      });

      const translatedText = response.choices[0].message.content || "";
      const wordCount = text.split(/\s+/).length;

      return {
        originalText: text,
        translatedText: translatedText,
        sourceLanguage,
        targetLanguage,
        wordCount
      };
    } catch (error) {
      throw new Error(`Translation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async translateBrochureContent(
    originalName: string,
    originalDescription: string,
    originalCategory: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<{ name: string; description: string; category: string }> {
    if (!openai) {
      throw new Error("OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.");
    }

    try {
      const sourceLangName = this.getLanguageName(sourceLanguage);
      const targetLangName = this.getLanguageName(targetLanguage);

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a professional translator for technical product documentation. 
            Translate brochure metadata while preserving technical accuracy and marketing tone.
            Return your response as JSON with the format: {"name": "translated name", "description": "translated description", "category": "translated category"}`
          },
          {
            role: "user",
            content: `Translate the following brochure metadata from ${sourceLangName} to ${targetLangName}:

Name: ${originalName}
Description: ${originalDescription}
Category: ${originalCategory}

Provide the translation as JSON:`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return {
        name: result.name || originalName,
        description: result.description || originalDescription,
        category: result.category || originalCategory
      };
    } catch (error) {
      console.error("Failed to translate brochure content:", error);
      // Return originals if translation fails
      return {
        name: originalName,
        description: originalDescription,
        category: originalCategory
      };
    }
  }

  generateSuggestedBrochure(
    originalBrochure: any,
    translatedContent: { name: string; description: string; category: string },
    translationResult: TranslationResult,
    originalBrochureId: string
  ): SuggestedBrochure {
    return {
      name: translatedContent.name,
      category: translatedContent.category,
      language: translationResult.targetLanguage,
      description: translatedContent.description,
      status: 'draft', // Start as draft for review
      active: false, // Start inactive until reviewed
      sortOrder: originalBrochure.sortOrder || 0,
      imageUrl: originalBrochure.imageUrl || "", // Reuse same image
      translationMetadata: {
        sourceLanguage: translationResult.sourceLanguage,
        originalBrochureId: originalBrochureId,
        wordCount: translationResult.wordCount,
        translatedAt: new Date().toISOString()
      }
    };
  }

  static async translatePdfContent(
    pdfPath: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<TranslationResult> {
    // For now, return a mock translation result since PDF parsing is not available
    return {
      originalText: "PDF content extraction not available",
      translatedText: "PDF content translation not available",
      sourceLanguage,
      targetLanguage,
      wordCount: 0
    };
  }

  static async generateTranslatedBrochureData(
    originalBrochure: any,
    targetLanguage: string,
    translationResult: TranslationResult
  ): Promise<SuggestedBrochure> {
    const service = new TranslationService();
    const translatedContent = await service.translateBrochureContent(
      originalBrochure.name || "",
      originalBrochure.description || "",
      originalBrochure.category || "",
      translationResult.sourceLanguage,
      targetLanguage
    );
    
    return service.generateSuggestedBrochure(
      originalBrochure,
      translatedContent,
      translationResult,
      originalBrochure.id
    );
  }
}

export const translationService = new TranslationService();