import { Navigation } from "@/components/navigation";
import { AboutSection } from "@/components/about-section";
import { CertificationsSection } from "@/components/certifications-section";
import { Footer } from "@/components/footer";
import { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    // Set page title
    document.title = "About Us - Urban Rohr | Konti Hidroplast";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content', 
        'Learn about Urban Rohr by Konti Hidroplast - Export-oriented Macedonian company for production of PE and PP pipes since 1975. European standards for pipeline precision.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Urban Rohr</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the story behind our commitment to excellence in pipeline manufacturing 
            and our dedication to European quality standards since 1975.
          </p>
        </div>
      </section>

      {/* About Content */}
      <div className="py-8">
        <AboutSection />
      </div>

      {/* Certifications */}
      <div className="py-8 bg-white">
        <CertificationsSection />
      </div>

      <Footer />
    </div>
  );
}