import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function StorageGalleryPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = "Storage Gallery - Konti Hidroplast";
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
                LOGISTICS & DISTRIBUTION
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-red-500">STORAGE</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                FACILITIES
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Modern warehousing and distribution facilities designed to protect 
              our products and ensure efficient delivery to customers worldwide.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <div className="flex items-center gap-2 text-blue-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Climate Controlled</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Inventory Management</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Fast Distribution</span>
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
                Warehouse Operations
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our strategically located storage facilities provide optimal 
                  conditions for maintaining product integrity while ensuring 
                  rapid distribution across regional and international markets.
                </p>
                <p>
                  Advanced warehouse management systems track inventory in real-time, 
                  enabling efficient order processing and minimizing delivery times 
                  to construction sites and distribution partners.
                </p>
                <p>
                  Climate-controlled environments protect pipes from UV exposure 
                  and temperature variations, preserving material properties 
                  throughout the storage period.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                Storage Features
              </h3>
              <div className="space-y-3">
                {[
                  "Temperature-controlled environments",
                  "UV protection systems",
                  "Automated inventory tracking",
                  "Loading dock efficiency",
                  "Security monitoring 24/7",
                  "Organized racking systems",
                  "Quick order fulfillment",
                  "Multiple facility locations",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Areas Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Specialized Storage Areas
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Different product types require specific storage conditions to 
              maintain quality and performance characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Pipe Storage",
                description: "Large diameter pipes stored horizontally in specialized racks with proper support systems."
              },
              {
                title: "Fitting Warehouse",
                description: "Climate-controlled storage for fittings and accessories with organized shelving systems."
              },
              {
                title: "Raw Material Storage",
                description: "Dedicated areas for PE and PP raw materials with temperature and humidity control."
              },
              {
                title: "Quality Hold Area",
                description: "Separate area for products undergoing quality verification before release."
              },
              {
                title: "Shipping Preparation",
                description: "Staging area for order consolidation and shipping preparation activities."
              },
              {
                title: "Special Products",
                description: "Dedicated storage for custom orders and specialized pipe systems."
              }
            ].map((area, index) => (
              <div key={index} className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#1c2d56] mb-3">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
              Distribution Network
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Efficient logistics network ensures timely delivery to customers 
              across Europe and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "15,000m²",
                label: "Storage Space",
                description: "Total warehouse capacity"
              },
              {
                number: "48hrs",
                label: "Order Processing",
                description: "Average fulfillment time"
              },
              {
                number: "500+",
                label: "Daily Shipments",
                description: "Peak capacity"
              },
              {
                number: "99.8%",
                label: "Accuracy Rate",
                description: "Order fulfillment precision"
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-[#1c2d56] mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
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
              Need Logistics Information?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact our logistics team for delivery schedules, inventory 
              availability, or custom storage solutions.
            </p>
            <Button 
              className="bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Logistics
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default StorageGalleryPage;