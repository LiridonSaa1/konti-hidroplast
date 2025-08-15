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

          {/* Advanced PE Specifications Flow Diagram */}
          <div className="relative min-h-[800px]">
            
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/5 rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/5 rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-400/5 rounded-full"></div>
            </div>

            {/* Top Row - PE Specifications */}
            <div className="relative mb-16">
              <div className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12 flex-wrap lg:flex-nowrap">
                
                {/* PE 23 */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-[#1c2d56] via-[#2a4086] to-[#1c2d56] rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
                    <div className="text-center">
                      <div className="text-white font-bold text-xl mb-1">PE 23</div>
                      <div className="text-blue-200 text-xs">Low Density</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Connection to PE 40 */}
                  <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-0.5">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#1c2d56] to-purple-600"></div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-0.5 w-16 h-0.5 bg-gradient-to-r from-purple-600 to-[#1c2d56]"></div>
                  </div>
                </div>

                {/* PE 63 */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-700 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
                    <div className="text-center">
                      <div className="text-white font-bold text-xl mb-1">PE 63</div>
                      <div className="text-purple-200 text-xs">Medium Density</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Connection to PE 40 */}
                  <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-0.5">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-purple-600 to-[#1c2d56]"></div>
                  </div>
                </div>

                {/* PE 80 */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-green-700 via-emerald-600 to-green-700 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
                    <div className="text-center">
                      <div className="text-white font-bold text-xl mb-1">PE 80</div>
                      <div className="text-green-200 text-xs">High Performance</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Connection to PE 63 */}
                  <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-0.5">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-green-600 to-purple-600"></div>
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-0.5 w-16 h-0.5 bg-gradient-to-l from-purple-600 to-green-600"></div>
                  </div>
                </div>

                {/* PE 63 (Right Side) */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-700 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
                    <div className="text-center">
                      <div className="text-white font-bold text-xl mb-1">PE 63</div>
                      <div className="text-purple-200 text-xs">Medium Density</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* PE 80 (Right Side) */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-green-700 via-emerald-600 to-green-700 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
                    <div className="text-center">
                      <div className="text-white font-bold text-xl mb-1">PE 80</div>
                      <div className="text-green-200 text-xs">High Performance</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* PE 100 */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-red-700 via-red-600 to-red-700 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
                    <div className="text-center">
                      <div className="text-white font-bold text-xl mb-1">PE 100</div>
                      <div className="text-red-200 text-xs">Maximum Pressure</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* PE 100RC */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-orange-700 via-orange-600 to-orange-700 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
                    <div className="text-center">
                      <div className="text-white font-bold text-xl mb-1">PE 100RC</div>
                      <div className="text-orange-200 text-xs">Crack Resistant</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row - Intermediate PE Specifications */}
            <div className="relative mb-16">
              <div className="flex justify-center items-center gap-32">
                
                {/* PE 40 */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-700 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
                    <div className="text-center">
                      <div className="text-white font-bold text-2xl mb-2">PE 40</div>
                      <div className="text-indigo-200 text-sm">Standard Applications</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Connection to Low Density */}
                  <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-0.5">
                    <div className="w-0.5 h-16 bg-gradient-to-b from-indigo-600 to-blue-600"></div>
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-0.5 w-32 h-0.5 bg-gradient-to-l from-blue-600 to-indigo-600"></div>
                  </div>
                </div>

                {/* PE 32 - Central Hub */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-cyan-700 via-cyan-600 to-cyan-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-white/20 backdrop-blur-sm cursor-pointer">
                    <div className="text-center">
                      <div className="text-white font-bold text-3xl mb-3">PE 32</div>
                      <div className="text-cyan-200 text-lg">Hub Connector</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Three-way connections to density categories */}
                  <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-0.5">
                    <div className="w-0.5 h-20 bg-gradient-to-b from-cyan-600 to-transparent"></div>
                    
                    {/* Left connection */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-0.5 w-64 h-0.5 bg-gradient-to-l from-blue-600 to-cyan-600"></div>
                    
                    {/* Center connection */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-0.5 w-0.5 h-16 bg-gradient-to-b from-cyan-600 to-purple-600"></div>
                    
                    {/* Right connection */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-0.5 w-64 h-0.5 bg-gradient-to-r from-green-600 to-cyan-600"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - Enhanced Density Categories */}
            <div className="relative mt-32">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Low Density */}
                <div className="group cursor-pointer transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 rounded-3xl p-10 shadow-2xl hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-white text-center">
                      <div className="text-4xl mb-2">🔵</div>
                      <div className="text-3xl font-bold mb-4">Low Density</div>
                      <div className="text-blue-100 text-lg mb-4">PE 23, PE 32, PE 40</div>
                      <div className="text-blue-200 text-sm leading-relaxed">
                        Suitable for low pressure applications and general purpose piping systems with flexible installation requirements
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-white/20 rounded-lg p-2">PN 4-6</div>
                        <div className="bg-white/20 rounded-lg p-2">20-200mm</div>
                        <div className="bg-white/20 rounded-lg p-2">Standard</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Linear Low & Medium Density */}
                <div className="group cursor-pointer transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 rounded-3xl p-10 shadow-2xl hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-white text-center">
                      <div className="text-4xl mb-2">🟣</div>
                      <div className="text-2xl font-bold mb-2">Linear Low &</div>
                      <div className="text-2xl font-bold mb-4">Medium Density</div>
                      <div className="text-purple-100 text-lg mb-4">PE 63, PE 80</div>
                      <div className="text-purple-200 text-sm leading-relaxed">
                        Enhanced performance for medium pressure and specialized applications with improved durability
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-white/20 rounded-lg p-2">PN 6-16</div>
                        <div className="bg-white/20 rounded-lg p-2">32-630mm</div>
                        <div className="bg-white/20 rounded-lg p-2">Enhanced</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medium & High Density */}
                <div className="group cursor-pointer transform hover:scale-105 transition-all duration-500">
                  <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 rounded-3xl p-10 shadow-2xl hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-white text-center">
                      <div className="text-4xl mb-2">🟢</div>
                      <div className="text-2xl font-bold mb-2">Medium &</div>
                      <div className="text-2xl font-bold mb-4">High Density</div>
                      <div className="text-green-100 text-lg mb-4">PE 100, PE 100RC</div>
                      <div className="text-green-200 text-sm leading-relaxed">
                        Maximum strength and durability for high pressure and critical infrastructure with superior performance
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-white/20 rounded-lg p-2">PN 16-32</div>
                        <div className="bg-white/20 rounded-lg p-2">63-630mm</div>
                        <div className="bg-white/20 rounded-lg p-2">Premium</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Connection Lines */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" style={{ zIndex: 10 }}>
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1c2d56" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#2a4086" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#1c2d56" stopOpacity="0.8"/>
                  </linearGradient>
                  <marker id="arrowMarker" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L8,3 z" fill="url(#connectionGradient)"/>
                  </marker>
                </defs>
                
                {/* Dynamic connection lines with subtle animation */}
                <g className="animate-pulse">
                  <path d="M 50% 40% Q 20% 60% 16.67% 75%" stroke="url(#connectionGradient)" strokeWidth="3" fill="none" markerEnd="url(#arrowMarker)" opacity="0.7"/>
                  <path d="M 50% 40% L 50% 75%" stroke="url(#connectionGradient)" strokeWidth="3" fill="none" markerEnd="url(#arrowMarker)" opacity="0.7"/>
                  <path d="M 50% 40% Q 80% 60% 83.33% 75%" stroke="url(#connectionGradient)" strokeWidth="3" fill="none" markerEnd="url(#arrowMarker)" opacity="0.7"/>
                </g>
              </svg>
            </div>

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
