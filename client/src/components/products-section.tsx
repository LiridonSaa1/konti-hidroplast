import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets, Waves, Flame, Zap } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const products = [
  {
    icon: Droplets,
    title: "Water Supply Systems",
    description: "High-quality PE pipes for reliable water distribution networks.",
    color: "text-blue-600",
  },
  {
    icon: Waves,
    title: "Sewerage Systems",
    description: "Durable PP pipes designed for efficient wastewater management.",
    color: "text-cyan-600",
  },
  {
    icon: Flame,
    title: "Gas Pipeline System",
    description: "Safe and reliable PE pipes for natural gas distribution.",
    color: "text-orange-600",
  },
  {
    icon: Zap,
    title: "Cable Protection",
    description: "Protective conduits for electrical and telecommunications cables.",
    color: "text-yellow-600",
  },
];

export function ProductsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

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
      className="py-20 bg-white"
      data-testid="products-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            hasIntersected ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2
            className="text-4xl font-bold text-konti-gray mb-4"
            data-testid="products-title"
          >
            Our Products
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            data-testid="products-subtitle"
          >
            High-quality PE and PP pipes for various applications, meeting European standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.title}
              className={`hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                hasIntersected ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              data-testid={`product-card-${index}`}
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 konti-gradient rounded-lg flex items-center justify-center mb-6`}>
                  <product.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-konti-gray mb-4">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <Button
                  variant="link"
                  onClick={scrollToContact}
                  className="text-konti-blue font-semibold hover:text-blue-700 transition-colors p-0"
                  data-testid={`product-learn-more-${index}`}
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
