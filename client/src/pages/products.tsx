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
                OUR <span className="text-red-500">PRODUCTS</span>
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

      {/* Product Range Technical Overview */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-32 -translate-y-32"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" data-testid="product-range-title">
              Product Range <span className="text-red-500">Specifications</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="product-range-description">
              Comprehensive technical overview of our polyethylene and polypropylene pipe systems
            </p>
          </div>

          {/* Technical Specifications Diagram */}
          <div className="relative">
            {/* Background Image Integration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-slate-900/40 rounded-3xl"></div>
            <div className="relative bg-black/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              
              {/* Main Diagram Container */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                
                {/* Left Column - Low Density */}
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg">
                      <span className="text-white font-bold text-lg">Low Density</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {['PE 23', 'PE 32', 'PE 40'].map((spec, index) => (
                      <div key={spec} className="group">
                        <div className="bg-gradient-to-r from-slate-700 to-slate-600 border border-blue-400/30 rounded-xl p-4 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold text-lg">{spec}</span>
                            <div className="w-3 h-3 bg-blue-400 rounded-full group-hover:bg-white transition-colors"></div>
                          </div>
                          <div className="mt-2 text-blue-200 text-sm opacity-75">
                            {spec === 'PE 23' && 'Minimum density applications'}
                            {spec === 'PE 32' && 'Light pressure systems'}
                            {spec === 'PE 40' && 'Standard applications'}
                          </div>
                        </div>
                        
                        {/* Connecting Lines */}
                        <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-px bg-gradient-to-r from-blue-400 to-transparent transform -translate-y-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Center Column - Medium Density */}
                <div className="space-y-8 lg:scale-110">
                  <div className="text-center mb-8">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg">
                      <span className="text-white font-bold text-lg">Linear Low & Medium</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {['PE 63', 'PE 80'].map((spec, index) => (
                      <div key={spec} className="group relative">
                        <div className="bg-gradient-to-r from-purple-700 to-purple-600 border border-purple-400/30 rounded-xl p-6 hover:from-pink-700 hover:to-pink-600 transition-all duration-300 cursor-pointer transform hover:scale-110 shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-bold text-xl">{spec}</span>
                            <div className="w-4 h-4 bg-purple-400 rounded-full group-hover:bg-white transition-colors"></div>
                          </div>
                          <div className="mt-3 text-purple-200 text-sm opacity-90">
                            {spec === 'PE 63' && 'Medium pressure systems'}
                            {spec === 'PE 80' && 'High performance applications'}
                          </div>
                        </div>
                        
                        {/* Enhanced Connecting Lines */}
                        <div className="hidden lg:block absolute top-1/2 -left-8 w-8 h-px bg-gradient-to-r from-transparent to-purple-400 transform -translate-y-1/2"></div>
                        <div className="hidden lg:block absolute top-1/2 -right-8 w-8 h-px bg-gradient-to-r from-purple-400 to-transparent transform -translate-y-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - High Density */}
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full shadow-lg">
                      <span className="text-white font-bold text-lg">Medium & High Density</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {['PE 100', 'PE 100RC'].map((spec, index) => (
                      <div key={spec} className="group">
                        <div className="bg-gradient-to-r from-green-700 to-green-600 border border-green-400/30 rounded-xl p-4 hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-semibold text-lg">{spec}</span>
                            <div className="w-3 h-3 bg-green-400 rounded-full group-hover:bg-white transition-colors"></div>
                          </div>
                          <div className="mt-2 text-green-200 text-sm opacity-75">
                            {spec === 'PE 100' && 'Maximum pressure capability'}
                            {spec === 'PE 100RC' && 'Crack-resistant technology'}
                          </div>
                        </div>
                        
                        {/* Connecting Lines */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-8 h-px bg-gradient-to-r from-transparent to-green-400 transform -translate-y-1/2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Technical Stats */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl font-bold text-blue-400 mb-2">20-630mm</div>
                  <div className="text-gray-300 text-sm">Diameter Range</div>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl font-bold text-purple-400 mb-2">PN 4-32</div>
                  <div className="text-gray-300 text-sm">Pressure Ratings</div>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl font-bold text-green-400 mb-2">ISO/EN</div>
                  <div className="text-gray-300 text-sm">Certified Standards</div>
                </div>
                <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-3xl font-bold text-red-400 mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Years Lifespan</div>
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-white/10">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">Interactive Specifications Available</span>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 border border-blue-400/20 rounded-full animate-ping"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 border border-purple-400/20 rounded-full animate-pulse"></div>
          </div>

          {/* Additional Product Categories */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Water Supply", icon: "💧", color: "from-blue-600 to-cyan-500", specs: "PE 80, PE 100" },
              { name: "Gas Systems", icon: "⚡", color: "from-yellow-600 to-orange-500", specs: "PE 80, PE 100-RC" },
              { name: "Sewerage", icon: "🔄", color: "from-green-600 to-emerald-500", specs: "PP, PE 100" },
              { name: "Cable Protection", icon: "🛡️", color: "from-purple-600 to-pink-500", specs: "HDPE, PP" }
            ].map((category, index) => (
              <div key={category.name} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl`}>
                  <div className="text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-white font-bold text-lg mb-2">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.specs}</p>
                  </div>
                  <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white/40 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                  </div>
                </div>
              </div>
            ))}
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
