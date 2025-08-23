import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, BookOpen, Download, Eye, Upload, Image, FileText, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Brochure, InsertBrochure, BrochureCategory } from "@shared/schema";
import { TranslationHelper } from "./TranslationHelper";
import { TranslatableFieldEditor } from "./TranslatableFieldEditor";

interface BrochureEntry {
  id: string;
  pdfFile: File | null;
  pdfUrl: string;
  imageFile: File | null;
  imageUrl: string;
  language: string;
}

interface BrochureFormData {
  name: string;
  category: string;
  language: string;
  pdfFile: File | null;
  pdfUrl: string;
  imageFile: File | null;
  imageUrl: string;
  status: string;
  active: boolean;
  sortOrder: number;
  entries: BrochureEntry[];
  translations: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  };
}

export function BrochuresManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isTranslationDialogOpen, setIsTranslationDialogOpen] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState<Brochure | null>(null);
  const [formData, setFormData] = useState<BrochureFormData>({
    name: "",
    category: "",
    language: "en",
    pdfFile: null,
    pdfUrl: "",
    imageFile: null,
    imageUrl: "",
    status: "active",
    active: true,
    sortOrder: 0,
    entries: [{
      id: "1",
      pdfFile: null,
      pdfUrl: "",
      imageFile: null,
      imageUrl: "",
      language: "en"
    }],
    translations: {
      en: {},
      mk: {},
      de: {}
    }
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
    const matchesLanguage = selectedLanguage === "all" || brochure.language === selectedLanguage;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

    const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      language: "en",
      pdfFile: null,
      pdfUrl: "",
      imageFile: null,
      imageUrl: "",
      status: "active",
      active: true,
      sortOrder: 0,
      entries: [{
        id: "1",
        pdfFile: null,
        pdfUrl: "",
        imageFile: null,
        imageUrl: "",
        language: "en"
      }],
      translations: {
        en: {},
        mk: {},
        de: {}
      }
    });
  };

  const handleEdit = (brochure: Brochure) => {
    setSelectedBrochure(brochure);
    setFormData({
      name: brochure.name,
      category: brochure.category,
      language: brochure.language || "en",
      pdfFile: null, // Will be handled separately for existing files
      pdfUrl: brochure.pdfUrl || "",
      imageFile: null, // Will be handled separately for existing files
      imageUrl: brochure.imageUrl || "",
      status: brochure.status || "active",
      active: brochure.active ?? true,
      sortOrder: brochure.sortOrder || 0,
      entries: [{
        id: "1",
        pdfFile: null,
        pdfUrl: brochure.pdfUrl || "",
        imageFile: null,
        imageUrl: brochure.imageUrl || "",
        language: brochure.language || "en"
      }],
      translations: (brochure as any).translations || {
        en: {},
        mk: {},
        de: {}
      }
    });
    setIsEditDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Check if we have either a PDF file, PDF URL, or existing PDF for editing
    if (!formData.pdfFile && !formData.pdfUrl && !selectedBrochure?.pdfUrl) {
      toast({
        title: "Error",
        description: "Please provide either a PDF file or PDF URL",
        variant: "destructive",
      });
      return;
    }

    let pdfUrl = formData.pdfUrl; // Start with URL if provided
    let imageUrl = formData.imageUrl; // Start with URL if provided

    // Handle PDF file upload (only if no URL is provided)
    if (formData.pdfFile && !formData.pdfUrl) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.pdfFile);

      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload PDF file');
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

    // Handle image file upload (only if no URL is provided)
    if (formData.imageFile && !formData.imageUrl) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.imageFile);

      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image file');
        }

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url;
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload image file",
          variant: "destructive",
        });
        return;
      }
    }

    // Get the name from translations or fallback to the direct name input (matching categories pattern)
    const enName = formData.translations?.en?.name || formData.name;

    const submissionData = {
      title: enName, // Use name as title
      name: enName,
      category: formData.category,
      language: formData.language as "en" | "mk" | "de",
      pdfUrl: pdfUrl || (selectedBrochure?.pdfUrl || ""),
      imageUrl: imageUrl || (selectedBrochure?.imageUrl || ""),
      status: formData.status as "active" | "inactive" | "draft",
      active: formData.active,
      sortOrder: formData.sortOrder,
      translations: formData.translations
    };

    if (selectedBrochure) {
      updateMutation.mutate({ id: selectedBrochure.id, data: submissionData });
    } else {
      createMutation.mutate(submissionData);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64" data-testid="brochures-loading">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search brochures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-brochures"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger data-testid="select-brochure-category">
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
            <div className="w-full sm:w-48">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger data-testid="select-brochure-language-filter">
                  <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="mk">Macedonian</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brochures Table */}
      {filteredBrochures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle data-testid="brochures-table-title">
              Brochures ({filteredBrochures.length})
            </CardTitle>
            <CardDescription>
              All brochures in your database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>PDF</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBrochures.map((brochure) => (
                  <TableRow key={brochure.id} data-testid={`brochure-row-${brochure.id}`}>
                    <TableCell className="font-medium" data-testid={`brochure-name-${brochure.id}`}>
                      {brochure.name}
                    </TableCell>
                    <TableCell data-testid={`brochure-category-${brochure.id}`}>
                      <Badge variant="outline">
                        {brochure.category}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`brochure-language-${brochure.id}`}>
                      <Badge variant="secondary">
                        {brochure.language === "en" ? "English" : 
                         brochure.language === "mk" ? "Macedonian" : 
                         brochure.language === "de" ? "German" : 
                         brochure.language?.toUpperCase() || "EN"}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`brochure-description-${brochure.id}`}>
                      {brochure.description ? (
                        <span className="text-sm line-clamp-2 max-w-xs">
                          {brochure.description}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm">No description</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={brochure.active ? "default" : "secondary"} 
                        data-testid={`brochure-status-${brochure.id}`}
                      >
                        {brochure.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {brochure.pdfUrl ? (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => window.open(brochure.pdfUrl, '_blank')}
                            data-testid={`button-view-pdf-${brochure.id}`}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View PDF
                          </Button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">No PDF</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {brochure.imageUrl ? (
                        <div className="flex items-center gap-1">
                          <img 
                            src={brochure.imageUrl} 
                            alt={brochure.name}
                            className="h-8 w-8 object-cover rounded"
                          />
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => brochure.imageUrl && window.open(brochure.imageUrl, '_blank')}
                            data-testid={`button-view-image-${brochure.id}`}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">No Image</span>
                      )}
                    </TableCell>
                    <TableCell data-testid={`brochure-order-${brochure.id}`}>
                      {brochure.sortOrder || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(brochure.pdfUrl, '_blank')}
                          data-testid={`button-download-brochure-${brochure.id}`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedBrochure(brochure);
                            setIsTranslationDialogOpen(true);
                          }}
                          title="Translate PDF"
                          data-testid={`button-translate-brochure-${brochure.id}`}
                        >
                          <Languages className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(brochure)}
                          data-testid={`button-edit-brochure-${brochure.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              data-testid={`button-delete-brochure-${brochure.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
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
                                onClick={() => handleDelete(brochure.id)}
                                className="bg-red-600 hover:bg-red-700"
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

      {filteredBrochures.length === 0 && (
        <Card className="p-8 text-center" data-testid="brochures-empty-state">
          <BookOpen className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No brochures found</h3>
          <p className="text-slate-600 mb-4">
            {searchTerm || selectedCategory !== "all" 
              ? "No brochures match your current filters"
              : "Get started by adding your first brochure"
            }
          </p>
          {!searchTerm && selectedCategory === "all" && (
            <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-add-first-brochure">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Brochure
            </Button>
          )}
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

      {/* Translation Helper Dialog */}
      {selectedBrochure && (
        <TranslationHelper
          brochure={selectedBrochure}
          isOpen={isTranslationDialogOpen}
          onClose={() => {
            setIsTranslationDialogOpen(false);
            setSelectedBrochure(null);
          }}
        />
      )}
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFormData({ ...formData, imageFile: file });
    } else if (file) {
      alert('Please select an image file (JPG, PNG, etc.)');
      e.target.value = '';
    }
  };

  return (
    <DialogContent className="max-w-2xl" data-testid="brochure-form-dialog">
      <DialogHeader>
        <DialogTitle data-testid="brochure-form-title">{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        {/* Multi-language Name Field - Updated */}
        <TranslatableFieldEditor
          label="Brochure Name *"
          fieldName="name"
          type="text"
          currentTranslations={formData.translations}
          originalValue={formData.name}
          defaultLanguage={formData.language || "en"}
          onChange={(translations) => {
            setFormData({ 
              ...formData, 
              translations,
              name: translations.en?.name || formData.name
            });
          }}
        />
        
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

        {/* Language Selection Row */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="space-y-2">
            <Label htmlFor="language" className="text-blue-900 font-semibold">Language Version *</Label>
            <p className="text-sm text-blue-700 mb-3">Select the language for this brochure version. You can create multiple versions in different languages.</p>
            <Select
              value={formData.language}
              onValueChange={(value) => setFormData({ ...formData, language: value })}
            >
              <SelectTrigger data-testid="select-brochure-language" className="bg-white border-blue-300">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="mk">🇲🇰 Macedonian</SelectItem>
                <SelectItem value="de">🇩🇪 German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Label htmlFor="pdfFile">PDF File *</Label>
            {formData.pdfFile ? (
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">{formData.pdfFile.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({ ...formData, pdfFile: null })}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  id="pdfFile"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  data-testid="input-brochure-pdf-file"
                  className="sr-only"
                />
                <label
                  htmlFor="pdfFile"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-1 text-sm text-gray-600 font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF files only (max 10MB)
                    </p>
                  </div>
                </label>
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="pdfUrl" className="text-sm text-gray-600">Or enter PDF URL</Label>
              <Input
                id="pdfUrl"
                type="url"
                value={formData.pdfUrl}
                onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                placeholder="https://example.com/document.pdf"
                data-testid="input-brochure-pdf-url"
                className="text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="imageFile">Brochure Image</Label>
            {formData.imageFile ? (
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{formData.imageFile.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({ ...formData, imageFile: null })}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  data-testid="input-brochure-image-file"
                  className="sr-only"
                />
                <label
                  htmlFor="imageFile"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-1 text-sm text-gray-600 font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      Images only (max 10MB)
                    </p>
                  </div>
                </label>
              </div>
            )}
            <div className="space-y-1">
              <Label htmlFor="imageUrl" className="text-sm text-gray-600">Or enter image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                data-testid="input-brochure-image-url"
                className="text-sm"
              />
            </div>
          </div>
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
          disabled={isLoading || !(formData.translations?.en?.name || formData.name).trim() || !formData.category || (!formData.pdfFile && !formData.pdfUrl && title.includes("Add"))}
          data-testid="button-save-brochure"
        >
          {isLoading ? "Saving..." : "Save Brochure"}
        </Button>
      </div>
    </DialogContent>
  );
}