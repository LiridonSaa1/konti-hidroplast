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
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1c2d56] mb-6"
              data-testid="technical-flow-title"
            >
              Technical <span className="text-red-500">Specifications</span>{" "}
              Flow
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-testid="technical-flow-description"
            >
              Interactive polyethylene material classification and density
              relationships
            </p>
          </div>

          {/* Technical PE Specifications Diagram - Recreating the exact flow from the image */}
          <div className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-3xl">
            {/* Dark overlay with pipe texture */}
            <div className="absolute inset-0 bg-slate-900/90 rounded-3xl"></div>
            
            <div className="relative max-w-6xl mx-auto px-8">
              {/* Top Row - Main PE Specifications (as shown in image) */}
              <div className="grid grid-cols-7 gap-6 justify-items-center mb-16">
                <div className="bg-slate-800/90 border-2 border-slate-400 px-4 py-3 text-white font-semibold text-center min-w-[90px] hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 23
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-4 py-3 text-white font-semibold text-center min-w-[90px] hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 63
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-4 py-3 text-white font-semibold text-center min-w-[90px] hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 80
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-4 py-3 text-white font-semibold text-center min-w-[90px] hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 63
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-4 py-3 text-white font-semibold text-center min-w-[90px] hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 80
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-4 py-3 text-white font-semibold text-center min-w-[90px] hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 100
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-4 py-3 text-white font-semibold text-center min-w-[100px] hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 100RC
                </div>
              </div>

              {/* Middle Row - Intermediate Specifications (PE 40, PE 32, PE 63) */}
              <div className="flex justify-between items-center mb-16 px-8">
                <div className="bg-slate-800/90 border-2 border-slate-400 px-4 py-3 text-white font-semibold text-center min-w-[90px] hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 40
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-6 py-4 text-white font-semibold text-center min-w-[90px] text-lg hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 32
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-4 py-3 text-white font-semibold text-center min-w-[90px] hover:bg-slate-700 transition-colors cursor-pointer">
                  PE 63
                </div>
              </div>

              {/* Bottom Row - Density Categories */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="bg-slate-800/90 border-2 border-slate-400 px-6 py-6 text-white text-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <div className="font-semibold text-lg">Low density</div>
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-6 py-6 text-white text-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <div className="font-semibold text-lg mb-1">Linear low &</div>
                  <div className="font-semibold text-lg">medium density</div>
                </div>
                <div className="bg-slate-800/90 border-2 border-slate-400 px-6 py-6 text-white text-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <div className="font-semibold text-lg mb-1">Medium &</div>
                  <div className="font-semibold text-lg">high density</div>
                </div>
              </div>

              {/* Connection Lines - More accurate SVG based on image */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <defs>
                  <marker
                    id="flowArrow"
                    markerWidth="10"
                    markerHeight="8"
                    refX="9"
                    refY="4"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,8 L10,4 z" fill="rgba(255,255,255,0.8)" />
                  </marker>
                </defs>

                {/* Lines from top row to middle row - Left side */}
                <line x1="14%" y1="25%" x2="20%" y2="45%" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                <line x1="28%" y1="25%" x2="20%" y2="45%" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                
                {/* Lines from top row to middle row - Center */}
                <line x1="42%" y1="25%" x2="50%" y2="45%" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                <line x1="57%" y1="25%" x2="50%" y2="45%" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                
                {/* Lines from top row to middle row - Right side */}
                <line x1="71%" y1="25%" x2="80%" y2="45%" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                <line x1="85%" y1="25%" x2="80%" y2="45%" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

                {/* Lines from middle row to density categories */}
                <line x1="20%" y1="55%" x2="16.5%" y2="75%" stroke="rgba(255,255,255,0.8)" strokeWidth="2" markerEnd="url(#flowArrow)" />
                <line x1="50%" y1="55%" x2="50%" y2="75%" stroke="rgba(255,255,255,0.8)" strokeWidth="2" markerEnd="url(#flowArrow)" />
                <line x1="80%" y1="55%" x2="83.5%" y2="75%" stroke="rgba(255,255,255,0.8)" strokeWidth="2" markerEnd="url(#flowArrow)" />
              </svg>
            </div>

            {/* Interactive Legend */}
            <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">
                  Material Classification Guide
                </h3>
                <p className="text-gray-600">
                  Click on any specification to learn more about its
                  applications and properties
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-blue-600 font-bold text-lg mb-2">
                    Pressure Rating
                  </div>
                  <div className="text-gray-600 text-sm">PN 4 - PN 32 bar</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-purple-600 font-bold text-lg mb-2">
                    Temperature Range
                  </div>
                  <div className="text-gray-600 text-sm">-40°C to +60°C</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-green-600 font-bold text-lg mb-2">
                    Lifespan
                  </div>
                  <div className="text-gray-600 text-sm">50+ years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Products Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Products
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Products Grid - Vertical Card Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Product 1 - Water Supply Systems */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              {/* Product Image - Top */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/attached_assets/Water-supply-min-1_1755115058874.jpg"
                  alt="Water Supply Systems"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
              </div>

              {/* Product Content - Bottom */}
              <div className="p-8 relative">
                {/* Decorative accent */}
                <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                    WATER SUPPLY SYSTEMS
                  </h3>

                  {/* Learn More Button */}
                  <a
                    href="/products/water-supply-systems"
                    className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]"
                    data-testid="button-water-supply-learn-more"
                  >
                    <span>Learn More</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Product 2 - Sewerage Systems */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              {/* Product Image - Top */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/attached_assets/Konti-Hidroplast-Proizvodstvo-27-1_1755115099243.jpg"
                  alt="Sewerage Systems"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
              </div>

              {/* Product Content - Bottom */}
              <div className="p-8 relative">
                {/* Decorative accent */}
                <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                    SEWERAGE SYSTEMS
                  </h3>

                  {/* Learn More Button */}
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>Learn More</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Product 3 - Gas Pipeline System */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              {/* Product Image - Top */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg"
                  alt="Gas Pipeline System"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
              </div>

              {/* Product Content - Bottom */}
              <div className="p-8 relative">
                {/* Decorative accent */}
                <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                    GAS PIPELINE SYSTEM
                  </h3>

                  {/* Learn More Button */}
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>Learn More</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Product 4 - Cable Protection */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              {/* Product Image - Top */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src="/attached_assets/CABLE-PROTECTION-min-1_1755115210995.jpg"
                  alt="Cable Protection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
              </div>

              {/* Product Content - Bottom */}
              <div className="p-8 relative">
                {/* Decorative accent */}
                <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                    CABLE PROTECTION
                  </h3>

                  {/* Learn More Button */}
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>Learn More</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ProductsPage;
