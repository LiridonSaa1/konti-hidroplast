import { useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, User, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import type { NewsArticle } from "@shared/schema";

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

function NewsArticlePage() {
  const { t } = useLanguage();
  const { slug } = useParams(); // This will be the article ID
  
  // Fetch the specific article
  const { data: article, isLoading, error } = useQuery<NewsArticle>({
    queryKey: ["/api/news", slug],
    enabled: !!slug
  });

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Konti Hidroplast`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          article.description || `${article.title} - Latest news from Konti Hidroplast`
        );
      }
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center py-20 mt-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#1c2d56]" />
          <span className="ml-3 text-lg text-gray-600">Loading article...</span>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for could not be found.</p>
            <Link href="/news" className="inline-flex items-center px-6 py-3 bg-[#1c2d56] text-white rounded-lg hover:bg-[#1c2d56]/90 transition-colors">
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
          <Link href="/news" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to News
          </Link>
          
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full">
              NEWS ARTICLE
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          {article.description && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {article.description}
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Image */}
          {article.imageUrl && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.sections && Array.isArray(article.sections) && article.sections.length > 0 ? (
              article.sections.map((section: any, index: number) => (
                <div key={index} className="mb-8">
                  {section.subtitle && (
                    <h2 className="text-2xl font-bold text-[#1c2d56] mb-4">{section.subtitle}</h2>
                  )}
                  {section.content && (
                    <div className="text-gray-700 leading-relaxed mb-4" 
                         dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br>') }} 
                    />
                  )}
                  {section.imageUrl && (
                    <div className="mb-6">
                      <img
                        src={section.imageUrl}
                        alt={section.subtitle || `Section ${index + 1}`}
                        className="w-full rounded-lg shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-700 leading-relaxed">
                <p>This article is currently being updated with more detailed content. Please check back soon for the full article.</p>
              </div>
            )}
          </div>

          {/* Back to News */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/news" className="inline-flex items-center px-6 py-3 bg-[#1c2d56] text-white rounded-lg hover:bg-[#1c2d56]/90 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to All News
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NewsArticlePage;