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
      className="min-h-screen bg-konti-gray-light flex items-center"
      data-testid="about-section"
    >
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
                  className="konti-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
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
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl w-full max-w-lg lg:max-w-none">
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
    </section>
  );
}
