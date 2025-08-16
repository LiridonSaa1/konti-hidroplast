import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Download, Play, Check } from "lucide-react";

import Gas_gore from "@assets/Gas-gore.jpg";

// PE Gas Pipe specifications data
const gasSpecifications = [
  {
    id: "gas-pe",
    title: "GAS",
    description:
      "Polyethylene gas pipes are made of PE 80 and PE 100, and are intended for distribution of gas through a network, up to working pressure of 10 bar.",
    features: [
      "Color: Black with longitudinal yellow lines, or yellow color for PE 80, and black with yellow lines or orange color for PE 100",
      "Standards: EN 1555-2 and ISO 4437",
      "PE 80: Designed for medium-pressure applications with good flexibility and durability",
      "PE 80: Suitable for smaller diameter and lower pressure systems",
      "PE 100: Higher density and strength compared to PE 80, designed for high-pressure systems",
      "PE 100: Enables thinner wall thickness for the same pressure class, leading to reduced weight and cost savings",
      "PE 100: Longer service life due to improved resistance to stress cracking and environmental stress",
      "PE 80 is preferred for low to medium-pressure systems with smaller diameters, while PE 100 is ideal for high-pressure systems, larger diameters, and long-term, demanding applications",
    ],
    image: "/attached_assets/Gas-gore_1755276687866.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/fizicki_karakteristiki_na_materijalot_za_cevki-gas-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-GAS-PIPES_EN-2021_compressed.pdf",
  },
  {
    id: "petroleum",
    title: "Petroleum Derivatives",
    description:
      "Konti Petrol gas pipe is a double-layered pipe with outer black surface made of PE100 standards, the same that apply for the classic PE i.e. EN 1555 or ISO 4437.",
    features: [
      "Color: Black with orange longitudinal lines on the outer layer, and orange inner layer",
      "Excellent resistance to volatile organic compounds from petroleum derivatives and prevents their crossing in the environment",
      "Protecting groundwater from impurities from the oil derivatives",
      "Resistance to extreme temperatures 35°C to 85°C",
      "Higher chemical resistance of the pipe",
      "Excellent resistance to abrasion",
      "Application: Transport of petrol diesel and other fuels in stations and refinery",
      "Application: Gas distribution",
      "Application: Special industrial application",
      "Application: Geothermal and city heating",
      "Dimensions: PE100-PE100-X pipes are produced in dimensions from 20mm to 250mm",
    ],
    image: "/attached_assets/Gogo_20240703_9145-Edit_1-min_1755276718413.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Konti-Petrol-Gas-Dimenzii.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-GAS-PIPES_EN-2021_compressed.pdf",
  },
];

// Gas Fitting types data
const gasFittingTypes = [
  {
    id: "butt-welding",
    title: "Butt Welding",
    description:
      "High-strength welded fittings for permanent gas pipe connections",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Butt-Wealding-min.png",
    items: [
      {
        name: "Fitting Stub Ends (Welding Collars)",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/1.PE_Fitinzi_-_Adapter_flansa-1.pdf",
      },
      {
        name: "Fitting – FF Piece",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/2.PE_Fitinzi_-_FF_Parce-1.pdf",
      },
      {
        name: "Fitting – Metal Flange",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/3.PE_Fitinzi_-_Flansa-1.pdf",
      },
      {
        name: "Fitting – Elbow 11°-12°-30°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/4.PE_Fitinzi_-_Koleno_11-22-30-1.pdf",
      },
      {
        name: "Fitting – Elbow 45°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/5.PE_Fitinzi_-_Koleno_45-1.pdf",
      },
      {
        name: "Fitting – Elbow 60°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/6.PE_Fitinzi_-_Koleno_60-1.pdf",
      },
      {
        name: "Fitting – Elbow 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/7.PE_Fitinzi_-_Koleno_90-1.pdf",
      },
      {
        name: "Fitting – Concentric Reducer",
        pdf: null,
      },
      {
        name: "Fitting – End Cup",
        pdf: null,
      },
      {
        name: "Fitting – Tee Outlet Without Reinforcement",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/8.PE_Fitinzi_-_Te_stek_nepojacan-1.pdf",
      },
      {
        name: "Fitting – Tee Outlet Reducer",
        pdf: null,
      },
      {
        name: "Fitting – Tee Outlet",
        pdf: null,
      },
    ],
  },
  {
    id: "electrofusion-fittings",
    title: "Electrofusion Fittings",
    description:
      "Electric welded fittings for automated and precise gas pipe joining",
    image: "/attached_assets/Electrofusion-fittings-min_1755268811656.png",
    items: [
      {
        name: "Electrofusion Socket",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/1_str_Elektrofuzioni_fitinzi-elektrofuzionen_muf.pdf",
      },
      {
        name: "Electrofusion Tee Outlet",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/2_str_Elektrofuzioni_fitinzi-elektrofuzionen_te_stek.pdf",
      },
      {
        name: "Electrofusion Tee Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/3_str_Elektrofuzioni_fitinzi-elektrofuzionen_te_stek_reducir.pdf",
      },
      {
        name: "Electrofusion Elbow 45°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/4_str_Elektrofuzioni_fitinzi-elektrofuziono_koleno_45.pdf",
      },
      {
        name: "Electrofusion Elbow 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/5_str_Elektrofuzioni_fitinzi-elektrofuziono_koleno_90.pdf",
      },
      {
        name: "Electrofusion Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/6_str_Elektrofuzioni_fitinzi-elektrofuzionen_reducir.pdf",
      },
      {
        name: "Electrofusion End Cap",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/7_str_Elektrofuzioni_fitinzi-elektrofuziona_stopna.pdf",
      },
      {
        name: "Electrofusion Adapter Socket Integrated Welding Module Male Thread",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/8_str_Elektrofuzioni_fitinzi-elektrofuzionen_adapter_muf_so_maski_navoj_od_mesing.pdf",
      },
      {
        name: "Electrofusion Adapter Elbow 45° Integrated Welding Module Male Thread",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/9_str_Elektrofuzioni_fitinzi-elektrofuzionen_adapter_koleno_45_so_maski_navoj_od_mesing.pdf",
      },
      {
        name: "Electrofusion Adapter Elbow 90° Integrated Welding Module Male Thread",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/10_str_Elektrofuzioni_fitinzi-elektrofuzionen_adapter_koleno_90_so_maski_navoj_od_mesing.pdf",
      },
      {
        name: "Tapping Saddle With Electrofusion Sealing Cap",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/11_str_Elektrofuzioni_fitinzi-ogrlica_za_busenje_so_vgradena_elektrofuziona_kapa.pdf",
      },
      {
        name: "Universal Tapping Valve With Thread Insert",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/12_str_Elektrofuzioni_fitinzi-ogrlica_so_vgraden_navoj_od_mesing.pdf",
      },
      {
        name: "Plastic Tapping Valve With Integrated Cutter",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/13_str_Elektrofuzioni_fitinzi-plasticen_ventil_za_busenje_so_vgraden_sekac_od_mesing.pdf",
      },
    ],
  },
];

function GasPipelineSystemsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("gas-pe");
  const [activeFittingTab, setActiveFittingTab] = useState("butt-welding");

  useEffect(() => {
    // Set page title
    document.title = "Gas Pipeline Systems - Konti Hidroplast";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover our comprehensive range of PE gas pipeline pipes and fittings. PE-80 and PE-100 pipes for gas distribution systems with working pressure up to 10 bar.",
      );
    }
  }, []);

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
              <div className="mb-6 bg-[#ef4444]  text-white px-4 py-2 rounded-full inline-block">
                <span className="text-sm font-medium">
                  ENGINEERED FOR EXCELLENCE
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                GAS<span className="text-red-500">PIPELINE</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  SYSTEM
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                High-quality polyethylene pipes for gas distribution networks,
                meeting the highest standards for safety and reliability up to
                10 bar working pressure.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Up to 10 Bar</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    EN 1555-2 & ISO 4437
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src={Gas_gore}
                  alt="Gas Pipeline Systems"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#ef4444] text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium">Premium Quality</span>
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
                Technical Specifications
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Polyethylene gas pipes are made of PE 80 and PE 100 materials,
                  and are intended for distribution of gas through a network, up
                  to working pressure of 10 bar.
                </p>
                <p>
                  PE 80 (Medium Density Polyethylene) are designed for
                  medium-pressure applications and offer good flexibility and
                  durability.
                </p>
                <p>
                  PE 100 (High-Density Polyethylene) have higher density and
                  strength compared to PE 80 and are designed for high-pressure
                  systems with enhanced safety features.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                General Properties
              </h3>
              <div className="space-y-3">
                {[
                  "Working pressure up to 10 bar",
                  "Excellent chemical resistance",
                  "Superior welding capabilities",
                  "Smooth internal surface",
                  "Suitable for gas distribution",
                  "Long lifespan (more than 50 years)",
                  "100% recycling possibility",
                  "Complies with EN 1555-2 and ISO 4437",
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
      {/* Gas Pipeline Pipes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#ffffff]">
                Gas Pipeline Pipes
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {gasSpecifications.map((spec) => (
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
          {gasSpecifications.map((spec) => (
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
                      className="inline-flex items-center px-6 py-3 bg-[#ffffff] text-[#1c2d56] rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Specs
                    </a>
                    <a
                      href={spec.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Brochure
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
                PE Fittings
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Fitting Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap bg-gray-100 rounded-xl p-1">
              {gasFittingTypes.map((fitting) => (
                <button
                  key={fitting.id}
                  onClick={() => setActiveFittingTab(fitting.id)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                    activeFittingTab === fitting.id
                      ? "bg-[#1c2d56] text-white shadow-lg"
                      : "text-gray-600 hover:text-[#1c2d56]"
                  }`}
                >
                  {fitting.title}
                </button>
              ))}
            </div>
          </div>

          {/* Fitting Content */}
          {gasFittingTypes.map((fitting) => (
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
                              className="flex items-center gap-3 w-full text-[#1c2d56] hover:text-blue-700"
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
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Get in Touch: Connect with Us Today!
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Need more information about our cable protection solutions?
              Contact our team of experts.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#1c2d56] text-white rounded-lg hover:bg-blue-900 transition-colors text-lg font-semibold"
              data-testid="contact-button"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default GasPipelineSystemsPage;
