import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, Package, Globe, Languages, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

import { TranslatableFieldEditor } from "@/components/admin/TranslatableFieldEditor";

interface Category {
  id: number;
  title: string;
  status: string;
  translations?: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  };
}

interface Subcategory {
  id: number;
  title: string;
  categoryId: number;
  status: string;
  translations?: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  };
}

interface SubcategoryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  categoryId: number;
  categoryTitle?: string;
  subcategoryId: number;
  subcategoryTitle?: string;
  sortOrder: number;
  active: boolean;
  translations?: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  };
  createdAt: string;
  updatedAt: string;
}

interface SubcategoryItemFormData {
  title: string;
  description: string;
  imageUrl: string;
  categoryId: number;
  subcategoryId: number;
  sortOrder: number;
  active: boolean;
  translations: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  };
}

export function SubcategoryItemsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SubcategoryItem | null>(null);
  const [formData, setFormData] = useState<SubcategoryItemFormData>({
    title: "",
    description: "",
    imageUrl: "",
    categoryId: 0,
    subcategoryId: 0,
    sortOrder: 0,
    active: true,
    translations: {
      en: { title: "", description: "" },
      mk: { title: "", description: "" },
      de: { title: "", description: "" }
    }
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading: isLoadingItems } = useQuery<SubcategoryItem[]>({
    queryKey: ["/api/admin/subcategory-items"]
  });

  // Use certificate categories instead of product categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/admin/certificate-categories"]
  });

  // Use certificate subcategories instead of product subcategories
  const { data: subcategories = [], isLoading: isLoadingSubcategories } = useQuery<Subcategory[]>({
    queryKey: ["/api/admin/certificate-subcategories"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/admin/subcategory-items", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subcategory-items"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Item created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create item",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: number; item: any }) => {
      return apiRequest(`/api/admin/subcategory-items/${data.id}`, "PUT", data.item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subcategory-items"] });
      setIsEditDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Item updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/admin/subcategory-items/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subcategory-items"] });
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    },
  });

  const filteredItems = items
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesStatus = statusFilter === "all" ||
                           (statusFilter === "active" && item.active) ||
                           (statusFilter === "inactive" && !item.active);
      const matchesCategory = categoryFilter === "all" || item.categoryId.toString() === categoryFilter;
      const matchesSubcategory = subcategoryFilter === "all" || item.subcategoryId.toString() === subcategoryFilter;
      return matchesSearch && matchesStatus && matchesCategory && matchesSubcategory;
    })
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      categoryId: 0,
      subcategoryId: 0,
      sortOrder: 0,
      active: true,
      translations: {
        en: { title: "", description: "" },
        mk: { title: "", description: "" },
        de: { title: "", description: "" }
      }
    });
    setSelectedItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.categoryId || formData.categoryId === 0) {
      toast({
        title: "Error",
        description: "Category is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.subcategoryId || formData.subcategoryId === 0) {
      toast({
        title: "Error",
        description: "Subcategory is required",
        variant: "destructive",
      });
      return;
    }

    const itemData = {
      title: formData.title,
      description: formData.description || null,
      imageUrl: formData.imageUrl || null,
      categoryId: formData.categoryId,
      subcategoryId: formData.subcategoryId,
      sortOrder: formData.sortOrder,
      active: formData.active,
      translations: formData.translations
    };

    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, item: itemData });
    } else {
      createMutation.mutate(itemData);
    }
  };

  const handleEdit = (item: SubcategoryItem) => {
    const translations = (item.translations as any) || {};
    
    const structuredTranslations = {
      en: {
        title: translations.en?.title || item.title || "",
        description: translations.en?.description || item.description || ""
      },
      mk: {
        title: translations.mk?.title || "",
        description: translations.mk?.description || ""
      },
      de: {
        title: translations.de?.title || "",
        description: translations.de?.description || ""
      }
    };
    
    const newFormData = {
      title: structuredTranslations.en.title,
      description: structuredTranslations.en.description,
      imageUrl: item.imageUrl || "",
      categoryId: item.categoryId,
      subcategoryId: item.subcategoryId,
      sortOrder: item.sortOrder || 0,
      active: item.active || true,
      translations: structuredTranslations
    };
    
    setFormData(newFormData);
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "Not set";
    if (dateString instanceof Date) {
      return dateString.toLocaleDateString();
    }
    return new Date(dateString).toLocaleDateString();
  };

  const getCategoryTitle = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.title || "Unknown Category";
  };

  const getSubcategoryTitle = (subcategoryId: number) => {
    const subcategory = subcategories.find(sub => sub.id === subcategoryId);
    return subcategory?.title || "Unknown Subcategory";
  };

  const getFilteredSubcategories = (categoryId: number) => {
    if (!categoryId || categoryId === 0) return [];
    return subcategories.filter(sub => sub.categoryId === categoryId);
  };

  const handleCategoryChange = (categoryId: number) => {
    setFormData(prev => ({ 
      ...prev, 
      categoryId,
      subcategoryId: 0 // Reset subcategory when category changes
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Subcategory Items Management
          </CardTitle>
          <CardDescription>
            Create and manage items that belong to subcategories with multi-language support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="sm:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Subcategory Filter */}
            <div className="sm:w-48">
              <Select value={subcategoryFilter} onValueChange={setSubcategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subcategories</SelectItem>
                  {subcategories
                    .filter(sub => categoryFilter === "all" || sub.categoryId.toString() === categoryFilter)
                    .map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                        {subcategory.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Status Filter */}
            <div className="sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Create Button */}
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Item
            </Button>
          </div>
        </CardContent>
      </Card>

             {/* Main Content */}
       <div className="space-y-6">
          {/* Items Table */}
          {filteredItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Subcategory Items ({filteredItems.length})
                  {(statusFilter !== "all" || categoryFilter !== "all" || subcategoryFilter !== "all") && (
                    <span className="text-sm font-normal text-slate-500 ml-2">
                      • Filtered by {statusFilter !== "all" ? statusFilter : ""} {categoryFilter !== "all" ? getCategoryTitle(parseInt(categoryFilter)) : ""} {subcategoryFilter !== "all" ? getSubcategoryTitle(parseInt(subcategoryFilter)) : ""}
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  All items organized by categories and subcategories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead>Languages</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sort Order</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium max-w-xs">
                          <div className="line-clamp-2">
                            {item.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.description ? (
                            <span className="text-sm line-clamp-2 max-w-xs">
                              {item.description}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-sm">No description</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {getCategoryTitle(item.categoryId)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {getSubcategoryTitle(item.subcategoryId)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {item.translations && Object.keys(item.translations).length > 0 ? (
                              Object.keys(item.translations).map((lang) => (
                                <Badge key={lang} variant="secondary" className="text-xs">
                                  {lang.toUpperCase()}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                No Translations
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.active ? "default" : "secondary"}
                          >
                            {item.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{item.sortOrder}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {formatDate(item.createdAt)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Item</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{item.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {filteredItems.length === 0 && (
            <Card className="p-8 text-center border-dashed">
              <div className="flex flex-col items-center gap-4">
                <Package className="h-12 w-12 text-slate-400" />
                <div>
                  <h3 className="text-lg font-medium text-slate-900">No items found</h3>
                  <p className="text-slate-500">
                    {searchTerm || statusFilter !== "all" || categoryFilter !== "all" || subcategoryFilter !== "all"
                      ? "Try adjusting your search or filters"
                      : "Get started by creating your first item"}
                  </p>
                </div>
                {!searchTerm && statusFilter === "all" && categoryFilter === "all" && subcategoryFilter === "all" && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Item
                  </Button>
                )}
              </div>
            </Card>
                     )}
         </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl mx-4 w-[calc(100vw-2rem)] sm:mx-auto sm:w-full">
          <DialogHeader>
            <DialogTitle>Create Subcategory Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category and Subcategory Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="categoryId">Parent Category *</Label>
                <Select value={formData.categoryId.toString()} onValueChange={(value) => handleCategoryChange(parseInt(value))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subcategoryId">Parent Subcategory *</Label>
                <Select value={formData.subcategoryId.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, subcategoryId: parseInt(value) }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredSubcategories(formData.categoryId).map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                        {subcategory.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Multi-Language Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Multi-Language Content
                </Label>
                <Badge variant="outline" className="capitalize">
                  Default: English
                </Badge>
              </div>

              {/* Title Field */}
              <TranslatableFieldEditor
                label="Item Title"
                fieldName="title"
                type="text"
                currentTranslations={formData.translations}
                originalValue={formData.translations.en?.title || ""}
                onChange={(translations) => {
                  setFormData(prev => {
                    const newData = {
                      ...prev,
                      title: translations.en?.title || "",
                      translations
                    };
                    return newData;
                  });
                }}
              />

              {/* Description Field */}
              <TranslatableFieldEditor
                label="Item Description"
                fieldName="description"
                type="textarea"
                currentTranslations={formData.translations}
                originalValue={formData.translations.en?.description || ""}
                onChange={(translations) => {
                  setFormData(prev => {
                    const newData = {
                      ...prev,
                      description: translations.en?.description || "",
                      translations
                    };
                    return newData;
                  });
                }}
              />
            </div>

            {/* Additional Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="sortOrder">Sort Order</Label>
                <Input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter sort order (0 = first)"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Creating..." : "Create Item"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl mx-4 w-[calc(100vw-2rem)] sm:mx-auto sm:w-full">
          <DialogHeader>
            <DialogTitle>Edit Subcategory Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category and Subcategory Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-categoryId">Parent Category *</Label>
                <Select value={formData.categoryId.toString()} onValueChange={(value) => handleCategoryChange(parseInt(value))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-subcategoryId">Parent Subcategory *</Label>
                <Select value={formData.subcategoryId.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, subcategoryId: parseInt(value) }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredSubcategories(formData.categoryId).map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                        {subcategory.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Multi-Language Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Multi-Language Content
                </Label>
                <Badge variant="outline" className="capitalize">
                  Default: English
                </Badge>
              </div>

              {/* Title Field */}
              <TranslatableFieldEditor
                label="Item Title"
                fieldName="title"
                type="text"
                currentTranslations={formData.translations}
                originalValue={formData.translations.en?.title || ""}
                onChange={(translations) => {
                  setFormData(prev => {
                    const newData = {
                      ...prev,
                      title: translations.en?.title || "",
                      translations
                    };
                    return newData;
                  });
                }}
              />

              {/* Description Field */}
              <TranslatableFieldEditor
                label="Item Description"
                fieldName="description"
                type="textarea"
                currentTranslations={formData.translations}
                originalValue={formData.translations.en?.description || ""}
                onChange={(translations) => {
                  setFormData(prev => {
                    const newData = {
                      ...prev,
                      description: translations.en?.description || "",
                      translations
                    };
                    return newData;
                  });
                }}
              />
            </div>

            {/* Additional Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-sortOrder">Sort Order</Label>
                <Input
                  id="edit-sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter sort order (0 = first)"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
