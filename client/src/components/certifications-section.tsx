import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const certifications = [
  {
    src: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/07/DVGW.png",
    alt: "DVGW Certification",
  },
  {
    src: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/07/IQ-net.png",
    alt: "IQ Net Certification",
  },
  {
    src: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/07/49335-2.png",
    alt: "ISO 49335 Certification",
  },
  {
    src: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/07/certifikat_45001_2-2.png",
    alt: "ISO 45001 Certification",
  },
  {
    src: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/07/Qualityaustria.png",
    alt: "Quality Austria Certification",
  },
  {
    src: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/07/bsk.png",
    alt: "BSK Certification",
  },
  {
    src: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/07/Exact.png",
    alt: "Exact Certification",
  },
  {
    src: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/07/MpaifW.png",
    alt: "MpaifW Certification",
  },
];

export function CertificationsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="py-16 bg-konti-gray-light"
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

        <div
          className={`flex flex-wrap justify-center items-center gap-8 transition-opacity duration-500 ${
            hasIntersected ? "opacity-60 hover:opacity-80" : "opacity-0"
          }`}
          data-testid="certifications-grid"
        >
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              data-testid={`certification-${index}`}
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className="h-12 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
