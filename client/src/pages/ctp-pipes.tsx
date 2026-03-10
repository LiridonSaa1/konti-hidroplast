import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Check } from "lucide-react";

const pipeDiametersData = [
  { dn: 300, wallMin: 12, outerDia: 324 },
  { dn: 350, wallMin: 14, outerDia: 378.4 },
  { dn: 400, wallMin: 16, outerDia: 432 },
  { dn: 450, wallMin: 18, outerDia: 475.8 },
  { dn: 500, wallMin: 20, outerDia: 530.2 },
  { dn: 600, wallMin: 24, outerDia: 633 },
  { dn: 700, wallMin: 28, outerDia: 718.5 },
  { dn: 800, wallMin: 32, outerDia: 815.5 },
  { dn: 900, wallMin: 36, outerDia: 912.4 },
  { dn: 1000, wallMin: 40, outerDia: 1009.5 },
  { dn: 1100, wallMin: 44, outerDia: 1175.5 },
  { dn: 1200, wallMin: 48, outerDia: 1226 },
  { dn: 1300, wallMin: 52, outerDia: 1307.5 },
  { dn: 1400, wallMin: 56, outerDia: 1403.5 },
  { dn: 1500, wallMin: 60, outerDia: 1536.5 },
  { dn: 1600, wallMin: 64, outerDia: 1636.5 },
  { dn: 1700, wallMin: 68, outerDia: 1730.5 },
  { dn: 1800, wallMin: 72, outerDia: 1832 },
  { dn: 1900, wallMin: 76, outerDia: 1944.5 },
  { dn: 2000, wallMin: 80, outerDia: 2046 },
  { dn: 2100, wallMin: 84, outerDia: 2148.5 },
  { dn: 2200, wallMin: 88, outerDia: 2250.5 },
  { dn: 2300, wallMin: 92, outerDia: 2375 },
  { dn: 2400, wallMin: 96, outerDia: 2454 },
  { dn: 2500, wallMin: 100, outerDia: 2603.5 },
  { dn: 2600, wallMin: 104, outerDia: 2697.3 },
  { dn: 2700, wallMin: 108, outerDia: 2765.6 },
  { dn: 2800, wallMin: 112, outerDia: 2856.5 },
  { dn: 2900, wallMin: 116, outerDia: 2965 },
  { dn: 3000, wallMin: 120, outerDia: 3065 },
  { dn: 3100, wallMin: 124, outerDia: 3188.5 },
  { dn: 3200, wallMin: 128, outerDia: 3200 },
  { dn: 3300, wallMin: 132, outerDia: 3370.5 },
  { dn: 3400, wallMin: 136, outerDia: 3475 },
  { dn: 3500, wallMin: 140, outerDia: 3574.5 },
  { dn: 3600, wallMin: 144, outerDia: 3676.5 },
  { dn: 3700, wallMin: 148, outerDia: 3778 },
  { dn: 3800, wallMin: 152, outerDia: 3880.5 },
  { dn: 3900, wallMin: 156, outerDia: 3983 },
  { dn: 4000, wallMin: 160, outerDia: 4085 },
];

function CTPPipesPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    document.title = `${t("ctpPipes.pageTitle")} - ${companyInfo.companyName || "Urban Rohr"}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t("ctpPipes.metaDescription"));
    }
  }, [t, companyInfo.companyName]);

  const tabs = [
    { id: "tab1", labelKey: "ctpPipes.tab1Label" },
    { id: "tab2", labelKey: "ctpPipes.tab2Label" },
    { id: "tab3", labelKey: "ctpPipes.tab3Label" },
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
                <span className="text-sm font-medium">GFK-Rohre</span>
              </div>
              <h1 className="text-5xl md:text-5xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {t("ctpPipes.heroTitle")}
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed whitespace-pre-line">
                {t("ctpPipes.heroDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">DN50 – DN4000</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">PN1 – PN32 bar</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t("ctpPipes.heroLifespan")}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/attached_assets/ctp-boru.jpg"
                  alt="GFK-Rohre"
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
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-semibold text-sm uppercase tracking-wide border-b-3 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-[#ef4444] border-b-[3px] border-[#ef4444] bg-red-50/50"
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

      {/* TAB 1 - Production Technologies / Overview */}
      <div className={activeTab === "tab1" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-8 whitespace-pre-line">
              {t("ctpPipes.tab1Intro")}
            </p>

            <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">
              {t("ctpPipes.tab1WhatTitle")}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-10 whitespace-pre-line">
              {t("ctpPipes.tab1WhatText")}
            </p>

            <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">
              {t("ctpPipes.tab1AreasTitle")}
            </h3>
            <ul className="space-y-3 mb-10">
              {[
                "ctpPipes.tab1Area1",
                "ctpPipes.tab1Area2",
                "ctpPipes.tab1Area3",
                "ctpPipes.tab1Area4",
                "ctpPipes.tab1Area5",
                "ctpPipes.tab1Area6",
                "ctpPipes.tab1Area7",
                "ctpPipes.tab1Area8",
              ].map((key, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t(key)}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">
              {t("ctpPipes.tab1AdvTitle")}
            </h3>
            <ul className="space-y-3 mb-10">
              {[
                "ctpPipes.tab1Adv1",
                "ctpPipes.tab1Adv2",
                "ctpPipes.tab1Adv3",
                "ctpPipes.tab1Adv4",
                "ctpPipes.tab1Adv5",
                "ctpPipes.tab1Adv6",
                "ctpPipes.tab1Adv7",
              ].map((key, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* TAB 2 - Application Areas & Advantages */}
      <div className={activeTab === "tab2" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-[#1c2d56] mb-2">
              {t("ctpPipes.tab2AreasTitle")}
            </h3>
            <p className="text-gray-600 mb-6">{t("ctpPipes.tab2AreasIntro")}</p>
            <ul className="space-y-3 mb-12">
              {[
                "ctpPipes.tab2Area1",
                "ctpPipes.tab2Area2",
                "ctpPipes.tab2Area3",
                "ctpPipes.tab2Area4",
                "ctpPipes.tab2Area5",
                "ctpPipes.tab2Area6",
                "ctpPipes.tab2Area7",
                "ctpPipes.tab2Area8",
                "ctpPipes.tab2Area9",
                "ctpPipes.tab2Area10",
              ].map((key, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#ef4444] font-bold mt-0.5">•</span>
                  <span className="text-gray-700">{t(key)}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
              {t("ctpPipes.tab2AdvTitle")}
            </h3>
            <ul className="space-y-4 mb-12">
              {[
                "ctpPipes.tab2Adv1",
                "ctpPipes.tab2Adv2",
                "ctpPipes.tab2Adv3",
                "ctpPipes.tab2Adv4",
                "ctpPipes.tab2Adv5",
                "ctpPipes.tab2Adv6",
                "ctpPipes.tab2Adv7",
              ].map((key, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{t(key)}</span>
                </li>
              ))}
            </ul>

            {/* Standards Table */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                {t("ctpPipes.standardsTitle")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "ctpPipes.standard1",
                  "ctpPipes.standard2",
                  "ctpPipes.standard3",
                  "ctpPipes.standard4",
                  "ctpPipes.standard5",
                  "ctpPipes.standard6",
                  "ctpPipes.standard7",
                  "ctpPipes.standard8",
                  "ctpPipes.standard9",
                ].map((key, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TAB 3 - Pipe Diameters & Technical Specifications */}
      <div className={activeTab === "tab3" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-[#1c2d56] mb-8">
              {t("ctpPipes.tab3TechTitle")}
            </h3>

            {/* Technical Specs Grid */}
            <div className="space-y-8 mb-16">
              {[
                { titleKey: "ctpPipes.tab3FlowTitle", textKey: "ctpPipes.tab3FlowText" },
                { titleKey: "ctpPipes.tab3CoefTitle", textKey: "ctpPipes.tab3CoefText" },
                { titleKey: "ctpPipes.tab3UVTitle", textKey: "ctpPipes.tab3UVText" },
                { titleKey: "ctpPipes.tab3PoissonTitle", textKey: "ctpPipes.tab3PoissonText" },
                { titleKey: "ctpPipes.tab3TempTitle", textKey: "ctpPipes.tab3TempText" },
                { titleKey: "ctpPipes.tab3ThermalTitle", textKey: "ctpPipes.tab3ThermalText" },
              ].map((spec, i) => (
                <div key={i} className="border-l-4 border-[#1c2d56] pl-6">
                  <h4 className="text-lg font-bold text-[#1c2d56] mb-2">
                    {t(spec.titleKey)}
                  </h4>
                  <p className="text-gray-700 whitespace-pre-line">{t(spec.textKey)}</p>
                </div>
              ))}
            </div>

            {/* Pipe Diameters Table */}
            <div className="mt-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#1c2d56]">
                  {t("ctpPipes.tab3TableTitle")}
                </h2>
              </div>
              <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1c2d56] text-white">
                      <th className="px-4 py-3 text-left font-semibold">
                        {t("ctpPipes.tab3ColDN")}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        {t("ctpPipes.tab3ColWall")}
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        {t("ctpPipes.tab3ColOuter")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pipeDiametersData.map((row, i) => (
                      <tr
                        key={i}
                        className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-900">
                          {row.dn}
                        </td>
                        <td className="px-4 py-2.5 text-gray-700">{row.wallMin}</td>
                        <td className="px-4 py-2.5 text-gray-700">{row.outerDia}</td>
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

export default CTPPipesPage;
