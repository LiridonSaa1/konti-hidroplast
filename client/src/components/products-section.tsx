import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";

const products = [
  {
    title: "WATER SUPPLY SYSTEMS",
    description:
      "High-quality PE pipes for reliable water distribution networks.",
    image: "/attached_assets/Water-supply-min-1_1755115058874.jpg",
  },
  {
    title: "SEWERAGE SYSTEMS",
    description:
      "Durable PP pipes designed for efficient wastewater management.",
    image:
      "/attached_assets/Konti-Hidroplast-Proizvodstvo-27-1_1755115099243.jpg",
  },
  {
    title: "GAS PIPELINE SYSTEM",
    description: "Safe and reliable PE pipes for natural gas distribution.",
    image: "/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg",
  },
  {
    title: "CABLE PROTECTION",
    description:
      "Protective conduits for electrical and telecommunications cables.",
    image: "/attached_assets/CABLE-PROTECTION-min-1_1755115210995.jpg",
  },
];

export function ProductsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { t } = useLanguage();

  return (
    <section
      id="products"
      ref={ref}
      className="py-20 bg-white relative overflow-hidden"
      data-testid="products-section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-16 ${
            hasIntersected ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2
            className="text-4xl font-bold text-konti-gray mb-4"
            data-testid="products-title"
          >
            Products
          </h2>
        </div>

        {/* Products Grid - Vertical Card Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className={`group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                hasIntersected ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              data-testid={`product-card-${index}`}
            >
              {/* Product Image - Top */}
              <div className="h-64 relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
              </div>
              
              {/* Product Content - Bottom */}
              <div className="p-8 relative">
                {/* Decorative accent */}
                <div className="absolute top-6 left-8 w-12 h-1 bg-konti-blue rounded-full group-hover:w-16 transition-all duration-300" />
                
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-konti-gray mb-3 uppercase tracking-wide leading-tight group-hover:text-konti-blue transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {product.description}
                  </p>
                  
                  {/* Learn More Button */}
                  <div className="flex items-center text-konti-blue font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
