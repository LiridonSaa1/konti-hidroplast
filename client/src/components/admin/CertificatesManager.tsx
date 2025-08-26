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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


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
  title: string;
  categoryId: number;
  subcategoryId?: number;
  subcategoryItemId?: number;
  imageUrl: string;
  pdfUrl: string; // Added pdfUrl to the type
  sortOrder: number;
  status: string;
  translations?: any;
  defaultLanguage?: string;
};

type SubcategoryItem = {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  categoryId: number;
  subcategoryId: number;
  sortOrder: number;
  active: boolean;
  translations?: any;
  defaultLanguage?: string;
  createdAt: string;
  updatedAt: string;
};

// Local form schema
const certificateFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  categoryId: z.number().min(1, "Category is required"),
  subcategoryId: z.number().optional(),
  subcategoryItemId: z.number().optional(),
  imageUrl: z.string().optional(), // Made optional since we now have both image and PDF
  pdfUrl: z.string().optional(), // Added PDF URL field
  sortOrder: z.number().int().min(0).default(0),
  status: z.enum(["active", "inactive"]).default("active"),
  translations: z.object({
    en: z.object({
      title: z.string().optional(),
    }).optional(),
    mk: z.object({
      title: z.string().optional(),
    }).optional(),
    de: z.object({
      title: z.string().optional(),
    }).optional(),
  }).optional(),
  defaultLanguage: z.string().default("en"),
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
      title: "",
      categoryId: 0,
      subcategoryId: undefined,
      subcategoryItemId: undefined,
      imageUrl: "",
      pdfUrl: "", // Initialize pdfUrl
      sortOrder: 0,
      status: "active",
      translations: {
        en: { title: "" },
        mk: { title: "" },
        de: { title: "" },
      },
      defaultLanguage: "en",
    },
  });

  const selectedCategoryId = form.watch("categoryId");

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/admin/certificate-categories"],
  });

  const { data: subcategories = [] } = useQuery({
    queryKey: ["/api/admin/certificate-subcategories"],
  });

  // Add query for subcategory items
  const { data: subcategoryItems = [] } = useQuery<SubcategoryItem[]>({
    queryKey: ["/api/admin/subcategory-items"],
    enabled: !!selectedCategoryId && !!form.watch("subcategoryId"),
  });

  const { data: certificates = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/admin/certificates"],
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  const createMutation = useMutation({
    mutationFn: (data: CertificateForm) =>
      apiRequest("/api/admin/certificates", "POST", data),
    onSuccess: () => {
      // Invalidate and refetch all related queries
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-categories"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-subcategories"] });
      
      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: ["/api/admin/certificates"] });
      
      // Also call the local refetch function
      refetch();
      
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
      // Invalidate and refetch all related queries
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-categories"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-subcategories"] });
      
      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: ["/api/admin/certificates"] });
      
      // Also call the local refetch function
      refetch();
      
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
      // Invalidate and refetch all related queries
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-categories"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-subcategories"] });
      
      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: ["/api/admin/certificates"] });
      
      // Also call the local refetch function
      refetch();
      
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

  const getSubcategoryName = (subcategoryId: number | undefined) => {
    if (!subcategoryId) return "No subcategory";
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
      const matchesSubcategory = !subcategoryFilter || subcategoryFilter === "all" || (certificate.subcategoryId ? certificate.subcategoryId.toString() === subcategoryFilter : subcategoryFilter === "all");
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
    const existingTranslations = (certificate.translations as any) || {};
    
    form.reset({
      title: existingTranslations.en?.title || certificate.title || "",
      categoryId: certificate.categoryId,
      subcategoryId: certificate.subcategoryId || undefined,
      subcategoryItemId: certificate.subcategoryItemId || undefined,
      imageUrl: certificate.imageUrl,
      pdfUrl: certificate.pdfUrl, // Set pdfUrl for editing
      sortOrder: certificate.sortOrder,
      status: certificate.status as "active" | "inactive",
      translations: {
        en: { title: existingTranslations.en?.title || certificate.title || "" },
        mk: { title: existingTranslations.mk?.title || "" },
        de: { title: existingTranslations.de?.title || "" },
      },
      defaultLanguage: certificate.defaultLanguage || "en",
    });
    setEditingCertificate(certificate);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data: CertificateForm) => {
    console.log('=== Form Submission Data ===');
    console.log('Raw form data:', data);
    console.log('Image URL:', data.imageUrl);
    console.log('PDF URL:', data.pdfUrl);
    console.log('Translations:', data.translations);
    console.log('Default language:', data.defaultLanguage);
    
    // Ensure at least one file is provided
    if (!data.imageUrl && !data.pdfUrl) {
      toast({ 
        title: "File Required", 
        description: "Please upload either an image or PDF file",
        variant: "destructive"
      });
      return;
    }
    
    if (editingCertificate) {
      console.log('Updating certificate with ID:', editingCertificate.id);
      updateMutation.mutate({ id: editingCertificate.id, data });
    } else {
      console.log('Creating new certificate');
      createMutation.mutate(data);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingCertificate(null);
      form.reset({
        title: "",
        categoryId: 0,
        subcategoryId: undefined,
        subcategoryItemId: undefined,
        imageUrl: "",
        pdfUrl: "", // Reset pdfUrl
        sortOrder: 0,
        status: "active",
        translations: {
          en: { title: "" },
          mk: { title: "" },
          de: { title: "" },
        },
        defaultLanguage: "en",
      });
    }
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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCertificate ? "Edit Certificate" : "Add New Certificate"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-6">
                  {/* Title with Language Tabs */}
                  <div className="space-y-3">
                    <FormLabel className="text-base font-medium">Title</FormLabel>
                    <Tabs defaultValue="en" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="en" className="text-xs">🇺🇸 EN</TabsTrigger>
                        <TabsTrigger value="mk" className="text-xs">🇲🇰 MK</TabsTrigger>
                        <TabsTrigger value="de" className="text-xs">🇩🇪 DE</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="en" className="mt-3">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  placeholder="Enter title in English" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      
                      <TabsContent value="mk" className="mt-3">
                        <FormField
                          control={form.control}
                          name="translations.mk.title"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  placeholder="Enter title in Macedonian" 
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      
                      <TabsContent value="de" className="mt-3">
                        <FormField
                          control={form.control}
                          name="translations.de.title"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input 
                                  placeholder="Enter title in German" 
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                  </div>

                  {/* Subcategory Items Field */}
                  {selectedCategoryId && form.watch("subcategoryId") && (
                    <FormField
                      control={form.control}
                      name="subcategoryItemId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategory Items</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              if (value === "none") {
                                field.onChange(undefined);
                              } else {
                                field.onChange(parseInt(value));
                              }
                            }} 
                            defaultValue={field.value?.toString() || "none"}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-subcategory-items">
                                <SelectValue placeholder="Select subcategory items (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">None (No specific items)</SelectItem>
                              {subcategoryItems
                                .filter(item => item.categoryId === selectedCategoryId && item.subcategoryId === form.watch("subcategoryId"))
                                .map((item) => (
                                  <SelectItem key={item.id} value={item.id.toString()}>
                                    {item.title}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Image (Optional)</FormLabel>
                      <FormControl>
                        <FileUpload
                          label="Image"
                          value={form.watch("imageUrl") || ""}
                          onChange={(url) => {
                            console.log('Image upload onChange called with URL:', url);
                            form.setValue("imageUrl", url);
                          }}
                          accept="image/*"
                          placeholder="Upload image or enter URL"
                          data-testid="file-upload-image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem>
                      <FormLabel>PDF (Optional)</FormLabel>
                      <FormControl>
                        <FileUpload
                          label="PDF"
                          value={form.watch("pdfUrl") || ""}
                          onChange={(url) => {
                            console.log('PDF upload onChange called with URL:', url);
                            form.setValue("pdfUrl", url);
                          }}
                          accept=".pdf"
                          placeholder="Upload PDF or enter URL"
                          data-testid="file-upload-pdf"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                </div>

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
                  <TableHead>Files</TableHead>
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
                  <TableCell data-testid={`files-${certificate.id}`}>
                    <div className="flex flex-col gap-2">
                      {/* Smart Display Logic: Show image if available, otherwise show PDF */}
                      {certificate.imageUrl ? (
                        // Show image if available
                        <div className="relative">
                          <img
                            src={certificate.imageUrl}
                            alt="Certificate Image"
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="text-xs text-gray-500 mt-1">Image</div>
                          {/* Show PDF indicator if both exist */}
                          {certificate.pdfUrl && (
                            <div className="absolute -top-1 -right-1 bg-blue-100 border border-blue-300 rounded-full w-5 h-5 flex items-center justify-center">
                              <div className="text-blue-600 text-xs font-bold">P</div>
                            </div>
                          )}
                        </div>
                      ) : certificate.pdfUrl ? (
                        // Show PDF if no image but PDF exists
                        <div className="relative">
                          <div className="w-12 h-12 bg-red-100 border border-red-300 rounded flex items-center justify-center">
                            <div className="text-red-600 font-bold text-xs">PDF</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">PDF</div>
                        </div>
                      ) : (
                        // No files indicator
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
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