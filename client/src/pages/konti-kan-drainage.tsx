import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  Shield,
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

// Drainage translation helper function
const translateDrainageText = (text: string, t: any) => {
  const translations: { [key: string]: string } = {
    // Page titles and headers
    "KONTIKAN": t("drainage.kontikan"),
    "DRAINAGE": t("drainage.drainage"),
    "KONTI DREN": t("drainage.kontiDren"),
    
    // Descriptions
    "Drainage Polypropylene (PP) pipes are widely used in drainage systems for managing groundwater, excess surface water, and wastewater. These pipes are designed with precision slots or perforations to allow water infiltration.": t("drainage.heroDescription"),
    "Drainage PP pipes offer an efficient, durable, and eco-friendly solution for managing water in a variety of drainage applications. Their lightweight nature, structural strength, and long lifespan make them a cost-effective choice for modern water management systems.": t("drainage.kontiDrenDescription"),
    "Polypropylene is resistant to wear and tear, ensuring long-term performance in harsh environments. PP pipes are highly resistant to chemicals, including acids, alkalis, and salts commonly found in wastewater and drainage applications.": t("drainage.materialDescription"),
    
    // Standards & Compliance
    "Standards & Compliance": t("drainage.standardsCompliance"),
    "PP slotted pipes are manufactured to comply with standards such as EN 1852, EN 13476, DIN 4262-1 (TYPE R3) or equivalent local drainage pipe regulations, ensuring quality and reliability.": t("drainage.standardsDescription"),
    "Available with different slot patterns (e.g., longitudinal, spiral, or circumferential) to optimize water collection based on the application.": t("drainage.slotPatternsDescription"),
    
    // Slot Patterns
    "Slot Patterns Available": t("drainage.slotPatternsAvailable"),
    "PP - Partially perforated": t("drainage.ppPartiallyPerforated"),
    "Optimized for controlled water infiltration": t("drainage.optimizedControlledInfiltration"),
    "MP - Multipurpose": t("drainage.mpMultipurpose"),
    "Versatile solution for various applications": t("drainage.versatileSolution"),
    "FP - Fully perforated": t("drainage.fpFullyPerforated"),
    "Maximum water collection capacity": t("drainage.maximumWaterCollection"),
    
    // Key Applications
    "Key Applications": t("drainage.keyApplications"),
    "Suitable for agriculture (irrigation), infrastructure projects (road and slope drainage), and residential or commercial water management systems. Can be easily connected to other drainage components, such as catch basins and manholes, using standard fittings.": t("drainage.applicationsDescription"),
    "Agriculture (irrigation)": t("drainage.agriculture"),
    "Infrastructure projects (road and slope drainage)": t("drainage.infrastructureProjects"),
    "Residential water management systems": t("drainage.residentialWaterManagement"),
    "Commercial water management systems": t("drainage.commercialWaterManagement"),
    "Subsurface drainage": t("drainage.subsurfaceDrainage"),
    "Slope stabilization": t("drainage.slopeStabilization"),
    "Groundwater management": t("drainage.groundwaterManagement"),
    "Surface water management": t("drainage.surfaceWaterManagement"),
    
    // Characteristics
    "Durable, chemical-resistant, non-corrosive": t("drainage.durableChemicalResistant"),
    "Smooth inner surface, controlled infiltration": t("drainage.smoothInnerSurface"),
    "High ring stiffness, flexible under soil pressure": t("drainage.highRingStiffness"),
    "Operates between -20°C and +90°C": t("drainage.temperatureRange"),
    "Optimized for water infiltration, debris exclusion": t("drainage.optimizedInfiltration"),
    "Range of pipe: DN 110-1000 mm": t("drainage.pipeRange"),
    "UV-stabilized, eco-friendly, recyclable": t("drainage.uvStabilized"),
    "Lightweight, easy to transport and install": t("drainage.lightweightEasyInstall"),
    "Minimal maintenance due to clog resistance and durability": t("drainage.minimalMaintenance"),
    "Service life 50+ years": t("drainage.serviceLife"),
  };
  return translations[text] || text;
};

