import { useState, useEffect } from "react";
import { Plus, Upload, FileText, Image, X, Globe, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface DocumentEntry {
  id: string;
  language: string;
  languageName: string;
  languageFlag: string;
  pdfFile: File | null;
  pdfUrl: string;
  imageFile: File | null;
  imageUrl: string;
  uploadedAt: Date;
  status: 'ready' | 'pending' | 'error';
}

interface DocumentFormData {
  title: string;
  category: string;
  description: string;
  entries: DocumentEntry[];
}

const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'mk', name: 'Macedonian', flag: '🇲🇰' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'al', name: 'Albanian', flag: '🇦🇱' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'sr', name: 'Serbian', flag: '🇷🇸' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷' }
];

export function DocumentManager() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [documents, setDocuments] = useState<DocumentFormData[]>([]);
  const [currentDocument, setCurrentDocument] = useState<DocumentFormData>({
    title: "",
    category: "",
    description: "",
    entries: []
  });

  const { toast } = useToast();

  // Load documents from localStorage on component mount
  useEffect(() => {
    const savedDocs = localStorage.getItem('multilingual-documents');
    if (savedDocs) {
      try {
        setDocuments(JSON.parse(savedDocs));
      } catch (error) {
        console.error('Error loading documents:', error);
      }
    }
  }, []);

  // Save documents to localStorage whenever documents change
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem('multilingual-documents', JSON.stringify(documents));
    }
  }, [documents]);

  const addLanguageEntry = () => {
    // Check if language already exists in current document
    const existingEntry = currentDocument.entries.find(entry => entry.language === selectedLanguage);
    if (existingEntry) {
      toast({
        title: "Language Already Added",
        description: `An entry for ${existingEntry.languageName} already exists.`,
        variant: "destructive",
      });
      return;
    }

    const languageOption = LANGUAGE_OPTIONS.find(lang => lang.code === selectedLanguage);
    if (!languageOption) return;

    const newEntry: DocumentEntry = {
      id: Date.now().toString(),
      language: selectedLanguage,
      languageName: languageOption.name,
      languageFlag: languageOption.flag,
      pdfFile: null,
      pdfUrl: "",
      imageFile: null,
      imageUrl: "",
      uploadedAt: new Date(),
      status: 'pending'
    };

    setCurrentDocument({
      ...currentDocument,
      entries: [...currentDocument.entries, newEntry]
    });

    toast({
      title: "Language Added",
      description: `Added ${languageOption.name} entry`,
    });
  };

  const removeLanguageEntry = (entryId: string) => {
    setCurrentDocument({
      ...currentDocument,
      entries: currentDocument.entries.filter(entry => entry.id !== entryId)
    });
  };

  const updateEntry = (entryId: string, field: keyof DocumentEntry, value: any) => {
    setCurrentDocument({
      ...currentDocument,
      entries: currentDocument.entries.map(entry => {
        if (entry.id === entryId) {
          const updatedEntry = { ...entry, [field]: value };
          // Update status based on whether files are uploaded
          if (field === 'pdfFile' || field === 'pdfUrl' || field === 'imageFile' || field === 'imageUrl') {
            updatedEntry.status = (updatedEntry.pdfFile || updatedEntry.pdfUrl || updatedEntry.imageFile || updatedEntry.imageUrl) ? 'ready' : 'pending';
          }
          return updatedEntry;
        }
        return entry;
      })
    });
  };

  const handleFileUpload = async (entryId: string, file: File, type: 'pdf' | 'image') => {
    if (type === 'pdf' && file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (type === 'image' && !file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, we'll create a blob URL
    const url = URL.createObjectURL(file);
    updateEntry(entryId, type === 'pdf' ? 'pdfFile' : 'imageFile', file);
    
    toast({
      title: "File Uploaded",
      description: `${type === 'pdf' ? 'PDF' : 'Image'} uploaded successfully`,
    });
  };

  const saveDocument = () => {
    if (!currentDocument.title) {
      toast({
        title: "Missing Title",
        description: "Please enter a document title",
        variant: "destructive",
      });
      return;
    }

    if (currentDocument.entries.length === 0) {
      toast({
        title: "No Entries",
        description: "Please add at least one language entry",
        variant: "destructive",
      });
      return;
    }

    const newDocument = { ...currentDocument, id: Date.now().toString() };
    setDocuments([...documents, newDocument]);
    
    // Reset form
    setCurrentDocument({
      title: "",
      category: "",
      description: "",
      entries: []
    });

    toast({
      title: "Document Saved",
      description: "Your multilingual document has been saved successfully",
    });
  };

  const getCurrentLanguageEntry = () => {
    return currentDocument.entries.find(entry => entry.language === selectedLanguage);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Multilingual Document Manager</h2>
          <p className="text-slate-600">
            Upload documents and images for multiple languages with automatic language switching
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Label>Current Language:</Label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map(lang => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Document Form */}
      <Card>
        <CardHeader>
          <CardTitle>Document Information</CardTitle>
          <CardDescription>Enter basic document details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Document Title *</Label>
              <Input
                id="title"
                value={currentDocument.title}
                onChange={(e) => setCurrentDocument({ ...currentDocument, title: e.target.value })}
                placeholder="Enter document title"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={currentDocument.category}
                onChange={(e) => setCurrentDocument({ ...currentDocument, category: e.target.value })}
                placeholder="Enter category"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={currentDocument.description}
              onChange={(e) => setCurrentDocument({ ...currentDocument, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>
        </CardContent>
      </Card>

      {/* Language Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Language Versions</CardTitle>
              <CardDescription>Add documents for different languages</CardDescription>
            </div>
            <Button onClick={addLanguageEntry} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add More
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {currentDocument.entries.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 mx-auto text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No Language Entries</h3>
              <p className="text-slate-600 mb-4">
                Select a language and click "Add More" to create your first entry
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Headers */}
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                <div className="col-span-2">Language</div>
                <div className="col-span-4">PDF Document</div>
                <div className="col-span-4">Image/Photo</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Entries */}
              {currentDocument.entries.map((entry) => (
                <div key={entry.id} className="grid grid-cols-12 gap-4 p-4 border rounded-lg bg-gray-50">
                  <div className="col-span-2 flex items-center">
                    <Badge variant="outline" className="bg-white">
                      {entry.languageFlag} {entry.languageName}
                    </Badge>
                  </div>

                  {/* PDF Section */}
                  <div className="col-span-4 space-y-2">
                    {entry.pdfFile ? (
                      <div className="flex items-center justify-between p-2 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium truncate max-w-32">
                            {entry.pdfFile.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (entry.pdfFile) {
                                const url = URL.createObjectURL(entry.pdfFile);
                                window.open(url, '_blank');
                              }
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateEntry(entry.id, 'pdfFile', null)}
                            className="text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(entry.id, file, 'pdf');
                          }}
                          className="text-xs"
                        />
                        <Input
                          type="url"
                          value={entry.pdfUrl}
                          onChange={(e) => updateEntry(entry.id, 'pdfUrl', e.target.value)}
                          placeholder="Or enter PDF URL"
                          className="text-xs mt-1"
                        />
                      </div>
                    )}
                  </div>

                  {/* Image Section */}
                  <div className="col-span-4 space-y-2">
                    {entry.imageFile ? (
                      <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded">
                        <div className="flex items-center gap-2">
                          <Image className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium truncate max-w-32">
                            {entry.imageFile.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              if (entry.imageFile) {
                                const url = URL.createObjectURL(entry.imageFile);
                                window.open(url, '_blank');
                              }
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateEntry(entry.id, 'imageFile', null)}
                            className="text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(entry.id, file, 'image');
                          }}
                          className="text-xs"
                        />
                        <Input
                          type="url"
                          value={entry.imageUrl}
                          onChange={(e) => updateEntry(entry.id, 'imageUrl', e.target.value)}
                          placeholder="Or enter image URL"
                          className="text-xs mt-1"
                        />
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="col-span-1 flex items-center">
                    <Badge
                      variant={entry.status === 'ready' ? 'default' : entry.status === 'error' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {entry.status === 'ready' ? 'Ready' : entry.status === 'error' ? 'Error' : 'Pending'}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLanguageEntry(entry.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Language Preview */}
      {getCurrentLanguageEntry() && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Current Language Preview: {getCurrentLanguageEntry()?.languageFlag} {getCurrentLanguageEntry()?.languageName}
            </CardTitle>
            <CardDescription>
              Documents available for the currently selected language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              {getCurrentLanguageEntry()?.pdfFile && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <FileText className="h-6 w-6 text-red-600" />
                  <div>
                    <p className="font-medium">PDF Document</p>
                    <p className="text-sm text-gray-600">{getCurrentLanguageEntry()?.pdfFile?.name}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const entry = getCurrentLanguageEntry();
                      if (entry?.pdfFile) {
                        const url = URL.createObjectURL(entry.pdfFile);
                        window.open(url, '_blank');
                      }
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {getCurrentLanguageEntry()?.imageFile && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Image className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium">Image/Photo</p>
                    <p className="text-sm text-gray-600">{getCurrentLanguageEntry()?.imageFile?.name}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const entry = getCurrentLanguageEntry();
                      if (entry?.imageFile) {
                        const url = URL.createObjectURL(entry.imageFile);
                        window.open(url, '_blank');
                      }
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {!getCurrentLanguageEntry()?.pdfFile && !getCurrentLanguageEntry()?.imageFile && (
                <div className="text-center py-4 text-gray-500">
                  No documents uploaded for {getCurrentLanguageEntry()?.languageName} yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={() => setCurrentDocument({
            title: "",
            category: "",
            description: "",
            entries: []
          })}
        >
          Reset Form
        </Button>
        <Button onClick={saveDocument} disabled={!currentDocument.title || currentDocument.entries.length === 0}>
          Save Document
        </Button>
      </div>

      {/* Saved Documents */}
      {documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Documents ({documents.length})</CardTitle>
            <CardDescription>Previously saved multilingual documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <p className="text-sm text-gray-600">
                      {doc.entries.length} language{doc.entries.length !== 1 ? 's' : ''}: {' '}
                      {doc.entries.map(entry => entry.languageFlag).join(' ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {doc.entries.filter(e => e.status === 'ready').length}/{doc.entries.length} Ready
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}