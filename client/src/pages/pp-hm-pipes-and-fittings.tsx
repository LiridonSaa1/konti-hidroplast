import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ChevronDown,
  Download,
  Play,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// PP HM Pipe specifications data
const pipeSpecifications = [
  {
    id: "pp-hm",
    title: "PP HM Konti Kan",
    description:
      "PP (Polypropylene) double-wall corrugated pipes are widely used for drainage, sewage, and stormwater management systems due to their excellent material properties and structural design.",
    features: [
      "High stiffness ratings (SN 4, SN 6, SN 8, 10, 12, 16)",
      "Dimension range: DN/ID 100-1200mm",
      "Color: Outer black with inner light grey",
      "Strong corrugated structure for deep burial or heavy traffic loads",
      "Manning's coefficient is typically 0.009",
      "50+ years under normal operating conditions",
    ],
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/PPHMID.png",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/tabela-so-dimenzii-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-PPHM_EN-2024_posledna-promena_MART_compressed.pdf",
  },
];

// Fitting types data
const fittingTypes = [
  {
    id: "injection-molding",
    title: "Injection Molding",
    description: "Precision injection molded fittings for reliable connections",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: "Injection Molding Elbow",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/01-Injection_molding_elbow-1.pdf",
      },
      {
        name: "Injection Molding Tee",
        pdf: null,
      },
      {
        name: "Injection Molding Y-branch",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/03-Injection-molding-Y-branch-1.pdf",
      },
      {
        name: "Injection Molding Y-branch Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/04-Injection-molding-Y-branch-Reducer-1.pdf",
      },
      {
        name: "Injection Molding Tee Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/05-Injection-molding-TEE-Reducer-1.pdf",
      },
      {
        name: "Injection Molding Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/06-Injection-molding-Reducer-1.pdf",
      },
    ],
  },
  {
    id: "welded-fittings",
    title: "Welded Fittings",
    description: "High-strength welded fittings for permanent connections",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: "Welded Elbow 11°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/07-Welded-elbow-11-1.pdf",
      },
      {
        name: "Welded Elbow 22°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/08-Welded-elbow-22.pdf",
      },
      {
        name: "Welded Elbow 30°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/09-Welded-elbow-30.pdf",
      },
      {
        name: "Welded Elbow 45°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/10-Welded-elbow-45.pdf",
      },
      {
        name: "Welded Elbow 60°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/11-Welded-elbow-60-1.pdf",
      },
      {
        name: "Welded Elbow 90°",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/12-Welded-elbow-90-1.pdf",
      },
      {
        name: "Welded Tee",
        pdf: null,
      },
      {
        name: "Welded Y-branch",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/14-Welded-Y-branch-1.pdf",
      },
      {
        name: "Welded Tee Reducer",
        pdf: null,
      },
      {
        name: "Welded Y-branch Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/16-Welded-Y-branch-Reducer-1.pdf",
      },
      {
        name: "Welded Reducer",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/17-Welded-Reducer-1.pdf",
      },
      {
        name: "Welded End Cap",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/18-Welded-End-cap-1.pdf",
      },
    ],
  },
  {
    id: "connection-components",
    title: "Connection Components",
    description: "Essential components for secure pipe connections",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png",
    items: [
      {
        name: "Socket",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/19-Socket-1.pdf",
      },
      {
        name: "Flex Adapter",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/20-Flex-Adapter-1.pdf",
      },
      {
        name: "Gasket",
        pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/21-Gasket-1.pdf",
      },
    ],
  },
];

function PPHMPipesAndFittingsPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("pp-hm");
  const [activeFittingTab, setActiveFittingTab] = useState("injection-molding");
  const [activeFittingTabIndex, setActiveFittingTabIndex] = useState(0);

  const nextFittingTab = () => {
    const nextIndex =
      activeFittingTabIndex === fittingTypes.length - 1
        ? 0
        : activeFittingTabIndex + 1;
    setActiveFittingTabIndex(nextIndex);
    setActiveFittingTab(fittingTypes[nextIndex].id);
  };

  const prevFittingTab = () => {
    const prevIndex =
      activeFittingTabIndex === 0
        ? fittingTypes.length - 1
        : activeFittingTabIndex - 1;
    setActiveFittingTabIndex(prevIndex);
    setActiveFittingTab(fittingTypes[prevIndex].id);
  };

  useEffect(() => {
    // Set page title
    document.title = "PP HM Konti Kan Sewage Pipe - Konti Hidroplast";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "PP (Polypropylene) double-wall corrugated pipes are widely used for drainage, sewage, and stormwater management systems due to their excellent material properties and structural design.",
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
              <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
                <span className="text-sm font-medium">
                  ENGINEERED FOR EXCELLENCE
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                PP HM KONTI KAN
                <br />
                <span className="text-red-500">SEWAGE</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  PIPE
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                PP double-wall corrugated pipes are an excellent choice for
                heavy-duty sewage and drainage systems, offering superior
                durability, chemical resistance, and hydraulic efficiency.
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
                <img
                  src="/attached_assets/PPHMID-800x489_1755356237816.png"
                  alt="PP HM Konti Kan Sewage Pipe"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Technical Specifications
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                PP (Polypropylene) double-wall corrugated pipes are widely used
                for drainage, sewage, and stormwater management systems due to
                their excellent material properties and structural design.
                Common international standards for PP double-wall corrugated
                pipes include:
              </p>
              <p className="text-lg leading-relaxed">
                - EN 13476-1 and EN 13476-3: Production standard for
                structured-wall plastic pipes.
              </p>
              <p className="text-lg leading-relaxed">
                - ISO 21138: Specifications for non-pressure drainage and
                sewerage systems.
              </p>
              <p className="text-lg leading-relaxed">
                - ASTM F2736/F2764: Standards for polypropylene corrugated
                pipes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PP HM Konti Kan Pipes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                PP HM Konti Kan Pipes
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  PP HM Konti Kan
                </h3>
                <p className="text-white mb-6">
                  PP (Polypropylene) double-wall corrugated pipes are widely
                  used for drainage, sewage, and stormwater management systems
                  due to their excellent material properties and structural
                  design.
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  Material Properties:
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "Polypropylene (PP)",
                    "High strength-to-weight ratio",
                    "Greater chemical and thermal resistance compared to HDPE",
                    "Excellent resistance to abrasion, making it ideal for sewage applications",
                    "More rigid and durable in higher temperatures than HDPE",
                  ].map((property, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{property}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Application:
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "Municipal and industrial wastewater systems",
                    "Stormwater, rainwater harvesting, and subsoil drainage",
                    "Road and rail infrastructure, as culverts and drainage pipes",
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Characteristics:
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    "Strong corrugated structure for deep burial or heavy traffic loads",
                    "Smooth inner wall ensures low resistance to flow, improving hydraulic performance",
                    "High stiffness ratings (SN 4, SN 6, SN 8, 10, 12, 16)",
                    "Dimension range: DN/ID 100-1200mm",
                    "Color: Outer black with inner light grey",
                    "Manning's coefficient is typically 0.009, which minimizes clogging and sediment buildup",
                    "Designed to handle high flow rates in drainage and sewage systems",
                    "UV-stabilized for applications exposed to sunlight",
                    "Typically exceeds 50 years under normal operating conditions",
                    "Can operate between -20°C and +90°C, with short-term resistance to higher temperatures",
                    "Fully recyclable, making it an eco-friendly option",
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/tabela-so-dimenzii-en.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Specs
                  </a>
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-PPHM_EN-2024_posledna-promena_MART_compressed.pdf"
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
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/1000x1000-2.jpg"
                      alt="PP HM Konti Kan Pipes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/1000x1000.jpg"
                      alt="PP HM Manufacturing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PP HM Fittings Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                PP HM Fittings
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Fitting Tab Slider - matching water supply systems page design */}
          <div className="flex items-center justify-center mb-12">
            <button
              onClick={prevFittingTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors mr-4"
              data-testid="fitting-tab-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-4 min-w-[300px] text-center">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-1">
                {fittingTypes[activeFittingTabIndex].title}
              </h3>
              <div className="flex justify-center space-x-1 mt-3">
                {fittingTypes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveFittingTabIndex(index);
                      setActiveFittingTab(fittingTypes[index].id);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeFittingTabIndex
                        ? "bg-[#1c2d56]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    data-testid={`fitting-tab-dot-${index}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextFittingTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors ml-4"
              data-testid="fitting-tab-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
                              className="flex items-center gap-3 w-full text-[#1c2d56] hover:text-[#1c2d56]"
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

      {/* Contact Section */}
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
              Need more information about our PP HM sewage pipe solutions?
              Contact our team of experts.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-white text-lg font-semibold rounded-lg bg-[#1c2d56] hover:bg-[#1c2d56]/90 transition-colors shadow-lg"
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

export default PPHMPipesAndFittingsPage;
