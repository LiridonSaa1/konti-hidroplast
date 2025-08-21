import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TranslatableFieldEditor } from './TranslatableFieldEditor';
import { Badge } from '@/components/ui/badge';
import { Save, Eye, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Example component showing how to use translations in news management
export function NewsTranslationExample() {
  const { toast } = useToast();
  const [translations, setTranslations] = useState<{
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  }>({
    en: {
      title: "Company Expansion Announcement",
      subtitle: "Opening new facilities in Europe",
      description: "We are excited to announce our expansion into new markets across Europe."
    },
    mk: {
      title: "Објава за проширување на компанијата",
      subtitle: "Отворање на нови објекти во Европа",
      description: "Возбудени сме да ја објавиме нашата експанзија на нови пазари низ Европа."
    },
    de: {
      title: "Ankündigung der Unternehmensexpansion",
      subtitle: "Eröffnung neuer Standorte in Europa",
      description: "Wir freuen uns, unsere Expansion in neue Märkte in Europa bekannt zu geben."
    }
  });

  const [previewLanguage, setPreviewLanguage] = useState('en');

  const handleSave = async () => {
    // Example API call structure
    const newsData = {
      title: translations.en.title, // Original field for backward compatibility
      subtitle: translations.en.subtitle,
      description: translations.en.description,
      translations: translations, // New translations field
      defaultLanguage: 'en'
    };

    console.log('Saving news with translations:', newsData);
    
    toast({
      title: "Success!",
      description: "News article with translations saved successfully.",
    });
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLang = languages.find(l => l.code === previewLanguage);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Multi-Language News Editor (Example)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Translation Status Overview */}
          <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-800">Translation Status:</span>
            {languages.map(lang => {
              const hasTitle = translations[lang.code as keyof typeof translations]?.title;
              return (
                <Badge 
                  key={lang.code}
                  variant={hasTitle ? "default" : "secondary"}
                  className={hasTitle ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                >
                  {lang.flag} {lang.name} {hasTitle ? "✓" : "○"}
                </Badge>
              );
            })}
          </div>

          {/* Translatable Fields */}
          <TranslatableFieldEditor
            label="Article Title"
            fieldName="title"
            currentTranslations={translations}
            originalValue={translations.en.title}
            onChange={setTranslations}
          />

          <TranslatableFieldEditor
            label="Article Subtitle"
            fieldName="subtitle"
            currentTranslations={translations}
            originalValue={translations.en.subtitle}
            onChange={setTranslations}
          />

          <TranslatableFieldEditor
            label="Article Description"
            fieldName="description"
            type="textarea"
            currentTranslations={translations}
            originalValue={translations.en.description}
            onChange={setTranslations}
          />

          {/* Preview Section */}
          <Card className="bg-gray-50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Live Preview</CardTitle>
              <div className="flex gap-2">
                {languages.map(lang => (
                  <Button
                    key={lang.code}
                    variant={previewLanguage === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewLanguage(lang.code)}
                  >
                    {lang.flag} {lang.code.toUpperCase()}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge className="mb-2">
                  Viewing in: {currentLang?.flag} {currentLang?.name}
                </Badge>
                <h3 className="text-xl font-bold">
                  {translations[previewLanguage as keyof typeof translations]?.title || 'No translation available'}
                </h3>
                <h4 className="text-lg text-gray-600">
                  {translations[previewLanguage as keyof typeof translations]?.subtitle || 'No translation available'}
                </h4>
                <p className="text-gray-700">
                  {translations[previewLanguage as keyof typeof translations]?.description || 'No translation available'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save All Translations
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview Article
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}