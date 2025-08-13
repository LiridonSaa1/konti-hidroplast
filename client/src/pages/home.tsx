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

export default function Home() {
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
    </div>
  );
}
