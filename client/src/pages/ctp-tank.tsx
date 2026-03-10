import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const tabs = [
  { id: "tab1", labelKey: "ctpTank.tab1Label" },
  { id: "tab2", labelKey: "ctpTank.tab2Label" },
];

function CTPTankPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    document.title = `${t("ctpTank.pageTitle")} - Urban Rohr`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("ctpTank.heroDesc"));
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
                {t("ctpTank.heroTitle")}
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed whitespace-pre-line">
                {t("ctpTank.heroDesc")}
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/attached_assets/tank-thumb-01.jpg"
                alt="CTP Tank"
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
                <h2 className="text-4xl font-bold text-[#1c2d56] mb-6 tracking-wide">
                  {t("ctpTank.tab1Title2")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                  {t("ctpTank.tab1ShortDesc")}
                </p>
              </div>
              <div className="lg:col-span-2">
                {/* Product Thumbnails */}
                <div className="flex gap-3 mb-6">
                  <img src="/attached_assets/tank-thumb-01.jpg" alt="CTP Tank View 1" className="w-40 h-20 object-cover rounded" />
                  <img src="/attached_assets/tank-thumb-02.png" alt="CTP Tank View 2" className="w-40 h-20 object-cover rounded" />
                  <img src="/attached_assets/tank-thumb-03.png" alt="CTP Tank View 3" className="w-40 h-20 object-cover rounded" />
                  <img src="/attached_assets/tank-thumb-04.jpg" alt="CTP Tank View 4" className="w-40 h-20 object-cover rounded" />
                  <img src="/attached_assets/tank-thumb-05.jpg" alt="CTP Tank View 5" className="w-40 h-20 object-cover rounded" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{t("ctpTank.tab1SystemsTitle")}</h3>
                <p className="text-gray-700 leading-relaxed text-base mb-6 whitespace-pre-line">
                  {t("ctpTank.tab1SystemsDesc")}
                </p>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="mt-12 space-y-8">
              {/* Product Advantages */}
              <div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-4">{t("ctpTank.tab1AdvTitle")}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Adv1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Adv2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Adv3")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Adv4")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Adv5")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Adv6")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Adv7")}</span>
                  </li>
                </ul>
              </div>

              {/* Applications */}
              <div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-4">{t("ctpTank.tab1AppTitle")}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1App1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1App2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1App3")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1App4")}</span>
                  </li>
                </ul>
              </div>

              {/* Design & Accessories */}
              <div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-4">{t("ctpTank.tab1DesignTitle")}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Design1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Design2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Design3")}</span>
                  </li>
                </ul>
              </div>

              {/* Installation & Transport */}
              <div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-4">{t("ctpTank.tab1InstallTitle")}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Install1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Install2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                    <span className="text-gray-700 leading-relaxed">{t("ctpTank.tab1Install3")}</span>
                  </li>
                </ul>
              </div>

              {/* Conclusion */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {t("ctpTank.tab1Conclusion")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TAB 2 - Image Gallery */}
      <div className={activeTab === "tab2" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <img
                  src="/attached_assets/tank-gallery-01.jpg"
                  alt="CTP Tank - Gallery 1"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <img
                  src="/attached_assets/tank-gallery-02.jpg"
                  alt="CTP Tank - Gallery 2"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <img
                  src="/attached_assets/tank-gallery-03.jpg"
                  alt="CTP Tank - Gallery 3"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <img
                  src="/attached_assets/tank-gallery-04.jpg"
                  alt="CTP Tank - Gallery 4"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <img
                  src="/attached_assets/tank-gallery-05.jpg"
                  alt="CTP Tank - Gallery 5"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default CTPTankPage;
