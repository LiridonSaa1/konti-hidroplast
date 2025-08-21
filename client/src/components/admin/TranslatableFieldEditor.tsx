import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface TranslatableFieldEditorProps {
  label: string;
  fieldName: string;
  type?: 'text' | 'textarea';
  currentTranslations?: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  };
  originalValue?: string;
  onChange: (translations: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  }) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', required: true },
  { code: 'mk', name: 'Македонски', flag: '🇲🇰', required: false },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', required: false }
];

export function TranslatableFieldEditor({ 
  label, 
  fieldName, 
  type = 'text',
  currentTranslations = {}, 
  originalValue = '',
  onChange 
}: TranslatableFieldEditorProps) {
  const handleFieldChange = (languageCode: string, value: string) => {
    const updatedTranslations = {
      ...currentTranslations,
      [languageCode]: {
        ...(currentTranslations[languageCode as keyof typeof currentTranslations] || {}),
        [fieldName]: value
      }
    };
    onChange(updatedTranslations);
  };

  const getTranslationStatus = (langCode: string) => {
    const translation = currentTranslations[langCode as keyof typeof currentTranslations]?.[fieldName];
    if (!translation || translation.trim() === '') {
      return langCode === 'en' ? 'missing' : 'empty';
    }
    return 'complete';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800';
      case 'missing': return 'bg-red-100 text-red-800';
      case 'empty': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {label}
          <Badge variant="outline" className="text-xs">
            Multi-language
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            {languages.map((lang) => {
              const status = getTranslationStatus(lang.code);
              return (
                <TabsTrigger 
                  key={lang.code} 
                  value={lang.code}
                  className="relative"
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span className="hidden sm:inline">{lang.name}</span>
                    <span className="sm:hidden">{lang.code.toUpperCase()}</span>
                  </div>
                  <Badge 
                    className={`ml-2 text-xs h-4 px-1 ${getStatusColor(status)}`}
                    variant="secondary"
                  >
                    {status === 'complete' ? '✓' : '○'}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
          {languages.map((lang) => (
            <TabsContent key={lang.code} value={lang.code} className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor={`${lang.code}-${fieldName}`} className="text-sm font-medium">
                  {lang.name} Translation
                  {lang.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <Badge className={getStatusColor(getTranslationStatus(lang.code))}>
                  {getTranslationStatus(lang.code)}
                </Badge>
              </div>
              
              {/* Show original value for reference */}
              {lang.code !== 'en' && originalValue && (
                <div className="bg-gray-50 p-3 rounded-md border">
                  <Label className="text-xs text-gray-600 mb-1 block">Original (English):</Label>
                  <p className="text-sm text-gray-800">{originalValue}</p>
                </div>
              )}
              
              {type === 'textarea' ? (
                <Textarea
                  id={`${lang.code}-${fieldName}`}
                  value={currentTranslations[lang.code as keyof typeof currentTranslations]?.[fieldName] || ''}
                  onChange={(e) => handleFieldChange(lang.code, e.target.value)}
                  placeholder={lang.code === 'en' 
                    ? `Enter ${label.toLowerCase()} in English`
                    : `Translate ${label.toLowerCase()} to ${lang.name}`
                  }
                  className="min-h-[100px]"
                  data-testid={`translation-${fieldName}-${lang.code}`}
                />
              ) : (
                <Input
                  id={`${lang.code}-${fieldName}`}
                  value={currentTranslations[lang.code as keyof typeof currentTranslations]?.[fieldName] || ''}
                  onChange={(e) => handleFieldChange(lang.code, e.target.value)}
                  placeholder={lang.code === 'en' 
                    ? `Enter ${label.toLowerCase()} in English`
                    : `Translate ${label.toLowerCase()} to ${lang.name}`
                  }
                  data-testid={`translation-${fieldName}-${lang.code}`}
                />
              )}
              
              {/* Show translation tips for non-English languages */}
              {lang.code !== 'en' && (
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Leave empty to fallback to English version
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}