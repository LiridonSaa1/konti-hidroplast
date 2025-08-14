import { Navigation } from "@/components/navigation";
import productHeroImage from "@assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={productHeroImage}
            alt="Konti Hidroplast Products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c2d56]/95 via-[#1c2d56]/85 to-[#1c2d56]/75"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Side - Text Content */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Since 1975
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  PRODUCTS{" "}
                  <span className="text-red-500">KONTI</span>
                  <br />
                  <span className="text-blue-400">HIDROPLAST</span>
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                  Pioneering pipe solutions for urban development. Export-oriented Macedonian leader in PE and PP pipe manufacturing with 95% international market reach.
                </p>
              </div>
              
              <div className="flex items-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Manufacturing Excellence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>ISO Certified</span>
                </div>
              </div>
            </div>

            {/* Right Side - Product Highlight */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                    HIGH-QUALITY PIPES
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white">
                    Complete Pipeline Solutions
                  </h3>
                  
                  <p className="text-white/90 leading-relaxed">
                    From water supply systems to gas pipelines, our comprehensive product range covers all infrastructure needs with innovative engineering and proven reliability.
                  </p>
                  
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2">
                    <span>Corporate 2024</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Content Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
              Our Product Range
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="h-px bg-red-500 w-16"></div>
              <div className="text-red-500 font-semibold">PRODUCTS</div>
              <div className="h-px bg-red-500 w-16"></div>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive pipeline solutions engineered for durability, reliability, and performance across diverse infrastructure applications.
            </p>
          </div>

          {/* Product Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "Water Supply Systems",
                description: "High-performance PE pipes for municipal and residential water distribution networks.",
                icon: "💧"
              },
              {
                title: "Sewerage Systems", 
                description: "Durable PP pipes designed for efficient wastewater management and treatment systems.",
                icon: "🏢"
              },
              {
                title: "Gas Pipeline Systems",
                description: "Safety-certified PE pipes for natural gas distribution with advanced leak protection.",
                icon: "⛽"
              },
              {
                title: "Cable Protection",
                description: "Protective conduits for telecommunications and electrical cable installations.",
                icon: "⚡"
              }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 hover:-translate-y-2">
                <div className="text-4xl mb-6">{product.icon}</div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-4 uppercase tracking-wide">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="w-12 h-1 bg-red-500 transition-all duration-300 group-hover:w-16"></div>
                </div>
                <button className="mt-4 bg-[#1c2d56] hover:bg-[#152347] text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 group">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#1c2d56] to-blue-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">
                Need Custom Pipeline Solutions?
              </h3>
              <p className="text-xl mb-8 text-white/90">
                Our engineering team can develop tailored solutions for your specific infrastructure requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Request Quote
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                  View Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}