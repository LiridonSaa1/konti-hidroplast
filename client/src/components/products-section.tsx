import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";

const products = [
  {
    title: "WATER SUPPLY SYSTEMS",
    description: "High-quality PE pipes for reliable water distribution networks.",
    image: "/attached_assets/Water-supply-min-1_1755115058874.jpg",
  },
  {
    title: "SEWERAGE SYSTEMS", 
    description: "Durable PP pipes designed for efficient wastewater management.",
    image: "/attached_assets/Konti-Hidroplast-Proizvodstvo-27-1_1755115099243.jpg",
  },
  {
    title: "GAS PIPELINE SYSTEM",
    description: "Safe and reliable PE pipes for natural gas distribution.",
    image: "/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg",
  },
  {
    title: "CABLE PROTECTION",
    description: "Protective conduits for electrical and telecommunications cables.",
    image: "/attached_assets/CABLE-PROTECTION-min-1_1755115210995.jpg",
  },
  // {
  //   title: "INDUSTRIAL PIPES",
  //   description: "Heavy-duty pipes for industrial applications and chemical resistance.",
  //   image: "/attached_assets/image_1755091805124.png",
  // },
  // {
  //   title: "PIPE FITTINGS",
  //   description: "Complete range of fittings and accessories for all pipe systems.",
  //   image: "/attached_assets/image_1755091852060.png",
  // },
  // {
  //   title: "DRAINAGE SYSTEMS",
  //   description: "Efficient drainage solutions for construction and infrastructure.",
  //   image: "/attached_assets/image_1755091984074.png",
  // },
];

export function ProductsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(products.length / 3)) % Math.ceil(products.length / 3));
  };

  const visibleProducts = products.slice(currentSlide * 3, currentSlide * 3 + 3);

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

        {/* Slider Container */}
        <div className="relative">
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
            {visibleProducts.map((product, index) => (
              <div
                key={`${currentSlide}-${index}`}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  hasIntersected ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                data-testid={`product-card-${index}`}
              >
                {/* Product Image */}
                <div className="h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                {/* Product Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-konti-gray mb-3 uppercase tracking-wide">
                    {product.title}
                  </h3>
                  <Button
                    onClick={scrollToContact}
                    variant="outline"
                    className="border-konti-blue text-konti-blue hover:bg-konti-blue hover:text-white transition-colors"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border-gray-200 hover:bg-gray-50 z-10"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg border-gray-200 hover:bg-gray-50 z-10"
            disabled={currentSlide === Math.ceil(products.length / 3) - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-konti-blue' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
