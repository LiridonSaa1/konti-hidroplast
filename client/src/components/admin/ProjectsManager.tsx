import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, FileUp, Image as ImageIcon, Eye, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
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
import { insertProjectSchema, type Project, type InsertProject } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { TranslatableFieldEditor } from "./TranslatableFieldEditor";

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
  }>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  // Sync translations with form values for backward compatibility
  useEffect(() => {
    const enTranslations = translations.en || {};
    if (enTranslations.title) {
      form.setValue('title', enTranslations.title);
    }
    if (enTranslations.description) {
      form.setValue('description', enTranslations.description);
    }
  }, [translations, form]);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/admin/projects"],
  });

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
      return await apiRequest("/api/admin/projects", "POST", projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/projects"] });
      setIsFormOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, projectData }: { id: number; projectData: Partial<InsertProject> }) => {
      return await apiRequest(`/api/admin/projects/${id}`, "PATCH", projectData);
    },
    onSuccess: () => {
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
    const projectData = {
      ...data,
      translations,
      defaultLanguage: 'en' as const
    };
    
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, projectData });
    } else {
      createProjectMutation.mutate(projectData);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      description: project.description || "",
      imageUrl: project.imageUrl || "",
      pdfUrl: project.pdfUrl || "",
      status: (project.status as "active" | "completed" | "on-hold" | "cancelled") || "active",
      sortOrder: project.sortOrder || 0,
    });
    
    // Load translations from project data
    setTranslations(project.translations || {
      en: { title: project.title, description: project.description || '' }
    });
    
    setIsFormOpen(true);
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
    form.reset({
      title: "",
      description: "",
      imageUrl: "",
      pdfUrl: "",
      status: "active",
      sortOrder: 0,
    });
    setTranslations({});
    setEditingProject(null);
    setIsFormOpen(false);
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
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
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
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <TranslatableFieldEditor
                  label="Project Title"
                  fieldName="title"
                  currentTranslations={translations}
                  originalValue={form.getValues('title')}
                  onChange={setTranslations}
                />

                <TranslatableFieldEditor
                  label="Project Description"
                  fieldName="description"
                  type="textarea"
                  currentTranslations={translations}
                  originalValue={form.getValues('description')}
                  onChange={setTranslations}
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
                          testId="input-project-image"
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
                          testId="input-project-pdf"
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
                            {project.title}
                          </div>
                          {project.description && (
                            <div className="text-sm text-slate-600 truncate max-w-xs">
                              {project.description}
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
                              alt={project.title}
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
                                  Are you sure you want to delete "{project.title}"? This action cannot be undone.
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