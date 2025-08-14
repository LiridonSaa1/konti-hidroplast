import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import productImage1 from "@assets/Water-supply-min-1_1755115058874.jpg";
import productImage2 from "@assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg";
import productImage3 from "@assets/CABLE-PROTECTION-min-1_1755115210995.jpg";
import productImage4 from "@assets/Konti-Hidroplast-Proizvodstvo-27-1_1755115099243.jpg";

export function Products() {
  const products = [
    {
      id: 1,
      title: "WATER SUPPLY SYSTEMS",
      description: "High-quality water supply systems designed for municipal and industrial applications. Our pipes ensure safe transport and maintain water quality standards.",
      image: productImage1,
      features: [
        "Corrosion resistant materials",
        "Long service life",
        "Easy installation",
        "Various diameter options"
      ]
    },
    {
      id: 2,
      title: "GAS PIPELINE SYSTEM", 
      description: "Safe and reliable gas pipeline systems for the transport of gaseous fuels. Engineered for high integrity and safety standards.",
      image: productImage2,
      features: [
        "High pressure resistance",
        "Safety certified",
        "Leak-proof connections",
        "Weather resistant"
      ]
    },
    {
      id: 3,
      title: "CABLE PROTECTION",
      description: "Protective conduit systems for electrical and telecommunication cables. Ensures cable safety in various environmental conditions.",
      image: productImage3,
      features: [
        "Impact resistant",
        "UV stabilized",
        "Flexible installation",
        "Rodent proof"
      ]
    },
    {
      id: 4,
      title: "SEWERAGE SYSTEMS",
      description: "Comprehensive sewerage solutions for effective wastewater management. Designed for municipal and industrial applications.",
      image: productImage4,
      features: [
        "Chemical resistant",
        "Smooth internal surface",
        "Root resistant joints",
        "Long-term durability"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#1c2d56] to-[#2d4578] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              PRODUCTS
            </h1>
            <div className="w-16 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Global Applications Across Industries and Utilities
            </p>
          </div>
        </div>
      </section>

      {/* Product Range Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1c2d56] mb-6">
              Product Range
            </h2>
            <div className="w-12 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Konti Hidroplast products find a broad range of applications in the industrial and utilities market on a worldwide scale. 
              The water and gas distribution enterprises are important sectors for high integrity products where the maintenance of 
              water quality and the safe transport of gaseous fuels are of paramount importance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Industrial applications include alternative energy installations in landfill gas systems to effluent transportation 
                and mineral slurry. Products are widely used in pipeline installation, repair and maintenance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                  <span className="text-gray-700">Water Distribution Systems</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                  <span className="text-gray-700">Gas Transport Solutions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                  <span className="text-gray-700">Industrial Applications</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-4"></div>
                  <span className="text-gray-700">Pipeline Maintenance</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={productImage4} 
                alt="Manufacturing facility" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1c2d56] mb-6">
              Our Product Lines
            </h2>
            <div className="w-12 h-1 bg-red-500 mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Product Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#1c2d56] mb-4 uppercase tracking-wide">
                    {product.title}
                  </h3>
                  
                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-red-500 mb-6 group-hover:w-16 transition-all duration-300"></div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#1c2d56] rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Learn More Button */}
                  <button className="inline-flex items-center px-6 py-3 bg-[#1c2d56] text-white font-medium rounded-lg hover:bg-[#2d4578] transition-all duration-300 group">
                    Learn More
                    <svg 
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1c2d56] to-[#2d4578] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get in Touch: Connect with Us Today!
          </h2>
          <div className="w-16 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ready to learn more about our products? Contact our team for detailed information and custom solutions.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-105 shadow-lg">
            Contact Us Today
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}