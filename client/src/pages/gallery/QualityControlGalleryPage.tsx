import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function QualityControlGalleryPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = "Quality Control Gallery - Konti Hidroplast";
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
          <div className="text-center">
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="inline-flex items-center text-white hover:text-gray-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to About Us
              </Button>
            </div>

            <div className="mb-6 bg-[#ef4444] text-white px-4 py-2 rounded-full inline-block">
              <span className="text-sm font-medium">
                PRECISION & EXCELLENCE
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-red-500">QUALITY</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                CONTROL
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Advanced testing laboratories and quality assurance processes ensure 
              every product meets the highest international standards and customer requirements.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <div className="flex items-center gap-2 text-blue-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">ISO 9001</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Laboratory Testing</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">24/7 Monitoring</span>
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
                Testing & Validation
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our comprehensive quality control system includes rigorous testing 
                  at every stage of production, from raw material inspection to 
                  final product validation.
                </p>
                <p>
                  State-of-the-art laboratory equipment enables us to perform 
                  mechanical, physical, and chemical tests according to 
                  international standards including EN, ISO, and DVGW.
                </p>
                <p>
                  Continuous monitoring and documentation ensure full traceability 
                  and compliance with customer specifications and regulatory requirements.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                Quality Standards
              </h3>
              <div className="space-y-3">
                {[
                  "ISO 9001:2015 Quality Management",
                  "EN 1555 Gas Pipeline Standards",
                  "ISO 4437 Polyethylene Systems",
                  "DVGW Certification",
                  "Pressure testing up to 16 bar",
                  "Material property validation",
                  "Dimensional accuracy verification",
                  "Long-term performance testing",
                ].map((standard, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Procedures Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our Testing Procedures
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive testing protocols ensure product reliability and performance 
              throughout the entire product lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Material Testing",
                description: "Chemical composition analysis, density measurement, and thermal properties validation."
              },
              {
                title: "Pressure Testing",
                description: "Hydrostatic pressure tests to verify pipe integrity and working pressure limits."
              },
              {
                title: "Dimensional Control",
                description: "Precise measurement of wall thickness, outer diameter, and ovality specifications."
              },
              {
                title: "Impact Resistance",
                description: "Charpy and Izod impact tests to ensure durability under stress conditions."
              },
              {
                title: "Environmental Testing",
                description: "UV resistance, temperature cycling, and chemical compatibility assessments."
              },
              {
                title: "Long-term Testing",
                description: "Accelerated aging and stress crack resistance tests for lifetime prediction."
              }
            ].map((test, index) => (
              <div key={index} className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#1c2d56] mb-3">{test.title}</h3>
                <p className="text-gray-600">{test.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
              Certifications & Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality is recognized through various international 
              certifications and compliance with industry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "ISO 9001:2015",
              "EN 1555-2",
              "ISO 4437",
              "DVGW",
              "CE Marking",
              "WRAS Approval",
              "BSI Kitemark",
              "Local Certifications"
            ].map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#1c2d56] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1c2d56]">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-[#1c2d56] mb-6">
              Need Quality Documentation?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Request test certificates, compliance documentation, or 
              schedule a quality audit of our facilities.
            </p>
            <Button 
              className="bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Quality Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default QualityControlGalleryPage;