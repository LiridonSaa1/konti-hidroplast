import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Upload } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertCompanyInfoSchema, type CompanyInfo, type InsertCompanyInfo, type Position } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function LeadershipManager() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertCompanyInfo>({
    resolver: zodResolver(insertCompanyInfoSchema),
    defaultValues: {
      key: "leadership_message",
      category: "branding",
      value: JSON.stringify({
        title: "Building the Future of Infrastructure",
        description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
        description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
        leaderName: "Boris Madjunkov",
        leaderPosition: "",
        leaderImage: ""
      })
    },
  });

  // Fetch leadership data
  const { data: leadershipData, isLoading, refetch } = useQuery({
    queryKey: ["/api/admin/company-info", "leadership_message"],
    queryFn: async () => {
      try {
        const result = await apiRequest("/api/admin/company-info/leadership_message", "GET");
        console.log("Fetched leadership data:", result);
        return result;
      } catch (error) {
        console.log("Leadership data not found, using default");
        // Return default data if not found
        return {
          id: "",
          key: "leadership_message",
          category: "branding",
          value: JSON.stringify({
            title: "Building the Future of Infrastructure",
            description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
            description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
            leaderName: "Boris Madjunkov",
            leaderPosition: "",
            leaderImage: ""
          }),
          updatedAt: new Date()
        };
      }
    },
  });

  // Fetch positions for dropdown
  const { data: positions = [] } = useQuery<Position[]>({
    queryKey: ["/api/admin/positions"],
  });

  const updateLeadershipMutation = useMutation({
    mutationFn: async (data: InsertCompanyInfo) => {
      return await apiRequest("/api/admin/company-info", "POST", data);
    },
    onSuccess: async (result) => {
      console.log("Leadership message save successful:", result);
      
      // Invalidate and refetch the specific query
      await queryClient.invalidateQueries({ queryKey: ["/api/admin/company-info", "leadership_message"] });
      
      // Update UI states
      setIsFormOpen(false);
      setSelectedImage(null);
      setImagePreview(null);
      
      toast({
        title: "Success",
        description: "Leadership message updated successfully",
      });
    },
    onError: (error) => {
      console.error("Leadership message save failed:", error);
      toast({
        title: "Error",
        description: "Failed to update leadership message",
        variant: "destructive",
      });
    },
  });

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const { url } = await response.json();
      return url;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleSubmit = async (data: InsertCompanyInfo) => {
    try {
      let imageUrl = "";
      
      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage);
      } else if (leadershipData && typeof leadershipData === 'object' && 'value' in leadershipData) {
        const currentData = JSON.parse(leadershipData.value);
        imageUrl = currentData.leaderImage || "";
      }

      const leadershipContent = JSON.parse(data.value);
      leadershipContent.leaderImage = imageUrl;

      updateLeadershipMutation.mutate({
        key: "leadership_message",
        category: "branding",
        value: JSON.stringify(leadershipContent)
      });
    } catch (error) {
      // Error already handled in handleImageUpload
    }
  };

  const handleEdit = () => {
    // Clear states first
    setSelectedImage(null);
    setImagePreview(null);
    
    if (leadershipData && typeof leadershipData === 'object' && 'value' in leadershipData) {
      const currentData = JSON.parse(leadershipData.value);
      form.reset({
        key: "leadership_message",
        category: "branding",
        value: JSON.stringify(currentData)
      });
      
      // Set image preview to current saved image if it exists
      if (currentData.leaderImage) {
        setImagePreview(currentData.leaderImage);
      }
    }
    setIsFormOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update image preview when leadership data changes
  useEffect(() => {
    if (leadershipData && typeof leadershipData === 'object' && 'value' in leadershipData && !isFormOpen) {
      const currentData = JSON.parse(leadershipData.value);
      if (currentData.leaderImage && !imagePreview) {
        // Only set preview if there's no current preview (to not override user selection)
        setImagePreview(currentData.leaderImage);
      }
    }
  }, [leadershipData, isFormOpen, imagePreview]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Parse leadership content - use a key to force re-render
  let leadershipContent: any = {};
  if (leadershipData && typeof leadershipData === 'object' && 'value' in leadershipData) {
    try {
      leadershipContent = JSON.parse(leadershipData.value);
    } catch (error) {
      console.error('Failed to parse leadership data:', error);
      leadershipContent = {};
    }
  }
  
  console.log('Leadership data:', leadershipData, leadershipContent);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="leadership-title">Leadership Management</h2>
          <p className="text-slate-600" data-testid="leadership-description">Manage leadership message and executive information</p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleEdit} data-testid="button-edit-leadership">
              <Edit className="h-4 w-4 mr-2" />
              Edit Leadership Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]" data-testid="leadership-form-dialog">
            <DialogHeader>
              <DialogTitle data-testid="form-title">Edit Leadership Message</DialogTitle>
              <DialogDescription>
                Update the leadership message and executive information displayed on the website.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => {
                const content = JSON.parse(data.value);
                handleSubmit({
                  key: "leadership_message",
                  category: "branding",
                  value: JSON.stringify(content)
                });
              })} className="space-y-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => {
                    const content = JSON.parse(field.value);
                    return (
                      <div className="space-y-4">
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input 
                              value={content.title}
                              onChange={(e) => {
                                const updatedContent = { ...content, title: e.target.value };
                                field.onChange(JSON.stringify(updatedContent));
                              }}
                              placeholder="Enter leadership title"
                              data-testid="input-leadership-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>

                        <FormItem>
                          <FormLabel>Description 1</FormLabel>
                          <FormControl>
                            <Textarea 
                              value={content.description1}
                              onChange={(e) => {
                                const updatedContent = { ...content, description1: e.target.value };
                                field.onChange(JSON.stringify(updatedContent));
                              }}
                              placeholder="Enter first description paragraph"
                              rows={4}
                              data-testid="input-leadership-description1"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>

                        <FormItem>
                          <FormLabel>Description 2</FormLabel>
                          <FormControl>
                            <Textarea 
                              value={content.description2}
                              onChange={(e) => {
                                const updatedContent = { ...content, description2: e.target.value };
                                field.onChange(JSON.stringify(updatedContent));
                              }}
                              placeholder="Enter second description paragraph"
                              rows={2}
                              data-testid="input-leadership-description2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>

                        <FormItem>
                          <FormLabel>Leader Name</FormLabel>
                          <FormControl>
                            <Input 
                              value={content.leaderName}
                              onChange={(e) => {
                                const updatedContent = { ...content, leaderName: e.target.value };
                                field.onChange(JSON.stringify(updatedContent));
                              }}
                              placeholder="Enter leader name"
                              data-testid="input-leader-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>

                        <FormItem>
                          <FormLabel>Leader Position</FormLabel>
                          <Select
                            value={content.leaderPosition}
                            onValueChange={(value) => {
                              const updatedContent = { ...content, leaderPosition: value };
                              field.onChange(JSON.stringify(updatedContent));
                            }}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-leader-position">
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {positions.map((position) => (
                                <SelectItem key={position.id} value={position.title}>
                                  {position.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>

                        <FormItem>
                          <FormLabel>Leader Photo</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                data-testid="input-leader-image"
                              />
                              {imagePreview && (
                                <div className="flex items-center space-x-2">
                                  <img 
                                    src={imagePreview} 
                                    alt="Leader preview" 
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      setImagePreview(null);
                                      setSelectedImage(null);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    );
                  }}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} data-testid="button-cancel">
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-submit">
                    Update Leadership Message
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leadership Message Display */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" data-testid="leadership-display">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Leadership Message</h3>
              <p className="text-sm text-gray-600">Preview of the leadership message display</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 bg-slate-800 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-sm text-slate-400 uppercase tracking-wide">Leadership Message</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                {leadershipContent.leaderImage ? (
                  <div className="w-64 h-80 rounded-xl overflow-hidden bg-white p-4">
                    <img 
                      src={leadershipContent.leaderImage} 
                      alt={leadershipContent.leaderName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-64 h-80 rounded-xl bg-gray-300 flex items-center justify-center">
                    <Upload className="h-12 w-12 text-gray-500" />
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-bold leading-tight">
                  {leadershipContent.title || "Building the Future of Infrastructure"}
                </h2>
                
                <p className="text-slate-300 leading-relaxed">
                  {leadershipContent.description1 || "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow."}
                </p>
                
                <p className="text-slate-300 leading-relaxed">
                  {leadershipContent.description2 || "Together, we build not just for today, but for a future our next generations will be proud of."}
                </p>
                
                <div className="pt-4">
                  <h3 className="text-xl font-semibold text-white">
                    {leadershipContent.leaderName || "Boris Madjunkov"}
                  </h3>
                  <p className="text-slate-400">
                    {leadershipContent.leaderPosition || "General Manager"}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-600">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    KONTI HIDROPLAST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}