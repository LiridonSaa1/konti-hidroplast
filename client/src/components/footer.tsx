import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { MapPin, Phone } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { label: "About Us", href: "https://konti-hidroplast.com.mk/about-us/" },
    { label: "Products", href: "https://konti-hidroplast.com.mk/products/" },
    { label: "News", href: "https://konti-hidroplast.com.mk/news/" },
    { label: "Contact", href: "https://konti-hidroplast.com.mk/contacts/" },
    { label: "Privacy Policy", href: "https://konti-hidroplast.com.mk/privacy-policy/" },
  ];

  return (
    <footer className="bg-konti-gray text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <img
              src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/08/Konti-Hirdpolast-white.png"
              alt="Konti Hidroplast"
              className="h-12 w-auto mb-6"
              data-testid="footer-logo"
            />
            <p className="text-gray-300 mb-6 max-w-md" data-testid="footer-description">
              Export-oriented Macedonian company for production of PE and PP pipes. Founded in 1975, we are committed to delivering unmatched European standards for pipeline precision.
            </p>
            <div className="flex space-x-4" data-testid="footer-social">
              <a
                href="https://www.linkedin.com/company/konti-hidroplast/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="footer-linkedin"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://www.facebook.com/kontihidroplastofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="footer-facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com/kontihidroplast/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="footer-instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6" data-testid="footer-links-title">
              Quick Links
            </h4>
            <ul className="space-y-3" data-testid="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    data-testid={`footer-link-${index}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6" data-testid="footer-contact-title">
              Contact Info
            </h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start" data-testid="footer-address">
                <MapPin className="text-konti-blue-light mr-3 mt-1 flex-shrink-0" />
                <span>Industriska 5, 1480 Gevgelija, North Macedonia</span>
              </div>
              <div className="flex items-start" data-testid="footer-phone">
                <Phone className="text-konti-blue-light mr-3 mt-1 flex-shrink-0" />
                <div>
                  <div>+389 34 215 225</div>
                  <div>+389 34 212 064</div>
                  <div>+389 34 212 226</div>
                  <div>+389 34 211 964</div>
                  <div>+389 34 211 757</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p data-testid="footer-copyright">
            &copy; 2024 Konti Hidroplast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
