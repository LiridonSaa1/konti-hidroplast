import { ProductCard } from "@/components/product-card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";

const products = [
  {
    title: "WATER SUPPLY SYSTEMS",
    description: "High-quality PE pipes for reliable water distribution networks.",
    image: "/attached_assets/image_1755091117511.png",
  },
  {
    title: "SEWERAGE SYSTEMS", 
    description: "Durable PP pipes designed for efficient wastewater management.",
    image: "/attached_assets/image_1755091345883.png",
  },
  {
    title: "GAS PIPELINE SYSTEM",
    description: "Safe and reliable PE pipes for natural gas distribution.",
    image: "/attached_assets/image_1755091404488.png",
  },
  {
    title: "CABLE PROTECTION",
    description: "Protective conduits for electrical and telecommunications cables.",
    image: "/attached_assets/image_1755091449275.png",
  },
];

export function ProductsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="products"
      ref={ref}
      className="py-20 bg-konti-gray-light relative overflow-hidden"
      data-testid="products-section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #1c2d56 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #1c2d56 2px, transparent 2px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            data-testid="products-subtitle"
          >
            High-quality PE and PP pipes for various applications, meeting European standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description={product.description}
              image={product.image}
              index={index}
              hasIntersected={hasIntersected}
              onLearnMore={scrollToContact}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
