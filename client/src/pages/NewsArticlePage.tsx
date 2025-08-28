import { useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Calendar, User, ArrowLeft, Loader2, FileText } from "lucide-react";
import { Link } from "wouter";
import type { NewsArticle } from "@shared/schema";

// Define the ArticleSection interface to match admin structure
interface ArticleSection {
  id: string;
  type: "text" | "image" | "text-with-image";
  title: {
    en: string;
    mk: string;
    de: string;
  };
  content: {
    en: string;
    mk: string;
    de: string;
  };
  imageUrl?: string;
  imagePosition?: "left" | "right";
}

// Utility function to get translated content from news article
const getTranslatedContent = (article: NewsArticle, language: string, field: 'title' | 'description') => {
  console.log(`=== getTranslatedContent Debug ===`);
  console.log(`Article ID: ${article.id}`);
  console.log(`Language: ${language}`);
  console.log(`Field: ${field}`);
  console.log(`Article translations:`, article.translations);
  console.log(`Article title:`, article.title);
  console.log(`Article description:`, article.description);
  
  if (!article.translations) {
    console.log('No translations object found, using fallback');
    return field === 'title' ? article.title : article.description;
  }
  
  const translations = article.translations as any;
  console.log(`Translations object:`, translations);
  console.log(`Language ${language} translations:`, translations[language]);
  
  if (translations[language] && translations[language][field]) {
    console.log(`Found ${language} translation for ${field}:`, translations[language][field]);
    return translations[language][field];
  }
  
  // Fallback to English if translation not available
  if (translations.en && translations.en[field]) {
    console.log(`Using English fallback for ${field}:`, translations.en[field]);
    return translations.en[field];
  }
  
  // Final fallback to the main field
  const fallbackValue = field === 'title' ? article.title : article.description;
  console.log(`Using final fallback for ${field}:`, fallbackValue);
  return fallbackValue;
};

// Utility function to get translated section content
const getTranslatedSectionContent = (section: any, language: string, field: 'title' | 'content') => {
  console.log(`=== getTranslatedSectionContent Debug ===`);
  console.log(`Section:`, section);
  console.log(`Language: ${language}`);
  console.log(`Field: ${field}`);
  
  if (!section) {
    console.log('No section provided');
    return '';
  }
  
  // Check if section has the new multi-language structure (title/content with en/mk/de)
  if (section[field] && typeof section[field] === 'object' && section[field][language]) {
    const multiLangContent = section[field] as any;
    console.log(`Found new structure for ${field}:`, multiLangContent);
    
    if (multiLangContent[language] && typeof multiLangContent[language] === 'string') {
      console.log(`Found ${language} translation for ${field}:`, multiLangContent[language]);
      return multiLangContent[language];
    }
  }
  
  // Check if section has the old structure (titleTranslations/contentTranslations)
  const oldFieldName = field === 'title' ? 'titleTranslations' : 'contentTranslations';
  if (section[oldFieldName] && typeof section[oldFieldName] === 'object') {
    const oldTranslations = section[oldFieldName] as any;
    console.log(`Found old structure for ${field}:`, oldTranslations);
    
    if (oldTranslations[language] && typeof oldTranslations[language] === 'string') {
      console.log(`Found ${language} translation for ${field} using old structure:`, oldTranslations[language]);
      return oldTranslations[language];
    }
  }
  
  // Fallback to English if translation not available (try both structures)
  if (section[field] && typeof section[field] === 'object' && section[field].en) {
    const fallbackContent = section[field].en;
    console.log(`Using English fallback for ${field} (new structure):`, fallbackContent);
    return fallbackContent;
  }
  
  if (section[oldFieldName] && typeof section[oldFieldName] === 'object' && section[oldFieldName].en) {
    const fallbackContent = section[oldFieldName].en;
    console.log(`Using English fallback for ${field} (old structure):`, fallbackContent);
    return fallbackContent;
  }
  
  // Fallback to the main field if it's a string
  if (typeof section[field] === 'string') {
    const fallbackValue = section[field];
    console.log(`Using string fallback for ${field}:`, fallbackValue);
    return fallbackValue;
  }
  
  // Final fallback
  const fallbackValue = '';
  console.log(`No translation found for ${field}, using empty string`);
  return fallbackValue;
};

