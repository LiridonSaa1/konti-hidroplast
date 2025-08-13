import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  hasIntersected: boolean;
  onLearnMore: () => void;
}

export function ProductCard({ 
  title, 
  description, 
  image, 
  index, 
  hasIntersected, 
  onLearnMore 
}: ProductCardProps) {
  return (
    <Card
      className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
        hasIntersected ? "animate-slide-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
      data-testid={`product-card-${index}`}
    >
      <CardContent className="p-0 relative">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-lg font-bold tracking-wide uppercase">
              {title}
            </h3>
          </div>
          
          {/* Hover Content */}
          <div className="absolute inset-0 bg-konti-blue/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
            <div className="text-center text-white">
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">
                {title}
              </h3>
              <p className="text-sm mb-4 leading-relaxed">
                {description}
              </p>
              <Button
                onClick={onLearnMore}
                variant="outline"
                className="bg-white text-konti-blue hover:bg-gray-100 border-white font-semibold"
                data-testid={`product-learn-more-${index}`}
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}