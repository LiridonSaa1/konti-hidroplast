import OpenAI from "openai";
import * as pdfParse from "pdf-parse";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

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
    try {
      const data = await pdfParse(pdfBuffer);
      return data.text.trim();
    } catch (error) {
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

  async translateText(
    text: string, 
    sourceLanguage: string, 
    targetLanguage: string
  ): Promise<TranslationResult> {
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
      throw new Error(`Translation failed: ${error.message}`);
    }
  }

  async translateBrochureContent(
    originalName: string,
    originalDescription: string,
    originalCategory: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<{ name: string; description: string; category: string }> {
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
}

export const translationService = new TranslationService();