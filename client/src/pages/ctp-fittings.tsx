import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Check } from "lucide-react";

const elbowData = [
  { angle: "α ≤ 11.25°", pressures: ["1-6 Bar", "10 Bar", "16 Bar"] },
  { angle: "11.25° < α ≤ 22.5°", pressures: ["1-6 Bar", "10 Bar", "16 Bar"] },
  { angle: "22.5° < α ≤ 30°", pressures: ["1-6 Bar", "10 Bar", "16 Bar"] },
  { angle: "30° < α ≤ 45°", pressures: ["1-6 Bar", "10 Bar", "16 Bar"] },
  { angle: "45° < α ≤ 60°", pressures: ["1-6 Bar", "10 Bar", "16 Bar"] },
  { angle: "60° < α ≤ 90°", pressures: ["1-6 Bar", "10 Bar", "16 Bar"] },
];

function CTPFittingsPage() {
  const { t } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    document.title = `${t("ctpFittings.pageTitle")} - ${companyInfo.companyName || "Urban Rohr"}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("ctpFittings.metaDescription"));
    }
  }, [t, companyInfo.companyName]);

  const tabs = [
    { id: "tab1", labelKey: "ctpFittings.tab1Label" },
    { id: "tab2", labelKey: "ctpFittings.tab2Label" },
    { id: "tab3", labelKey: "ctpFittings.tab3Label" },
    { id: "tab4", labelKey: "ctpFittings.tab4Label" },
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
                <span className="text-sm font-medium">{t("ctpFittings.heroBadge")}</span>
              </div>
              <h1 className="text-5xl md:text-5xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {t("ctpFittings.heroTitle")}
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed whitespace-pre-line">
                {t("ctpFittings.heroDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("ctpFittings.heroFeature1")}</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("ctpFittings.heroFeature2")}</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("ctpFittings.heroFeature3")}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/attached_assets/superlit-fittings.jpg"
                  alt={t("ctpFittings.heroTitle")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">
                  {t("productPages.premiumQuality")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
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

      {/* TAB 1 - Tee Parts */}
      <div className={activeTab === "tab1" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Equal Tees */}
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-8 text-center uppercase tracking-wide">
              {t("ctpFittings.equalTees")}
            </h2>

            {/* Technical drawings */}
            <div className="mb-10 max-w-4xl mx-auto">
              <img
                src="/attached_assets/equal-tee-technical.png"
                alt="Equal Tee Technical Drawing"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Equal Tee Dimension Table Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white rounded-t-xl py-4 px-6">
              <h3 className="text-xl font-bold text-white text-center uppercase tracking-wide">
                {t("ctpFittings.equalTeeDimTable")}
              </h3>
            </div>
            <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden mb-16">
              <div className="grid grid-cols-3 divide-x divide-gray-200">
                {["PN 1-6", "PN 10", "PN 16"].map((pn) => (
                  <div key={pn} className="text-center py-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">{pn}</p>
                    <span className="text-sm font-medium text-gray-400">-</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-12">
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className="mx-4 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 text-xs">$</div>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Unequal Tees */}
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-8 text-center uppercase tracking-wide">
              {t("ctpFittings.unequalTees")}
            </h2>

            {/* Technical drawings */}
            <div className="mb-10 max-w-4xl mx-auto">
              <img
                src="/attached_assets/unequal-tee-technical.png"
                alt="Unequal Tee Technical Drawing"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Unequal Tee Dimension Table Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white rounded-t-xl py-4 px-6">
              <h3 className="text-xl font-bold text-white text-center uppercase tracking-wide">
                {t("ctpFittings.unequalTeeDimTable")}
              </h3>
            </div>
            <div className="border border-gray-200 border-t-0 rounded-b-xl overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-gray-200">
                {["PN 1-6", "PN 10", "PN 16"].map((pn) => (
                  <div key={pn} className="text-center py-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">{pn}</p>
                    <span className="text-sm font-medium text-gray-400">-</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TAB 2 - Elbows */}
      <div className={activeTab === "tab2" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-6">
              {t("ctpFittings.elbowsTitle")}
            </h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1c2d56] text-white">
                    <th className="px-4 py-3 text-left font-semibold">{t("ctpFittings.elbowAngle")}</th>
                    <th className="px-4 py-3 text-left font-semibold">{t("ctpFittings.elbowPressure")}</th>
                    <th className="px-4 py-3 text-center font-semibold">{t("ctpFittings.elbowDataSheet")}</th>
                  </tr>
                </thead>
                <tbody>
                  {elbowData.map((row, i) =>
                    row.pressures.map((pressure, j) => (
                      <tr
                        key={`${i}-${j}`}
                        className={`${(i * 3 + j) % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                      >
                        {j === 0 && (
                          <td
                            className="px-4 py-2.5 font-medium text-gray-900 border-r border-gray-100"
                            rowSpan={3}
                          >
                            {row.angle}
                          </td>
                        )}
                        <td className="px-4 py-2.5 text-gray-700">{pressure}</td>
                        <td className="px-4 py-2.5 text-center">
                          <span className="text-sm font-medium text-gray-400">-</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-4">{t("ctpFittings.elbowFeatures")}</h3>
              <ul className="space-y-3">
                {[
                  "ctpFittings.elbowFeat1",
                  "ctpFittings.elbowFeat2",
                  "ctpFittings.elbowFeat3",
                  "ctpFittings.elbowFeat4",
                ].map((key, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* TAB 3 - Flanges */}
      <div className={activeTab === "tab3" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-8 text-center uppercase tracking-wide">
              {t("ctpFittings.flangesTitle")}
            </h2>

            {/* Technical drawing */}
            <div className="mb-10 max-w-sm mx-auto bg-gray-50 rounded-xl p-6 flex items-center justify-center">
              <img
                src="/attached_assets/flans.jpg"
                alt="Flange Technical Drawing"
                className="w-full h-auto max-h-56 object-contain"
              />
            </div>

            {/* Dimension Table */}
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="px-6 py-3 text-center font-semibold">DN (mm)</th>
                    <th className="px-6 py-3 text-center font-semibold">L (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dn: 300, l: 600 }, { dn: 350, l: 600 }, { dn: 400, l: 600 },
                    { dn: 450, l: 600 }, { dn: 500, l: 600 }, { dn: 600, l: 600 },
                    { dn: 700, l: 600 }, { dn: 800, l: 600 }, { dn: 900, l: 600 },
                    { dn: 1000, l: 600 }, { dn: 1100, l: 700 }, { dn: 1200, l: 700 },
                    { dn: 1300, l: 800 }, { dn: 1400, l: 800 }, { dn: 1500, l: 800 },
                    { dn: 1600, l: 900 }, { dn: 1700, l: 900 }, { dn: 1800, l: 1000 },
                    { dn: 1900, l: 1000 }, { dn: 2000, l: 1000 }, { dn: 2100, l: 1100 },
                    { dn: 2200, l: 1100 }, { dn: 2300, l: 1200 }, { dn: 2400, l: 1200 },
                    { dn: 2500, l: 1300 }, { dn: 2600, l: 1300 }, { dn: 2700, l: 1400 },
                    { dn: 2800, l: 1400 }, { dn: 2900, l: 1500 }, { dn: 3000, l: 1500 },
                    { dn: 3100, l: 1500 }, { dn: 3200, l: 1500 }, { dn: 3300, l: 1500 },
                    { dn: 3400, l: 1500 }, { dn: 3500, l: 1500 }, { dn: 3600, l: 1500 },
                    { dn: 3700, l: 1500 }, { dn: 3800, l: 1500 }, { dn: 3900, l: 1500 },
                    { dn: 4000, l: 1500 },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-6 py-2 text-center font-medium text-gray-900">{row.dn}</td>
                      <td className="px-6 py-2 text-center text-gray-700">{row.l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* TAB 4 - Reducers */}
      <div className={activeTab === "tab4" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-8 text-center uppercase tracking-wide">
              {t("ctpFittings.reducersTitle")}
            </h2>

            {/* Technical drawings */}
            <div className="mb-10 flex items-center justify-center">
              <img
                src="/attached_assets/reduksiyon.jpeg"
                alt="Reducer Technical Drawings"
                className="w-full h-auto max-w-3xl object-contain"
              />
            </div>

            {/* Two dimension tables side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left table (DN 300-2000) */}
              <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="px-3 py-2 text-center font-semibold">DL<br/>(mm)</th>
                      <th className="px-3 py-2 text-center font-semibold">DS<br/>(mm)</th>
                      <th className="px-3 py-2 text-center font-semibold">A=B<br/>(mm)</th>
                      <th className="px-3 py-2 text-center font-semibold">L<br/>(mm)</th>
                      <th className="px-3 py-2 text-center font-semibold">LL<br/>(mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [300,200,400,250,1050],[300,250,400,125,925],
                      [350,250,400,250,1050],[350,300,400,125,925],
                      [400,300,400,250,1050],[400,350,400,125,925],
                      [450,350,400,250,1050],[450,400,400,125,925],
                      [500,350,400,375,1175],[500,400,400,250,1050],
                      [600,400,400,500,1300],[600,500,400,250,1050],
                      [700,500,400,500,1300],[700,600,400,250,1050],
                      [800,600,400,500,1300],[800,700,400,250,1050],
                      [900,700,400,500,1300],[900,800,400,250,1050],
                      [1000,800,400,500,1300],[1000,900,400,250,1050],
                      [1100,900,400,500,1300],[1100,1000,400,250,1050],
                      [1200,1000,500,500,1500],[1200,1100,500,250,1250],
                      [1300,1100,500,500,1500],[1300,1200,500,250,1250],
                      [1400,1200,500,500,1500],[1400,1300,500,250,1250],
                      [1500,1300,500,500,1500],[1500,1400,500,250,1250],
                      [1600,1500,600,250,1450],[1600,1400,600,500,1700],
                      [1700,1500,600,500,1700],[1700,1600,600,250,1450],
                      [1800,1400,600,1000,2200],[1800,1600,600,500,1700],
                      [1900,1700,600,500,1700],[1900,1800,600,250,1450],
                      [2000,1600,600,1000,2200],[2000,1800,600,500,1700],
                    ].map((row, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
                        <td className="px-3 py-1.5 text-center text-gray-900 font-medium">{row[0]}</td>
                        <td className="px-3 py-1.5 text-center text-gray-700">{row[1]}</td>
                        <td className="px-3 py-1.5 text-center text-gray-700">{row[2]}</td>
                        <td className="px-3 py-1.5 text-center text-gray-700">{row[3]}</td>
                        <td className="px-3 py-1.5 text-center text-gray-700">{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right table (DN 2100-4000) */}
              <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-blue-900 text-white">
                      <th className="px-3 py-2 text-center font-semibold">DL<br/>(mm)</th>
                      <th className="px-3 py-2 text-center font-semibold">DS<br/>(mm)</th>
                      <th className="px-3 py-2 text-center font-semibold">A=B<br/>(mm)</th>
                      <th className="px-3 py-2 text-center font-semibold">L<br/>(mm)</th>
                      <th className="px-3 py-2 text-center font-semibold">LL<br/>(mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [2100,1900,600,500,1700],[2100,2000,600,250,1450],
                      [2200,2000,600,500,1700],[2200,2100,600,250,1450],
                      [2300,2100,600,500,1700],[2300,2200,600,250,1450],
                      [2400,2200,600,500,1700],[2400,2300,600,250,1450],
                      [2500,2300,750,500,2000],[2500,2400,750,250,1750],
                      [2600,2400,750,500,2000],[2600,2500,750,250,1750],
                      [2700,2500,750,500,2000],[2700,2600,750,250,1750],
                      [2800,2600,750,500,2000],[2800,2700,750,250,1750],
                      [2900,2700,750,500,2000],[2900,2800,750,250,1750],
                      [3000,2800,750,500,2000],[3000,2900,750,250,1750],
                      [3100,2900,900,500,2300],[3100,3000,900,250,2050],
                      [3200,3000,900,500,2300],[3200,3100,900,250,2050],
                      [3300,3100,900,500,2300],[3300,3200,900,250,2050],
                      [3400,3200,900,500,2300],[3400,3300,900,250,2050],
                      [3500,3300,1050,500,2600],[3500,3400,1050,250,2350],
                      [3600,3400,1050,500,2600],[3600,3500,1050,250,2350],
                      [3700,3500,1050,500,2600],[3700,3600,1050,250,2350],
                      [3800,3600,1050,500,2600],[3800,3700,1050,250,2350],
                      [3900,3700,1100,500,2700],[3900,3800,1100,250,2450],
                      [4000,3800,1100,500,2700],[4000,3900,1100,250,2450],
                    ].map((row, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
                        <td className="px-3 py-1.5 text-center text-gray-900 font-medium">{row[0]}</td>
                        <td className="px-3 py-1.5 text-center text-gray-700">{row[1]}</td>
                        <td className="px-3 py-1.5 text-center text-gray-700">{row[2]}</td>
                        <td className="px-3 py-1.5 text-center text-gray-700">{row[3]}</td>
                        <td className="px-3 py-1.5 text-center text-gray-700">{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default CTPFittingsPage;
