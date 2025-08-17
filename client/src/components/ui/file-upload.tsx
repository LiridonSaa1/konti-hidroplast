import { useState, useRef } from "react";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  placeholder?: string;
  testId?: string;
  type?: "image" | "pdf" | "any";
}

export function FileUpload({ 
  label, 
  value = "", 
  onChange, 
  accept, 
  placeholder = "Enter URL or upload file",
  testId,
  type = "any"
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getAcceptTypes = () => {
    if (accept) return accept;
    if (type === "image") return "image/*";
    if (type === "pdf") return ".pdf";
    return "image/*,.pdf";
  };

  const getFileIcon = () => {
    if (type === "image") return <ImageIcon className="h-4 w-4" />;
    if (type === "pdf") return <FileText className="h-4 w-4" />;
    return <Upload className="h-4 w-4" />;
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      onChange(result.url);
      
      toast({
        title: "Success",
        description: `File "${result.originalName}" uploaded successfully`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    const isValidType = () => {
      if (type === "image") return file.type.startsWith('image/');
      if (type === "pdf") return file.type === 'application/pdf';
      return file.type.startsWith('image/') || file.type === 'application/pdf';
    };

    if (!isValidType()) {
      toast({
        title: "Invalid file type",
        description: `Please select a ${type === "any" ? "valid image or PDF" : type} file`,
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    uploadFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const clearFile = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          data-testid={testId}
          className="flex-1"
        />
        {value && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearFile}
            data-testid={`${testId}-clear`}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
          ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
        data-testid={`${testId}-upload-area`}
      >
        <div className="flex flex-col items-center gap-2">
          {getFileIcon()}
          <div className="text-sm text-gray-600">
            {isUploading ? (
              "Uploading..."
            ) : (
              <>
                <span className="font-medium">Click to upload</span> or drag and drop
                <br />
                <span className="text-xs">
                  {type === "image" ? "Images only" : 
                   type === "pdf" ? "PDF files only" : 
                   "Images and PDFs"} (max 10MB)
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptTypes()}
        onChange={handleFileInputChange}
        className="hidden"
        data-testid={`${testId}-file-input`}
      />

      {/* Current file preview */}
      {value && (
        <div className="text-xs text-gray-500 mt-1">
          Current: {value.split('/').pop()}
        </div>
      )}
    </div>
  );
}