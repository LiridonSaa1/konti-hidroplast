import { Card, CardContent } from "@/components/ui/card";
import { Quote, User } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";

const getTestimonials = (t: (key: string) => string) => [
  {
    quoteKey: "testimonials.petar.quote",
    authorKey: "testimonials.petar.author",
    companyKey: "testimonials.petar.company",
  },
  {
    quoteKey: "testimonials.alex.quote",
    authorKey: "testimonials.alex.author",
    companyKey: "testimonials.alex.company",
  },
];

export function TestimonialsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
  const { t } = useLanguage();
  const testimonials = getTestimonials(t);

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                hasIntersected ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <Quote className="text-4xl text-konti-blue mr-4 flex-shrink-0" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t(testimonial.quoteKey)}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 konti-gradient rounded-full flex items-center justify-center mr-4">
                    <User className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-konti-gray">
                      {t(testimonial.authorKey)}
                    </div>
                    <div className="text-gray-600">{t(testimonial.companyKey)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