// Format date helper
const formatDate = (dateString: string | Date | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function NewsArticlePage() {
  const { t, language } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const { slug } = useParams(); // This will be the article ID

  // Debug: Log language changes
  useEffect(() => {
    console.log('=== LANGUAGE CHANGE DEBUG ===');
    console.log('Current language:', language);
    console.log('Language context translations available:', t);
  }, [language, t]);

  // Fetch the specific article
  const {
    data: article,
    isLoading,
    error,
  } = useQuery<NewsArticle>({
    queryKey: ["/api/news", slug],
    enabled: !!slug,
  });

  // Debug: Log article data changes
  useEffect(() => {
    if (article) {
      console.log('=== ARTICLE DATA DEBUG ===');
      console.log('Article loaded:', {
        id: article.id,
        title: article.title,
        description: article.description,
        translations: article.translations,
        sections: article.sections,
        published: article.published,
        createdAt: article.createdAt
      });
    }
  }, [article]);

  useEffect(() => {
    if (article) {
      // Get translated title for page title
      const translatedTitle = getTranslatedContent(article, language, 'title') || article.title;
      document.title = `${translatedTitle} - ${companyInfo.companyName || "Konti Hidroplast"}`;

      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        const translatedDescription = getTranslatedContent(article, language, 'description') || article.description;
        metaDescription.setAttribute(
          "content",
          translatedDescription ||
            `${translatedTitle} - Latest news from Konti Hidroplast`,
        );
      }
    }
  }, [article, language]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center py-20 mt-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#1c2d56]" />
          <span className="ml-3 text-lg text-gray-600">
            {t("common.loading")}
          </span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The article you're looking for could not be found.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center px-6 py-3 bg-[#1c2d56] text-white rounded-lg hover:bg-[#1c2d56]/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to News
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to News
          </Link>

          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full">
              NEWS ARTICLE
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {(() => {
              const translatedTitle = getTranslatedContent(article, language, 'title');
              console.log(`=== HERO TITLE DEBUG ===`);
              console.log(`Current language: ${language}`);
              console.log(`Translated title:`, translatedTitle);
              console.log(`Original title:`, article.title);
              return translatedTitle || article.title;
            })()}
          </h1>

          {(() => {
            const translatedDescription = getTranslatedContent(article, language, 'description');
            console.log(`=== HERO DESCRIPTION DEBUG ===`);
            console.log(`Current language: ${language}`);
            console.log(`Translated description:`, translatedDescription);
            console.log(`Original description:`, article.description);
            return translatedDescription;
          })() && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {getTranslatedContent(article, language, 'description')}
            </p>
          )}

          <div className="flex items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            {/* <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Konti Hidroplast Team</span>
            </div> */}
          </div>
        </div>
      </section>


      {/* Article Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="space-y-8">
            {article.sections &&
            Array.isArray(article.sections) &&
            article.sections.length > 0 ? (
              article.sections.map((section: ArticleSection, index: number) => {
                console.log(`=== RENDERING SECTION ${index + 1} ===`);
                console.log(`Section data:`, section);
                console.log(`Current language: ${language}`);
                
                // Debug the translation retrieval for this section
                const translatedTitle = getTranslatedSectionContent(section, language, 'title');
                const translatedContent = getTranslatedSectionContent(section, language, 'content');
                
                console.log(`Section ${index + 1} translations:`, {
                  title: {
                    requested: language,
                    found: translatedTitle,
                    available: section.title
                  },
                  content: {
                    requested: language,
                    found: translatedContent,
                    available: section.content
                  }
                });
                
                return (
                  <div key={section.id || index} className="mb-8">
                    {/* Section Title - positioned above content area */}

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      {/* Text Only Section */}
                      {section.type === "text" && (
                        <div className="px-8 py-8">
                          <h2 className="text-2xl font-bold text-[#1c2d56] leading-tight mb-6">
                            {getTranslatedSectionContent(section, language, 'title')}
                          </h2>
                          <div
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: getTranslatedSectionContent(section, language, 'content').replace(/\n/g, "<br>"),
                            }}
                          />
                        </div>
                      )}

                      {/* Image Only Section */}
                      {section.type === "image" && section.imageUrl && (
                        <div className="px-8 py-8">
                          <h2 className="text-2xl font-bold text-[#1c2d56] leading-tight mb-6">
                            {getTranslatedSectionContent(section, language, 'title')}
                          </h2>
                          <img
                            src={section.imageUrl}
                            alt={getTranslatedSectionContent(section, language, 'title') || `Section ${index + 1}`}
                            className="w-full h-[28rem] object-cover rounded-lg shadow-md"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        </div>
                      )}

                      {/* Text with Image Section */}
                      {section.type === "text-with-image" && (
                        <div className="px-8 py-8">
                          <div
                            className={`grid gap-8 items-start ${
                              section.imagePosition === "left"
                                ? "md:grid-cols-2"
                                : "md:grid-cols-2"
                            }`}
                          >
                            {/* Text Content */}
                            <div
                              className={`${
                                section.imagePosition === "left"
                                  ? "md:order-2"
                                  : "md:order-1"
                              }`}
                            >
                              <h2 className="text-2xl font-bold text-[#1c2d56] leading-tight mb-6">
                                {getTranslatedSectionContent(section, language, 'title')}
                              </h2>
                              <div
                                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: getTranslatedSectionContent(section, language, 'content').replace(/\n/g, "<br>"),
                                }}
                              />
                            </div>

                            {/* Image */}
                            {section.imageUrl && (
                              <div
                                className={`${
                                  section.imagePosition === "left"
                                    ? "md:order-1"
                                    : "md:order-2"
                                }`}
                              >
                                <img
                                  src={section.imageUrl}
                                  alt={getTranslatedSectionContent(section, language, 'title') || `Section ${index + 1}`}
                                  className="w-full h-[28rem] object-cover rounded-lg shadow-md"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="text-center text-gray-600">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>{t("newsPage.noContent.line1")}</p>
                  <p>{t("newsPage.noContent.line2")}</p>
                </div>
              </div>
            )}
          </div>

          {/* Back to News */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/news"
              className="inline-flex items-center px-6 py-3 bg-[#1c2d56] text-white rounded-lg hover:bg-[#1c2d56]/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t("newsPage.backToNews")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NewsArticlePage;
