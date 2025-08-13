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
      className="py-20 bg-konti-gray-light"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`${
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
            <Button
              onClick={scrollToContact}
              className="konti-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              data-testid="about-cta"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Video Placeholder */}
          <div
            className={`relative ${
              hasIntersected ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Konti Hidroplast Manufacturing Facility"
                className="w-full h-full object-cover"
                data-testid="about-image"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Button
                  onClick={openVideo}
                  variant="secondary"
                  size="lg"
                  className="bg-white bg-opacity-90 rounded-full w-16 h-16 p-0 hover:bg-opacity-100 transition-all shadow-lg"
                  data-testid="video-play-button"
                >
                  <Play className="text-konti-blue text-xl ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
