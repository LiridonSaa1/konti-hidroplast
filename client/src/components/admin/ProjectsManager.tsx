import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, FileUp, Image as ImageIcon, Eye, Search, ArrowUpDown, ArrowUp, ArrowDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileUpload } from "@/components/ui/file-upload";
import { TranslatableFieldEditor } from "./TranslatableFieldEditor";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { insertProjectSchema, type Project, type InsertProject } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function ProjectsManager() {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Project>("sortOrder");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [translations, setTranslations] = useState<{
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  }>({
    en: { title: "", description: "" },
    mk: { title: "", description: "" },
    de: { title: "", description: "" }
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language, setLanguage } = useLanguage();

  const form = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      pdfUrl: "",
      status: "active",
      sortOrder: 0,
    },
  });

  // Sync translations with form data
  useEffect(() => {
    console.log('ProjectsManager: Translations changed:', translations);
    if (translations.en?.title !== undefined) {
      form.setValue("title", translations.en.title);
    }
    if (translations.en?.description !== undefined) {
      form.setValue("description", translations.en.description);
    }
  }, [translations, form]);

  // Helper function to get localized text for projects
  const getLocalizedText = (project: Project, field: 'title' | 'description') => {
    if (project.translations && typeof project.translations === 'object') {
      const translations = project.translations as any;
      if (translations[language] && translations[language][field]) {
        return translations[language][field];
      }
    }
    // Fallback to original field
    return project[field] || '';
  };

  // Helper function to get translation status
  const getTranslationStatus = (project: Project) => {
    if (!project.translations || typeof project.translations !== 'object') {
      return { en: false, mk: false, de: false };
    }
    
    const translations = project.translations as any;
    return {
      en: !!(translations.en?.title && translations.en?.description),
      mk: !!(translations.mk?.title && translations.mk?.description),
      de: !!(translations.de?.title && translations.de?.description)
    };
  };

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/admin/projects"],
    queryFn: async () => {
      console.log("=== Fetching projects from API ===");
      try {
        const response = await apiRequest("/api/admin/projects", "GET");
        const data = await response.json();
        console.log("Projects API response:", data);
        console.log("Number of projects:", data.length);
        if (data.length > 0) {
          console.log("First project:", data[0]);
        }
        return data;
      } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }
    },
  });

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter((project) =>
      getLocalizedText(project, "title").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (getLocalizedText(project, "description") && getLocalizedText(project, "description").toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort projects
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle null/undefined values
      if (aValue == null) aValue = sortField === "sortOrder" ? 0 : "";
      if (bValue == null) bValue = sortField === "sortOrder" ? 0 : "";

      // Special handling for numeric fields
      if (sortField === "sortOrder" || sortField === "id") {
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        if (sortDirection === "asc") {
          return aNum - bNum;
        } else {
          return bNum - aNum;
        }
      }

      // Special handling for dates
      if (sortField === "createdAt") {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        if (sortDirection === "asc") {
          return aDate - bDate;
        } else {
          return bDate - aDate;
        }
      }

      // Convert to string for comparison
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (sortDirection === "asc") {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });

    return filtered;
  }, [projects, searchTerm, sortField, sortDirection]);

  const createProjectMutation = useMutation({
    mutationFn: async (projectData: InsertProject) => {
      console.log('=== createProjectMutation.mutateFn called ===');
      console.log('Creating project with data:', projectData);
      try {
        const response = await apiRequest("/api/admin/projects", "POST", projectData);
        console.log('Create response:', response);
        return response;
      } catch (error) {
        console.error('Error in createProjectMutation:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('=== createProjectMutation.onSuccess ===');
      console.log('Create successful, data:', data);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      setIsFormOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    },
    onError: (error) => {
      console.error('=== createProjectMutation.onError ===');
      console.error('Create failed:', error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, projectData }: { id: number; projectData: Partial<InsertProject> }) => {
      console.log('=== updateProjectMutation.mutateFn called ===');
      console.log('Updating project ID:', id);
      console.log('Project data to update:', projectData);
      try {
        const response = await apiRequest(`/api/admin/projects/${id}`, "PATCH", projectData);
        console.log('Update response:', response);
        return response;
      } catch (error) {
        console.error('Error in updateProjectMutation:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('=== updateProjectMutation.onSuccess ===');
      console.log('Update successful, data:', data);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      setIsFormOpen(false);
      setEditingProject(null);
      form.reset();
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    },
    onError: (error) => {
      console.error('=== updateProjectMutation.onError ===');
      console.error('Update failed:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/projects/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertProject) => {
    console.log('=== handleSubmit called ===');
    console.log('ProjectsManager: Form data received:', data);
    console.log('ProjectsManager: Current translations state:', translations);
    console.log('ProjectsManager: editingProject state:', editingProject);
    
    // Extract title and description from translations (English as primary)
    const title = translations.en?.title || data.title || "";
    const description = translations.en?.description || data.description || "";
    
    // Prepare the project data with translations
    const projectDataWithTranslations = {
      ...data,
      title: title,
      description: description,
      translations: translations,
      defaultLanguage: "en"
    };

    console.log('ProjectsManager: Submitting project with data:', projectDataWithTranslations);

    if (editingProject) {
      console.log('Updating existing project with ID:', editingProject.id);
      updateProjectMutation.mutate({ id: editingProject.id, projectData: projectDataWithTranslations });
    } else {
      console.log('Creating new project');
      createProjectMutation.mutate(projectDataWithTranslations);
    }
  };

  const handleEdit = (project: Project) => {
    console.log("=== handleEdit called ===");
    console.log("Project to edit:", project);
    console.log("Project ID:", project.id);
    console.log("Project title:", project.title);
    console.log("Project translations:", project.translations);
    
    setEditingProject(project);
    
    // Load translations if they exist
    if (project.translations) {
      console.log("Setting translations from project:", project.translations);
      setTranslations(project.translations as any);
    } else {
      console.log("No translations found, initializing default structure");
      // Initialize with default structure
      setTranslations({
        en: { title: project.title, description: project.description || "" },
        mk: { title: "", description: "" },
        de: { title: "", description: "" }
      });
    }
    
    console.log("Resetting form with project data");
    form.reset({
      title: project.title,
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      pdfUrl: project.pdfUrl || "",
      status: (project.status as "active" | "completed" | "on-hold" | "cancelled") || "active",
      sortOrder: project.sortOrder || 0,
    });
    setIsFormOpen(true);
    console.log("Form opened, editingProject state set to:", project);
  };

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Project) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const handleDelete = (id: number) => {
    deleteProjectMutation.mutate(id);
  };

  const resetForm = () => {
    console.log('=== resetForm called ===');
    form.reset({
      title: "",
      description: "",
      imageUrl: "",
      pdfUrl: "",
      status: "active",
      sortOrder: 0,
    });
    setTranslations({
      en: { title: "", description: "" },
      mk: { title: "", description: "" },
      de: { title: "", description: "" }
    });
    setEditingProject(null);
    setIsFormOpen(false);
    console.log('Form reset, editingProject cleared');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="projects-title">Projects Management</h2>
          <p className="text-slate-600" data-testid="projects-description">Manage your company projects with images and PDF documents</p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={(open) => {
          console.log('=== Dialog onOpenChange ===');
          console.log('Form open state changing to:', open);
          setIsFormOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} data-testid="button-add-project">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]" data-testid="project-form-dialog">
            <DialogHeader>
              <DialogTitle data-testid="form-title">
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription>
                Fill in the project details. You can add images and PDF documents.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={(e) => {
                console.log('=== Form onSubmit ===');
                console.log('Form event:', e);
                form.handleSubmit(handleSubmit)(e);
              }} className="space-y-4">
                {/* Multilingual Title Field */}
                <TranslatableFieldEditor
                  label="Project Title"
                  fieldName="title"
                  type="text"
                  currentTranslations={translations}
                  originalValue={translations.en?.title || ""}
                  onChange={(newTranslations) => {
                    console.log('=== Title translations changed ===');
                    console.log('New translations:', newTranslations);
                    setTranslations(newTranslations);
                  }}
                />

                {/* Multilingual Description Field */}
                <TranslatableFieldEditor
                  label="Project Description"
                  fieldName="description"
                  type="textarea"
                  currentTranslations={translations}
                  originalValue={translations.en?.description || ""}
                  onChange={(newTranslations) => {
                    console.log('=== Description translations changed ===');
                    console.log('New translations:', newTranslations);
                    setTranslations(newTranslations);
                  }}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          label="Image URL"
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Enter image URL or upload image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pdfUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          label="PDF Document URL"
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Enter PDF URL or upload document"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || "active"}>
                          <FormControl>
                            <SelectTrigger data-testid="select-project-status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
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
                            type="number" 
                            placeholder="0" 
                            {...field}
                            value={field.value || 0}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-project-sort-order"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    data-testid="button-cancel-project"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                    data-testid="button-save-project"
                    onClick={() => {
                      console.log('=== Submit button clicked ===');
                      console.log('Form state:', form.getValues());
                      console.log('Current translations:', translations);
                      console.log('Editing project:', editingProject);
                    }}
                  >
                    {createProjectMutation.isPending || updateProjectMutation.isPending 
                      ? "Saving..." 
                      : editingProject ? "Update Project" : "Create Project"
                    }
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="search-projects"
                />
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-slate-500" />
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="mk">🇲🇰 Македонски</SelectItem>
                  <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      {filteredAndSortedProjects.length > 0 && (
        <Card data-testid="projects-list-card">
          <CardHeader>
            <CardTitle>Projects ({filteredAndSortedProjects.length})</CardTitle>
            <CardDescription>All projects in your database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium"
                        onClick={() => handleSort("title")}
                      >
                        Title
                        {getSortIcon("title")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium"
                        onClick={() => handleSort("status")}
                      >
                        Status
                        {getSortIcon("status")}
                      </Button>
                    </TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>PDF</TableHead>
                    <TableHead>Translations</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium"
                        onClick={() => handleSort("sortOrder")}
                      >
                        Order
                        {getSortIcon("sortOrder")}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium"
                        onClick={() => handleSort("createdAt")}
                      >
                        Created
                        {getSortIcon("createdAt")}
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedProjects.map((project: Project) => (
                    <TableRow key={project.id} data-testid={`project-row-${project.id}`}>
                      <TableCell>
                        <div>
                          <div className="font-medium" data-testid={`project-title-${project.id}`}>
                            {getLocalizedText(project, "title")}
                          </div>
                          {getLocalizedText(project, "description") && (
                            <div className="text-sm text-slate-600 truncate max-w-xs">
                              {getLocalizedText(project, "description")}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            project.status === "active" ? "default" : 
                            project.status === "completed" ? "secondary" :
                            project.status === "on-hold" ? "outline" : "destructive"
                          }
                          data-testid={`project-status-${project.id}`}
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {project.imageUrl ? (
                          <div className="flex items-center gap-1">
                            <img 
                              src={project.imageUrl} 
                              alt={getLocalizedText(project, "title")}
                              className="h-8 w-8 object-cover rounded"
                            />
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => project.imageUrl && window.open(project.imageUrl, '_blank')}
                              data-testid={`project-image-link-${project.id}`}
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
                        {project.pdfUrl ? (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => project.pdfUrl && window.open(project.pdfUrl, '_blank')}
                            data-testid={`project-pdf-link-${project.id}`}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View PDF
                          </Button>
                        ) : (
                          <span className="text-slate-400 text-sm">No PDF</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const status = getTranslationStatus(project);
                          return (
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(status).map(([lang, hasTranslation]) => (
                                <Badge 
                                  key={lang} 
                                  variant={hasTranslation ? "default" : "secondary"}
                                  className={hasTranslation ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                                >
                                  {lang === 'en' ? '🇺🇸' : lang === 'mk' ? '🇲🇰' : '🇩🇪'} {lang.toUpperCase()}
                                </Badge>
                              ))}
                            </div>
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        {project.sortOrder || 0}
                      </TableCell>
                      <TableCell className="text-sm text-slate-600" data-testid={`project-date-${project.id}`}>
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(project)}
                            data-testid={`button-edit-project-${project.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                data-testid={`button-delete-project-${project.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{getLocalizedText(project, "title")}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(project.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                  data-testid={`confirm-delete-project-${project.id}`}
                                >
                                  Delete Project
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
            </div>
          </CardContent>
        </Card>
      )}

      {filteredAndSortedProjects.length === 0 && (
        <Card className="p-8 text-center">
          <FileUp className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No projects found</h3>
          <p className="text-slate-600 mb-4">
            {searchTerm 
              ? "No projects match your search criteria"
              : "Get started by adding your first project"
            }
          </p>
          {!searchTerm && (
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}