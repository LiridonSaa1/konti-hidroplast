import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
const products = [
  {
    title: "WATER SUPPLY SYSTEMS",
    description:
      "High-quality PE pipes for reliable water distribution networks.",
    image: "/attached_assets/Water-supply-min-1_1755115058874.jpg",
  },
  {
    title: "SEWERAGE SYSTEMS",
    description:
      "Durable PP pipes designed for efficient wastewater management.",
    image:
      "/attached_assets/Konti-Hidroplast-Proizvodstvo-27-1_1755115099243.jpg",
  },
  {
    title: "GAS PIPELINE SYSTEM",
    description: "Safe and reliable PE pipes for natural gas distribution.",
    image: "/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg",
  },
  {
    title: "CABLE PROTECTION",
    description:
      "Protective conduits for electrical and telecommunications cables.",
    image: "/attached_assets/CABLE-PROTECTION-min-1_1755115210995.jpg",
  },
];

export function ProductsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { t } = useLanguage();

  return (
    <section className="py-20 relative overflow-hidden bg-white text-[#1c2d56]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">{t('products.title')}</h2>
            <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
          </div>
        </div>

        {/* Products Grid - Vertical Card Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Product 1 - Water Supply Systems */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            {/* Product Image - Top */}
            <div className="h-64 relative overflow-hidden">
              <img
                src="/attached_assets/Water-supply-min-1_1755115058874.jpg"
                alt="Water Supply Systems"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
            </div>

            {/* Product Content - Bottom */}
            <div className="p-8 relative">
              {/* Decorative accent */}
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                  {t('products.waterSupply')}
                </h3>

                {/* Learn More Button */}
                <Link href="/products/water-supply-systems">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t('products.learnMore')}</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Product 2 - Sewerage Systems */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            {/* Product Image - Top */}
            <div className="h-64 relative overflow-hidden">
              <img
                src="/attached_assets/Konti-Hidroplast-Proizvodstvo-27-1_1755115099243.jpg"
                alt="Sewerage Systems"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
            </div>

            {/* Product Content - Bottom */}
            <div className="p-8 relative">
              {/* Decorative accent */}
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                  {t('products.sewerage')}
                </h3>

                {/* Learn More Button */}
                <Link href="/konti-kan-pipes-and-fittings">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t('products.learnMore')}</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Product 3 - Gas Pipeline System */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            {/* Product Image - Top */}
            <div className="h-64 relative overflow-hidden">
              <img
                src="/attached_assets/GAS-PIPELINE-SYSTEM-min-1_1755115129403.jpg"
                alt="Gas Pipeline System"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
            </div>

            {/* Product Content - Bottom */}
            <div className="p-8 relative">
              {/* Decorative accent */}
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                  {t('aboutUs.gasPipelineSystem')}
                </h3>

                {/* Learn More Button */}
                <Link href="/products/gas-pipeline-systems">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t('products.learnMore')}</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Product 4 - Cable Protection */}
          <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            {/* Product Image - Top */}
            <div className="h-64 relative overflow-hidden">
              <img
                src="/attached_assets/CABLE-PROTECTION-min-1_1755115210995.jpg"
                alt="Cable Protection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-500" />
            </div>

            {/* Product Content - Bottom */}
            <div className="p-8 relative">
              {/* Decorative accent */}
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />

              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300">
                  {t('aboutUs.cableProtection')}
                </h3>

                {/* Learn More Button */}
                <Link href="/products/cable-protection">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t('products.learnMore')}</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:ml-3 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
