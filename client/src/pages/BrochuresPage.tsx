import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
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
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState<Brochure | null>(null);
  const [downloadFormData, setDownloadFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleDownloadClick = (brochure: Brochure) => {
    setSelectedBrochure(brochure);
    setIsDownloadPopupOpen(true);
  };

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrochure || !downloadFormData.fullName || !downloadFormData.companyName || !downloadFormData.email) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Save download data to admin panel
      const response = await fetch('/api/brochure-downloads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brochureId: selectedBrochure.id,
          brochureName: selectedBrochure.name || selectedBrochure.title,
          brochureCategory: selectedBrochure.category,
          fullName: downloadFormData.fullName,
          companyName: downloadFormData.companyName,
          email: downloadFormData.email,
          description: downloadFormData.description,
          downloadDate: new Date().toISOString()
        }),
      });

      if (response.ok) {
        // Show success message and close popup
        alert(language === 'en' ? 'Check your email for the download link!' : 
              language === 'mk' ? 'Проверете ја вашата е-пошта за линкот за преземање!' : 
              language === 'de' ? 'Überprüfen Sie Ihre E-Mail für den Download-Link!' : 'Check your email for the download link!');
        
        // Close popup and reset form
        setIsDownloadPopupOpen(false);
        setSelectedBrochure(null);
        setDownloadFormData({
          fullName: '',
          companyName: '',
          email: '',
          description: ''
        });
      }
    } catch (error) {
      console.error('Error saving download data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setIsDownloadPopupOpen(false);
    setSelectedBrochure(null);
    setDownloadFormData({
      fullName: '',
      companyName: '',
      email: '',
      description: ''
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
                                className="w-full h-full object-cover"
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
                                onClick={() => handleDownloadClick(brochure)}
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

       {/* Download Popup Modal */}
       {isDownloadPopupOpen && selectedBrochure && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
             <div className="flex items-center justify-between p-6 border-b">
               <h3 className="text-lg font-semibold text-[#1c2d56]">
                 {language === 'en' ? 'Download Brochure' : 
                  language === 'mk' ? 'Преземи Брошура' : 
                  language === 'de' ? 'Broschüre herunterladen' : 'Download Brochure'}
               </h3>
               <button
                 onClick={handleClosePopup}
                 className="text-gray-400 hover:text-gray-600 transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <form onSubmit={handleDownloadSubmit} className="p-6 space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   {language === 'en' ? 'Full Name *' : 
                    language === 'mk' ? 'Цело име *' : 
                    language === 'de' ? 'Vollständiger Name *' : 'Full Name *'}
                 </label>
                 <input
                   type="text"
                   required
                   value={downloadFormData.fullName}
                   onChange={(e) => setDownloadFormData(prev => ({ ...prev, fullName: e.target.value }))}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1c2d56] focus:border-[#1c2d56]"
                   placeholder={language === 'en' ? 'Enter your full name' : 
                              language === 'mk' ? 'Внесете го вашето цело име' : 
                              language === 'de' ? 'Geben Sie Ihren vollständigen Namen ein' : 'Enter your full name'}
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   {language === 'en' ? 'Email *' : 
                    language === 'mk' ? 'Е-пошта *' : 
                    language === 'de' ? 'E-Mail *' : 'Email *'}
                 </label>
                 <input
                   type="email"
                   required
                   value={downloadFormData.email}
                   onChange={(e) => setDownloadFormData(prev => ({ ...prev, email: e.target.value }))}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1c2d56] focus:border-[#1c2d56]"
                   placeholder={language === 'en' ? 'Enter email address' : 
                              language === 'mk' ? 'Внесете е-пошта' : 
                              language === 'de' ? 'E-Mail-Adresse eingeben' : 'Enter email address'}
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   {language === 'en' ? 'Company Name *' : 
                    language === 'mk' ? 'Име на компанија *' : 
                    language === 'de' ? 'Firmenname *' : 'Company Name *'}
                 </label>
                 <input
                   type="text"
                   required
                   value={downloadFormData.companyName}
                   onChange={(e) => setDownloadFormData(prev => ({ ...prev, companyName: e.target.value }))}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1c2d56] focus:border-[#1c2d56]"
                   placeholder={language === 'en' ? 'Enter company name' : 
                              language === 'mk' ? 'Внесете име на компанија' : 
                              language === 'de' ? 'Firmenname eingeben' : 'Enter company name'}
                 />
               </div>
               
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   {language === 'en' ? 'Description (Optional)' : 
                    language === 'mk' ? 'Опис (Опционално)' : 
                    language === 'de' ? 'Beschreibung (Optional)' : 'Description (Optional)'}
                 </label>
                 <textarea
                   value={downloadFormData.description}
                   onChange={(e) => setDownloadFormData(prev => ({ ...prev, description: e.target.value }))}
                   rows={3}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1c2d56] focus:border-[#1c2d56] resize-none"
                   placeholder={language === 'en' ? 'Enter description or additional information' : 
                              language === 'mk' ? 'Внесете опис или дополнителни информации' : 
                              language === 'de' ? 'Beschreibung oder zusätzliche Informationen eingeben' : 'Enter description or additional information'}
                 />
               </div>
               
               <div className="flex space-x-3 pt-4">
                 <button
                   type="button"
                   onClick={handleClosePopup}
                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                 >
                   {language === 'en' ? 'Cancel' : 
                    language === 'mk' ? 'Откажи' : 
                    language === 'de' ? 'Abbrechen' : 'Cancel'}
                 </button>
                 <button
                   type="submit"
                   disabled={isSubmitting}
                   className="flex-1 px-4 py-2 bg-[#1c2d56] text-white rounded-md hover:bg-[#1c2d56]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   {isSubmitting ? (
                     <span className="flex items-center justify-center">
                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                       {language === 'en' ? 'Submitting...' : 
                        language === 'mk' ? 'Се праќа...' : 
                        language === 'de' ? 'Wird gesendet...' : 'Submitting...'}
                     </span>
                   ) : (
                     language === 'en' ? 'Download PDF' : 
                     language === 'mk' ? 'Преземи PDF' : 
                     language === 'de' ? 'PDF herunterladen' : 'Download PDF'
                   )}
                 </button>
               </div>
             </form>
           </div>
         </div>
       )}

       <Footer />
     </div>
   );
 }

export default BrochuresPage;