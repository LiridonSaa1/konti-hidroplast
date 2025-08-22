import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, BookOpen, Download, Eye, Upload, Image, FileText, Languages, X } from "lucide-react";
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
  languageName: string;
}

interface BrochureFormData {
  name: string;
  category: string;
  description: string;
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

export function EnhancedBrochuresManager() {
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
    description: "",
    status: "active",
    active: true,
    sortOrder: 0,
    entries: [{
      id: "1",
      pdfFile: null,
      pdfUrl: "",
      imageFile: null,
      imageUrl: "",
      language: "en",
      languageName: "English"
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
      // Don't close dialog or show success here - let handleSubmit handle it
      // when all entries are created
    },
    onError: (error) => {
      // Don't show error toast here - let handleSubmit handle it
      throw error;
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

  const filteredBrochures = brochures.filter((brochure) => {
    const matchesSearch = brochure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (brochure.description && brochure.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || brochure.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "all" || brochure.language === selectedLanguage;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      status: "active",
      active: true,
      sortOrder: 0,
      entries: [{
        id: "1",
        pdfFile: null,
        pdfUrl: "",
        imageFile: null,
        imageUrl: "",
        language: "en",
        languageName: "English"
      }],
      translations: {
        en: {},
        mk: {},
        de: {}
      }
    });
  };

  const handleEdit = (brochure: Brochure) => {
    setFormData({
      name: brochure.name,
      category: brochure.category,
      description: brochure.description || "",
      status: brochure.status,
      active: brochure.active ?? true,
      sortOrder: brochure.sortOrder || 0,
      entries: [{
        id: "1",
        pdfFile: null,
        pdfUrl: brochure.pdfUrl || "",
        imageFile: null,
        imageUrl: brochure.imageUrl || "",
        language: brochure.language || "en",
        languageName: brochure.language === "mk" ? "Macedonian" : brochure.language === "de" ? "German" : "English"
      }]
    });
    setSelectedBrochure(brochure);
    setIsEditDialogOpen(true);
  };

  const addEntry = () => {
    const newEntry: BrochureEntry = {
      id: Date.now().toString(),
      pdfFile: null,
      pdfUrl: "",
      imageFile: null,
      imageUrl: "",
      language: "en",
      languageName: "English"
    };
    setFormData({
      ...formData,
      entries: [...formData.entries, newEntry]
    });
  };

  const updateEntryLanguage = (entryId: string, language: string) => {
    const languageMap = {
      "en": "English",
      "mk": "Macedonian", 
      "de": "German",
      "fr": "French",
      "al": "Albanian",
      "it": "Italian",
      "es": "Spanish"
    };
    
    setFormData({
      ...formData,
      entries: formData.entries.map(entry => 
        entry.id === entryId 
          ? { ...entry, language, languageName: languageMap[language as keyof typeof languageMap] || language }
          : entry
      )
    });
  };

  const removeEntry = (entryId: string) => {
    if (formData.entries.length > 1) {
      setFormData({
        ...formData,
        entries: formData.entries.filter(entry => entry.id !== entryId)
      });
    }
  };

  const updateEntry = (entryId: string, field: keyof BrochureEntry, value: any) => {
    setFormData({
      ...formData,
      entries: formData.entries.map(entry => 
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    });
  };

  const handleSubmit = async () => {
    // Get the name from translations or fallback to the direct name input (matching categories pattern)
    const enName = formData.translations?.en?.name || formData.name;
    const enDescription = formData.translations?.en?.description || formData.description;
    
    if (!enName.trim() || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Check that at least one entry has valid data
    const validEntries = formData.entries.filter(entry => 
      (entry.pdfFile || entry.pdfUrl) && entry.language
    );
    
    if (validEntries.length === 0) {
      toast({
        title: "Error",
        description: "Please provide at least one PDF file or PDF URL",
        variant: "destructive",
      });
      return;
    }

    // If editing, just update the single brochure (existing behavior for edit mode)
    if (selectedBrochure) {
      const primaryEntry = formData.entries[0];
      let pdfUrl = primaryEntry?.pdfUrl || "";
      let imageUrl = primaryEntry?.imageUrl || "";

      // Handle PDF file upload for edit mode
      if (primaryEntry?.pdfFile && !primaryEntry.pdfUrl) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', primaryEntry.pdfFile);

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

      // Handle image file upload for edit mode
      if (primaryEntry?.imageFile && !primaryEntry.imageUrl) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', primaryEntry.imageFile);

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

      const submissionData = {
        title: enName,
        name: enName,
        category: formData.category,
        language: (primaryEntry?.language || "en") as "en" | "mk" | "de",
        pdfUrl: pdfUrl || (selectedBrochure?.pdfUrl || ""),
        imageUrl: imageUrl || (selectedBrochure?.imageUrl || ""),
        description: enDescription || undefined,
        status: formData.status as "active" | "inactive" | "draft",
        active: formData.active,
        sortOrder: formData.sortOrder,
        translations: formData.translations
      };

      updateMutation.mutate({ id: selectedBrochure.id, data: submissionData });
      return;
    }

    // For creating new brochures, handle multiple language entries
    try {
      const translationGroupId = Date.now().toString(); // Generate a unique group ID
      const processedEntries = [];

      // Process each entry - upload files and prepare data
      for (const entry of validEntries) {
        let pdfUrl = entry.pdfUrl || "";
        let imageUrl = entry.imageUrl || "";

        // Handle PDF file upload
        if (entry.pdfFile && !entry.pdfUrl) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', entry.pdfFile);

          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload PDF file for ${entry.languageName}`);
          }

          const uploadResult = await uploadResponse.json();
          pdfUrl = uploadResult.url;
        }

        // Handle image file upload
        if (entry.imageFile && !entry.imageUrl) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', entry.imageFile);

          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload image file for ${entry.languageName}`);
          }

          const uploadResult = await uploadResponse.json();
          imageUrl = uploadResult.url;
        }

        // Prepare the data for this language entry
        processedEntries.push({
          title: enName,
          name: enName,
          category: formData.category,
          language: entry.language as "en" | "mk" | "de",
          pdfUrl,
          imageUrl,
          description: enDescription || undefined,
          status: formData.status as "active" | "inactive" | "draft",
          active: formData.active,
          sortOrder: formData.sortOrder,
          translationGroup: translationGroupId,
          translations: formData.translations
        });
      }

      // Create all entries
      for (const entryData of processedEntries) {
        await createMutation.mutateAsync(entryData);
      }

      // Close dialog and reset form after successful creation
      setIsCreateDialogOpen(false);
      resetForm();
      
      toast({
        title: "Success",
        description: `Brochure created with ${processedEntries.length} language version(s)`,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create brochure",
        variant: "destructive",
      });
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
    <div className="space-y-6" data-testid="enhanced-brochures-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Enhanced Brochures Management</h2>
          <p className="text-slate-600">
            Manage product brochures with multiple files, photos, and language versions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
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
            addEntry={addEntry}
            removeEntry={removeEntry}
            updateEntry={updateEntry}
            updateEntryLanguage={updateEntryLanguage}
          />
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
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
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
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
                <SelectTrigger>
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
            <CardTitle>Brochures ({filteredBrochures.length})</CardTitle>
            <CardDescription>All brochures in your database</CardDescription>
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
                  <TableRow key={brochure.id}>
                    <TableCell className="font-medium">
                      {brochure.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {brochure.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {brochure.language === "en" ? "English" : 
                         brochure.language === "mk" ? "Macedonian" : 
                         brochure.language === "de" ? "German" : 
                         brochure.language?.toUpperCase() || "EN"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {brochure.description ? (
                        <span className="text-sm line-clamp-2 max-w-xs">
                          {brochure.description}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm">No description</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={brochure.active ? "default" : "secondary"}>
                        {brochure.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {brochure.pdfUrl ? (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => window.open(brochure.pdfUrl, '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View PDF
                        </Button>
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
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">No Image</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {brochure.sortOrder || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(brochure.pdfUrl, '_blank')}
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
                        >
                          <Languages className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(brochure)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
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
        <Card className="p-8 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No brochures found</h3>
          <p className="text-slate-600 mb-4">
            {searchTerm || selectedCategory !== "all" 
              ? "No brochures match your current filters"
              : "Get started by adding your first brochure"
            }
          </p>
          {!searchTerm && selectedCategory === "all" && (
            <Button onClick={() => setIsCreateDialogOpen(true)}>
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
          addEntry={addEntry}
          removeEntry={removeEntry}
          updateEntry={updateEntry}
          updateEntryLanguage={updateEntryLanguage}
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

interface BrochureFormDialogProps {
  isOpen: boolean;
  title: string;
  formData: BrochureFormData;
  setFormData: (data: BrochureFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  categories: BrochureCategory[];
  addEntry: () => void;
  removeEntry: (entryId: string) => void;
  updateEntry: (entryId: string, field: keyof BrochureEntry, value: any) => void;
  updateEntryLanguage: (entryId: string, language: string) => void;
}

function BrochureFormDialog({
  isOpen,
  title,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isLoading,
  categories,
  addEntry,
  removeEntry,
  updateEntry,
  updateEntryLanguage
}: BrochureFormDialogProps) {
  const handleFileChange = (entryId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      updateEntry(entryId, 'pdfFile', file);
    } else if (file) {
      alert('Please select a PDF file');
      e.target.value = '';
    }
  };

  const handleImageChange = (entryId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      updateEntry(entryId, 'imageFile', file);
    } else if (file) {
      alert('Please select an image file (JPG, PNG, etc.)');
      e.target.value = '';
    }
  };

  return (
    <DialogContent className="max-w-6xl">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        {/* Multi-language Name Field */}
        <TranslatableFieldEditor
          label="Brochure Name *"
          fieldName="name"
          type="text"
          currentTranslations={formData.translations}
          originalValue={formData.name}
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
            <SelectTrigger>
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

        {/* Multi-language Description Field */}
        <TranslatableFieldEditor
          label="Description"
          fieldName="description"
          type="textarea"
          currentTranslations={formData.translations}
          originalValue={formData.description}
          onChange={(translations) => {
            setFormData({ 
              ...formData, 
              translations,
              description: translations.en?.description || formData.description
            });
          }}
        />

        {/* Dynamic Entries Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Files & Language Versions</CardTitle>
                <CardDescription>Add multiple PDFs, images, and language versions</CardDescription>
              </div>
              <Button onClick={addEntry} size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-1" />
                Add More
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-600">
                <div className="col-span-1">#</div>
                <div className="col-span-3">PDF File/URL</div>
                <div className="col-span-3">Image File/URL</div>
                <div className="col-span-2">Language</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Actions</div>
              </div>
              
              {formData.entries.map((entry, index) => (
                <div key={entry.id} className="grid grid-cols-12 gap-2 p-3 border rounded-lg bg-gray-50">
                  <div className="col-span-1 flex items-center">
                    <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                  </div>
                  
                  <div className="col-span-3 space-y-2">
                    {entry.pdfFile ? (
                      <div className="flex items-center justify-between p-2 bg-red-50 border border-red-200 rounded text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-red-600" />
                          <span className="truncate max-w-20">{entry.pdfFile.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => updateEntry(entry.id, 'pdfFile', null)}
                          className="h-5 w-5 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(entry.id, e)}
                          className="text-xs"
                        />
                        <Input
                          type="url"
                          value={entry.pdfUrl}
                          onChange={(e) => updateEntry(entry.id, 'pdfUrl', e.target.value)}
                          placeholder="Or PDF URL"
                          className="text-xs mt-1"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="col-span-3 space-y-2">
                    {entry.imageFile ? (
                      <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                        <div className="flex items-center gap-1">
                          <Image className="h-3 w-3 text-blue-600" />
                          <span className="truncate max-w-20">{entry.imageFile.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => updateEntry(entry.id, 'imageFile', null)}
                          className="h-5 w-5 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(entry.id, e)}
                          className="text-xs"
                        />
                        <Input
                          type="url"
                          value={entry.imageUrl}
                          onChange={(e) => updateEntry(entry.id, 'imageUrl', e.target.value)}
                          placeholder="Or image URL"
                          className="text-xs mt-1"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="col-span-2">
                    <Select
                      value={entry.language}
                      onValueChange={(value) => updateEntryLanguage(entry.id, value)}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">🇺🇸 English</SelectItem>
                        <SelectItem value="mk">🇲🇰 Macedonian</SelectItem>
                        <SelectItem value="de">🇩🇪 German</SelectItem>
                        <SelectItem value="fr">🇫🇷 French</SelectItem>
                        <SelectItem value="al">🇦🇱 Albanian</SelectItem>
                        <SelectItem value="it">🇮🇹 Italian</SelectItem>
                        <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <Badge variant="outline" className="text-xs">
                      {entry.pdfFile || entry.pdfUrl ? "Ready" : "Pending"}
                    </Badge>
                  </div>
                  
                  <div className="col-span-1 flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEntry(entry.id)}
                      disabled={formData.entries.length <= 1}
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 mt-6">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label htmlFor="active">Active</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Brochure"}
        </Button>
      </div>
    </DialogContent>
  );
}