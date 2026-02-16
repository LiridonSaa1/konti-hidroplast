import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const tabs = [
  { id: "tab1", labelKey: "trenchless.tab1Label" },
  { id: "tab2", labelKey: "trenchless.tab2Label" },
];

const galleryImages = [
  { src: "/attached_assets/trenchless-gallery-01.png", alt: "Jacking Project 1" },
  { src: "/attached_assets/trenchless-gallery-02.png", alt: "Jacking Project 2" },
  { src: "/attached_assets/trenchless-gallery-03.png", alt: "Jacking Project 3" },
  { src: "/attached_assets/trenchless-gallery-04.jpg", alt: "Jacking Project 4" },
  { src: "/attached_assets/trenchless-gallery-05.jpg", alt: "Jacking Project 5" },
  { src: "/attached_assets/trenchless-gallery-06.jpg", alt: "Jacking Project 6" },
  { src: "/attached_assets/trenchless-gallery-07.jpg", alt: "Jacking Project 7" },
  { src: "/attached_assets/trenchless-gallery-08.jpg", alt: "Jacking Project 8" },
  { src: "/attached_assets/trenchless-gallery-09.jpg", alt: "Jacking Project 9" },
];

const dataSheets = [
  "GRP Coupling & CC Jacking Pipe Data Sheet (LOAD BASE)",
  "GRP Coupling & CC Jacking Pipe Data Sheet (SN BASE)",
  "GRP Coupling & FW Jacking Pipe Data Sheet (LOAD BASE)",
  "GRP Coupling & FW Jacking Pipe Data Sheet (SN BASE)",
  "SS Coupling & CC Jacking Pipe Data Sheet (LOAD BASE)",
  "SS Coupling & CC Jacking Pipe Data Sheet (SN BASE)",
  "SS Coupling & FW Jacking Pipe Data Sheet (LOAD BASE)",
  "SS Coupling & FW Jacking Pipe Data Sheet (SN BASE)",
  "SS Coupling & HW Jacking Pipe Data Sheet (SN BASE)",
];

function TrenchlessSystemsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    document.title = `${t("trenchless.pageTitle")} - Urban Rohr`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("trenchless.heroDesc"));
    }
  }, [t]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1c2d56] via-[#1c2d56] to-[#2a4a8a] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef4444]/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {t("trenchless.heroTitle")}
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                {t("trenchless.heroDesc")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-5 h-5 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t("trenchless.badge1")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-5 h-5 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t("trenchless.badge2")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-5 h-5 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t("trenchless.badge3")}</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/attached_assets/trenchless-hero.jpg"
                alt={t("trenchless.heroTitle")}
                className="max-w-sm w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 text-sm font-semibold tracking-wider transition-all duration-300 border-b-[3px] ${
                    activeTab === tab.id
                      ? "text-blue-900 border-blue-900"
                      : "text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300"
                  }`}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TAB 1 - Product Description */}
      <div className={activeTab === "tab1" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1">
                <h2 className="text-4xl font-bold text-[#1c2d56] mb-6 uppercase tracking-wide">
                  JACKING &amp; RE-LINING
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("trenchless.tab1ShortDesc")}
                </p>
              </div>
              <div className="lg:col-span-2">
                {/* Product Thumbnails */}
                <div className="flex gap-3 mb-6">
                  <img src="/attached_assets/trenchless-thumb-01.jpg" alt="View 1" className="w-28 h-20 object-cover rounded" />
                  <img src="/attached_assets/trenchless-thumb-02.jpg" alt="View 2" className="w-28 h-20 object-cover rounded" />
                  <img src="/attached_assets/trenchless-thumb-03.png" alt="View 3" className="w-28 h-20 object-cover rounded" />
                  <img src="/attached_assets/trenchless-thumb-04.png" alt="View 4" className="w-28 h-20 object-cover rounded" />
                  <img src="/attached_assets/trenchless-thumb-05.jpg" alt="View 5" className="w-28 h-20 object-cover rounded" />
                </div>

                <h3 className="text-lg font-bold text-[#1c2d56] mb-3">{t("trenchless.tab1AdvTitle")}</h3>
                <ul className="space-y-2 mb-6">
                  {["tab1Adv1", "tab1Adv2", "tab1Adv3", "tab1Adv4", "tab1Adv5", "tab1Adv6", "tab1Adv7", "tab1Adv8"].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                      <span className="text-gray-700 leading-relaxed text-sm">{t(`trenchless.${key}`)}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-700 leading-relaxed text-sm italic">
                  {t("trenchless.tab1SuperlitNote")}
                </p>
              </div>
            </div>

            {/* Main Image */}
            <div className="mt-12">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/attached_assets/trenchless-main.jpg"
                  alt="Jacking Pipes"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Design Tables Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-2">{t("trenchless.tab1TablesTitle")}</h3>
              <p className="text-gray-500 text-sm mb-6">{t("trenchless.tab1TablesDesc")}</p>
              <ul className="space-y-3">
                {dataSheets.map((sheet, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <svg className="w-5 h-5 text-[#ef4444] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-[#1c2d56] text-sm font-medium group-hover:text-[#ef4444] transition-colors cursor-pointer">
                      {sheet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* TAB 2 - Image Gallery */}
      <div className={activeTab === "tab2" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default TrenchlessSystemsPage;
