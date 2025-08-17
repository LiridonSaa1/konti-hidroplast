import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Building, Phone, Mail, MapPin, Globe, Save, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { CompanyInfo, InsertCompanyInfo } from "@shared/schema";

interface CompanyInfoForm {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string;
  website: string;
  description: string;
  socialLinkedIn: string;
  socialFacebook: string;
  socialInstagram: string;
}

export function CompanyInfoManager() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CompanyInfoForm>({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    logoUrl: "",
    website: "",
    description: "",
    socialLinkedIn: "",
    socialFacebook: "",
    socialInstagram: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: companyInfo = [], isLoading } = useQuery<CompanyInfo[]>({
    queryKey: ["/api/admin/company-info"]
  });

  // Transform array to form data
  useEffect(() => {
    if (companyInfo.length > 0) {
      const infoMap = companyInfo.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);

      setFormData({
        companyName: infoMap.companyName || "",
        email: infoMap.email || "",
        phone: infoMap.phone || "",
        address: infoMap.address || "",
        logoUrl: infoMap.logoUrl || "",
        website: infoMap.website || "",
        description: infoMap.description || "",
        socialLinkedIn: infoMap.socialLinkedIn || "",
        socialFacebook: infoMap.socialFacebook || "",
        socialInstagram: infoMap.socialInstagram || ""
      });
    }
  }, [companyInfo]);

  const updateMutation = useMutation({
    mutationFn: async (data: CompanyInfoForm) => {
      const updates = Object.entries(data).map(([key, value]) => 
        apiRequest("POST", "/api/admin/company-info", {
          key,
          value,
          category: getCategoryForKey(key)
        })
      );
      return Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/company-info"] });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Company information updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update company information",
        variant: "destructive",
      });
    },
  });

  const getCategoryForKey = (key: string): string => {
    if (key.startsWith('social')) return 'social';
    if (['email', 'phone', 'address'].includes(key)) return 'contact';
    if (['logoUrl', 'website'].includes(key)) return 'branding';
    return 'general';
  };

  const handleSubmit = () => {
    updateMutation.mutate(formData);
  };

  const handleCancel = () => {
    // Reset form to original values
    if (companyInfo.length > 0) {
      const infoMap = companyInfo.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);

      setFormData({
        companyName: infoMap.companyName || "",
        email: infoMap.email || "",
        phone: infoMap.phone || "",
        address: infoMap.address || "",
        logoUrl: infoMap.logoUrl || "",
        website: infoMap.website || "",
        description: infoMap.description || "",
        socialLinkedIn: infoMap.socialLinkedIn || "",
        socialFacebook: infoMap.socialFacebook || "",
        socialInstagram: infoMap.socialInstagram || ""
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64" data-testid="company-info-loading">
        <div className="text-slate-600">Loading company information...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="company-info-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="company-info-title">Company Information</h2>
          <p className="text-slate-600" data-testid="company-info-description">
            Manage contact details, branding, and social media links
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} data-testid="button-edit-company-info">
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Information
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} data-testid="button-cancel-company-info">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={updateMutation.isPending}
              data-testid="button-save-company-info"
            >
              <Save className="h-4 w-4 mr-2" />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card data-testid="card-basic-info">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                disabled={!isEditing}
                data-testid="input-company-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={!isEditing}
                rows={3}
                data-testid="textarea-company-description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                disabled={!isEditing}
                placeholder="https://example.com"
                data-testid="input-company-website"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                type="url"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                disabled={!isEditing}
                placeholder="https://example.com/logo.png"
                data-testid="input-company-logo"
              />
              {formData.logoUrl && (
                <div className="mt-2">
                  <img
                    src={formData.logoUrl}
                    alt="Company Logo Preview"
                    className="h-16 w-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                    data-testid="preview-company-logo"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card data-testid="card-contact-info">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                data-testid="input-company-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                data-testid="input-company-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                rows={3}
                data-testid="textarea-company-address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card className="lg:col-span-2" data-testid="card-social-media">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Social Media Links
            </CardTitle>
            <CardDescription>
              Add your company's social media profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="socialLinkedIn">LinkedIn URL</Label>
                <Input
                  id="socialLinkedIn"
                  type="url"
                  value={formData.socialLinkedIn}
                  onChange={(e) => setFormData({ ...formData, socialLinkedIn: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://linkedin.com/company/..."
                  data-testid="input-social-linkedin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialFacebook">Facebook URL</Label>
                <Input
                  id="socialFacebook"
                  type="url"
                  value={formData.socialFacebook}
                  onChange={(e) => setFormData({ ...formData, socialFacebook: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://facebook.com/..."
                  data-testid="input-social-facebook"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialInstagram">Instagram URL</Label>
                <Input
                  id="socialInstagram"
                  type="url"
                  value={formData.socialInstagram}
                  onChange={(e) => setFormData({ ...formData, socialInstagram: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://instagram.com/..."
                  data-testid="input-social-instagram"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      {!isEditing && (
        <Card data-testid="card-company-preview">
          <CardHeader>
            <CardTitle>Contact Information Preview</CardTitle>
            <CardDescription>
              This is how your company information appears to visitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="space-y-1">
                <div className="font-medium text-slate-700">Company</div>
                <div data-testid="preview-company-name">{formData.companyName || "Not set"}</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium text-slate-700">Email</div>
                <div data-testid="preview-company-email">{formData.email || "Not set"}</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium text-slate-700">Phone</div>
                <div data-testid="preview-company-phone">{formData.phone || "Not set"}</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium text-slate-700">Website</div>
                <div data-testid="preview-company-website">
                  {formData.website ? (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {formData.website}
                    </a>
                  ) : (
                    "Not set"
                  )}
                </div>
              </div>
            </div>
            {formData.address && (
              <div className="mt-4 space-y-1">
                <div className="font-medium text-slate-700">Address</div>
                <div className="whitespace-pre-line" data-testid="preview-company-address">{formData.address}</div>
              </div>
            )}
            {formData.description && (
              <div className="mt-4 space-y-1">
                <div className="font-medium text-slate-700">Description</div>
                <div className="text-slate-600" data-testid="preview-company-description">{formData.description}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}