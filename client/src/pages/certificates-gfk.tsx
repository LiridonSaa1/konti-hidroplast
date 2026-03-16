import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Download, Shield, Award, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

// Simple static data for GFK certificates (adjust URLs/titles as needed)
const gfkCertificateCategories = [
  {
    id: "gfk-systems",
    title: "GFK-Rohre Zertifikate",
    certificates: [],
  },
];

function GFKCertificatesPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const displayData = gfkCertificateCategories;

  const nextTab = () => {
    setActiveTabIndex((prev) =>
      prev === displayData.length - 1 ? 0 : prev + 1,
    );
  };

  const prevTab = () => {
    setActiveTabIndex((prev) =>
      prev === 0 ? displayData.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    document.title = `Zertifikate - GFK-Rohre - ${companyInfo.companyName || "Konti Hidroplast"}`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Zertifikate für GFK-Rohre und -Systeme von Konti Hidroplast.",
      );
    }
  }, []);

  const CertificateCard = ({ certificate, categoryId, index }: {
    certificate: { title: string; image?: string; downloadUrl?: string };
    categoryId: string;
    index: number;
  }) => {
    const hasImage = certificate.image;

    return (
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        data-testid={`gfk-certificate-${categoryId}-${index}`}
      >
        <div className="aspect-[3/4] bg-gray-100">
          {hasImage ? (
            <img
              src={hasImage || "/placeholder-certificate.jpg"}
              alt={certificate.title}
              className="w-full h-full object-fill"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-8 h-8 text-gray-500" />
                </div>
                <div className="text-gray-500 text-sm">No Preview</div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-[#1c2d56] mb-3 line-clamp-2 min-h-[2.5rem]">
            {certificate.title}
          </h3>
          {certificate.downloadUrl && certificate.downloadUrl !== "#" ? (
            <a
              href={certificate.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center w-full justify-center px-3 py-2 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white text-sm rounded-lg transition-colors"
              data-testid={`gfk-download-${categoryId}-${index}`}
            >
              <Download className="w-3 h-3 mr-2" />
              {t("certificates.download")}
            </a>
          ) : (
            <button
              className="inline-flex items-center w-full justify-center px-3 py-2 bg-gray-400 cursor-not-allowed text-white text-sm rounded-lg"
              disabled
              data-testid={`gfk-no-file-${categoryId}-${index}`}
            >
              <Shield className="w-3 h-3 mr-2" />
              No Preview
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="h-full w-full bg-gradient-to-l from-white/20 to-transparent transform skew-x-12"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
              <span className="text-sm font-medium">{t("productPages.qualityAssurance")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Zertifikate - GFK-Rohre
            </h1>
            <p
              className="text-xl text-gray-300 mb-16 leading-relaxed max-w-3xl mx-auto"
            >
              Zertifikate und Nachweise für unsere GFK-Rohrsysteme sind derzeit noch nicht auf unserer Webseite einsehbar. Sollten Sie diese benötigen, kontaktieren Sie uns bitte jederzeit – wir stellen Ihnen die entsprechenden Unterlagen gerne zur Verfügung.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("productPages.certificatesStandards")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-12">
            <button
              onClick={prevTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors mr-4"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-4 min-w-[300px] text-center">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-1">
                {displayData[activeTabIndex]?.title || "Loading..."}
              </h3>
              <div className="flex justify-center space-x-1 mt-3">
                {displayData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTabIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeTabIndex
                        ? "bg-[#1c2d56]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors ml-4"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {displayData.map((category, index) => (
            <div
              key={category.id}
              className={`${activeTabIndex === index ? "block animate-fadeIn" : "hidden"} transition-all duration-500`}
            >
              {category.certificates && (
                <div className="space-y-8">
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {category.certificates.map((certificate, certIndex) => (
                      <CertificateCard
                        key={certIndex}
                        certificate={certificate}
                        categoryId={category.id}
                        index={certIndex}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("aboutUs.getInTouchTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Kontaktieren Sie uns noch heute!
            </p>
            <Button
              onClick={() => {
                sessionStorage.setItem("scrollToContact", "true");
                setLocation("/");
              }}
              className="px-8 py-4 rounded-lg font-semibold text-lg text-white bg-[#1c2d56] hover:bg-[#1c2d56]/90 transition-colors"
            >
              {t("aboutUs.contactUsButton")}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default GFKCertificatesPage;

