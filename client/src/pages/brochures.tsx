import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

// Brochures data organized by category
const brochureCategories = [
  {
    id: "water-supply",
    title: "Water-supply Systems",
    brochures: [
      {
        title: "PE 80/100",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pe-80-100-en.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
      },
      {
        title: "PE 100 RC",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pe-100-rc-en.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-PE100-RC_EN_2021_compressed.pdf",
      },
      {
        title: "PE FITTINGS FOR BUTT WELDING",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pe-elektrofuzioni-fitinzi.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
      },
      {
        title: "ELECTROFUSION FITTINGS",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pe_fitinzi_za_celno_zavaruvanje.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
      },
    ],
  },
  {
    id: "sewerage",
    title: "Sewerage Systems",
    brochures: [
      {
        title: "KONTI KAN",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-cevki-en.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-cevki-en.pdf",
      },
      {
        title: "KONTI KAN SPIRAL",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral-cevki-en.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral-cevki-en.pdf",
      },
      {
        title: "KONTI KAN FITTINGS",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-fitinzi.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-fitinzi.pdf",
      },
      {
        title: "KONTI KAN PPHM FITTINGS",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-pp-hm-2023-en.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pphm-fitinzi.pdf",
      },
      {
        title: "KONTI KAN PPHM",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-pp-hm-2023-en-1.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-pp-hm-2023-en.pdf",
      },
      {
        title: "PPHM HIGH PERFORMANCE",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pphm-visoki-performansi-en-1.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pphm-visoki-performansi-en.pdf",
      },
      {
        title: "DRAINAGE PIPES",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-drenaza-en-1.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-drenaza-en.pdf",
      },
      {
        title: "POLYPROPYLENE MANHOLES",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/polipropilenski-sahti-en-1.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/polipropilenski-sahti-en.pdf",
      },
    ],
  },
  {
    id: "gas",
    title: "Gas Systems",
    brochures: [
      {
        title: "GAS PIPES",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/priroden-gas-en.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/priroden-gas-en.pdf",
      },
      {
        title: "PETROL GAS",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/petrol-gas-en.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/petrol-gas-en.pdf",
      },
    ],
  },
  {
    id: "cable-protection",
    title: "Cable Protection",
    brochures: [
      {
        title: "KONTI KAN DUCT",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-dakt-en.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/konti-kan-dakt-en.pdf",
      },
    ],
  },
];

function BrochuresPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("water-supply");
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const nextTab = () => {
    const nextIndex =
      activeTabIndex === brochureCategories.length - 1 ? 0 : activeTabIndex + 1;
    setActiveTabIndex(nextIndex);
    setActiveTab(brochureCategories[nextIndex].id);
  };

  const prevTab = () => {
    const prevIndex =
      activeTabIndex === 0 ? brochureCategories.length - 1 : activeTabIndex - 1;
    setActiveTabIndex(prevIndex);
    setActiveTab(brochureCategories[prevIndex].id);
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
            <p
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
              data-testid="hero-description"
            >
              Download comprehensive product documentation, technical
              specifications, and catalogs for all our pipe and fitting
              solutions.
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
                Product Brochures
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Category Tab Slider - matching other product pages design */}
          <div className="flex items-center justify-center mb-12">
            <button
              onClick={prevTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors mr-4"
              data-testid="category-tab-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-4 min-w-[300px] text-center">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-1">
                {brochureCategories[activeTabIndex].title}
              </h3>
              <div className="flex justify-center space-x-1 mt-3">
                {brochureCategories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTabIndex(index);
                      setActiveTab(brochureCategories[index].id);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeTabIndex
                        ? "bg-[#1c2d56]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    data-testid={`category-tab-dot-${index}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors ml-4"
              data-testid="category-tab-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Content */}
          {brochureCategories.map((category) => (
            <div
              key={category.id}
              className={`${activeTab === category.id ? "block" : "hidden"} transition-all duration-500`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {category.brochures.map((brochure, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                    data-testid={`brochure-${category.id}-${index}`}
                  >
                    <div className="aspect-[3/4] bg-gray-100">
                      <img
                        src={brochure.image}
                        alt={brochure.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-[#1c2d56] mb-4 line-clamp-2 text-[15px]">
                        {brochure.title}
                      </h3>
                      <a
                        href={brochure.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center w-full justify-center px-4 py-2 bg-[#1c2d56] text-white rounded-lg hover:bg-[#1c2d56]/90 transition-colors"
                        data-testid={`download-${category.id}-${index}`}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Contact Section */}
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
              Need more information about our products and solutions? Contact
              our team of experts.
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
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default BrochuresPage;
