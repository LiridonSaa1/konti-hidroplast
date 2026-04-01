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





// Fitting types data
const fittingTypes = (t: any) => [
  {
    id: "injection-molding",
    title: t("ppHmPipes.injectionMolding"),
    description: t("ppHmPipes.injectionMoldingDescription"),
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: t("ppHmPipes.injectionMoldingElbow"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/01-Injection_molding_elbow-1.pdf",
      },
      {
        name: t("ppHmPipes.injectionMoldingTee"),
        pdf: null,
      },
      {
        name: t("ppHmPipes.injectionMoldingYBranch"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/03-Injection-molding-Y-branch-1.pdf",
      },
      {
        name: t("ppHmPipes.injectionMoldingYBranchReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/04-Injection-molding-Y-branch-Reducer-1.pdf",
      },
      {
        name: t("ppHmPipes.injectionMoldingTeeReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/05-Injection-molding-TEE-Reducer-1.pdf",
      },
      {
        name: t("ppHmPipes.injectionMoldingReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/06-Injection-molding-Reducer-1.pdf",
      },
    ],
  },
  {
    id: "welded-fittings",
    title: t("ppHmPipes.weldedFittings"),
    description: t("ppHmPipes.weldedFittingsDescription"),
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: t("ppHmPipes.weldedElbow11"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/07-Welded-elbow-11-1.pdf",
      },
      {
        name: t("ppHmPipes.weldedElbow22"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/08-Welded-elbow-22.pdf",
      },
      {
        name: t("ppHmPipes.weldedElbow30"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/09-Welded-elbow-30.pdf",
      },
      {
        name: t("ppHmPipes.weldedElbow45"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/10-Welded-elbow-45.pdf",
      },
      {
        name: t("ppHmPipes.weldedElbow60"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/11-Welded-elbow-60-1.pdf",
      },
      {
        name: t("ppHmPipes.weldedElbow90"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/12-Welded-elbow-90-1.pdf",
      },
      {
        name: t("ppHmPipes.weldedTee"),
        pdf: null,
      },
      {
        name: t("ppHmPipes.weldedYBranch"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/14-Welded-Y-branch-1.pdf",
      },
      {
        name: t("ppHmPipes.weldedTeeReducer"),
        pdf: null,
      },
      {
        name: t("ppHmPipes.weldedYBranchReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/16-Welded-Y-branch-Reducer-1.pdf",
      },
      {
        name: t("ppHmPipes.weldedReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/17-Welded-Reducer-1.pdf",
      },
      {
        name: t("ppHmPipes.weldedEndCap"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/18-Welded-End-cap-1.pdf",
      },
    ],
  },
  {
    id: "connection-components",
    title: t("ppHmPipes.connectionComponents"),
    description: t("ppHmPipes.connectionComponentsDescription"),
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: t("ppHmPipes.socket"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/19-Socket-1.pdf",
      },
      {
        name: t("ppHmPipes.flexAdapter"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/20-Flex-Adapter-1.pdf",
      },
      {
        name: t("ppHmPipes.gasket"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/21-Gasket-1.pdf",
      },
    ],
  },
];

function PPHMPipesAndFittingsPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("pp-hm");
  const [activeFittingTab, setActiveFittingTab] = useState("injection-molding");
  const [activeFittingTabIndex, setActiveFittingTabIndex] = useState(0);
  const [activeProductTab, setActiveProductTab] = useState<"hdpe" | "pphm" | "spiral" | "ppml" | "manholes" | "drainage">("pphm");
  const productTabs = [
    { id: "hdpe", label: t("nav.products.hdpeKontiKan") },
    { id: "pphm", label: t("nav.products.pphmKontiKan") },
    { id: "spiral", label: t("nav.products.spiralKontiKan") },
    { id: "ppml", label: t("nav.products.ppMlCompact") },
    { id: "manholes", label: t("nav.products.manholes") },
    { id: "drainage", label: t("nav.products.drainage") },
  ];
  const nextFittingTab = () => {
    const nextIndex =
      activeFittingTabIndex === fittingTypes(t).length - 1
        ? 0
        : activeFittingTabIndex + 1;
    setActiveFittingTabIndex(nextIndex);
    setActiveFittingTab(fittingTypes(t)[nextIndex].id);
  };

  const prevFittingTab = () => {
    const prevIndex =
      activeFittingTabIndex === 0
        ? fittingTypes(t).length - 1
        : activeFittingTabIndex - 1;
    setActiveFittingTabIndex(prevIndex);
    setActiveFittingTab(fittingTypes(t)[prevIndex].id);
  };

  useEffect(() => {
    // Set page title
    document.title = `PP HM Konti Kan Sewage Pipe - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "PP (Polypropylene) double-wall corrugated pipes are widely used for drainage, sewage, and stormwater management systems due to their excellent material properties and structural design.",
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
                  {t("ppHmPipes.engineeredForExcellence")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                {t("ppHmPipes.ppHmKontiKan")}
                <br />
                <span className="text-red-500">{t("ppHmPipes.sewagePipe").split(" ")[0]} </span>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {t("ppHmPipes.sewagePipe").split(" ")[1]}
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                {t("ppHmPipes.heroDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t("ppHmPipes.yearsLifespan")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("ppHmPipes.recyclable")}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/attached_assets/PPHMID-800x489_1755356237816.png"
                  alt={t("ppHmPipes.ppHmKontiKanSewagePipe")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">{t("ppHmPipes.premiumQuality")}</span>
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
              {t("ppHmPipes.technicalSpecifications")}
            </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                {t("ppHmPipes.mainDescription")}
              </p>
              <p className="text-lg leading-relaxed">
                - {t("ppHmPipes.standardEN13476")}
              </p>
              <p className="text-lg leading-relaxed">
                - {t("ppHmPipes.standardISO21138")}
              </p>
              <p className="text-lg leading-relaxed">
                - {t("ppHmPipes.standardASTM")}
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

export default PPHMPipesAndFittingsPage;
