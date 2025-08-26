import React, { useState } from "react";
import { Download, CheckCircle, Shield, Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLocation } from "wouter";

import ductCloseUpImage from "@assets/duct-close-up-min-400x400_1755282820012.jpg";
import opticCableImage from "@assets/KONTI-KAN-DUCT-Double-layered-corrugated-pipes-min-400x400_1755282822315.jpg";

// Cable Protection specifications data
const getCableProtectionProducts = (t: any) => [
  {
    id: "konti-kan-duct",
    title: t("cableProtection.kontiKanDuctProtection"),
    description: t("cableProtection.ductDescription"),
    applications: [
      t("cableProtection.applicationElectrical"),
      t("cableProtection.applicationInfrastructure"),
    ],
    materialProperties: [
      t("cableProtection.materialHDPE"),
      t("cableProtection.flexibility"),
      t("cableProtection.chemicalResistance"),
    ],
    dimensions: [
      t("cableProtection.nominalDiameter"),
      t("cableProtection.singlePipe"),
      t("cableProtection.doublePipe"),
      t("cableProtection.quadruplePipe"),
    ],
    characteristics: [
      t("cableProtection.compliance"),
      t("cableProtection.ecoFriendly"),
      t("cableProtection.uvResistant"),
      t("cableProtection.temperatureRange"),
      t("cableProtection.deformationResistance"),
    ],
    image: ductCloseUpImage,
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/PTTcevki_so_mal_dijametar-tabela.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/konti-kan-dakt-en.pdf",
  },
  {
    id: "konti-kan-optic",
    title: t("cableProtection.kontiKanOpticProtection"),
    description: t("cableProtection.opticDescription"),
    features: [
      t("cableProtection.doubleWallPipes"),
      t("cableProtection.protectionHolders"),
      t("cableProtection.roadsBridges"),
      t("cableProtection.colorOptions"),
      t("cableProtection.biggerDiameters"),
      t("cableProtection.roadBridgePassage"),
    ],
    applications: [
      t("cableProtection.opticApplicationPower"),
      t("cableProtection.opticApplicationUnderground"),
      t("cableProtection.opticApplicationInfrastructure"),
    ],
    characteristics: [
      t("cableProtection.madeFromHDPE"),
      t("cableProtection.nominalDiameterRange"),
      t("cableProtection.productionForm"),
      t("cableProtection.chemicalInert"),
      t("cableProtection.uvStabilized"),
      t("cableProtection.deformationResistance"),
      t("cableProtection.temperatureRange"),
      t("cableProtection.serviceLife"),
      t("cableProtection.compliance"),
    ],
    image: opticCableImage,
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/konti-kan-duct-dimenzii.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/konti-kan-dakt-en.pdf",
  },
];

const getProductTypes = (t: any) => [
  t("cableProtection.electroFlex450"),
  t("cableProtection.electroFlex750"),
  t("cableProtection.optical"),
];

function CableProtectionPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("konti-kan-duct");
  const [location, setLocation] = useLocation();

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
                  {t("cableProtection.engineeredForExcellence")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                {t("cableProtection.cableProtection")}<span className="text-red-500"> {t("cableProtection.systems")}</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {t("cableProtection.systems")}
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                {t("cableProtection.heroDescription")}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t("cableProtection.undergroundInstallation")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {t("cableProtection.corrosionResistant")}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <video
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/Cable-Protection.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label={`${t("cableProtection.kontiKanDuctProtection")} ${t("cableProtection.manufacturingVideo")}`}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">{t("cableProtection.premiumQuality")}</span>
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
                {t("cableProtection.cableProtection")}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {t("cableProtection.mainDescription")}
                </p>
                <p>
                  <b>{t("cableProtection.kontiKanDuct")}</b>
                  <b>{t("cableProtection.kontiKanOptic")}</b>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                {t("cableProtection.dividedIn")}
              </h3>
              <div className="space-y-3">
                {getProductTypes(t).map((type, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Cable Protection Products Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#ffffff]">
                {t("cableProtection.products")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {getCableProtectionProducts(t).map((product) => (
                <button
                  key={product.id}
                  onClick={() => setActiveTab(product.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === product.id
                      ? "bg-[#1c2d56] text-white shadow-lg"
                      : "text-gray-600 hover:text-[#1c2d56]"
                  }`}
                >
                  {product.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {getCableProtectionProducts(t).map((product) => (
            <div
              key={product.id}
              className={`${activeTab === product.id ? "block" : "hidden"} transition-all duration-500`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-[#ffffff] mb-4">
                    {product.title}
                  </h3>
                  <p className="text-[#ffffff] mb-6">{product.description}</p>

                  <div className="space-y-6">
                    {/* Features */}
                    {/* <div>
                      <h4 className="text-xl font-semibold text-[#ffffff] mb-3">
                        Features
                      </h4>
                      <div className="space-y-2">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-[#ffffff] text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div> */}

                    {/* Applications */}
                    <div>
                      <h4 className="text-xl font-semibold text-[#ffffff] mb-3">
                        {t("cableProtection.applications")}
                      </h4>
                      <div className="space-y-2">
                        {product.applications.map((application, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span className="text-[#ffffff] text-sm">
                              {application}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Material Properties or Characteristics */}
                    <div>
                      <h4 className="text-xl font-semibold text-[#ffffff] mb-3">
                        {product.materialProperties
                          ? t("cableProtection.materialProperties")
                          : t("cableProtection.characteristics")}
                      </h4>
                      <div className="space-y-2">
                        {(
                          product.materialProperties || product.characteristics
                        ).map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                            <span className="text-[#ffffff] text-sm">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dimensions (for Konti Kan Duct only) */}
                    {product.dimensions && (
                      <div>
                        <h4 className="text-xl font-semibold text-[#ffffff] mb-3">
                          {t("cableProtection.dimensions")}
                        </h4>
                        <div className="space-y-2">
                          {product.dimensions.map((dimension, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <Check className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                              <span className="text-[#ffffff] text-sm">
                                {dimension}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <a
                      href={product.specifications}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-[#ffffff] rounded-lg transition-colors"
                      data-testid="download-specs"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("cableProtection.downloadSpecs")}
                    </a>
                    <a
                      href={product.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      data-testid="download-brochure"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("cableProtection.downloadBrochure")}
                    </a>
                  </div>
                </div>

                <div className="relative max-w-md mx-auto lg:mx-0">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("cableProtection.contactTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {t("cableProtection.contactDescription")}
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
              {t("cableProtection.contactUs")}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default CableProtectionPage;
