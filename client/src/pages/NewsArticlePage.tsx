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
  title: string;
  content: string;
  imageUrl?: string;
  imagePosition?: "left" | "right";
}

// Utility function to get translated content from news article
const getTranslatedContent = (article: NewsArticle, language: string, field: 'title' | 'description') => {
  if (!article.translations) return null;
  
  const translations = article.translations as any;
  if (translations[language] && translations[language][field]) {
    return translations[language][field];
  }
  
  // Fallback to English if translation not available
  if (translations.en && translations.en[field]) {
    return translations.en[field];
  }
  
  // Final fallback to the main field
  return field === 'title' ? article.title : article.description;
};

// Utility function to get translated section content
const getTranslatedSectionContent = (section: any, language: string, field: 'title' | 'content') => {
  if (!section) return '';
  
  // Check if section has multi-language structure
  if (section[field] && typeof section[field] === 'object') {
    const multiLangContent = section[field] as any;
    if (multiLangContent[language]) {
      return multiLangContent[language];
    }
    // Fallback to English
    if (multiLangContent.en) {
      return multiLangContent.en;
    }
  }
  
  // Fallback to the main field
  return section[field] || '';
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

  // Fetch the specific article
  const {
    data: article,
    isLoading,
    error,
  } = useQuery<NewsArticle>({
    queryKey: ["/api/news", slug],
    enabled: !!slug,
  });

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
            {getTranslatedContent(article, language, 'title') || article.title}
          </h1>

          {getTranslatedContent(article, language, 'description') && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {getTranslatedContent(article, language, 'description')}
            </p>
          )}

          <div className="flex items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Konti Hidroplast Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Language Indicator */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full shadow-sm border border-gray-200">
              <span className="text-sm font-medium text-gray-600">Viewing in:</span>
              <span className="text-sm font-semibold text-[#1c2d56]">
                {language === 'en' ? '🇺🇸 English' : language === 'mk' ? '🇲🇰 Macedonian' : '🇩🇪 German'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {language === 'en' 
                ? 'Original content in English' 
                : 'Translated content - some sections may show English if translation is not available'
              }
            </p>
          </div>
          
          {/* Article Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {getTranslatedContent(article, language, 'title') || article.title}
            </h1>

            {getTranslatedContent(article, language, 'description') && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {getTranslatedContent(article, language, 'description')}
              </p>
            )}

            <div className="flex items-center justify-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Konti Hidroplast Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Content Based on Structured Sections */}
          <div className="space-y-8">
            {article.sections &&
            Array.isArray(article.sections) &&
            article.sections.length > 0 ? (
              article.sections.map((section: ArticleSection, index: number) => (
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
              ))
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
