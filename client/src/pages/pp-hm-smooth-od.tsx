import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  Download,
  Shield,
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// PP-HM Smooth OD pipes translation helper function
const translatePpHmSmoothODText = (text: string, t: any) => {
  const translations: { [key: string]: string } = {
    // Page titles and headers
    "PP-HM SMOOTH OD": t("ppHmSmoothOD.ppHmSmoothOd"),
    "PP-HM SMOOTH OD Pipes": t("ppHmSmoothOD.ppHmSmoothOdPipes"),
    "PP-HM SMOOTH OD Manufacturing": t("ppHmSmoothOD.ppHmSmoothOdManufacturing"),
    
    // Descriptions
    "PP-HM (Polypropylene High Modulus) smooth OD pipes are high-performance thermoplastic pipes designed for demanding applications in sewage, drainage, and industrial systems.": t("ppHmSmoothOD.heroDescription"),
    "PP-HM smooth OD pipes offer exceptional strength, chemical resistance, and durability, making them ideal for both pressure and non-pressure applications in challenging environments.": t("ppHmSmoothOD.pipeDescription"),
    "PP-HM smooth OD pipes are manufactured using high-modulus polypropylene, providing superior mechanical properties and long-term performance in demanding applications.": t("ppHmSmoothOD.manufacturingDescription"),
    
    // Technical specifications and features
    "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or higher for specific applications": t("ppHmSmoothOD.stiffnessClasses"),
    "Suitable for pipes with diameters ranging from Ø 110 – 500 mm": t("ppHmSmoothOD.diameterRange"),
    "Color: Black (other color on request)": t("ppHmSmoothOD.color"),
    "Length: 6m": t("ppHmSmoothOD.length"),
    "Service life of over 50 years under normal conditions": t("ppHmSmoothOD.serviceLife"),
    "Fully recyclable": t("ppHmSmoothOD.fullyRecyclable"),
    "Color: Black (other color on request) | Length: 6m": t("ppHmSmoothOD.colorLength"),
    
    // Material properties
    "Polypropylene High Modulus (PP-HM)": t("ppHmSmoothOD.ppHmMaterial"),
    "High stiffness and strength for demanding applications": t("ppHmSmoothOD.highStiffnessStrength"),
    "Excellent resistance to chemicals and biological degradation": t("ppHmSmoothOD.chemicalBiologicalResistance"),
    "Superior dimensional stability and creep resistance": t("ppHmSmoothOD.dimensionalStability"),
    
    // Applications
    "Sewerage and stormwater drainage systems": t("ppHmSmoothOD.sewerageStormwater"),
    "Industrial effluent and chemical waste pipelines": t("ppHmSmoothOD.industrialEffluent"),
    "High-temperature applications": t("ppHmSmoothOD.highTemperature"),
    "Chemical processing plants": t("ppHmSmoothOD.chemicalProcessing"),
    "Municipal infrastructure projects": t("ppHmSmoothOD.municipalInfrastructure"),
    "Agricultural drainage systems": t("ppHmSmoothOD.agriculturalDrainage"),
    
    // Characteristics
    "High ring stiffness for structural integrity": t("ppHmSmoothOD.highRingStiffness"),
    "Excellent chemical resistance to acids, bases, and solvents": t("ppHmSmoothOD.excellentChemicalResistance"),
    "Superior temperature resistance up to 90°C": t("ppHmSmoothOD.temperatureResistance"),
    "Low thermal expansion coefficient": t("ppHmSmoothOD.lowThermalExpansion"),
    "High impact resistance and toughness": t("ppHmSmoothOD.highImpactResistance"),
    "Smooth inner surface for optimal flow": t("ppHmSmoothOD.smoothInnerSurface"),
    "UV-stabilized for outdoor applications": t("ppHmSmoothOD.uvStabilized"),
    "Lightweight and easy to handle": t("ppHmSmoothOD.lightweightEasyHandle"),
    
    // Section headers
    "Material Properties:": t("ppHmSmoothOD.materialProperties"),
    "Application:": t("ppHmSmoothOD.application"),
    "Characteristics:": t("ppHmSmoothOD.characteristics"),
  };
  return translations[text] || text;
};

