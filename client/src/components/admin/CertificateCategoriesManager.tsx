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
  description?: string;
  sortOrder: number;
  status: string;
  translations?: any;
  defaultLanguage?: string;
};

const categoryFormSchema = z.object({
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

type CategoryForm = z.infer<typeof categoryFormSchema>;

export function CertificateCategoriesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CertificateCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof CertificateCategory>("sortOrder");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language: currentLanguage } = useLanguage();

  const form = useForm<CategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
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

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["/api/admin/certificate-categories"],
  });

  const createMutation = useMutation({
    mutationFn: (data: CategoryForm) =>
      apiRequest("/api/admin/certificate-categories", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-categories"] });
      setIsOpen(false);
      form.reset();
      toast({ title: "Category created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create category", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryForm }) =>
      apiRequest(`/api/admin/certificate-categories/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-categories"] });
      setIsOpen(false);
      setEditingCategory(null);
      form.reset();
      toast({ title: "Category updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update category", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/admin/certificate-categories/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/certificate-categories"] });
      toast({ title: "Category deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete category", variant: "destructive" });
    },
  });

  const filteredCategories = (categories as CertificateCategory[])
    .filter((category: CertificateCategory) => {
      const title = category.translations && category.translations[currentLanguage]?.title 
        ? category.translations[currentLanguage].title 
        : category.title;
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a: CertificateCategory, b: CertificateCategory) => {
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

  const handleSort = (field: keyof CertificateCategory) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (category: CertificateCategory) => {
    setEditingCategory(category);
    
    // Get existing translations or create defaults
    const existingTranslations = category.translations || {};
    
    form.reset({
      title: category.title,
      description: category.description || "",
      sortOrder: category.sortOrder,
      status: category.status as "active" | "inactive",
      translations: {
        en: { 
          title: existingTranslations.en?.title || category.title, 
          description: existingTranslations.en?.description || category.description || "" 
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
      defaultLanguage: category.defaultLanguage || "en",
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data: CategoryForm) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingCategory(null);
      form.reset({
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
    return <div>Loading categories...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certificate Categories</h2>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificate Categories</CardTitle>
          <CardDescription>
            Manage certificate categories and their translations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
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
              {filteredCategories.map((category: CertificateCategory) => {
                const title = category.translations && category.translations[currentLanguage]?.title 
                  ? category.translations[currentLanguage].title 
                  : category.title;
                const description = category.translations && category.translations[currentLanguage]?.description 
                  ? category.translations[currentLanguage].description 
                  : category.description;

                return (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{title}</TableCell>
                    <TableCell>{description || "-"}</TableCell>
                    <TableCell>{category.sortOrder}</TableCell>
                    <TableCell>
                      <Badge variant={category.status === "active" ? "default" : "secondary"}>
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
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
              {editingCategory ? "Edit Category" : "Add New Category"}
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
                  {editingCategory ? "Update" : "Create"} Category
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}