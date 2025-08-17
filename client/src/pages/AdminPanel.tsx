import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  ChevronRight
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

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isBrochuresDropdownOpen, setIsBrochuresDropdownOpen] = useState(false);

  // Auto-open team dropdown when teams, positions, or leadership tab is active
  const teamTabsActive = activeTab === "teams" || activeTab === "positions" || activeTab === "leadership";
  if (teamTabsActive && !isTeamDropdownOpen) {
    setIsTeamDropdownOpen(true);
  }
  
  // Auto-open brochures dropdown when brochures or brochure-categories tab is active
  const brochureTabsActive = activeTab === "brochures" || activeTab === "enhanced-brochures" || activeTab === "document-manager" || activeTab === "brochure-categories";
  if (brochureTabsActive && !isBrochuresDropdownOpen) {
    setIsBrochuresDropdownOpen(true);
  }

  // Fetch basic stats for overview
  const { data: productsCount = 0 } = useQuery({
    queryKey: ["/api/admin/products"],
    select: (data: any) => data?.length || 0
  });

  const { data: mediaCount = 0 } = useQuery({
    queryKey: ["/api/admin/media"],
    select: (data: any) => data?.length || 0
  });

  const { data: newsCount = 0 } = useQuery({
    queryKey: ["/api/admin/news"],
    select: (data: any) => data?.length || 0
  });

  const { data: certificatesCount = 0 } = useQuery({
    queryKey: ["/api/admin/certificates"],
    select: (data: any) => data?.length || 0
  });

  const { data: teamsCount = 0 } = useQuery({
    queryKey: ["/api/admin/teams"],
    select: (data: any) => data?.length || 0
  });

  const { data: positionsCount = 0 } = useQuery({
    queryKey: ["/api/admin/positions"],
    select: (data: any) => data?.length || 0
  });

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-panel">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900" data-testid="admin-panel-title">
                Konti Hidroplast - Admin Panel
              </h1>
              <p className="text-slate-600 mt-1" data-testid="admin-panel-subtitle">
                Manage your website content and data
              </p>
            </div>
            <Button variant="outline" data-testid="button-logout">
              <Users className="h-4 w-4 mr-2" />
              Admin User
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-slate-200 p-4">
          <nav className="space-y-2" data-testid="admin-navigation">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
              data-testid="nav-overview"
            >
              <Settings className="h-4 w-4 mr-2" />
              Overview
            </Button>
            
            <Separator className="my-4" />
            
            <Button
              variant={activeTab === "projects" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("projects")}
              data-testid="nav-projects"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Projects
            </Button>
            
            <Button
              variant={activeTab === "media" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("media")}
              data-testid="nav-media"
            >
              <Image className="h-4 w-4 mr-2" />
              Media & Photos
            </Button>
            
            <Button
              variant={activeTab === "news" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("news")}
              data-testid="nav-news"
            >
              <FileText className="h-4 w-4 mr-2" />
              News & Articles
            </Button>
            
            <Button
              variant={activeTab === "certificates" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("certificates")}
              data-testid="nav-certificates"
            >
              <Award className="h-4 w-4 mr-2" />
              Certificates
            </Button>
            
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
                  className={`w-full justify-start text-sm ${activeTab === "brochures" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => setActiveTab("brochures")}
                  data-testid="nav-brochures-list"
                >
                  <BookOpen className={`h-3 w-3 mr-2 ${activeTab === "brochures" ? "text-blue-600" : ""}`} />
                  Brochures
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "enhanced-brochures" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => setActiveTab("enhanced-brochures")}
                  data-testid="nav-enhanced-brochures"
                >
                  <BookOpen className={`h-3 w-3 mr-2 ${activeTab === "enhanced-brochures" ? "text-blue-600" : ""}`} />
                  Enhanced Manager
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "document-manager" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => setActiveTab("document-manager")}
                  data-testid="nav-document-manager"
                >
                  <FileText className={`h-3 w-3 mr-2 ${activeTab === "document-manager" ? "text-blue-600" : ""}`} />
                  Document Manager
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "brochure-categories" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => setActiveTab("brochure-categories")}
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
                  onClick={() => setActiveTab("teams")}
                  data-testid="nav-teams"
                >
                  <Users className={`h-3 w-3 mr-2 ${activeTab === "teams" ? "text-blue-600" : ""}`} />
                  Team Members
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "positions" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => setActiveTab("positions")}
                  data-testid="nav-positions"
                >
                  <Briefcase className={`h-3 w-3 mr-2 ${activeTab === "positions" ? "text-blue-600" : ""}`} />
                  Positions
                </Button>
                
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm ${activeTab === "leadership" ? "text-blue-600" : "text-slate-700 hover:text-slate-900"}`}
                  onClick={() => setActiveTab("leadership")}
                  data-testid="nav-leadership"
                >
                  <Building className={`h-3 w-3 mr-2 ${activeTab === "leadership" ? "text-blue-600" : ""}`} />
                  Leadership
                </Button>
              </CollapsibleContent>
            </Collapsible>
            
            <Separator className="my-4" />
            
            <Button
              variant={activeTab === "company-info" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("company-info")}
              data-testid="nav-company-info"
            >
              <Building className="h-4 w-4 mr-2" />
              Company Info
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === "overview" && (
            <div className="space-y-6" data-testid="overview-content">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  <Card data-testid="card-products-count">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Products</CardTitle>
                      <Package className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold" data-testid="products-count">{productsCount}</div>
                      <p className="text-xs text-slate-600">Total products in catalog</p>
                    </CardContent>
                  </Card>
                  
                  <Card data-testid="card-media-count">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Media Files</CardTitle>
                      <Image className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold" data-testid="media-count">{mediaCount}</div>
                      <p className="text-xs text-slate-600">Photos and images</p>
                    </CardContent>
                  </Card>
                  
                  <Card data-testid="card-news-count">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">News Articles</CardTitle>
                      <FileText className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold" data-testid="news-count">{newsCount}</div>
                      <p className="text-xs text-slate-600">Published articles</p>
                    </CardContent>
                  </Card>
                  
                  <Card data-testid="card-certificates-count">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                      <Award className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold" data-testid="certificates-count">{certificatesCount}</div>
                      <p className="text-xs text-slate-600">Active certificates</p>
                    </CardContent>
                  </Card>

                  <Card data-testid="card-teams-count">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                      <Users className="h-4 w-4 text-indigo-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold" data-testid="teams-count">{teamsCount}</div>
                      <p className="text-xs text-slate-600">Active team members</p>
                    </CardContent>
                  </Card>

                  <Card data-testid="card-positions-count">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Positions</CardTitle>
                      <Briefcase className="h-4 w-4 text-teal-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold" data-testid="positions-count">{positionsCount}</div>
                      <p className="text-xs text-slate-600">Available positions</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card data-testid="card-quick-actions">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common management tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full justify-start" onClick={() => setActiveTab("products")} data-testid="button-add-product">
                      <Package className="h-4 w-4 mr-2" />
                      Add New Product
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("media")} data-testid="button-upload-media">
                      <Image className="h-4 w-4 mr-2" />
                      Upload Media
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab("news")} data-testid="button-create-article">
                      <FileText className="h-4 w-4 mr-2" />
                      Create News Article
                    </Button>
                  </CardContent>
                </Card>

                <Card data-testid="card-system-status">
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Current system information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Database Status</span>
                        <span className="text-sm font-medium text-green-600" data-testid="database-status">Connected</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Last Backup</span>
                        <span className="text-sm font-medium" data-testid="last-backup">Auto-managed</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">System Version</span>
                        <span className="text-sm font-medium" data-testid="system-version">v1.0.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div data-testid="projects-manager">
              <ProjectsManager />
            </div>
          )}

          {activeTab === "media" && (
            <div data-testid="media-manager">
              <MediaManager />
            </div>
          )}

          {activeTab === "news" && (
            <div data-testid="news-manager">
              <NewsManager />
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

          {activeTab === "document-manager" && (
            <div data-testid="document-manager">
              <DocumentManager />
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
        </div>
      </div>
    </div>
  );
}