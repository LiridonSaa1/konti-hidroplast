import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Edit, Plus, Users, Mail, User, Eye } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileUpload } from "@/components/ui/file-upload";
import { insertTeamSchema, type Team, type InsertTeam, type Position } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { TranslatableFieldEditor } from "./TranslatableFieldEditor";



export function TeamsManager() {
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [translations, setTranslations] = useState<{
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  }>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertTeam>({
    resolver: zodResolver(insertTeamSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      imageUrl: "",
      active: true,
      sortOrder: 0,
    },
  });

  const { data: teams = [], isLoading } = useQuery<Team[]>({
    queryKey: ["/api/admin/teams"],
  });

  const { data: positions = [], isLoading: isLoadingPositions } = useQuery<Position[]>({
    queryKey: ["/api/admin/positions"],
  });

  const createTeamMutation = useMutation({
    mutationFn: async (teamData: InsertTeam) => {
      // Get the English name and position from translations or fallback to the main fields
      const englishName = translations.en?.name || teamData.name;
      const englishPosition = translations.en?.position || teamData.position;
      
      // For now, store the English values in the main fields
      // In the future, when translations are supported, this can be updated
      const dataToSend = {
        ...teamData,
        name: englishName,
        position: englishPosition,
      };
      
      console.log('Sending create request with data:', dataToSend);
      return await apiRequest("/api/admin/teams", "POST", dataToSend);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/teams"] });
      setIsFormOpen(false);
      form.reset();
      setTranslations({});
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
    },
    onError: (error) => {
      console.error('Create team error:', error);
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    },
  });

  const updateTeamMutation = useMutation({
    mutationFn: async ({ id, teamData }: { id: number; teamData: Partial<InsertTeam> }) => {
      // Get the English name and position from translations or fallback to the main fields
      const englishName = translations.en?.name || teamData.name;
      const englishPosition = translations.en?.position || teamData.position;
      
      // For now, store the English values in the main fields
      // In the future, when translations are supported, this can be updated
      const dataToSend = {
        ...teamData,
        name: englishName,
        position: englishPosition,
      };
      
      console.log('Sending update request with data:', dataToSend);
      return await apiRequest(`/api/admin/teams/${id}`, "PATCH", dataToSend);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/teams"] });
      setIsFormOpen(false);
      setEditingTeam(null);
      form.reset();
      setTranslations({});
      toast({
        title: "Success",
        description: "Team member updated successfully",
      });
    },
    onError: (error) => {
      console.error('Update team error:', error);
      toast({
        title: "Error",
        description: "Failed to update team member",
        variant: "destructive",
      });
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/teams/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/teams"] });
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertTeam) => {
    console.log('Form data being submitted:', data);
    console.log('Current translations:', translations);
    console.log('Form errors:', form.formState.errors);
    
    if (editingTeam) {
      console.log('Updating team with ID:', editingTeam.id);
      updateTeamMutation.mutate({ id: editingTeam.id, teamData: data });
    } else {
      console.log('Creating new team');
      createTeamMutation.mutate(data);
    }
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    
    // Initialize translations from the team data
    // For now, we'll use the main fields as English translations
    const teamTranslations = {
      en: { 
        name: team.name || "",
        position: team.position || ""
      },
      mk: { 
        name: "", // Will be empty for existing teams
        position: ""
      },
      de: { 
        name: "", // Will be empty for existing teams
        position: ""
      }
    };
    
    setTranslations(teamTranslations);
    
    form.reset({
      name: team.name || "",
      position: team.position || "",
      email: team.email,
      imageUrl: team.imageUrl || "",
      active: team.active || true,
      sortOrder: team.sortOrder || 0,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteTeamMutation.mutate(id);
  };

  const resetForm = () => {
    form.reset({
      name: "",
      position: "",
      email: "",
      imageUrl: "",
      active: true,
      sortOrder: 0,
    });
    setTranslations({});
    setEditingTeam(null);
    setIsFormOpen(false);
  };

  const getStatusBadgeColor = (active: boolean) => {
    return active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getStatusLabel = (active: boolean) => {
    return active ? "Active" : "Inactive";
  };

  if (isLoading || isLoadingPositions) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900" data-testid="teams-title">Teams Management</h2>
          <p className="text-slate-600 text-sm sm:text-base" data-testid="teams-description">Manage your team members with photos and contact information</p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} data-testid="button-add-team">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]" data-testid="team-form-dialog">
            <DialogHeader>
              <DialogTitle data-testid="form-title">
                {editingTeam ? "Edit Team Member" : "Add New Team Member"}
              </DialogTitle>
              <DialogDescription>
                Fill in the team member details including name, position, email and photo.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form 
                onSubmit={(e) => {
                  console.log('Form submit event triggered');
                  form.handleSubmit(handleSubmit)(e);
                }} 
                className="space-y-4" 
                data-testid="team-form"
              >
                {/* Multi-language Name Field */}
                <TranslatableFieldEditor
                  label="Full Name"
                  fieldName="name"
                  type="text"
                  currentTranslations={translations}
                  originalValue={translations.en?.name || ""}
                  defaultLanguage="en"
                  onChange={setTranslations}
                />
                


                {/* Position Field - Select from existing positions */}
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-team-position">
                            <SelectValue placeholder="Select a position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {positions
                            .filter(pos => pos.active)
                            .map((position) => (
                              <SelectItem key={position.id} value={position.title}>
                                {position.title}
                              </SelectItem>
                            ))}
                          {positions.length === 0 && (
                            <SelectItem value="custom" disabled>
                              No positions available - Add positions first
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter email address" 
                          {...field} 
                          data-testid="input-team-email" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          label="Profile Photo"
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Upload profile photo or enter image URL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            data-testid="input-team-sort"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value ? "active" : "inactive"} 
                            onValueChange={(value) => {
                              field.onChange(value === "active");
                            }}
                            data-testid="select-team-status"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel">
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    data-testid="button-submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Saving..." : editingTeam ? "Update" : "Add"} Team Member
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {teams.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle data-testid="teams-table-title">
              Team Members ({teams.length})
            </CardTitle>
            <CardDescription>
              All team members in your database
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Photo</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.id} data-testid={`team-row-${team.id}`}>
                      <TableCell className="font-medium" data-testid={`team-name-${team.id}`}>
                        {team.name}
                      </TableCell>
                      <TableCell data-testid={`team-position-${team.id}`}>
                        {team.position}
                      </TableCell>
                      <TableCell data-testid={`team-email-${team.id}`}>
                        {team.email}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={getStatusBadgeColor(team.active ?? false)}
                          data-testid={`team-status-${team.id}`}
                        >
                          {team.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {team.imageUrl ? (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => team.imageUrl && window.open(team.imageUrl, '_blank')}
                            data-testid={`button-view-photo-${team.id}`}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Photo
                          </Button>
                        ) : (
                          <span className="text-slate-400 text-sm">No photo</span>
                        )}
                      </TableCell>
                      <TableCell data-testid={`team-order-${team.id}`}>
                        {team.sortOrder || 0}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(team)}
                            data-testid={`button-edit-${team.id}`}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                data-testid={`button-delete-${team.id}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent data-testid={`dialog-delete-${team.id}`}>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{team.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(team.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                  data-testid="button-confirm-delete"
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
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {teams.map((team) => (
                <Card key={team.id} className="p-4" data-testid={`team-card-${team.id}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900" data-testid={`team-name-${team.id}`}>
                        {team.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1" data-testid={`team-position-${team.id}`}>
                        {team.position}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(team)}
                        data-testid={`button-edit-${team.id}`}
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            data-testid={`button-delete-${team.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent data-testid={`dialog-delete-${team.id}`}>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{team.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(team.id)}
                              className="bg-red-600 hover:bg-red-700"
                              data-testid="button-confirm-delete"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span data-testid={`team-email-${team.id}`}>{team.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Status:</span>
                      <Badge 
                        className={getStatusBadgeColor(team.active ?? false)}
                        data-testid={`team-status-${team.id}`}
                      >
                        {team.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Order:</span>
                      <span data-testid={`team-order-${team.id}`}>{team.sortOrder || 0}</span>
                    </div>
                    {team.imageUrl && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Photo:</span>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-blue-600"
                          onClick={() => team.imageUrl && window.open(team.imageUrl, '_blank')}
                          data-testid={`button-view-photo-${team.id}`}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {teams.length === 0 && (
        <Card className="p-8 text-center" data-testid="no-teams-message">
          <Users className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No team members yet</h3>
          <p className="text-slate-600 mb-4">Start by adding your first team member to showcase your company team.</p>
          <Button onClick={() => resetForm()} data-testid="button-add-first-team">
            <Plus className="h-4 w-4 mr-2" />
            Add First Team Member
          </Button>
        </Card>
      )}
    </div>
  );
}