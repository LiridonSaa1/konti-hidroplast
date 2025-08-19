import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit, Trash2, Search, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type CertificateCategory = {
  id: number;
  title: string;
  description: string | null;
  sortOrder: number;
  status: string;
};

type CertificateSubcategory = {
  id: number;
  categoryId: number;
  title: string;
  description: string | null;
  sortOrder: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

const certificateSubcategorySchema = z.object({
  categoryId: z.number().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  sortOrder: z.number().int().min(0).default(0),
  status: z.enum(["active", "inactive"]).default("active"),
});

type CertificateSubcategoryForm = z.infer<typeof certificateSubcategorySchema>;

export function CertificateSubcategoriesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<CertificateSubcategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortField, setSortField] = useState<keyof CertificateSubcategory>("sortOrder");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CertificateSubcategoryForm>({
    resolver: zodResolver(certificateSubcategorySchema),
    defaultValues: {
      categoryId: 0,
      title: "",
      description: "",
      sortOrder: 0,
      status: "active",
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/admin/certificate-categories"],
  });

  const { data: subcategories = [], isLoading } = useQuery({
    queryKey: ["/api/admin/certificate-subcategories"],
  });

  const createMutation = useMutation({
    mutationFn: (data: CertificateSubcategoryForm) =>
      apiRequest("/api/admin/certificate-subcategories", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-subcategories"] });
      setIsOpen(false);
      form.reset();
      toast({ title: "Certificate subcategory created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create certificate subcategory", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CertificateSubcategoryForm }) =>
      apiRequest(`/api/admin/certificate-subcategories/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-subcategories"] });
      setIsOpen(false);
      setEditingSubcategory(null);
      form.reset();
      toast({ title: "Certificate subcategory updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update certificate subcategory", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/admin/certificate-subcategories/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-subcategories"] });
      toast({ title: "Certificate subcategory deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete certificate subcategory", variant: "destructive" });
    },
  });

  const getCategoryName = (categoryId: number) => {
    const category = (categories as CertificateCategory[]).find((c: CertificateCategory) => c.id === categoryId);
    return category?.title || "Unknown";
  };

  const filteredSubcategories = (subcategories as CertificateSubcategory[])
    .filter((subcategory: CertificateSubcategory) => {
      const matchesSearch = subcategory.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || categoryFilter === "all" || subcategory.categoryId.toString() === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a: CertificateSubcategory, b: CertificateSubcategory) => {
      let aValue = a[sortField] || "";
      let bValue = b[sortField] || "";

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleSort = (field: keyof CertificateSubcategory) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (subcategory: CertificateSubcategory) => {
    setEditingSubcategory(subcategory);
    form.reset({
      categoryId: subcategory.categoryId,
      title: subcategory.title,
      description: subcategory.description || "",
      sortOrder: subcategory.sortOrder,
      status: subcategory.status as "active" | "inactive",
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this certificate subcategory?")) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data: CertificateSubcategoryForm) => {
    if (editingSubcategory) {
      updateMutation.mutate({ id: editingSubcategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setEditingSubcategory(null);
    form.reset();
  };

  if (isLoading) {
    return <div data-testid="loading">Loading certificate subcategories...</div>;
  }

  return (
    <div className="space-y-6" data-testid="certificate-subcategories-manager">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certificate Subcategories</h2>
        <Dialog open={isOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-subcategory">
              <Plus className="w-4 h-4 mr-2" />
              Add Subcategory
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingSubcategory ? "Edit Certificate Subcategory" : "Add Certificate Subcategory"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(categories as CertificateCategory[]).map((category: CertificateCategory) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input data-testid="input-title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea data-testid="input-description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sortOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort Order</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-sort-order"
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-status">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDialogClose}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit"
                  >
                    {editingSubcategory ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            data-testid="input-search"
            placeholder="Search subcategories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48" data-testid="select-category-filter">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {(categories as CertificateCategory[]).map((category: CertificateCategory) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredSubcategories.length === 0 ? (
        <div className="text-center py-8 text-gray-500" data-testid="empty-state">
          {searchTerm || categoryFilter ? "No subcategories found matching your filters." : "No certificate subcategories yet."}
          {!searchTerm && !categoryFilter && (
            <div className="mt-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                data-testid="button-add-first-subcategory"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Subcategory
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("title")}
                  data-testid="header-title"
                >
                  <div className="flex items-center gap-2">
                    Title
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("sortOrder")}
                  data-testid="header-sort-order"
                >
                  <div className="flex items-center gap-2">
                    Order
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("status")}
                  data-testid="header-status"
                >
                  <div className="flex items-center gap-2">
                    Status
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubcategories.map((subcategory: CertificateSubcategory) => (
                <TableRow key={subcategory.id} data-testid={`row-subcategory-${subcategory.id}`}>
                  <TableCell data-testid={`text-category-${subcategory.id}`}>
                    {getCategoryName(subcategory.categoryId)}
                  </TableCell>
                  <TableCell className="font-medium" data-testid={`text-title-${subcategory.id}`}>
                    {subcategory.title}
                  </TableCell>
                  <TableCell data-testid={`text-description-${subcategory.id}`}>
                    {subcategory.description || "—"}
                  </TableCell>
                  <TableCell data-testid={`text-order-${subcategory.id}`}>
                    {subcategory.sortOrder}
                  </TableCell>
                  <TableCell data-testid={`text-status-${subcategory.id}`}>
                    <Badge variant={subcategory.status === "active" ? "default" : "secondary"}>
                      {subcategory.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(subcategory)}
                        data-testid={`button-edit-${subcategory.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(subcategory.id)}
                        data-testid={`button-delete-${subcategory.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}