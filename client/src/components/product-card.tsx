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
      className={`group relative overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] ${
        hasIntersected ? "animate-slide-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 200}ms` }}
      data-testid={`product-card-${index}`}
    >
      <CardContent className="p-0 relative">
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
          
          {/* Title Overlay - Always Visible */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-xl font-bold tracking-[0.2em] uppercase text-center px-6 drop-shadow-lg">
              {title}
            </h3>
          </div>
          
          {/* Hover Effect - Subtle blue overlay */}
          <div className="absolute inset-0 bg-konti-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
        </div>
      </CardContent>
    </Card>
  );
}