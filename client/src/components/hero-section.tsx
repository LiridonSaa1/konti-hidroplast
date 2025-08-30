import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronDown, Play } from "lucide-react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";

export function HeroSection() {
  const { t } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const [, setLocation] = useLocation();
  const [showVideo, setShowVideo] = useState(false);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Video Background - Lazy Loaded YouTube */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {!showVideo ? (
          // Video Thumbnail with Play Button
          <div className="relative w-full h-full bg-black">
            <img
              src="https://img.youtube.com/vi/R7b9-m_EM2s/maxresdefault.jpg"
              alt="Konti Hidroplast Corporate Video Thumbnail"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button
                onClick={handlePlayVideo}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                aria-label="Play Konti Hidroplast Corporate Video"
              >
                <Play className="w-12 h-12 ml-1" />
              </button>
            </div>
          </div>
        ) : (
          // YouTube iframe (only loads when user clicks play)
          <iframe
            src="https://www.youtube.com/embed/R7b9-m_EM2s?autoplay=1&mute=1&loop=1&playlist=R7b9-m_EM2s&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            title={t("hero.videoTitle")}
            className="video-fullscreen"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="hero-video"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
        <h1
          className="text-5xl md:text-7xl hero-title mb-6 uppercase"
          data-testid="hero-title"
        >
          <span style={{ color: '#eb2127' }}>{t("hero.title.line1")}</span>
          <br />
          <span className="font-light text-white/90">{t("hero.title.line2")}</span>
          <br />
          <span className="font-black" style={{ color: '#1c2d56' }}>{t("hero.title.line3")}</span>
        </h1>



        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-8" data-testid="social-links">
          {companyInfo.socialLinkedIn && (
            <a
              href={companyInfo.socialLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#1c2d56'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              data-testid="social-linkedin"
            >
              <FaLinkedin className="text-3xl" />
            </a>
          )}
          {companyInfo.socialFacebook && (
            <a
              href={companyInfo.socialFacebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#1c2d56'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              data-testid="social-facebook"
            >
              <FaFacebook className="text-3xl" />
            </a>
          )}
          {companyInfo.socialInstagram && (
            <a
              href={companyInfo.socialInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#1c2d56'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              data-testid="social-instagram"
            >
              <FaInstagram className="text-3xl" />
            </a>
          )}
        </div>


      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ChevronDown
            className="text-white text-2xl cursor-pointer"
            onClick={scrollToAbout}
            data-testid="scroll-indicator"
          />
        </div>
      </div>
    </section>
  );
}
