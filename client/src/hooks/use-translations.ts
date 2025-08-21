import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

// Type for translatable content structure
export interface TranslatableContent {
  en?: { [key: string]: string };
  mk?: { [key: string]: string };
  de?: { [key: string]: string };
}

// Type for database items with translations
export interface TranslatableItem {
  [key: string]: any;
  translations?: TranslatableContent;
  defaultLanguage?: string;
}

/**
 * Hook for handling dynamic content translations from database
 * @param item - Database item with translations field
 * @param fallbackFields - Array of field names to use as fallbacks
 * @returns Object with translated content
 */
export function useTranslation<T extends TranslatableItem>(
  item: T | undefined,
  fallbackFields: string[] = []
): T & { translatedContent: Record<string, string> } {
  const { language } = useLanguage();

  const translatedItem = useMemo(() => {
    if (!item) return undefined;

    const translations = item.translations || {};
    const defaultLang = item.defaultLanguage || 'en';
    const translatedContent: Record<string, string> = {};

    // Get translations for current language, with fallbacks
    fallbackFields.forEach(field => {
      // 1st priority: Translation in current language
      const currentLangTranslation = translations[language as keyof TranslatableContent]?.[field];
      // 2nd priority: Translation in default language
      const defaultLangTranslation = translations[defaultLang as keyof TranslatableContent]?.[field];
      // 3rd priority: Original field value
      const originalValue = item[field];

      translatedContent[field] = currentLangTranslation || defaultLangTranslation || originalValue || '';
    });

    return {
      ...item,
      translatedContent
    };
  }, [item, language, fallbackFields]);

  return translatedItem as T & { translatedContent: Record<string, string> };
}

/**
 * Hook for translating arrays of items
 * @param items - Array of database items with translations
 * @param fallbackFields - Array of field names to use as fallbacks
 * @returns Array of items with translated content
 */
export function useTranslationArray<T extends TranslatableItem>(
  items: T[] | undefined,
  fallbackFields: string[] = []
): Array<T & { translatedContent: Record<string, string> }> {
  const { language } = useLanguage();

  const translatedItems = useMemo(() => {
    if (!items) return [];

    return items.map(item => {
      const translations = item.translations || {};
      const defaultLang = item.defaultLanguage || 'en';
      const translatedContent: Record<string, string> = {};

      fallbackFields.forEach(field => {
        const currentLangTranslation = translations[language as keyof TranslatableContent]?.[field];
        const defaultLangTranslation = translations[defaultLang as keyof TranslatableContent]?.[field];
        const originalValue = item[field];

        translatedContent[field] = currentLangTranslation || defaultLangTranslation || originalValue || '';
      });

      return {
        ...item,
        translatedContent
      };
    });
  }, [items, language, fallbackFields]);

  return translatedItems;
}

/**
 * Utility function to prepare translation data for database storage
 * @param currentData - Current translation data
 * @param language - Language code
 * @param updates - Fields to update
 * @returns Updated translations object
 */
export function prepareTranslationUpdate(
  currentData: TranslatableContent | undefined,
  language: string,
  updates: Record<string, string>
): TranslatableContent {
  const translations = currentData || {};
  
  return {
    ...translations,
    [language]: {
      ...(translations[language as keyof TranslatableContent] || {}),
      ...updates
    }
  };
}

/**
 * Helper function to get translated text for a specific field
 * @param item - Database item with translations
 * @param field - Field name
 * @param language - Language code
 * @returns Translated text or fallback
 */
export function getTranslatedField(
  item: TranslatableItem,
  field: string,
  language: string = 'en'
): string {
  const translations = item.translations || {};
  const defaultLang = item.defaultLanguage || 'en';

  return (
    translations[language as keyof TranslatableContent]?.[field] ||
    translations[defaultLang as keyof TranslatableContent]?.[field] ||
    item[field] ||
    ''
  );
}