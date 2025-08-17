import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
          <h2 className="text-2xl font-bold text-slate-900" data-testid="positions-title">Positions Management</h2>
          <p className="text-slate-600" data-testid="positions-description">Manage organizational positions and their descriptions</p>
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

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" data-testid="positions-table">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Positions ({positions.length})</h3>
              <p className="text-sm text-gray-600">All positions in your database</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-600 font-medium px-6 py-3">Title</TableHead>
                <TableHead className="text-gray-600 font-medium px-6 py-3">Description</TableHead>
                <TableHead className="text-gray-600 font-medium px-6 py-3">Status</TableHead>
                <TableHead className="text-gray-600 font-medium px-6 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="px-6 py-8 text-center">
                    <div className="text-gray-500">No positions found</div>
                  </TableCell>
                </TableRow>
              ) : (
                positions.map((position) => (
                  <TableRow key={position.id} data-testid={`position-row-${position.id}`} className="hover:bg-gray-50">
                    <TableCell className="px-6 py-4" data-testid={`position-title-${position.id}`}>
                      <div className="font-medium text-gray-900">{position.title}</div>
                    </TableCell>
                    <TableCell className="px-6 py-4" data-testid={`position-description-${position.id}`}>
                      {position.description ? (
                        <div className="text-gray-600">{position.description}</div>
                      ) : (
                        <div className="text-gray-400 italic">No description</div>
                      )}
                    </TableCell>
                    <TableCell className="px-6 py-4" data-testid={`position-status-${position.id}`}>
                      <Badge variant={position.active ? "default" : "secondary"} className={position.active ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : ""}>
                        {position.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(position)}
                          data-testid={`button-edit-${position.id}`}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(position.id)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                          data-testid={`button-delete-${position.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}