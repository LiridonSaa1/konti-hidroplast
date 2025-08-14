import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const certifications = [
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
    src: "/attached_assets/DVGW_1755117824782.png",
    alt: "DVGW Certification",
    name: "DVGW",
  },
];

export function CertificationsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="py-16 bg-[#1c2d56]"
      data-testid="certifications-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-opacity duration-1000 ${
            hasIntersected ? "opacity-100" : "opacity-0"
          }`}
          data-testid="certifications-grid"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 ${
                  hasIntersected ? "animate-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                data-testid={`certification-${index}`}
              >
                <div className="flex items-center justify-center h-20 w-full">
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="max-h-full max-w-full w-auto object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
