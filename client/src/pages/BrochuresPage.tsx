import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BrochureDownloadForm } from "@/components/BrochureDownloadForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Download, ChevronLeft, ChevronRight, FileText, Image as ImageIcon, X } from "lucide-react";
import type { Brochure, BrochureCategory } from "@shared/schema";

function BrochuresPage() {
  const { t, language } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("water-supply");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [brochureModal, setBrochureModal] = useState<{
    isOpen: boolean;
    brochure: {
      id: string;
      name: string;
      category: string;
      pdfUrl: string;
    } | null;
  }>({
    isOpen: false,
    brochure: null,
  });

  // Fetch brochures from API
  const { data: brochures = [], isLoading: brochuresLoading } = useQuery<Brochure[]>({
    queryKey: ['/api/admin/brochures'],
  });

  // Debug: Log brochures data
  useEffect(() => {
    console.log('Brochures loaded:', brochures);
    console.log('Brochures loading:', brochuresLoading);
  }, [brochures, brochuresLoading]);

  // Auto-open modal when coming from products dropdown
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromProducts = urlParams.get('from') === 'products';
    
    if (fromProducts && brochures.length > 0 && !brochuresLoading) {
      // Get the first brochure (since there will only be one)
      const brochure = brochures[0];
      
      if (brochure) {
        setBrochureModal({
          isOpen: true,
          brochure: {
            id: brochure.id || 'main-brochure',
            name: brochure.name || brochure.title || 'Product Brochure',
            category: 'Products',
            pdfUrl: brochure.pdfUrl || '',
          },
        });
        
        // Clean up the URL parameter
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [brochures, brochuresLoading]);

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
    // For brochures, we need to find the brochure in the correct language
    // Since brochures use translationGroup system, we need to find the matching language version
    if (item.language && item.language !== language) {
      // Find a brochure with the same translationGroup but in the current language
      const relatedBrochure = brochures.find(b => 
        b.translationGroup === item.translationGroup && 
        b.language === language
      );
      if (relatedBrochure) {
        // Use type assertion to access dynamic field
        return (relatedBrochure as any)[field] || fallback;
      }
    }
    // Fallback to the base field value
    return (item as any)[field] || fallback;
  };



  // Group brochures by category - show brochures in the current language when possible
  // Only include categories that are active and have active brochures
  const groupedBrochures = categories
    .filter(category => 
      category.status === 'active' && 
      category.active === true
    )
    .map(category => {
      const categoryBrochures = brochures
        .filter(brochure => 
          brochure.category === category.title && 
          brochure.active
        )
        // Group by translationGroup and prefer the current language
        .reduce((acc, brochure) => {
          const groupId = brochure.translationGroup || brochure.id;
          const existingBrochure = acc.find(b => (b.translationGroup || b.id) === groupId);
          
          if (!existingBrochure) {
            acc.push(brochure);
          } else {
            // If we already have a brochure in this group, prefer the current language
            if (brochure.language === language && existingBrochure.language !== language) {
              // Replace with the brochure in current language
              const index = acc.findIndex(b => (b.translationGroup || b.id) === groupId);
              acc[index] = brochure;
            }
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
  
  // Force refresh of brochures when language changes
  useEffect(() => {
    // This will trigger a re-render with the new language
  }, [language]);

  const handleDownloadClick = (brochure: Brochure, categoryTitle: string) => {
    console.log('Brochure data from API:', brochure);
    console.log('Category title:', categoryTitle);
    
    setBrochureModal({
      isOpen: true,
      brochure: {
        id: brochure.id?.toString() || `${categoryTitle.toLowerCase().replace(/\s+/g, '-')}-${brochure.name?.toLowerCase().replace(/\s+/g, '-')}`,
        name: brochure.name || 'Brochure',
        category: categoryTitle,
        pdfUrl: brochure.pdfUrl || '',
      },
    });
  };

  const handleCloseBrochureModal = () => {
    setBrochureModal({
      isOpen: false,
      brochure: null,
    });
  };


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
               <span className="text-sm font-medium">
                 {language === 'en' ? 'PRODUCT DOCUMENTATION' : 
                  language === 'mk' ? 'ПРОИЗВОДНА ДОКУМЕНТАЦИЈА' : 
                  language === 'de' ? 'PRODUKTDOKUMENTATION' : 'PRODUCT DOCUMENTATION'}
               </span>
             </div>
             <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
               {language === 'en' ? 'PRODUCT' : 
                language === 'mk' ? 'ПРОИЗВОДНИ' : 
                language === 'de' ? 'PRODUKT' : 'PRODUCT'}<span className="text-red-500"> {language === 'en' ? 'BROCHURES' : 
                language === 'mk' ? 'БРОШУРИ' : 
                language === 'de' ? 'BROSCHÜREN' : 'BROCHURES'}</span>
               <br />
               <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                 {language === 'en' ? '& CATALOGS' : 
                  language === 'mk' ? '& КАТАЛОЗИ' : 
                  language === 'de' ? '& KATALOGE' : '& CATALOGS'}
               </span>
             </h1>
             <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
               {language === 'en' ? 'Download comprehensive product documentation, technical specifications, and catalogs for all our pipe and fitting solutions.' : 
                language === 'mk' ? 'Преземете сеопфатна производна документација, технички спецификации и каталози за сите наши цевни и фитинзи решенија.' : 
                language === 'de' ? 'Laden Sie umfassende Produktdokumentation, technische Spezifikationen und Kataloge für alle unsere Rohr- und Fitting-Lösungen herunter.' : 
                'Download comprehensive product documentation, technical specifications, and catalogs for all our pipe and fitting solutions.'}
             </p>
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
                 {language === 'en' ? 'Product Brochures' : 
                  language === 'mk' ? 'Производни Брошури' : 
                  language === 'de' ? 'Produktbroschüren' : 'Product Brochures'}
               </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            
            {groupedBrochures.length === 0 && (
                             <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                 <FileText className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                 <p className="text-blue-800 font-medium">
                   {language === 'en' ? 'No brochures available for English' : 
                    language === 'mk' ? 'Нема достапни брошури за македонски' : 
                    language === 'de' ? 'Keine Broschüren für Deutsch verfügbar' : 'No brochures available'}
                 </p>
                 <p className="text-blue-600 text-sm mt-2">
                   {language === 'en' ? 'Switch languages or check back later for updated content.' : 
                    language === 'mk' ? 'Сменете јазик или проверете подоцна за ажурирана содржина.' : 
                    language === 'de' ? 'Sprache wechseln oder später nach aktualisierten Inhalten suchen.' : 'Switch languages or check back later for updated content.'}
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

                                                                                                                                                                                                                                               {/* Brochures Grid - Responsive Layout */}
                  {groupedBrochures[activeTabIndex] && (
                    <div className={`grid gap-6 ${
                      groupedBrochures[activeTabIndex].brochures.length === 1 
                        ? 'grid-cols-1 max-w-2xl mx-auto' 
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    }`}>
                      {groupedBrochures[activeTabIndex].brochures.map((brochure) => (
                        <div
                          key={`${brochure.id}-${language}`}
                          className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 ${
                            groupedBrochures[activeTabIndex].brochures.length === 1 
                              ? 'w-full max-w-md mx-auto' 
                              : 'w-full max-w-xs'
                          }`}
                          data-testid={`brochure-${brochure.id}`}
                        >
                          <div className={`bg-gray-100 ${
                            groupedBrochures[activeTabIndex].brochures.length === 1 
                              ? 'aspect-[4/5]' 
                              : 'aspect-[3/4]'
                          }`}>
                            {brochure.imageUrl ? (
                              <img
                                src={brochure.imageUrl}
                                alt={getTranslatedText(brochure, 'name', brochure.title || brochure.name)}
                                className="w-full h-full object-fill"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="h-16 w-16 text-gray-300" />
                              </div>
                            )}
                          </div>
                          <div className={`p-4 ${
                            groupedBrochures[activeTabIndex].brochures.length === 1 
                              ? 'text-center' 
                              : ''
                          }`}>
                            <h3 className={`font-semibold text-[#1c2d56] mb-3 ${
                              groupedBrochures[activeTabIndex].brochures.length === 1 
                                ? 'text-lg' 
                                : 'text-xs line-clamp-2 min-h-[1.5rem]'
                            }`}>
                              {getTranslatedText(brochure, 'name', brochure.title || brochure.name)}
                            </h3>
                            {brochure.pdfUrl ? (
                              <button
                                onClick={() => handleDownloadClick(brochure, groupedBrochures[activeTabIndex].title)}
                                className={`inline-flex items-center justify-center px-4 py-2 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white font-medium rounded transition-colors ${
                                  groupedBrochures[activeTabIndex].brochures.length === 1 
                                    ? 'w-full text-base py-3' 
                                    : 'w-full text-xs py-1.5'
                                }`}
                                data-testid={`download-${brochure.id}`}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                {language === 'en' ? 'Download' : 
                                 language === 'mk' ? 'Преземи' : 
                                 language === 'de' ? 'Herunterladen' : 'Download'}
                              </button>
                            ) : (
                              <div className={`inline-flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-500 font-medium rounded cursor-not-allowed ${
                                groupedBrochures[activeTabIndex].brochures.length === 1 
                                  ? 'w-full text-base py-3' 
                                  : 'w-full text-xs py-1.5'
                              }`}>
                                <Download className="w-4 h-4 mr-2" />
                                {language === 'en' ? 'No PDF Available' : 
                                 language === 'mk' ? 'Нема достапен PDF' : 
                                 language === 'de' ? 'Kein PDF verfügbar' : 'No PDF Available'}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              
            </>
          )}
        </div>
      </section>
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

       {/* Brochure Download Modal */}
       {brochureModal.brochure && (
         <BrochureDownloadForm
           isOpen={brochureModal.isOpen}
           onClose={handleCloseBrochureModal}
           brochure={brochureModal.brochure}
         />
       )}

       <Footer />
     </div>
   );
 }

export default BrochuresPage;