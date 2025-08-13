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

        {/* Products Grid - Horizontal Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                hasIntersected ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              data-testid={`product-card-${index}`}
            >
              <div className="flex h-48">
                {/* Product Image - Left Side */}
                <div className="w-1/2 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                {/* Product Content - Right Side */}
                <div className="w-1/2 p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-konti-gray mb-2 uppercase tracking-wide leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
