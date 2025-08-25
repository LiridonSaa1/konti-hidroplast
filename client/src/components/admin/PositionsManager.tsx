import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Plus, Briefcase, Building, Star } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertPositionSchema, type Position, type InsertPosition } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { TranslatableFieldEditor } from "./TranslatableFieldEditor";

const STATUS_OPTIONS = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
  { value: "inactive", label: "Inactive", color: "bg-red-100 text-red-800" },
  { value: "draft", label: "Draft", color: "bg-yellow-100 text-yellow-800" },
  { value: "archived", label: "Archived", color: "bg-gray-100 text-gray-800" }
];

export function PositionsManager() {
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [translations, setTranslations] = useState<{
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  }>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertPosition & { status: string }>({
    resolver: zodResolver(insertPositionSchema),
    defaultValues: {
      title: "",
      active: true,
      status: "active",
      sortOrder: 0,
    },
  });

  const { data: positions = [], isLoading } = useQuery<Position[]>({
    queryKey: ["/api/admin/positions"],
  });

  // Sort positions by sortOrder
  const sortedPositions = [...positions].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const createPositionMutation = useMutation({
    mutationFn: async (positionData: InsertPosition) => {
      // Get the English title from translations or fallback to the main title
      const englishTitle = translations.en?.title || positionData.title;
      
      const dataToSend = {
        ...positionData,
        title: englishTitle,
        translations: {
          en: { title: englishTitle },
          mk: { title: translations.mk?.title || "" },
          de: { title: translations.de?.title || "" }
        }
      };
      
      return await apiRequest("/api/admin/positions", "POST", dataToSend);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/positions"] });
      setIsFormOpen(false);
      form.reset();
      setTranslations({});
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
      // Get the English title from translations or fallback to the main title
      const englishTitle = translations.en?.title || positionData.title;
      
      const dataToSend = {
        ...positionData,
        title: englishTitle,
        translations: {
          en: { title: englishTitle },
          mk: { title: translations.mk?.title || "" },
          de: { title: translations.de?.title || "" }
        }
      };
      
      return await apiRequest(`/api/admin/positions/${id}`, "PATCH", dataToSend);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/positions"] });
      setIsFormOpen(false);
      setEditingPosition(null);
      form.reset();
      setTranslations({});
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
    const derivedStatus = position.active ? 'active' : 'inactive';
    
    // Initialize translations from the position data
    const positionTranslations = {
      en: { title: position.title || "" },
      mk: { title: (position.translations as any)?.mk?.title || "" },
      de: { title: (position.translations as any)?.de?.title || "" }
    };
    
    setTranslations(positionTranslations);
    
    form.reset({
      title: position.title || "",
      active: position.active || true,
      status: derivedStatus,
      sortOrder: position.sortOrder || 0,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    deletePositionMutation.mutate(id);
  };

  const resetForm = () => {
    form.reset({
      title: "",
      active: true,
      status: "active",
      sortOrder: 0,
    });
    setTranslations({});
    setEditingPosition(null);
    setIsFormOpen(false);
  };

  const getStatusBadgeColor = (active: boolean) => {
    return active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
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
                {/* Multi-language Position Title Field */}
                <TranslatableFieldEditor
                  label="Position Title"
                  fieldName="title"
                  type="text"
                  currentTranslations={translations}
                  originalValue={translations.en?.title || ""}
                  onChange={setTranslations}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select 
                          value={field.value} 
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue("active", value === "active");
                          }}
                          data-testid="select-position-status"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
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
                          value={field.value || 0}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          onBlur={field.onBlur}
                          name={field.name}
                          data-testid="input-position-sort-order"
                        />
                      </FormControl>
                      <FormMessage />
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
                <TableHead className="text-gray-600 font-medium px-6 py-3">Status</TableHead>
                <TableHead className="text-gray-600 font-medium px-6 py-3">Sort Order</TableHead>
                <TableHead className="text-gray-600 font-medium px-6 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPositions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="px-6 py-8 text-center">
                    <div className="text-gray-500">No positions found</div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedPositions.map((position) => (
                  <TableRow key={position.id} data-testid={`position-row-${position.id}`} className="hover:bg-gray-50">
                    <TableCell className="px-6 py-4" data-testid={`position-title-${position.id}`}>
                      <div className="font-medium text-gray-900">{position.title}</div>
                    </TableCell>
                    <TableCell className="px-6 py-4" data-testid={`position-status-${position.id}`}>
                      <Badge className={getStatusBadgeColor(position.active || false)}>
                        {position.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4" data-testid={`position-sort-order-${position.id}`}>
                      <div className="font-medium text-gray-900">{position.sortOrder}</div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(position)}
                          data-testid={`button-edit-${position.id}`}
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
                              data-testid={`button-delete-${position.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-testid={`dialog-delete-${position.id}`}>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Position</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{position.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(position.id)}
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}