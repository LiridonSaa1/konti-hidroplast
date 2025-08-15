import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download } from "lucide-react";

// Brochures data organized by category
const brochureCategories = [
  {
    id: "water-supply",
    title: "Water-supply Systems",
    brochures: [
      {
        title: "PE 80/100",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pe-80-100-en.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf"
      },
      {
        title: "PE 100 RC",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pe-100-rc-en.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-PE100-RC_EN_2021_compressed.pdf"
      },
      {
        title: "PE FITTINGS FOR BUTT WELDING",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pe-elektrofuzioni-fitinzi.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf"
      },
      {
        title: "ELECTROFUSION FITTINGS",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pe_fitinzi_za_celno_zavaruvanje.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf"
      }
    ]
  },
  {
    id: "sewerage",
    title: "Sewerage Systems",
    brochures: [
      {
        title: "KONTI KAN",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-cevki-en.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-cevki-en.pdf"
      },
      {
        title: "KONTI KAN SPIRAL",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral-cevki-en.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral-cevki-en.pdf"
      },
      {
        title: "KONTI KAN FITTINGS",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-fitinzi.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-fitinzi.pdf"
      },
      {
        title: "KONTI KAN PPHM FITTINGS",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-pp-hm-2023-en.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pphm-fitinzi.pdf"
      },
      {
        title: "KONTI KAN PPHM",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-pp-hm-2023-en-1.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-pp-hm-2023-en.pdf"
      },
      {
        title: "PPHM HIGH PERFORMANCE",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pphm-visoki-performansi-en-1.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Sewerage-Pipes_EN_2021_compressed.pdf"
      },
      {
        title: "DRAINAGE PIPES",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-drenaza-en-1.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Sewerage-Pipes_EN_2021_compressed.pdf"
      },
      {
        title: "POLYPROPYLENE MANHOLES",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/polipropilenski-sahti-en-1.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Sewerage-Pipes_EN_2021_compressed.pdf"
      }
    ]
  },
  {
    id: "gas",
    title: "Gas Systems",
    brochures: [
      {
        title: "GAS PIPES",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/priroden-gas-en.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/priroden-gas-en.pdf"
      },
      {
        title: "PETROL GAS",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/petrol-gas-en.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/petrol-gas-en.pdf"
      }
    ]
  },
  {
    id: "cable-protection",
    title: "Cable Protection",
    brochures: [
      {
        title: "KONTI KAN DUCT",
        image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-dakt-en.jpg",
        downloadUrl: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/konti-kan-dakt-en.pdf"
      }
    ]
  }
];

function BrochuresPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("water-supply");

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
                PRODUCT DOCUMENTATION
              </span>
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
              Download comprehensive product documentation, technical specifications, and catalogs for all our pipe and fitting solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Brochures Section */}
      <section className="py-20 bg-white">
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

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap bg-gray-100 rounded-xl p-1">
              {brochureCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === category.id
                      ? "bg-[#1c2d56] text-white shadow-lg"
                      : "text-gray-600 hover:text-[#1c2d56]"
                  }`}
                  data-testid={`tab-${category.id}`}
                >
                  {category.title}
                </button>
              ))}
            </div>
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
                      <h3 className="text-lg font-semibold text-[#1c2d56] mb-4 line-clamp-2">
                        {brochure.title}
                      </h3>
                      <a
                        href={brochure.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center w-full justify-center px-4 py-2 bg-[#1c2d56] text-white rounded-lg hover:bg-blue-900 transition-colors"
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
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Need Additional Information?
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Can't find what you're looking for? Contact our technical team for custom documentation and support.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#1c2d56] text-white rounded-lg hover:bg-blue-900 transition-colors text-lg font-semibold"
              data-testid="contact-button"
            >
              Contact Technical Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BrochuresPage;