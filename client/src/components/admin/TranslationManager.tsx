// Admin component for managing translations
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { prepareTranslationUpdate, type TranslatableContent } from '@/hooks/use-translations';

interface TranslationManagerProps {
  title: string;
  currentTranslations?: TranslatableContent;
  fields: { name: string; label: string; type: 'text' | 'textarea' }[];
  onSave: (translations: TranslatableContent) => void;
}

export function TranslationManager({ 
  title, 
  currentTranslations = {}, 
  fields, 
  onSave 
}: TranslationManagerProps) {
  const [translations, setTranslations] = useState<TranslatableContent>(currentTranslations);
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'mk', name: 'Macedonian', flag: '🇲🇰' },
    { code: 'de', name: 'German', flag: '🇩🇪' }
  ];

  const handleFieldChange = (language: string, field: string, value: string) => {
    const updatedTranslations = prepareTranslationUpdate(
      translations,
      language,
      { [field]: value }
    );
    setTranslations(updatedTranslations);
  };

  const handleSave = () => {
    onSave(translations);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title} Translations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {languages.map((lang) => (
              <TabsTrigger key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {languages.map((lang) => (
            <TabsContent key={lang.code} value={lang.code} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={`${lang.code}-${field.name}`}>
                    {field.label}
                  </Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={`${lang.code}-${field.name}`}
                      value={
                        (translations[lang.code as keyof TranslatableContent] as any)?.[field.name] || ''
                      }
                      onChange={(e) => handleFieldChange(lang.code, field.name, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()} in ${lang.name}`}
                      className="mt-1"
                    />
                  ) : (
                    <Input
                      id={`${lang.code}-${field.name}`}
                      value={
                        (translations[lang.code as keyof TranslatableContent] as any)?.[field.name] || ''
                      }
                      onChange={(e) => handleFieldChange(lang.code, field.name, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()} in ${lang.name}`}
                      className="mt-1"
                    />
                  )}
                </div>
              ))}
            </TabsContent>
          ))}
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleSave}>Save Translations</Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}