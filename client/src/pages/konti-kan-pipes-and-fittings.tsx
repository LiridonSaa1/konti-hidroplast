import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Download, Play, Check } from "lucide-react";

// Konti Kan Fittings data
const kontikanFittings = [
  {
    name: "Injection molding elbow",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/01-Injection_molding_elbow.pdf",
  },
  {
    name: "Injection molding Y-branch",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/03-Injection-molding-Y-branch.pdf",
  },
  {
    name: "Injection molding Y-branch Reducer",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/04-Injection-molding-Y-branch-Reducer.pdf",
  },
  {
    name: "Injection molding TEE Reducer",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/05-Injection-molding-TEE-Reducer.pdf",
  },
  {
    name: "Injection molding Reducer",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/06-Injection-molding-Reducer.pdf",
  },
  {
    name: "Welded elbow 11",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/07-Welded-elbow-11.pdf",
  },
  {
    name: "Welded elbow 60",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/11-Welded-elbow-60.pdf",
  },
  {
    name: "Welded elbow 90",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/12-Welded-elbow-90.pdf",
  },
  {
    name: "Welded Y-branch",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/14-Welded-Y-branch.pdf",
  },
  {
    name: "Welded Y-branch Reducer",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/16-Welded-Y-branch-Reducer.pdf",
  },
  {
    name: "Welded Reducer",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/17-Welded-Reducer.pdf",
  },
  {
    name: "Welded End cap",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/18-Welded-End-cap.pdf",
  },
  {
    name: "Socket",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/19-Socket.pdf",
  },
  {
    name: "Flex Adapter",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/20-Flex-Adapter.pdf",
  },
  {
    name: "Gasket",
    pdf: "https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/21-Gasket.pdf",
  },
];

function KontiKanPipesAndFittingsPage() {
  const { t } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = "HDPE Konti Kan Sewage Pipe - Konti Hidroplast";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "HDPE corrugated sewage pipes excel in durability, hydraulic efficiency, and structural performance, making them a preferred choice for sewage and drainage systems."
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
                HDPE KONTI KAN<br />
                <span className="text-red-500">SEWAGE</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  PIPE
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
                HDPE corrugated sewage pipes excel in durability, hydraulic efficiency, and structural performance, making them a preferred choice for sewage and drainage systems.
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
                  controls
                  className="w-full h-full object-cover"
                  aria-label="HDPE Konti Kan Sewage Pipe video"
                  poster="https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/konti-kan-1.jpg"
                >
                  <source src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Konti-Hidroplast-Proizvodstvo-27-1.mp4" type="video/mp4" />
                  Sorry, your browser doesn't support embedded videos.
                </video>
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Konti Kan Pipes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Konti Kan Pipes
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 mb-6">
                HDPE (High-Density Polyethylene) corrugated pipes are widely used in sewage and drainage systems due to their excellent performance characteristics.
              </p>

              <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">Material Properties:</h3>
              <div className="space-y-3 mb-8">
                {[
                  "High-Density Polyethylene (HDPE)",
                  "Lightweight yet durable",
                  "Excellent chemical resistance, making it ideal for sewage applications",
                  "Non-corrosive and resistant to biological and chemical attacks from wastewater"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">Application:</h3>
              <div className="space-y-3 mb-8">
                {[
                  "Municipal sewage systems",
                  "Stormwater drainage",
                  "Industrial wastewater systems",
                  "Agricultural drainage"
                ].map((application, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{application}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/konti-kan-1.jpg"
                  alt="Konti Kan HDPE Pipes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Characteristics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-8">Characteristics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-4">Structural</h3>
              <div className="space-y-3">
                {[
                  "Common stiffness ratings: SN 4, SN 6, SN 8, or higher",
                  "Dimension range: DN/OD 110-1200mm",
                  "Color: Outer black with inner light grey",
                  "Corrugated Outer Wall: enhances structural strength while reducing material weight"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-4">Performance</h3>
              <div className="space-y-3">
                {[
                  "Smooth Inner Surface: minimizes friction, allowing efficient flow",
                  "High flow capacity due to low Manning's coefficient (0.009)",
                  "High resistance to UV degradation",
                  "Flexible and resistant to cracking"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-4">Durability</h3>
              <div className="space-y-3">
                {[
                  "50+ years in standard operating conditions",
                  "Easier to handle and transport compared to concrete or steel",
                  "Operates effectively within -40°C to +60°C",
                  "Fully recyclable at the end of its service life"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 gap-4">
            <a
              href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/Konti_kan_cevki-tabela_za_dimenzii_i_tezini-en.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              data-testid="download-specs-button"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Specs
            </a>
            <a
              href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-Konti-Kan-siv_EN-2021-so-korekcii-MART-2021-2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              data-testid="download-brochure-button"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Brochure
            </a>
          </div>
        </div>
      </section>

      {/* Konti Kan Fittings Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                Konti Kan Fittings
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Fittings List */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">Available Fittings</h3>
              <div className="space-y-3">
                {kontikanFittings.map((fitting, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <a
                      href={fitting.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full text-[#1c2d56] hover:text-blue-700"
                      data-testid={`fitting-${index}`}
                    >
                      <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-[#1c2d56]">
                        <Download className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{fitting.name}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Fitting Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden p-8 flex items-center justify-center">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Fittings.png"
                  alt="Konti Kan Fittings"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-8">Standards Compliance</h2>
            <p className="text-xl text-gray-600 mb-8">
              Common standards for HDPE corrugated pipes: EN 13476-1 and EN 13476-3
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-lg text-gray-700">
                Their lightweight, flexibility, and chemical resistance further enhance their suitability for a wide range of applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
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
              Need more information about our Konti Kan sewage pipe solutions? Contact our team of experts.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#1c2d56] text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
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

export default KontiKanPipesAndFittingsPage;