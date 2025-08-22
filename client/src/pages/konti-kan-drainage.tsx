import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Footer } from "@/components/footer";
import { Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

// KONTI KAN DRAINAGE specifications data
const drainageSpecifications = [
  {
    id: "konti-dren",
    title: "KONTI DREN",
    description:
      "Drainage PP pipes offer an efficient, durable, and eco-friendly solution for managing water in a variety of drainage applications. Their lightweight nature, structural strength, and long lifespan make them a cost-effective choice for modern water management systems.",
    additionalInfo:
      "Polypropylene is resistant to wear and tear, ensuring long-term performance in harsh environments. PP pipes are highly resistant to chemicals, including acids, alkalis, and salts commonly found in wastewater and drainage applications.",
    features: [
      "Durable, chemical-resistant, non-corrosive",
      "Smooth inner surface, controlled infiltration",
      "High ring stiffness, flexible under soil pressure",
      "Operates between -20°C and +90°C",
      "Optimized for water infiltration, debris exclusion",
      "Range of pipe: DN 110-1000 mm",
      "UV-stabilized, eco-friendly, recyclable",
      "Lightweight, easy to transport and install",
      "Minimal maintenance due to clog resistance and durability",
      "Service life 50+ years",
    ],
    images: [
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/drenazni-cevki-1.jpg",
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/drenazni-cevki-2.jpg",
    ],
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/tabela-so-dimenzii-konti-kan-drenaza-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/konti-kan-drenaza-en.pdf",
  },
];

// Applications data
const applications = [
  "Agriculture (irrigation)",
  "Infrastructure projects (road and slope drainage)",
  "Residential water management systems",
  "Commercial water management systems",
  "Subsurface drainage",
  "Slope stabilization",
  "Groundwater management",
  "Surface water management",
];

// Slot patterns data
const slotPatterns = [
  {
    name: "PP - Partially perforated",
    description: "Optimized for controlled water infiltration",
  },
  {
    name: "MP - Multipurpose",
    description: "Versatile solution for various applications",
  },
  {
    name: "FP - Fully perforated",
    description: "Maximum water collection capacity",
  },
];

export default function KontiKanDrainagePage() {
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  
  useEffect(() => {
    // Set page title
    document.title = `KONTI KAN DRAINAGE - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "KONTI KAN DRAINAGE systems - Professional drainage PP pipes for managing groundwater, surface water, and wastewater. Engineered for excellence with 50+ years service life.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="h-full w-full bg-gradient-to-l from-white/20 to-transparent transform skew-x-12"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
                <span className="text-sm font-medium">
                  ENGINEERED FOR EXCELLENCE
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                KONTI<span className="text-red-500">KAN</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  DRAINAGE
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                Drainage Polypropylene (PP) pipes are widely used in drainage
                systems for managing groundwater, excess surface water, and
                wastewater. These pipes are designed with precision slots or
                perforations to allow water infiltration.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    50+ Years Lifespan
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">100% Recyclable</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden">
                <video
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/Konti-Hidroplast_5-1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Konti Hidroplast drainage systems manufacturing video"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
                Standards & Compliance
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  PP slotted pipes are manufactured to comply with standards
                  such as EN 1852, EN 13476, DIN 4262-1 (TYPE R3) or equivalent
                  local drainage pipe regulations, ensuring quality and
                  reliability.
                </p>
                <p>
                  Available with different slot patterns (e.g., longitudinal,
                  spiral, or circumferential) to optimize water collection based
                  on the application.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                Slot Patterns Available
              </h3>
              <div className="space-y-4">
                {slotPatterns.map((pattern, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-[#1c2d56] mb-1">
                      {pattern.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {pattern.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
              Key Applications
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Suitable for agriculture (irrigation), infrastructure projects
              (road and slope drainage), and residential or commercial water
              management systems. Can be easily connected to other drainage
              components, such as catch basins and manholes, using standard
              fittings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-[#1c2d56] font-medium">{app}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTI DREN Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#ffffff]">
                KONTI DREN
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#ffffff] mb-4">
                {drainageSpecifications[0].title}
              </h3>
              <p className="text-[#ffffff] mb-6">
                {drainageSpecifications[0].description}
              </p>

              <p className="text-[#ffffff] mb-6">
                {drainageSpecifications[0].additionalInfo}
              </p>

              <div className="space-y-3 mb-8">
                {drainageSpecifications[0].features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-[#ffffff]">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={drainageSpecifications[0].specifications}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-[#ffffff] rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Specs
                </a>
                <a
                  href={drainageSpecifications[0].brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </a>
              </div>
            </div>

            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src={drainageSpecifications[0].images[0]}
                  alt={drainageSpecifications[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Get in Touch: Connect with Us Today!
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Need more information about our cable protection solutions?
              Contact our team of experts.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white rounded-lg transition-colors text-lg font-semibold"
              data-testid="contact-button"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Get in Touch: Connect with Us Today!
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Need more information about our drainage solutions?
              Contact our team of experts.
            </p>
            <Button
              onClick={() => {
                // Store scroll target in sessionStorage
                sessionStorage.setItem("scrollToContact", "true");
                // Navigate to home page
                setLocation("/");
              }}
              className="px-8 py-4 rounded-lg font-semibold text-lg text-white bg-[#1c2d56] hover:bg-[#1c2d56]/90 transition-colors"
              data-testid="contact-button"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
