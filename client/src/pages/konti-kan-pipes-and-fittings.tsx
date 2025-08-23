import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  ChevronDown,
  Download,
  Play,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Sewage pipes translation helper function
const translateSewagePipeText = (text: string, t: any) => {
  const translations: { [key: string]: string } = {
    // Page titles and headers
    "HDPE Konti Kan": t("sewagePipes.hdpeKontiKanTitle"),
    "HDPE Konti Kan Pipes": t("sewagePipes.hdpeKontiKanPipes"),
    "Konti Kan Fittings": t("sewagePipes.kontiKanFittings"),
    "HDPE Konti Kan Manufacturing": t("sewagePipes.hdpeKontiKanManufacturing"),
    
    // Descriptions
    "HDPE corrugated sewage pipes excel in durability, hydraulic efficiency, and structural performance, making them a preferred choice for sewage and drainage systems.": t("sewagePipes.heroDescription"),
    "HDPE (High-Density Polyethylene) corrugated pipes are widely used in sewage and drainage systems due to their excellent performance characteristics.": t("sewagePipes.pipeDescription"),
    
    // Technical specifications and features
    "Common stiffness ratings: SN 4, SN 6, SN 8, or higher": t("sewagePipes.stiffnessRatings"),
    "Dimension range: DN/OD 110-1200mm": t("sewagePipes.dimensionRange"),
    "Color: Outer black with inner light grey": t("sewagePipes.color"),
    "Smooth Inner Surface: minimizes friction, allowing efficient flow": t("sewagePipes.smoothInnerSurface"),
    "High flow capacity due to low Manning's coefficient (0.009)": t("sewagePipes.highFlowCapacity"),
    "50+ years in standard operating conditions": t("sewagePipes.serviceLife"),
    
    // Material properties
    "High-Density Polyethylene (HDPE)": t("sewagePipes.hdpeMaterial"),
    "Lightweight yet durable.": t("sewagePipes.lightweightDurable"),
    "Excellent chemical resistance, making it ideal for sewage applications.": t("sewagePipes.chemicalResistance"),
    "Non-corrosive and resistant to biological and chemical attacks from wastewater.": t("sewagePipes.nonCorrosive"),
    
    // Applications
    "Municipal sewage systems.": t("sewagePipes.municipalSewage"),
    "Stormwater drainage.": t("sewagePipes.stormwaterDrainage"),
    "Industrial wastewater systems.": t("sewagePipes.industrialWastewater"),
    "Agricultural drainage.": t("sewagePipes.agriculturalDrainage"),
    
    // Characteristics
    "Corrugated Outer Wall: enhances structural strength while reducing material weight.": t("sewagePipes.corrugatedOuterWall"),
    "High resistance to UV degradation.": t("sewagePipes.uvResistance"),
    "Flexible and resistant to cracking.": t("sewagePipes.flexibleResistant"),
    "Easier to handle and transport compared to concrete or steel.": t("sewagePipes.easyHandling"),
    "Operates effectively within a temperature range of -40°C to +60°C.": t("sewagePipes.temperatureRange"),
    "Fully recyclable at the end of its service life.": t("sewagePipes.fullyRecyclable"),
    
    // Fittings
    "Injection Molding": t("sewagePipes.injectionMolding"),
    "Precision injection molded fittings for reliable connections": t("sewagePipes.injectionMoldingDescription"),
    "Welded Fittings": t("sewagePipes.weldedFittings"),
    "High-strength welded fittings for permanent connections": t("sewagePipes.weldedFittingsDescription"),
    "Connection Components": t("sewagePipes.connectionComponents"),
    "Essential components for secure pipe connections": t("sewagePipes.connectionComponentsDescription"),
    
    // Individual fittings
    "Injection molding elbow": t("sewagePipes.injectionMoldingElbow"),
    "Injection molding Y-branch": t("sewagePipes.injectionMoldingYBranch"),
    "Injection molding Y-branch Reducer": t("sewagePipes.injectionMoldingYBranchReducer"),
    "Injection molding TEE Reducer": t("sewagePipes.injectionMoldingTeeReducer"),
    "Injection molding Reducer": t("sewagePipes.injectionMoldingReducer"),
    "Welded elbow 11": t("sewagePipes.weldedElbow11"),
    "Welded elbow 60": t("sewagePipes.weldedElbow60"),
    "Welded elbow 90": t("sewagePipes.weldedElbow90"),
    "Welded Y-branch": t("sewagePipes.weldedYBranch"),
    "Welded Y-branch Reducer": t("sewagePipes.weldedYBranchReducer"),
    "Welded Reducer": t("sewagePipes.weldedReducer"),
    "Welded End cap": t("sewagePipes.weldedEndCap"),
    "Socket": t("sewagePipes.socket"),
    "Flex Adapter": t("sewagePipes.flexAdapter"),
    "Gasket": t("sewagePipes.gasket"),
    
    // Section headers
    "Material Properties:": t("sewagePipes.materialProperties"),
    "Application:": t("sewagePipes.application"),
    "Characteristics:": t("sewagePipes.characteristics"),
  };
  return translations[text] || text;
};

