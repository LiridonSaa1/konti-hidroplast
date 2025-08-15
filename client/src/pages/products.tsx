import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Product categories data
const productCategories = [
  {
    id: "water-supply",
    title: "Water Supply Systems",
    description:
      "High-quality PE and PP pipes for potable water distribution networks, meeting the highest standards for safety and durability.",
    image: "/attached_assets/Water-supply-min-1_1755115058874.jpg",
    specifications: [
      "Pressure ratings: PN 6, PN 10, PN 16",
      "Diameters: 20mm - 630mm",
      "Material: PE80, PE100",
      "Standards: EN 12201, ISO 4427",
    ],
    applications: [
      "Municipal water distribution",
      "Industrial water systems",
      "Irrigation networks",
      "Residential plumbing",
    ],
  },
  {
    id: "sewerage",
    title: "Sewerage Systems",
    description:
      "Robust sewerage pipes designed for wastewater collection and treatment systems with excellent chemical resistance.",
    image: "/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg",
    specifications: [
      "Ring stiffness: SN4, SN8, SN16",
      "Diameters: 110mm - 1200mm",
      "Material: PP, PE100",
      "Standards: EN 13476, ISO 21138",
    ],
    applications: [
      "Municipal sewerage networks",
      "Industrial wastewater",
      "Storm water management",
      "Treatment plant connections",
    ],
  },
  {
    id: "gas-pipeline",
    title: "Gas Pipeline System",
    description:
      "Specialized gas distribution pipes with superior safety features and long-term reliability for natural gas networks.",
    image: "/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg",
    specifications: [
      "Pressure ratings: PN 4, PN 10, PN 16",
      "Diameters: 32mm - 630mm",
      "Material: PE80, PE100-RC",
      "Standards: EN 1555, ISO 4437",
    ],
    applications: [
      "Natural gas distribution",
      "Industrial gas supply",
      "Residential gas connections",
      "Commercial gas networks",
    ],
  },
  {
    id: "cable-protection",
    title: "Cable Protection",
    description:
      "Protective conduit systems for electrical and telecommunications cables with enhanced impact resistance.",
    image: "/attached_assets/CABLE-PROTECTION-min-1_1755115210995.jpg",
    specifications: [
      "Impact resistance: > 15J",
      "Diameters: 40mm - 200mm",
      "Material: HDPE, PP",
      "Standards: EN 61386, IEC 61386",
    ],
    applications: [
      "Underground cable protection",
      "Telecommunications infrastructure",
      "Power distribution networks",
      "Industrial cable management",
    ],
  },
];