// KONTI KAN DRAINAGE specifications data
const drainageSpecifications = [
  {
    id: "konti-dren",
    title: "KONTI DREN",
    description:
      "Drainage PP pipes offer an efficient, durable, and eco-friendly solution for managing water in a variety of drainage applications. Their lightweight nature, structural strength, and long lifespan make them a cost-effective choice for modern water management systems.",
    additionalInfo:
      "Polypropylene is resistant to wear and tear, ensuring long-term performance in harsh environments. PP pipes are highly resistant to chemicals, including acids, alkalis, and salts commonly found in wastewater and drainage applications.",
    features: [
      "Durable, chemical-resistant, non-corrosive",
      "Smooth inner surface, controlled infiltration",
      "High ring stiffness, flexible under soil pressure",
      "Operates between -20°C and +90°C",
      "Optimized for water infiltration, debris exclusion",
      "Range of pipe: DN 110-1000 mm",
      "UV-stabilized, eco-friendly, recyclable",
      "Lightweight, easy to transport and install",
      "Minimal maintenance due to clog resistance and durability",
      "Service life 50+ years",
    ],
    images: [
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/drenazni-cevki-1.jpg",
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/drenazni-cevki-2.jpg",
    ],
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/tabela-so-dimenzii-konti-kan-drenaza-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/konti-kan-drenaza-en.pdf",
  },
];

// Applications data
const applications = [
  "Agriculture (irrigation)",
  "Infrastructure projects (road and slope drainage)",
  "Residential water management systems",
  "Commercial water management systems",
  "Subsurface drainage",
  "Slope stabilization",
  "Groundwater management",
  "Surface water management",
];

// Slot patterns data
const slotPatterns = [
  {
    name: "PP - Partially perforated",
    description: "Optimized for controlled water infiltration",
  },
  {
    name: "MP - Multipurpose",
    description: "Versatile solution for various applications",
  },
  {
    name: "FP - Fully perforated",
    description: "Maximum water collection capacity",
  },
];

export default function KontiKanDrainagePage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeProductTab, setActiveProductTab] = useState<"hdpe" | "pphm" | "spiral" | "ppml" | "manholes" | "drainage">("drainage");
  const productTabs = [
    { id: "hdpe", label: t("nav.products.hdpeKontiKan") },
    { id: "pphm", label: t("nav.products.pphmKontiKan") },
    { id: "spiral", label: t("nav.products.spiralKontiKan") },
    { id: "ppml", label: t("nav.products.ppMlCompact") },
    { id: "manholes", label: t("nav.products.manholes") },
    { id: "drainage", label: t("nav.products.drainage") },
  ];
  useEffect(() => {
    // Set page title
    document.title = `KONTI KAN DRAINAGE - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "KONTI KAN DRAINAGE systems - Professional drainage PP pipes for managing groundwater, surface water, and wastewater. Engineered for excellence with 50+ years service life.",
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
                  {t("drainage.engineeredForExcellence")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                {translateDrainageText("KONTIKAN", t)}
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {translateDrainageText("DRAINAGE", t)}
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                {translateDrainageText("Drainage Polypropylene (PP) pipes are widely used in drainage systems for managing groundwater, excess surface water, and wastewater. These pipes are designed with precision slots or perforations to allow water infiltration.", t)}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t("drainage.yearsLifespan")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("drainage.recyclable")}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <video
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/Konti-Hidroplast_5-1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Konti Hidroplast drainage systems manufacturing video"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">{t("drainage.premiumQuality")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
                {translateDrainageText("Standards & Compliance", t)}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {translateDrainageText("PP slotted pipes are manufactured to comply with standards such as EN 1852, EN 13476, DIN 4262-1 (TYPE R3) or equivalent local drainage pipe regulations, ensuring quality and reliability.", t)}
                </p>
                <p>
                  {translateDrainageText("Available with different slot patterns (e.g., longitudinal, spiral, or circumferential) to optimize water collection based on the application.", t)}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                {translateDrainageText("Slot Patterns Available", t)}
              </h3>
              <div className="space-y-4">
                {slotPatterns.map((pattern, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-[#1c2d56] mb-1">
                      {translateDrainageText(pattern.name, t)}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {translateDrainageText(pattern.description, t)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
              {translateDrainageText("Key Applications", t)}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {translateDrainageText("Suitable for agriculture (irrigation), infrastructure projects (road and slope drainage), and residential or commercial water management systems. Can be easily connected to other drainage components, such as catch basins and manholes, using standard fittings.", t)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full"
              >
                <div className="flex items-start gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="block max-w-full text-[#1c2d56] font-medium text-sm leading-snug whitespace-normal break-words hyphens-auto">
                    {translateDrainageText(app, t)}
                  </span>
                </div>
              </div>
            ))}
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
