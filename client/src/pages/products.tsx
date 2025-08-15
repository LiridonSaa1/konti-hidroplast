import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";

// Product categories data
const productCategories = [
  {
    id: "water-supply",
    title: "Water Supply Systems",
    description: "High-quality PE and PP pipes for potable water distribution networks, meeting the highest standards for safety and durability.",
    image: "/attached_assets/Water-supply-min-1_1755115058874.jpg",
    specifications: [
      "Pressure ratings: PN 6, PN 10, PN 16",
      "Diameters: 20mm - 630mm",
      "Material: PE80, PE100",
      "Standards: EN 12201, ISO 4427"
    ],
    applications: [
      "Municipal water distribution",
      "Industrial water systems",
      "Irrigation networks",
      "Residential plumbing"
    ]
  },
  {
    id: "sewerage",
    title: "Sewerage Systems", 
    description: "Robust sewerage pipes designed for wastewater collection and treatment systems with excellent chemical resistance.",
    image: "/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg",
    specifications: [
      "Ring stiffness: SN4, SN8, SN16",
      "Diameters: 110mm - 1200mm", 
      "Material: PP, PE100",
      "Standards: EN 13476, ISO 21138"
    ],
    applications: [
      "Municipal sewerage networks",
      "Industrial wastewater",
      "Storm water management",
      "Treatment plant connections"
    ]
  },
  {
    id: "gas-pipeline",
    title: "Gas Pipeline System",
    description: "Specialized gas distribution pipes with superior safety features and long-term reliability for natural gas networks.",
    image: "/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg",
    specifications: [
      "Pressure ratings: PN 4, PN 10, PN 16",
      "Diameters: 32mm - 630mm",
      "Material: PE80, PE100-RC",
      "Standards: EN 1555, ISO 4437"
    ],
    applications: [
      "Natural gas distribution",
      "Industrial gas supply",
      "Residential gas connections",
      "Commercial gas networks"
    ]
  },
  {
    id: "cable-protection", 
    title: "Cable Protection",
    description: "Protective conduit systems for electrical and telecommunications cables with enhanced impact resistance.",
    image: "/attached_assets/CABLE-PROTECTION-min-1_1755115210995.jpg",
    specifications: [
      "Impact resistance: > 15J",
      "Diameters: 40mm - 200mm",
      "Material: HDPE, PP",
      "Standards: EN 61386, IEC 61386"
    ],
    applications: [
      "Underground cable protection",
      "Telecommunications infrastructure", 
      "Power distribution networks",
      "Industrial cable management"
    ]
  }
];

function ProductsPage() {
  const { t } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = "Products - Konti Hidroplast";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our comprehensive range of PE and PP pipes for water supply, sewerage, gas pipeline systems, and cable protection. Quality products meeting international standards.');
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
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight" data-testid="products-hero-title">
                OUR <span className="text-red-500">PRODUCTS</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed" data-testid="products-hero-description">
                Comprehensive range of high-quality PE and PP pipe systems for infrastructure projects
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <span className="text-sm font-medium">Manufacturing Excellence</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <span className="text-sm font-medium">ISO Certified</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src="/attached_assets/Water-supply-min-1_1755115058874.jpg"
                  alt="High-quality PE and PP pipe systems"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-medium">Driving Progress With Innovation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
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
                  <h3 className="text-2xl font-bold text-[#1c2d56] mb-4 group-hover:text-red-500 transition-colors duration-300" data-testid={`product-title-${product.id}`}>
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed" data-testid={`product-description-${product.id}`}>
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#1c2d56] mb-3 text-lg">Technical Specifications</h4>
                    <ul className="space-y-2" data-testid={`product-specs-${product.id}`}>
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
                    <h4 className="font-semibold text-[#1c2d56] mb-3 text-lg">Applications</h4>
                    <div className="flex flex-wrap gap-2" data-testid={`product-apps-${product.id}`}>
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
                      <span className="inline-block group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
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

      {/* Quality Assurance Section */}
      <section className="py-20 bg-[#1c2d56] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="quality-section-title">
            Quality & Standards
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto" data-testid="quality-section-description">
            All our products meet or exceed international standards and are manufactured 
            with the highest quality materials and processes.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" data-testid="standard-iso">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">ISO</span>
              </div>
              <h3 className="font-semibold mb-2">ISO Certified</h3>
              <p className="text-sm text-white/80">Quality Management Systems</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#1c2d56] mb-6" data-testid="cta-title">
            Need Technical Support?
          </h2>
          <p className="text-xl text-gray-600 mb-8" data-testid="cta-description">
            Our technical team is ready to help you choose the right products for your project.
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