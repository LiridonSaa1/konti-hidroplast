import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Check } from "lucide-react";

const tabs = [
  { id: "tab1", labelKey: "ctpJackingManson.tab1Label" },
  { id: "tab2", labelKey: "ctpJackingManson.tab2Label" },
];

function CTPJackingMansonPage() {
  const { t } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    document.title = `${t("ctpJackingManson.pageTitle")} - ${companyInfo.companyName || "Urban Rohr"}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("ctpJackingManson.heroDesc"));
    }
  }, [t, companyInfo.companyName]);

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
                {t("ctpJackingManson.heroTitle")}
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                {t("ctpJackingManson.heroDesc")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Check className="w-5 h-5 text-[#ef4444]" />
                  <span>{t("ctpJackingManson.heroFeature1")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Check className="w-5 h-5 text-[#ef4444]" />
                  <span>{t("ctpJackingManson.heroFeature2")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Check className="w-5 h-5 text-[#ef4444]" />
                  <span>{t("ctpJackingManson.heroFeature3")}</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/attached_assets/jacking-jpeg2.webp"
                alt={t("ctpJackingManson.heroTitle")}
                className="max-w-sm w-full h-auto object-contain drop-shadow-2xl rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-semibold tracking-wider transition-all duration-300 border-b-[3px] whitespace-nowrap ${
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
                  {t("ctpJackingManson.tab1Title2")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("ctpJackingManson.tab1ShortDesc")}
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="flex gap-6 mb-6">
                  <img src="/attached_assets/ctp-jacking-manson-jpg1.webp" alt="CTP Jacking Manşon" className="w-24 h-20 object-cover rounded" />
                  <img src="/attached_assets/jacking-3d.webp" alt="CTP Jacking Manşon" className="w-24 h-20 object-cover rounded" />
                  <img src="/attached_assets/jacking-jpeg2 (2).webp" alt="CTP Jacking Manşon" className="w-24 h-20 object-cover rounded" />
                  <img src="/attached_assets/ctp-jacking-manson-jpg2.webp" alt="CTP Jacking Manşon" className="w-24 h-20 object-cover rounded" />
                  <img src="/attached_assets/jacking-3d-2.webp" alt="CTP Jacking Manşon" className="w-24 h-20 object-cover rounded" />
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {t("ctpJackingManson.tab1LongDesc")}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="https://www.superlit.com/assets/catalogs/2025/tr-ctp-boru-urun-katalog-ctp-m-07-rev-00--04-12-2024.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-sm text-[#1c2d56] border-2 border-[#1c2d56] hover:bg-[#1c2d56] hover:text-white transition-colors"
                  >
                    {t("ctpJackingManson.productBrochure")}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img src="/attached_assets/jacking-jpeg2.webp" alt="CTP Jacking Manşon" className="w-full h-auto object-cover" />
              </div>
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img src="/attached_assets/img-20190906-wa0018-1030x482.webp" alt="CTP Jacking Manşon" className="w-full h-auto object-cover" />
              </div>
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img src="/attached_assets/img-20190906-wa0020-1030x579.webp" alt="CTP Jacking Manşon" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TAB 2 - Design Table */}
      <div className={activeTab === "tab2" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1c2d56] mb-4">
              {t("ctpJackingManson.tab2Title")}
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("ctpJackingManson.tab2Desc")}
            </p>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <img
                  src="/attached_assets/ctp-jacking-coupling.jpg"
                  alt="CTP Jacking Coupling"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
              <div className="col-span-12">
                <img
                  src="/attached_assets/ctp-jacking-coupling-table.jpg"
                  alt="CTP Jacking Coupling Table"
                  className="w-full h-auto object-contain rounded-lg"
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

export default CTPJackingMansonPage;
