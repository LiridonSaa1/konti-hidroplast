import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, FolderOpen, Settings, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BrochureCategory, InsertBrochureCategory } from "@shared/schema";

interface CategoryFormData {
  title: string;
  description: string;
  status: string;
  active: boolean;
  sortOrder: number;
}

const STATUS_OPTIONS = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
  { value: "inactive", label: "Inactive", color: "bg-gray-100 text-gray-800" }
];

export function BrochureCategoriesManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BrochureCategory | null>(null);
  const [sortField, setSortField] = useState<keyof BrochureCategory | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState<CategoryFormData>({
    title: "",
    description: "",
    status: "active",
    active: true,
    sortOrder: 0
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery<BrochureCategory[]>({
    queryKey: ["/api/admin/brochure-categories"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertBrochureCategory) => {
      console.log("Creating brochure category:", data);
      const result = await apiRequest("/api/admin/brochure-categories", "POST", data);
      console.log("Creation result:", result);
      return result.json();
    },
    onSuccess: (data) => {
      console.log("Creation success:", data);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brochure-categories"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Brochure category created successfully",
      });
    },
    onError: (error) => {
      console.error("Creation error:", error);
      toast({
        title: "Error",
        description: `Failed to create brochure category: ${error.message || 'Unknown error'}`,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertBrochureCategory> }) => {
      const result = await apiRequest(`/api/admin/brochure-categories/${id}`, "PATCH", data);
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brochure-categories"] });
      setIsEditDialogOpen(false);
      resetForm();
      setSelectedCategory(null);
      toast({
        title: "Success",
        description: "Brochure category updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update brochure category",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const result = await apiRequest(`/api/admin/brochure-categories/${id}`, "DELETE");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brochure-categories"] });
      toast({
        title: "Success",
        description: "Brochure category deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete brochure category",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "active",
      active: true,
      sortOrder: 0
    });
  };

  const handleCreate = () => {
    const categoryData: InsertBrochureCategory = {
      title: formData.title,
      description: formData.description || null,
      status: formData.status,
      active: formData.active,
      sortOrder: formData.sortOrder
    };
    createMutation.mutate(categoryData);
  };

  const handleEdit = (category: BrochureCategory) => {
    setSelectedCategory(category);
    // Derive status from active field if status is not properly set
    const derivedStatus = category.status || (category.active ? 'active' : 'inactive');
    setFormData({
      title: category.title,
      description: category.description || "",
      status: derivedStatus,
      active: category.active || true,
      sortOrder: category.sortOrder || 0
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedCategory) return;
    
    const updateData: Partial<InsertBrochureCategory> = {
      title: formData.title,
      description: formData.description || null,
      status: formData.status,
      active: formData.active,
      sortOrder: formData.sortOrder
    };
    updateMutation.mutate({ id: selectedCategory.id, data: updateData });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSort = (field: keyof BrochureCategory) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof BrochureCategory) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const filteredAndSortedCategories = categories
    .filter((category) => {
      const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = selectedStatus === "all" || category.status === selectedStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? 1 : -1;
      if (bValue == null) return sortDirection === 'asc' ? -1 : 1;
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const getStatusBadgeColor = (status: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status);
    return option?.color || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6" data-testid="brochure-categories-manager">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">Brochure Categories</h1>
          <p className="text-gray-600" data-testid="page-description">
            Manage brochure categories with titles, descriptions, and status
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" data-testid="button-create-category">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" data-testid="dialog-create-category">
            <DialogHeader>
              <DialogTitle>Create New Brochure Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter category title"
                  data-testid="input-title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter category description"
                  rows={3}
                  data-testid="input-description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ 
                      ...formData, 
                      status: value,
                      active: value === 'active'
                    })}
                  >
                    <SelectTrigger data-testid="select-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
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
                    data-testid="input-sort-order"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  data-testid="button-cancel-create"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!formData.title.trim() || createMutation.isPending}
                  data-testid="button-save-create"
                >
                  {createMutation.isPending ? "Creating..." : "Create Category"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card data-testid="filters-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger data-testid="filter-status">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      {isLoading ? (
        <div className="text-center py-12" data-testid="loading-state">
          <Settings className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Loading categories...</p>
        </div>
      ) : filteredAndSortedCategories.length === 0 ? (
        <Card data-testid="empty-state">
          <CardContent className="text-center py-12">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedStatus !== "all" 
                ? "No categories match your current filters"
                : "Get started by creating your first brochure category"}
            </p>
            {!searchTerm && selectedStatus === "all" && (
              <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-create-first">
                <Plus className="h-4 w-4 mr-2" />
                Create First Category
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle data-testid="categories-table-title">
              Brochure Categories ({filteredAndSortedCategories.length})
            </CardTitle>
            <CardDescription>
              All brochure categories in your database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('title')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Title
                      {getSortIcon('title')}
                    </Button>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('status')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Status
                      {getSortIcon('status')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('active')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Active
                      {getSortIcon('active')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('sortOrder')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Sort Order
                      {getSortIcon('sortOrder')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('createdAt')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Created
                      {getSortIcon('createdAt')}
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedCategories.map((category) => (
                  <TableRow key={category.id} data-testid={`category-row-${category.id}`}>
                    <TableCell className="font-medium" data-testid={`category-title-${category.id}`}>
                      {category.title}
                    </TableCell>
                    <TableCell data-testid={`category-description-${category.id}`}>
                      {category.description || (
                        <span className="text-slate-400 text-sm">No description</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={getStatusBadgeColor(category.status)}
                        data-testid={`category-status-${category.id}`}
                      >
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={category.active ? "default" : "secondary"} 
                        data-testid={`category-active-${category.id}`}
                      >
                        {category.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`category-sort-order-${category.id}`}>
                      {category.sortOrder || 0}
                    </TableCell>
                    <TableCell data-testid={`category-created-${category.id}`}>
                      {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(category)}
                          data-testid={`button-edit-${category.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              data-testid={`button-delete-${category.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-testid={`dialog-delete-${category.id}`}>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{category.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(category.id)}
                                className="bg-red-600 hover:bg-red-700"
                                data-testid="button-confirm-delete"
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl" data-testid="dialog-edit-category">
          <DialogHeader>
            <DialogTitle>Edit Brochure Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter category title"
                data-testid="input-edit-title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter category description"
                rows={3}
                data-testid="input-edit-description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({ 
                    ...formData, 
                    status: value,
                    active: value === 'active'
                  })}
                >
                  <SelectTrigger data-testid="select-edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-sortOrder">Sort Order</Label>
                <Input
                  id="edit-sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                  data-testid="input-edit-sort-order"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                data-testid="button-cancel-edit"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={!formData.title.trim() || updateMutation.isPending}
                data-testid="button-save-edit"
              >
                {updateMutation.isPending ? "Updating..." : "Update Category"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}