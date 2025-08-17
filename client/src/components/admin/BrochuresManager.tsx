import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, BookOpen, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Brochure, InsertBrochure, BrochureCategory } from "@shared/schema";

interface BrochureFormData {
  name: string;
  category: string;
  pdfFile: File | null;
  description: string;
  status: string;
  active: boolean;
  sortOrder: number;
}



export function BrochuresManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState<Brochure | null>(null);
  const [formData, setFormData] = useState<BrochureFormData>({
    name: "",
    category: "",
    pdfFile: null,
    description: "",
    status: "active",
    active: true,
    sortOrder: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: brochures = [], isLoading } = useQuery<Brochure[]>({
    queryKey: ["/api/admin/brochures"]
  });

  const { data: categories = [] } = useQuery<BrochureCategory[]>({
    queryKey: ["/api/admin/brochure-categories"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertBrochure) => {
      const result = await apiRequest("/api/admin/brochures", "POST", data);
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brochures"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Brochure created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create brochure",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBrochure> }) => {
      const result = await apiRequest(`/api/admin/brochures/${id}`, "PUT", data);
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brochures"] });
      setIsEditDialogOpen(false);
      setSelectedBrochure(null);
      resetForm();
      toast({
        title: "Success",
        description: "Brochure updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update brochure",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await apiRequest(`/api/admin/brochures/${id}`, "DELETE");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brochures"] });
      toast({
        title: "Success",
        description: "Brochure deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete brochure",
        variant: "destructive",
      });
    },
  });

  const filteredBrochures = brochures.filter(brochure => {
    const matchesSearch = brochure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brochure.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || brochure.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      pdfFile: null,
      description: "",
      status: "active",
      active: true,
      sortOrder: 0
    });
  };

  const handleEdit = (brochure: Brochure) => {
    setSelectedBrochure(brochure);
    setFormData({
      name: brochure.name,
      category: brochure.category,
      pdfFile: null, // Will be handled separately for existing files
      description: brochure.description || "",
      status: brochure.status || "active",
      active: brochure.active ?? true,
      sortOrder: brochure.sortOrder || 0
    });
    setIsEditDialogOpen(true);
  };

  const handleSubmit = async () => {
    let pdfUrl = "";
    
    // If we have a file, upload it first
    if (formData.pdfFile) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.pdfFile);
      
      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload file');
        }
        
        const uploadResult = await uploadResponse.json();
        pdfUrl = uploadResult.url;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload PDF file",
          variant: "destructive",
        });
        return;
      }
    }
    
    const submissionData = {
      title: formData.name, // Use name as title
      name: formData.name,
      category: formData.category,
      pdfUrl: pdfUrl || (selectedBrochure?.pdfUrl || ""),
      description: formData.description,
      status: formData.status,
      active: formData.active,
      sortOrder: formData.sortOrder
    };
    
    if (selectedBrochure) {
      updateMutation.mutate({ id: selectedBrochure.id, data: submissionData });
    } else {
      createMutation.mutate(submissionData);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64" data-testid="brochures-loading">
        <div className="text-slate-600">Loading brochures...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="brochures-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="brochures-title">Brochures Management</h2>
          <p className="text-slate-600" data-testid="brochures-description">
            Manage product brochures, technical documents, and installation guides
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-brochure">
              <Plus className="h-4 w-4 mr-2" />
              Add Brochure
            </Button>
          </DialogTrigger>
          <BrochureFormDialog
            isOpen={isCreateDialogOpen}
            title="Add New Brochure"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => setIsCreateDialogOpen(false)}
            isLoading={createMutation.isPending}
            categories={categories}
          />
        </Dialog>
      </div>

      {/* Filters */}
      <Card data-testid="brochures-filters">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  placeholder="Search brochures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-brochures"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48" data-testid="select-brochure-category">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories
                  .filter(cat => cat.active)
                  .map(category => (
                    <SelectItem key={category.id} value={category.title}>{category.title}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Brochures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="brochures-grid">
        {filteredBrochures.map((brochure) => (
          <Card key={brochure.id} className="hover:shadow-md transition-shadow" data-testid={`brochure-card-${brochure.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2" data-testid={`brochure-name-${brochure.id}`}>
                    {brochure.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" data-testid={`brochure-category-${brochure.id}`}>
                      {brochure.category}
                    </Badge>
                    <Badge 
                      variant={brochure.active ? "default" : "secondary"}
                      data-testid={`brochure-status-${brochure.id}`}
                    >
                      {brochure.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <BookOpen className="h-8 w-8 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent>
              {brochure.description && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-3" data-testid={`brochure-description-${brochure.id}`}>
                  {brochure.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(brochure.pdfUrl, '_blank')}
                    data-testid={`button-download-brochure-${brochure.id}`}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(brochure.pdfUrl, '_blank')}
                    data-testid={`button-view-brochure-${brochure.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(brochure)}
                    data-testid={`button-edit-brochure-${brochure.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        data-testid={`button-delete-brochure-${brochure.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Brochure</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{brochure.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(brochure.id)}
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

      {filteredBrochures.length === 0 && (
        <Card data-testid="brochures-empty-state">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No brochures found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first brochure"
              }
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-add-first-brochure">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Brochure
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <BrochureFormDialog
          isOpen={isEditDialogOpen}
          title="Edit Brochure"
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsEditDialogOpen(false);
            setSelectedBrochure(null);
            resetForm();
          }}
          isLoading={updateMutation.isPending}
          categories={categories}
        />
      </Dialog>
    </div>
  );
}

function BrochureFormDialog({
  isOpen,
  title,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isLoading,
  categories
}: {
  isOpen: boolean;
  title: string;
  formData: BrochureFormData;
  setFormData: (data: BrochureFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  categories: BrochureCategory[];
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, pdfFile: file });
    } else if (file) {
      alert('Please select a PDF file');
      e.target.value = '';
    }
  };

  return (
    <DialogContent className="max-w-2xl" data-testid="brochure-form-dialog">
      <DialogHeader>
        <DialogTitle data-testid="brochure-form-title">{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Brochure Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter brochure name"
              data-testid="input-brochure-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger data-testid="select-brochure-category-form">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter(cat => cat.active)
                  .map(category => (
                    <SelectItem key={category.id} value={category.title}>{category.title}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pdfFile">PDF File *</Label>
          <div className="flex items-center gap-2">
            <Input
              id="pdfFile"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              data-testid="input-brochure-pdf-file"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formData.pdfFile && (
              <span className="text-sm text-green-600">
                {formData.pdfFile.name}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter brochure description (optional)"
            rows={3}
            data-testid="textarea-brochure-description"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger data-testid="select-brochure-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
              placeholder="0"
              data-testid="input-brochure-sort-order"
            />
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              data-testid="switch-brochure-active"
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel} data-testid="button-cancel-brochure">
          Cancel
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={isLoading || !formData.name || !formData.category || (!formData.pdfFile && title.includes("Add"))}
          data-testid="button-save-brochure"
        >
          {isLoading ? "Saving..." : "Save Brochure"}
        </Button>
      </div>
    </DialogContent>
  );
}