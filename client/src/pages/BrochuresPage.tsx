import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, ChevronLeft, ChevronRight, FileText, Image as ImageIcon } from "lucide-react";
import type { Brochure, BrochureCategory } from "@shared/schema";

function BrochuresPage() {
  const { t, language } = useLanguage();
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

  // Group brochures by category and filter by current language
  const groupedBrochures = categories.map(category => {
    const categoryBrochures = brochures
      .filter(brochure => 
        brochure.category === category.title && 
        brochure.language === language && 
        brochure.active
      )
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

    return {
      id: category.title.toLowerCase().replace(/\s+/g, '-'),
      title: category.title,
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
    document.title = "Brochures - Konti Hidroplast";

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
              {/* Category Tab Slider */}
              <div className="flex items-center justify-center mb-12">
                <button
                  onClick={prevTab}
                  className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors mr-4"
                  disabled={groupedBrochures.length <= 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 border border-white/50">
                  <h3 className="text-xl font-semibold text-[#1c2d56]">
                    {groupedBrochures[activeTabIndex]?.title || "Category"}
                  </h3>
                </div>
                
                <button
                  onClick={nextTab}
                  className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors ml-4"
                  disabled={groupedBrochures.length <= 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Category dots indicator */}
              <div className="flex justify-center space-x-2 mb-12">
                {groupedBrochures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTabIndex(index);
                      setActiveTab(groupedBrochures[index].id);
                    }}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      index === activeTabIndex
                        ? "bg-[#1c2d56]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Brochures Grid */}
              {groupedBrochures[activeTabIndex] && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {groupedBrochures[activeTabIndex].brochures.map((brochure) => (
                    <div
                      key={brochure.id}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
                        {brochure.imageUrl ? (
                          <img
                            src={brochure.imageUrl}
                            alt={brochure.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ImageIcon className="h-16 w-16 text-blue-300" />
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Language indicator */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                            {language === 'en' ? '🇺🇸' : language === 'mk' ? '🇲🇰' : language === 'de' ? '🇩🇪' : '🌐'}
                            {' '}
                            {language === 'en' ? 'EN' : language === 'mk' ? 'MK' : language === 'de' ? 'DE' : language}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1c2d56] transition-colors">
                          {brochure.title}
                        </h3>
                        
                        {brochure.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {brochure.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Category: {brochure.category}
                          </div>
                          
                          <a
                            href={brochure.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-[#1c2d56] text-white px-4 py-2 rounded-full hover:bg-[#1c2d56]/90 transition-all duration-300 group-hover:shadow-lg text-sm font-medium"
                            data-testid={`download-${brochure.id}`}
                          >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </a>
                        </div>
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