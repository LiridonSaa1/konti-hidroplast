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
import { Plus, Edit, Trash2, Search, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type CertificateCategory = {
  id: number;
  title: string;
  status: string;
  translations?: any;
  defaultLanguage?: string;
};

type CertificateSubcategory = {
  id: number;
  categoryId: number;
  title: string;
  description?: string;
  sortOrder: number;
  status: string;
  translations?: any;
  defaultLanguage?: string;
};

const subcategoryFormSchema = z.object({
  categoryId: z.number().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  sortOrder: z.number().int().min(0).default(0),
  status: z.enum(["active", "inactive"]).default("active"),
  translations: z.object({
    en: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    mk: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    de: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
  }).optional(),
  defaultLanguage: z.string().default("en"),
});

type SubcategoryForm = z.infer<typeof subcategoryFormSchema>;

export function CertificateSubcategoriesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<CertificateSubcategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sortField, setSortField] = useState<keyof CertificateSubcategory>("sortOrder");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language: currentLanguage } = useLanguage();

  const form = useForm<SubcategoryForm>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues: {
      categoryId: 0,
      title: "",
      description: "",
      sortOrder: 0,
      status: "active",
      translations: {
        en: { title: "", description: "" },
        mk: { title: "", description: "" },
        de: { title: "", description: "" },
      },
      defaultLanguage: "en",
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/admin/certificate-categories"],
  });

  const { data: subcategories = [], isLoading } = useQuery({
    queryKey: ["/api/admin/certificate-subcategories"],
  });

  const createMutation = useMutation({
    mutationFn: (data: SubcategoryForm) =>
      apiRequest("/api/admin/certificate-subcategories", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-subcategories"] });
      setIsOpen(false);
      form.reset();
      toast({ title: "Subcategory created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create subcategory", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: SubcategoryForm }) =>
      apiRequest(`/api/admin/certificate-subcategories/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-subcategories"] });
      setIsOpen(false);
      setEditingSubcategory(null);
      form.reset();
      toast({ title: "Subcategory updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update subcategory", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/admin/certificate-subcategories/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-subcategories"] });
      toast({ title: "Subcategory deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete subcategory", variant: "destructive" });
    },
  });

  const getCategoryName = (categoryId: number) => {
    const category = (categories as CertificateCategory[]).find((c: CertificateCategory) => c.id === categoryId);
    if (!category) return "Unknown";
    
    // Try to get translated title
    if (category.translations && category.translations[currentLanguage]?.title) {
      return category.translations[currentLanguage].title;
    }
    return category.title || "Unknown";
  };

  const filteredSubcategories = (subcategories as CertificateSubcategory[])
    .filter((subcategory: CertificateSubcategory) => {
      const title = subcategory.translations && subcategory.translations[currentLanguage]?.title 
        ? subcategory.translations[currentLanguage].title 
        : subcategory.title;
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || categoryFilter === "all" || subcategory.categoryId.toString() === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a: CertificateSubcategory, b: CertificateSubcategory) => {
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
    
    // Get existing translations or create defaults
    const existingTranslations = subcategory.translations || {};
    
    form.reset({
      categoryId: subcategory.categoryId,
      title: subcategory.title,
      description: subcategory.description || "",
      sortOrder: subcategory.sortOrder,
      status: subcategory.status as "active" | "inactive",
      translations: {
        en: { 
          title: existingTranslations.en?.title || subcategory.title, 
          description: existingTranslations.en?.description || subcategory.description || "" 
        },
        mk: { 
          title: existingTranslations.mk?.title || "", 
          description: existingTranslations.mk?.description || "" 
        },
        de: { 
          title: existingTranslations.de?.title || "", 
          description: existingTranslations.de?.description || "" 
        },
      },
      defaultLanguage: subcategory.defaultLanguage || "en",
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data: SubcategoryForm) => {
    if (editingSubcategory) {
      updateMutation.mutate({ id: editingSubcategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingSubcategory(null);
      form.reset({
        categoryId: 0,
        title: "",
        description: "",
        sortOrder: 0,
        status: "active",
        translations: {
          en: { title: "", description: "" },
          mk: { title: "", description: "" },
          de: { title: "", description: "" },
        },
        defaultLanguage: "en",
      });
    }
  };

  if (isLoading) {
    return <div>Loading subcategories...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certificate Subcategories</h2>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Subcategory
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subcategories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {(categories as CertificateCategory[]).map((category: CertificateCategory) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.translations && category.translations[currentLanguage]?.title 
                  ? category.translations[currentLanguage].title 
                  : category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subcategories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificate Subcategories</CardTitle>
          <CardDescription>
            Manage certificate subcategories and their translations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("title")}
                    className="h-8 flex items-center gap-1"
                  >
                    Title
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("sortOrder")}
                    className="h-8 flex items-center gap-1"
                  >
                    Sort Order
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubcategories.map((subcategory: CertificateSubcategory) => {
                const title = subcategory.translations && subcategory.translations[currentLanguage]?.title 
                  ? subcategory.translations[currentLanguage].title 
                  : subcategory.title;
                const description = subcategory.translations && subcategory.translations[currentLanguage]?.description 
                  ? subcategory.translations[currentLanguage].description 
                  : subcategory.description;

                return (
                  <TableRow key={subcategory.id}>
                    <TableCell>{getCategoryName(subcategory.categoryId)}</TableCell>
                    <TableCell className="font-medium">{title}</TableCell>
                    <TableCell>{description || "-"}</TableCell>
                    <TableCell>{subcategory.sortOrder}</TableCell>
                    <TableCell>
                      <Badge variant={subcategory.status === "active" ? "default" : "secondary"}>
                        {subcategory.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(subcategory)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(subcategory.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(categories as CertificateCategory[]).map((category: CertificateCategory) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.translations && category.translations[currentLanguage]?.title 
                                ? category.translations[currentLanguage].title 
                                : category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                {/* Description with Language Tabs */}
                <div className="space-y-3">
                  <FormLabel className="text-base font-medium">Description</FormLabel>
                  <Tabs defaultValue="en" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="en" className="text-xs">🇺🇸 EN</TabsTrigger>
                      <TabsTrigger value="mk" className="text-xs">🇲🇰 MK</TabsTrigger>
                      <TabsTrigger value="de" className="text-xs">🇩🇪 DE</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="en" className="mt-3">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter description in English" 
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
                        name="translations.mk.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter description in Macedonian" 
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
                        name="translations.de.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter description in German" 
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
                    name="sortOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort Order</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
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
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
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

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingSubcategory ? "Update" : "Create"} Subcategory
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}