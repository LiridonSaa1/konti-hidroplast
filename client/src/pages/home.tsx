import { useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { StatisticsSection } from "@/components/statistics-section";
import { ProductsSection } from "@/components/products-section";
import { CertificationsSection } from "@/components/certifications-section";
import { NewsSection } from "@/components/news-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ScrollToContactFab } from "@/components/scroll-to-contact-fab";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { useAnimatedScroll } from "@/hooks/use-smooth-scroll";

export default function Home() {
  const { scrollToContact } = useAnimatedScroll();
  
  useEffect(() => {
    // Check if we need to scroll to contact section
    const shouldScrollToContact = sessionStorage.getItem('scrollToContact');
    console.log('Home page useEffect - shouldScrollToContact:', shouldScrollToContact);
    if (shouldScrollToContact) {
      // Clear the flag
      sessionStorage.removeItem('scrollToContact');
      console.log('Cleared scrollToContact flag, setting timer to scroll');
      // Wait for the page to fully render and then use animated scroll
      const timer = setTimeout(() => {
        console.log('Executing scrollToContact');
        scrollToContact({ duration: 1200, offset: 80 });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [scrollToContact]);

  // Listen for custom scrollToContact event (when already on home page)
  useEffect(() => {
    const handleScrollToContact = () => {
      console.log('Custom scrollToContact event received');
      const timer = setTimeout(() => {
        console.log('Executing scrollToContact from custom event');
        scrollToContact({ duration: 1200, offset: 80 });
      }, 100);
      
      return () => clearTimeout(timer);
    };

    window.addEventListener('scrollToContact', handleScrollToContact);
    
    return () => {
      window.removeEventListener('scrollToContact', handleScrollToContact);
    };
  }, [scrollToContact]);
  return (
    <div className="min-h-screen bg-white scroll-smooth" data-testid="home-page">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <StatisticsSection />
        <ProductsSection />
        <CertificationsSection />
        <NewsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToContactFab />
      <ScrollProgressIndicator />
    </div>
  );
}