// PP-HM Smooth OD specifications data
const pipeSpecifications = [
  {
    id: "pp-hm-smooth-od",
    title: "PP-HM SMOOTH OD",
    description:
      "PP-HM (Polypropylene High Modulus) smooth OD pipes are high-performance thermoplastic pipes designed for demanding applications in sewage, drainage, and industrial systems.",
    features: [
      "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or higher for specific applications",
      "Suitable for pipes with diameters ranging from Ø 110 – 500 mm",
      "Color: Black (other color on request)",
      "Length: 6m",
      "Service life of over 50 years under normal conditions",
      "Fully recyclable",
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
  const [activeTab, setActiveTab] = useState("pp-hm-smooth-od");

  useEffect(() => {
    // Set page title
    document.title = `PP-HM SMOOTH OD - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "PP-HM (Polypropylene High Modulus) smooth OD pipes are high-performance thermoplastic pipes designed for demanding applications in sewage, drainage, and industrial systems.",
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
                  ENGINEERED FOR EXCELLENCE
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                PP-HM SMOOTH OD
                <br />
                <span className="text-red-500">PIPES</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  MANUFACTURING
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                PP-HM (Polypropylene High Modulus) smooth OD pipes are high-performance thermoplastic pipes designed for demanding applications in sewage, drainage, and industrial systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    50+ Years Lifespan
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Fully Recyclable</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">High Stiffness & Strength</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/PPHM-SMOOTH-WALL-min.jpg"
                  alt="PP-HM SMOOTH OD"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">Premium Quality</span>
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
                Technical Specifications
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                PP-HM smooth OD pipes offer exceptional strength, chemical resistance, and durability, making them ideal for both pressure and non-pressure applications in challenging environments.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>Production standard:</strong> EN 13476-2:2007 (Type А1) and ONR 201513:2011
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PP-HM Smooth OD Pipes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                Material Properties
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-white mb-6">
                  PP-HM smooth OD pipes are manufactured using high-modulus polypropylene, providing superior mechanical properties and long-term performance in demanding applications.
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  Material Properties:
                </h4>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-orange-300 mb-2">Polypropylene High Modulus (PP-HM):</h5>
                    <p className="text-white text-sm">High stiffness and strength for demanding applications</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-gray-300 mb-2">High stiffness and strength for demanding applications:</h5>
                    <p className="text-white text-sm">Excellent resistance to chemicals and biological degradation</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-yellow-300 mb-2">Superior dimensional stability and creep resistance:</h5>
                    <p className="text-white text-sm">Superior dimensional stability and creep resistance</p>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Application:
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "Sewerage and stormwater drainage systems",
                    "Industrial effluent and chemical waste pipelines",
                    "High-temperature applications",
                    "Chemical processing plants",
                    "Municipal infrastructure projects",
                    "Agricultural drainage systems",
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Characteristics:
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    "High ring stiffness for structural integrity",
                    "Excellent chemical resistance to acids, bases, and solvents",
                    "Superior temperature resistance up to 90°C",
                    "Low thermal expansion coefficient",
                    "High impact resistance and toughness",
                    "Smooth inner surface for optimal flow",
                    "UV-stabilized for outdoor applications",
                    "Lightweight and easy to handle",
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
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
                    Download Specs
                  </a>
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Broshura-Cevki-PPHM-Smooth-Wall_EN2021_compressed.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </a>
                </div>
              </div>

              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/pphm-smooth1-min.jpg"
                      alt="PP-HM SMOOTH OD Installation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/pphm-smooth-2-min.jpg"
                      alt="PP-HM SMOOTH OD Cross Section"
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
      <Footer />
    </div>
  );
}

export default PPHMSmoothODPage;