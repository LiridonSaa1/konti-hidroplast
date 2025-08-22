import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowDown } from "lucide-react";
import { useAnimatedScroll } from "@/hooks/use-smooth-scroll";
import { useLanguage } from "@/contexts/LanguageContext";

export function ScrollToContactFab() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { scrollToContact } = useAnimatedScroll();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling 100px and when not in contact section
      const contactSection = document.getElementById('contact');
      if (!contactSection) return;

      const contactTop = contactSection.offsetTop;
      const contactHeight = contactSection.offsetHeight;
      const scrollPosition = window.pageYOffset + window.innerHeight;
      const isInContactSection = 
        window.pageYOffset + window.innerHeight / 2 >= contactTop &&
        window.pageYOffset <= contactTop + contactHeight;

      setIsVisible(window.pageYOffset > 100 && !isInContactSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    scrollToContact();
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <Button
        onClick={handleClick}
        className={`
          group relative h-14 w-14 rounded-full bg-gradient-to-r from-[#1c2d56] to-blue-700
          hover:from-blue-700 hover:to-[#1c2d56] shadow-lg hover:shadow-xl 
          transition-all duration-300 transform hover:scale-105
          ${isAnimating ? 'animate-pulse' : ''}
        `}
        data-testid="scroll-to-contact-fab"
      >
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center justify-center">
          <MessageCircle 
            className={`h-6 w-6 text-white transition-transform duration-300 ${
              isAnimating ? 'scale-110' : ''
            }`} 
          />
          <ArrowDown 
            className={`absolute h-3 w-3 text-white/80 translate-y-2 transition-all duration-500 ${
              isAnimating ? 'animate-bounce' : 'group-hover:translate-y-3'
            }`}
          />
        </div>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
        
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
            {t('navigation.contact')}
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </div>
        </div>
      </Button>
    </div>
  );
}