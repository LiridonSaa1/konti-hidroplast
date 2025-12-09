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
  Check,
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
  const [activeProductTab, setActiveProductTab] = useState<"hdpe" | "pphm" | "spiral" | "ppml" | "manholes" | "drainage">("ppml");
  const productTabs = [
    { id: "hdpe", label: t("nav.products.hdpeKontiKan") },
    { id: "pphm", label: t("nav.products.pphmKontiKan") },
    { id: "spiral", label: t("nav.products.spiralKontiKan") },
    { id: "ppml", label: t("nav.products.ppMlCompact") },
    { id: "manholes", label: t("nav.products.manholes") },
    { id: "drainage", label: t("nav.products.drainage") },
  ];
  const handleBrochureDownload = (product: any) => {
    // Redirect to brochures page with parameter to auto-open modal
    setLocation('/brochures?from=products');
  };


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
              PP-HM GLATTMANTEL-
                <br />
                <span className="text-red-500">ROHRE</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Herstellung
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
               PP-HM (Polypropylen High Modulus) Glattmantelrohre sind leistungsstarke thermoplastische Rohre, die für anspruchsvolle Anwendungen in Abwasser-, Entwässerungs- und industriellen Systemen entwickelt wurden.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Lebensdauer von über 50 Jahren
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Vollständig recycelbar</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Hohe Steifigkeit und Festigkeit</span>
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
                Technische Spezifikationen
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
              PP-HM Glattmantelrohre bieten außergewöhnliche Festigkeit, hohe chemische Beständigkeit und hervorragende Haltbarkeit. Dadurch eignen sie sich ideal für Druck- und Nichtdruckanwendungen in anspruchsvollen Umgebungen.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>Produktionsstandards:</strong> EN 13476-2:2007 (Typ A1) und ONR 201513:2011
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* Sewerage sub-products tabs */}
     <section className="py-6 bg-[#1c2d56]">
        <div className="max-w-6xl mx-auto px-1 sm:px-6 lg:px-1">
          <div className="bg-white/10 rounded-xl p-2 flex flex-wrap gap-3">
            {productTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveProductTab(tab.id as typeof activeProductTab)}
                className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all ${
                  activeProductTab === tab.id
                    ? "bg-white text-[#1c2d56] font-semibold shadow"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HDPE Konti Kan Pipes Section */}
      {activeProductTab === "hdpe" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("sewagePipes.hdpeKontiKanPipes")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t("sewagePipes.hdpeKontiKanTitle")}
                </h3>
                <p className="text-white mb-6">
                  {t("sewagePipes.pipeDescription")}
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("sewagePipes.materialProperties")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("sewagePipes.hdpeMaterial"),
                    t("sewagePipes.lightweightDurable"),
                    t("sewagePipes.chemicalResistance"),
                    t("sewagePipes.nonCorrosive"),
                  ].map((property, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{property}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("sewagePipes.application")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("sewagePipes.municipalSewage"),
                    t("sewagePipes.stormwaterDrainage"),
                    t("sewagePipes.industrialWastewater"),
                    t("sewagePipes.agriculturalDrainage"),
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("sewagePipes.characteristics")}
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    t("sewagePipes.stiffnessRatings"),
                    t("sewagePipes.dimensionRange"),
                    t("sewagePipes.color"),
                    t("sewagePipes.smoothInnerSurface"),
                    t("sewagePipes.highFlowCapacity"),
                    t("sewagePipes.corrugatedOuterWall"),
                    t("sewagePipes.uvResistance"),
                    t("sewagePipes.flexibleResistant"),
                    t("sewagePipes.serviceLife"),
                    t("sewagePipes.easyHandling"),
                    t("sewagePipes.temperatureRange"),
                    t("sewagePipes.fullyRecyclable"),
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleBrochureDownload({
                      id: 'konti-kan-pipes',
                      title: 'Konti Kan Pipes and Fittings',
                      brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-Konti-Kan-siv_EN-2021-so-korekcii-MART-2021-2.pdf'
                    })}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("sewagePipes.downloadBrochure")}
                  </button>
                </div>
              </div>

              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/konti-kan-1.jpg"
                      alt={t("sewagePipes.hdpeKontiKanPipes")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="/attached_assets/Konti-Hidroplast-Proizvodstvo-27-1 (1)_1755354410219.jpg"
                      alt={t("sewagePipes.hdpeKontiKanManufacturing")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Konti Kan Drainage content (inline tab) */}
      {activeProductTab === "drainage" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("drainage.kontiDren")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white mb-6">
                {t("drainage.kontiDrenDescription")}
              </p>
              <p className="text-white mb-6">
                {t("drainage.materialDescription")}
              </p>

              <div className="space-y-3 mb-8">
                {[
                  t("drainage.durableChemicalResistant"),
                  t("drainage.smoothInnerSurface"),
                  t("drainage.highRingStiffness"),
                  t("drainage.temperatureRange"),
                  t("drainage.optimizedInfiltration"),
                  t("drainage.pipeRange"),
                  t("drainage.uvStabilized"),
                  t("drainage.lightweightEasyInstall"),
                  t("drainage.minimalMaintenance"),
                  t("drainage.serviceLife"),
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleBrochureDownload({
                    id: 'konti-kan-drainage',
                    title: 'Konti Kan Drainage',
                    brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/konti-kan-drenaza-en.pdf'
                  })}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("productPages.downloadPdf")}
                </button>
              </div>
            </div>

            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/drenazni-cevki-1.jpg"
                  alt="Konti Kan Drainage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
      {/* Schächte (Manholes) content (inline tab) */}
      {activeProductTab === "manholes" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("manholes.manholes")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tabs mimic: show HDPE by default with key bullets and image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {t("manholes.hdpeManholes")}
              </h3>
              <p className="text-white mb-6">
                {t("manholes.hdpeDescription")}
              </p>

              <div className="space-y-3 mb-8">
                {[
                  t("manholes.hdpeMaterial"),
                  t("manholes.hdpeChemicalBiological"),
                  t("manholes.hdpeServiceLife"),
                  t("manholes.hdpeTemperatureRange"),
                  t("manholes.hdpeSmoothSurface"),
                  t("manholes.hdpeStiffnessFlexibility"),
                  t("manholes.hdpeLightweight"),
                  t("manholes.hdpeRecyclable"),
                  t("manholes.hdpeAffordable"),
                  t("manholes.hdpeCostEffective"),
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleBrochureDownload({
                    id: 'manholes',
                    title: 'HDPE Manholes',
                    brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/sahti-en.pdf'
                  })}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("manholes.downloadBrochure")}
                </button>
              </div>
            </div>

            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-8.jpg"
                  alt="HDPE Manholes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* PP Manholes brief */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {t("manholes.ppManholes")}
              </h3>
              <p className="text-white mb-6">
                {t("manholes.ppDescription")}
              </p>
              <div className="space-y-3 mb-8">
                {[
                  t("manholes.ppMaterial"),
                  t("manholes.ppTemperatureRange"),
                  t("manholes.ppSmoothSurface"),
                  t("manholes.ppCompliesEN124"),
                  t("manholes.ppEasyTransport"),
                  t("manholes.ppRecyclable"),
                  t("manholes.ppCostEffective"),
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleBrochureDownload({
                    id: 'pp-manholes',
                    title: 'PP Manholes',
                    brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-en.pdf'
                  })}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("manholes.downloadBrochure")}
                </button>
              </div>
            </div>

            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-1.jpg"
                  alt="PP Manholes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
      {/* PPHM Konti Kan ID content (inline tab) */}
      {activeProductTab === "pphm" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("ppHmPipes.ppHmKontiKanPipes")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t("ppHmPipes.ppHmKontiKanTitle")}
                </h3>
                <p className="text-white mb-6">
                  {t("ppHmPipes.pipeDescription")}
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("ppHmPipes.materialProperties")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("ppHmPipes.ppMaterial"),
                    t("ppHmPipes.strengthToWeightRatio"),
                    t("ppHmPipes.chemicalThermalResistance"),
                    t("ppHmPipes.abrasionResistance"),
                    t("ppHmPipes.rigidDurable"),
                  ].map((property, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{property}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("ppHmPipes.application")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("ppHmPipes.municipalIndustrialWastewater"),
                    t("ppHmPipes.stormwaterHarvesting"),
                    t("ppHmPipes.roadRailInfrastructure"),
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("ppHmPipes.characteristics")}
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    t("ppHmPipes.corrugatedStructure"),
                    t("ppHmPipes.smoothInnerWall"),
                    t("ppHmPipes.stiffnessRatings"),
                    t("ppHmPipes.dimensionRange"),
                    t("ppHmPipes.color"),
                    t("ppHmPipes.manningsCoefficient"),
                    t("ppHmPipes.highFlowRates"),
                    t("ppHmPipes.uvStabilized"),
                    t("ppHmPipes.serviceLife"),
                    t("ppHmPipes.temperatureRange"),
                    t("ppHmPipes.fullyRecyclable"),
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleBrochureDownload({
                      id: 'pp-hm-pipes',
                      title: 'PP-HM Pipes and Fittings',
                      brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-PPHM_EN-2024_posledna-promena_MART_compressed.pdf'
                    })}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("ppHmPipes.downloadBrochure")}
                  </button>
                </div>
              </div>

              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/1000x1000-2.jpg"
                      alt={t("ppHmPipes.ppHmKontiKanPipes")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/1000x1000.jpg"
                      alt={t("ppHmPipes.ppHmManufacturing")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Konti Kan Spiral HDPE/ID content (inline tab) */}
      {activeProductTab === "spiral" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("spiralPipes.kontiKanSpiralPipes")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t("spiralPipes.kontiKanSpiral")}
                </h3>
                <p className="text-white mb-6">
                  {t("spiralPipes.heroDescription")}
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("spiralPipes.materialProperties")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("spiralPipes.hdpeMaterial"),
                    t("spiralPipes.lightweightStrong"),
                    t("spiralPipes.chemicalBiologicalResistance"),
                    t("spiralPipes.flexibleResistant"),
                  ].map((property, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{property}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("spiralPipes.application")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("spiralPipes.sewerageStormwater"),
                    t("spiralPipes.waterTransportStorage"),
                    t("spiralPipes.industrialEffluent"),
                    t("spiralPipes.culvertsIrrigation"),
                    t("spiralPipes.ventilationDucts"),
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("spiralPipes.characteristics")}
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    t("spiralPipes.stiffnessClasses"),
                    t("spiralPipes.diameterRange"),
                    t("spiralPipes.colorLength"),
                    t("spiralPipes.acidAlkalineResistance"),
                    t("spiralPipes.serviceLife"),
                    t("spiralPipes.aboveGroundUse"),
                    t("spiralPipes.temperatureRange"),
                    t("spiralPipes.fullyRecyclable"),
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleBrochureDownload({
                      id: 'konti-kan-spiral',
                      title: 'Konti Kan Spiral Pipes',
                      brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-KONTI-SPIRAL_EN_2021_compressed.pdf'
                    })}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("productPages.downloadPdf")}
                  </button>
                </div>
              </div>

              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral.jpg"
                      alt="KONTI KAN SPIRAL Pipes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Gogo_20240824_9420-24.jpg"
                      alt="KONTI KAN SPIRAL Manufacturing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* PP ML Kompaktrohre OD (PP-HM Smooth OD) content (inline tab) */}
      {activeProductTab === "ppml" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
              Materialeigenschaften
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-white mb-6">
                PP-HM Glattmantelrohre werden aus Polypropylen High Modulus (PP-HM) hergestellt, das hervorragende mechanische Eigenschaften und eine langfristig hohe Leistungsfähigkeit für anspruchsvolle Anwendungen bietet.
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                Materialeigenschaften:
                </h4>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-orange-300 mb-2">Polypropylen High Modulus (PP-HM):</h5>
                    <p className="text-white text-sm">Hohe Steifigkeit und Festigkeit für anspruchsvolle Einsatzbereiche</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-gray-300 mb-2">Überragende dimensionsstabilität und Kriechfestigkeit Anwendungsbereiche:</h5>
                    <p className="text-white text-sm">Abwasser- und Regenwasserentsorgungssysteme</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-yellow-300 mb-2">Industrielle Abwasser- und chemische Abfallleitungen:</h5>
                    <p className="text-white text-sm">Hochtemperaturanwendungen</p>
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
                    "Hochtemperaturanwendungen",
                    "Anlagen der chemischen Industrie",
                    "Kommunale Infrastrukturprojekte",
                    "Landwirtschaftliche Drainagesysteme",
                    "Technische Eigenschaften",
                    "Hohe Ringsteifigkeit für strukturelle Stabilität",
                    "Hervorragende chemische Beständigkeit gegenüber Säuren, Basen und Lösungsmitteln",
                    "Sehr gute Temperaturbeständigkeit bis 90 °C",
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleBrochureDownload({
                      id: 'pp-hm-smooth-od',
                      title: 'PP-HM Smooth OD Pipes',
                      brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Broshura-Cevki-PPHM-Smooth-Wall_EN2021_compressed.pdf'
                    })}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </button>
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
      )}

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