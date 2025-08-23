import { useLanguage, Language } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages = [
    { code: "en" as Language, flag: "🇺🇸", name: "English" },
    { code: "mk" as Language, flag: "🇲🇰", name: "Macedonian" },
    { code: "de" as Language, flag: "🇩🇪", name: "German" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Subtle button that blends with dark header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-transparent border border-gray-600/30 rounded hover:bg-gray-800/50 hover:border-gray-500/50 transition-colors"
        title={`Current: ${currentLanguage?.name}`}
      >
        <span 
          className="text-base text-gray-300"
          style={{ 
            fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Arial Unicode MS", sans-serif',
            fontSize: '16px'
          }}
        >
          {currentLanguage?.flag}
        </span>
        
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Subtle dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-20 bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-center py-2 hover:bg-gray-700/50 transition-colors ${
                language === lang.code ? 'bg-gray-700/70' : ''
              }`}
              title={lang.name}
            >
              <span 
                className="text-lg text-gray-200"
                style={{ 
                  fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Arial Unicode MS", sans-serif',
                  fontSize: '18px'
                }}
              >
                {lang.flag}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
