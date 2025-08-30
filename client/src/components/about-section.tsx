import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export function AboutSection() {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(true); // Changed to true for immediate autoplay
  const { ref: sectionRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  });

  const handlePlayVideo = () => {
    setShowVideo(true);
  };

  // Auto-show video after a short delay for better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-konti-gray-light flex items-center relative overflow-hidden"
      data-testid="about-section"
    >
      {/* Background Design with Red Lines */}
      <div className="absolute inset-0 pointer-events-none">

        
        {/* Red accent lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Diagonal red lines */}
          <div className="absolute top-0 left-0 w-96 h-1 bg-red-500 transform rotate-45 origin-left"></div>
          <div className="absolute top-32 left-0 w-80 h-1 bg-red-500 transform rotate-45 origin-left"></div>
          <div className="absolute top-64 left-0 w-64 h-1 bg-red-500 transform rotate-45 origin-left"></div>
          
          {/* Right side diagonal lines */}
          <div className="absolute bottom-0 right-0 w-96 h-1 bg-red-500 transform -rotate-45 origin-right"></div>
          <div className="absolute bottom-32 right-0 w-80 h-1 bg-red-500 transform -rotate-45 origin-right"></div>
          <div className="absolute bottom-64 right-0 w-64 h-1 bg-red-500 transform -rotate-45 origin-right"></div>
          
          {/* Vertical accent lines */}
          <div className="absolute top-0 left-16 w-1 h-96 bg-red-500"></div>
          <div className="absolute top-0 right-16 w-1 h-96 bg-red-500"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-32 h-32 border-2 border-red-500 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-2 border-red-500 rounded-full"></div>
          <div className="absolute top-1/2 left-0 w-6 h-6 bg-red-500 rounded-full transform -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-0 w-4 h-4 bg-red-500 rounded-full"></div>
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-16 md:py-8 lg:py-0">
            {/* Content */}
            <div
              className={`text-center lg:text-left ${
                hasIntersected ? "animate-slide-up" : "opacity-0"
              }`}
            >
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-20 h-0.5 mr-4" style={{backgroundColor: '#eb2127'}}></div>
                <h2
                  className="text-4xl font-bold text-konti-gray"
                  data-testid="about-title"
                >
                  {t("about.title")}
                </h2>
                <div className="w-20 h-0.5 ml-4" style={{backgroundColor: '#eb2127'}}></div>
              </div>
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
                <Link href="/about-us">
                  <Button
                    className="bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    data-testid="about-cta"
                  >
                    {t('common.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
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
                <div className="absolute inset-0 bg-[#1c2d56]" style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)'
                }}></div>
                
                {/* White inner frame */}
                <div className="absolute inset-4 bg-white"></div>
                
                {/* Video container */}
                <div className="relative m-6 aspect-video rounded-xl overflow-hidden shadow-2xl">
                  {!showVideo ? (
                    // Video Thumbnail with Play Button
                    <div className="relative w-full h-full bg-black">
                      <img
                        src="https://img.youtube.com/vi/R7b9-m_EM2s/maxresdefault.jpg"
                        alt="Corporate Video Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <button
                          onClick={handlePlayVideo}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                          aria-label="Play Corporate Video"
                        >
                          <Play className="w-8 h-8 ml-1" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // YouTube iframe (only loads when user clicks play)
                    <iframe
                      src="https://www.youtube.com/embed/R7b9-m_EM2s?autoplay=1&mute=1&loop=1&playlist=R7b9-m_EM2s&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                      title="Corporate Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      data-testid="about-video"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
