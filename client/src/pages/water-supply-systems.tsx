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

// PE Pipe specifications data with translations
const getPipeSpecifications = (t: any) => [
  {
    id: "pe-80",
    title: t("waterSupply.pe80"),
    description: t("waterSupply.pe80Description"),
    features: [
      t("waterSupply.designStress"),
      t("waterSupply.mrs"),
      t("waterSupply.factorOfSafety"),
      t("waterSupply.color"),
      t("waterSupply.operatingTemperature"),
      t("waterSupply.serviceLife"),
    ],
    image: "/attached_assets/PE80-2-min-400x300 (1)_1755267337767.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/pe-80-tabela-dimenzii-en-1.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
  },
  {
    id: "pe-100",
    title: t("waterSupply.pe100"),
    description: t("waterSupply.pe100Description"),
    features: [
      t("waterSupply.pe100DesignStress"),
      t("waterSupply.pe100MRS"),
      t("waterSupply.pe100FactorOfSafety"),
      t("waterSupply.pe100Color"),
      t("waterSupply.pe100OperatingTemp"),
      t("waterSupply.pe100PressureRatings"),
    ],
    image:
      "/attached_assets/Gogo_20240703_8990-Edit_1-400x400 (1)_1755267345589.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/pe-100-tabela-za-dimenzii-i-pritisoci-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
  },
  {
    id: "pe-100-rc",
    title: t("waterSupply.pe100RC"),
    description: t("waterSupply.pe100RCDescription"),
    features: [
      t("waterSupply.pe100RCMaterial"),
      t("waterSupply.pe100RCStandards"),
      t("waterSupply.pe100RCProjectElongation"),
      t("waterSupply.pe100RCFactorOfSafety"),
      t("waterSupply.pe100RCColor"),
      t("waterSupply.pe100RCServiceLife"),
    ],
    image:
      "/attached_assets/Gogo_20240703_9065-Edit_1-min-400x400_1755267373881.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/tabela_100_RC-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-PE100-RC_EN_2021_compressed.pdf",
  },
];

