import { useState, useRef, DragEvent } from "react";
import { Upload, X, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function FileUpload({ 
  value, 
  onChange, 
  accept = "image/*", 
  label = "Upload Image",
  placeholder = "Enter image URL or upload file",
  className 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      // Use fetch directly for file uploads to avoid JSON conversion
      const token = localStorage.getItem('authToken');
      const headers: Record<string, string> = {};
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        headers,
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = await response.json();
      onChange(result.url);
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  };

  return (
    <div className={className}>
      <Label>{label}</Label>
      
      {/* URL Input */}
      <div className="mt-2 space-y-3">
        <Input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          data-testid="input-image-url"
        />
        
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            data-testid="input-file-upload"
          />
          
          <div className="space-y-3">
            <Upload className="h-8 w-8 text-gray-400 mx-auto" />
            <div>
              <p className="text-sm text-gray-600">
                Drag and drop an image here, or{" "}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-primary"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  data-testid="button-browse-files"
                >
                  browse files
                </Button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          
          {isUploading && (
            <div className="text-sm text-primary mt-2">Uploading...</div>
          )}
        </div>
        
        {/* Image Preview */}
        {value && (
          <div className="relative inline-block">
            <img
              src={value}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-lg border"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23f1f5f9'/%3E%3Ctext x='48' y='48' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='12'%3EInvalid Image%3C/text%3E%3C/svg%3E";
              }}
              data-testid="image-preview"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={() => onChange("")}
              data-testid="button-remove-image"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}