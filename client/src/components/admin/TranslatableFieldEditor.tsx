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
  type: "text" | "textarea";
  currentTranslations: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  };
  originalValue: string;
  defaultLanguage?: string;
  onChange: (translations: {
    en?: Record<string, string>;
    mk?: Record<string, string>;
    de?: Record<string, string>;
  }) => void;
}

export function TranslatableFieldEditor({ 
  label, 
  fieldName, 
  type = 'text',
  currentTranslations = {}, 
  originalValue = '',
  defaultLanguage = 'en',
  onChange 
}: TranslatableFieldEditorProps) {
  const [activeTab, setActiveTab] = React.useState(defaultLanguage || 'en');

  // Update active tab when defaultLanguage changes
  React.useEffect(() => {
    if (defaultLanguage && defaultLanguage !== activeTab) {
      setActiveTab(defaultLanguage);
    }
  }, [defaultLanguage]);

  const handleFieldChange = (languageCode: string, value: string) => {
    const updatedTranslations = {
      ...currentTranslations,
      [languageCode]: {
        ...(currentTranslations[languageCode as 'en' | 'mk' | 'de'] || {}),
        [fieldName]: value
      }
    };
    
    console.log(`Field change - Language: ${languageCode}, Field: ${fieldName}, Value: ${value}`);
    console.log('Current translations:', currentTranslations);
    console.log('Updated translations:', updatedTranslations);
    
    onChange(updatedTranslations);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'mk', name: 'Macedonian', flag: '🇲🇰' },
    { code: 'de', name: 'German', flag: '🇩🇪' }
  ];

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">{label}</Label>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {languages.map((lang) => (
            <TabsTrigger key={lang.code} value={lang.code} className="text-xs">
              {lang.flag} {lang.code.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {languages.map((lang) => (
          <TabsContent key={lang.code} value={lang.code} className="mt-3">
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
                type="text"
                value={currentTranslations[lang.code as keyof typeof currentTranslations]?.[fieldName] || ''}
                onChange={(e) => handleFieldChange(lang.code, e.target.value)}
                placeholder={lang.code === 'en' 
                  ? `Enter ${label.toLowerCase()} in English`
                  : `Translate ${label.toLowerCase()} to ${lang.name}`
                }
                data-testid={`translation-${fieldName}-${lang.code}`}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}