// Fitting types data with translations
const getFittingTypes = (t: any) => [
  {
    id: "butt-welding",
    title: t("waterSupply.buttWelding"),
    description: "",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Butt-Wealding-min.png",
    items: [
      {
        name: t("waterSupply.fittingStubEnds"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/1.PE_Fitinzi_-_Adapter_flansa-1.pdf",
      },
      {
        name: t("waterSupply.fittingFFPiece"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/2.PE_Fitinzi_-_FF_Parce-1.pdf",
      },
      {
        name: t("waterSupply.fittingMetalFlange"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/3.PE_Fitinzi_-_Flansa-1.pdf",
      },
      {
        name: t("waterSupply.fittingElbow11"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/4.PE_Fitinzi_-_Koleno_11-22-30-1.pdf",
      },
      {
        name: t("waterSupply.fittingElbow45"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/5.PE_Fitinzi_-_Koleno_45-1.pdf",
      },
      {
        name: t("waterSupply.fittingElbow60"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/6.PE_Fitinzi_-_Koleno_60-1.pdf",
      },
      {
        name: t("waterSupply.fittingElbow90"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/7.PE_Fitinzi_-_Koleno_90-1.pdf",
      },
      {
        name: t("waterSupply.fittingConcentricReducer"),
        pdf: null,
      },
      {
        name: t("waterSupply.fittingEndCup"),
        pdf: null,
      },
      {
        name: t("waterSupply.fittingTeeOutlet"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/8.PE_Fitinzi_-_Te_stek_nepojacan-1.pdf",
      },
      {
        name: t("waterSupply.fittingTeeOutletReducer"),
        pdf: null,
      },
    ],
  },
  {
    id: "mechanical-fittings",
    title: t("waterSupply.mechanicalFittings"),
    description: t("waterSupply.mechanicalFittingsDescription"),
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Mechanical-fittings-min.png",
    items: [
      {
        name: t("waterSupply.coupling"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/1-spojka.pdf",
      },
      {
        name: t("waterSupply.reducerCoupling"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/2-reducir-spojka.pdf",
      },
      {
        name: t("waterSupply.adapterCouplingMale"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/3-adapter-spojka-m.pdf",
      },
      {
        name: t("waterSupply.adapterCouplingFemale"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/stopna.pdf",
      },
      {
        name: t("waterSupply.lineEnd"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/4-stopna.pdf",
      },
      {
        name: t("waterSupply.reducingCoupling90"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/5-te-reducir-90.pdf",
      },
      {
        name: t("waterSupply.teeMaleThread90"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/6-te-stek-90-so-navoj-m.pdf",
      },
      {
        name: t("waterSupply.teeFemaleThread90"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/7-te-stek-90-so-navoj-f.pdf",
      },
      {
        name: t("waterSupply.equalTee90"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/8-te-stek-90.pdf",
      },
      {
        name: t("waterSupply.elbow90"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/9-koleno-90.pdf",
      },
      {
        name: t("waterSupply.2BoltSaddle"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/12-ogrlica-so-2-navrtki.pdf",
      },
      {
        name: t("waterSupply.4BoltSaddleFemaleThread"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/13-ogrlica-so-4-navrtki-so-zajaknat-nergosuvacki-metalen-prsten.pdf",
      },
      {
        name: t("waterSupply.6BoltSaddleFemaleThread"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/14-ogrlica-so-6-navrtki-so-zajaknat-nergosuvacki-metalen-prsten.pdf",
      },
    ],
  },
  {
    id: "electrofusion-fittings",
    title: t("waterSupply.electrofusionFittings"),
    description: t("waterSupply.electrofusionFittingsDescription"),
    image: "/attached_assets/Electrofusion-fittings-min_1755268811656.png",
    items: [
      {
        name: t("waterSupply.electrofusionSocket"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/1_str_Elektrofuzioni_fitinzi-elektrofuzionen_muf.pdf",
      },
      {
        name: t("waterSupply.electrofusionTeeOutlet"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/2_str_Elektrofuzioni_fitinzi-elektrofuzionen_te_stek.pdf",
      },
      {
        name: t("waterSupply.electrofusionTeeReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/3_str_Elektrofuzioni_fitinzi-elektrofuzionen_te_stek_reducir.pdf",
      },
      {
        name: t("waterSupply.electrofusionElbow45"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/4_str_Elektrofuzioni_fitinzi-elektrofuziono_koleno_45.pdf",
      },
      {
        name: t("waterSupply.electrofusionElbow90"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/5_str_Elektrofuzioni_fitinzi-elektrofuziono_koleno_90.pdf",
      },
      {
        name: t("waterSupply.electrofusionReducer"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/6_str_Elektrofuzioni_fitinzi-elektrofuzionen_reducir.pdf",
      },
      {
        name: t("waterSupply.electrofusionEndCap"),
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/7_str_Elektrofuzioni_fitinzi-elektrofuziono_Cep.pdf",
      },
    ],
  },
];

function WaterSupplySystemsPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("pe-80");
  const [activeFittingTab, setActiveFittingTab] = useState("butt-welding");
  const [activeFittingTabIndex, setActiveFittingTabIndex] = useState(0);

  // Get translated data
  const pipeSpecifications = getPipeSpecifications(t);
  const fittingTypes = getFittingTypes(t);

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
        ? 0
        : fittingTypes.length - 1;
    setActiveFittingTabIndex(prevIndex);
    setActiveFittingTab(fittingTypes[prevIndex].id);
  };

  useEffect(() => {
    // Set page title
    document.title = `${t("waterSupply.waterSupplySystem")} - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        t("waterSupply.heroDescription"),
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
                  {t("waterSupply.engineeredForExcellence")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                {t("waterSupply.waterSupplySystem")}
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                {t("waterSupply.heroDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t("waterSupply.yearsLifespan")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("waterSupply.recyclable")}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <video
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/Konti-Hidroplast_1-1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Konti Hidroplast water supply systems manufacturing video"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">{t("productPages.premiumQuality")}</span>
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
                {t("waterSupply.technicalSpecifications")}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {t("waterSupply.colorDescription")}
                </p>
                <p>
                  {t("waterSupply.diameterRange")}
                </p>
                <p>
                  {t("waterSupply.smallPipesDescription")}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                {t("waterSupply.generalProperties")}
              </h3>
              <div className="space-y-3">
                {[
                  t("waterSupply.lowSpecificWeight"),
                  t("waterSupply.flexibility"),
                  t("waterSupply.goodChemicalResistance"),
                  t("waterSupply.excellentWeldingOptions"),
                  t("waterSupply.smoothInternalSurface"),
                  t("waterSupply.suitableForDrinkingWater"),
                  t("waterSupply.longLifespan"),
                  t("waterSupply.recyclingPossibility"),
                ].map((property, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{property}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PE Water-Supply Pipes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#ffffff]">
                {t("waterSupply.peWaterSupplyPipes")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {pipeSpecifications.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setActiveTab(spec.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === spec.id
                      ? "bg-[#1c2d56] text-white shadow-lg"
                      : "text-gray-600 hover:text-[#1c2d56]"
                  }`}
                >
                  {spec.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {pipeSpecifications.map((spec) => (
            <div
              key={spec.id}
              className={`${activeTab === spec.id ? "block" : "hidden"} transition-all duration-500`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-[#ffffff] mb-4">
                    {spec.title}
                  </h3>
                  <p className="text-[#ffffff] mb-6">{spec.description}</p>

                  <div className="space-y-3 mb-8">
                    {spec.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-[#ffffff]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={spec.specifications}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-[#ffffff] rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("waterSupply.downloadSpecs")}
                    </a>
                    <a
                      href={spec.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("waterSupply.downloadBrochure")}
                    </a>
                  </div>
                </div>

                <div className="relative max-w-md mx-auto lg:mx-0">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src={spec.image}
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
      {/* PE Fittings Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("waterSupply.peFittings")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Fitting Tab Slider - matching certificates page design */}
          <div className="flex items-center justify-center mb-12">
            <button
              onClick={prevFittingTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors mr-4"
              data-testid="fitting-tab-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-4 min-w-[300px] text-center">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-1">
                {fittingTypes[activeFittingTabIndex].title}
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
                    data-testid={`fitting-tab-dot-${index}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextFittingTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors ml-4"
              data-testid="fitting-tab-next"
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
                      {fitting.title}
                    </h3>

                    <div className="space-y-3">
                      {fitting.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          {item.pdf ? (
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
                          ) : (
                            <div className="flex items-center gap-3 w-full text-gray-600">
                              <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center flex-shrink-0">
                                <Download className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-sm">{item.name}</span>
                            </div>
                          )}
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
              {t("productPages.needMoreInfo")} {t("waterSupply.waterSupplySystem").toLowerCase()} {t("productPages.solutions")}? {t("productPages.contactExperts")}.
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

export default WaterSupplySystemsPage;
