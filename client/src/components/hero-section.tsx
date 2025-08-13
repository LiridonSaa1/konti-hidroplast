import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

export function HeroSection() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-18"
      data-testid="hero-section"
    >
      {/* Video Background - YouTube iframe */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          src="https://www.youtube.com/embed/R7b9-m_EM2s?autoplay=1&mute=1&loop=1&playlist=R7b9-m_EM2s&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          title="Konti Hidroplast Corporate Video"
          className="absolute inset-0 w-full h-full object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="hero-video"
        />
        {/* Overlay */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          data-testid="hero-title"
        >
          Unmatched European Standards
          <br />
          <span className="text-blue-200">for Pipeline Precision</span>
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
          data-testid="hero-subtitle"
        >
          Export-oriented Macedonian company for production of PE and PP pipes since 1975
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-8" data-testid="social-links">
          <a
            href="https://www.linkedin.com/company/konti-hidroplast/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-200 transition-colors"
            data-testid="social-linkedin"
          >
            <FaLinkedin className="text-3xl" />
          </a>
          <a
            href="https://www.facebook.com/kontihidroplastofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-200 transition-colors"
            data-testid="social-facebook"
          >
            <FaFacebook className="text-3xl" />
          </a>
          <a
            href="https://www.instagram.com/kontihidroplast/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-200 transition-colors"
            data-testid="social-instagram"
          >
            <FaInstagram className="text-3xl" />
          </a>
        </div>

        <Button
          onClick={scrollToAbout}
          className="bg-white text-konti-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          data-testid="hero-cta"
        >
          Learn More About Us
        </Button>
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
