import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useState } from "react";
import { MapPin, Phone, Share2, ExternalLink } from "lucide-react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function ContactSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneNumbers = [
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
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
      className="py-20 bg-white"
      data-testid="contact-section"
    >
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
            Get in Touch: Connect with Us Today!
          </h2>
          <p
            className="text-xl text-gray-600"
            data-testid="contact-subtitle"
          >
            Ready to discuss your pipeline needs? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card
            className={`${
              hasIntersected ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            <CardContent className="p-8 bg-konti-gray-light rounded-xl">
              <h3
                className="text-2xl font-semibold text-konti-gray mb-6"
                data-testid="contact-form-title"
              >
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full"
                    required
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2">
                    Company
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="w-full"
                    data-testid="input-company"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={4}
                    className="w-full resize-none"
                    required
                    data-testid="input-message"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full konti-gradient text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  data-testid="submit-form"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div
            className={`${
              hasIntersected ? "animate-slide-up" : "opacity-0"
            }`}
            style={{ animationDelay: "400ms" }}
          >
            <h3
              className="text-2xl font-semibold text-konti-gray mb-8"
              data-testid="contact-info-title"
            >
              Contact Information
            </h3>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start" data-testid="contact-address">
                <div className="w-12 h-12 konti-gradient rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-konti-gray mb-1">Address</h4>
                  <p className="text-gray-600">
                    Industriska 5, 1480 Gevgelija,
                    <br />
                    North Macedonia
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start" data-testid="contact-phones">
                <div className="w-12 h-12 konti-gradient rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-konti-gray mb-1">Phone Numbers</h4>
                  <div className="space-y-1 text-gray-600">
                    {phoneNumbers.map((phone, index) => (
                      <p key={index}>{phone}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-start" data-testid="contact-social">
                <div className="w-12 h-12 konti-gradient rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Share2 className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-konti-gray mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/company/konti-hidroplast/about/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-konti-blue hover:text-blue-700 transition-colors"
                      data-testid="contact-linkedin"
                    >
                      <FaLinkedin className="text-2xl" />
                    </a>
                    <a
                      href="https://www.facebook.com/kontihidroplastofficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-konti-blue hover:text-blue-700 transition-colors"
                      data-testid="contact-facebook"
                    >
                      <FaFacebook className="text-2xl" />
                    </a>
                    <a
                      href="https://www.instagram.com/kontihidroplast/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-konti-blue hover:text-blue-700 transition-colors"
                      data-testid="contact-instagram"
                    >
                      <FaInstagram className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                asChild
                className="konti-gradient text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                data-testid="visit-contact-page"
              >
                <a
                  href="https://konti-hidroplast.com.mk/contacts/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Full Contact Page
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
