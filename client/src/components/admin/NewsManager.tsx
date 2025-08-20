import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, FileText, Calendar, User, X, MoveUp, MoveDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { FileUpload } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import type { NewsArticle, InsertNewsArticle } from "@shared/schema";

interface ArticleSection {
  id: string;
  type: 'text' | 'image' | 'text-with-image';
  title: string;
  content: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
}

interface NewsFormData {
  title: string;
  description: string;
  imageUrl: string;
  published: boolean;
  sections: ArticleSection[];
}

export function NewsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState<NewsFormData>({
    title: "",
    description: "",
    imageUrl: "",
    published: false,
    sections: []
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const filteredNews = news.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
                         (article.author && article.author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" ||
                         (statusFilter === "published" && article.published) ||
                         (statusFilter === "draft" && !article.published);
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      published: false,
      sections: []
    });
    setSelectedArticle(null);
  };

  const addSection = (type: ArticleSection['type']) => {
    const newSection: ArticleSection = {
      id: `section-${Date.now()}`,
      type,
      title: "",
      content: "",
      imageUrl: "",
      imagePosition: 'right'
    };
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<ArticleSection>) => {
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
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    const articleData: InsertNewsArticle = {
      title: formData.title.trim(),
      subtitle: null,
      description: formData.description || null,
      imageUrl: formData.imageUrl || null,
      author: null,
      published: formData.published,
      sections: formData.sections
    };

    if (selectedArticle) {
      updateMutation.mutate({ id: selectedArticle.id, article: articleData });
    } else {
      createMutation.mutate(articleData);
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      description: article.description || "",
      imageUrl: article.imageUrl || "",
      published: article.published || false,
      sections: (article.sections as ArticleSection[]) || []
    });
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
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                data-testid="select-status-filter"
              >
                <option value="all">All Articles</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            {/* Create Button */}
            <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-create-news">
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredNews.map((article) => (
          <Card key={article.id} className="flex flex-col" data-testid={`news-card-${article.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2" data-testid={`news-title-${article.id}`}>
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      variant={article.published ? "default" : "secondary"}
                      data-testid={`news-status-${article.id}`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
                {article.imageUrl && (
                  <div className="flex-shrink-0">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded-lg border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f1f5f9'/%3E%3Ctext x='32' y='32' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='10'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                      data-testid={`news-image-${article.id}`}
                    />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm text-gray-600 flex-1 line-clamp-3" data-testid={`news-description-${article.id}`}>
                {article.description}
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {article.author && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span data-testid={`news-author-${article.id}`}>{article.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span data-testid={`news-date-${article.id}`}>
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
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
                        data-testid={`button-delete-news-${article.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
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
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <Card data-testid="news-empty-state">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first news article"
              }
            </p>
            {!searchTerm && statusFilter === "all" && (
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto mx-4 w-[calc(100vw-2rem)] sm:mx-auto sm:w-full">
          <DialogHeader>
            <DialogTitle>Create News Article</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter article title"
                    data-testid="input-title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter article description (optional)"
                    data-testid="input-description"
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

              <div>
                <FileUpload
                  value={formData.imageUrl}
                  onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                  label="Main Article Image"
                  placeholder="Enter image URL or upload file"
                />
              </div>
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
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        placeholder="Enter section title"
                      />
                    </div>

                    {(section.type === 'text' || section.type === 'text-with-image') && (
                      <div>
                        <Label>Content</Label>
                        <Textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, { content: e.target.value })}
                          placeholder="Enter section content"
                          rows={4}
                        />
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto mx-4 w-[calc(100vw-2rem)] sm:mx-auto sm:w-full">
          <DialogHeader>
            <DialogTitle>Edit News Article</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title *</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter article title"
                    data-testid="input-edit-title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Input
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter article description (optional)"
                    data-testid="input-edit-description"
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

              <div>
                <FileUpload
                  value={formData.imageUrl}
                  onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                  label="Main Article Image"
                  placeholder="Enter image URL or upload file"
                />
              </div>
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
                    <div>
                      <Label>Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        placeholder="Enter section title"
                      />
                    </div>

                    {(section.type === 'text' || section.type === 'text-with-image') && (
                      <div>
                        <Label>Content</Label>
                        <Textarea
                          value={section.content}
                          onChange={(e) => updateSection(section.id, { content: e.target.value })}
                          placeholder="Enter section content"
                          rows={4}
                        />
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