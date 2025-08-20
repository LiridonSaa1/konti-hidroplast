import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";

const newsArticles = [
  {
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/HDPE-plastic-pipes-installed-in-Dutch-flood-protection-systems-as-a-climate-resilience-solution.-min.png",
    category: "News",
    title: "Innovations in Pipe Inspection and Maintenance Technologies",
    excerpt: "Latest advancements in pipeline maintenance technologies...",
    link: "https://konti-hidroplast.com.mk/innovations-in-pipe-inspection-and-maintenance-technologies/",
  },
  {
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/07/konti-novost.jpg",
    category: "News",
    title: "Konti Hidroplast Donated €100,000 to Hospital in Gevgelija",
    excerpt: "Supporting our community with significant healthcare...",
    link: "https://konti-hidroplast.com.mk/konti-hidroplast-donated-e100000-to-the-public-general-hospital-in-gevgelija/",
  },
  {
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/EPD-%E2%80%93-Environmental-Product-Declaration.jpg",
    category: "News",
    title: "EPD – Environmental Product Declaration",
    excerpt: "Our commitment to environmental transparency and...",
    link: "https://konti-hidroplast.com.mk/epd-environmental-product-declaration/",
  },
];

export function NewsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { t } = useLanguage();

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                hasIntersected ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              data-testid={`news-card-${index}`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <div className="text-sm text-konti-blue font-medium mb-2">
                  {t('news.title')}
                </div>
                <h3 className="text-xl font-semibold text-konti-gray mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1c2d56] hover:bg-[#1c2d56]/90 inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: "#1c2d56" }}
                  data-testid={`news-read-more-${index}`}
                >
                  <span>{t('news.readMore')}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://konti-hidroplast.com.mk/news/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "#1c2d56" }}
            data-testid="view-all-news"
          >
            <span>{t('news.viewAll')}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
