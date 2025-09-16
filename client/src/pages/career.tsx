import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import {
  Users,
  Award,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
} from "lucide-react";

function CareerPage() {
  const { t, language } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();

  useEffect(() => {
    // Set page title
    document.title = `Career Opportunities - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Join our team at Konti Hidroplast. Explore career opportunities in engineering, manufacturing, and business development. We offer competitive benefits and growth opportunities.",
      );
    }
  }, [companyInfo.companyName]);

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-[#1c2d56]" />,
      title: t("careerPage.benefits.teamwork"),
      description: t("careerPage.benefits.teamworkDesc"),
    },
    {
      icon: <Award className="w-8 h-8 text-[#1c2d56]" />,
      title: t("careerPage.benefits.recognition"),
      description: t("careerPage.benefits.recognitionDesc"),
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#1c2d56]" />,
      title: t("careerPage.benefits.growth"),
      description: t("careerPage.benefits.growthDesc"),
    },
  ];

  const positions = [
    {
      title: t("careerPage.positions.engineer"),
      department: t("careerPage.positions.engineering"),
      description: t("careerPage.positions.engineerDesc"),
    },
    {
      title: t("careerPage.positions.technician"),
      department: t("careerPage.positions.production"),
      description: t("careerPage.positions.technicianDesc"),
    },
    {
      title: t("careerPage.positions.sales"),
      department: t("careerPage.positions.sales"),
      description: t("careerPage.positions.salesDesc"),
    },
    {
      title: t("careerPage.positions.admin"),
      department: t("careerPage.positions.administration"),
      description: t("careerPage.positions.adminDesc"),
    },
  ];

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
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              {t("careerPage.hero.title")}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {t("careerPage.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center gap-2 text-blue-200">
                <Building className="w-5 h-5" />
                <span>{t("careerPage.hero.company")}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-200">
                <MapPin className="w-5 h-5" />
                <span>{t("careerPage.hero.location")}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-200">
                <Globe className="w-5 h-5" />
                <span>{t("careerPage.hero.market")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* <h2 className="text-4xl font-bold text-[#1c2d56] mb-4">
              {t("careerPage.benefits.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("careerPage.benefits.subtitle")}
            </p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1c2d56] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c2d56] mb-4">
              {t("careerPage.positions.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("careerPage.positions.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1c2d56] mb-2">
                      {position.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {position.department}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{position.description}</p>
                <div className="flex items-center text-[#1c2d56] font-medium">
                  <span className="text-sm">{t("careerPage.positions.contact")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </div>
  );
}

export default CareerPage;