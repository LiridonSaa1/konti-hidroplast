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
            <h2 className="text-4xl md:text-5xl font-bold text-[#1c2d56] mb-6" data-testid="technical-flow-title">
              Technical <span className="text-red-500">Specifications</span> Flow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="technical-flow-description">
              Interactive polyethylene material classification and density relationships
            </p>
          </div>

          {/* Technical PE Specifications Diagram */}
          <div className="relative py-20" style={{ backgroundImage: `url('/attached_assets/image_1755251723335.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Dark overlay to match the original */}
            <div className="absolute inset-0 bg-slate-900/80"></div>
            
            <div className="relative max-w-6xl mx-auto px-4">
              
              {/* Top Row - PE Specifications */}
              <div className="flex justify-center items-center gap-8 mb-12">
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-3 text-white font-medium text-center min-w-[80px]">PE 23</div>
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-3 text-white font-medium text-center min-w-[80px]">PE 63</div>
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-3 text-white font-medium text-center min-w-[80px]">PE 80</div>
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-3 text-white font-medium text-center min-w-[80px]">PE 63</div>
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-3 text-white font-medium text-center min-w-[80px]">PE 80</div>
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-3 text-white font-medium text-center min-w-[80px]">PE 100</div>
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-3 text-white font-medium text-center min-w-[90px]">PE 100RC</div>
              </div>

              {/* Middle Row - Intermediate Specifications */}
              <div className="flex justify-center items-center gap-64 mb-12">
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-3 text-white font-medium text-center min-w-[80px]">PE 40</div>
                <div className="bg-slate-800/90 border border-slate-500 px-8 py-4 text-white font-medium text-center min-w-[80px] text-lg">PE 32</div>
              </div>

              {/* Bottom Row - Density Categories */}
              <div className="grid grid-cols-3 gap-8 mt-16">
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-8 text-white text-center">
                  <div className="font-medium text-lg mb-2">Low density</div>
                </div>
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-8 text-white text-center">
                  <div className="font-medium text-lg mb-1">Linear low &</div>
                  <div className="font-medium text-lg">medium density</div>
                </div>
                <div className="bg-slate-800/90 border border-slate-500 px-6 py-8 text-white text-center">
                  <div className="font-medium text-lg mb-1">Medium &</div>
                  <div className="font-medium text-lg">high density</div>
                </div>
              </div>

              {/* Connection Lines - Simple SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                <defs>
                  <marker id="simpleArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L8,3 z" fill="white" opacity="0.8"/>
                  </marker>
                </defs>
                
                {/* Lines from PE 23 to PE 40 */}
                <line x1="12%" y1="35%" x2="25%" y2="55%" stroke="white" strokeWidth="2" opacity="0.6"/>
                
                {/* Lines from PE 63 to PE 40 */}
                <line x1="25%" y1="35%" x2="25%" y2="55%" stroke="white" strokeWidth="2" opacity="0.6"/>
                
                {/* Lines from PE 80 to PE 63 (middle) */}
                <line x1="38%" y1="35%" x2="75%" y2="55%" stroke="white" strokeWidth="2" opacity="0.6"/>
                
                {/* Lines from PE 63 (right) to PE 32 */}
                <line x1="62%" y1="35%" x2="75%" y2="55%" stroke="white" strokeWidth="2" opacity="0.6"/>
                
                {/* Lines from PE 32 to all three density categories */}
                <line x1="75%" y1="65%" x2="16.67%" y2="85%" stroke="white" strokeWidth="2" opacity="0.6" markerEnd="url(#simpleArrow)"/>
                <line x1="75%" y1="65%" x2="50%" y2="85%" stroke="white" strokeWidth="2" opacity="0.6" markerEnd="url(#simpleArrow)"/>
                <line x1="75%" y1="65%" x2="83.33%" y2="85%" stroke="white" strokeWidth="2" opacity="0.6" markerEnd="url(#simpleArrow)"/>
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
