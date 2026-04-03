import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { Building2Icon, Globe, Mail, MapPin, Phone } from "lucide-react";
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
    // { labelKey: "footer.news", path: "/news" },
    { labelKey: "footer.contact", path: "/", isContact: true },
    { labelKey: "footer.privacyPolicy", path: "/privacy-policy" },
    { labelKey: "footer.Impressum", path: "/impressum" },
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
            {/* <h1 className="text-white font-bold" style={{ color: '#fff', lineHeight: '20px', fontSize: '19px' }}>URBAN</h1>
            <h2 className="text-white  font-bold mb-6" style={{ fontWeight: 'normal' }}>ROHR</h2> */}
            <img
              src={logoWhite}
              alt={companyInfo.companyName || "Urban Rohr"}
              className="h-16 w-auto mb-6 ml-[0px] mr-[0px]"
              data-testid="footer-logo"
            />

            <div
              className="text-gray-300 mb-6 max-w-md space-y-4"
              data-testid="footer-description"
            >
              {t("footer.description")
                .split("\n\n")
                .filter((block) => block.trim().length > 0)
                .map((paragraph, i) => (
                  <p key={i}>{paragraph.trim()}</p>
                ))}
            </div>
              {/* <div className="flex space-x-4" data-testid="footer-social">
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
              </div> */}
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
              <div className="flex items-start" data-testid="footer-phone">
                <div className="">
                  <div className="flex items-center gap-2"><Building2Icon className="text-gray-300  mt-1 flex-shrink-0 w-5 h-5" /> Urban Rohr GmbH</div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Karlsdorfer%20Stra%C3%9Fe%2056%2C%2088069%20Tettnang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mt-2 hover:text-white focus:text-white"
                  >
                    <MapPin className="text-gray-300  mt-1 flex-shrink-0 w-5 h-5" /> Karlsdorfer Straße 56,88069, Tettnang
                  </a>
                  <a
                    href="tel:+4975429396210"
                    className="flex items-center gap-2 mt-2 hover:text-white focus:text-white"
                  >
                    <Phone className="text-gray-300  mt-1 flex-shrink-0 w-5 h-5" /> +49 7542 9396210
                  </a>
                  <a
                    href="mailto:info@urban-rohr.com"
                    className="flex items-center gap-2 mt-2 hover:text-white focus:text-white"
                  >
                    <Mail className="text-gray-300  mt-1 flex-shrink-0 w-5 h-5" /> info@urban-rohr.com
                  </a>
                </div>
              </div>
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
