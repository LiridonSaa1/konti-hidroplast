import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const products = [
  {
    titleKey: "specialApps.marineLugTitle",
    image: "/attached_assets/marine-lug.jpg",
    href: "/products/marine-lug",
  },
  {
    titleKey: "specialApps.darkLinerTitle",
    image: "/attached_assets/dark-liner.jpg",
    href: "/products/dark-liner",
  },
  {
    titleKey: "specialApps.trenchlessTitle",
    image: "/attached_assets/jacking.jpg",
    href: "/products/trenchless-systems",
  },
];

function SpecialApplicationsPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t("specialApps.pageTitle")} - Urban Rohr`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("specialApps.pageDesc"));
    }
  }, [t]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1c2d56] via-[#1c2d56] to-[#2a4a8a] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef4444]/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            {t("specialApps.heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t("specialApps.heroDesc")}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((product, index) => (
              <a
                key={index}
                href={product.href}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-full aspect-[4/3] flex items-center justify-center mb-6 overflow-hidden">
                  <img
                    src={product.image}
                    alt={t(product.titleKey)}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#1c2d56] underline underline-offset-4 decoration-[#1c2d56]  transition-colors duration-300">
                  {t(product.titleKey)}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SpecialApplicationsPage;