// Konti Kan Pipe specifications data
const pipeSpecifications = [
  {
    id: "konti-kan",
    title: "HDPE Konti Kan",
    description:
      "HDPE corrugated sewage pipes excel in durability, hydraulic efficiency, and structural performance, making them a preferred choice for sewage and drainage systems.",
    features: [
      "Common stiffness ratings: SN 4, SN 6, SN 8, or higher",
      "Dimension range: DN/OD 110-1200mm",
      "Color: Outer black with inner light grey",
      "Smooth Inner Surface: minimizes friction, allowing efficient flow",
      "High flow capacity due to low Manning's coefficient (0.009)",
      "50+ years in standard operating conditions",
    ],
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/konti-kan-1.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/Konti_kan_cevki-tabela_za_dimenzii_i_tezini-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-Konti-Kan-siv_EN-2021-so-korekcii-MART-2021-2.pdf",
  },
];

// Fitting types data
const fittingTypes = [
  {
    id: "injection-molding",
    title: "Injection Molding",
    description: "Precision injection molded fittings for reliable connections",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: "Injection molding elbow",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/01-Injection_molding_elbow.pdf",
      },
      {
        name: "Injection molding Y-branch",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/03-Injection-molding-Y-branch.pdf",
      },
      {
        name: "Injection molding Y-branch Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/04-Injection-molding-Y-branch-Reducer.pdf",
      },
      {
        name: "Injection molding TEE Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/05-Injection-molding-TEE-Reducer.pdf",
      },
      {
        name: "Injection molding Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/06-Injection-molding-Reducer.pdf",
      },
    ],
  },
  {
    id: "welded-fittings",
    title: "Welded Fittings",
    description: "High-strength welded fittings for permanent connections",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: "Welded elbow 11",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/07-Welded-elbow-11.pdf",
      },
      {
        name: "Welded elbow 60",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/11-Welded-elbow-60.pdf",
      },
      {
        name: "Welded elbow 90",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/12-Welded-elbow-90.pdf",
      },
      {
        name: "Welded Y-branch",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/14-Welded-Y-branch.pdf",
      },
      {
        name: "Welded Y-branch Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/16-Welded-Y-branch-Reducer.pdf",
      },
      {
        name: "Welded Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/17-Welded-Reducer.pdf",
      },
      {
        name: "Welded End cap",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/18-Welded-End-cap.pdf",
      },
    ],
  },
  {
    id: "connection-components",
    title: "Connection Components",
    description: "Essential components for secure pipe connections",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: "Socket",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/19-Socket.pdf",
      },
      {
        name: "Flex Adapter",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/20-Flex-Adapter.pdf",
      },
      {
        name: "Gasket",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/21-Gasket.pdf",
      },
    ],
  },
];

function KontiKanPipesAndFittingsPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("konti-kan");
  const [activeFittingTab, setActiveFittingTab] = useState("injection-molding");
  const [activeFittingTabIndex, setActiveFittingTabIndex] = useState(0);

  const nextFittingTab = () => {
    const nextIndex =
      activeFittingTabIndex === fittingTypes.length - 1
        ? 0
        : activeFittingTabIndex + 1;
    setActiveFittingTabIndex(nextIndex);
    setActiveFittingTab(fittingTypes[nextIndex].id);
  };

  const prevFittingTab = () => {
    const prevIndex =
      activeFittingTabIndex === 0
        ? fittingTypes.length - 1
        : activeFittingTabIndex - 1;
    setActiveFittingTabIndex(prevIndex);
    setActiveFittingTab(fittingTypes[prevIndex].id);
  };

  useEffect(() => {
    // Set page title
    document.title = `HDPE Konti Kan Sewage Pipe - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "HDPE corrugated sewage pipes excel in durability, hydraulic efficiency, and structural performance, making them a preferred choice for sewage and drainage systems.",
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
                HDPE KONTI KAN
                <br />
                <span className="text-red-500">SEWAGE</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  PIPE
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                HDPE corrugated sewage pipes excel in durability, hydraulic
                efficiency, and structural performance, making them a preferred
                choice for sewage and drainage systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    50+ Years Lifespan
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">100% Recyclable</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="HDPE Konti Kan Sewage Pipe video"
                >
                  <source
                    src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/Konti-Hidroplast_2-1.mp4"
                    type="video/mp4"
                  />
                  Sorry, your browser doesn't support embedded videos.
                </video>
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
                HDPE corrugated sewage pipes excel in durability, hydraulic
                efficiency, and structural performance, making them a preferred
                choice for sewage and drainage systems. Their lightweight,
                flexibility, and chemical resistance further enhance their
                suitability for a wide range of applications.
              </p>
              <p className="text-lg leading-relaxed">
                Common standards for HDPE corrugated pipes:{" "}
                <strong>EN 13476-1</strong> and <strong>EN 13476-3</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HDPE Konti Kan Pipes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                HDPE Konti Kan Pipes
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  HDPE Konti Kan
                </h3>
                <p className="text-white mb-6">
                  HDPE (High-Density Polyethylene) corrugated pipes are widely
                  used in sewage and drainage systems due to their excellent
                  performance characteristics.
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  Material Properties:
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "High-Density Polyethylene (HDPE)",
                    "Lightweight yet durable.",
                    "Excellent chemical resistance, making it ideal for sewage applications.",
                    "Non-corrosive and resistant to biological and chemical attacks from wastewater.",
                  ].map((property, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{translateSewagePipeText(property, t)}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Application:
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "Municipal sewage systems.",
                    "Stormwater drainage.",
                    "Industrial wastewater systems.",
                    "Agricultural drainage.",
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{translateSewagePipeText(application, t)}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Characteristics:
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    "Common stiffness ratings: SN 4, SN 6, SN 8, or higher, depending on the application.",
                    "Dimension range: DN/OD 110-1200mm",
                    "Color: Outer black with inner light grey",
                    "Smooth Inner Surface: minimizes friction, allowing efficient flow of sewage and wastewater.",
                    "High flow capacity due to low Manning's coefficient (commonly 0.009).",
                    "Corrugated Outer Wall: enhances structural strength while reducing material weight.",
                    "High resistance to UV degradation.",
                    "Flexible and resistant to cracking.",
                    "50+ years in standard operating conditions.",
                    "Easier to handle and transport compared to concrete or steel.",
                    "Operates effectively within a temperature range of -40°C to +60°C.",
                    "Fully recyclable at the end of its service life.",
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{translateSewagePipeText(characteristic, t)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/Konti_kan_cevki-tabela_za_dimenzii_i_tezini-en.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Specs
                  </a>
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-Konti-Kan-siv_EN-2021-so-korekcii-MART-2021-2.pdf"
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
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/konti-kan-1.jpg"
                      alt="HDPE Konti Kan Pipes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="/attached_assets/Konti-Hidroplast-Proizvodstvo-27-1 (1)_1755354410219.jpg"
                      alt="HDPE Konti Kan Manufacturing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Konti Kan Fittings Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Konti Kan Fittings
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Fitting Tab Slider - matching certificates page design */}
          <div className="flex items-center justify-center mb-12">
            <button
              onClick={prevFittingTab}
              className="p-2 rounded-full  text-white bg-[#1c2d56] hover:bg-[#1c2d56]/90 transition-colors mr-4"
              data-testid="konti-fitting-tab-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-4 min-w-[300px] text-center">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-1">
                {translateSewagePipeText(fittingTypes[activeFittingTabIndex].title, t)}
              </h3>
              <div className="flex justify-center space-x-1 mt-3">
                {fittingTypes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveFittingTabIndex(index);
                      setActiveFittingTab(fittingTypes[index].id);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeFittingTabIndex
                        ? "bg-[#1c2d56]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    data-testid={`konti-fitting-tab-dot-${index}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextFittingTab}
              className="p-2 rounded-full  text-white bg-[#1c2d56] hover:bg-[#1c2d56]/90 transition-colors ml-4"
              data-testid="konti-fitting-tab-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Fitting Content */}
          {fittingTypes.map((fitting) => (
            <div
              key={fitting.id}
              className={`${activeFittingTab === fitting.id ? "block" : "hidden"} transition-all duration-500`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Left Column - Fittings List */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">
                      {translateSewagePipeText(fitting.title, t)}
                    </h3>
                    <p className="text-gray-600 mb-6">{translateSewagePipeText(fitting.description, t)}</p>

                    <div className="space-y-3">
                      {fitting.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <a
                            href={item.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 w-full text-[#1c2d56] hover:text-[#1c2d56]"
                          >
                            <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 bg-[#1c2d56]">
                              <Download className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-medium">
                              {translateSewagePipeText(item.name, t)}
                            </span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Fitting Image */}
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden p-8 flex items-center justify-center">
                      <img
                        src={fitting.image}
                        alt={fitting.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
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

export default KontiKanPipesAndFittingsPage;
