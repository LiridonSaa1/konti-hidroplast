import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, FileText, Calendar, User, X, MoveUp, MoveDown, Eye, Globe, Languages } from "lucide-react";
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
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { FileUpload } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TranslatableFieldEditor } from "@/components/admin/TranslatableFieldEditor";
import type { NewsArticle, InsertNewsArticle } from "@shared/schema";

interface ArticleSection {
  id: string;
  type: 'text' | 'image' | 'text-with-image';
  title: string;
  content: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
}

interface MultiLanguageContent {
  en: string;
  mk: string;
  de: string;
}

interface MultiLanguageSection {
  id: string;
  type: 'text' | 'image' | 'text-with-image';
  title: MultiLanguageContent;
  content: MultiLanguageContent;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
}

interface NewsFormData {
  title: string;
  description: string;
  imageUrl: string;
  published: boolean;
  sortOrder: number;
  sections: MultiLanguageSection[];
  translations: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  };
}

export function NewsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    description: "",
    imageUrl: "",
    published: false,
    sortOrder: 0,
    sections: [],
    translations: {
      en: { title: "", description: "" },
      mk: { title: "", description: "" },
      de: { title: "", description: "" }
    }
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Debug effect to track form data changes
  useEffect(() => {
    // Form data tracking removed for cleaner console
  }, [formData, selectedArticle]);

  // Effect to ensure form data is synchronized when editing
  useEffect(() => {
    if (isEditDialogOpen && selectedArticle) {
      // Edit dialog synchronization removed for cleaner console
    }
  }, [isEditDialogOpen, selectedArticle, formData]);

  // Additional effect to monitor form data changes specifically for editing
  useEffect(() => {
    if (isEditDialogOpen && selectedArticle && formData.translations) {
      // Form data monitoring removed for cleaner console
    }
  }, [formData.translations, isEditDialogOpen, selectedArticle]);

  const { data: news = [], isLoading } = useQuery<NewsArticle[]>({
    queryKey: ["/api/admin/news"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertNewsArticle) => {
      return apiRequest("/api/admin/news", "POST", {
        ...data,
        publishedAt: data.published ? new Date() : null
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "News article created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create news article",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: string; article: InsertNewsArticle }) => {
      return apiRequest(`/api/admin/news/${data.id}`, "PUT", {
        ...data.article,
        publishedAt: data.article.published ? new Date() : null
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      setIsEditDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "News article updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update news article",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/news/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/news"] });
      toast({
        title: "Success",
        description: "News article deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete news article",
        variant: "destructive",
      });
    },
  });

  const filteredNews = news
    .filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
                           (article.author && article.author.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "all" ||
                           (statusFilter === "published" && article.published) ||
                           (statusFilter === "draft" && !article.published);
      const matchesLanguage = languageFilter === "all" ||
                              (languageFilter === "en" && (article.defaultLanguage === "en" || (article.translations && (article.translations as any).en))) ||
                              (languageFilter === "mk" && (article.defaultLanguage === "mk" || (article.translations && (article.translations as any).mk))) ||
                              (languageFilter === "de" && (article.defaultLanguage === "de" || (article.translations && (article.translations as any).de)));
      return matchesSearch && matchesStatus && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "sort-order":
          return (a.sortOrder || 0) - (b.sortOrder || 0);
        case "newest":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case "oldest":
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "published-first":
          if (a.published && !b.published) return -1;
          if (!a.published && b.published) return 1;
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case "draft-first":
          if (!a.published && b.published) return -1;
          if (a.published && !b.published) return 1;
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        default:
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
    });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      published: false,
      sortOrder: 0,
      sections: [],
      translations: {
        en: { title: "", description: "" },
        mk: { title: "", description: "" },
        de: { title: "", description: "" }
      }
    });
    setSelectedArticle(null);
    // setEditKey(0); // This line is removed
  };

  const addSection = (type: ArticleSection['type']) => {
    const newSection: MultiLanguageSection = {
      id: `section-${Date.now()}`,
      type,
      title: { en: "", mk: "", de: "" },
      content: { en: "", mk: "", de: "" },
      imageUrl: "",
      imagePosition: 'right'
    };
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<MultiLanguageSection>) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const removeSection = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const moveSectionUp = (sectionId: string) => {
    setFormData(prev => {
      const currentIndex = prev.sections.findIndex(s => s.id === sectionId);
      if (currentIndex > 0) {
        const newSections = [...prev.sections];
        [newSections[currentIndex - 1], newSections[currentIndex]] = 
        [newSections[currentIndex], newSections[currentIndex - 1]];
        return { ...prev, sections: newSections };
      }
      return prev;
    });
  };

  const moveSectionDown = (sectionId: string) => {
    setFormData(prev => {
      const currentIndex = prev.sections.findIndex(s => s.id === sectionId);
      if (currentIndex < prev.sections.length - 1) {
        const newSections = [...prev.sections];
        [newSections[currentIndex], newSections[currentIndex + 1]] = 
        [newSections[currentIndex + 1], newSections[currentIndex]];
        return { ...prev, sections: newSections };
      }
      return prev;
    });
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

    const articleData: InsertNewsArticle = {
      title: formData.title,
      subtitle: null,
      description: formData.description || null,
      imageUrl: formData.imageUrl || null,
      author: null,
      published: formData.published,
      sortOrder: formData.sortOrder,
      sections: formData.sections.map(section => ({
        id: section.id,
        type: section.type,
        title: section.title.en,
        content: section.content.en,
        imageUrl: section.imageUrl,
        imagePosition: section.imagePosition
      })),
      translations: formData.translations,
      defaultLanguage: 'en'
    };

    if (selectedArticle) {
      updateMutation.mutate({ id: selectedArticle.id, article: articleData });
    } else {
      createMutation.mutate(articleData);
    }
  };

  const handleEdit = (article: NewsArticle) => {
    // Extract translations from the article, with proper fallbacks
    const translations = (article.translations as any) || {};
    
    // Ensure we have the correct structure for each language
    const structuredTranslations = {
      en: {
        title: translations.en?.title || article.title || "",
        description: translations.en?.description || article.description || ""
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
    
    // Prepare the form data with proper translations structure
    const newFormData = {
      title: structuredTranslations.en.title, 
      description: structuredTranslations.en.description, 
      imageUrl: article.imageUrl || "",
      published: article.published || false,
      sortOrder: article.sortOrder || 0,
      sections: (article.sections as any)?.map((section: any) => ({
        id: section.id || crypto.randomUUID(),
        type: section.type || 'text',
        title: {
          en: section.title?.en || section.title || "",
          mk: section.title?.mk || "",
          de: section.title?.de || ""
        },
        content: {
          en: section.content?.en || section.content || "",
          mk: section.content?.mk || "",
          de: section.content?.de || ""
        },
        imageUrl: section.imageUrl || "",
        imagePosition: section.imagePosition || 'right'
      })) || [],
      translations: structuredTranslations
    };
    
    // Set the form data and open the dialog
    setFormData(newFormData);
    setSelectedArticle(article);
    setIsEditDialogOpen(true);
  };

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "Not published";
    if (dateString instanceof Date) {
      return dateString.toLocaleDateString();
    }
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            News Management
          </CardTitle>
          <CardDescription>
            Create and manage news articles with rich text content and images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-news"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger data-testid="select-status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Articles</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language Filter */}
            <div className="sm:w-48">
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger data-testid="select-language-filter">
                  <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="mk">🇲🇰 Macedonian</SelectItem>
                  <SelectItem value="de">🇩🇪 German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="sm:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-testid="select-sort-by">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sort-order">Sort Order</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title-asc">Title A-Z</SelectItem>
                  <SelectItem value="title-desc">Title Z-A</SelectItem>
                  <SelectItem value="published-first">Published First</SelectItem>
                  <SelectItem value="draft-first">Draft First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Create Button */}
            <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-create-news">
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      {filteredNews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle data-testid="news-table-title">
              News Articles ({filteredNews.length})
              {languageFilter !== "all" && (
                <span className="text-sm font-normal text-slate-500 ml-2">
                  • Filtered by {languageFilter === 'en' ? 'English' : languageFilter === 'mk' ? 'Macedonian' : 'German'}
                </span>
              )}
            </CardTitle>
            <CardDescription>
              All news articles in your database
              {languageFilter !== "all" && (
                <span className="text-slate-500">
                  {" "}• Showing only {languageFilter === 'en' ? 'English' : languageFilter === 'mk' ? 'Macedonian' : 'German'} content
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Languages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Sections</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.map((article) => (
                  <TableRow key={article.id} data-testid={`news-row-${article.id}`}>
                    <TableCell className="font-medium max-w-xs" data-testid={`news-title-${article.id}`}>
                      <div className="line-clamp-2">
                        {article.title}
                      </div>
                    </TableCell>
                    <TableCell data-testid={`news-description-${article.id}`}>
                      {article.description ? (
                        <span className="text-sm line-clamp-2 max-w-xs">
                          {article.description}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm">No description</span>
                      )}
                    </TableCell>
                    <TableCell data-testid={`news-languages-${article.id}`}>
                      <div className="flex items-center gap-1">
                        {article.translations && Object.keys(article.translations).length > 0 ? (
                          Object.keys(article.translations).map((lang, index) => (
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
                        variant={article.published ? "default" : "secondary"} 
                        data-testid={`news-status-${article.id}`}
                      >
                        {article.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`news-date-${article.id}`}>
                      <span className="text-sm">
                        {formatDate(article.publishedAt)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {article.imageUrl ? (
                        <div className="flex items-center gap-2">
                          <img 
                            src={article.imageUrl} 
                            alt={article.title}
                            className="h-8 w-8 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23f1f5f9'/%3E%3Ctext x='16' y='16' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='8'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => article.imageUrl && window.open(article.imageUrl, '_blank')}
                            data-testid={`button-view-image-${article.id}`}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">No Image</span>
                      )}
                    </TableCell>
                    <TableCell data-testid={`news-sections-${article.id}`}>
                      <span className="text-sm">
                        {Array.isArray(article.sections) ? article.sections.length : 0} sections
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(article)}
                          data-testid={`button-edit-news-${article.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              data-testid={`button-delete-news-${article.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Article</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{article.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteMutation.mutate(article.id)}
                                className="bg-red-600 hover:bg-red-700"
                                data-testid={`button-confirm-delete-${article.id}`}
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

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <Card data-testid="news-empty-state">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all" || languageFilter !== "all"
                ? "Try adjusting your search, status, or language filter criteria"
                : "Get started by creating your first news article"
              }
            </p>
            {(searchTerm || statusFilter !== "all" || languageFilter !== "all") && (
              <div className="flex gap-2 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setLanguageFilter("all");
                  }}
                  data-testid="button-reset-filters"
                >
                  Reset All Filters
                </Button>
                {!searchTerm && statusFilter === "all" && languageFilter === "all" && (
                  <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-create-first-article">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Article
                  </Button>
                )}
              </div>
            )}
            {!searchTerm && statusFilter === "all" && languageFilter === "all" && (
              <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-create-first-article">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Article
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-6xl mx-4 w-[calc(100vw-2rem)] sm:mx-auto sm:w-full">
          <DialogHeader>
            <DialogTitle>Create News Article</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                label="Article Title"
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
                label="Article Description"
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
                  data-testid="input-sort-order"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  data-testid="switch-published"
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
            </div>

            {/* Main Article Image */}
            <div>
              <FileUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                label="Main Article Image"
                placeholder="Enter image URL or upload file"
              />
            </div>

            {/* Article Sections */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium">Article Sections</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSection('text')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Text Section
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSection('image')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image Section
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSection('text-with-image')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Text + Image
                  </Button>
                </div>
              </div>

              {formData.sections.map((section, index) => (
                <Card key={section.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="capitalize">
                      {section.type.replace('-', ' + ')}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveSectionUp(section.id)}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveSectionDown(section.id)}
                        disabled={index === formData.sections.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSection(section.id)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Multi-Language Section Title */}
                    <div>
                      <Label className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Section Title (Multi-Language)
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <Input
                          value={section.title.en}
                          onChange={(e) => updateSection(section.id, { title: { ...section.title, en: e.target.value } })}
                          placeholder="English title"
                          className="text-sm"
                        />
                        <Input
                          value={section.title.mk}
                          onChange={(e) => updateSection(section.id, { title: { ...section.title, mk: e.target.value } })}
                          placeholder="Macedonian title"
                          className="text-sm"
                        />
                        <Input
                          value={section.title.de}
                          onChange={(e) => updateSection(section.id, { title: { ...section.title, de: e.target.value } })}
                          placeholder="German title"
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {(section.type === 'text' || section.type === 'text-with-image') && (
                      <div>
                        <Label className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Content (Multi-Language)
                        </Label>
                        <Tabs defaultValue="en" className="w-full mt-2">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="en" className="text-xs">🇺🇸 EN</TabsTrigger>
                            <TabsTrigger value="mk" className="text-xs">🇲🇰 MK</TabsTrigger>
                            <TabsTrigger value="de" className="text-xs">🇩🇪 DE</TabsTrigger>
                          </TabsList>
                          <TabsContent value="en" className="mt-2">
                            <RichTextEditor
                              value={section.content.en}
                              onChange={(content) => updateSection(section.id, { content: { ...section.content, en: content } })}
                              placeholder="Enter section content in English"
                            />
                          </TabsContent>
                          <TabsContent value="mk" className="mt-2">
                            <RichTextEditor
                              value={section.content.mk}
                              onChange={(content) => updateSection(section.id, { content: { ...section.content, mk: content } })}
                              placeholder="Enter section content in Macedonian"
                            />
                          </TabsContent>
                          <TabsContent value="de" className="mt-2">
                            <RichTextEditor
                              value={section.content.de}
                              onChange={(content) => updateSection(section.id, { content: { ...section.content, de: content } })}
                              placeholder="Enter section content in German"
                            />
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}

                    {(section.type === 'image' || section.type === 'text-with-image') && (
                      <div className={section.type === 'text-with-image' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}>
                        <div>
                          <FileUpload
                            value={section.imageUrl || ""}
                            onChange={(url) => updateSection(section.id, { imageUrl: url })}
                            label="Section Image"
                            placeholder="Enter image URL or upload file"
                          />
                        </div>
                        {section.type === 'text-with-image' && (
                          <div>
                            <Label>Image Position</Label>
                            <div className="flex gap-2 mt-2">
                              <Button
                                type="button"
                                variant={section.imagePosition === 'left' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateSection(section.id, { imagePosition: 'left' })}
                              >
                                Image Left
                              </Button>
                              <Button
                                type="button"
                                variant={section.imagePosition === 'right' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateSection(section.id, { imagePosition: 'right' })}
                              >
                                Image Right
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              {formData.sections.length === 0 && (
                <Card className="p-8 text-center border-dashed">
                  <p className="text-gray-500 mb-4">No sections added yet</p>
                  <p className="text-sm text-gray-400">Add sections above to create rich article content like "Introduction", "Key Technologies", "Challenges", etc.</p>
                </Card>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  resetForm();
                }}
                data-testid="button-cancel-create"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createMutation.isPending}
                data-testid="button-submit-create"
              >
                {createMutation.isPending ? "Creating..." : "Create Article"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-6xl mx-4 w-[calc(100vw-2rem)] sm:mx-auto sm:w-full">
          <DialogHeader>
            <DialogTitle>Edit News Article</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                label="Article Title"
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
                label="Article Description"
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
                  data-testid="input-edit-sort-order"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  data-testid="switch-edit-published"
                />
                <Label htmlFor="edit-published">Publish immediately</Label>
              </div>
            </div>

            {/* Main Article Image */}
            <div>
              <FileUpload
                value={formData.imageUrl}
                onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                label="Main Article Image"
                placeholder="Enter image URL or upload file"
              />
            </div>

            {/* Article Sections */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium">Article Sections</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSection('text')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Text Section
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSection('image')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image Section
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSection('text-with-image')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Text + Image
                  </Button>
                </div>
              </div>

              {formData.sections.map((section, index) => (
                <Card key={section.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="capitalize">
                      {section.type.replace('-', ' + ')}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveSectionUp(section.id)}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveSectionDown(section.id)}
                        disabled={index === formData.sections.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSection(section.id)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Multi-Language Section Title */}
                    <div>
                      <Label className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Section Title (Multi-Language)
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                        <Input
                          value={section.title.en}
                          onChange={(e) => updateSection(section.id, { title: { ...section.title, en: e.target.value } })}
                          placeholder="English title"
                          className="text-sm"
                        />
                        <Input
                          value={section.title.mk}
                          onChange={(e) => updateSection(section.id, { title: { ...section.title, mk: e.target.value } })}
                          placeholder="Macedonian title"
                          className="text-sm"
                        />
                        <Input
                          value={section.title.de}
                          onChange={(e) => updateSection(section.id, { title: { ...section.title, de: e.target.value } })}
                          placeholder="German title"
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {(section.type === 'text' || section.type === 'text-with-image') && (
                      <div>
                        <Label className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          Content (Multi-Language)
                        </Label>
                        <Tabs defaultValue="en" className="w-full mt-2">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="en" className="text-xs">🇺🇸 EN</TabsTrigger>
                            <TabsTrigger value="mk" className="text-xs">🇲🇰 MK</TabsTrigger>
                            <TabsTrigger value="de" className="text-xs">🇩🇪 DE</TabsTrigger>
                          </TabsList>
                          <TabsContent value="en" className="mt-2">
                            <RichTextEditor
                              value={section.content.en}
                              onChange={(content) => updateSection(section.id, { content: { ...section.content, en: content } })}
                              placeholder="Enter section content in English"
                            />
                          </TabsContent>
                          <TabsContent value="mk" className="mt-2">
                            <RichTextEditor
                              value={section.content.mk}
                              onChange={(content) => updateSection(section.id, { content: { ...section.content, mk: content } })}
                              placeholder="Enter section content in Macedonian"
                            />
                          </TabsContent>
                          <TabsContent value="de" className="mt-2">
                            <RichTextEditor
                              value={section.content.de}
                              onChange={(content) => updateSection(section.id, { content: { ...section.content, de: content } })}
                              placeholder="Enter section content in German"
                            />
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}

                    {(section.type === 'image' || section.type === 'text-with-image') && (
                      <div className={section.type === 'text-with-image' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}>
                        <div>
                          <FileUpload
                            value={section.imageUrl || ""}
                            onChange={(url) => updateSection(section.id, { imageUrl: url })}
                            label="Section Image"
                            placeholder="Enter image URL or upload file"
                          />
                        </div>
                        {section.type === 'text-with-image' && (
                          <div>
                            <Label>Image Position</Label>
                            <div className="flex gap-2 mt-2">
                              <Button
                                type="button"
                                variant={section.imagePosition === 'left' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateSection(section.id, { imagePosition: 'left' })}
                              >
                                Image Left
                              </Button>
                              <Button
                                type="button"
                                variant={section.imagePosition === 'right' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateSection(section.id, { imagePosition: 'right' })}
                              >
                                Image Right
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}

              {formData.sections.length === 0 && (
                <Card className="p-8 text-center border-dashed">
                  <p className="text-gray-500 mb-4">No sections added yet</p>
                  <p className="text-sm text-gray-400">Add sections above to create rich article content like "Introduction", "Key Technologies", "Challenges", etc.</p>
                </Card>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
                data-testid="button-cancel-edit"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={updateMutation.isPending}
                data-testid="button-submit-edit"
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