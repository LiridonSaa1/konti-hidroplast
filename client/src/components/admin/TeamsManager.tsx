import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, Plus, Users, Mail, User } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileUpload } from "@/components/ui/file-upload";
import { insertTeamSchema, type Team, type InsertTeam, type Position } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function TeamsManager() {
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
      return await apiRequest("/api/admin/teams", "POST", teamData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/teams"] });
      setIsFormOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    },
  });

  const updateTeamMutation = useMutation({
    mutationFn: async ({ id, teamData }: { id: number; teamData: Partial<InsertTeam> }) => {
      return await apiRequest(`/api/admin/teams/${id}`, "PATCH", teamData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/teams"] });
      setIsFormOpen(false);
      setEditingTeam(null);
      form.reset();
      toast({
        title: "Success",
        description: "Team member updated successfully",
      });
    },
    onError: (error) => {
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
    if (editingTeam) {
      updateTeamMutation.mutate({ id: editingTeam.id, teamData: data });
    } else {
      createTeamMutation.mutate(data);
    }
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    form.reset({
      name: team.name,
      position: team.position,
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
    setEditingTeam(null);
    setIsFormOpen(false);
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="teams-title">Teams Management</h2>
          <p className="text-slate-600" data-testid="teams-description">Manage your team members with photos and contact information</p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} data-testid="button-add-team">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]" data-testid="team-form-dialog">
            <DialogHeader>
              <DialogTitle data-testid="form-title">
                {editingTeam ? "Edit Team Member" : "Add New Team Member"}
              </DialogTitle>
              <DialogDescription>
                Fill in the team member details including name, position, email and photo.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} data-testid="input-team-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          type="image"
                          placeholder="Upload profile photo or enter image URL"
                          testId="input-team-image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
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
                      <FormItem className="flex items-center space-x-2 pt-8">
                        <FormControl>
                          <Switch
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                            data-testid="input-team-active"
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Active</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel">
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-submit">
                    {editingTeam ? "Update" : "Add"} Team Member
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow" data-testid={`team-card-${team.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                {team.imageUrl ? (
                  <img
                    src={team.imageUrl}
                    alt={team.name}
                    className="w-12 h-12 rounded-full object-cover"
                    data-testid={`team-avatar-${team.id}`}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-slate-500" />
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-lg" data-testid={`team-name-${team.id}`}>
                    {team.name}
                  </CardTitle>
                  <CardDescription data-testid={`team-position-${team.id}`}>
                    {team.position}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span data-testid={`team-email-${team.id}`}>{team.email}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant={team.active ? "default" : "secondary"} data-testid={`team-status-${team.id}`}>
                      {team.active ? "Active" : "Inactive"}
                    </Badge>
                    {team.sortOrder !== null && (
                      <Badge variant="outline" data-testid={`team-order-${team.id}`}>
                        Order: {team.sortOrder}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(team)}
                      data-testid={`button-edit-${team.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(team.id)}
                      className="text-red-600 hover:text-red-700"
                      data-testid={`button-delete-${team.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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