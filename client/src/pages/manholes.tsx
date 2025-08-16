import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Download, Check } from "lucide-react";

// Manholes specifications data
const manholesSpecifications = [
  {
    id: "hdpe-manholes",
    title: "HDPE MANHOLES",
    description:
      "HDPE manholes exhibit high structural strength and rigidity, capable of handling both dynamic and static loads, including traffic loads and deep burial. While stiff, HDPE manholes also have a certain degree of flexibility, allowing them to absorb slight ground movements without cracking.",
    additionalInfo:
      "HDPE is highly resistant to a wide range of chemicals, including acids, bases, and salts, making it suitable for sewage and industrial waste environments.",
    features: [
      "High-Density Polyethylene (HDPE)",
      "Excellent chemical and biological resistance",
      "50+ years service life",
      "-40°C to +60°C (short-term higher resistance)",
      "Smooth inner surface, reduced friction",
      "High stiffness and flexibility for traffic loads",
      "Lightweight, quick installation",
      "Fully recyclable, environmentally friendly",
      "Affordable, low long-term maintenance",
      "More cost-effective than concrete alternatives",
    ],
    images: [
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-8.jpg",
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-7.jpg",
    ],
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/sahti-en.pdf",
  },
  {
    id: "pp-manholes",
    title: "PP MANHOLES",
    description:
      "PP manholes are an excellent choice for modern sewage, stormwater, and drainage systems. They excel in chemical and biological resistance with a material that offers long-term durability, cost-effectiveness, and easy installation, making them suitable for a wide range of applications, including residential, municipal, and industrial infrastructure.",
    additionalInfo: "",
    features: [
      "Polypropylene (PP)",
      "Excellent chemical and biological resistance",
      "50+ years service life",
      "-20°C to +90°C",
      "Smooth inner surface, self-cleaning",
      "Complies with EN 124 for heavy loads",
      "Easy transport, modular design",
      "Fully recyclable, energy-efficient",
      "Cost-effective, low maintenance",
    ],
    images: [
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-1.jpg",
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-25-r.jpg",
    ],
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-en.pdf",
  },
];

// Structural form data
const structuralForms = [
  "Injection molded – Konti Rigid manhole",
  "Manufactured, combination of injection molding part and corrugate pipe",
  "Special manhole – tailor made, special construction of manholes (non standard). These manholes can be manufactured from KONTI KAN SPIRAL PIPE, inlet and outlet from KONTI KAN pipes.",
];

// Applications data
const applications = [
  "Municipal and industrial manholes",
  "Sewer and storm water manholes",
  "Siphon structure",
  "Pump stations",
  "Bio treatment of sewage",
  "Sanitary-Sewer systems",
  "Landfills",
  "Chemical plants",
  "Sewage systems",
  "Water Meter systems",
];

// Advantages data
const advantages = [
  {
    title: "Chemical Resistance",
    description: "In comparison to the concrete manholes",
  },
  {
    title: "Economic",
    description:
      "Reduced material costs due to optimized chamber nominal diameter",
  },
  {
    title: "Durable",
    description:
      "Corrosion-resistant material polypropylene increases durability and protects the environment",
  },
  {
    title: "100% Leak-tight",
    description: "Complete sealing ensures no leakage",
  },
  {
    title: "Safe and Inspection-friendly",
    description: "Inspection-friendly color orange",
  },
  {
    title: "Favorable Installation",
    description:
      "Modular system ensures easy handling on the construction site",
  },
  {
    title: "Lower Costs",
    description:
      "Lower wage and equipment costs due to weight and assembly advantages",
  },
  {
    title: "Built-in Slope",
    description: "Integrated slope design for optimal flow",
  },
];

// Connection types
const connectionTypes = [
  "Polypropylene smooth pipe",
  "PVC pipe",
  "Cast Iron",
  "GRP pipe",
  "Clay pipe",
  "Corrugate pipe",
];

export default function ManholesPage() {
  const [activeTab, setActiveTab] = useState("hdpe-manholes");

  useEffect(() => {
    // Set page title
    document.title = "Manholes - Konti Hidroplast";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Engineered for excellence. Both PP (Polypropylene) and HDPE (High-Density Polyethylene) manholes are widely used in modern drainage and sewage systems, offering durability, efficiency, and ease of installation.",
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
                MANH<span className="text-red-500">OLES</span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                Both PP (Polypropylene) and HDPE (High-Density Polyethylene)
                manholes are widely used in modern drainage and sewage systems,
                offering a range of advantages in terms of durability,
                efficiency, and ease of installation.
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
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/Konti-Hidroplast_3-1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Konti Hidroplast manholes manufacturing video"
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
                Structural Forms
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>By structural form, HDPE and PP manholes can be:</p>
                <div className="space-y-3">
                  {structuralForms.map((form, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{form}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                Key Applications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {applications.slice(0, 8).map((app, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manholes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#ffffff]">
                Manholes Types
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-100 rounded-xl p-1">
              {manholesSpecifications.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setActiveTab(spec.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === spec.id
                      ? "bg-[#1c2d56] text-white shadow-lg"
                      : "text-gray-600 hover:text-[#1c2d56]"
                  }`}
                >
                  {spec.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {manholesSpecifications.map((spec) => (
            <div
              key={spec.id}
              className={`${activeTab === spec.id ? "block" : "hidden"} transition-all duration-500`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-[#ffffff] mb-4">
                    {spec.title}
                  </h3>
                  <p className="text-[#ffffff] mb-6">{spec.description}</p>

                  {spec.additionalInfo && (
                    <p className="text-[#ffffff] mb-6">{spec.additionalInfo}</p>
                  )}

                  <div className="space-y-3 mb-8">
                    {spec.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-[#ffffff]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={spec.brochure}
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
                      src={spec.images[0]}
                      alt={spec.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Advantages of KONTI Rigid PP Manholes
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="font-semibold text-[#1c2d56] mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-700 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>

          {/* Connection Types */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
              Connection Compatibility
            </h3>
            <p className="text-gray-700 mb-6">
              Connection can be made with different kind of pipes:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {connectionTypes.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{type}</span>
                </div>
              ))}
            </div>
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
      <Footer />
    </div>
  );
}
