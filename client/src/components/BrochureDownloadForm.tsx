import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
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
        title: t("brochureDownload.error"),
        description: t("brochureDownload.fillRequiredFields"),
        variant: "destructive",
      });
      return;
    }

    // Debug: Log the brochure data
    console.log('Brochure data:', brochure);

    if (!brochure.pdfUrl) {
      toast({
        title: t("brochureDownload.error"),
        description: t("brochureDownload.missingPdfUrl"),
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
        title: t("brochureDownload.success"),
        description: t("brochureDownload.downloadedOpeningPreview"),
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
        title: t("brochureDownload.error"),
        description: t("brochureDownload.failedToTrack"),
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
            {t("brochureDownload.title")}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800 font-medium">{brochure.name}</p>
            <p className="text-xs text-blue-600">{brochure.category}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">
              {t("brochureDownload.fullName")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder={t("brochureDownload.fullNamePlaceholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              {t("brochureDownload.email")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder={t("brochureDownload.emailPlaceholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">
              {t("brochureDownload.companyName")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder={t("brochureDownload.companyNamePlaceholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("brochureDownload.description")}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder={t("brochureDownload.descriptionPlaceholder")}
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
              {t("brochureDownload.cancel")}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t("brochureDownload.processing")}
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  {t("brochureDownload.downloadPdf")}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
