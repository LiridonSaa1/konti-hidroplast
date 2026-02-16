import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const tabs = [
  { id: "tab1", labelKey: "marineLug.tab1Label" },
  { id: "tab2", labelKey: "marineLug.tab2Label" },
  { id: "tab3", labelKey: "marineLug.tab3Label" },
];

const galleryImages = [
  { src: "/attached_assets/marine-lug-gallery-01.jpg", alt: "Marine Lug Gallery 1" },
  { src: "/attached_assets/marine-lug-gallery-02.png", alt: "Marine Lug Gallery 2" },
  { src: "/attached_assets/marine-lug-gallery-03.png", alt: "Marine Lug Gallery 3" },
  { src: "/attached_assets/marine-lug-gallery-04.png", alt: "Marine Lug Gallery 4" },
  { src: "/attached_assets/marine-lug-gallery-05.png", alt: "Marine Lug Gallery 5" },
];

const videos = [
  { id: "GYK9eT8tK9A", titleKey: "marineLug.video1Title" },
  { id: "-o1L4pc2QVc", titleKey: "marineLug.video2Title" },
  { id: "fWfQZ6_L2Nk", titleKey: "marineLug.video3Title" },
  { id: "y1InGHZibYo", titleKey: "marineLug.video4Title" },
];

function MarineLugPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    document.title = `${t("marineLug.pageTitle")} - Urban Rohr`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("marineLug.heroDesc"));
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
                {t("marineLug.heroTitle")}
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed">
                {t("marineLug.heroDesc")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-5 h-5 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t("marineLug.badge1")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-5 h-5 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t("marineLug.badge2")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <svg className="w-5 h-5 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t("marineLug.badge3")}</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/attached_assets/marine-lug-hero.jpg"
                alt="Marine Lug® Sistemleri"
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
                  {t("marineLug.tab1SystemsTitle")}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t("marineLug.tab1ShortDesc")}
                </p>
              </div>
              <div className="lg:col-span-2">
                {/* Product Thumbnails */}
                <div className="flex gap-3 mb-6">
                  <img src="/attached_assets/marine-lug-thumb-01.png" alt="Marine Lug View 1" className="w-40 h-20 object-cover rounded" />
                  <img src="/attached_assets/marine-lug-thumb-02.jpg" alt="Marine Lug View 2" className="w-40 h-20 object-cover rounded" />
                  <img src="/attached_assets/marine-lug-thumb-03.jpg" alt="Marine Lug View 3" className="w-40 h-20 object-cover rounded" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{t("marineLug.tab1WhatTitle")}</h3>
                <p className="text-gray-700 leading-relaxed text-base mb-6">
                  {t("marineLug.tab1WhatDesc")}
                </p>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="mt-12 space-y-8">
              {/* Advantages */}
              <div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-4">{t("marineLug.tab1AdvTitle")}</h3>
                <ul className="space-y-2">
                  {["tab1Adv1", "tab1Adv2", "tab1Adv3", "tab1Adv4"].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                      <span className="text-gray-700 leading-relaxed">{t(`marineLug.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage Areas */}
              <div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-4">{t("marineLug.tab1UsageTitle")}</h3>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  {t("marineLug.tab1UsageDesc")}
                </p>
              </div>

              {/* Product Features */}
              <div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-4">{t("marineLug.tab1FeatTitle")}</h3>
                <ul className="space-y-2">
                  {["tab1Feat1", "tab1Feat2", "tab1Feat3", "tab1Feat4"].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 bg-[#ef4444] rounded-full flex-shrink-0"></span>
                      <span className="text-gray-700 leading-relaxed">{t(`marineLug.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Marine Lug */}
              <div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-4">{t("marineLug.tab1WhyTitle")}</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {t("marineLug.tab1WhyDesc")}
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

      {/* TAB 3 - Video Gallery */}
      <div className={activeTab === "tab3" ? "block" : "hidden"}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={t(video.titleKey)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-sm text-gray-700 font-medium leading-snug">
                      {t(video.titleKey)}
                    </p>
                  </div>
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

export default MarineLugPage;
