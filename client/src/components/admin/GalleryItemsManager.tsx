import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  type GalleryItem, 
  type InsertGalleryItem,
  type GalleryCategory,
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

interface ItemFormData {
  categoryId: number | "";
  imageUrl: string;
  status: string;
  sortOrder: number;
}

export function GalleryItemsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [sortField, setSortField] = useState<keyof GalleryItem | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState<ItemFormData>({
    categoryId: "",
    imageUrl: "",
    status: "active",
    sortOrder: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/admin/gallery-items"]
  });

  const { data: categories = [] } = useQuery<GalleryCategory[]>({
    queryKey: ["/api/admin/gallery-categories"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertGalleryItem) => {
      const result = await apiRequest("/api/admin/gallery-items", "POST", data);
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery-items"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Gallery item created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create gallery item: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertGalleryItem> }) => {
      const result = await apiRequest(`/api/admin/gallery-items/${id}`, "PATCH", data);
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery-items"] });
      setIsEditDialogOpen(false);
      resetForm();
      setSelectedItem(null);
      toast({
        title: "Success",
        description: "Gallery item updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update gallery item",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/admin/gallery-items/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/gallery-items"] });
      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      categoryId: "",
      imageUrl: "",
      status: "active",
      sortOrder: 0
    });
  };

  const handleCreate = () => {
    if (formData.categoryId === "") return;
    createMutation.mutate({
      ...formData,
      categoryId: Number(formData.categoryId)
    });
  };

  const handleUpdate = () => {
    if (!selectedItem || formData.categoryId === "") return;
    updateMutation.mutate({ 
      id: selectedItem.id, 
      data: {
        ...formData,
        categoryId: Number(formData.categoryId)
      }
    });
  };

  const handleEdit = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormData({
      categoryId: item.categoryId,
      imageUrl: item.imageUrl,
      status: item.status || "active",
      sortOrder: item.sortOrder || 0,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: GalleryItem) => {
    if (window.confirm(`Are you sure you want to delete this gallery item?`)) {
      deleteMutation.mutate(item.id);
    }
  };

  const handleSort = (field: keyof GalleryItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.title || 'Unknown Category';
  };

  // Filter and sort items
  const filteredAndSortedItems = (() => {
    let filtered = items.filter(item => {
      const categoryName = getCategoryName(item.categoryId);
      const matchesSearch = categoryName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
      const matchesCategory = selectedCategory === "all" || item.categoryId.toString() === selectedCategory;
      return matchesSearch && matchesStatus && matchesCategory;
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

  const getSortIcon = (field: keyof GalleryItem) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6" data-testid="gallery-items-manager">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gallery Items</h2>
          <p className="text-slate-600">Manage your gallery images</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              data-testid="button-add-item"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Gallery Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="create-category">Category</Label>
                <Select value={formData.categoryId.toString()} onValueChange={(value) => setFormData({ ...formData, categoryId: parseInt(value) })}>
                  <SelectTrigger data-testid="select-create-category">
                    <SelectValue placeholder="Select category" />
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
                <Label htmlFor="create-imageUrl">Image URL</Label>
                <Input
                  id="create-imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Image URL"
                  data-testid="input-create-image"
                />
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
                disabled={!formData.imageUrl.trim() || formData.categoryId === "" || createMutation.isPending}
                className="w-full"
                data-testid="button-save-create"
              >
                {createMutation.isPending ? "Creating..." : "Create Item"}
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
            placeholder="Search by category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-filter-category">
            <SelectValue />
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

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Gallery Items ({filteredAndSortedItems.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />
              ))}
            </div>
          ) : filteredAndSortedItems.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              {searchTerm || selectedStatus !== "all" || selectedCategory !== "all" ? "No items match your search criteria." : "No gallery items found. Create your first item to get started."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-2 font-medium text-slate-700">Image</th>
                    <th 
                      className="text-left py-3 px-2 font-medium text-slate-700 cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('categoryId')}
                      data-testid="header-category"
                    >
                      <div className="flex items-center gap-1">
                        Category {getSortIcon('categoryId')}
                      </div>
                    </th>
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
                  {filteredAndSortedItems.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-2">
                        <img src={item.imageUrl} alt="Gallery item" className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td className="py-3 px-2" data-testid={`cell-category-${item.id}`}>
                        {getCategoryName(item.categoryId)}
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2" data-testid={`cell-order-${item.id}`}>
                        {item.sortOrder || 0}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            data-testid={`button-edit-${item.id}`}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item)}
                            className="text-red-600 hover:text-red-700"
                            data-testid={`button-delete-${item.id}`}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Gallery Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.categoryId.toString()} onValueChange={(value) => setFormData({ ...formData, categoryId: parseInt(value) })}>
                <SelectTrigger data-testid="select-edit-category">
                  <SelectValue />
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
              <Label htmlFor="edit-imageUrl">Image URL</Label>
              <Input
                id="edit-imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Image URL"
                data-testid="input-edit-image"
              />
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
              disabled={!formData.imageUrl.trim() || formData.categoryId === "" || updateMutation.isPending}
              className="w-full"
              data-testid="button-save-edit"
            >
              {updateMutation.isPending ? "Updating..." : "Update Item"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}