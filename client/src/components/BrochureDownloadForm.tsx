import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BrochureDownloadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  brochure: {
    id: string;
    name: string;
    category: string;
    pdfUrl: string;
  };
}

interface DownloadFormData {
  fullName: string;
  email: string;
  companyName: string;
  description: string;
}

export function BrochureDownloadForm({ isOpen, onClose, onSuccess, brochure }: BrochureDownloadFormProps) {
  const [formData, setFormData] = useState<DownloadFormData>({
    fullName: "",
    email: "",
    companyName: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.companyName.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Debug: Log the brochure data
    console.log('Brochure data:', brochure);

    if (!brochure.pdfUrl) {
      toast({
        title: "Error",
        description: "Brochure PDF URL is missing. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Track the download
      const downloadData = {
        brochureId: 0, // Using 0 since we don't have numeric IDs in the static data
        brochureName: `${brochure.name} (${brochure.id})`, // Include the unique identifier
        brochureCategory: brochure.category,
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        description: formData.description.trim() || null,
        downloadDate: new Date().toISOString(),
        pdfUrl: brochure.pdfUrl, // Include the PDF URL for email sending
        senderEmail: 'noreply@kontihidroplast.com', // Will be set by server from env
      };

      console.log('Sending download data:', downloadData);

      const response = await fetch("/api/brochure-downloads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downloadData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', response.status, errorText);
        throw new Error(`Failed to track download: ${response.status} ${errorText}`);
      }

      // Show success message and open preview
      toast({
        title: "Success",
        description: "Brochure downloaded! Opening preview...",
      });

      // Open the PDF in a new tab for preview
      window.open(brochure.pdfUrl, '_blank');

      // Close the form
      onClose();

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        description: "",
      });
    } catch (error) {
      console.error("Error tracking download:", error);
      toast({
        title: "Error",
        description: "Failed to track download. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof DownloadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-blue-600" />
            Download Brochure
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800 font-medium">{brochure.name}</p>
            <p className="text-xs text-blue-600">{brochure.category}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Enter your company name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Tell us about your project or requirements"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
