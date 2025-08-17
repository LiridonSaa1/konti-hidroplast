import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, Plus, Briefcase, Building, Star } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertPositionSchema, type Position, type InsertPosition } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function PositionsManager() {
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertPosition>({
    resolver: zodResolver(insertPositionSchema),
    defaultValues: {
      title: "",
      description: "",
      active: true,
    },
  });

  const { data: positions = [], isLoading } = useQuery<Position[]>({
    queryKey: ["/api/admin/positions"],
  });

  const createPositionMutation = useMutation({
    mutationFn: async (positionData: InsertPosition) => {
      return await apiRequest("/api/admin/positions", "POST", positionData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/positions"] });
      setIsFormOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Position created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create position",
        variant: "destructive",
      });
    },
  });

  const updatePositionMutation = useMutation({
    mutationFn: async ({ id, positionData }: { id: number; positionData: Partial<InsertPosition> }) => {
      return await apiRequest(`/api/admin/positions/${id}`, "PATCH", positionData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/positions"] });
      setIsFormOpen(false);
      setEditingPosition(null);
      form.reset();
      toast({
        title: "Success",
        description: "Position updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update position",
        variant: "destructive",
      });
    },
  });

  const deletePositionMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/admin/positions/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/positions"] });
      toast({
        title: "Success",
        description: "Position deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete position",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertPosition) => {
    if (editingPosition) {
      updatePositionMutation.mutate({ id: editingPosition.id, positionData: data });
    } else {
      createPositionMutation.mutate(data);
    }
  };

  const handleEdit = (position: Position) => {
    setEditingPosition(position);
    form.reset({
      title: position.title,
      description: position.description || "",
      active: position.active || true,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePositionMutation.mutate(id);
  };

  const resetForm = () => {
    form.reset({
      title: "",
      description: "",
      active: true,
    });
    setEditingPosition(null);
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
          <h2 className="text-2xl font-bold text-slate-900" data-testid="positions-title">Position Management</h2>
          <p className="text-slate-600" data-testid="positions-description">Manage organizational positions and job titles</p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} data-testid="button-add-position">
              <Plus className="h-4 w-4 mr-2" />
              Add Position
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]" data-testid="position-form-dialog">
            <DialogHeader>
              <DialogTitle data-testid="form-title">
                {editingPosition ? "Edit Position" : "Add New Position"}
              </DialogTitle>
              <DialogDescription>
                Create and manage positions within your organization structure.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter position title" {...field} data-testid="input-position-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter position description" 
                          {...field}
                          value={field.value || ""}
                          rows={3}
                          data-testid="input-position-description"
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
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                          data-testid="input-position-active"
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Active</FormLabel>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel">
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-submit">
                    {editingPosition ? "Update" : "Add"} Position
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map((position) => (
          <Card key={position.id} className="hover:shadow-lg transition-shadow" data-testid={`position-card-${position.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg" data-testid={`position-title-${position.id}`}>
                      {position.title}
                    </CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {position.description && (
                  <p className="text-sm text-slate-600" data-testid={`position-description-${position.id}`}>
                    {position.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <Badge variant={position.active ? "default" : "secondary"} data-testid={`position-status-${position.id}`}>
                    {position.active ? "Active" : "Inactive"}
                  </Badge>
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(position)}
                      data-testid={`button-edit-${position.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(position.id)}
                      className="text-red-600 hover:text-red-700"
                      data-testid={`button-delete-${position.id}`}
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

      {positions.length === 0 && (
        <Card className="p-8 text-center" data-testid="no-positions-message">
          <Star className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No positions defined yet</h3>
          <p className="text-slate-600 mb-4">Start by adding organizational positions to structure your team.</p>
          <Button onClick={() => resetForm()} data-testid="button-add-first-position">
            <Plus className="h-4 w-4 mr-2" />
            Add First Position
          </Button>
        </Card>
      )}
    </div>
  );
}