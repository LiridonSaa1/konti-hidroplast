import { Card, CardContent } from "@/components/ui/card";
import { Quote, User } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const testimonials = [
  {
    quote: "As your long-term partner, we are very happy to work with you and your company. Over the years, we have received very good service, great quality of products, fast and competent responses from Konti Hidroplast. All employees are responsive, competent and well-known in the products you produce.",
    author: "Petar Ermenliev",
    company: "Eurocom 2000",
  },
  {
    quote: "Working with Konti Hidroplast has been a truly positive experience. Their professionalism, attention to detail, and commitment to delivering high-quality products & services consistently exceed our expectations. The team's expertise and responsiveness make every project smooth and efficient.",
    author: "Alex Negrescu",
    company: "General Manager, Dematek Water Management",
  },
];

export function TestimonialsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="py-20 bg-konti-gray-light"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            hasIntersected ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <p
            className="text-xl text-gray-600"
            data-testid="testimonials-subtitle"
          >
            Trusted by industry leaders worldwide
          </p>
        </div>

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
                    {testimonial.quote}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 konti-gradient rounded-full flex items-center justify-center mr-4">
                    <User className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-konti-gray">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-600">{testimonial.company}</div>
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
