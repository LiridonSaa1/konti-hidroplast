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

// Manholes translation helper function
const translateManholesText = (text: string, t: any) => {
  const translations: { [key: string]: string } = {
    // Page titles and headers
    "MANHOLES": t("manholes.manholes"),
    "HDPE MANHOLES": t("manholes.hdpeManholes"),
    "PP MANHOLES": t("manholes.ppManholes"),
    
    // Descriptions
    "Both PP (Polypropylene) and HDPE (High-Density Polyethylene) manholes are widely used in modern drainage and sewage systems, offering a range of advantages in terms of durability, efficiency, and ease of installation.": t("manholes.heroDescription"),
    "HDPE manholes exhibit high structural strength and rigidity, capable of handling both dynamic and static loads, including traffic loads and deep burial. While stiff, HDPE manholes also have a certain degree of flexibility, allowing them to absorb slight ground movements without cracking.": t("manholes.hdpeDescription"),
    "HDPE is highly resistant to a wide range of chemicals, including acids, bases, and salts, making it suitable for sewage and industrial waste environments.": t("manholes.hdpeChemicalResistance"),
    "PP manholes are an excellent choice for modern sewage, stormwater, and drainage systems. They excel in chemical and biological resistance with a material that offers long-term durability, cost-effectiveness, and easy installation, making them suitable for a wide range of applications, including residential, municipal, and industrial infrastructure.": t("manholes.ppDescription"),
    
    // Structural Forms
    "Structural Forms": t("manholes.structuralForms"),
    "By structural form, HDPE and PP manholes can be:": t("manholes.structuralFormsDescription"),
    "Injection molded – Konti Rigid manhole": t("manholes.injectionMolded"),
    "Manufactured, combination of injection molding part and corrugate pipe": t("manholes.manufactured"),
    "Special manhole – tailor made, special construction of manholes (non standard). These manholes can be manufactured from KONTI KAN SPIRAL PIPE, inlet and outlet from KONTI KAN pipes.": t("manholes.specialManhole"),
    
    // Key Applications
    "Key Applications": t("manholes.keyApplications"),
    "Municipal and industrial manholes": t("manholes.municipalIndustrial"),
    "Sewer and storm water manholes": t("manholes.sewerStormwater"),
    "Siphon structure": t("manholes.siphonStructure"),
    "Pump stations": t("manholes.pumpStations"),
    "Bio treatment of sewage": t("manholes.bioTreatment"),
    "Sanitary-Sewer systems": t("manholes.sanitarySewer"),
    "Landfills": t("manholes.landfills"),
    "Chemical plants": t("manholes.chemicalPlants"),
    
    // Manhole Types
    "Manholes Types": t("manholes.manholesTypes"),
    
    // HDPE Features
    "High-Density Polyethylene (HDPE)": t("manholes.hdpeMaterial"),
    "Excellent chemical and biological resistance": t("manholes.hdpeChemicalBiological"),
    "50+ years service life": t("manholes.hdpeServiceLife"),
    "-40°C to +60°C (short-term higher resistance)": t("manholes.hdpeTemperatureRange"),
    "Smooth inner surface, reduced friction": t("manholes.hdpeSmoothSurface"),
    "High stiffness and flexibility for traffic loads": t("manholes.hdpeStiffnessFlexibility"),
    "Lightweight, quick installation": t("manholes.hdpeLightweight"),
    "Fully recyclable, environmentally friendly": t("manholes.hdpeRecyclable"),
    "Affordable, low long-term maintenance": t("manholes.hdpeAffordable"),
    "More cost-effective than concrete alternatives": t("manholes.hdpeCostEffective"),
    
    // PP Features
    "Polypropylene (PP)": t("manholes.ppMaterial"),
    "-20°C to +90°C": t("manholes.ppTemperatureRange"),
    "Smooth inner surface, self-cleaning": t("manholes.ppSmoothSurface"),
    "Complies with EN 124 for heavy loads": t("manholes.ppCompliesEN124"),
    "Easy transport, modular design": t("manholes.ppEasyTransport"),
    "Fully recyclable, energy-efficient": t("manholes.ppRecyclable"),
    "Cost-effective, low maintenance": t("manholes.ppCostEffective"),
    
    // PP Advantages
    "Advantages of KONTI Rigid PP Manholes": t("manholes.ppAdvantages"),
    "Chemical Resistance": t("manholes.ppChemicalResistance"),
    "In comparison to the concrete manholes": t("manholes.ppChemicalResistanceDesc"),
    "Economic": t("manholes.ppEconomic"),
    "Reduced material costs due to optimized chamber nominal diameter": t("manholes.ppEconomicDesc"),
    "Durable": t("manholes.ppDurable"),
    "Corrosion-resistant material polypropylene increases durability and protects the environment": t("manholes.ppDurableDesc"),
    "100% Leak-tight": t("manholes.ppLeakTight"),
    "Complete sealing ensures no leakage": t("manholes.ppLeakTightDesc"),
    "Safe and Inspection-friendly": t("manholes.ppSafeInspection"),
    "Inspection-friendly color orange": t("manholes.ppSafeInspectionDesc"),
    "Favorable Installation": t("manholes.ppFavorableInstallation"),
    "Modular system ensures easy handling on the construction site": t("manholes.ppFavorableInstallationDesc"),
    "Lower Costs": t("manholes.ppLowerCosts"),
    "Lower wage and equipment costs due to weight and assembly advantages": t("manholes.ppLowerCostsDesc"),
    "Built-in Slope": t("manholes.ppBuiltInSlope"),
    "Integrated slope design for optimal flow": t("manholes.ppBuiltInSlopeDesc"),
    
    // Connection Compatibility
    "Connection Compatibility": t("manholes.connectionCompatibility"),
    "Connection can be made with different kind of pipes:": t("manholes.connectionDescription"),
    "Polypropylene smooth pipe": t("manholes.ppSmoothPipe"),
    "PVC pipe": t("manholes.pvcPipe"),
    "Cast Iron": t("manholes.castIron"),
    "GRP pipe": t("manholes.grpPipe"),
    "Clay pipe": t("manholes.clayPipe"),
    "Corrugate pipe": t("manholes.corrugatePipe"),
  };
  return translations[text] || text;
};

