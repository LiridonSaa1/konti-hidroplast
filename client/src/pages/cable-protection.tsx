import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Download, Play, Check } from "lucide-react";

import Duct_min_400x400 from "@assets/Duct-min-400x400.jpg";

import duct_close_up_min_400x400 from "@assets/duct-close-up-min-400x400.jpg";

import KONTI_KAN_DUCT_Double_layered_corrugated_pipes_min_400x400 from "@assets/KONTI-KAN-DUCT-Double-layered-corrugated-pipes-min-400x400.jpg";

// Cable Protection specifications data
const cableProtectionProducts = [
  {
    id: "konti-kan-duct",
    title: "Konti Kan Duct Cable Protection",
    description:
      "The polyethylene pipes with small diameter are used for installing cable canalization, for underground placement. Mainly they are used as protection for optic cables, coaxial optic cables for distributive systems and other functional nets. They are also used for classical telecommunication cables with smaller diameter. Their exterior surface is smooth with longitudinal ribbed interior, and they are produced in coils up to 500 m.",
    applications: [
      "Protection for electrical power cables, fiber optics, and telecommunication cables.",
      "Suitable for installation in urban, industrial, and rural infrastructure projects.",
    ],
    materialProperties: [
      "Made from high-density polyethylene (HDPE), resistant to corrosion, abrasion, and environmental stress cracking.",
      "Excellent flexibility, making installation in curved pathways easier without the need for additional fittings.",
      "Inert to most chemicals, ensuring longevity even in aggressive environments.",
    ],
    dimensions: [
      "Nominal outer diameter: 32–75 mm",
      "Single pipe in diameters 32, 40 and 50 mm",
      "Double (twin) pipe in diameters 32, 40, 50 mm",
      "Quadruple pipes, composed by two different dimensions of 32 and 40 mm",
    ],
    characteristics: [
      "Compliance with relevant standards for cable ducting (e.g., EN 61386, EN 12201-2, or local equivalents)",
      "Eco-friendly: recyclable and non-toxic material",
      "UV-resistant variants available for outdoor installations",
      "Performs well in a wide temperature range (-40°C to +60°C for general applications)",
      "Resists deformation under soil and traffic loads, ensuring long-term stability in underground applications",
    ],
    image: "/attached_assets/duct-close-up-min-400x400_1755282820012.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/PTTcevki_so_mal_dijametar-tabela.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/konti-kan-dakt-en.pdf",
  },
  {
    id: "konti-kan-optic",
    title: "Konti Kan Optic Cable Protection",
    description:
      "These HDPE pipes are used for protection or holders of the protection pipes, especially for passage of roads and bridges. They are double wall pipes within the smooth interior and the exterior surface is corrugated.Pipes with bigger diameters that are used for insertion of a bundle of pipes for protection of optic cables and for road or bridge passage. They are produced in black, red and yellow color, but also in any special color requested by the customer.",
    features: [
      "Double wall pipes with smooth interior and corrugated exterior surface",
      "Used for protection or holders of the protection pipes",
      "Especially for passage of roads and bridges",
      "Produced in black, red and yellow color, or any special color requested",
      "Pipes with bigger diameters for insertion of a bundle of pipes",
      "Suitable for road or bridge passage",
    ],
    applications: [
      "Protecting power cables, telecommunication cables, and fiber optics",
      "Suitable for underground installations in urban, rural, or industrial environments",
      "Ideal for infrastructure projects requiring high mechanical protection",
    ],
    characteristics: [
      "Made from HDPE with exceptional resistance to wear, corrosion, and environmental degradation",
      "Nominal Diameter Range: 75 mm to 200 mm (outer diameter)",
      "Produced in straight form of 6 and 12 m, or in 50 m coils",
      "Inert to most chemicals, acids, and bases, making it suitable for diverse soil conditions",
      "UV-stabilized variants are available for outdoor installations",
      "Strong resistance to deformation under soil or static loads",
      "Suitable for a wide temperature range (-40°C to +60°C)",
      "Long service life (50+ years), reducing maintenance and replacement needs",
      "In compliance with international standards, such as EN 50086, EN 61386, EN 13476-3",
    ],
    image: "/attached_assets/KONTI-KAN-DUCT-Double-layered-corrugated-pipes-min-400x400_1755282822315.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/konti-kan-duct-dimenzii.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/konti-kan-dakt-en.pdf",
  },
];

const productTypes = [
  "KONTI KAN ELECTRO FLEX 450 N",
  "KONTI KAN ELECTRO FLEX 750 N",
  "KONTI KAN OPTICAL",
];

function CableProtectionPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("konti-kan-duct");

  useEffect(() => {
    // Set page title
    document.title = "Cable Protection - Konti Hidroplast";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "High-Density Polyethylene (HDPE) pipes for cable protection. Konti Kan Duct and Konti Kan Optic solutions for electrical power cables, fiber optics, and telecommunication infrastructure.",
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
                CABLE<span className="text-red-500"> PROTECTION</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  SYSTEMS
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                High-Density Polyethylene (HDPE) pipes with externally smooth
                and internally ribbed surfaces in the 32–75 mm diameter range
                designed for cable protection purposes.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Underground Installation
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Corrosion Resistant
                  </span>
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
                  aria-label="Konti Hidroplast cable protection systems manufacturing video"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
                Cable Protection
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  High-Density Polyethylene (HDPE) pipes with externally smooth
                  and internally ribbed surfaces in the 32–75 mm diameter range
                  are designed for cable protection purposes. Polyethylene pipes
                  for cable protection can be:
                </p>
                <p>
                  <b>Konti Kan Duct Cable protection</b> – Polyethylene pipes,
                  HDPE, externally smooth, internally serrated with a small
                  diameter.
                  <b>
                    Konti Kan Optic Cable protection– Polyethylene
                    double-layered corrugated pipes with outer corrugated and
                    inner smooth surface.
                  </b>
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                These pipes are divided in:
              </h3>
              <div className="space-y-3">
                {productTypes.map((type, index) => (
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
                Cable Protection Products
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {cableProtectionProducts.map((product) => (
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
          {cableProtectionProducts.map((product) => (
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
                        Applications
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
                          ? "Material Properties"
                          : "Characteristics"}
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
                          Dimensions
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
                      Download Specs
                    </a>
                    <a
                      href={product.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      data-testid="download-brochure"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Brochure
                    </a>
                  </div>
                </div>

                <div className="relative max-w-md mx-auto lg:mx-0">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src={KONTI_KAN_DUCT_Double_layered_corrugated_pipes_min_400x400}
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
      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
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

export default CableProtectionPage;
