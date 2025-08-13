import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
  const { t } = useLanguage();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openVideo = () => {
    window.open("https://www.youtube.com/watch?v=R7b9-m_EM2s", "_blank");
  };

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen bg-konti-gray-light flex items-center relative overflow-hidden"
      data-testid="about-section"
    >
      {/* Background Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gray-400"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-400"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gray-400"></div>
        <div className="absolute left-1/4 top-0 w-px h-full bg-gray-400"></div>
        <div className="absolute left-1/2 top-0 w-px h-full bg-gray-400"></div>
        <div className="absolute left-3/4 top-0 w-px h-full bg-gray-400"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border border-gray-400 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border border-gray-400 rounded-full"></div>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Content */}
            <div
              className={`text-center lg:text-left ${
                hasIntersected ? "animate-slide-up" : "opacity-0"
              }`}
            >
              <h2
                className="text-4xl font-bold text-konti-gray mb-6"
                data-testid="about-title"
              >
                {t("about.title")}
              </h2>
              <p className="text-lg text-gray-600 mb-6" data-testid="about-text-1">
                {t("about.text1")}
              </p>
              <p className="text-lg text-gray-600 mb-6" data-testid="about-text-2">
                {t("about.text2")}
              </p>
              <p className="text-lg text-gray-600 mb-8" data-testid="about-text-3">
                {t("about.text3")}
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button
                  onClick={scrollToContact}
                  className="bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  data-testid="about-cta"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* YouTube Video */}
            <div
              className={`relative flex justify-center ${
                hasIntersected ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <div className="relative w-full max-w-lg lg:max-w-none">
                {/* Blue asymmetrical frame - matching the reference design */}
                <div className="absolute inset-0 bg-cyan-400" style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)'
                }}></div>
                
                {/* White inner frame */}
                <div className="absolute inset-4 bg-white"></div>
                
                {/* Video container */}
                <div className="relative m-6 aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/R7b9-m_EM2s?autoplay=1&mute=1&loop=0"
                    title="Konti Hidroplast Corporate Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    data-testid="about-video"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
