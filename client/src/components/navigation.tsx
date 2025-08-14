import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/language-switcher";
import logoScrolled from "@assets/urban-rohr-logo.svg";
import logoDefault from "@assets/urban-rohr-logo-white.svg";

interface NavigationLink {
  href: string;
  label: string;
  type: "link";
}

interface DropdownItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavigationDropdown {
  label: string;
  type: "dropdown";
  items: DropdownItem[];
}

type NavigationItem = NavigationLink | NavigationDropdown;

const useNavigationItems = (t: (key: string) => string): NavigationItem[] => [
  { href: "/", label: t("nav.home"), type: "link" },
  { href: "/about-us", label: t("nav.about"), type: "link" },
  {
    label: t("nav.products"),
    type: "dropdown",
    items: [
      { label: "All Products", href: "/products" },
      { label: "Water Supply Systems", href: "/products#water-supply" },
      { label: "Sewerage Systems", href: "/products#sewerage" },
      { label: "Gas Pipeline System", href: "/products#gas-pipeline" },
      { label: "Cable Protection", href: "/products#cable-protection" },
      { label: "Full Catalog", href: "https://konti-hidroplast.com.mk/products/", external: true },
    ],
  },
  {
    label: t("nav.downloads"),
    type: "dropdown",
    items: [
      {
        label: t("nav.brochures"),
        href: "https://konti-hidroplast.com.mk/products/",
        external: true,
      },
      {
        label: t("nav.technical"),
        href: "https://konti-hidroplast.com.mk/products/",
        external: true,
      },
      {
        label: "Installation Guides",
        href: "https://konti-hidroplast.com.mk/products/",
        external: true,
      },
      {
        label: t("nav.certifications"),
        href: "https://konti-hidroplast.com.mk/products/",
        external: true,
      },
    ],
  },
  { href: "#news", label: t("nav.news"), type: "link" },
  {
    label: t("nav.contact"),
    type: "dropdown",
    items: [
      { label: "Contact Form", href: "#contact" },
      { label: "Office Locations", href: "#contact" },
      { label: "Phone Numbers", href: "#contact" },
      {
        label: "Full Contact Page",
        href: "https://konti-hidroplast.com.mk/contacts/",
        external: true,
      },
    ],
  },
];

export function Navigation() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { t } = useLanguage();
  const navigationItems = useNavigationItems(t);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSectionChange = () => {
      const linkItems = navigationItems.filter(
        (item): item is NavigationLink => item.type === "link",
      );
      const sections = linkItems
        .filter((item) => item.href.startsWith("#"))
        .map((item) => item.href.slice(1));

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleSectionChange);
    return () => window.removeEventListener("scroll", handleSectionChange);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (href.startsWith("/")) {
      // Internal navigation
      setLocation(href);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const handleDropdownClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      scrollToSection(href);
    }
  };

  const handleDropdownMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(label);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); // Small delay to allow moving to the dropdown content
  };

  const renderNavigationItem = (
    item: NavigationItem,
    isMobile: boolean = false,
  ) => {
    if (item.type === "link") {
      // Check if this navigation item is active based on current URL
      const isActive = location === item.href;

      if (isMobile) {
        return (
          <button
            key={item.href}
            onClick={() => scrollToSection(item.href)}
            className={`w-full text-left px-4 py-3 text-base font-medium transition-colors ${
              isActive
                ? "text-konti-blue bg-blue-50"
                : "text-konti-gray hover:text-konti-blue"
            }`}
            data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {item.label}
          </button>
        );
      }

      return (
        <button
          key={item.href}
          onClick={() => scrollToSection(item.href)}
          className={`px-4 py-3 font-medium transition-all duration-300 text-[15px] ${
            isActive
              ? isScrolled
                ? "font-bold"
                : "text-white font-bold nav-text-shadow"
              : isScrolled
                ? "text-black hover:text-konti-blue"
                : "text-white/90 hover:text-white nav-text-shadow"
          }`}
          style={isActive && isScrolled ? { color: "rgb(235, 33, 39)" } : {}}
          data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {item.label}
        </button>
      );
    }

    if (isMobile) {
      // For mobile dropdown items
      return (
        <div key={item.label} className="space-y-2">
          <div className="px-4 py-3 text-base font-medium text-konti-gray border-b border-gray-200">
            {item.label}
          </div>
          {item.items.map((subItem, index) => (
            <button
              key={index}
              onClick={() =>
                handleDropdownClick(subItem.href, subItem.external)
              }
              className="w-full text-left px-6 py-3 text-base text-gray-600 hover:text-konti-blue transition-colors flex items-center justify-between"
              data-testid={`mobile-nav-${item.label.toLowerCase()}-${subItem.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {subItem.label}
              {subItem.external && <ExternalLink className="h-4 w-4" />}
            </button>
          ))}
        </div>
      );
    }

    const isOpen = openDropdown === item.label;

    return (
      <DropdownMenu
        key={item.label}
        modal={false}
        open={isOpen}
        onOpenChange={() => {}}
      >
        <div
          onMouseEnter={() => handleDropdownMouseEnter(item.label)}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <DropdownMenuTrigger asChild>
            <button
              className={`px-4 py-3 font-medium transition-all duration-300 flex items-center gap-1 focus:outline-none focus-visible:outline-none text-[15px] ${
                isScrolled
                  ? `text-black hover:text-konti-blue ${isOpen ? "text-konti-blue" : ""}`
                  : `text-white/90 hover:text-white nav-text-shadow ${isOpen ? "text-white" : ""}`
              }`}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              {item.label}
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="nav-dropdown w-56 bg-white shadow-lg border-0 z-50"
            sideOffset={8}
            onCloseAutoFocus={(event) => event.preventDefault()}
            onMouseEnter={() => handleDropdownMouseEnter(item.label)}
            onMouseLeave={handleDropdownMouseLeave}
          >
            {item.items.map((subItem, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() =>
                  handleDropdownClick(subItem.href, subItem.external)
                }
                className="nav-dropdown-item cursor-pointer hover:bg-gray-50 flex items-center justify-between text-sm font-medium text-konti-gray hover:text-konti-blue focus:bg-gray-50 focus:text-konti-blue focus:outline-none"
                data-testid={`nav-${item.label.toLowerCase()}-${subItem.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span>{subItem.label}</span>
                {subItem.external && (
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20"
          : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src={isScrolled ? logoScrolled : logoDefault}
              alt="Urban Rohr"
              className="h-16 w-auto nav-logo-enhanced cursor-pointer transition-all duration-300"
              onClick={() => scrollToSection("/")}
              data-testid="logo"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-12 flex items-center space-x-8">
              <div className="flex items-baseline space-x-8">
                {navigationItems.map((item) => renderNavigationItem(item))}
              </div>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-black hover:text-konti-blue"
                      : "text-white hover:text-white/80"
                  }`}
                  data-testid="mobile-menu-trigger"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <img
                      src={logoScrolled}
                      alt="Urban Rohr"
                      className="h-14 w-auto"
                    />
                    <LanguageSwitcher />
                  </div>
                  {navigationItems.map((item) =>
                    renderNavigationItem(item, true),
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
