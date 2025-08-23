import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { NewsArticle } from "@shared/schema";

export function NewsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { t } = useLanguage();

  // Fetch news articles from the database
  const { data: newsArticles = [], isLoading, error } = useQuery<NewsArticle[]>({
    queryKey: ['/api/news'],
    enabled: true,
  });

  return (
    <section
      id="news"
      ref={ref}
      className="py-20 bg-white"
      data-testid="news-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            hasIntersected ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-20 h-0.5 mr-4"
              style={{ backgroundColor: "#eb2127" }}
            ></div>
            <h2
              className="text-4xl font-bold text-konti-gray"
              data-testid="news-title"
            >
              {t('news.title')}
            </h2>
            <div
              className="w-20 h-0.5 ml-4"
              style={{ backgroundColor: "#eb2127" }}
            ></div>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-8">
            <p className="text-gray-600">{t('news.errorLoading')}</p>
          </div>
        )}

        {/* News articles */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsArticles.slice(0, 3).map((article, index) => (
              <Card
                key={article.id}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  hasIntersected ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                data-testid={`news-card-${index}`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.imageUrl || '/placeholder-news.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-news.jpg';
                    }}
                  />
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-konti-blue font-medium mb-2">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : t('news.title')}
                  </div>
                  <h3 className="text-xl font-semibold text-konti-gray mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description || article.subtitle || t('news.noDescription')}
                  </p>
                  <Link
                    href={`/news/${article.id}`}
                    className="bg-[#1c2d56] hover:bg-[#1c2d56]/90 inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: "#1c2d56" }}
                    data-testid={`news-read-more-${index}`}
                  >
                    <span>{t('news.readMore')}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No articles message */}
        {!isLoading && !error && newsArticles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">{t('news.noArticles')}</p>
          </div>
        )}

        {!isLoading && !error && newsArticles.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center px-8 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: "#1c2d56" }}
              data-testid="view-all-news"
            >
              <span>{t('news.viewAll')}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
