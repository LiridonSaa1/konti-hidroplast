import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Search, Image, Upload, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Media, InsertMedia } from "@shared/schema";

const MEDIA_CATEGORIES = [
  "hero",
  "gallery", 
  "products",
  "certificates",
  "news",
  "brochures",
  "logos",
  "backgrounds"
];

export function MediaManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<InsertMedia>({
    filename: "",
    originalName: "",
    url: "",
    category: "gallery",
    altText: "",
    fileSize: 0,
    mimeType: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: media = [], isLoading } = useQuery<Media[]>({
    queryKey: ["/api/admin/media"]
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertMedia) => {
      return apiRequest("POST", "/api/admin/media", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/media"] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Media file added successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error", 
        description: "Failed to add media file",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/media/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/media"] });
      toast({
        title: "Success",
        description: "Media file deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete media file",
        variant: "destructive",
      });
    },
  });

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.altText?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      filename: "",
      originalName: "",
      url: "",
      category: "gallery",
      altText: "",
      fileSize: 0,
      mimeType: ""
    });
  };

  const handleSubmit = () => {
    createMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64" data-testid="media-loading">
        <div className="text-slate-600">Loading media files...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="media-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="media-title">Media Management</h2>
          <p className="text-slate-600" data-testid="media-description">
            Upload and manage photos, images, and media files
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-upload-media">
              <Plus className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md" data-testid="media-upload-dialog">
            <DialogHeader>
              <DialogTitle data-testid="media-upload-title">Upload New Media</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="filename">Filename *</Label>
                <Input
                  id="filename"
                  value={formData.filename}
                  onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
                  placeholder="Enter filename"
                  data-testid="input-media-filename"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalName">Original Name</Label>
                <Input
                  id="originalName"
                  value={formData.originalName}
                  onChange={(e) => setFormData({ ...formData, originalName: e.target.value })}
                  placeholder="Original filename"
                  data-testid="input-media-original-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="Enter image URL"
                  data-testid="input-media-url"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger data-testid="select-media-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEDIA_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="altText">Alt Text</Label>
                <Input
                  id="altText"
                  value={formData.altText || ""}
                  onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                  placeholder="Describe the image"
                  data-testid="input-media-alt-text"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-testid="button-cancel-media">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={createMutation.isPending || !formData.filename || !formData.url}
                data-testid="button-save-media"
              >
                {createMutation.isPending ? "Uploading..." : "Upload Media"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card data-testid="media-filters">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  placeholder="Search media files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-media"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48" data-testid="select-filter-media-category">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {MEDIA_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="media-grid">
        {filteredMedia.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow" data-testid={`media-card-${item.id}`}>
            <CardHeader className="p-4">
              <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-2">
                <img
                  src={item.url}
                  alt={item.altText || item.filename}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f1f5f9'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                  data-testid={`media-image-${item.id}`}
                />
              </div>
              <div>
                <CardTitle className="text-sm truncate" data-testid={`media-filename-${item.id}`}>
                  {item.filename}
                </CardTitle>
                <CardDescription data-testid={`media-category-${item.id}`}>
                  <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  {item.fileSize && item.fileSize > 0 ? `${Math.round(item.fileSize / 1024)} KB` : "Unknown size"}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(item.url, '_blank')}
                    data-testid={`button-view-media-${item.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        data-testid={`button-delete-media-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Media File</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{item.filename}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(item.id)}
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

      {filteredMedia.length === 0 && (
        <Card data-testid="media-empty-state">
          <CardContent className="p-8 text-center">
            <Image className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No media files found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by uploading your first media file"
              }
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-upload-first-media">
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Media File
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}