import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, ExternalLink, ChevronRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAnimatedScroll } from "@/hooks/use-smooth-scroll";
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
  items?: DropdownItem[]; // For nested dropdowns
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
      { label: t("nav.products.all"), href: "/products" },
      { label: t("nav.products.waterSupply"), href: "/products/water-supply-systems" },
      {
        label: t("nav.products.sewerage"),
        href: "/products#sewerage",
        items: [
          { label: t("nav.products.hdpeKontiKan"), href: "/konti-kan-pipes-and-fittings" },
          { label: t("nav.products.pphmKontiKan"), href: "/pp-hm-pipes-and-fittings" },
          {
            label: t("nav.products.spiralKontiKan"),
            href: "/konti-kan-spiral-pipes",
          },
          { label: t("nav.products.ppMlCompact"), href: "/pp-hm-smooth-od" },
          { label: t("nav.products.manholes"), href: "/manholes" },
          { label: t("nav.products.drainage"), href: "/konti-kan-drainage" },
        ],
      },
      { label: t("nav.products.gasPipeline"), href: "/products/gas-pipeline-systems" },
      { label: t("nav.products.cableProtection"), href: "/products/cable-protection" },
      // { label: "Full Catalog", href: "https://konti-hidroplast.com.mk/products/", external: true },
    ],
  },
  {
    label: t("nav.downloads"),
    type: "dropdown",
    items: [
      {
        label: t("nav.downloads.brochures"),
        href: "/brochures",
      },
      {
        label: t("nav.downloads.certificates"),
        href: "/certificates",
      },
    ],
  },
  { href: "/news", label: t("nav.news"), type: "link" },
  {
    label: t("nav.contact"),
    type: "dropdown",
    items: [{ label: t("nav.contact.career"), href: "/career" }],
  },
];

