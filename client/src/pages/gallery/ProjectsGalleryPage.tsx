import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProjectsGalleryPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = "Projects Gallery - Konti Hidroplast";
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
                INFRASTRUCTURE EXCELLENCE
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-red-500">PROJECTS</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                SHOWCASE
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Major infrastructure projects demonstrating the reliability and performance 
              of our PE and PP pipe systems across diverse applications and environments.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <div className="flex items-center gap-2 text-blue-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Large Scale</span>
              </div>
              <div className="flex items-center gap-2 text-green-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">International</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-300">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Multi-sector</span>
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
                Project Excellence
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our pipes and systems have been successfully implemented in 
                  major infrastructure projects across Europe, demonstrating 
                  exceptional performance in demanding applications.
                </p>
                <p>
                  From municipal water supply networks to industrial gas distribution 
                  systems, our products have proven their reliability in diverse 
                  environmental conditions and operational requirements.
                </p>
                <p>
                  Each project represents our commitment to quality, innovation, 
                  and long-term partnership with clients seeking dependable 
                  piping solutions for critical infrastructure.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-6">
                Project Capabilities
              </h3>
              <div className="space-y-3">
                {[
                  "Custom engineering solutions",
                  "Large-scale installations",
                  "Multi-phase project delivery",
                  "Technical consultation",
                  "On-site support services",
                  "Post-installation monitoring",
                  "Warranty and maintenance",
                  "Compliance certification",
                ].map((capability, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Project Categories
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our diverse project portfolio spans multiple sectors and 
              applications across various industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Municipal Water Systems",
                description: "Large-scale water distribution networks for cities and municipalities across Europe."
              },
              {
                title: "Gas Distribution Networks",
                description: "High-pressure gas pipeline systems for urban and industrial applications."
              },
              {
                title: "Industrial Projects",
                description: "Custom piping solutions for manufacturing facilities and chemical plants."
              },
              {
                title: "Infrastructure Development",
                description: "Cable protection and telecommunications infrastructure projects."
              },
              {
                title: "Sewage Systems",
                description: "Wastewater management and sewage treatment facility installations."
              },
              {
                title: "Mining Applications",
                description: "Specialized piping systems for mining operations and tailings management."
              }
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#1c2d56] mb-3">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
              Project Success Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our track record demonstrates consistent project success and 
              customer satisfaction across all applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "500+",
                label: "Completed Projects",
                description: "Successfully delivered"
              },
              {
                number: "25+",
                label: "Countries",
                description: "International presence"
              },
              {
                number: "99.2%",
                label: "Success Rate",
                description: "On-time delivery"
              },
              {
                number: "50+",
                label: "Years Experience",
                description: "Industry expertise"
              }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-[#1c2d56] mb-2">{metric.number}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">{metric.label}</div>
                  <div className="text-sm text-gray-600">{metric.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-6">
              Notable Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Highlighting some of our most significant project contributions 
              to infrastructure development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "European Gas Network Expansion",
                details: "500km of PE100 gas distribution pipes",
                impact: "Serving 200,000+ households across multiple regions"
              },
              {
                title: "Smart City Water Infrastructure",
                details: "Advanced monitoring and distribution system",
                impact: "IoT-enabled network serving 150,000 residents"
              },
              {
                title: "Industrial Complex Upgrade",
                details: "Complete piping system overhaul",
                impact: "Improved efficiency by 40% and reduced maintenance costs"
              },
              {
                title: "Cross-Border Pipeline Project",
                details: "International gas transmission system",
                impact: "Enhanced energy security for three countries"
              }
            ].map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">{achievement.title}</h3>
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Project Scope</span>
                  <p className="text-gray-700 mt-1">{achievement.details}</p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Impact</span>
                  <p className="text-gray-700 mt-1">{achievement.impact}</p>
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
              Ready for Your Next Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Partner with us for your infrastructure projects and benefit 
              from our expertise and proven track record.
            </p>
            <Button 
              className="bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProjectsGalleryPage;