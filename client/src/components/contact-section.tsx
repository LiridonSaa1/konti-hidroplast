import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { useState } from "react";
import { MapPin, Phone, Share2, ExternalLink } from "lucide-react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export function ContactSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  const { t } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneNumbers = companyInfo.phones && companyInfo.phones.length > 0 
    ? companyInfo.phones 
    : [
        "+389 34 215 225",
        "+389 34 212 064",
        "+389 34 212 226",
        "+389 34 211 964",
        "+389 34 211 757",
      ];

  const handleInputChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.message) {
      toast({
        title: t('contact.validation.error'),
        description: t('contact.validation.required'),
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t('contact.validation.email'),
        description: t('contact.validation.email.message'),
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit form data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const result = await response.json();
      
      // Show success message with email status
      if (result.emailsSent) {
        toast({
          title: t('contact.success.title'),
          description: `${t('contact.success.message')} Emails sent successfully.`,
        });
      } else {
        toast({
          title: t('contact.success.title'),
          description: `${t('contact.success.message')} Note: Email notifications are currently disabled.`,
          variant: "default",
        });
      }
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.message'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-white relative"
      data-testid="contact-section"
    >
      {/* Scroll target indicator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
        <div className="w-12 h-1 bg-gradient-to-r from-[#1c2d56] to-blue-500 rounded-full opacity-60"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 ${
            hasIntersected ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2
            className="text-4xl font-bold text-konti-gray mb-4"
            data-testid="contact-title"
          >
            {t('contact.title')}
          </h2>
          <p
            className="text-xl text-gray-600"
            data-testid="contact-subtitle"
          >
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Enhanced Contact Form */}
          <div
            className={`relative ${
              hasIntersected ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 rounded-2xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-white to-blue-50 rounded-2xl transform -rotate-1"></div>
            
            <Card className="relative bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
              {/* Card Header with solid color */}
              <div className="p-8 text-center relative overflow-hidden" style={{backgroundColor: 'rgb(28, 45, 86)'}}>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-x-8 translate-y-8"></div>
                <div className="absolute top-1/2 right-4 w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="absolute top-4 left-1/3 w-1 h-1 bg-white/20 rounded-full"></div>
                
                <h3
                  className="text-3xl font-bold text-white mb-2 relative z-10"
                  data-testid="contact-form-title"
                >
                  {t('contact.form.title')}
                </h3>
                <p className="text-blue-100 relative z-10">
                  {t('contact.form.subtitle')}
                </p>
              </div>

              <CardContent className="p-10">
                <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-3 block">
                        {t('contact.form.name')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="name"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl transition-all duration-300 bg-gray-50 hover:bg-white"
                          placeholder={t('contact.form.name.placeholder')}
                          required
                          data-testid="input-name"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-konti-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>
                    <div className="group">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-3 block">
                        {t('contact.form.email')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl transition-all duration-300 bg-gray-50 hover:bg-white"
                          placeholder={t('contact.form.email.placeholder')}
                          required
                          data-testid="input-email"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-konti-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>
                  </div>

                  {/* Phone and Company Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-3 block">
                        {t('contact.form.phone')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl transition-all duration-300 bg-gray-50 hover:bg-white"
                          placeholder={t('contact.form.phone.placeholder')}
                          data-testid="input-phone"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-konti-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>
                    <div className="group">
                      <Label htmlFor="company" className="text-sm font-semibold text-gray-700 mb-3 block">
                        {t('contact.form.company')}
                      </Label>
                      <div className="relative">
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl transition-all duration-300 bg-gray-50 hover:bg-white"
                          placeholder={t('contact.form.company.placeholder')}
                          data-testid="input-company"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-konti-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-3 block">
                      {t('contact.form.message')}
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                        placeholder={t('contact.form.message.placeholder')}
                        required
                        data-testid="input-message"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-konti-blue/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-white text-base font-medium rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      style={{backgroundColor: 'rgb(28, 45, 86)'}}
                      data-testid="submit-form"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                      </span>
                      {/* Button hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Button>
                  </div>
                </form>

                {/* Trust indicators */}
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      {t('contact.trust.secure')}
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      {t('contact.trust.response')}
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                      {t('contact.trust.support')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
