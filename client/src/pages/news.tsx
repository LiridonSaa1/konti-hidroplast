import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// News articles data from the website
const newsArticles = [
  {
    id: 1,
    title: "Innovations in Pipe Inspection and Maintenance Technologies",
    excerpt:
      "The infrastructure of tomorrow demands materials that are sustainable, efficient, and built for longevity.",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/HDPE-plastic-pipes-installed-in-Dutch-flood-protection-systems-as-a-climate-resilience-solution.-min.png",
    date: "2025-06-15",
    author: "Konti Team",
    category: "Technology",
    slug: "innovations-in-pipe-inspection-and-maintenance-technologies",
    url: "https://konti-hidroplast.com.mk/innovations-in-pipe-inspection-and-maintenance-technologies/",
  },
  {
    id: 2,
    title:
      "Konti Hidroplast Donated €100,000 to the Public General Hospital in Gevgelija",
    excerpt:
      "The Public General Hospital with expanded services in Gevgelija received a donation of €100,000",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/07/konti-novost.jpg",
    date: "2025-07-10",
    author: "Konti Team",
    category: "Corporate Social Responsibility",
    slug: "konti-hidroplast-donated-e100000-to-the-public-general-hospital-in-gevgelija",
    url: "https://konti-hidroplast.com.mk/konti-hidroplast-donated-e100000-to-the-public-general-hospital-in-gevgelija/",
  },
  {
    id: 3,
    title: "EPD – Environmental Product Declaration",
    excerpt:
      "Sustainability and environmental responsibility are key values in our company's operations and development.",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/EPD-%E2%80%93-Environmental-Product-Declaration.jpg",
    date: "2025-06-20",
    author: "Konti Team",
    category: "Sustainability",
    slug: "epd-environmental-product-declaration",
    url: "https://konti-hidroplast.com.mk/epd-environmental-product-declaration/",
  },
  {
    id: 4,
    title: "Industry Associations Plastic Pipe: Driving Standards & Innovation",
    excerpt:
      "Leading industry associations plastic pipe play a pivotal role in ensuring safe, efficient infrastructure.",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/HDPE-plastic-pipes-installed-in-Dutch-flood-protection-systems-as-a-climate-resilience-solution.-min.png",
    date: "2025-06-10",
    author: "Konti Team",
    category: "Industry",
    slug: "industry-associations-plastic-pipe-driving-standards-innovation",
    url: "https://konti-hidroplast.com.mk/industry-associations-plastic-pipe-driving-standards-innovation/",
  },
  {
    id: 5,
    title: "Maintaining Healthy Pipe Systems: Essential Plumbing Tips",
    excerpt:
      "Proactive maintaining healthy pipe systems in your home isn't just about convenience-it's about safety and efficiency.",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/comparison-of-corroded-and-healthy-copper-pipes-min.png",
    date: "2025-06-05",
    author: "Konti Team",
    category: "Maintenance",
    slug: "maintaining-healthy-pipe-sustems-essential-plumbing-tips",
    url: "https://konti-hidroplast.com.mk/maintaining-healthy-pipe-sustems-essential-plumbing-tips/",
  },
  {
    id: 6,
    title: "Industrial Piping Systems: What You Need to Know",
    excerpt:
      "In Scandinavian manufacturing, industrial piping systems form the backbone of essential utilities—handling water, gas, and more.",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/05/plastic-pipes-industrial-pipe-network-min.png",
    date: "2025-05-25",
    author: "Konti Team",
    category: "Industrial",
    slug: "industrial-piping-systems-what-you-need-to-know",
    url: "https://konti-hidroplast.com.mk/industrial-piping-systems-what-you-need-to-know/",
  },
  {
    id: 7,
    title: "Advanced PE Pipe Manufacturing Techniques",
    excerpt:
      "Explore the latest manufacturing techniques that make our PE pipes the most reliable in the industry.",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/HDPE-plastic-pipes-installed-in-Dutch-flood-protection-systems-as-a-climate-resilience-solution.-min.png",
    date: "2025-05-15",
    author: "Konti Team",
    category: "Manufacturing",
    slug: "advanced-pe-pipe-manufacturing-techniques",
    url: "#",
  },
  {
    id: 8,
    title: "Water Quality Standards and PE Pipe Compliance",
    excerpt:
      "Understanding how our PE pipes meet and exceed international water quality standards for safe drinking water systems.",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/comparison-of-corroded-and-healthy-copper-pipes-min.png",
    date: "2025-05-10",
    author: "Konti Team",
    category: "Standards",
    slug: "water-quality-standards-and-pe-pipe-compliance",
    url: "#",
  },
  {
    id: 9,
    title: "Sustainable Infrastructure Development with HDPE",
    excerpt:
      "How HDPE pipes contribute to sustainable infrastructure development and environmental protection initiatives.",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2025/05/plastic-pipes-industrial-pipe-network-min.png",
    date: "2025-05-01",
    author: "Konti Team",
    category: "Sustainability",
    slug: "sustainable-infrastructure-development-with-hdpe",
    url: "#",
  },
];

function NewsPage() {
  const { t } = useLanguage();
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = "News & Updates - Konti Hidroplast";

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const NewsCard = ({ article }: { article: (typeof newsArticles)[0] }) => (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-200"
      data-testid={`news-card-${article.id}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            News
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#1c2d56] mb-3 leading-tight">
          {truncateText(article.title, 56)}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
        <a
          href={article.url}
          target={article.url.startsWith("http") ? "_blank" : "_self"}
          rel={article.url.startsWith("http") ? "noopener noreferrer" : ""}
          className="inline-flex items-center px-4 py-2 bg-[#1c2d56] text-white text-sm font-medium rounded hover:bg-blue-900 transition-colors"
          data-testid={`read-more-${article.id}`}
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-2" />
        </a>
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
              <span className="text-sm font-medium">LATEST UPDATES</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              NEWS &<span className="text-red-500"> INSIGHTS</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                FROM KONTI
              </span>
            </h1>
            <p
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
              data-testid="hero-description"
            >
              Stay informed with the latest industry developments, company
              updates, technological innovations, and expert insights from the
              world of pipe manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* News Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">News</h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the latest developments, innovations, and insights from
              Konti Hidroplast and the pipe manufacturing industry.
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {newsArticles.slice(0, visibleArticles).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          {/* Load More Button */}
          {visibleArticles < newsArticles.length && (
            <div className="text-center">
              <button
                onClick={loadMoreArticles}
                disabled={isLoading}
                className="inline-flex items-center px-8 py-4 bg-[#1c2d56] text-white rounded-lg hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                data-testid="load-more-button"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Articles
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Showing {visibleArticles} of {newsArticles.length} articles
              </p>
            </div>
          )}

          {visibleArticles >= newsArticles.length && (
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-4">
                You've seen all our latest news articles!
              </p>
              <p className="text-sm text-gray-500">
                Check back soon for more updates and insights.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Get in Touch: Connect with Us Today!
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Need more information about our cable protection solutions?
              Contact our team of experts.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#1c2d56] text-white rounded-lg hover:bg-blue-900 transition-colors text-lg font-semibold"
              data-testid="contact-button"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default NewsPage;
