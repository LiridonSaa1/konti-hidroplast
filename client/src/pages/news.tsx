import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import type { NewsArticle } from "@shared/schema";

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// Format date helper
const formatDate = (dateString: string | Date | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};



function NewsPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch published news articles from API
  const { data: newsArticles = [], isLoading: isLoadingNews } = useQuery<NewsArticle[]>({
    queryKey: ["/api/news"]
  });

  useEffect(() => {
    // Set page title
    document.title = `News & Updates - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Stay updated with the latest news, innovations, and developments from Konti Hidroplast. Industry insights, company updates, and technological advancements in pipe manufacturing.",
      );
    }
  }, []);

  const loadMoreArticles = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleArticles((prev) => Math.min(prev + 3, newsArticles.length));
      setIsLoading(false);
    }, 800);
  };

  // New 3-section design NewsCard component matching the mockup
  const NewsCard = ({ article }: { article: NewsArticle }) => (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-200"
      data-testid={`news-card-${article.id}`}
    >
      {/* Section 3: Main Article Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400 text-sm">{t("newsPage.noImage")}</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* News Category Label */}
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {t("newsPage.newsCategory")}
          </span>
        </div>
        
        {/* Section 1: Title */}
        <h3 className="text-xl font-bold text-[#1c2d56] mb-3 leading-tight">
          {truncateText(article.title, 60)}
        </h3>
        
        {/* Section 2: Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {article.description ? truncateText(article.description, 120) : t("newsPage.noDescription")}
        </p>

        {/* Date and Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(article.createdAt)}</span>
          </div>
          <a
            href={`/news/${article.id}`}
            className="inline-flex items-center px-4 py-2 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white text-sm font-medium rounded transition-colors"
            data-testid={`read-more-${article.id}`}
          >
            {t("newsPage.readMore")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="h-full w-full bg-gradient-to-l from-white/20 to-transparent transform skew-x-12"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
              <span className="text-sm font-medium">{t("newsPage.latestUpdates")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              {t('newsPage.title')}&<span className="text-red-500"> {t('newsPage.insights')}</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t("newsPage.fromKonti")}
              </span>
            </h1>
            <p
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
              data-testid="hero-description"
            >
              {t('newsPage.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* News Articles Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">{t('common.news')}</h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Loading State */}
          {isLoadingNews ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#1c2d56]" />
              <span className="ml-3 text-lg text-gray-600">{t("newsPage.loadingArticles")}</span>
            </div>
          ) : (
            <>
              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {newsArticles.slice(0, visibleArticles).map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}

          {/* Load More Button */}
          {visibleArticles < newsArticles.length && (
            <div className="text-center">
              <button
                onClick={loadMoreArticles}
                disabled={isLoading}
                className="inline-flex items-center px-8 py-4 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                data-testid="load-more-button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t("newsPage.loading")}
                  </>
                ) : (
                  <>
                    {t('newsPage.loadMore')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Showing {visibleArticles} of {newsArticles.length} articles
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoadingNews && newsArticles.length === 0 && (
            <div className="text-center py-20">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-4">{t("newsPage.noNewsYet")}</h3>
              <p className="text-gray-500">
                {t("newsPage.checkBackSoon")}
              </p>
            </div>
          )}

          {/* All Articles Shown Message */}
          {!isLoadingNews && newsArticles.length > 0 && visibleArticles >= newsArticles.length && (
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-4">
                {t("newsPage.allArticlesShown")}
              </p>
              <p className="text-sm text-gray-500">
                {t("newsPage.checkBackMore")}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("aboutUs.getInTouchTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {t("productPages.needMoreInfo")} products and {t("productPages.solutions")}? {t("productPages.contactExperts")}.
            </p>
            <Button
              onClick={() => {
                // Store scroll target in sessionStorage
                sessionStorage.setItem("scrollToContact", "true");
                // Navigate to home page
                setLocation("/");
              }}
              className="px-8 py-4 rounded-lg font-semibold text-lg text-white bg-[#1c2d56] hover:bg-[#1c2d56]/90 transition-colors"
              data-testid="contact-button"
            >
              {t("aboutUs.contactUsButton")}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default NewsPage;
