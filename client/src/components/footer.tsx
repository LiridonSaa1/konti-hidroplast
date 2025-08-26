import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { MapPin, Phone } from "lucide-react";
import logoWhite from "@assets/urban-rohr-logo-white.svg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { useLocation } from "wouter";

interface QuickLink {
  labelKey: string;
  path: string;
  isContact?: boolean;
}

export function Footer() {
  const { t } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const [, setLocation] = useLocation();
  
  const quickLinks: QuickLink[] = [
    { labelKey: "footer.aboutUs", path: "/about-us" },
    { labelKey: "footer.products", path: "/products" },
    { labelKey: "footer.news", path: "/news" },
    { labelKey: "footer.contact", path: "/", isContact: true },
    { labelKey: "footer.privacyPolicy", path: "/privacy-policy" },
  ];

  const handleNavigation = (path: string, isContact: boolean = false) => {
    console.log('Footer navigation clicked:', { path, isContact });
    if (isContact) {
      // Set the flag to scroll to contact section on home page
      console.log('Setting scrollToContact flag in sessionStorage');
      sessionStorage.setItem('scrollToContact', 'true');
      
      // If we're already on the home page, trigger the scroll immediately
      if (window.location.pathname === '/') {
        console.log('Already on home page, triggering scroll immediately');
        // Use a small delay to ensure the flag is set
        setTimeout(() => {
          const event = new CustomEvent('scrollToContact');
          window.dispatchEvent(event);
        }, 100);
        return;
      }
    }
    console.log('Navigating to:', path);
    setLocation(path);
  };

  return (
    <footer
      className="text-white py-16"
      style={{ backgroundColor: "#1c2d56" }}
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <img
              src={logoWhite}
              alt={companyInfo.companyName || "Urban Rohr"}
              className="h-16 w-auto mb-6 ml-[0px] mr-[0px]"
              data-testid="footer-logo"
            />
            <p
              className="text-gray-300 mb-6 max-w-md"
              data-testid="footer-description"
            >
              {companyInfo.description || t('footer.description')}
            </p>
            <div className="flex space-x-4" data-testid="footer-social">
              {companyInfo.socialLinkedIn && (
                <a
                  href={companyInfo.socialLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-linkedin"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              )}
              {companyInfo.socialFacebook && (
                <a
                  href={companyInfo.socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-facebook"
                >
                  <FaFacebook className="text-xl" />
                </a>
              )}
              {companyInfo.socialInstagram && (
                <a
                  href={companyInfo.socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-instagram"
                >
                  <FaInstagram className="text-xl" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-lg font-semibold mb-6"
              data-testid="footer-links-title"
            >
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3" data-testid="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.path, link.isContact);
                    }}
                    className="text-gray-300 hover:text-white transition-colors"
                    data-testid={`footer-link-${index}`}
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
            {/* Debug button */}
            {/* <button
              onClick={() => {
                console.log('Debug button clicked');
                sessionStorage.setItem('scrollToContact', 'true');
                console.log('sessionStorage scrollToContact set to:', sessionStorage.getItem('scrollToContact'));
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded text-sm"
            >
              Debug: Set Scroll Flag
            </button> */}
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-lg font-semibold mb-6"
              data-testid="footer-contact-title"
            >
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-4 text-gray-300">
              {companyInfo.address && (
                <div className="flex items-start" data-testid="footer-address">
                  <MapPin className="text-gray-300 mr-3 mt-1 flex-shrink-0" />
                  <span>{companyInfo.address}</span>
                </div>
              )}
              {companyInfo.phones.length > 0 && (
                <div className="flex items-start" data-testid="footer-phone">
                  <Phone className="text-gray-300 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    {companyInfo.phones.map((phone, index) => (
                      <div key={index}>{phone}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p data-testid="footer-copyright">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
