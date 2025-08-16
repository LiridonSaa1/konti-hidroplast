import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Award, TrendingUp, Heart, Mail, Phone, MapPin, Building } from "lucide-react";

function CareerPage() {
  const { t } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = "Career Opportunities - Konti Hidroplast";

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Join Konti Hidroplast team! Explore career opportunities in pipe manufacturing, engineering, quality control, and production. Build your career with a leading industrial company in North Macedonia.",
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
          <div className="text-center">
            <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
              <span className="text-sm font-medium">
                JOIN OUR TEAM
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="text-red-500">ALWAYS</span> ON THE
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                LOOKOUT FOR
              </span>
              <br />
              <span className="text-white">TOP TALENT</span>
            </h1>
            <p
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
              data-testid="hero-description"
            >
              Join Konti Hidroplast and become part of a team dedicated to excellence in pipe manufacturing. We're looking for talented professionals to grow with us.
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Dynamic Team
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                Professional Growth
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Career Development
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Career Areas Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Career Opportunities
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore diverse career paths across different departments and specializations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">Production & Manufacturing</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Production Operators</li>
                <li>• Machine Technicians</li>
                <li>• Process Engineers</li>
                <li>• Maintenance Specialists</li>
                <li>• Production Supervisors</li>
              </ul>
              <p className="text-sm text-gray-500">
                Join our production team and be part of manufacturing high-quality PE and PP pipes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">Quality Control</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Quality Inspectors</li>
                <li>• Laboratory Technicians</li>
                <li>• Quality Engineers</li>
                <li>• Certification Specialists</li>
                <li>• Testing Coordinators</li>
              </ul>
              <p className="text-sm text-gray-500">
                Ensure our products meet the highest international quality standards and certifications.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">Engineering & R&D</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Design Engineers</li>
                <li>• Product Development</li>
                <li>• Technical Specialists</li>
                <li>• Research Analysts</li>
                <li>• Innovation Managers</li>
              </ul>
              <p className="text-sm text-gray-500">
                Drive innovation and develop next-generation piping solutions for various industries.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">Sales & Marketing</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Sales Representatives</li>
                <li>• Account Managers</li>
                <li>• Marketing Specialists</li>
                <li>• Business Development</li>
                <li>• Customer Support</li>
              </ul>
              <p className="text-sm text-gray-500">
                Build relationships with clients and expand our market presence across different sectors.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">Administration</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Human Resources</li>
                <li>• Finance & Accounting</li>
                <li>• Administrative Support</li>
                <li>• IT Support</li>
                <li>• Procurement</li>
              </ul>
              <p className="text-sm text-gray-500">
                Support our operations with essential administrative and support services.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-[#1c2d56] mb-4">Logistics & Supply Chain</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• Warehouse Operators</li>
                <li>• Logistics Coordinators</li>
                <li>• Supply Chain Analysts</li>
                <li>• Inventory Specialists</li>
                <li>• Transportation Managers</li>
              </ul>
              <p className="text-sm text-gray-500">
                Manage the flow of materials and products to ensure efficient operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-red-500 mr-3" />
                <h2 className="text-4xl font-bold text-[#1c2d56]">Our Culture</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Konti Hidroplast, we believe that our people are our greatest asset. We foster a culture of 
                innovation, collaboration, and continuous improvement where every team member can thrive and contribute 
                to our shared success.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    <strong>Innovation:</strong> We encourage creative thinking and welcome new ideas from all team members.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    <strong>Collaboration:</strong> We work together as one team, supporting each other to achieve common goals.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    <strong>Excellence:</strong> We strive for the highest standards in everything we do.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">
                    <strong>Sustainability:</strong> We are committed to environmental responsibility and sustainable practices.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl p-8">
              <img
                src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Konti-Hidroplast-Proizvodstvo-27-1.jpg"
                alt="Konti Hidroplast Team"
                className="w-full h-80 object-cover rounded-xl mb-6"
              />
              <blockquote className="text-lg italic text-gray-700">
                "Join us and be part of a company that values innovation, quality, and the professional growth of our team members."
              </blockquote>
              <div className="mt-4">
                <p className="font-semibold text-[#1c2d56]">Boris Madjunkov</p>
                <p className="text-gray-600 text-sm">General Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Apply
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Submit your application to join our team of talented professionals.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c2d56] focus:border-transparent"
                  data-testid="input-full-name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c2d56] focus:border-transparent"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c2d56] focus:border-transparent"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume *
                </label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c2d56] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1c2d56] file:text-white hover:file:bg-blue-900"
                  data-testid="input-resume"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c2d56] focus:border-transparent"
                  placeholder="Tell us about yourself and why you'd like to join our team..."
                  data-testid="textarea-message"
                ></textarea>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-4 bg-[#1c2d56] text-white rounded-lg hover:bg-blue-900 transition-colors font-semibold text-lg"
                  data-testid="submit-button"
                >
                  Submit Application
                </button>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#1c2d56]" />
                  Industriska 5, 1480 Gevgelija, North Macedonia
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-[#1c2d56]" />
                  +389 34 215 225
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-[#1c2d56]" />
                  hr@konti-hidroplast.com.mk
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CareerPage;