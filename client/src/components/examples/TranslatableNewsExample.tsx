// Example of how to use the translation system with dynamic content
import React from 'react';
import { useTranslationArray } from '@/hooks/use-translations';
import { useLanguage } from '@/contexts/LanguageContext';

// Example news item from database
const sampleNewsData = [
  {
    id: "1",
    title: "Company Expansion",
    description: "We are expanding our operations...",
    translations: {
      en: {
        title: "Company Expansion",
        description: "We are expanding our operations to new markets"
      },
      mk: {
        title: "Проширување на компанијата",
        description: "Ги прошируваме нашите операции на нови пазари"
      },
      de: {
        title: "Unternehmenserweiterung",
        description: "Wir erweitern unsere Geschäftstätigkeit auf neue Märkte"
      }
    }
  }
];

export function TranslatableNewsExample() {
  const { language } = useLanguage();
  
  // Translate the array of news items
  const translatedNews = useTranslationArray(sampleNewsData, ['title', 'description']);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dynamic Content Translation Example</h2>
      <p className="text-sm text-gray-500">Current Language: {language}</p>
      
      {translatedNews.map((news) => (
        <div key={news.id} className="border p-4 rounded-lg">
          {/* Use translated content */}
          <h3 className="text-xl font-semibold">{news.translatedContent.title}</h3>
          <p className="text-gray-600">{news.translatedContent.description}</p>
          
          {/* Debug info */}
          <div className="mt-2 text-xs text-gray-400">
            <details>
              <summary>Translation Debug</summary>
              <pre>{JSON.stringify(news.translations, null, 2)}</pre>
            </details>
          </div>
        </div>
      ))}
    </div>
  );
}