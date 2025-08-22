import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Languages, Loader2, CheckCircle, AlertCircle, FileText } from "lucide-react";
import type { Brochure } from "@shared/schema";

interface TranslationHelperProps {
  brochure: Brochure;
  isOpen: boolean;
  onClose: () => void;
}

interface TranslationResult {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  wordCount: number;
}

interface SuggestedBrochure {
  name: string;
  category: string;
  language: string;
  description: string;
  status: string;
  active: boolean;
  sortOrder: number;
  imageUrl: string;
  translationMetadata: {
    sourceLanguage: string;
    originalBrochureId: string;
    wordCount: number;
    translatedAt: string;
  };
}

export function TranslationHelper({ brochure, isOpen, onClose }: TranslationHelperProps) {
  const [targetLanguage, setTargetLanguage] = useState<string>("");
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [suggestedBrochure, setSuggestedBrochure] = useState<SuggestedBrochure | null>(null);
  const [editedBrochure, setEditedBrochure] = useState<SuggestedBrochure | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const translateMutation = useMutation({
    mutationFn: async (targetLang: string) => {
      const result = await apiRequest(`/api/admin/brochures/${brochure.id}/translate`, "POST", {
        targetLanguage: targetLang
      });
      return result;
    },
    onSuccess: (data) => {
      setTranslationResult(data.translationResult);
      setSuggestedBrochure(data.suggestedBrochure);
      setEditedBrochure(data.suggestedBrochure);
      toast({
        title: "Translation Complete",
        description: `Successfully translated to ${getLanguageName(targetLanguage)}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Translation Failed",
        description: error.message || "Failed to translate PDF",
        variant: "destructive",
      });
    },
  });

  const createBrochureMutation = useMutation({
    mutationFn: async (brochureData: any) => {
      const result = await apiRequest("/api/admin/brochures", "POST", brochureData);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brochures"] });
      toast({
        title: "Success",
        description: "Translated brochure created successfully",
      });
      handleClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create translated brochure",
        variant: "destructive",
      });
    },
  });

  const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
      'en': 'English',
      'mk': 'Macedonian',
      'de': 'German'
    };
    return languages[code] || code;
  };

  const getAvailableLanguages = () => {
    const all = ['en', 'mk', 'de'];
    return all.filter(lang => lang !== brochure.language);
  };

  const handleTranslate = () => {
    if (!targetLanguage) {
      toast({
        title: "Language Required",
        description: "Please select a target language",
        variant: "destructive",
      });
      return;
    }
    translateMutation.mutate(targetLanguage);
  };

  const handleCreateBrochure = () => {
    if (!editedBrochure || !translationResult) return;
    
    createBrochureMutation.mutate({
      ...editedBrochure,
      title: editedBrochure.name,
      pdfUrl: "", // Translated PDF content would need to be converted back to PDF
      // For now, we'll create without PDF - user can upload manually
    });
  };

  const handleClose = () => {
    setTargetLanguage("");
    setTranslationResult(null);
    setSuggestedBrochure(null);
    setEditedBrochure(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            PDF Translation Helper
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Source Brochure Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Source Brochure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> {brochure.name}
                </div>
                <div>
                  <strong>Category:</strong> {brochure.category}
                </div>
                <div>
                  <strong>Language:</strong> 
                  <Badge variant="secondary" className="ml-2">
                    {getLanguageName(brochure.language)}
                  </Badge>
                </div>
                <div>
                  <strong>Has PDF:</strong> 
                  {brochure.pdfUrl ? (
                    <Badge variant="default" className="ml-2">
                      <FileText className="h-3 w-3 mr-1" />
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="ml-2">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Missing
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Translation Selection */}
          {!translationResult && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Target Language</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Target Language</Label>
                    <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language to translate to" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableLanguages().map(lang => (
                          <SelectItem key={lang} value={lang}>
                            {lang === 'en' && '🇺🇸'} 
                            {lang === 'mk' && '🇲🇰'} 
                            {lang === 'de' && '🇩🇪'} 
                            {' '}{getLanguageName(lang)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleTranslate}
                    disabled={!targetLanguage || !brochure.pdfUrl || translateMutation.isPending}
                    className="w-full"
                  >
                    {translateMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Translating PDF...
                      </>
                    ) : (
                      <>
                        <Languages className="h-4 w-4 mr-2" />
                        Translate PDF
                      </>
                    )}
                  </Button>
                  
                  {!brochure.pdfUrl && (
                    <p className="text-sm text-red-600 text-center">
                      This brochure has no PDF file to translate
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Translation Results */}
          {translationResult && editedBrochure && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Translation Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Source:</strong> {getLanguageName(translationResult.sourceLanguage)}
                  </div>
                  <div>
                    <strong>Target:</strong> {getLanguageName(translationResult.targetLanguage)}
                  </div>
                  <div>
                    <strong>Word Count:</strong> {translationResult.wordCount}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Translated Brochure Name</Label>
                    <Input
                      value={editedBrochure.name}
                      onChange={(e) => setEditedBrochure({
                        ...editedBrochure,
                        name: e.target.value
                      })}
                      placeholder="Enter brochure name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Translated Description</Label>
                    <Textarea
                      value={editedBrochure.description}
                      onChange={(e) => setEditedBrochure({
                        ...editedBrochure,
                        description: e.target.value
                      })}
                      placeholder="Enter description"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Translated Text Preview (first 500 characters)</Label>
                    <Textarea
                      value={translationResult.translatedText.substring(0, 500) + 
                            (translationResult.translatedText.length > 500 ? '...' : '')}
                      readOnly
                      rows={8}
                      className="bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateBrochure}
                    disabled={createBrochureMutation.isPending}
                  >
                    {createBrochureMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Translated Brochure'
                    )}
                  </Button>
                </div>

                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                  <strong>Note:</strong> The translated brochure will be created as a draft. 
                  You'll need to manually upload the translated PDF file and review the content before activating.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}