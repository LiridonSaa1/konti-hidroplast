import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export function ProductsSection() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Product 1 - Water Supply Systems */}
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
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
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
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
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
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
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
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
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
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
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  {t('products.gasPipeline')}
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
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
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
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  {t('products.cableProtection')}
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

          {/* Product 5 - GFK-Rohre / GRP Pipes */}
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-64 relative overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src="/attached_assets/superlit-ctp-boru.jpg"
                alt="GFK-Rohre - GRP Pipes"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500" />
            </div>
            <div className="p-8 relative">
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  {t("productsPage.ctpBoru")}
                </h3>
                <Link href="/products/ctp-pipes">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t("products.learnMore")}</span>
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

          {/* Product 6 - Fittings */}
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-64 relative overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src="/attached_assets/superlit-website-new-fittings-removebg-preview.png"
                alt="Fittings"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500" />
            </div>
            <div className="p-8 relative">
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  {t("productsPage.fittings")}
                </h3>
                <Link href="/products/ctp-fittings">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t("products.learnMore")}</span>
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

          {/* Product 7 - GRP Couplings */}
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-64 relative overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src="/attached_assets/manson-removebg-preview.png"
                alt="GRP Couplings"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500" />
            </div>
            <div className="p-8 relative">
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  {t("productsPage.ctpMansons")}
                </h3>
                <Link href="/products/ctp-mansons">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t("products.learnMore")}</span>
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

          {/* Product 8 - CTP Kayar Manşon (Sliding Sleeve) */}
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-64 relative overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src="/attached_assets/kayar-manson-001-tr.webp"
                alt="CTP Kayar Manşon"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500" />
            </div>
            <div className="p-8 relative">
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  {t("productsPage.ctpKayarManson")}
                </h3>
                <Link href="/products/ctp-kayar-manson">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t("products.learnMore")}</span>
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

          {/* Product 9 - GFK Jacking-Kupplung */}
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-64 relative overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src="/attached_assets/jacking-jpeg2.webp"
                alt="GFK Jacking-Kupplung"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500" />
            </div>
            <div className="p-8 relative">
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  GFK Jacking-Kupplung
                </h3>
                <Link href="/products/ctp-jacking-manson">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t("products.learnMore")}</span>
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

          {/* Product 10 - GRP Manholes */}
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-64 relative overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src="/attached_assets/superlit-manhole-removebg-preview.png"
                alt="GRP Manholes"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500" />
            </div>
            <div className="p-8 relative">
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  {t("productsPage.ctpManholes")}
                </h3>
                <Link href="/products/ctp-menhol">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t("products.learnMore")}</span>
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

          {/* Product 11 - GRP Tanks */}
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-64 relative overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src="/attached_assets/superlit-tank-rm-bg.png"
                alt="GRP Tanks"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500" />
            </div>
            <div className="p-8 relative">
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  {t("productsPage.ctpTank")}
                </h3>
                <Link href="/products/ctp-tank">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t("products.learnMore")}</span>
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

          {/* Product 12 - Sonderanwendungen/Sonderprodukte */}
          <div className="group bg-white rounded-3xl min-w-0 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <div className="h-64 relative overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src="/attached_assets/superlit-special-applications-removebg-preview.png"
                alt="Sonderanwendungen/Sonderprodukte"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/5 transition-all duration-500" />
            </div>
            <div className="p-8 relative">
              <div className="absolute top-6 left-8 w-12 h-1 bg-[#1c2d56] rounded-full group-hover:w-16 transition-all duration-300" />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide leading-tight group-hover:text-[#1c2d56] transition-colors duration-300 min-w-0 break-words [overflow-wrap:anywhere]">
                  {t("productsPage.specialApplications")}
                </h3>
                <Link href="/ozel-uygulamalar">
                  <button className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-300 group-hover:translate-x-1 hover:shadow-lg bg-[#1c2d56]">
                    <span>{t("products.learnMore")}</span>
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
