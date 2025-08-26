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
import { TranslatableFieldEditor } from "./TranslatableFieldEditor";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

export function LeadershipManager() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [translations, setTranslations] = useState<{
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  }>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuth();

  // Debug authentication state
  useEffect(() => {
    console.log("=== Authentication Debug ===");
    console.log("User:", user);
    console.log("Is Authenticated:", isAuthenticated);
    console.log("Auth Token:", localStorage.getItem('authToken'));
    console.log("========================");
  }, [user, isAuthenticated]);

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
        leaderPosition: "General Director",
        leaderImage: "",
        translations: {
          en: {
            title: "Building the Future of Infrastructure",
            description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
            description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
            leaderName: "Boris Madjunkov",
            leaderPosition: "General Director"
          },
          mk: {
            title: "",
            description1: "",
            description2: "",
            leaderName: "",
            leaderPosition: ""
          },
          de: {
            title: "",
            description1: "",
            description2: "",
            leaderName: "",
            leaderPosition: ""
          }
        }
      })
    },
  });

  // Fetch leadership data
  const { data: leadershipData, isLoading, refetch, error: leadershipError } = useQuery({
    queryKey: ["/api/admin/company-info", "leadership_message"],
    queryFn: async () => {
      console.log("=== Fetching Leadership Data ===");
      const token = localStorage.getItem('authToken');
      console.log("Token for leadership fetch:", token);
      
      try {
        const response = await apiRequest("/api/admin/company-info/leadership_message", "GET");
        const result = await response.json();
        console.log("Fetched leadership data:", result);
        return result;
      } catch (error) {
        console.log("Leadership data not found, using default", error);
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
            leaderPosition: "General Director",
            leaderImage: "",
            translations: {
              en: {
                title: "Building the Future of Infrastructure",
                description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
                description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
                leaderName: "Boris Madjunkov",
                leaderPosition: "General Director"
              },
              mk: {
                title: "",
                description1: "",
                description2: "",
                leaderName: "",
                leaderPosition: ""
              },
              de: {
                title: "",
                description1: "",
                description2: "",
                leaderName: "",
                leaderPosition: ""
              }
            }
          }),
          updatedAt: new Date()
        };
      }
    },
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache the data
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window gains focus
  });

  // Fetch positions for dropdown
  const { data: positions = [] } = useQuery<Position[]>({
    queryKey: ["/api/admin/positions"],
  });

  const updateLeadershipMutation = useMutation({
    mutationFn: async (data: InsertCompanyInfo) => {
      console.log("=== updateLeadershipMutation.mutationFn called ===");
      console.log("Data being sent to API:", data);
      console.log("Current auth token:", localStorage.getItem('authToken'));
      console.log("User authenticated:", isAuthenticated);
      console.log("User:", user);
      
      try {
        const response = await apiRequest("/api/admin/company-info", "POST", data);
        console.log("API response received:", response);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const result = await response.json();
        console.log("API response parsed:", result);
        return result;
      } catch (error) {
        console.error("API request failed:", error);
        throw error;
      }
    },
    onSuccess: async (result) => {
      console.log("=== updateLeadershipMutation.onSuccess called ===");
      console.log("Leadership message save successful:", result);
      
      try {
        // Clear all related cache first
        await queryClient.removeQueries({ queryKey: ["/api/admin/company-info", "leadership_message"] });
        
        // Force a fresh fetch with no cache
        await refetch();
        
        // Update UI states
        setIsFormOpen(false);
        setSelectedImage(null);
        setImagePreview(null);
        setTranslations({});
        
        toast({
          title: "Success",
          description: "Leadership message updated successfully",
        });
      } catch (error) {
        console.error("Error in onSuccess:", error);
        toast({
          title: "Warning",
          description: "Data saved but there was an issue refreshing the display",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error("=== updateLeadershipMutation.onError called ===");
      console.error("Leadership message save failed:", error);
      
      let errorMessage = "Failed to update leadership message";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
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
    console.log("=== handleSubmit called ===");
    console.log("Received data:", data);
    console.log("Current translations state:", translations);
    
    try {
      console.log("Leadership form submission started with data:", data);
      let imageUrl = "";
      
      if (selectedImage) {
        console.log("Uploading new image...");
        imageUrl = await handleImageUpload(selectedImage);
        console.log("Image uploaded successfully:", imageUrl);
      } else if (leadershipData && typeof leadershipData === 'object' && 'value' in leadershipData) {
        const currentData = JSON.parse(leadershipData.value);
        imageUrl = currentData.leaderImage || "";
        console.log("Using existing image:", imageUrl);
      }

      // Create the leadership content with translations structure
      const leadershipContent = {
        title: translations.en?.title || "",
        description1: translations.en?.description1 || "",
        description2: translations.en?.description2 || "",
        leaderName: translations.en?.leaderName || "",
        leaderPosition: translations.en?.leaderPosition || "",
        leaderImage: imageUrl,
        translations: {
          en: {
            title: translations.en?.title || "",
            description1: translations.en?.description1 || "",
            description2: translations.en?.description2 || "",
            leaderName: translations.en?.leaderName || "",
            leaderPosition: translations.en?.leaderPosition || ""
          },
          mk: {
            title: translations.mk?.title || "",
            description1: translations.mk?.description1 || "",
            description2: translations.mk?.description2 || "",
            leaderName: translations.mk?.leaderName || "",
            leaderPosition: translations.mk?.leaderPosition || ""
          },
          de: {
            title: translations.de?.title || "",
            description1: translations.de?.description1 || "",
            description2: translations.de?.description2 || "",
            leaderName: translations.de?.leaderName || "",
            leaderPosition: translations.de?.leaderPosition || ""
          }
        }
      };

      const submitData = {
        key: "leadership_message",
        category: "branding",
        value: JSON.stringify(leadershipContent)
      };
      
      console.log("Submitting leadership data with translations:", submitData);
      
      // Validate the data before submission
      try {
        const validatedData = insertCompanyInfoSchema.parse(submitData);
        console.log("Data validation successful:", validatedData);
        updateLeadershipMutation.mutate(validatedData);
      } catch (validationError) {
        console.error("Data validation failed:", validationError);
        toast({
          title: "Validation Error",
          description: "Please check your input data",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast({
        title: "Error",
        description: "Failed to submit leadership data",
        variant: "destructive",
      });
    }
  };

  const handleEdit = () => {
    console.log("=== handleEdit called ===");
    
    // Clear states first
    setSelectedImage(null);
    setImagePreview(null);
    
    if (leadershipData && typeof leadershipData === 'object' && 'value' in leadershipData) {
      const currentData = JSON.parse(leadershipData.value);
      
      console.log("handleEdit - current data:", currentData);
      
      // Initialize translations from the leadership data
      const leadershipTranslations = {
        en: { 
          title: currentData.title || "",
          description1: currentData.description1 || "",
          description2: currentData.description2 || "",
          leaderName: currentData.leaderName || "",
          leaderPosition: currentData.leaderPosition || ""
        },
        mk: { 
          title: currentData.translations?.mk?.title || "",
          description1: currentData.translations?.mk?.description1 || "",
          description2: currentData.translations?.mk?.description2 || "",
          leaderName: currentData.translations?.mk?.leaderName || "",
          leaderPosition: currentData.translations?.mk?.leaderPosition || ""
        },
        de: { 
          title: currentData.translations?.de?.title || "",
          description1: currentData.translations?.de?.description1 || "",
          description2: currentData.translations?.de?.description2 || "",
          leaderName: currentData.translations?.de?.leaderName || "",
          leaderPosition: currentData.translations?.de?.leaderPosition || ""
        }
      };
      
      console.log("handleEdit - initialized translations:", leadershipTranslations);
      setTranslations(leadershipTranslations);
      
      // Reset form with current data
      const formData = {
        key: "leadership_message",
        category: "branding",
        value: JSON.stringify(currentData)
      };
      
      console.log("handleEdit - resetting form with data:", formData);
      form.reset(formData);
      
      // Set image preview to current saved image if it exists
      if (currentData.leaderImage) {
        setImagePreview(currentData.leaderImage);
        console.log("handleEdit - set image preview:", currentData.leaderImage);
      }
    } else {
      console.log("handleEdit - no leadership data found, using defaults");
      // Initialize with default translations if no data exists
      const defaultTranslations = {
        en: { 
          title: "Building the Future of Infrastructure",
          description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
          description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
          leaderName: "Boris Madjunkov"
        },
        mk: { 
          title: "",
          description1: "",
          description2: "",
          leaderName: ""
        },
        de: { 
          title: "",
          description1: "",
          description2: "",
          leaderName: ""
        }
      };
      
      setTranslations(defaultTranslations);
      
      const defaultFormData = {
        key: "leadership_message",
        category: "branding",
        value: JSON.stringify({
          title: "Building the Future of Infrastructure",
          description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
          description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
          leaderName: "Boris Madjunkov",
          leaderPosition: "General Director",
          leaderImage: "",
          translations: {
            en: {
              title: "Building the Future of Infrastructure",
              description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
              description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
              leaderName: "Boris Madjunkov",
              leaderPosition: "General Director"
            },
            mk: {
              title: "",
              description1: "",
              description2: "",
              leaderName: "",
              leaderPosition: ""
            },
            de: {
              title: "",
              description1: "",
              description2: "",
              leaderName: "",
              leaderPosition: ""
            }
          }
        })
      };
      
      form.reset(defaultFormData);
    }
    
    setIsFormOpen(true);
    console.log("=== handleEdit completed ===");
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
      try {
        const currentData = JSON.parse(leadershipData.value);
        if (currentData.leaderImage && !imagePreview) {
          // Only set preview if there's no current preview (to not override user selection)
          console.log("Setting image preview from leadership data:", currentData.leaderImage);
          setImagePreview(currentData.leaderImage);
        }
      } catch (error) {
        console.error("Error parsing leadership data for image preview:", error);
      }
    }
  }, [leadershipData, isFormOpen, imagePreview]);

  // Auto-refetch when component mounts or when returning to admin panel
  useEffect(() => {
    const handleFocus = () => {
      refetch();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetch]);

  // Debug translations state changes
  useEffect(() => {
    console.log("Translations state changed:", translations);
  }, [translations]);

  // Sync form data with translations changes
  useEffect(() => {
    if (Object.keys(translations).length > 0 && isFormOpen) {
      try {
        const currentFormValue = form.getValues("value");
        if (currentFormValue) {
          const currentContent = JSON.parse(currentFormValue);
          const updatedContent = {
            ...currentContent,
            title: translations.en?.title || currentContent.title || "",
            description1: translations.en?.description1 || currentContent.description1 || "",
            description2: translations.en?.description2 || currentContent.description2 || "",
            leaderName: translations.en?.leaderName || currentContent.leaderName || ""
          };
          
          console.log("Syncing form data with translations:", updatedContent);
          form.setValue("value", JSON.stringify(updatedContent));
        }
      } catch (error) {
        console.error("Error syncing form data with translations:", error);
        // If there's an error, try to reset the form with current translations
        try {
          const defaultContent = {
            title: translations.en?.title || "",
            description1: translations.en?.description1 || "",
            description2: translations.en?.description2 || "",
            leaderName: translations.en?.leaderName || "",
            leaderPosition: "",
            leaderImage: ""
          };
          
          form.setValue("value", JSON.stringify(defaultContent));
        } catch (resetError) {
          console.error("Error resetting form after sync failure:", resetError);
        }
      }
    }
  }, [translations, isFormOpen, form]);

  // Initialize translations when component first loads
  useEffect(() => {
    if (leadershipData && typeof leadershipData === 'object' && 'value' in leadershipData && !isFormOpen) {
      try {
        const currentData = JSON.parse(leadershipData.value);
        
        // Only initialize if translations are empty
        if (Object.keys(translations).length === 0) {
          const initialTranslations = {
            en: { 
              title: currentData.title || "",
              description1: currentData.description1 || "",
              description2: currentData.description2 || "",
              leaderName: currentData.leaderName || ""
            },
            mk: { 
              title: currentData.translations?.mk?.title || "",
              description1: currentData.translations?.mk?.description1 || "",
              description2: currentData.translations?.mk?.description2 || "",
              leaderName: currentData.translations?.mk?.leaderName || ""
            },
            de: { 
              title: currentData.translations?.de?.title || "",
              description1: currentData.translations?.de?.description1 || "",
              description2: currentData.translations?.de?.description2 || "",
              leaderName: currentData.translations?.de?.leaderName || ""
            }
          };
          
          console.log("Initializing translations on component load:", initialTranslations);
          setTranslations(initialTranslations);
        }
      } catch (error) {
        console.error("Error parsing leadership data for translations:", error);
        // Set default translations if parsing fails
        const defaultTranslations = {
          en: { 
            title: "Building the Future of Infrastructure",
            description1: "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
            description2: "Together, we build not just for today, but for a future our next generations will be proud of.",
            leaderName: "Boris Madjunkov"
          },
          mk: { 
            title: "",
            description1: "",
            description2: "",
            leaderName: ""
          },
          de: { 
            title: "",
            description1: "",
            description2: "",
            leaderName: ""
          }
        };
        setTranslations(defaultTranslations);
      }
    }
  }, [leadershipData, isFormOpen, translations]);

  // Watch form changes to update translations
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === 'value' && type === 'change') {
        try {
          const content = JSON.parse(value.value || '{}');
          console.log("Form value changed:", content);
          
          // Update translations if they don't match
          const currentTranslations = { ...translations };
          let hasChanges = false;
          
          if (content.title !== translations.en?.title) {
            currentTranslations.en = { ...currentTranslations.en, title: content.title || "" };
            hasChanges = true;
          }
          
          if (content.description1 !== translations.en?.description1) {
            currentTranslations.en = { ...currentTranslations.en, description1: content.description1 || "" };
            hasChanges = true;
          }
          
          if (content.description2 !== translations.en?.description2) {
            currentTranslations.en = { ...currentTranslations.en, description2: content.description2 || "" };
            hasChanges = true;
          }
          
          if (content.leaderName !== translations.en?.leaderName) {
            currentTranslations.en = { ...currentTranslations.en, leaderName: content.leaderName || "" };
            hasChanges = true;
          }
          
          if (hasChanges) {
            console.log("Updating translations from form changes:", currentTranslations);
            setTranslations(currentTranslations);
          }
        } catch (error) {
          console.error("Error parsing form value in watch:", error);
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, translations]);

  // Check if form is valid
  const isFormValid = React.useMemo(() => {
    const hasRequiredFields = 
      translations.en?.title?.trim() && 
      translations.en?.description1?.trim() && 
      translations.en?.description2?.trim() && 
      translations.en?.leaderName?.trim();
    
    console.log("Form validation check:", {
      title: translations.en?.title?.trim(),
      description1: translations.en?.description1?.trim(),
      description2: translations.en?.description2?.trim(),
      leaderName: translations.en?.leaderName?.trim(),
      isValid: !!hasRequiredFields
    });
    
    return !!hasRequiredFields;
  }, [translations]);

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
      {/* Authentication Status Debug */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Authentication Status</h3>
            <p className="text-blue-700">
              User: {user?.username || 'Not logged in'} | 
              Authenticated: {isAuthenticated ? 'Yes' : 'No'} | 
              Token: {localStorage.getItem('authToken') ? 'Present' : 'Missing'}
            </p>
            {leadershipError && (
              <p className="text-red-600 mt-2">
                <strong>Leadership Data Error:</strong> {leadershipError.message}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {!isAuthenticated && (
              <div className="text-red-600 font-semibold">
                ⚠️ Authentication Required
              </div>
            )}
            <Button 
              size="sm" 
              variant="outline" 
              onClick={async () => {
                console.log("=== Testing Authentication ===");
                const token = localStorage.getItem('authToken');
                console.log("Token from localStorage:", token);
                
                try {
                  const response = await fetch('/api/auth/me', {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                  });
                  console.log("Auth test response status:", response.status);
                  const data = await response.json();
                  console.log("Auth test response data:", data);
                } catch (error) {
                  console.error("Auth test error:", error);
                }
              }}
            >
              Test Auth
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={async () => {
                console.log("=== Testing Company Info API ===");
                const token = localStorage.getItem('authToken');
                console.log("Token for company-info test:", token);
                
                try {
                  const response = await fetch('/api/admin/company-info', {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                  });
                  console.log("Company-info test response status:", response.status);
                  const data = await response.json();
                  console.log("Company-info test response data:", data);
                } catch (error) {
                  console.error("Company-info test error:", error);
                }
              }}
            >
              Test API
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={async () => {
                console.log("=== Testing Simple Form Submission ===");
                const token = localStorage.getItem('authToken');
                console.log("Token for simple submission test:", token);
                
                const testData = {
                  key: "leadership_message",
                  category: "branding",
                  value: JSON.stringify({
                    title: "Test Title",
                    description1: "Test Description 1",
                    description2: "Test Description 2",
                    leaderName: "Test Leader",
                    leaderPosition: "Test Position",
                    leaderImage: "",
                    translations: {}
                  })
                };
                
                console.log("Test data to submit:", testData);
                
                try {
                  const response = await fetch('/api/admin/company-info', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(testData)
                  });
                  console.log("Simple submission test response status:", response.status);
                  const data = await response.json();
                  console.log("Simple submission test response data:", data);
                } catch (error) {
                  console.error("Simple submission test error:", error);
                }
              }}
            >
              Test Submit
            </Button>
          </div>
        </div>
      </div>

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
          <DialogContent className="sm:max-w-[800px]" data-testid="leadership-form-dialog">
            <DialogHeader>
              <DialogTitle data-testid="form-title">Edit Leadership Message</DialogTitle>
              <DialogDescription>
                Update the leadership message and executive information displayed on the website.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => {
                console.log("=== FORM onSubmit triggered ===");
                console.log("Form data received:", data);
                console.log("Form errors:", form.formState.errors);
                console.log("Form is valid:", form.formState.isValid);
                console.log("Form is dirty:", form.formState.isDirty);
                
                // Check if user is authenticated
                if (!isAuthenticated) {
                  console.error("User is not authenticated!");
                  toast({
                    title: "Authentication Error",
                    description: "Please log in again to continue",
                    variant: "destructive",
                  });
                  return;
                }
                
                // Check if form has errors
                if (!isFormValid) {
                  console.error("Form validation failed - missing required fields");
                  toast({
                    title: "Validation Error",
                    description: "Please fill in all required fields (Title, Description 1, Description 2, Leader Name)",
                    variant: "destructive",
                  });
                  return;
                }
                
                // Get the current form data for position and image
                let currentContent: any = {};
                try {
                  currentContent = JSON.parse(data.value);
                } catch (error) {
                  console.error("Error parsing form value:", error);
                  toast({
                    title: "Form Error",
                    description: "Invalid form data format",
                    variant: "destructive",
                  });
                  return;
                }
                
                console.log("Form submission - translations state:", translations);
                console.log("Form submission - current content:", currentContent);
                
                // Use translations if available, otherwise fallback to current content
                const title = translations.en?.title || currentContent.title || "";
                const description1 = translations.en?.description1 || currentContent.description1 || "";
                const description2 = translations.en?.description2 || currentContent.description2 || "";
                const leaderName = translations.en?.leaderName || currentContent.leaderName || "";
                
                console.log("Final values to save:", { title, description1, description2, leaderName });
                
                // Use the translations state directly instead of parsing data.value
                const submitData = {
                  key: "leadership_message",
                  category: "branding",
                  value: JSON.stringify({
                    title: title,
                    description1: description1,
                    description2: description2,
                    leaderName: leaderName,
                    leaderPosition: currentContent.leaderPosition || "",
                    leaderImage: currentContent.leaderImage || "",
                    translations: translations
                  })
                };
                
                console.log("Submitting data:", submitData);
                handleSubmit(submitData);
              })} className="space-y-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => {
                    let content: any = {};
                    try {
                      content = JSON.parse(field.value);
                    } catch (error) {
                      console.error("Error parsing field value:", error);
                      content = {};
                    }
                    
                    console.log("FormField render - content:", content);
                    console.log("FormField render - translations:", translations);
                    
                    return (
                      <div className="space-y-4">
                        {/* Multi-language Title Field */}
                        <FormItem>
                          <FormLabel className="text-base font-medium">Title *</FormLabel>
                          <TranslatableFieldEditor
                            label=""
                            fieldName="title"
                            type="text"
                            currentTranslations={translations}
                            originalValue={translations.en?.title || content.title || ""}
                            defaultLanguage="en"
                            onChange={setTranslations}
                          />
                          {!translations.en?.title?.trim() && (
                            <p className="text-sm text-red-600">Title is required</p>
                          )}
                        </FormItem>

                        {/* Multi-language Description 1 Field */}
                        <FormItem>
                          <FormLabel className="text-base font-medium">Description 1 *</FormLabel>
                          <TranslatableFieldEditor
                            label=""
                            fieldName="description1"
                            type="textarea"
                            currentTranslations={translations}
                            originalValue={translations.en?.description1 || content.description1 || ""}
                            defaultLanguage="en"
                            onChange={setTranslations}
                          />
                          {!translations.en?.description1?.trim() && (
                            <p className="text-sm text-red-600">Description 1 is required</p>
                          )}
                        </FormItem>

                        {/* Multi-language Description 2 Field */}
                        <FormItem>
                          <FormLabel className="text-base font-medium">Description 2 *</FormLabel>
                          <TranslatableFieldEditor
                            label=""
                            fieldName="description2"
                            type="textarea"
                            currentTranslations={translations}
                            originalValue={translations.en?.description2 || content.description2 || ""}
                            defaultLanguage="en"
                            onChange={setTranslations}
                          />
                          {!translations.en?.description2?.trim() && (
                            <p className="text-sm text-red-600">Description 2 is required</p>
                          )}
                        </FormItem>

                        {/* Multi-language Leader Name Field */}
                        <FormItem>
                          <FormLabel className="text-base font-medium">Leader Name *</FormLabel>
                          <TranslatableFieldEditor
                            label=""
                            fieldName="leaderName"
                            type="text"
                            currentTranslations={translations}
                            originalValue={translations.en?.leaderName || content.leaderName || ""}
                            defaultLanguage="en"
                            onChange={setTranslations}
                          />
                          {!translations.en?.leaderName?.trim() && (
                            <p className="text-sm text-red-600">Leader Name is required</p>
                          )}
                        </FormItem>

                        <FormItem>
                          <FormLabel>Leader Position</FormLabel>
                          <Select
                            value={content.leaderPosition || ""}
                            onValueChange={(value) => {
                              const updatedContent = { ...content, leaderPosition: value };
                              const newValue = JSON.stringify(updatedContent);
                              console.log("Position changed - new value:", newValue);
                              field.onChange(newValue);
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
                  <Button 
                    type="submit" 
                    data-testid="button-submit"
                    disabled={updateLeadershipMutation.isPending || !isFormValid}
                  >
                    {updateLeadershipMutation.isPending ? "Updating..." : "Update Leadership Message"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leadership Message Display */}
      <div key={leadershipData && typeof leadershipData === 'object' && 'id' in leadershipData ? leadershipData.id : 'default'} className="bg-white rounded-lg border border-gray-200 overflow-hidden" data-testid="leadership-display">
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
                      alt={leadershipContent.leaderName || 'Leader'}
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