// Manholes specifications data
const manholesSpecifications = [
  {
    id: "hdpe-manholes",
    title: "HDPE MANHOLES",
    description:
      "HDPE manholes exhibit high structural strength and rigidity, capable of handling both dynamic and static loads, including traffic loads and deep burial. While stiff, HDPE manholes also have a certain degree of flexibility, allowing them to absorb slight ground movements without cracking.",
    additionalInfo:
      "HDPE is highly resistant to a wide range of chemicals, including acids, bases, and salts, making it suitable for sewage and industrial waste environments.",
    features: [
      "High-Density Polyethylene (HDPE)",
      "Excellent chemical and biological resistance",
      "50+ years service life",
      "-40°C to +60°C (short-term higher resistance)",
      "Smooth inner surface, reduced friction",
      "High stiffness and flexibility for traffic loads",
      "Lightweight, quick installation",
      "Fully recyclable, environmentally friendly",
      "Affordable, low long-term maintenance",
      "More cost-effective than concrete alternatives",
    ],
    images: [
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-8.jpg",
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-7.jpg",
    ],
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/sahti-en.pdf",
  },
  {
    id: "pp-manholes",
    title: "PP MANHOLES",
    description:
      "PP manholes are an excellent choice for modern sewage, stormwater, and drainage systems. They excel in chemical and biological resistance with a material that offers long-term durability, cost-effectiveness, and easy installation, making them suitable for a wide range of applications, including residential, municipal, and industrial infrastructure.",
    additionalInfo: "",
    features: [
      "Polypropylene (PP)",
      "Excellent chemical and biological resistance",
      "50+ years service life",
      "-20°C to +90°C",
      "Smooth inner surface, self-cleaning",
      "Complies with EN 124 for heavy loads",
      "Easy transport, modular design",
      "Fully recyclable, energy-efficient",
      "Cost-effective, low maintenance",
    ],
    images: [
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-1.jpg",
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-25-r.jpg",
    ],
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-en.pdf",
  },
];

// Structural form data
const structuralForms = [
  "Injection molded – Konti Rigid manhole",
  "Manufactured, combination of injection molding part and corrugate pipe",
  "Special manhole – tailor made, special construction of manholes (non standard). These manholes can be manufactured from KONTI KAN SPIRAL PIPE, inlet and outlet from KONTI KAN pipes.",
];

// Applications data
const applications = [
  "Municipal and industrial manholes",
  "Sewer and storm water manholes",
  "Siphon structure",
  "Pump stations",
  "Bio treatment of sewage",
  "Sanitary-Sewer systems",
  "Landfills",
  "Chemical plants",
  "Sewage systems",
  "Water Meter systems",
];