function ProductsPage() {
  const { t } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = "Products - Konti Hidroplast";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore our comprehensive range of PE and PP pipes for water supply, sewerage, gas pipeline systems, and cable protection. Quality products meeting international standards.",
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
              <div className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full inline-block">
                <span className="text-sm font-medium">HIGH-QUALITY PIPES</span>
              </div>
              <h1
                className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
                data-testid="products-hero-title"
              >
                PRODUCTS <span className="text-red-500">KONTI</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  HIDROPLAST
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="products-hero-description"
              >
                Global Applications Across Industries and Utilities
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <span className="text-sm font-medium">
                    Manufacturing Excellence
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <span className="text-sm font-medium">ISO Certified</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/attached_assets/Discovering-min_1755249567212.png"
                  alt="High-quality PE and PP pipe systems in manufacturing facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium">
                  Driving Progress With Innovation
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Product Range
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-12">
              <p>
                Konti Hidroplast products find a broad range of applications in
                the industrial and utilities market on a worldwide scale. The
                water and gas distribution enterprises are important sectors for
                high integrity products where the maintenance of water quality
                and the safe transport of gaseous fuels are of paramount
                importance.
              </p>
              <p>
                Industrial applications include alternative energy installations
                in landfill gas systems to effluent transportation and mineral
                slurry. Products are widely used in pipeline installation,
                repair and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {productCategories.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                data-testid={`product-card-${product.id}`}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-testid={`product-image-${product.id}`}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Category {index + 1}
                    </span>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-8">
                  <h3
                    className="text-2xl font-bold text-[#1c2d56] mb-4 group-hover:text-red-500 transition-colors duration-300"
                    data-testid={`product-title-${product.id}`}
                  >
                    {product.title}
                  </h3>
                  <p
                    className="text-gray-600 mb-6 leading-relaxed"
                    data-testid={`product-description-${product.id}`}
                  >
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#1c2d56] mb-3 text-lg">
                      Technical Specifications
                    </h4>
                    <ul
                      className="space-y-2"
                      data-testid={`product-specs-${product.id}`}
                    >
                      {product.specifications.map((spec, specIndex) => (
                        <li key={specIndex} className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700 text-sm">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#1c2d56] mb-3 text-lg">
                      Applications
                    </h4>
                    <div
                      className="flex flex-wrap gap-2"
                      data-testid={`product-apps-${product.id}`}
                    >
                      {product.applications.map((app, appIndex) => (
                        <span
                          key={appIndex}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-[#1c2d56] hover:text-white transition-colors duration-200"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      className="bg-[#1c2d56] text-white px-6 py-3 rounded-xl hover:bg-red-500 transition-colors duration-300 font-medium group/btn"
                      data-testid={`product-cta-${product.id}`}
                    >
                      <span className="mr-2">Learn More</span>
                      <span className="inline-block group-hover/btn:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </button>
                    <a
                      href="https://konti-hidroplast.com.mk/products/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1c2d56] hover:text-red-500 font-medium transition-colors duration-200"
                      data-testid={`product-catalog-${product.id}`}
                    >
                      View Catalog
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Flow Diagram */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background pipe image integration */}
        <div className="absolute inset-0">
          <img 
            src="/attached_assets/download_1755250894007.png"
            alt="PE Pipe Technical Specifications Diagram"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1c2d56] mb-6" data-testid="technical-flow-title">
              Technical <span className="text-red-500">Specifications</span> Flow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="technical-flow-description">
              Interactive polyethylene material classification and density relationships
            </p>
          </div>

          {/* Main Flow Diagram */}
          <div className="relative">
            {/* Top Row - PE Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
              {/* PE 23 */}
              <div className="col-start-1 lg:col-start-1">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-[#1c2d56] to-[#2a4086] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-200">
                    <span className="text-white font-bold text-lg">PE 23</span>
                  </div>
                  {/* Connecting line to PE 40 */}
                  <div className="hidden lg:block relative">
                    <div className="absolute top-4 left-1/2 w-px h-8 bg-[#1c2d56] transform -translate-x-0.5"></div>
                    <div className="absolute top-12 left-1/2 w-8 h-px bg-[#1c2d56] transform -translate-x-4"></div>
                  </div>
                </div>
              </div>

              {/* PE 63 */}
              <div className="col-start-2 lg:col-start-3">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-[#1c2d56] to-[#2a4086] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-200">
                    <span className="text-white font-bold text-lg">PE 63</span>
                  </div>
                  {/* Connecting line down */}
                  <div className="hidden lg:block relative">
                    <div className="absolute top-4 left-1/2 w-px h-12 bg-[#1c2d56] transform -translate-x-0.5"></div>
                  </div>
                </div>
              </div>

              {/* PE 80 */}
              <div className="col-start-1 lg:col-start-4">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-[#1c2d56] to-[#2a4086] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-200">
                    <span className="text-white font-bold text-lg">PE 80</span>
                  </div>
                  {/* Connecting line to PE 63 */}
                  <div className="hidden lg:block relative">
                    <div className="absolute top-4 left-1/2 w-px h-8 bg-[#1c2d56] transform -translate-x-0.5"></div>
                    <div className="absolute top-12 left-1/2 w-8 h-px bg-[#1c2d56] transform -translate-x-4"></div>
                  </div>
                </div>
              </div>

              {/* PE 63 (second) */}
              <div className="col-start-2 lg:col-start-6">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-[#1c2d56] to-[#2a4086] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-200">
                    <span className="text-white font-bold text-lg">PE 63</span>
                  </div>
                </div>
              </div>

              {/* PE 80 (second) */}
              <div className="col-start-1 lg:col-start-6">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-[#1c2d56] to-[#2a4086] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-200">
                    <span className="text-white font-bold text-lg">PE 80</span>
                  </div>
                </div>
              </div>

              {/* PE 100 */}
              <div className="col-start-2 lg:col-start-6">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-[#1c2d56] to-[#2a4086] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-200">
                    <span className="text-white font-bold text-lg">PE 100</span>
                  </div>
                </div>
              </div>

              {/* PE 100RC */}
              <div className="col-start-1 lg:col-start-7">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-[#1c2d56] to-[#2a4086] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-200">
                    <span className="text-white font-bold text-lg">PE 100RC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - Intermediate PE Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
              {/* PE 40 */}
              <div className="col-start-1 lg:col-start-2">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-[#2a4086] to-[#1c2d56] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-200">
                    <span className="text-white font-bold text-lg">PE 40</span>
                  </div>
                  {/* Connecting line down */}
                  <div className="hidden lg:block relative">
                    <div className="absolute top-4 left-1/2 w-px h-12 bg-[#1c2d56] transform -translate-x-0.5"></div>
                  </div>
                </div>
              </div>

              {/* PE 32 */}
              <div className="col-start-2 lg:col-start-3">
                <div className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-[#2a4086] to-[#1c2d56] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-200">
                    <span className="text-white font-bold text-lg">PE 32</span>
                  </div>
                  {/* Connecting lines to density categories */}
                  <div className="hidden lg:block relative">
                    <div className="absolute top-4 left-1/2 w-px h-16 bg-[#1c2d56] transform -translate-x-0.5"></div>
                    <div className="absolute top-20 left-1/2 w-32 h-px bg-[#1c2d56] transform -translate-x-16"></div>
                    <div className="absolute top-20 left-1/2 w-32 h-px bg-[#1c2d56]"></div>
                    <div className="absolute top-20 right-0 w-32 h-px bg-[#1c2d56]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Density Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {/* Low Density */}
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl p-8 text-center shadow-xl hover:shadow-2xl">
                  <div className="text-white">
                    <div className="text-2xl font-bold mb-3">Low Density</div>
                    <div className="text-blue-100 text-sm">PE 23, PE 32, PE 40</div>
                    <div className="mt-4 text-xs text-blue-200 leading-relaxed">
                      Suitable for low pressure applications and general purpose piping systems
                    </div>
                  </div>
                </div>
              </div>

              {/* Linear Low & Medium Density */}
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl p-8 text-center shadow-xl hover:shadow-2xl">
                  <div className="text-white">
                    <div className="text-2xl font-bold mb-3">Linear Low &</div>
                    <div className="text-2xl font-bold mb-3">Medium Density</div>
                    <div className="text-purple-100 text-sm">PE 63, PE 80</div>
                    <div className="mt-4 text-xs text-purple-200 leading-relaxed">
                      Enhanced performance for medium pressure and specialized applications
                    </div>
                  </div>
                </div>
              </div>

              {/* Medium & High Density */}
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl p-8 text-center shadow-xl hover:shadow-2xl">
                  <div className="text-white">
                    <div className="text-2xl font-bold mb-3">Medium &</div>
                    <div className="text-2xl font-bold mb-3">High Density</div>
                    <div className="text-green-100 text-sm">PE 100, PE 100RC</div>
                    <div className="mt-4 text-xs text-green-200 leading-relaxed">
                      Maximum strength and durability for high pressure and critical infrastructure
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SVG Connecting Lines for Desktop */}
            <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {/* Connecting lines from PE specifications to density categories */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                 refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#1c2d56" />
                </marker>
              </defs>
              
              {/* Lines from PE 32 to all three density categories */}
              <line x1="50%" y1="60%" x2="16.67%" y2="85%" stroke="#1c2d56" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              <line x1="50%" y1="60%" x2="50%" y2="85%" stroke="#1c2d56" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              <line x1="50%" y1="60%" x2="83.33%" y2="85%" stroke="#1c2d56" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            </svg>

            {/* Interactive Legend */}
            <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">Material Classification Guide</h3>
                <p className="text-gray-600">Click on any specification to learn more about its applications and properties</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-blue-600 font-bold text-lg mb-2">Pressure Rating</div>
                  <div className="text-gray-600 text-sm">PN 4 - PN 32 bar</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-purple-600 font-bold text-lg mb-2">Temperature Range</div>
                  <div className="text-gray-600 text-sm">-40°C to +60°C</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-green-600 font-bold text-lg mb-2">Lifespan</div>
                  <div className="text-gray-600 text-sm">50+ years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-[#1c2d56] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            data-testid="quality-section-title"
          >
            Quality & Standards
          </h2>
          <p
            className="text-xl text-white/90 mb-12 max-w-3xl mx-auto"
            data-testid="quality-section-description"
          >
            All our products meet or exceed international standards and are
            manufactured with the highest quality materials and processes.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" data-testid="standard-iso">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">ISO</span>
              </div>
              <h3 className="font-semibold mb-2">ISO Certified</h3>
              <p className="text-sm text-white/80">
                Quality Management Systems
              </p>
            </div>

            <div className="text-center" data-testid="standard-en">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">EN</span>
              </div>
              <h3 className="font-semibold mb-2">European Standards</h3>
              <p className="text-sm text-white/80">CE Marking Compliance</p>
            </div>

            <div className="text-center" data-testid="standard-testing">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🧪</span>
              </div>
              <h3 className="font-semibold mb-2">Quality Testing</h3>
              <p className="text-sm text-white/80">Rigorous Quality Control</p>
            </div>

            <div className="text-center" data-testid="standard-durability">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">50+ Years</h3>
              <p className="text-sm text-white/80">Product Lifespan</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1c2d56] mb-6"
            data-testid="cta-title"
          >
            Need Technical Support?
          </h2>
          <p
            className="text-xl text-gray-600 mb-8"
            data-testid="cta-description"
          >
            Our technical team is ready to help you choose the right products
            for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-[#1c2d56] text-white px-8 py-4 rounded-xl hover:bg-red-500 transition-colors duration-300 font-medium"
              data-testid="cta-contact-button"
            >
              Contact Our Team
            </button>
            <a
              href="https://konti-hidroplast.com.mk/products/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#1c2d56] text-[#1c2d56] px-8 py-4 rounded-xl hover:bg-[#1c2d56] hover:text-white transition-colors duration-300 font-medium"
              data-testid="cta-catalog-button"
            >
              Download Full Catalog
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductsPage;
