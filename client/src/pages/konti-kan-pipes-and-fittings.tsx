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

// Konti Kan Pipe specifications data
const getPipeSpecifications = (t: any) => [
  {
    id: "konti-kan",
    title: t("sewagePipes.hdpeKontiKan"),
    description: t("sewagePipes.heroDescription"),
    features: [
      t("sewagePipes.stiffnessRatings"),
      t("sewagePipes.dimensionRange"),
      t("sewagePipes.color"),
      t("sewagePipes.smoothInnerSurface"),
      t("sewagePipes.highFlowCapacity"),
      t("sewagePipes.serviceLife"),
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
const getFittingTypes = (t: any) => [
  {
    id: "injection-molding",
    title: t("sewagePipes.injectionMolding"),
    description: t("sewagePipes.injectionMoldingDescription"),
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: t("sewagePipes.injectionMoldingElbow"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/01-Injection_molding_elbow.pdf",
      },
      {
        name: t("sewagePipes.injectionMoldingYBranch"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/03-Injection-molding-Y-branch.pdf",
      },
      {
        name: t("sewagePipes.injectionMoldingYBranchReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/04-Injection-molding-Y-branch-Reducer.pdf",
      },
      {
        name: t("sewagePipes.injectionMoldingTeeReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/05-Injection-molding-TEE-Reducer.pdf",
      },
      {
        name: t("sewagePipes.injectionMoldingReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/06-Injection-molding-Reducer.pdf",
      },
    ],
  },
  {
    id: "welded-fittings",
    title: t("sewagePipes.weldedFittings"),
    description: t("sewagePipes.weldedFittingsDescription"),
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: t("sewagePipes.weldedElbow11"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/07-Welded-elbow-11.pdf",
      },
      {
        name: t("sewagePipes.weldedElbow60"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/11-Welded-elbow-60.pdf",
      },
      {
        name: t("sewagePipes.weldedElbow90"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/12-Welded-elbow-90.pdf",
      },
      {
        name: t("sewagePipes.weldedYBranch"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/14-Welded-Y-branch.pdf",
      },
      {
        name: t("sewagePipes.weldedYBranchReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/16-Welded-Y-branch-Reducer.pdf",
      },
      {
        name: t("sewagePipes.weldedReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/17-Welded-Reducer.pdf",
      },
      {
        name: t("sewagePipes.weldedEndCap"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/18-Welded-End-cap.pdf",
      },
    ],
  },
  {
    id: "connection-components",
    title: t("sewagePipes.connectionComponents"),
    description: t("sewagePipes.connectionComponentsDescription"),
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: t("sewagePipes.socket"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/19-Socket.pdf",
      },
      {
        name: t("sewagePipes.flexAdapter"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/20-Flex-Adapter.pdf",
      },
      {
        name: t("sewagePipes.gasket"),
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
      activeFittingTabIndex === getFittingTypes(t).length - 1
        ? 0
        : activeFittingTabIndex + 1;
    setActiveFittingTabIndex(nextIndex);
    setActiveFittingTab(getFittingTypes(t)[nextIndex].id);
  };

  const prevFittingTab = () => {
    const prevIndex =
      activeFittingTabIndex === 0
        ? getFittingTypes(t).length - 1
        : activeFittingTabIndex - 1;
    setActiveFittingTabIndex(prevIndex);
    setActiveFittingTab(getFittingTypes(t)[prevIndex].id);
  };

  useEffect(() => {
    // Set page title
    document.title = `${t("sewagePipes.hdpeKontiKan")} ${t("sewagePipes.sewagePipe")} - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        t("sewagePipes.heroDescription"),
      );
    }
  }, [t, companyInfo.companyName]);

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
                  {t("sewagePipes.engineeredForExcellence")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                {t("sewagePipes.hdpeKontiKan")}
                <br />
                <span className="text-red-500">{t("sewagePipes.sewagePipe")}</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {t("sewagePipes.sewagePipe")}
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                {t("sewagePipes.heroDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t("sewagePipes.yearsLifespan")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("sewagePipes.recyclable")}</span>
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
                  aria-label={`${t("sewagePipes.hdpeKontiKan")} ${t("sewagePipes.sewagePipe")} video`}
                >
                  <source
                    src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/Konti-Hidroplast_2-1.mp4"
                    type="video/mp4"
                  />
                  Sorry, your browser doesn't support embedded videos.
                </video>
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">{t("sewagePipes.premiumQuality")}</span>
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
                {t("sewagePipes.technicalSpecifications")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                {t("sewagePipes.mainDescription")}
              </p>
              <p className="text-lg leading-relaxed">
                {t("sewagePipes.commonStandards")}
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
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/Konti_kan_cevki-tabela_za_dimenzii_i_tezini-en.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("sewagePipes.downloadSpecs")}
                  </a>
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-Konti-Kan-siv_EN-2021-so-korekcii-MART-2021-2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("sewagePipes.downloadBrochure")}
                  </a>
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

      {/* Konti Kan Fittings Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("sewagePipes.kontiKanFittings")}
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
                {getFittingTypes(t)[activeFittingTabIndex].title}
              </h3>
              <div className="flex justify-center space-x-1 mt-3">
                {getFittingTypes(t).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveFittingTabIndex(index);
                      setActiveFittingTab(getFittingTypes(t)[index].id);
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
          {getFittingTypes(t).map((fitting) => (
            <div
              key={fitting.id}
              className={`${activeFittingTab === fitting.id ? "block" : "hidden"} transition-all duration-500`}
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Left Column - Fittings List */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">
                      {fitting.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{fitting.description}</p>

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
                              {item.name}
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
                {t("sewagePipes.contactTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {t("sewagePipes.contactDescription")}
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
              {t("sewagePipes.contactUs")}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default KontiKanPipesAndFittingsPage;
