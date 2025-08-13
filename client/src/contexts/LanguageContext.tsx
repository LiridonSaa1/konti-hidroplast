import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'mk';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys and values
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.downloads': 'Downloads',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.certifications': 'Certifications',
    'nav.technical': 'Technical Documentation',
    'nav.brochures': 'Product Brochures',
    
    // Hero Section
    'hero.title.line1': 'Unmatched European',
    'hero.title.line2': 'Standards',
    'hero.title.line3': 'for Pipeline Precision',
    'hero.banner.title': 'HIGH-QUALITY PIPES',
    'hero.banner.subtitle': 'DRIVING PROGRESS WITH INNOVATION',
    
    // About Section
    'about.title': 'About Konti Hidroplast',
    'about.description': 'Export-oriented Macedonian company for production of PE and PP pipes since 1975. We are committed to delivering the highest quality pipeline solutions with European standards.',
    'about.text1': 'Konti Hidroplast is export oriented macedonian company for production of PE (polyethylene) and PP (polypropylene) pipes.',
    'about.text2': 'Situated in Southern Macedonia, municipality of Gevgelija Konti Hidroplast was founded in 1975 as a small plant for production of tools and elements of injection molded plastic.',
    'about.text3': 'Following the successful start aided by the experience gained by successfully realized projects in Republic of Macedonia, today our company is export-oriented, and 95% of its products are exported in international markets.',
    'about.mission': 'Our mission is to provide innovative and reliable pipe systems that meet the evolving needs of our customers worldwide.',
    'about.vision': 'To be the leading manufacturer of PE and PP pipes in the region, known for quality, innovation, and environmental responsibility.',
    
    // Statistics
    'stats.experience': 'Years of Experience',
    'stats.products': 'Products Manufactured',
    'stats.countries': 'Countries Served',
    'stats.capacity': 'Annual Production Capacity',
    
    // Products
    'products.title': 'Our Products',
    'products.subtitle': 'High-quality PE and PP pipe solutions for various applications',
    'products.pe.title': 'PE Pipes',
    'products.pe.description': 'Polyethylene pipes for water supply, gas distribution, and industrial applications.',
    'products.pp.title': 'PP Pipes',
    'products.pp.description': 'Polypropylene pipes for chemical resistance and high-temperature applications.',
    'products.fittings.title': 'Pipe Fittings',
    'products.fittings.description': 'Complete range of fittings and accessories for all pipe systems.',
    'products.systems.title': 'Complete Systems',
    'products.systems.description': 'Engineered pipeline systems for complex industrial and municipal projects.',
    
    // News
    'news.title': 'Latest News',
    'news.subtitle': 'Stay updated with our latest developments and industry insights',
    'news.more': 'Read More News',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team for inquiries and support',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    
    // Footer
    'footer.company': 'Company',
    'footer.products': 'Products',
    'footer.support': 'Support',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
  },
  mk: {
    // Navigation
    'nav.home': 'Почетна',
    'nav.about': 'За нас',
    'nav.products': 'Производи',
    'nav.downloads': 'Преземања',
    'nav.news': 'Вести',
    'nav.contact': 'Контакт',
    'nav.certifications': 'Сертификати',
    'nav.technical': 'Техничка документација',
    'nav.brochures': 'Брошури за производи',
    
    // Hero Section
    'hero.title.line1': 'Непревзойдени европски',
    'hero.title.line2': 'стандарди',
    'hero.title.line3': 'за прецизност на цевководи',
    'hero.banner.title': 'ВИСОКО-КВАЛИТЕТНИ ЦЕВКИ',
    'hero.banner.subtitle': 'ДВИЖЕЈЌИ НАПРЕДОК СО ИНОВАЦИИ',
    
    // About Section
    'about.title': 'За Конти Хидропласт',
    'about.description': 'Извозно-ориентирана македонска компанија за производство на ПЕ и ПП цевки од 1975 година. Посветени сме на испорака на најквалитетни решенија за цевководи со европски стандарди.',
    'about.text1': 'Конти Хидропласт е извозно-ориентирана македонска компанија за производство на ПЕ (полиетилен) и ПП (полипропилен) цевки.',
    'about.text2': 'Лоцирана во Јужна Македонија, општина Гевгелија, Конти Хидропласт беше основана во 1975 година како мала фабрика за производство на алати и елементи од инјекциски обликувана пластика.',
    'about.text3': 'По успешниот почеток потпомогнат од искуството стекнато со успешно реализирани проекти во Република Македонија, денес нашата компанија е извозно-ориентирана, и 95% од нејзините производи се извезуваат на меѓународните пазари.',
    'about.mission': 'Нашата мисија е да обезбедиме иновативни и сигурни системи за цевки кои ги задоволуваат развојните потреби на нашите клиенти ширум светот.',
    'about.vision': 'Да бидеме водечки производител на ПЕ и ПП цевки во регионот, познати по квалитет, иновации и еколошка одговорност.',
    
    // Statistics
    'stats.experience': 'Години искуство',
    'stats.products': 'Произведени производи',
    'stats.countries': 'Опслужени земји',
    'stats.capacity': 'Годишен производствен капацитет',
    
    // Products
    'products.title': 'Наши производи',
    'products.subtitle': 'Високо-квалитетни ПЕ и ПП решенија за цевки за различни примени',
    'products.pe.title': 'ПЕ цевки',
    'products.pe.description': 'Полиетиленски цевки за водоснабдување, дистрибуција на гас и индустриски примени.',
    'products.pp.title': 'ПП цевки',
    'products.pp.description': 'Полипропиленски цевки за хемиска отпорност и високо-температурни примени.',
    'products.fittings.title': 'Фитинзи за цевки',
    'products.fittings.description': 'Комплетен асортиман на фитинзи и додатоци за сите системи за цевки.',
    'products.systems.title': 'Комплетни системи',
    'products.systems.description': 'Инженерски системи за цевководи за сложени индустриски и општински проекти.',
    
    // News
    'news.title': 'Најнови вести',
    'news.subtitle': 'Останете во тек со нашите најнови развојни активности и индустриски увиди',
    'news.more': 'Прочитај повеќе вести',
    
    // Contact
    'contact.title': 'Контактирајте не',
    'contact.subtitle': 'Стапете во контакт со нашиот тим за прашања и поддршка',
    'contact.address': 'Адреса',
    'contact.phone': 'Телефон',
    'contact.email': 'Е-пошта',
    'contact.form.name': 'Цело име',
    'contact.form.email': 'Е-пошта адреса',
    'contact.form.message': 'Порака',
    'contact.form.send': 'Испрати порака',
    
    // Footer
    'footer.company': 'Компанија',
    'footer.products': 'Производи',
    'footer.support': 'Поддршка',
    'footer.contact': 'Контакт',
    'footer.rights': 'Сите права се задржани.',
    
    // Common
    'common.loading': 'Се вчитува...',
    'common.error': 'Настана грешка',
    'common.success': 'Успешно',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem('konti-language');
    return (saved === 'mk' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('konti-language', language);
    
    // Update document language attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}