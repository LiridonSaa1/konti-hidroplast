import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const tabs = [
  { id: "tab1", labelKey: "darkLiner.tab1Label" },
];

function DarkLinerPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    document.title = `${t("darkLiner.pageTitle")} - Urban Rohr`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("darkLiner.heroDesc"));
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
                {t("darkLiner.heroTitle")}
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                {t("darkLiner.heroDesc")}
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/attached_assets/dark-liner-hero.jpg"
                alt="Dark Liner GFK-Rohre"
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
                  {t("darkLiner.tab1SectionTitle")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("darkLiner.tab1ShortDesc")}
                </p>
             
              </div>
              <div className="lg:col-span-2">
                {/* Product Thumbnails */}
                <div className="flex gap-3 mb-6">
                  <img src="/attached_assets/dark-liner-thumb-01.jpg" alt="PowerLiner View 1" className="w-28 h-20 object-cover rounded" />
                  <img src="/attached_assets/dark-liner-thumb-02.jpg" alt="PowerLiner View 2" className="w-28 h-20 object-cover rounded" />
                  <img src="/attached_assets/dark-liner-thumb-03.png" alt="PowerLiner View 3" className="w-28 h-20 object-cover rounded" />
                  <img src="/attached_assets/dark-liner-thumb-04.png" alt="PowerLiner View 4" className="w-28 h-20 object-cover rounded" />
                  <img src="/attached_assets/dark-liner-thumb-05.jpg" alt="PowerLiner View 5" className="w-28 h-20 object-cover rounded" />
                </div>

                <h3 className="text-xl font-bold text-[#1c2d56] mb-3">{t("darkLiner.tab1ProductDescTitle")}</h3>
                <p className="text-gray-700 leading-relaxed text-base mb-3">
                  {t("darkLiner.tab1DescIntro")}
                </p>
                <ul className="space-y-2 mb-6">
                  {["tab1DescBullet1", "tab1DescBullet2", "tab1DescBullet3", "tab1DescBullet4"].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                      <span className="text-gray-700 leading-relaxed">{t(`darkLiner.${key}`)}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 leading-relaxed text-base">
                  {t("darkLiner.tab1Desc")}
                </p>
              </div>
            </div>

            {/* Main Image */}
            <div className="mt-12">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="/attached_assets/dark-liner-main.png"
                  alt="PowerLiner GFK-Rohr"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Product Advantages */}
            
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default DarkLinerPage;
