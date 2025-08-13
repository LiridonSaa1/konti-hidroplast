import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect, useState } from "react";

const certifications = [
  {
    src: "/attached_assets/DVGW_1755117824782.png",
    alt: "DVGW Certification",
    name: "DVGW",
  },
  {
    src: "/attached_assets/fondedil-1_1755117824782.png",
    alt: "Fondedil Partnership",
    name: "Fondedil",
  },
  {
    src: "/attached_assets/Guvernul_Romaniei-2_1755117824783.png",
    alt: "Romanian Government Partnership",
    name: "Romanian Government",
  },
  {
    src: "/attached_assets/Igh_1755117824783.png",
    alt: "IGH Certification",
    name: "IGH",
  },
  {
    src: "/attached_assets/MpaifW_1755117824783.png",
    alt: "MpaifW Certification",
    name: "MpaifW",
  },
  {
    src: "/attached_assets/Exact_1755117824783.png",
    alt: "Exact Certification",
    name: "Exact",
  },
  {
    src: "/attached_assets/bsk_1755117824784.png",
    alt: "BSK Certification",
    name: "BSK",
  },
  {
    src: "/attached_assets/Qualityaustria_1755117824784.png",
    alt: "Quality Austria Certification",
    name: "Quality Austria",
  },
  {
    src: "/attached_assets/certifikat_45001_2-2_1755117824784.png",
    alt: "ISO 45001 Certification",
    name: "ISO 45001",
  },
  {
    src: "/attached_assets/49335-2_1755117824785.png",
    alt: "ISO 49335 Certification",
    name: "ISO 49335",
  },
  {
    src: "/attached_assets/IQ-net_1755117824785.png",
    alt: "IQ Net Certification",
    name: "IQ-Net",
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
      <div className="w-full px-4 sm:px-6 lg:px-8">
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

        {/* Enhanced certification grid */}
        <div className="relative">
          <div
            className={`transition-opacity duration-1000 ${
              hasIntersected ? "opacity-100" : "opacity-0"
            }`}
            data-testid="certifications-carousel"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12">
              {visibleCertifications.map((cert, index) => (
                <div
                  key={`${currentSlide}-${index}`}
                  className={`group transform transition-all duration-700 ${
                    hasIntersected ? "animate-slide-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  data-testid={`certification-${index}`}
                >
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-konti-blue/20">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-full flex items-center justify-center mb-2">
                        <img
                          src={cert.src}
                          alt={cert.alt}
                          className="max-h-full max-w-full w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs text-gray-600 font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {cert.name}
                      </span>
                    </div>
                  </div>
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
