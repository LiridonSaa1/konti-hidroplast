import { useEffect } from "react";
import { useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, User, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "wouter";

// News articles data - this should match the data in news.tsx
const newsArticles = [
  {
    id: 1,
    title: "Innovations in Pipe Inspection and Maintenance Technologies",
    excerpt: "The infrastructure of tomorrow demands materials that are sustainable, efficient, and built for longevity.",
    image: "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/HDPE-plastic-pipes-installed-in-Dutch-flood-protection-systems-as-a-climate-resilience-solution.-min.png",
    date: "2025-06-15",
    author: "Konti Team",
    category: "Technology",
    slug: "innovations-in-pipe-inspection-and-maintenance-technologies",
    content: {
      introduction: `Pipeline infrastructure demands advanced inspection technology to ensure sustainable, reliable, and efficient operations. Modern pipeline inspection technology has revolutionized how we monitor, maintain, and optimize pipeline systems across various industries.
      
The infrastructure of tomorrow demands materials and inspection methods that are sustainable, efficient, and built for longevity. As pipeline networks become increasingly complex and extensive, the need for sophisticated inspection technologies has never been more critical.`,
      
      sections: [
        {
          title: "Why Pipeline Inspection Is Essential for Safety",
          content: `Pipeline inspection is the foundation of infrastructure safety management. Without proper inspection protocols, even the most advanced pipeline systems can fail catastrophically, leading to environmental damage, safety hazards, and significant economic losses.

Key benefits of regular inspection:`,
          points: [
            "Prevents catastrophic failures before they occur",
            "Identifies corrosion, cracks, and structural weaknesses",
            "Reduces maintenance costs through predictive analytics",
            "Ensures compliance with industry safety standards",
            "Minimizes environmental impact through early detection",
            "Optimizes pipeline performance and extends service life"
          ]
        },
        {
          title: "Technologies Driving Innovation in Pipeline Inspection",
          content: "Modern pipeline inspection leverages cutting-edge technologies to provide unprecedented insights into pipeline condition and performance.",
          subsections: [
            {
              subtitle: "1. Advanced Ultrasonic Systems",
              content: "High-frequency ultrasonic waves penetrate pipeline materials to detect internal defects. These systems provide:",
              points: [
                "Real-time thickness measurements with millimeter precision",
                "Detection of internal corrosion and material degradation",
                "Three-dimensional mapping of pipeline condition"
              ]
            },
            {
              subtitle: "2. Smart Pigging and Inline Technology",
              content: "Intelligent pipeline inspection gauges (smart pigs) travel through pipelines collecting comprehensive data:",
              points: [
                "Magnetic flux leakage detection for metal loss identification",
                "Ultrasonic crack detection capabilities",
                "Geometric measurement for deformation analysis",
                "GPS positioning for precise defect location"
              ]
            },
            {
              subtitle: "3. Artificial Intelligence & Machine Learning",
              content: "AI-powered analysis transforms raw inspection data into actionable insights:",
              points: [
                "Pattern recognition for predictive failure analysis",
                "Automated defect classification and severity assessment",
                "Optimization of inspection schedules based on risk analysis"
              ]
            }
          ]
        },
        {
          title: "Overcoming Key Challenges in Pipeline Inspection",
          content: `While technology advances rapidly, several challenges remain in pipeline inspection:

**Access and Accessibility**
Many pipeline segments are located in remote or difficult-to-reach areas, requiring specialized equipment and techniques for effective inspection.

**Data Integration**
Combining data from multiple inspection technologies requires sophisticated software platforms and standardized protocols.

**Regulatory Compliance**
Meeting evolving regulatory requirements while maintaining operational efficiency demands continuous adaptation of inspection methodologies.`,
          points: []
        }
      ],
      
      conclusion: `The evolution of pipeline inspection technology represents a fundamental shift toward predictive maintenance and risk-based asset management. By embracing these innovations, pipeline operators can achieve unprecedented levels of safety, efficiency, and environmental protection.

Key takeaways from inspection innovation:`,
      
      conclusionPoints: [
        "Technology integration improves inspection accuracy",
        "Predictive analytics reduce operational costs",
        "Advanced monitoring enhances safety outcomes",
        "Sustainable practices ensure long-term viability"
      ]
    }
  }
];

function NewsArticlePage() {
  const { slug } = useParams();
  const { t } = useLanguage();

  const article = newsArticles.find(article => article.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Konti Hidroplast`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", article.excerpt);
      }
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <Link href="/news">
              <a className="text-[#1c2d56] hover:underline">← Back to News</a>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Article Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news">
            <a className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </a>
          </Link>
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full mb-4">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-gray-300">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(article.date)}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {article.author}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Introduction Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1c2d56] mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Pipeline infrastructure demands advanced inspection technology to ensure sustainable, reliable, and efficient operations. Modern pipeline inspection technology has revolutionized how we monitor, maintain, and optimize pipeline systems.
              </p>
            </div>
            <div className="order-first md:order-last">
              <img 
                src={article.image}
                alt="Pipeline inspection technology"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            {article.content.introduction}
          </p>
        </div>

        {/* Main Content Sections */}
        {article.content.sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#1c2d56] mb-6">{section.title}</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              {section.content}
            </p>

            {section.points && section.points.length > 0 && (
              <ul className="space-y-3 mb-6">
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Subsections for Technologies section */}
            {section.subsections && section.subsections.map((subsection, subIndex) => (
              <div key={subIndex} className="ml-4 mb-6">
                <h3 className="text-lg font-semibold text-[#1c2d56] mb-3">{subsection.subtitle}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{subsection.content}</p>
                {subsection.points && (
                  <ul className="space-y-2 ml-4">
                    {subsection.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-[#1c2d56] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Conclusion */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-[#1c2d56] mb-6">Conclusion</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {article.content.conclusion}
          </p>
          
          <ul className="space-y-3">
            {article.content.conclusionPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Back to News */}
        <div className="text-center mt-12">
          <Link href="/news">
            <a className="inline-flex items-center px-6 py-3 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white font-medium rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All News
            </a>
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}

export default NewsArticlePage;