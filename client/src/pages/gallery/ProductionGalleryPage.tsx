import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProductionGalleryPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = "Production Gallery - Konti Hidroplast";
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
                MANUFACTURING EXCELLENCE
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-red-500">PRODUCTION</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                FACILITIES
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              State-of-the-art manufacturing facilities equipped with advanced technology 
              for producing high-quality PE and PP pipes that meet international standards.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <div className="flex items-center gap-2 text-blue-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Advanced Technology</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">24/7 Operations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Production Processes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our Production Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From raw material processing to final product inspection, 
              every step is carefully controlled and monitored.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Material Preparation",
                description: "High-grade PE and PP raw materials are prepared and tested for quality standards."
              },
              {
                step: "02", 
                title: "Extrusion Process",
                description: "Advanced extrusion lines shape materials into precise pipe specifications."
              },
              {
                step: "03",
                title: "Cooling & Sizing",
                description: "Controlled cooling ensures proper dimensional stability and strength."
              },
              {
                step: "04",
                title: "Quality Testing",
                description: "Comprehensive testing including pressure, dimensional, and material property checks."
              }
            ].map((process, index) => (
              <div key={index} className="bg-white rounded-2xl p-6">
                <div className="text-3xl font-bold text-red-500 mb-4">{process.step}</div>
                <h3 className="text-xl font-bold text-[#1c2d56] mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
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
              Interested in Our Production Capabilities?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us to learn more about our manufacturing processes and 
              how we can meet your specific pipe requirements.
            </p>
            <Button 
              className="bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductionGalleryPage;