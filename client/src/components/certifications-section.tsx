import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect, useState } from "react";

const certifications = [
  {
    src: "/attached_assets/DVGW_1755117121149.png",
    alt: "DVGW Certification",
  },
  {
    src: "/attached_assets/fondedil-1_1755117121150.png",
    alt: "Fondedil Partnership",
  },
  {
    src: "/attached_assets/Guvernul_Romaniei-2_1755117121150.png",
    alt: "Romanian Government Partnership",
  },
  {
    src: "/attached_assets/Igh_1755117121150.png",
    alt: "IGH Certification",
  },
  {
    src: "/attached_assets/MpaifW_1755117121150.png",
    alt: "MpaifW Certification",
  },
  {
    src: "/attached_assets/Exact_1755117121151.png",
    alt: "Exact Certification",
  },
  {
    src: "/attached_assets/bsk_1755117121151.png",
    alt: "BSK Certification",
  },
  {
    src: "/attached_assets/Qualityaustria_1755117121151.png",
    alt: "Quality Austria Certification",
  },
  {
    src: "/attached_assets/certifikat_45001_2-2_1755117121152.png",
    alt: "ISO 45001 Certification",
  },
  {
    src: "/attached_assets/49335-2_1755117121152.png",
    alt: "ISO 49335 Certification",
  },
  {
    src: "/attached_assets/IQ-net_1755117121152.png",
    alt: "IQ Net Certification",
  },
];

export function CertificationsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    if (!hasIntersected) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(certifications.length / 5));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [hasIntersected]);

  // Get visible certifications (5 per slide)
  const visibleCertifications = certifications.slice(currentSlide * 5, currentSlide * 5 + 5);

  return (
    <section
      ref={ref}
      className="py-16 bg-konti-gray-light overflow-hidden"
      data-testid="certifications-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 ${
            hasIntersected ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2
            className="text-3xl font-bold text-konti-gray mb-4"
            data-testid="certifications-title"
          >
            Certifications & Partners
          </h2>
          <p
            className="text-lg text-gray-600"
            data-testid="certifications-subtitle"
          >
            Trusted by leading organizations worldwide
          </p>
        </div>

        {/* Auto-sliding carousel */}
        <div className="relative">
          <div
            className={`transition-opacity duration-1000 ${
              hasIntersected ? "opacity-100" : "opacity-0"
            }`}
            data-testid="certifications-carousel"
          >
            <div className="flex justify-center items-center gap-8 md:gap-12">
              {visibleCertifications.map((cert, index) => (
                <div
                  key={`${currentSlide}-${index}`}
                  className={`flex-shrink-0 transform transition-all duration-700 ${
                    hasIntersected ? "animate-slide-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  data-testid={`certification-${index}`}
                >
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="h-16 w-auto filter grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(certifications.length / 5) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-konti-blue scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
