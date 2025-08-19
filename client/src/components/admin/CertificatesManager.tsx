import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit, Trash2, Search, ArrowUpDown, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { FileUpload } from "@/components/ui/file-upload";


type CertificateCategory = {
  id: number;
  title: string;
  status: string;
};

type CertificateSubcategory = {
  id: number;
  categoryId: number;
  title: string;
  status: string;
};

type Certificate = {
  id: number;
  categoryId: number;
  subcategoryId: number;
  imageUrl: string;
  sortOrder: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

// Local form schema with custom validation
const certificateFormSchema = z.object({
  categoryId: z.number().min(1, "Category is required"),
  subcategoryId: z.number().optional(), // Make subcategory optional
  imageUrl: z.string().min(1, "Image is required"),
  sortOrder: z.number().int().min(0).default(0),
  status: z.enum(["active", "inactive"]).default("active"),
});

type CertificateForm = z.infer<typeof certificateFormSchema>;

export function CertificatesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [subcategoryFilter, setSubcategoryFilter] = useState<string>("");
  const [sortField, setSortField] = useState<keyof Certificate>("sortOrder");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CertificateForm>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      categoryId: 0,
      subcategoryId: undefined,
      imageUrl: "",
      sortOrder: 0,
      status: "active",
    },
  });

  const selectedCategoryId = form.watch("categoryId");

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/admin/certificate-categories"],
  });

  const { data: subcategories = [] } = useQuery({
    queryKey: ["/api/admin/certificate-subcategories"],
  });

  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ["/api/admin/certificates"],
  });

  const createMutation = useMutation({
    mutationFn: (data: CertificateForm) =>
      apiRequest("/api/admin/certificates", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificates"] });
      setIsOpen(false);
      form.reset();
      toast({ title: "Certificate created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create certificate", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CertificateForm }) =>
      apiRequest(`/api/admin/certificates/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificates"] });
      setIsOpen(false);
      setEditingCertificate(null);
      form.reset();
      toast({ title: "Certificate updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update certificate", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/admin/certificates/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificates"] });
      toast({ title: "Certificate deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete certificate", variant: "destructive" });
    },
  });

  const getCategoryName = (categoryId: number) => {
    const category = (categories as CertificateCategory[]).find((c: CertificateCategory) => c.id === categoryId);
    return category?.title || "Unknown";
  };

  const getSubcategoryName = (subcategoryId: number) => {
    const subcategory = (subcategories as CertificateSubcategory[]).find((s: CertificateSubcategory) => s.id === subcategoryId);
    return subcategory?.title || "Unknown";
  };

  const getFilteredSubcategories = () => {
    if (!selectedCategoryId) return [];
    return (subcategories as CertificateSubcategory[]).filter((s: CertificateSubcategory) => s.categoryId === selectedCategoryId);
  };

  const filteredCertificates = (certificates as Certificate[])
    .filter((certificate: Certificate) => {
      const categoryName = getCategoryName(certificate.categoryId);
      const subcategoryName = getSubcategoryName(certificate.subcategoryId);
      const matchesSearch = 
        categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subcategoryName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || categoryFilter === "all" || certificate.categoryId.toString() === categoryFilter;
      const matchesSubcategory = !subcategoryFilter || subcategoryFilter === "all" || certificate.subcategoryId.toString() === subcategoryFilter;
      return matchesSearch && matchesCategory && matchesSubcategory;
    })
    .sort((a: Certificate, b: Certificate) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleSort = (field: keyof Certificate) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    form.reset({
      categoryId: certificate.categoryId,
      subcategoryId: certificate.subcategoryId || undefined,
      imageUrl: certificate.imageUrl,
      sortOrder: certificate.sortOrder,
      status: certificate.status as "active" | "inactive",
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data: CertificateForm) => {
    if (editingCertificate) {
      updateMutation.mutate({ id: editingCertificate.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingCertificate(null);
      form.reset();
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    form.setValue("imageUrl", imageUrl);
  };

  if (isLoading) {
    return <div data-testid="loading">Loading certificates...</div>;
  }

  return (
    <div className="space-y-6" data-testid="certificates-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="certificates-title">Certificates</h2>
          <p className="text-slate-600" data-testid="certificates-description">
            Manage certificate documents and images for your organization
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-certificate">
              <Plus className="w-4 h-4 mr-2" />
              Add Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCertificate ? "Edit Certificate" : "Add Certificate"}
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
                        onValueChange={(value) => {
                          const categoryId = parseInt(value);
                          field.onChange(categoryId);
                          form.setValue("subcategoryId", undefined); // Reset subcategory when category changes
                        }}
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
                  name="subcategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          if (value === "none") {
                            field.onChange(undefined);
                          } else {
                            field.onChange(parseInt(value));
                          }
                        }} 
                        defaultValue={field.value?.toString() || "none"}
                        disabled={!selectedCategoryId}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-subcategory">
                            <SelectValue placeholder="Select a subcategory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None (No subcategory)</SelectItem>
                          {getFilteredSubcategories().map((subcategory: CertificateSubcategory) => (
                            <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                              {subcategory.title}
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
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Image</FormLabel>
                      <FormControl>
                        <FileUpload
                          label=""
                          value={field.value}
                          onChange={handleImageUpload}
                          accept="image/*"
                          placeholder="Upload certificate image or enter URL"
                          data-testid="file-upload-image"
                        />
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
                    onClick={() => handleDialogOpenChange(false)}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-submit"
                  >
                    {editingCertificate ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card data-testid="certificates-filters">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-certificates"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger data-testid="select-category-filter">
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
            <div className="w-full sm:w-48">
              <Select value={subcategoryFilter} onValueChange={setSubcategoryFilter}>
                <SelectTrigger data-testid="select-subcategory-filter">
                  <SelectValue placeholder="Filter by subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subcategories</SelectItem>
                  {(subcategories as CertificateSubcategory[]).map((subcategory: CertificateSubcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                      {subcategory.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredCertificates.length === 0 ? (
        <div className="text-center py-8 text-gray-500" data-testid="empty-state">
          {searchTerm || categoryFilter || subcategoryFilter ? "No certificates found matching your filters." : "No certificates yet."}
          {!searchTerm && !categoryFilter && !subcategoryFilter && (
            <div className="mt-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                data-testid="button-add-first-certificate"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Certificate
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle data-testid="certificates-table-title">
              Certificates ({filteredCertificates.length})
            </CardTitle>
            <CardDescription>
              All certificate documents in your database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {filteredCertificates.map((certificate: Certificate) => (
                <TableRow key={certificate.id} data-testid={`row-certificate-${certificate.id}`}>
                  <TableCell data-testid={`image-${certificate.id}`}>
                    {certificate.imageUrl ? (
                      <img
                        src={certificate.imageUrl}
                        alt="Certificate"
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell data-testid={`text-category-${certificate.id}`}>
                    {getCategoryName(certificate.categoryId)}
                  </TableCell>
                  <TableCell data-testid={`text-subcategory-${certificate.id}`}>
                    {getSubcategoryName(certificate.subcategoryId)}
                  </TableCell>
                  <TableCell data-testid={`text-order-${certificate.id}`}>
                    {certificate.sortOrder}
                  </TableCell>
                  <TableCell data-testid={`text-status-${certificate.id}`}>
                    <Badge variant={certificate.status === "active" ? "default" : "secondary"}>
                      {certificate.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(certificate)}
                        data-testid={`button-edit-${certificate.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(certificate.id)}
                        className="text-red-600 hover:text-red-700"
                        data-testid={`button-delete-${certificate.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}