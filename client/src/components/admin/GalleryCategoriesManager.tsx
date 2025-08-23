import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  type GalleryCategory, 
  type InsertGalleryCategory,
} from "@shared/schema";
import {
  Image,
  Plus,
  Edit2,
  Trash2,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { TranslatableFieldEditor } from "./TranslatableFieldEditor";

interface CategoryFormData {
  title: string;
  imageUrl: string;
  status: string;
  sortOrder: number;
  translations: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  };
}

export function GalleryCategoriesManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | null>(null);
  const [sortField, setSortField] = useState<keyof GalleryCategory | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState<CategoryFormData>({
    title: "",
    imageUrl: "",
    status: "active",
    sortOrder: 0,
    translations: {
      en: {},
      mk: {},
      de: {}
    }
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery<GalleryCategory[]>({
    queryKey: ["/api/admin/gallery-categories"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertGalleryCategory) => {
      console.log("=== Creating Gallery Category ===");
      console.log("Data received by mutationFn:", data);
      console.log("Data type:", typeof data);
      console.log("Data keys:", Object.keys(data));
      
      const result = await apiRequest("/api/admin/gallery-categories", "POST", data);
      console.log("API response:", result);
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery-categories"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Gallery category created successfully",
      });
    },
    onError: (error: any) => {
      console.error("=== Creation Error ===");
      console.error("Error object:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      toast({
        title: "Error",
        description: `Failed to create gallery category: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertGalleryCategory> }) => {
      console.log("=== Updating Gallery Category ===");
      console.log("ID:", id);
      console.log("Data received by mutationFn:", data);
      console.log("Data type:", typeof data);
      console.log("Data keys:", Object.keys(data));
      
      const result = await apiRequest(`/api/admin/gallery-categories/${id}`, "PATCH", data);
      console.log("API response:", result);
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery-categories"] });
      setIsEditDialogOpen(false);
      resetForm();
      setSelectedCategory(null);
      toast({
        title: "Success",
        description: "Gallery category updated successfully",
      });
    },
    onError: (error: any) => {
      console.error("=== Update Error ===");
      console.error("Error object:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error.details);
      toast({
        title: "Error",
        description: "Failed to update gallery category",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/admin/gallery-categories/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery-categories"] });
      toast({
        title: "Success",
        description: "Gallery category deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete gallery category",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    console.log("=== Resetting Form ===");
    console.log("Form data before reset:", formData);
    
    const cleanFormData = {
      title: "",
      imageUrl: "",
      status: "active",
      sortOrder: 0,
      translations: {
        en: {},
        mk: {},
        de: {}
      }
    };
    
    console.log("Clean form data:", cleanFormData);
    setFormData(cleanFormData);
  };

  const handleCreate = () => {
    console.log("=== Form Data Before Processing ===");
    console.log("Original formData:", formData);
    
    // Get the English title from translations or fallback to the main title
    const englishTitle = formData.translations.en?.title || formData.title;
    
    // Validate sortOrder is within reasonable bounds
    const sortOrder = Math.max(0, Math.min(formData.sortOrder, 999999));
    
    // Only send the fields that are expected by the InsertGalleryCategory schema
    const dataToSend = {
      title: englishTitle,
      imageUrl: formData.imageUrl,
      status: formData.status,
      sortOrder: sortOrder,
      translations: formData.translations,
      defaultLanguage: "en"
    };
    
    console.log("=== Data Being Sent ===");
    console.log("Data being sent to create gallery category:", dataToSend);
    console.log("Data type:", typeof dataToSend);
    console.log("Data keys:", Object.keys(dataToSend));
    
    createMutation.mutate(dataToSend);
  };

  const handleUpdate = () => {
    if (!selectedCategory) return;
    
    // Get the English title from translations or fallback to the main title
    const englishTitle = formData.translations.en?.title || formData.title;
    
    // Validate sortOrder is within reasonable bounds
    const sortOrder = Math.max(0, Math.min(formData.sortOrder, 999999));
    
    // Only send the fields that are expected by the InsertGalleryCategory schema
    const dataToSend = {
      title: englishTitle,
      imageUrl: formData.imageUrl,
      status: formData.status,
      sortOrder: sortOrder,
      translations: formData.translations,
      defaultLanguage: "en"
    };
    
    console.log("Data being sent to update gallery category:", dataToSend);
    updateMutation.mutate({ 
      id: selectedCategory.id, 
      data: dataToSend
    });
  };

  const handleEdit = (category: GalleryCategory) => {
    setSelectedCategory(category);
    
    // Initialize translations from the category data
    const categoryTranslations = {
      en: { 
        title: category.title || ""
      },
      mk: { 
        title: (category.translations as any)?.mk?.title || ""
      },
      de: { 
        title: (category.translations as any)?.de?.title || ""
      }
    };
    
    setFormData({
      title: category.title,
      imageUrl: category.imageUrl || "",
      status: category.status || "active",
      sortOrder: category.sortOrder || 0,
      translations: categoryTranslations
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (category: GalleryCategory) => {
    if (window.confirm(`Are you sure you want to delete "${category.title}"?`)) {
      deleteMutation.mutate(category.id);
    }
  };

  const handleSort = (field: keyof GalleryCategory) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort categories
  const filteredAndSortedCategories = (() => {
    let filtered = categories.filter(category => {
      const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "all" || category.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (aValue == null) aValue = "";
        if (bValue == null) bValue = "";

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();

        if (sortDirection === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return filtered;
  })();

  const getSortIcon = (field: keyof GalleryCategory) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6" data-testid="gallery-categories-manager">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gallery Categories</h2>
          <p className="text-slate-600">Manage your gallery categories</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              data-testid="button-add-category"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Gallery Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <TranslatableFieldEditor
                  label="Title"
                  fieldName="title"
                  type="text"
                  currentTranslations={formData.translations}
                  originalValue={formData.translations.en?.title || ""}
                  defaultLanguage="en"
                  onChange={(translations) => setFormData({ ...formData, translations })}
                />
              </div>
              
              <div>
                <FileUpload
                  label="Category Image"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  placeholder="Enter image URL or upload file"
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Category Image Preview"
                      className="h-20 w-20 object-cover rounded-lg border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="create-sortOrder">Sort Order</Label>
                <Input
                  id="create-sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                  data-testid="input-create-sort-order"
                />
              </div>

              <div>
                <Label htmlFor="create-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger data-testid="select-create-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleCreate}
                disabled={!formData.translations.en?.title?.trim() || createMutation.isPending}
                className="w-full"
                data-testid="button-save-create"
              >
                {createMutation.isPending ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-filter-status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Categories ({filteredAndSortedCategories.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />
              ))}
            </div>
          ) : filteredAndSortedCategories.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              {searchTerm || selectedStatus !== "all" ? "No categories match your search criteria." : "No categories found. Create your first category to get started."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th 
                      className="text-left py-3 px-2 font-medium text-slate-700 cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('title')}
                      data-testid="header-title"
                    >
                      <div className="flex items-center gap-1">
                        Title {getSortIcon('title')}
                      </div>
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-slate-700">Image</th>
                    <th 
                      className="text-left py-3 px-2 font-medium text-slate-700 cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('status')}
                      data-testid="header-status"
                    >
                      <div className="flex items-center gap-1">
                        Status {getSortIcon('status')}
                      </div>
                    </th>
                    <th 
                      className="text-left py-3 px-2 font-medium text-slate-700 cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('sortOrder')}
                      data-testid="header-order"
                    >
                      <div className="flex items-center gap-1">
                        Order {getSortIcon('sortOrder')}
                      </div>
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedCategories.map((category) => (
                    <tr key={category.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-2 font-medium" data-testid={`cell-title-${category.id}`}>
                        {category.title}
                      </td>
                      <td className="py-3 px-2">
                        {category.imageUrl ? (
                          <img src={category.imageUrl} alt={category.title} className="w-12 h-12 object-cover rounded" />
                        ) : (
                          <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center">
                            <Image className="h-6 w-6 text-slate-400" />
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={category.status === 'active' ? 'default' : 'secondary'}>
                          {category.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2" data-testid={`cell-order-${category.id}`}>
                        {category.sortOrder || 0}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category)}
                            data-testid={`button-edit-${category.id}`}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(category)}
                            className="text-red-600 hover:text-red-700"
                            data-testid={`button-delete-${category.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Gallery Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <TranslatableFieldEditor
                label="Title"
                fieldName="title"
                type="text"
                currentTranslations={formData.translations}
                originalValue={formData.translations.en?.title || ""}
                defaultLanguage="en"
                onChange={(translations) => setFormData({ ...formData, translations })}
              />
            </div>
            
            <div>
              <FileUpload
                label="Category Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                placeholder="Enter image URL or upload file"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Category Image Preview"
                    className="h-20 w-20 object-cover rounded-lg border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="edit-sortOrder">Sort Order</Label>
              <Input
                id="edit-sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                data-testid="input-edit-sort-order"
              />
            </div>

            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger data-testid="select-edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleUpdate}
              disabled={!formData.translations.en?.title?.trim() || updateMutation.isPending}
              className="w-full"
              data-testid="button-save-edit"
            >
              {updateMutation.isPending ? "Updating..." : "Update Category"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}