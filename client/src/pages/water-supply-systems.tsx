import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Download, Play, Check } from "lucide-react";

// PE Pipe specifications data
const pipeSpecifications = [
  {
    id: "pe-80",
    title: "PE-80",
    description:
      "High density polyethylene pipes designed for medium-pressure water supply applications",
    features: [
      "Design stress: σ=6.3МПа",
      "MRS: 8",
      "Factor of safety: C=1.25",
      "Color: black with blue coextruded lines or light blue",
      "Operating Temperature: -20°C to +60°C",
      "Service life of 50+ years under normal operating conditions",
    ],
    image: "/attached_assets/PE80-2-min-400x300 (1)_1755267337767.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/pe-80-tabela-dimenzii-en-1.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
  },
  {
    id: "pe-100",
    title: "PE-100",
    description:
      "Third generation PE of high density for high-pressure applications and critical utility services",
    features: [
      "Design stress: σ=8.0 МПа",
      "MRS: 10",
      "Factor of safety: C=1.25",
      "Color: black with blue coextruded lines or blue",
      "Operating temperature: -40°C to +60°C",
      "Pressure ratings up to PN 32",
    ],
    image:
      "/attached_assets/Gogo_20240703_8990-Edit_1-400x400 (1)_1755267345589.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/pe-100-tabela-za-dimenzii-i-pritisoci-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-Water-Pipes_EN_2021_compressed.pdf",
  },
  {
    id: "pe-100-rc",
    title: "PE-100 RC",
    description:
      "Specialized variant with greater resistance to slow crack growth and environmental stress cracking",
    features: [
      "Material: High quality PE 100-RC material and PE 100",
      "Standards: EN 12201-2 and PAS 1075",
      "Project elongation: σ=8.0МПа",
      "Factor of safety: C=1.25",
      "Color: Black with yellow or orange lines, or entirely orange",
      "Service life of 100+ years under normal operating conditions",
    ],
    image:
      "/attached_assets/Gogo_20240703_9065-Edit_1-min-400x400_1755267373881.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/tabela_100_RC-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Broshura-PE100-RC_EN_2021_compressed.pdf",
  },
];

// Fitting types data
const fittingTypes = [
  {
    id: "butt-welding",
    title: "Butt Welding",
    description: "High-strength welded fittings for permanent pipe connections",
    image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Butt-Wealding-min.png",
    items: [
      {
        name: "Fitting Stub Ends (Welding Collars)",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/1.PE_Fitinzi_-_Adapter_flansa-1.pdf"
      },
      {
        name: "Fitting – FF Piece",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/2.PE_Fitinzi_-_FF_Parce-1.pdf"
      },
      {
        name: "Fitting – Metal Flange",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/3.PE_Fitinzi_-_Flansa-1.pdf"
      },
      {
        name: "Fitting – Elbow 11°-12°-30°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/4.PE_Fitinzi_-_Koleno_11-22-30-1.pdf"
      },
      {
        name: "Fitting – Elbow 45°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/5.PE_Fitinzi_-_Koleno_45-1.pdf"
      },
      {
        name: "Fitting – Elbow 60°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/6.PE_Fitinzi_-_Koleno_60-1.pdf"
      },
      {
        name: "Fitting – Elbow 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/7.PE_Fitinzi_-_Koleno_90-1.pdf"
      },
      {
        name: "Fitting – Concentric Reducer",
        pdf: null
      },
      {
        name: "Fitting – End Cup",
        pdf: null
      },
      {
        name: "Fitting – Tee Outlet Without Reinforcement",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/8.PE_Fitinzi_-_Te_stek_nepojacan-1.pdf"
      },
      {
        name: "Fitting – Tee Outlet Reducer",
        pdf: null
      },
    ],
  },
  {
    id: "mechanical-fittings",
    title: "Mechanical Fittings",
    description: "Compression fittings for quick and reliable pipe connections",
    image: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Mechanical-fittings-min.png",
    items: [
      {
        name: "Coupling",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/1-spojka.pdf"
      },
      {
        name: "Reducer Coupling",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/2-reducir-spojka.pdf"
      },
      {
        name: "Adapter Coupling Male",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/3-adapter-spojka-m.pdf"
      },
      {
        name: "Adapter Coupling Female",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/stopna.pdf"
      },
      {
        name: "Line End",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/4-stopna.pdf"
      },
      {
        name: "Reducing Coupling 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/5-te-reducir-90.pdf"
      },
      {
        name: "Tee Male Thread 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/6-te-stek-90-so-navoj-m.pdf"
      },
      {
        name: "Tee Female Thread 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/7-te-stek-90-so-navoj-f.pdf"
      },
      {
        name: "Equal Tee 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/8-te-stek-90.pdf"
      },
      {
        name: "Elbow 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/9-koleno-90.pdf"
      },
      {
        name: "2 Bolt Saddle",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/12-ogrlica-so-2-navrtki.pdf"
      },
      {
        name: "4 Bolt Saddle Female Thread",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/13-ogrlica-so-4-navrtki-so-zajaknat-nergosuvacki-metalen-prsten.pdf"
      },
      {
        name: "6 Bolt Saddle Female Thread",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/14-ogrlica-so-6-navrtki-so-zajaknat-nergosuvacki-metalen-prsten.pdf"
      },
    ],
  },
  {
    id: "electrofusion-fittings",
    title: "Electrofusion Fittings",
    description: "Electric welded fittings for automated and precise pipe joining",
    image: "/attached_assets/Electrofusion-fittings-min_1755268811656.png",
    items: [
      {
        name: "Electrofusion Socket",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/1_str_Elektrofuzioni_fitinzi-elektrofuzionen_muf.pdf"
      },
      {
        name: "Electrofusion Tee Outlet",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/2_str_Elektrofuzioni_fitinzi-elektrofuzionen_te_stek.pdf"
      },
      {
        name: "Electrofusion Tee Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/3_str_Elektrofuzioni_fitinzi-elektrofuzionen_te_stek_reducir.pdf"
      },
      {
        name: "Electrofusion Elbow 45°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/4_str_Elektrofuzioni_fitinzi-elektrofuziono_koleno_45.pdf"
      },
      {
        name: "Electrofusion Elbow 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/5_str_Elektrofuzioni_fitinzi-elektrofuziono_koleno_90.pdf"
      },
      {
        name: "Electrofusion Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/6_str_Elektrofuzioni_fitinzi-elektrofuzionen_reducir.pdf"
      },
      {
        name: "Electrofusion End Cap",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/7_str_Elektrofuzioni_fitinzi-elektrofuziono_Cep.pdf"
      },
    ],
  },
];

function WaterSupplySystemsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("pe-80");
  const [activeFittingTab, setActiveFittingTab] = useState("butt-welding");

  useEffect(() => {
    // Set page title
    document.title = "Water Supply Systems - Konti Hidroplast";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover our comprehensive range of PE water supply pipes and fittings. PE-80, PE-100, and PE-100 RC pipes with various connection options for reliable water distribution systems.",
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
              <div className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full inline-block">
                <span className="text-sm font-medium">
                  ENGINEERED FOR EXCELLENCE
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                WATERT<span className="text-red-500">SUPPLY</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  SYSTEM
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                High-quality polyethylene pipes for potable water distribution
                networks, meeting the highest standards for safety and
                durability.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    50+ Years Lifespan
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">100% Recyclable</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <video
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/Konti-Hidroplast_1-1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Konti Hidroplast water supply systems manufacturing video"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
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
                  The pipes' color is black with an inner white layer and
                  coextruded blue lines, or blue with an inner white layer.
                </p>
                <p>
                  The range of diameters is from DN 16mm to DN 630mm, and the
                  pressures are from PN 6 to PN 32 bar.
                </p>
                <p>
                  Pipes of the DN-16-110mm range are easily bended, so they can
                  be wound in coils of different lengths, and the requirements
                  for fittings and the time for installation can be reduced.
                  Pipes of range 125-800mm are produced in straight pipes of 6
                  or 12m.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                General Properties
              </h3>
              <div className="space-y-3">
                {[
                  "Low specific weight",
                  "Flexibility",
                  "Good chemical resistance",
                  "Excellent welding options",
                  "Smooth internal surface resistant to deposits",
                  "Suitable for drinking water",
                  "Long lifespan (more than 50 years)",
                  "100% recycling possibility",
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

      {/* PE Water-Supply Pipes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#ffffff]">
                PE Water-Supply Pipes
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {pipeSpecifications.map((spec) => (
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
          {pipeSpecifications.map((spec) => (
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
                      className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-[#ffffff] rounded-lg transition-colors"
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
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
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
              {fittingTypes.map((fitting) => (
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
          {fittingTypes.map((fitting) => (
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
                    <p className="text-gray-700 mb-8">{fitting.description}</p>

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
                              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                                <Download className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-sm font-medium">{item.name}</span>
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

      <Footer />
    </div>
  );
}

export default WaterSupplySystemsPage;
