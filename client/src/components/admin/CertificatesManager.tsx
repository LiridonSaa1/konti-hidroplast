import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, Award, Eye, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Certificate, InsertCertificate } from "@shared/schema";

interface CertificateFormData {
  name: string;
  category: string;
  imageUrl: string;
  pdfUrl: string;
  validFrom: string;
  validUntil: string;
  active: boolean;
  sortOrder: number;
}

const CERTIFICATE_CATEGORIES = [
  "EPD",
  "Quality Management",
  "Water Supply",
  "Sewerage",
  "Gas",
  "Cable Protection",
  "Environmental",
  "Safety"
];

export function CertificatesManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState<CertificateFormData>({
    name: "",
    category: "",
    imageUrl: "",
    pdfUrl: "",
    validFrom: "",
    validUntil: "",
    active: true,
    sortOrder: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: certificates = [], isLoading } = useQuery<Certificate[]>({
    queryKey: ["/api/admin/certificates"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertCertificate) => {
      return apiRequest("POST", "/api/admin/certificates", {
        ...data,
        validFrom: data.validFrom ? new Date(data.validFrom).toISOString() : null,
        validUntil: data.validUntil ? new Date(data.validUntil).toISOString() : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificates"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Certificate created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create certificate",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertCertificate> }) => {
      return apiRequest("PUT", `/api/admin/certificates/${id}`, {
        ...data,
        validFrom: data.validFrom ? new Date(data.validFrom).toISOString() : null,
        validUntil: data.validUntil ? new Date(data.validUntil).toISOString() : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificates"] });
      setIsEditDialogOpen(false);
      setSelectedCertificate(null);
      resetForm();
      toast({
        title: "Success",
        description: "Certificate updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update certificate",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/certificates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificates"] });
      toast({
        title: "Success",
        description: "Certificate deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete certificate",
        variant: "destructive",
      });
    },
  });

  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = certificate.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || certificate.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      imageUrl: "",
      pdfUrl: "",
      validFrom: "",
      validUntil: "",
      active: true,
      sortOrder: 0
    });
  };

  const handleEdit = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setFormData({
      name: certificate.name,
      category: certificate.category,
      imageUrl: certificate.imageUrl || "",
      pdfUrl: certificate.pdfUrl || "",
      validFrom: certificate.validFrom ? new Date(certificate.validFrom).toISOString().split('T')[0] : "",
      validUntil: certificate.validUntil ? new Date(certificate.validUntil).toISOString().split('T')[0] : "",
      active: certificate.active ?? true,
      sortOrder: certificate.sortOrder || 0
    });
    setIsEditDialogOpen(true);
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      ...formData,
      validFrom: formData.validFrom ? formData.validFrom : null,
      validUntil: formData.validUntil ? formData.validUntil : null,
    };
    
    if (selectedCertificate) {
      updateMutation.mutate({ id: selectedCertificate.id, data: dataToSubmit });
    } else {
      createMutation.mutate(dataToSubmit);
    }
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const isExpired = (validUntil: string | Date | null) => {
    if (!validUntil) return false;
    return new Date(validUntil) < new Date();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64" data-testid="certificates-loading">
        <div className="text-slate-600">Loading certificates...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="certificates-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="certificates-title">Certificates Management</h2>
          <p className="text-slate-600" data-testid="certificates-description">
            Manage company certifications, compliance documents, and quality standards
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-certificate">
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
          </DialogTrigger>
          <CertificateFormDialog
            isOpen={isCreateDialogOpen}
            title="Add New Certificate"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => setIsCreateDialogOpen(false)}
            isLoading={createMutation.isPending}
          />
        </Dialog>
      </div>

      {/* Filters */}
      <Card data-testid="certificates-filters">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-certificates"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48" data-testid="select-certificate-category">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CERTIFICATE_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="certificates-grid">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="hover:shadow-md transition-shadow" data-testid={`certificate-card-${certificate.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2" data-testid={`certificate-name-${certificate.id}`}>
                    {certificate.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" data-testid={`certificate-category-${certificate.id}`}>
                      {certificate.category}
                    </Badge>
                    <Badge 
                      variant={certificate.active ? "default" : "secondary"}
                      data-testid={`certificate-status-${certificate.id}`}
                    >
                      {certificate.active ? "Active" : "Inactive"}
                    </Badge>
                    {isExpired(certificate.validUntil) && (
                      <Badge variant="destructive" data-testid={`certificate-expired-${certificate.id}`}>
                        Expired
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              {certificate.imageUrl && (
                <div className="w-full h-32 bg-slate-100 rounded-lg overflow-hidden">
                  <img
                    src={certificate.imageUrl}
                    alt={certificate.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='80' viewBox='0 0 100 80'%3E%3Crect width='100' height='80' fill='%23f1f5f9'/%3E%3Ctext x='50' y='40' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='10'%3ECertificate%3C/text%3E%3C/svg%3E";
                    }}
                    data-testid={`certificate-image-${certificate.id}`}
                  />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span>Valid: {formatDate(certificate.validFrom)} - {formatDate(certificate.validUntil)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {certificate.pdfUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(certificate.pdfUrl!, '_blank')}
                      data-testid={`button-download-certificate-${certificate.id}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  {certificate.imageUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(certificate.imageUrl!, '_blank')}
                      data-testid={`button-view-certificate-${certificate.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(certificate)}
                    data-testid={`button-edit-certificate-${certificate.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        data-testid={`button-delete-certificate-${certificate.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Certificate</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{certificate.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(certificate.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <Card data-testid="certificates-empty-state">
          <CardContent className="p-8 text-center">
            <Award className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No certificates found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first certificate"
              }
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-add-first-certificate">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Certificate
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <CertificateFormDialog
          isOpen={isEditDialogOpen}
          title="Edit Certificate"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsEditDialogOpen(false);
            setSelectedCertificate(null);
            resetForm();
          }}
          isLoading={updateMutation.isPending}
        />
      </Dialog>
    </div>
  );
}

function CertificateFormDialog({
  isOpen,
  title,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isLoading
}: {
  isOpen: boolean;
  title: string;
  formData: CertificateFormData;
  setFormData: (data: CertificateFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="certificate-form-dialog">
      <DialogHeader>
        <DialogTitle data-testid="certificate-form-title">{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Certificate Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter certificate name"
              data-testid="input-certificate-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger data-testid="select-certificate-category-form">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CERTIFICATE_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Certificate Image URL</Label>
            <Input
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="Enter image URL"
              data-testid="input-certificate-image-url"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pdfUrl">Certificate PDF URL</Label>
            <Input
              id="pdfUrl"
              value={formData.pdfUrl}
              onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
              placeholder="Enter PDF URL"
              data-testid="input-certificate-pdf-url"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="validFrom">Valid From</Label>
            <Input
              id="validFrom"
              type="date"
              value={formData.validFrom}
              onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
              data-testid="input-certificate-valid-from"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
              value={formData.validUntil}
              onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
              data-testid="input-certificate-valid-until"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
              placeholder="0"
              data-testid="input-certificate-sort-order"
            />
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              data-testid="switch-certificate-active"
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel} data-testid="button-cancel-certificate">
          Cancel
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={isLoading || !formData.name || !formData.category}
          data-testid="button-save-certificate"
        >
          {isLoading ? "Saving..." : "Save Certificate"}
        </Button>
      </div>
    </DialogContent>
  );
}