import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronDown, Download, Play, Check } from "lucide-react";

// PP ML COMPACT PIPE translation helper function
const translatePpMlCompactText = (text: string, t: any) => {
  const translations: { [key: string]: string } = {
    // Page titles and headers
    "PP ML COMPACT PIPE": t("ppMlCompact.ppMlCompactPipe"),
    "PP ML": t("ppMlCompact.ppMl"),
    "COMPACT": t("ppMlCompact.compact"),
    "PIPE": t("ppMlCompact.pipe"),
    
    // Descriptions
    "PP ML (Polypropylene Multi-Layer) solid pipes are designed specifically for sewage and drainage systems, offering a combination of durability, efficiency, and environmental sustainability.": t("ppMlCompact.heroDescription"),
    "PP ML compact pipe is made of high module polypropylene (PP-HM) as its basic material, with three layers. Each of the three layers has a different modified formula of the basic material, which gives specific performances in the entire quality of the pipe.": t("ppMlCompact.mainDescription"),
    "Production standard: EN 13476-2:2007 (Type А1) and ONR 201513:2011": t("ppMlCompact.productionStandard"),
    "PP ML (Three-Layer) solid pipes provide a robust, efficient, and eco-friendly solution for modern sewage systems. Their combination of structural strength, hydraulic performance, and chemical resistance makes them ideal for both municipal and industrial wastewater applications.": t("ppMlCompact.tripleLayerDescription"),
    
    // Features and specifications
    "Available in different classes: SN 8, SN 10, SN 12, SN 16 KN/m²": t("ppMlCompact.availableClasses"),
    "Dimension range: DN/OD 160-500mm": t("ppMlCompact.dimensions"),
    "Color: Outer orange-brown/middle black and inner light color": t("ppMlCompact.color"),
    "Triple-layered construction for enhanced performance": t("ppMlCompact.tripleLayered"),
    "Manning's coefficient typically around 0.009": t("ppMlCompact.manningsCoefficient"),
    "50+ years expected service life": t("ppMlCompact.serviceLife"),
    "Manning's coefficient typically around 0.009, reducing clogging": t("ppMlCompact.manningsCoefficient"),
    "Expected service life exceeds 50 years under normal conditions": t("ppMlCompact.serviceLife"),
    "Suitable for above-ground and exposed installations with UV-stabilized outer layers": t("ppMlCompact.aboveGroundSuitable"),
    "Can operate between -20°C and +90°C": t("ppMlCompact.temperatureRange"),
    "Fully recyclable material and energy-efficient production": t("ppMlCompact.fullyRecyclable"),
    
    // Layer construction
    "Layer Construction:": t("ppMlCompact.layerConstruction"),
    "INNER LAYER:": t("ppMlCompact.innerLayer"),
    "Made of modified PP with guaranteed high chemical and abrasive resistance. The smooth surface ensures good flow and prevents deposits.": t("ppMlCompact.innerLayerDescription"),
    "MIDDLE LAYER:": t("ppMlCompact.middleLayer"),
    "Impact resistant layer, even at low temperatures.": t("ppMlCompact.middleLayerDescription"),
    "OUTER LAYER:": t("ppMlCompact.outerLayer"),
    "Made of high quality PP, filled with mineral modifier; highly resistant to atmospheric agents and surface damaging. The modified PP formula ensures high UV protection, allowing external storage.": t("ppMlCompact.outerLayerDescription"),
    
    // Applications
    "Application:": t("ppMlCompact.application"),
    "Residential, municipal, and industrial wastewater systems": t("ppMlCompact.residentialMunicipalIndustrial"),
    "Stormwater management and subsoil drainage": t("ppMlCompact.stormwaterManagement"),
    "Transport of chemical effluents and process water": t("ppMlCompact.chemicalEffluents"),
    "High-load applications like culverts under roads and railways": t("ppMlCompact.highLoadApplications"),
    
    // Characteristics
    "Characteristics:": t("ppMlCompact.characteristics"),
    
    // Section headers
    "TRIPLE-LAYERED PIPE": t("ppMlCompact.tripleLayeredPipe"),
  };
  return translations[text] || text;
};

// PP ML Compact Pipe specifications data
const pipeSpecifications = [
  {
    id: "pp-ml",
    title: "PP ML COMPACT PIPE",
    description:
      "PP ML (Polypropylene Multi-Layer) solid pipes are designed specifically for sewage and drainage systems, offering a combination of durability, efficiency, and environmental sustainability.",
    features: [
      "Available in different classes: SN 8, SN 10, SN 12, SN 16 KN/m²",
      "Dimension range: DN/OD 160-500mm", 
      "Color: Outer orange-brown/middle black and inner light color",
      "Triple-layered construction for enhanced performance",
      "Manning's coefficient typically around 0.009",
      "50+ years expected service life",
    ],
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/PPHM-SMOOTH-WALL-min.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pphm-smooth-pipe-tabela-so-dimenzii-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Broshura-Cevki-PPHM-Smooth-Wall_EN2021_compressed.pdf",
  },
];

function PPHMSmoothODPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("pp-ml");

  useEffect(() => {
    // Set page title
    document.title = `PP ML COMPACT PIPE - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "PP ML (Polypropylene Multi-Layer) solid pipes are designed specifically for sewage and drainage systems, offering a combination of durability, efficiency, and environmental sustainability.",
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
                <span className="text-sm font-medium">
{t("ppMlCompact.engineeredForExcellence")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                PP ML
                <br />
                <span className="text-red-500">COMPACT</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  PIPE
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
{translatePpMlCompactText("PP ML (Polypropylene Multi-Layer) solid pipes are designed specifically for sewage and drainage systems, offering a combination of durability, efficiency, and environmental sustainability.", t)}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
{t("ppMlCompact.yearsLifespan")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("ppMlCompact.recyclable")}</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("ppMlCompact.tripleLayered")}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/PPHM-SMOOTH-WALL-min.jpg"
alt={translatePpMlCompactText("PP ML COMPACT PIPE", t)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">{t("ppMlCompact.premiumQuality")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
{t("ppMlCompact.technicalSpecifications")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
{translatePpMlCompactText("PP ML compact pipe is made of high module polypropylene (PP-HM) as its basic material, with three layers. Each of the three layers has a different modified formula of the basic material, which gives specific performances in the entire quality of the pipe.", t)}
              </p>
              <p className="text-lg leading-relaxed">
{translatePpMlCompactText("Production standard: EN 13476-2:2007 (Type А1) and ONR 201513:2011", t)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PP ML Compact Pipes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
{translatePpMlCompactText("TRIPLE-LAYERED PIPE", t)}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-white mb-6">
{translatePpMlCompactText("PP ML (Three-Layer) solid pipes provide a robust, efficient, and eco-friendly solution for modern sewage systems. Their combination of structural strength, hydraulic performance, and chemical resistance makes them ideal for both municipal and industrial wastewater applications.", t)}
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
{translatePpMlCompactText("Layer Construction:", t)}
                </h4>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-orange-300 mb-2">{translatePpMlCompactText("INNER LAYER:", t)}</h5>
                    <p className="text-white text-sm">{translatePpMlCompactText("Made of modified PP with guaranteed high chemical and abrasive resistance. The smooth surface ensures good flow and prevents deposits.", t)}</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-gray-300 mb-2">{translatePpMlCompactText("MIDDLE LAYER:", t)}</h5>
                    <p className="text-white text-sm">{translatePpMlCompactText("Impact resistant layer, even at low temperatures.", t)}</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-yellow-300 mb-2">{translatePpMlCompactText("OUTER LAYER:", t)}</h5>
                    <p className="text-white text-sm">{translatePpMlCompactText("Made of high quality PP, filled with mineral modifier; highly resistant to atmospheric agents and surface damaging. The modified PP formula ensures high UV protection, allowing external storage.", t)}</p>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
{translatePpMlCompactText("Application:", t)}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "Residential, municipal, and industrial wastewater systems",
                    "Stormwater management and subsoil drainage", 
                    "Transport of chemical effluents and process water",
                    "High-load applications like culverts under roads and railways",
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{translatePpMlCompactText(application, t)}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
{translatePpMlCompactText("Characteristics:", t)}
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    "Color: Outer orange-brown/middle black and inner light color",
                    "Dimensions: from DN / OD 160 to 500 mm with complete range of fittings",
                    "Available in different classes: SN 8, SN 10, SN 12, SN 16 KN/m²",
                    "Manning's coefficient typically around 0.009, reducing clogging",
                    "Expected service life exceeds 50 years under normal conditions", 
                    "Suitable for above-ground and exposed installations with UV-stabilized outer layers",
                    "Can operate between -20°C and +90°C",
                    "Fully recyclable material and energy-efficient production",
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{translatePpMlCompactText(characteristic, t)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/pphm-smooth-pipe-tabela-so-dimenzii-en.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
{t("ppMlCompact.downloadSpecs")}
                  </a>
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Broshura-Cevki-PPHM-Smooth-Wall_EN2021_compressed.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
{t("ppMlCompact.downloadBrochure")}
                  </a>
                </div>
              </div>

              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/pphm-smooth1-min.jpg"
alt={t("ppMlCompact.installation")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/pphm-smooth-2-min.jpg"
alt={t("ppMlCompact.crossSection")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("ppMlCompact.contactTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
{t("ppMlCompact.contactDescriptionSpecific")}
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#1c2d56] text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              data-testid="contact-button"
            >
{t("ppMlCompact.contactUs")}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("ppMlCompact.contactTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
{t("ppMlCompact.contactDescriptionGeneral")}
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
{t("ppMlCompact.contactUs")}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default PPHMSmoothODPage;