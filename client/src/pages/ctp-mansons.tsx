import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Check } from "lucide-react";

const mansonTableData = [
  { dn: 300, w: 220, pn110: 360, pn12: 365, pn16: 370, pn20: 375, pn25: 380, pn32: 385 },
  { dn: 350, w: 220, pn110: 410, pn12: 415, pn16: 420, pn20: 425, pn25: 430, pn32: 435 },
  { dn: 400, w: 242, pn110: 460, pn12: 465, pn16: 470, pn20: 475, pn25: 480, pn32: 485 },
  { dn: 450, w: 242, pn110: 510, pn12: 515, pn16: 520, pn20: 525, pn25: 530, pn32: 535 },
  { dn: 500, w: 242, pn110: 565, pn12: 570, pn16: 575, pn20: 580, pn25: 585, pn32: 590 },
  { dn: 600, w: 242, pn110: 670, pn12: 675, pn16: 680, pn20: 685, pn25: 690, pn32: 695 },
  { dn: 700, w: 260, pn110: 760, pn12: 765, pn16: 770, pn20: 775, pn25: 780, pn32: 785 },
  { dn: 800, w: 260, pn110: 860, pn12: 865, pn16: 870, pn20: 875, pn25: 880, pn32: 885 },
  { dn: 900, w: 260, pn110: 965, pn12: 970, pn16: 975, pn20: 980, pn25: 985, pn32: 990 },
  { dn: 1000, w: 260, pn110: 1070, pn12: 1075, pn16: 1080, pn20: 1085, pn25: 1090, pn32: 1095 },
  { dn: 1100, w: 260, pn110: 1170, pn12: 1175, pn16: 1180, pn20: 1185, pn25: 1190, pn32: 1195 },
  { dn: 1200, w: 260, pn110: 1275, pn12: 1280, pn16: 1285, pn20: 1290, pn25: 1295, pn32: 1300 },
  { dn: 1300, w: 260, pn110: 1375, pn12: 1380, pn16: 1385, pn20: 1390, pn25: 1395, pn32: 1400 },
  { dn: 1400, w: 275, pn110: 1480, pn12: 1485, pn16: 1490, pn20: 1495, pn25: 1500, pn32: 1505 },
  { dn: 1500, w: 275, pn110: 1585, pn12: 1590, pn16: 1595, pn20: 1600, pn25: 1605, pn32: 1610 },
  { dn: 1600, w: 275, pn110: 1690, pn12: 1695, pn16: 1700, pn20: 1705, pn25: 1710, pn32: 1715 },
  { dn: 1700, w: 275, pn110: 1790, pn12: 1795, pn16: 1800, pn20: 1805, pn25: 1810, pn32: "-" },
  { dn: 1800, w: 275, pn110: 1895, pn12: 1900, pn16: 1905, pn20: 1910, pn25: "-", pn32: "-" },
  { dn: 1900, w: 275, pn110: 1995, pn12: 2000, pn16: 2005, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2000, w: 275, pn110: 2100, pn12: 2105, pn16: 2110, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2100, w: 275, pn110: 2200, pn12: 2205, pn16: 2210, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2200, w: 275, pn110: 2305, pn12: 2310, pn16: 2315, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2300, w: 275, pn110: 2405, pn12: 2410, pn16: 2415, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2400, w: 275, pn110: 2510, pn12: 2515, pn16: 2520, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2500, w: 330, pn110: 2605, pn12: 2610, pn16: 2615, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2600, w: 330, pn110: 2710, pn12: 2715, pn16: 2720, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2700, w: 330, pn110: 2815, pn12: 2820, pn16: 2825, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2800, w: 330, pn110: 2915, pn12: 2920, pn16: 2925, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 2900, w: 330, pn110: 3020, pn12: 3025, pn16: 3030, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3000, w: 330, pn110: 3125, pn12: 3130, pn16: 3135, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3100, w: 330, pn110: 3230, pn12: 3235, pn16: 3240, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3200, w: 330, pn110: 3330, pn12: 3335, pn16: 3340, pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3300, w: 330, pn110: 3435, pn12: "-", pn16: "-", pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3400, w: 330, pn110: 3540, pn12: "-", pn16: "-", pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3500, w: 330, pn110: 3645, pn12: "-", pn16: "-", pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3600, w: 330, pn110: 3745, pn12: "-", pn16: "-", pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3700, w: 330, pn110: 3850, pn12: "-", pn16: "-", pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3800, w: 330, pn110: 3955, pn12: "-", pn16: "-", pn20: "-", pn25: "-", pn32: "-" },
  { dn: 3900, w: 330, pn110: 4060, pn12: "-", pn16: "-", pn20: "-", pn25: "-", pn32: "-" },
  { dn: 4000, w: 330, pn110: 4160, pn12: "-", pn16: "-", pn20: "-", pn25: "-", pn32: "-" },
];

const angularDeflectionData = [
  { range: "DN 300 - DN 500", deflection: "3,0°" },
  { range: "DN 600 - DN 900", deflection: "2,0°" },
  { range: "DN 1000 - DN 1800", deflection: "1,0°" },
  { range: "DN 1900 – DN 4000", deflection: "0,5°" },
];

function CTPMansonsPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    document.title = `${t("ctpMansons.pageTitle")} - ${companyInfo.companyName || "Urban Rohr"}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("ctpMansons.metaDescription"));
    }
  }, [t, companyInfo.companyName]);

  const tabs = [
    { id: "tab1", labelKey: "ctpMansons.tab1Label" },
    { id: "tab2", labelKey: "ctpMansons.tab2Label" },
    { id: "tab3", labelKey: "ctpMansons.tab3Label" },
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
                <span className="text-sm font-medium">{t("ctpMansons.heroBadge")}</span>
              </div>
              <h1 className="text-5xl md:text-5xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {t("ctpMansons.heroTitle")}
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {t("ctpMansons.heroDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("ctpMansons.heroFeature1")}</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("ctpMansons.heroFeature2")}</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("ctpMansons.heroFeature3")}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/attached_assets/superlit-manson.jpg"
                  alt={t("ctpMansons.heroTitle")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">DN 300 - DN 4000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-semibold text-sm uppercase tracking-wide border-b-3 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-blue-900 border-b-[3px] border-blue-900 bg-red-50/50"
                      : "text-gray-600 border-b-[3px] border-transparent hover:text-[#1c2d56] hover:bg-gray-50"
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
                  {t("ctpMansons.tab1Title2")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("ctpMansons.tab1ShortDesc")}
                </p>
              </div>
              <div className="lg:col-span-2">
                {/* Product Thumbnails */}
                <div className="flex gap-3 mb-6">
                  <img src="/attached_assets/manson-main.jpg"  className="w-24 h-20 object-cover rounded" />
                  <img src="/attached_assets/manson-01.jpg"  className="w-24 h-20 object-cover rounded" />
                  <img src="/attached_assets/manson-02.jpg" className="w-24 h-20 object-cover rounded" />
                  <img src="/attached_assets/manson-03.jpg"  className="w-24 h-20 object-cover rounded" />
                  <img src="/attached_assets/manson-04.jpg"  className="w-24 h-20 object-cover rounded" />
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {t("ctpMansons.tab1LongDesc")}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center w-full my-12">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="px-4">
                   
              </div>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Product Images Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src="/attached_assets/manson-01.jpg"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src="/attached_assets/manson-02.jpg"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src="/attached_assets/manson-03.jpg"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src="/attached_assets/manson-04.jpg"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TAB 2 - Coupling Diameters */}
      <div className={activeTab === "tab2" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1c2d56] mb-4">
              {t("ctpMansons.tab2Title")}
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("ctpMansons.tab2Desc")}
            </p>

            <h3 className="text-2xl font-bold text-[#1c2d56] mb-6 text-center uppercase tracking-wide">
              {t("ctpMansons.tab2TableTitle")}
            </h3>

            <div className="overflow-x-auto border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1c2d56] text-white">
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider border-r border-b border-white">
                      Anma Çapı
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider border-r border-b border-white">
                      Manşon Genişliği
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider  border-b border-white" colSpan={6}>
                      Manşon Dış Çapı  De (mm)
                    </th>
                  </tr>
                  <tr className="bg-[#1c2d56] text-white">
                    <th className="px-4 py-2 text-center font-semibold text-xs border-r border-white">{t("ctpMansons.tab2ColDN")}</th>
                    <th className="px-4 py-2 text-center font-semibold text-xs border-r border-white">{t("ctpMansons.tab2ColW")}</th>
                    <th className="px-4 py-2 text-center font-semibold text-xs border-r border-white">PN (1-10)</th>
                    <th className="px-4 py-2 text-center font-semibold text-xs border-r border-white">PN 12</th>
                    <th className="px-4 py-2 text-center font-semibold text-xs border-r border-white">PN 16</th>
                    <th className="px-4 py-2 text-center font-semibold text-xs border-r border-white">PN 20</th>
                    <th className="px-4 py-2 text-center font-semibold text-xs border-r border-white">PN 25</th>
                    <th className="px-4 py-2 text-center font-semibold text-xs">PN 32</th>
                  </tr>
                </thead>
                <tbody>
                  {mansonTableData.map((row, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-center text-gray-700 border-r border-gray-200">{row.dn}</td>
                      <td className="px-4 py-3 text-center text-gray-700 border-r border-gray-200">{row.w}</td>
                      <td className="px-4 py-3 text-center text-gray-700 border-r border-gray-200">{row.pn110}</td>
                      <td className="px-4 py-3 text-center text-gray-700 border-r border-gray-200">{row.pn12}</td>
                      <td className="px-4 py-3 text-center text-gray-700 border-r border-gray-200">{row.pn16}</td>
                      <td className="px-4 py-3 text-center text-gray-700 border-r border-gray-200">{row.pn20}</td>
                      <td className="px-4 py-3 text-center text-gray-700 border-r border-gray-200">{row.pn25}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{row.pn32}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* TAB 3 - Angular Deflection */}
      <div className={activeTab === "tab3" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1c2d56] mb-4">
              {t("ctpMansons.tab3Title")}
            </h2>
            <p className="text-gray-700 mb-10 leading-relaxed">
              {t("ctpMansons.tab3Desc")}
            </p>

            {/* Technical drawing */}
            <div className="mb-10 flex items-center justify-center">
              <img
                src="/attached_assets/acisal-sapma-drawing.png"
                alt="Angular Deflection Technical Drawing"
                className="w-full h-auto max-w-2xl object-contain"
              />
            </div>

            {/* Angular deflection table */}
            <div className="max-w-xl mx-auto overflow-x-auto rounded-xl shadow-lg border border-gray-200">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-[#1c2d56] text-white">
                    <th className="px-6 py-4 text-center font-bold  border-white border-r">
                      {t("ctpMansons.tab3ColPipe")}
                    </th>
                    <th className="px-6 py-4 text-center font-bold  border-white">
                      {t("ctpMansons.tab3ColDeflection")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {angularDeflectionData.map((row, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
                      <td className="px-6 py-3 text-center text-gray-900 font-medium border border-gray-200">{row.range}</td>
                      <td className="px-6 py-3 text-center text-gray-700 border border-gray-200">{row.deflection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default CTPMansonsPage;
