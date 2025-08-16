import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Download, Play, Check } from "lucide-react";

// Konti Kan Spiral Pipe specifications data
const pipeSpecifications = [
  {
    id: "konti-kan-spiral",
    title: "KONTI KAN SPIRAL",
    description:
      "KONTI KAN SPIRAL PIPE is made of PEHD profile spirally wound on a drum with a specific diameter. Designed for large diameters and high stiffness requirements.",
    features: [
      "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or even higher",
      "Dimension range: Ø 1300 – 2000 mm",
      "Color: Black (other color on request)",
      "Length: 6m",
      "Service life of over 50 years under normal conditions",
      "Fully recyclable"
    ],
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Spiral-table-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-KONTI-SPIRAL_EN_2021_compressed.pdf",
  },
];

// Fitting types data
const fittingTypes = [
  {
    id: "connection-methods",
    title: "Connection Methods",
    description: "Various connection methods for Konti Kan spiral pipes",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Gogo_20240824_9420-24.jpg",
    items: [
      {
        name: "Connection with socket +EPDM gasket",
        pdf: null,
      },
      {
        name: "Extrusion welding from both side",
        pdf: null,
      },
      {
        name: "Extrusion welding inside",
        pdf: null,
      },
      {
        name: "Connection with thread with inside welding",
        pdf: null,
      },
      {
        name: "Electro fusion connection",
        pdf: null,
      },
      {
        name: "Connection with metal part with inside rubber layer",
        pdf: null,
      },
      {
        name: "But welding",
        pdf: null,
      },
    ],
  },
  {
    id: "reference-standards",
    title: "Reference Standards",
    description: "Compliance standards for various applications",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Gogo_20240824_9415-19.jpg",
    items: [
      {
        standard: "EN 13476-1:2007",
        application: "Sewage System – waste water and combined systems",
      },
      {
        standard: "EN 13476-2:2007",
        application: "When building highways",
      },
      {
        standard: "EN 476:2001",
        application: "Drainage of surface water",
      },
      {
        standard: "EN 1610:2002",
        application: "Residential drainage systems",
      },
      {
        standard: "EN 1852-1:1999",
        application: "Industrial pipelines",
      },
      {
        standard: "ENV 1046:2002 (Y)",
        application: "Underwater installations",
      },
      {
        standard: "SFS 5906:2004",
        application: "Renovation",
      },
    ],
  },
];

function KontiKanSpiralPipesPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("konti-kan-spiral");
  const [activeFittingTab, setActiveFittingTab] = useState("connection-methods");

  useEffect(() => {
    // Set page title
    document.title = "KONTI KAN SPIRAL – HDPE / ID - Konti Hidroplast";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "KONTI KAN SPIRAL PIPE is made of PEHD profile spirally wound on a drum with a specific diameter. Designed for large diameters and high stiffness requirements.",
      );
    }
  }, []);

  const referenceStandards = [
    { standard: "EN 13476-1:2007", application: "Sewage System – waste water and combined systems" },
    { standard: "EN 13476-2:2007", application: "When building highways" },
    { standard: "EN 476:2001", application: "Drainage of surface water" },
    { standard: "EN 1610:2002", application: "Residential drainage systems" },
    { standard: "EN 1852-1:1999", application: "Industrial pipelines" },
    { standard: "ENV 1046:2002 (У)", application: "Underwater installations" },
    { standard: "SFS 5906:2004", application: "Renovation" },
  ];

  const connectionMethods = [
    "Connection with socket +EPDM gasket",
    "Extrusion welding from both side",
    "Extrusion welding inside",
    "Connection with thread with inside welding or with thermo shrink tape",
    "Electro fusion connection",
    "Connection with metal part with inside rubber layer",
    "But welding"
  ];

  const materialProperties = [
    "High-Density Polyethylene (HDPE)",
    "Lightweight but strong, with high tensile strength.",
    "Excellent resistance to chemical and biological degradation.",
    "Flexible and resistant to environmental stress cracking."
  ];

  const applications = [
    "Sewerage and stormwater drainage systems.",
    "Large-scale water transport and storage.",
    "Industrial effluent pipelines.",
    "Culverts and irrigation systems.",
    "Ventilation ducts in mines."
  ];

  const characteristics = [
    "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or even higher for specific applications.",
    "Suitable for pipes with diameters ranging from Ø 1300 – 2000 mm, often used in large-scale infrastructure projects.",
    "Resistant to both acidic and alkaline environments.",
    "Service life of over 50 years under normal conditions.",
    "Can be used above ground with UV-stabilized formulations.",
    "Functional between -40°C to +60°C, with short-term resistance to higher temperatures.",
    "Fully recyclable."
  ];

  const usageAreas = [
    "Municipality for infrastructure objects",
    "Industry",
    "Roads building",
    "Reconstruction"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
                <span className="text-sm font-medium">
                  ENGINEERED FOR EXCELLENCE
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                KONTI KAN
                <br />
                <span className="text-red-500">SPIRAL</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  HDPE / ID
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                Clients and engineers as ideal pipe material for many pressure and non-pressure applications such as water distribution; gravity sewer, rehabilitation projects and manholes recognize polyethylene.
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
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Gogo_20240824_9415-19.jpg"
                  alt="KONTI KAN SPIRAL pipes manufacturing"
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
                Product Overview
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                Clients and engineers as ideal pipe material for many pressure and non-pressure applications such as water distribution; gravity sewer, rehabilitation projects and manholes recognize polyethylene.
              </p>
              <p className="text-lg leading-relaxed">
                Latest development of production of Konti Hidroplast is manufacturing sewage pipes for non-pressure applications. Konti Kan Spiral pipe and complete range of Konti Kan Spiral fittings.
              </p>
              <p className="text-lg leading-relaxed">
                Konti Kan Spiral pipes are made of hollow PE-HD sections helically wound on a drum with a specific diameter. Konti Kan Spiral Pipe provides all technical advantages of equivalent polyethylene solid wall pipe with substantial saving in weight combining greater ease of installation with increased cost effectiveness. Its unique structure can offer a range of pipe sizes and ring stiffness, depending of customers requirements.
              </p>
              <p className="text-lg leading-relaxed">
                The characteristics of raw material and the technology of production are combined to insure application in:
              </p>
              <ul className="text-lg leading-relaxed list-disc list-inside ml-4">
                <li>Municipality for infrastructure objects</li>
                <li>Industry</li>
                <li>Roads building</li>
                <li>Reconstruction</li>
              </ul>
              <p className="text-lg leading-relaxed">
                Konti Kan Spiral provides all technical advantages as well as polyethylene or polypropylene pipes with solid wall, the only difference is that Konti Kan Spiral are significantly lighter in weight and thus for the installation, which is also financially viable.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>Color:</strong> Black (other color on request) | <strong>Length:</strong> 6m
              </p>
              <p className="text-lg leading-relaxed">
                For connection of the pipes and fittings Konti Kan spiral pipe are use the following methods:
              </p>
              <ul className="text-lg leading-relaxed list-disc list-inside ml-4">
                <li>Connection with socket +EPDM gasket</li>
                <li>Extrusion welding from both side</li>
                <li>Extrusion welding inside</li>
                <li>Connection with thread with inside welding or with thermo shrink tape</li>
                <li>Electro fusion connection</li>
                <li>Connection with metal part with inside rubber layer</li>
                <li>But welding</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Konti Kan Spiral Pipes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                KONTI KAN SPIRAL Pipes
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  KONTI KAN SPIRAL
                </h3>
                <p className="text-white mb-6">
                  KONTI KAN SPIRAL PIPE is made of PEHD profile spirally wound on a drum with a specific diameter. It contains all technical advantages of equivalent polyethylene pipes with full walls significantly decreasing the weight, providing much easier installation and increased efficiency.
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  Material Properties:
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "High-Density Polyethylene (HDPE)",
                    "Lightweight but strong, with high tensile strength",
                    "Excellent resistance to chemical and biological degradation",
                    "Flexible and resistant to environmental stress cracking",
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
                    "Sewerage and stormwater drainage systems",
                    "Large-scale water transport and storage",
                    "Industrial effluent pipelines",
                    "Culverts and irrigation systems",
                    "Ventilation ducts in mines",
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
                    "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or even higher for specific applications",
                    "Suitable for pipes with diameters ranging from Ø 1300 – 2000 mm",
                    "Color: Black (other color on request)",
                    "Length: 6m",
                    "Resistant to both acidic and alkaline environments",
                    "Service life of over 50 years under normal conditions",
                    "Can be used above ground with UV-stabilized formulations",
                    "Functional between -40°C to +60°C",
                    "Fully recyclable",
                    "Municipality for infrastructure objects",
                    "Industry, Roads building, Reconstruction",
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Spiral-table-en.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Specs
                  </a>
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-KONTI-SPIRAL_EN_2021_compressed.pdf"
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
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral.jpg"
                      alt="KONTI KAN SPIRAL Pipes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Gogo_20240824_9420-24.jpg"
                      alt="KONTI KAN SPIRAL Manufacturing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KONTI KAN SPIRAL Connection & Standards Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Connection Methods & Standards
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
                {fitting.id === "reference-standards" ? (
                  <div>
                    <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">
                      {fitting.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{fitting.description}</p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-900">
                              Reference Standards
                            </th>
                            <th className="border border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-900">
                              Application
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {fitting.items.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-6 py-4 text-sm font-medium text-[#1c2d56]">
                                {'standard' in item ? item.standard : ''}
                              </td>
                              <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                                {'application' in item ? item.application : ''}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Methods List */}
                    <div>
                      <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">
                        {fitting.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{fitting.description}</p>
                      <div className="space-y-3">
                        {fitting.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            {'pdf' in item && item.pdf ? (
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
                                  {'name' in item ? item.name : ''}
                                </span>
                              </a>
                            ) : (
                              <div className="flex items-center gap-3 w-full text-gray-700">
                                <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-sm font-medium">{'name' in item ? item.name : ''}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column - Image */}
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
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
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
              Need more information about our KONTI KAN SPIRAL pipe solutions?
              Contact our team of experts.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#1c2d56] text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
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

export default KontiKanSpiralPipesPage;