// Advantages data
const advantages = [
  {
    title: "Chemical Resistance",
    description: "In comparison to the concrete manholes",
  },
  {
    title: "Economic",
    description:
      "Reduced material costs due to optimized chamber nominal diameter",
  },
  {
    title: "Durable",
    description:
      "Corrosion-resistant material polypropylene increases durability and protects the environment",
  },
  {
    title: "100% Leak-tight",
    description: "Complete sealing ensures no leakage",
  },
  {
    title: "Safe and Inspection-friendly",
    description: "Inspection-friendly color orange",
  },
  {
    title: "Favorable Installation",
    description:
      "Modular system ensures easy handling on the construction site",
  },
  {
    title: "Lower Costs",
    description:
      "Lower wage and equipment costs due to weight and assembly advantages",
  },
  {
    title: "Built-in Slope",
    description: "Integrated slope design for optimal flow",
  },
];

// Connection types
const connectionTypes = [
  "Polypropylene smooth pipe",
  "PVC pipe",
  "Cast Iron",
  "GRP pipe",
  "Clay pipe",
  "Corrugate pipe",
];

export default function ManholesPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("hdpe-manholes");

  useEffect(() => {
    // Set page title
    document.title = `Manholes - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Engineered for excellence. Both PP (Polypropylene) and HDPE (High-Density Polyethylene) manholes are widely used in modern drainage and sewage systems, offering durability, efficiency, and ease of installation.",
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
                  {t("manholes.engineeredForExcellence")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                MANH<span className="text-red-500">OLES</span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                {translateManholesText("Both PP (Polypropylene) and HDPE (High-Density Polyethylene) manholes are widely used in modern drainage and sewage systems, offering a range of advantages in terms of durability, efficiency, and ease of installation.", t)}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t("manholes.yearsLifespan")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("manholes.recyclable")}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <video
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/Konti-Hidroplast_3-1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Konti Hidroplast manholes manufacturing video"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">{t("manholes.premiumQuality")}</span>
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
                {translateManholesText("Structural Forms", t)}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>{translateManholesText("By structural form, HDPE and PP manholes can be:", t)}</p>
                <div className="space-y-3">
                  {structuralForms.map((form, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{translateManholesText(form, t)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                {translateManholesText("Key Applications", t)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {applications.slice(0, 8).map((app, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{translateManholesText(app, t)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manholes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#ffffff]">
                {translateManholesText("Manholes Types", t)}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {manholesSpecifications.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setActiveTab(spec.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === spec.id
                      ? "bg-[#1c2d56] text-white shadow-lg"
                      : "text-gray-600 hover:text-[#1c2d56]"
                  }`}
                >
                  {translateManholesText(spec.title, t)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {manholesSpecifications.map((spec) => (
            <div
              key={spec.id}
              className={`${activeTab === spec.id ? "block" : "hidden"} transition-all duration-500`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-[#ffffff] mb-4">
                    {translateManholesText(spec.title, t)}
                  </h3>
                  <p className="text-[#ffffff] mb-6">{translateManholesText(spec.description, t)}</p>

                  {spec.additionalInfo && (
                    <p className="text-[#ffffff] mb-6">{translateManholesText(spec.additionalInfo, t)}</p>
                  )}

                  <div className="space-y-3 mb-8">
                    {spec.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-[#ffffff]">{translateManholesText(feature, t)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={spec.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("manholes.downloadBrochure")}
                    </a>
                  </div>
                </div>

                <div className="relative max-w-md mx-auto lg:mx-0">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src={spec.images[0]}
                      alt={spec.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {translateManholesText("Advantages of KONTI Rigid PP Manholes", t)}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="font-semibold text-[#1c2d56] mb-3">
                  {translateManholesText(advantage.title, t)}
                </h3>
                <p className="text-gray-700 text-sm">{translateManholesText(advantage.description, t)}</p>
              </div>
            ))}
          </div>

          {/* Connection Types */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
              {translateManholesText("Connection Compatibility", t)}
            </h3>
            <p className="text-gray-700 mb-6">
              {translateManholesText("Connection can be made with different kind of pipes:", t)}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {connectionTypes.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{translateManholesText(type, t)}</span>
                </div>
              ))}
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
                {t("manholes.contactTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {t("manholes.contactDescription")}
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
              {t("manholes.contactUs")}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
