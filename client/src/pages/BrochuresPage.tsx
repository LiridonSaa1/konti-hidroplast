import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Download, ChevronLeft, ChevronRight, FileText, Image as ImageIcon } from "lucide-react";
import type { Brochure, BrochureCategory } from "@shared/schema";

function BrochuresPage() {
  const { t, language } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("water-supply");
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Fetch brochures from API
  const { data: brochures = [], isLoading: brochuresLoading } = useQuery<Brochure[]>({
    queryKey: ['/api/admin/brochures'],
  });

  // Fetch brochure categories from API
  const { data: categories = [] } = useQuery<BrochureCategory[]>({
    queryKey: ['/api/admin/brochure-categories'],
  });

  // Helper function to get translated text
  const getTranslatedText = (item: any, field: string, fallback: string = '') => {
    // For brochure categories (use 'translations' field)
    if (item.translations && item.translations[language] && item.translations[language][field]) {
      return item.translations[language][field];
    }
    // For brochures (use 'translationMetadata' field)
    const translations = item.translationMetadata;
    if (translations && translations[language] && translations[language][field]) {
      return translations[language][field];
    }
    // Fallback to the base field value
    return item[field] || fallback;
  };

  // Group brochures by category - show all active brochures, not filtered by language
  const groupedBrochures = categories.map(category => {
    const categoryBrochures = brochures
      .filter(brochure => 
        brochure.category === category.title && 
        brochure.active
      )
      // Group by translationGroup to avoid duplicates, keep only one per group
      .reduce((acc, brochure) => {
        const groupId = brochure.translationGroup || brochure.id;
        if (!acc.find(b => (b.translationGroup || b.id) === groupId)) {
          acc.push(brochure);
        }
        return acc;
      }, [] as typeof brochures)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    return {
      id: category.title.toLowerCase().replace(/\s+/g, '-'),
      title: getTranslatedText(category, 'title', category.title) || category.title,
      brochures: categoryBrochures
    };
  }).filter(category => category.brochures.length > 0);

  const nextTab = () => {
    const nextIndex = activeTabIndex === groupedBrochures.length - 1 ? 0 : activeTabIndex + 1;
    setActiveTabIndex(nextIndex);
    setActiveTab(groupedBrochures[nextIndex]?.id || "");
  };

  const prevTab = () => {
    const prevIndex = activeTabIndex === 0 ? groupedBrochures.length - 1 : activeTabIndex - 1;
    setActiveTabIndex(prevIndex);
    setActiveTab(groupedBrochures[prevIndex]?.id || "");
  };

  // Update active tab when language changes
  useEffect(() => {
    if (groupedBrochures.length > 0) {
      const currentCategory = groupedBrochures.find(cat => cat.id === activeTab);
      if (!currentCategory) {
        setActiveTab(groupedBrochures[0].id);
        setActiveTabIndex(0);
      } else {
        const newIndex = groupedBrochures.findIndex(cat => cat.id === activeTab);
        setActiveTabIndex(newIndex >= 0 ? newIndex : 0);
      }
    }
  }, [language, groupedBrochures, activeTab]);

  useEffect(() => {
    // Set page title
    document.title = `Brochures - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Download comprehensive product brochures for Konti Hidroplast's water supply systems, sewerage systems, gas pipes, and cable protection solutions.",
      );
    }
  }, []);

  if (brochuresLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
              <span className="text-sm font-medium">PRODUCT DOCUMENTATION</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              PRODUCT<span className="text-red-500"> BROCHURES</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                & CATALOGS
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Download comprehensive product documentation, technical specifications, and catalogs for all our pipe and fitting solutions.
            </p>
            
            {/* Language indicator */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm">Current Language:</span>
              <span className="font-medium">
                {language === 'en' ? '🇺🇸 English' : 
                 language === 'mk' ? '🇲🇰 Macedonian' : 
                 language === 'de' ? '🇩🇪 German' : language}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Brochures Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Product Brochures
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            
            {groupedBrochures.length === 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <p className="text-blue-800 font-medium">No brochures available for {language === 'mk' ? 'Macedonian' : language === 'de' ? 'German' : 'English'}</p>
                <p className="text-blue-600 text-sm mt-2">
                  Switch languages or check back later for updated content.
                </p>
              </div>
            )}
          </div>

          {groupedBrochures.length > 0 && (
            <>
              {/* Category Tab Slider - EPD Style */}
              <div className="flex items-center justify-center mb-12">
                <button
                  onClick={prevTab}
                  className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors mr-4"
                  disabled={groupedBrochures.length <= 1}
                  data-testid="tab-prev"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-4 min-w-[300px] text-center">
                  <h3 className="text-xl font-bold text-[#1c2d56] mb-1">
                    {groupedBrochures[activeTabIndex]?.title || "Category"}
                  </h3>
                  <div className="flex justify-center space-x-1 mt-3">
                    {groupedBrochures.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveTabIndex(index);
                          setActiveTab(groupedBrochures[index].id);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === activeTabIndex
                            ? "bg-[#1c2d56]"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        data-testid={`tab-dot-${index}`}
                      />
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={nextTab}
                  className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors ml-4"
                  disabled={groupedBrochures.length <= 1}
                  data-testid="tab-next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Brochures Grid - Exact Certificates Style */}
              {groupedBrochures[activeTabIndex] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedBrochures[activeTabIndex].brochures.map((brochure) => (
                    <div
                      key={brochure.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                      data-testid={`brochure-${brochure.id}`}
                    >
                      <div className="aspect-[3/4] bg-gray-100">
                        {brochure.imageUrl ? (
                          <img
                            src={brochure.imageUrl}
                            alt={getTranslatedText(brochure, 'name', brochure.title || brochure.name)}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-20 w-20 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-[#1c2d56] mb-3 line-clamp-2 min-h-[2.5rem]">
                          {getTranslatedText(brochure, 'name', brochure.title || brochure.name)}
                        </h3>
                        {getTranslatedText(brochure, 'description', brochure.description) && (
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {getTranslatedText(brochure, 'description', brochure.description)}
                          </p>
                        )}
                        {brochure.pdfUrl ? (
                          <a
                            href={brochure.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center w-full justify-center px-3 py-2 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white text-sm rounded-lg transition-colors"
                            data-testid={`download-${brochure.id}`}
                          >
                            <Download className="w-3 h-3 mr-2" />
                            Download
                          </a>
                        ) : (
                          <div className="inline-flex items-center w-full justify-center px-3 py-2 bg-gray-300 text-gray-500 text-sm rounded-lg cursor-not-allowed">
                            <Download className="w-3 h-3 mr-2" />
                            No PDF Available
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Total count */}
              <div className="text-center mt-12">
                <p className="text-gray-600">
                  Showing {groupedBrochures[activeTabIndex]?.brochures.length || 0} brochures 
                  {groupedBrochures.length > 1 && ` in ${groupedBrochures[activeTabIndex]?.title || 'this category'}`}
                  {' '}for{' '}
                  {language === 'en' ? 'English' : language === 'mk' ? 'Macedonian' : language === 'de' ? 'German' : language}
                </p>
              </div>
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default BrochuresPage;