export function Navigation() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isHoveringDropdownArea, setIsHoveringDropdownArea] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();
  const { data: companyInfo } = useCompanyInfo();
  const { scrollToContact } = useAnimatedScroll();
  const navigationItems = useNavigationItems(t);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile dropdowns when location changes
  useEffect(() => {
    setMobileDropdowns({});
    setMobileMenuOpen(false);
  }, [location]);

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
      // Internal navigation - scroll to top immediately when changing pages
      window.scrollTo({ top: 0, behavior: "instant" });
      setLocation(href);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDropdownClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      scrollToSection(href);
      // Close mobile menu when navigating
      setMobileMenuOpen(false);
      closeMobileDropdowns();
    }
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const closeMobileDropdowns = () => {
    setMobileDropdowns({});
  };

  const handleDropdownMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(label);
    setIsHoveringDropdownArea(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdownArea(false);
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const handleDropdownAreaMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsHoveringDropdownArea(true);
  };

  const handleDropdownAreaMouseLeave = () => {
    setIsHoveringDropdownArea(false);
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
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
            onClick={() => {
              scrollToSection(item.href);
              setMobileMenuOpen(false);
              closeMobileDropdowns();
            }}
            className={`w-full text-left px-4 py-3 text-base font-medium transition-colors ${
              isActive
                ? "bg-blue-50"
                : "text-konti-gray hover:text-konti-blue"
            }`}
            style={isActive ? { color: "#eb2127" } : {}}
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
          style={isActive ? { color: "#eb2127" } : {}}
          data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {item.label}
        </button>
      );
    }

    if (isMobile) {
      // For mobile dropdown items
      const isDropdownOpen = mobileDropdowns[item.label];
      return (
        <div key={item.label} className="space-y-2">
          <button
            onClick={() => toggleMobileDropdown(item.label)}
            className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-konti-gray border-b border-gray-200 hover:text-konti-blue transition-colors"
            data-testid={`mobile-nav-dropdown-${item.label.toLowerCase()}`}
          >
            {item.label}
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isDropdownOpen && (
            <div className="space-y-1">
              {item.items.map((subItem, index) => {
                if (subItem.items && subItem.items.length > 0) {
                  // Handle nested dropdowns (like Sewerage Systems)
                  const nestedKey = `${item.label}-${subItem.label}`;
                  const isNestedOpen = mobileDropdowns[nestedKey];
                  return (
                    <div key={index} className="space-y-1">
                      <button
                        onClick={() => toggleMobileDropdown(nestedKey)}
                        className="w-full flex items-center justify-between px-6 py-3 text-base text-gray-600 hover:text-konti-blue transition-colors"
                        data-testid={`mobile-nav-nested-${item.label.toLowerCase()}-${subItem.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {subItem.label}
                        <ChevronRight
                          className={`h-4 w-4 transition-transform duration-200 ${isNestedOpen ? "rotate-90" : ""}`}
                        />
                      </button>
                      {isNestedOpen && (
                        <div className="pl-4 space-y-1">
                          {subItem.items.map((nestedItem, nestedIndex) => (
                            <button
                              key={nestedIndex}
                              onClick={() =>
                                handleDropdownClick(nestedItem.href, nestedItem.external)
                              }
                              className="w-full text-left px-8 py-2 text-sm text-gray-600 hover:text-konti-blue transition-colors flex items-center justify-between"
                              data-testid={`mobile-nav-nested-item-${nestedItem.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {nestedItem.label}
                              {nestedItem.external && <ExternalLink className="h-3 w-3" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
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
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const isOpen = openDropdown === item.label;
    
    // Check if any child item is active
    const isParentActive = item.items.some((subItem) => {
      if (subItem.items) {
        return subItem.items.some((nestedItem) => location === nestedItem.href);
      }
      return location === subItem.href;
    });

    return (
      <DropdownMenu
        key={item.label}
        modal={false}
        open={isOpen}
        onOpenChange={() => {
          // Prevent automatic closing
        }}
      >
        <div
          ref={dropdownContainerRef}
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
              style={isParentActive ? { color: "#eb2127" } : {}}
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
            onMouseEnter={handleDropdownAreaMouseEnter}
            onMouseLeave={handleDropdownAreaMouseLeave}
            onInteractOutside={(event) => {
              // Only close if clicking outside, not on hover
              if (event.type === "pointerdown") {
                setOpenDropdown(null);
              } else {
                event.preventDefault();
              }
            }}
            onEscapeKeyDown={(event) => {
              event.preventDefault();
              setOpenDropdown(null);
            }}
          >
            {item.items.map((subItem, index) => {
              if (subItem.items && subItem.items.length > 0) {
                // Nested dropdown for sewerage systems
                return (
                  <DropdownMenuSub key={index}>
                    <DropdownMenuSubTrigger
                      className="nav-dropdown-item cursor-pointer hover:bg-gray-50 flex items-center justify-between text-sm font-medium text-konti-gray hover:text-konti-blue focus:bg-gray-50 focus:text-konti-blue focus:outline-none"
                      onMouseEnter={handleDropdownAreaMouseEnter}
                    >
                      <span>{subItem.label}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent
                      className="w-56 bg-white shadow-lg border-0 z-50"
                      sideOffset={8}
                      onMouseEnter={handleDropdownAreaMouseEnter}
                      onMouseLeave={handleDropdownAreaMouseLeave}
                    >
                      {subItem.items.map((nestedItem, nestedIndex) => {
                        const isNestedActive = location === nestedItem.href;
                        return (
                          <DropdownMenuItem
                            key={nestedIndex}
                            onClick={() =>
                              handleDropdownClick(
                                nestedItem.href,
                                nestedItem.external,
                              )
                            }
                            onMouseEnter={handleDropdownAreaMouseEnter}
                            className="nav-dropdown-item cursor-pointer hover:bg-gray-50 flex items-center justify-between text-sm font-medium hover:text-konti-blue focus:bg-gray-50 focus:text-konti-blue focus:outline-none"
                            style={isNestedActive ? { color: "#eb2127", backgroundColor: "#fef2f2" } : {}}
                            data-testid={`nav-${item.label.toLowerCase()}-${subItem.label.toLowerCase()}-${nestedItem.label.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <span>{nestedItem.label}</span>
                            {nestedItem.external && (
                              <ExternalLink className="h-3 w-3 text-gray-400" />
                            )}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                );
              } else {
                // Regular dropdown item
                const isSubItemActive = location === subItem.href;
                return (
                  <DropdownMenuItem
                    key={index}
                    onClick={() =>
                      handleDropdownClick(subItem.href, subItem.external)
                    }
                    onMouseEnter={handleDropdownAreaMouseEnter}
                    className="nav-dropdown-item cursor-pointer hover:bg-gray-50 flex items-center justify-between text-sm font-medium hover:text-konti-blue focus:bg-gray-50 focus:text-konti-blue focus:outline-none"
                    style={isSubItemActive ? { color: "#eb2127", backgroundColor: "#fef2f2" } : {}}
                    data-testid={`nav-${item.label.toLowerCase()}-${subItem.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span>{subItem.label}</span>
                    {subItem.external && (
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    )}
                  </DropdownMenuItem>
                );
              }
            })}
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
              className="h-14 w-auto nav-logo-enhanced cursor-pointer transition-all duration-300"
              onClick={scrollToTop}
              data-testid="logo"
              style={isScrolled ? { filter: 'brightness(0) saturate(100%) invert(17%) sepia(25%) saturate(1349%) hue-rotate(205deg) brightness(97%) contrast(95%)' } : {}}
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
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
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
                  onClick={() => {
                    setMobileMenuOpen(true);
                    // Close any open dropdowns when opening menu
                    closeMobileDropdowns();
                  }}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-80"
                onOpenAutoFocus={(event) => event.preventDefault()}
                onCloseAutoFocus={(event) => event.preventDefault()}
              >
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <img
                      src={logoScrolled}
                      alt="Urban Rohr"
                      className="h-12 w-auto cursor-pointer"
                      onClick={() => {
                        scrollToTop();
                        setMobileMenuOpen(false);
                        closeMobileDropdowns();
                      }}
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
