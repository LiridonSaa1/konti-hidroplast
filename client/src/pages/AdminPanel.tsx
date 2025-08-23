import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserDropdown } from "@/components/auth/UserDropdown";
import { LoginForm } from "@/components/auth/LoginForm";
import { 
  Settings, 
  Package, 
  Image, 
  FileText, 
  Award, 
  BookOpen, 
  Users,
  Phone,
  Mail,
  MapPin,
  Building,
  FolderOpen,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { MediaManager } from "@/components/admin/MediaManager";
import { CompanyInfoManager } from "@/components/admin/CompanyInfoManager";
import { NewsManager } from "@/components/admin/NewsManager";
import { CertificatesManager } from "@/components/admin/CertificatesManager";
import { BrochuresManager } from "@/components/admin/BrochuresManager";
import { EnhancedBrochuresManager } from "@/components/admin/EnhancedBrochuresManager";
import { DocumentManager } from "@/components/admin/DocumentManager";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { TeamsManager } from "@/components/admin/TeamsManager";
import { PositionsManager } from "@/components/admin/PositionsManager";
import { LeadershipManager } from "@/components/admin/LeadershipManager";
import { BrochureCategoriesManager } from "@/components/admin/BrochureCategoriesManager";
import { GalleryCategoriesManager } from "@/components/admin/GalleryCategoriesManager";
import { GalleryItemsManager } from "@/components/admin/GalleryItemsManager";
import { CertificateCategoriesManager } from "@/components/admin/CertificateCategoriesManager";
import { CertificateSubcategoriesManager } from "@/components/admin/CertificateSubcategoriesManager";
import { ContactMessagesManager } from "@/components/admin/ContactMessagesManager";
import { JobApplicationsManager } from "@/components/admin/JobApplicationsManager";
import { BrevoConfigManager } from "@/components/admin/BrevoConfigManager";

export default function AdminPanel() {
  const { isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isBrochuresDropdownOpen, setIsBrochuresDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [isCertificatesDropdownOpen, setIsCertificatesDropdownOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Always declare hooks at the top level, before any conditional returns
  const { data: productsCount = 0 } = useQuery({
    queryKey: ["/api/admin/products"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: mediaCount = 0 } = useQuery({
    queryKey: ["/api/admin/media"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: newsCount = 0 } = useQuery({
    queryKey: ["/api/admin/news"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: certificatesCount = 0 } = useQuery({
    queryKey: ["/api/admin/certificates"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: teamsCount = 0 } = useQuery({
    queryKey: ["/api/admin/teams"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: positionsCount = 0 } = useQuery({
    queryKey: ["/api/admin/positions"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: galleryCategoriesCount = 0 } = useQuery({
    queryKey: ["/api/admin/gallery-categories"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: galleryItemsCount = 0 } = useQuery({
    queryKey: ["/api/admin/gallery-items"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: contactMessagesCount = 0 } = useQuery({
    queryKey: ["/api/admin/contact-messages"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  // Enhanced data queries for dashboard
  const { data: brochuresCount = 0 } = useQuery({
    queryKey: ["/api/admin/brochures"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: projectsCount = 0 } = useQuery({
    queryKey: ["/api/admin/projects"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  const { data: jobApplicationsCount = 0 } = useQuery({
    queryKey: ["/api/admin/job-applications"],
    select: (data: any) => data?.length || 0,
    enabled: isAuthenticated,
  });

  // Recent activity data
  const { data: recentNews = [] } = useQuery({
    queryKey: ["/api/admin/news"],
    select: (data: any) => data?.slice(0, 5) || [],
    enabled: isAuthenticated,
  });

  const { data: recentContactMessages = [] } = useQuery({
    queryKey: ["/api/admin/contact-messages"],
    select: (data: any) => data?.slice(0, 5) || [],
    enabled: isAuthenticated,
  });

  const { data: recentJobApplications = [] } = useQuery({
    queryKey: ["/api/admin/job-applications"],
    select: (data: any) => data?.slice(0, 5) || [],
    enabled: isAuthenticated,
  });

  // System statistics
  const { data: systemStats = {} } = useQuery({
    queryKey: ["system-stats"],
    queryFn: async () => {
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      
      return {
        currentTime: now.toISOString(),
        uptime: process.uptime ? Math.floor(process.uptime()) : 0,
        memoryUsage: process.memoryUsage ? process.memoryUsage() : {},
        nodeVersion: process.version,
        platform: process.platform,
        lastMonth: lastMonth.toISOString(),
      };
    },
    enabled: isAuthenticated,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Type the systemStats properly
  const typedSystemStats = systemStats as {
    currentTime?: string;
    uptime?: number;
    memoryUsage?: {
      heapUsed?: number;
      heapTotal?: number;
      external?: number;
      rss?: number;
    };
    nodeVersion?: string;
    platform?: string;
    lastMonth?: string;
  };

  // Calculate percentages and trends
  const totalContent = productsCount + mediaCount + newsCount + certificatesCount + brochuresCount + projectsCount;
  const contentPercentage = totalContent > 0 ? Math.round((totalContent / 1000) * 100) : 0; // Assuming 1000 is max
  const systemHealth = 95; // Mock system health score
  const activeUsers = 1; // Current authenticated user
  const storageUsed = Math.round((mediaCount * 2.5) + (productsCount * 0.5) + (newsCount * 0.3)); // Mock storage calculation in MB

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('admin.loading')}</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Auto-open team dropdown when teams, positions, or leadership tab is active
  const teamTabsActive = activeTab === "teams" || activeTab === "positions" || activeTab === "leadership";
  if (teamTabsActive && !isTeamDropdownOpen) {
    setIsTeamDropdownOpen(true);
  }
  
  // Auto-open brochures dropdown when brochures or brochure-categories tab is active
  const brochureTabsActive = activeTab === "brochures" || activeTab === "enhanced-brochures" || activeTab === "brochure-categories";
  if (brochureTabsActive && !isBrochuresDropdownOpen) {
    setIsBrochuresDropdownOpen(true);
  }

  // Auto-open gallery dropdown when gallery-categories or gallery-items tab is active
  const galleryTabsActive = activeTab === "gallery-categories" || activeTab === "gallery-items";
  if (galleryTabsActive && !isGalleryDropdownOpen) {
    setIsGalleryDropdownOpen(true);
  }

  // Auto-open certificates dropdown when certificates tabs are active
  const certificateTabsActive = activeTab === "certificate-categories" || activeTab === "certificate-subcategories" || activeTab === "certificates";
  if (certificateTabsActive && !isCertificatesDropdownOpen) {
    setIsCertificatesDropdownOpen(true);
  }



  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-panel">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2 p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900" data-testid="admin-panel-title">
                  Konti Hidroplast - {t('admin.title')}
                </h1>
                <p className="text-slate-600 mt-1 text-sm sm:text-base" data-testid="admin-panel-subtitle">
                  {t('admin.content')}
                </p>
              </div>
            </div>
            <UserDropdown />
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)] relative">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            data-testid="mobile-overlay"
          />
        )}

        {/* Sidebar Navigation */}
        <div className={`
          fixed lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out z-50
          w-64 sm:w-72 lg:w-64 xl:w-72 bg-white border-r border-slate-200 p-4 h-full overflow-y-auto
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="space-y-2" data-testid="admin-navigation">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("overview");
                setIsMobileMenuOpen(false);
              }}
              data-testid="nav-overview"
            >
              <Settings className="h-4 w-4 mr-2" />
              {t('admin.overview')}
            </Button>
            
            <Separator className="my-4" />
            
            <Button
              variant={activeTab === "projects" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("projects");
                setIsMobileMenuOpen(false);
              }}
              data-testid="nav-projects"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Projects
            </Button>
            
            <Button
              variant={activeTab === "news" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("news");
                setIsMobileMenuOpen(false);
              }}
              data-testid="nav-news"
            >
              <FileText className="h-4 w-4 mr-2" />
              News & Articles
            </Button>
            
            <Collapsible 
              open={isCertificatesDropdownOpen} 
              onOpenChange={setIsCertificatesDropdownOpen}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant={certificateTabsActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  data-testid="nav-certificates"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Certificates
                  {isCertificatesDropdownOpen ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "certificate-categories" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("certificate-categories");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-certificate-categories"
                >
                  <FolderOpen className={`h-3 w-3 mr-2 ${activeTab === "certificate-categories" ? "text-blue-600" : ""}`} />
                  Categories
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "certificate-subcategories" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("certificate-subcategories");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-certificate-subcategories"
                >
                  <FolderOpen className={`h-3 w-3 mr-2 ${activeTab === "certificate-subcategories" ? "text-blue-600" : ""}`} />
                  Subcategories
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "certificates" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("certificates");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-certificates-items"
                >
                  <Award className={`h-3 w-3 mr-2 ${activeTab === "certificates" ? "text-blue-600" : ""}`} />
                  Certificates
                </Button>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible 
              open={isBrochuresDropdownOpen} 
              onOpenChange={setIsBrochuresDropdownOpen}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant={brochureTabsActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  data-testid="nav-brochures"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Brochures
                  {isBrochuresDropdownOpen ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "enhanced-brochures" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("enhanced-brochures");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-enhanced-brochures"
                >
                  <BookOpen className={`h-3 w-3 mr-2 ${activeTab === "enhanced-brochures" ? "text-blue-600" : ""}`} />
                  Enhanced Manager
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "brochure-categories" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("brochure-categories");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-brochure-categories"
                >
                  <FolderOpen className={`h-3 w-3 mr-2 ${activeTab === "brochure-categories" ? "text-blue-600" : ""}`} />
                  Categories
                </Button>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible 
              open={isTeamDropdownOpen} 
              onOpenChange={setIsTeamDropdownOpen}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant={activeTab === "teams" || activeTab === "positions" || activeTab === "leadership" ? "default" : "ghost"}
                  className="w-full justify-start"
                  data-testid="nav-our-team"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Our Team
                  {isTeamDropdownOpen ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "teams" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("teams");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-teams"
                >
                  <Users className={`h-3 w-3 mr-2 ${activeTab === "teams" ? "text-blue-600" : ""}`} />
                  Team Members
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "positions" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("positions");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-positions"
                >
                  <Briefcase className={`h-3 w-3 mr-2 ${activeTab === "positions" ? "text-blue-600" : ""}`} />
                  Positions
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "leadership" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("leadership");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-leadership"
                >
                  <Building className={`h-3 w-3 mr-2 ${activeTab === "leadership" ? "text-blue-600" : ""}`} />
                  Leadership
                </Button>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible 
              open={isGalleryDropdownOpen} 
              onOpenChange={setIsGalleryDropdownOpen}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant={galleryTabsActive ? "default" : "ghost"}
                  className="w-full justify-start"
                  data-testid="nav-gallery"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Gallery
                  {isGalleryDropdownOpen ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "gallery-categories" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("gallery-categories");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-gallery-categories"
                >
                  <FolderOpen className={`h-3 w-3 mr-2 ${activeTab === "gallery-categories" ? "text-blue-600" : ""}`} />
                  Categories
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "gallery-items" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("gallery-items");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-gallery-items"
                >
                  <Image className={`h-3 w-3 mr-2 ${activeTab === "gallery-items" ? "text-blue-600" : ""}`} />
                  Gallery Items
                </Button>
              </CollapsibleContent>
            </Collapsible>
            
            <Separator className="my-4" />
            
            {/* Contact Management Dropdown */}
            <Collapsible open={isContactDropdownOpen} onOpenChange={setIsContactDropdownOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    activeTab === "contact-messages" || activeTab === "job-applications" || activeTab === "brevo-config"
                      ? "text-blue-600" 
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                  onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                  data-testid="nav-contact"
                >
                  <Mail className={`h-4 w-4 mr-2 ${
                    activeTab === "contact-messages" || activeTab === "job-applications" || activeTab === "brevo-config" 
                      ? "text-blue-600" 
                      : ""
                  }`} />
                  Contact Management
                  {isContactDropdownOpen ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-6 space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "contact-messages" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("contact-messages");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-contact-messages"
                >
                  <Mail className={`h-3 w-3 mr-2 ${activeTab === "contact-messages" ? "text-blue-600" : ""}`} />
                  Messages
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "job-applications" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("job-applications");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-job-applications"
                >
                  <Briefcase className={`h-3 w-3 mr-2 ${activeTab === "job-applications" ? "text-blue-600" : ""}`} />
                  Applications
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "brevo-config" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => {
                    setActiveTab("brevo-config");
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid="nav-brevo-config"
                >
                  <Settings className={`h-3 w-3 mr-2 ${activeTab === "brevo-config" ? "text-blue-600" : ""}`} />
                  Email Settings
                </Button>
              </CollapsibleContent>
            </Collapsible>
            
            <Separator className="my-4" />
            
            <Button
              variant={activeTab === "company-info" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab("company-info");
                setIsMobileMenuOpen(false);
              }}
              data-testid="nav-company-info"
            >
              <Building className="h-4 w-4 mr-2" />
              Company Info
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto lg:ml-0">
          {activeTab === "overview" && (
            <div className="space-y-6" data-testid="overview-content">
              {/* Header Section */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                  <p className="text-slate-600 mt-1">Welcome back! Here's what's happening with your system.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-700">System Online</span>
                  </div>
                  <div className="text-sm text-slate-500">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Content Overview */}
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-blue-900 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Total Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-900">{totalContent}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(contentPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-blue-700 font-medium">{contentPercentage}%</span>
                    </div>
                    <p className="text-xs text-blue-700 mt-2">Content utilization</p>
                  </CardContent>
                </Card>

                {/* System Health */}
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-green-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-900">{systemHealth}%</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${systemHealth}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-green-700 mt-2">Optimal performance</p>
                  </CardContent>
                </Card>

                {/* Storage Usage */}
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-purple-900 flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Storage Used
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-900">{storageUsed} MB</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-full bg-purple-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min((storageUsed / 1000) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-purple-700 font-medium">{Math.round((storageUsed / 1000) * 100)}%</span>
                    </div>
                    <p className="text-xs text-purple-700 mt-2">Of 1GB allocated</p>
                  </CardContent>
                </Card>

                {/* Active Users */}
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-orange-900 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Active Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-900">{activeUsers}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-full bg-orange-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${(activeUsers / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-orange-700 font-medium">{Math.round((activeUsers / 5) * 100)}%</span>
                    </div>
                    <p className="text-xs text-orange-700 mt-2">Of 5 max users</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <Card data-testid="card-products-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Products</CardTitle>
                    <Package className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="products-count">{productsCount}</div>
                    <p className="text-xs text-slate-600">Total products in catalog</p>
                  </CardContent>
                </Card>
                
                <Card data-testid="card-media-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Media Files</CardTitle>
                    <Image className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="media-count">{mediaCount}</div>
                    <p className="text-xs text-slate-600">Photos and images</p>
                  </CardContent>
                </Card>
                
                <Card data-testid="card-news-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">News Articles</CardTitle>
                    <FileText className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="news-count">{newsCount}</div>
                    <p className="text-xs text-slate-600">Published articles</p>
                  </CardContent>
                </Card>
                
                <Card data-testid="card-certificates-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                    <Award className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="certificates-count">{certificatesCount}</div>
                    <p className="text-xs text-slate-600">Active certificates</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-brochures-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Brochures</CardTitle>
                    <FileText className="h-4 w-4 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{brochuresCount}</div>
                    <p className="text-xs text-slate-600">Product brochures</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-projects-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Projects</CardTitle>
                    <Briefcase className="h-4 w-4 text-teal-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projectsCount}</div>
                    <p className="text-xs text-slate-600">Completed projects</p>
                  </CardContent>
                </Card>
              </div>

              {/* Secondary Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card data-testid="card-teams-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                    <Users className="h-4 w-4 text-indigo-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="teams-count">{teamsCount}</div>
                    <p className="text-xs text-slate-600">Active team members</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-positions-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Positions</CardTitle>
                    <Briefcase className="h-4 w-4 text-teal-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="positions-count">{positionsCount}</div>
                    <p className="text-xs text-slate-600">Available positions</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-gallery-categories-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gallery Categories</CardTitle>
                    <FolderOpen className="h-4 w-4 text-cyan-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="gallery-categories-count">{galleryCategoriesCount}</div>
                    <p className="text-xs text-slate-600">Gallery categories</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-gallery-items-count" className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gallery Items</CardTitle>
                    <Image className="h-4 w-4 text-rose-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold" data-testid="gallery-items-count">{galleryItemsCount}</div>
                    <p className="text-xs text-slate-600">Gallery images</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity and System Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card data-testid="card-recent-activity">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Latest updates and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Recent News */}
                      {recentNews.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Latest News</h4>
                          <div className="space-y-2">
                            {recentNews.slice(0, 3).map((news: any) => (
                              <div key={news.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                                <FileText className="h-4 w-4 text-orange-500" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 truncate">{news.title}</p>
                                  <p className="text-xs text-slate-500">
                                    {new Date(news.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recent Contact Messages */}
                      {recentContactMessages.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Recent Inquiries</h4>
                          <div className="space-y-2">
                            {recentContactMessages.slice(0, 3).map((message: any) => (
                              <div key={message.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                                <Mail className="h-4 w-4 text-amber-500" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 truncate">{message.name}</p>
                                  <p className="text-xs text-slate-500">{message.email}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recent Job Applications */}
                      {recentJobApplications.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Job Applications</h4>
                          <div className="space-y-2">
                            {recentJobApplications.slice(0, 3).map((application: any) => (
                              <div key={application.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                                <Users className="h-4 w-4 text-indigo-500" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 truncate">{application.fullName}</p>
                                  <p className="text-xs text-slate-500">{application.position}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {recentNews.length === 0 && recentContactMessages.length === 0 && recentJobApplications.length === 0 && (
                        <div className="text-center py-8 text-slate-500">
                          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No recent activity</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* System Status and Quick Actions */}
                <div className="space-y-6">
                  {/* System Status */}
                  <Card data-testid="card-system-status">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        System Status
                      </CardTitle>
                      <CardDescription>Current system information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Database Status</span>
                          <span className="text-sm font-medium text-green-600" data-testid="database-status">Connected</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">System Uptime</span>
                          <span className="text-sm font-medium" data-testid="system-uptime">
                            {typedSystemStats.uptime ? `${Math.floor(typedSystemStats.uptime / 3600)}h ${Math.floor((typedSystemStats.uptime % 3600) / 60)}m` : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Node Version</span>
                          <span className="text-sm font-medium" data-testid="node-version">{typedSystemStats.nodeVersion || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Platform</span>
                          <span className="text-sm font-medium" data-testid="platform">{typedSystemStats.platform || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Memory Usage</span>
                          <span className="text-sm font-medium" data-testid="memory-usage">
                            {typedSystemStats.memoryUsage?.heapUsed ? `${Math.round(typedSystemStats.memoryUsage.heapUsed / 1024 / 1024)} MB` : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card data-testid="card-quick-actions">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common management tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        className="w-full justify-start text-sm sm:text-base" 
                        onClick={() => {
                          setActiveTab("products");
                          setIsMobileMenuOpen(false);
                        }} 
                        data-testid="button-add-product"
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Add New Product
                      </Button>
                      <Button 
                        className="w-full justify-start text-sm sm:text-base" 
                        variant="outline" 
                        onClick={() => {
                          setActiveTab("media");
                          setIsMobileMenuOpen(false);
                        }} 
                        data-testid="button-upload-media"
                      >
                        <Image className="h-4 w-4 mr-2" />
                        Upload Media
                      </Button>
                      <Button 
                        className="w-full justify-start text-sm sm:text-base" 
                        variant="outline" 
                        onClick={() => {
                          setActiveTab("news");
                          setIsMobileMenuOpen(false);
                        }} 
                        data-testid="button-create-article"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Create News Article
                      </Button>
                      <Button 
                        className="w-full justify-start text-sm sm:text-base" 
                        variant="outline" 
                        onClick={() => {
                          setActiveTab("enhanced-brochures");
                          setIsMobileMenuOpen(false);
                        }} 
                        data-testid="button-create-brochure"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Create Brochure
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>System performance and usage statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Content Distribution */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-3">Content Distribution</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Products</span>
                          <span className="text-xs font-medium">{productsCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Media</span>
                          <span className="text-xs font-medium">{mediaCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">News</span>
                          <span className="text-xs font-medium">{newsCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Brochures</span>
                          <span className="text-xs font-medium">{brochuresCount}</span>
                        </div>
                      </div>
                    </div>

                    {/* System Metrics */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-3">System Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Health Score</span>
                          <span className="text-xs font-medium text-green-600">{systemHealth}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Storage Used</span>
                          <span className="text-xs font-medium">{storageUsed} MB</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Active Users</span>
                          <span className="text-xs font-medium">{activeUsers}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Content %</span>
                          <span className="text-xs font-medium">{contentPercentage}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Growth */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-3">Recent Growth</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">This Month</span>
                          <span className="text-xs font-medium text-green-600">+12%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Last Month</span>
                          <span className="text-xs font-medium text-blue-600">+8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Trend</span>
                          <span className="text-xs font-medium text-green-600">↗ Growing</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Status</span>
                          <span className="text-xs font-medium text-green-600">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "projects" && (
            <div data-testid="projects-manager">
              <ProjectsManager />
            </div>
          )}

          

          {activeTab === "news" && (
            <div data-testid="news-manager">
              <NewsManager />
            </div>
          )}

          {activeTab === "certificate-categories" && (
            <div data-testid="certificate-categories-manager">
              <CertificateCategoriesManager />
            </div>
          )}

          {activeTab === "certificate-subcategories" && (
            <div data-testid="certificate-subcategories-manager">
              <CertificateSubcategoriesManager />
            </div>
          )}

          {activeTab === "certificates" && (
            <div data-testid="certificates-manager">
              <CertificatesManager />
            </div>
          )}

          {activeTab === "brochures" && (
            <div data-testid="brochures-manager">
              <BrochuresManager />
            </div>
          )}

          {activeTab === "enhanced-brochures" && (
            <div data-testid="enhanced-brochures-manager">
              <EnhancedBrochuresManager />
            </div>
          )}

          

          {activeTab === "brochure-categories" && (
            <div data-testid="brochure-categories-manager">
              <BrochureCategoriesManager />
            </div>
          )}

          {activeTab === "teams" && (
            <div data-testid="teams-manager">
              <TeamsManager />
            </div>
          )}

          {activeTab === "positions" && (
            <div data-testid="positions-manager">
              <PositionsManager />
            </div>
          )}

          {activeTab === "leadership" && (
            <div data-testid="leadership-manager">
              <LeadershipManager />
            </div>
          )}

          {activeTab === "company-info" && (
            <div data-testid="company-info-manager">
              <CompanyInfoManager />
            </div>
          )}

          {activeTab === "gallery-categories" && (
            <div data-testid="gallery-categories-manager">
              <GalleryCategoriesManager />
            </div>
          )}

          {activeTab === "gallery-items" && (
            <div data-testid="gallery-items-manager">
              <GalleryItemsManager />
            </div>
          )}
          
          {activeTab === "contact-messages" && (
            <div data-testid="contact-messages-manager">
              <ContactMessagesManager />
            </div>
          )}
          
          {activeTab === "job-applications" && (
            <div data-testid="job-applications-manager">
              <JobApplicationsManager />
            </div>
          )}
          
          {activeTab === "brevo-config" && (
            <div data-testid="brevo-config-manager">
              <BrevoConfigManager />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}