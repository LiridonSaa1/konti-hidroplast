import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'mk' | 'de';

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
    'nav.products.all': 'All Products',
    'nav.products.waterSupply': 'Water Supply Systems',
    'nav.products.sewerage': 'Sewerage Systems',
    'nav.products.hdpeKontiKan': 'HDPE Konti Kan OD',
    'nav.products.pphmKontiKan': 'PPHM Konti Kan ID',
    'nav.products.spiralKontiKan': 'Konti kan spiral HDPE/ID',
    'nav.products.ppMlCompact': 'PP ML Compact Pipe OD',
    'nav.products.manholes': 'Manholes',
    'nav.products.drainage': 'Konti Kan Drainage',
    'nav.products.gasPipeline': 'Gas Pipeline System',
    'nav.products.cableProtection': 'Cable Protection',
    'nav.downloads.brochures': 'Brochures',
    'nav.downloads.certificates': 'Certificates',
    'nav.contact.career': 'Career',
    
    // Hero Section
    'hero.title.line1': 'Unmatched European',
    'hero.title.line2': 'Standards',
    'hero.title.line3': 'for Pipeline Precision',
    'hero.banner.title': 'HIGH-QUALITY PIPES',
    'hero.banner.subtitle': 'DRIVING PROGRESS WITH INNOVATION',
    
    // About Section
    'about.title': 'About Us',
    'about.description': 'Export-oriented Macedonian company for production of PE and PP pipes since 1975. We are committed to delivering the highest quality pipeline solutions with European standards.',
    'about.text1': 'Konti Hidroplast is export oriented macedonian company for production of PE (polyethylene) and PP (polypropylene) pipes.',
    'about.text2': 'Situated in Southern Macedonia, municipality of Gevgelija Konti Hidroplast was founded in 1975 as a small plant for production of tools and elements of injection molded plastic.',
    'about.text3': 'Following the successful start aided by the experience gained by successfully realized projects in Republic of Macedonia, today our company is export-oriented, and 95% of its products are exported in international markets.',
    'about.mission': 'Our mission is to provide innovative and reliable pipe systems that meet the evolving needs of our customers worldwide.',
    'about.vision': 'To be the leading manufacturer of PE and PP pipes in the region, known for quality, innovation, and environmental responsibility.',
    
    // Statistics
    'stats.years': 'Years',
    'stats.products': 'Products',
    'stats.projects': 'Projects',
    'stats.employees': 'Employees',
    'stats.turnover': 'Turnover',
    
    // Products
    'products.title': 'Products',
    'products.subtitle': 'High-quality PE and PP pipe solutions for various applications',
    'products.waterSupply': 'WATER SUPPLY SYSTEMS',
    'products.sewerage': 'SEWERAGE SYSTEMS',
    'products.learnMore': 'Learn More',
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
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.backToTop': 'Back to Top',
    'common.download': 'Download',
    'common.apply': 'Apply',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.previous': 'Previous',
    'common.next': 'Next',

    // About Us Page
    'aboutUs.title': 'About Us',
    'aboutUs.heroTitle': 'Our Story',
    'aboutUs.heroSubtitle': 'Pioneering Excellence in Pipe Manufacturing Since 1975',
    'aboutUs.companyOverview': 'Company Overview',
    'aboutUs.missionTitle': 'Mission',
    'aboutUs.visionTitle': 'Vision',
    'aboutUs.valuesTitle': 'Values',
    'aboutUs.timelineTitle': 'Our Journey',
    'aboutUs.leadership': 'Leadership',
    'aboutUs.facilities': 'Our Facilities',
    'aboutUs.gallery': 'Gallery',

    // Products Pages
    'productsPage.title': 'Our Products',
    'productsPage.subtitle': 'Comprehensive Pipeline Solutions',
    'productsPage.waterSupply': 'Water Supply Systems',
    'productsPage.sewerageTitle': 'Sewerage Systems',
    'productsPage.gasTitle': 'Gas Pipeline Systems',
    'productsPage.cableTitle': 'Cable Protection',
    'productsPage.specifications': 'Technical Specifications',
    'productsPage.applications': 'Applications',
    'productsPage.features': 'Key Features',
    'productsPage.benefits': 'Benefits',

    // Water Supply Systems
    'waterSupply.title': 'Water Supply Systems',
    'waterSupply.subtitle': 'Reliable PE Pipes for Water Distribution',
    'waterSupply.description': 'High-quality polyethylene pipes designed for potable water distribution and municipal water systems.',

    // Gas Pipeline Systems
    'gasPipeline.title': 'Gas Pipeline Systems',
    'gasPipeline.subtitle': 'Safe and Durable Gas Distribution Solutions',
    'gasPipeline.description': 'Specialized PE pipes for natural gas distribution with enhanced safety features.',

    // Cable Protection
    'cableProtection.title': 'Cable Protection Systems',
    'cableProtection.subtitle': 'Protecting Critical Infrastructure',
    'cableProtection.description': 'Robust conduit systems for telecommunications and electrical cable protection.',

    // Konti Kan Products
    'kontiKan.pipes.title': 'HDPE Konti Kan OD',
    'kontiKan.pipes.subtitle': 'High-Density Polyethylene Pipes',
    'kontiKan.drainage.title': 'Konti Kan Drainage',
    'kontiKan.drainage.subtitle': 'Advanced Drainage Solutions',
    'kontiKan.spiral.title': 'Konti Kan Spiral HDPE/ID',
    'kontiKan.spiral.subtitle': 'Large Diameter Spiral Pipes',

    // PP HM Products
    'ppHm.pipes.title': 'PPHM Konti Kan ID',
    'ppHm.pipes.subtitle': 'Polypropylene High Modulus Pipes',
    'ppHm.smooth.title': 'PP ML Compact Pipe OD',
    'ppHm.smooth.subtitle': 'Smooth Exterior Polypropylene Pipes',

    // Manholes
    'manholes.title': 'Manholes',
    'manholes.subtitle': 'Complete Manhole Systems',
    'manholes.description': 'Comprehensive manhole solutions for sewerage and utility access.',

    // News Page
    'newsPage.title': 'Latest News',
    'newsPage.subtitle': 'Industry Updates and Company News',
    'newsPage.noNews': 'No news articles available',
    'newsPage.loadMore': 'Load More Articles',
    'newsPage.backToNews': 'Back to News',

    // Certificates Page
    'certificates.title': 'Certificates & Standards',
    'certificates.subtitle': 'Quality Assurance and Compliance',
    'certificates.quality': 'Quality Management',
    'certificates.environmental': 'Environmental Standards',
    'certificates.safety': 'Safety Certifications',
    'certificates.product': 'Product Certifications',

    // Brochures Page
    'brochures.title': 'Product Brochures',
    'brochures.subtitle': 'Technical Documentation and Product Information',
    'brochures.downloadPdf': 'Download PDF',
    'brochures.viewDetails': 'View Details',

    // Career Page
    'career.title': 'Career Opportunities',
    'career.subtitle': 'Join Our Growing Team',
    'career.description': 'Be part of our mission to deliver excellence in pipe manufacturing.',
    'career.openPositions': 'Open Positions',
    'career.noPositions': 'No open positions available',
    'career.applicationForm': 'Application Form',
    'career.personalInfo': 'Personal Information',
    'career.firstName': 'First Name',
    'career.lastName': 'Last Name',
    'career.email': 'Email',
    'career.phone': 'Phone Number',
    'career.position': 'Position Applied For',
    'career.resume': 'Upload Resume',
    'career.coverLetter': 'Cover Letter',
    'career.submitApplication': 'Submit Application',

    // Gallery Pages
    'gallery.title': 'Gallery',
    'gallery.production': 'Production',
    'gallery.qualityControl': 'Quality Control',
    'gallery.storage': 'Storage',
    'gallery.projects': 'Projects',
    'gallery.facilities': 'Our Facilities',
    'gallery.viewImage': 'View Image',
    'gallery.closeImage': 'Close Image',

    // Admin Panel
    'admin.title': 'Admin Panel',
    'admin.dashboard': 'Dashboard',
    'admin.news': 'News Management',
    'admin.products': 'Products',
    'admin.gallery': 'Gallery',
    'admin.certificates': 'Certificates',
    'admin.teams': 'Team Members',
    'admin.positions': 'Positions',
    'admin.brochures': 'Brochures',
    'admin.contacts': 'Contact Messages',
    'admin.applications': 'Job Applications',
    'admin.settings': 'Settings',
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
    'nav.products.all': 'Сите производи',
    'nav.products.waterSupply': 'Системи за водоснабдување',
    'nav.products.sewerage': 'Канализациски системи',
    'nav.products.hdpeKontiKan': 'HDPE Конти Кан ОД',
    'nav.products.pphmKontiKan': 'PPHM Конти Кан ИД',
    'nav.products.spiralKontiKan': 'Конти кан спирални HDPE/ID',
    'nav.products.ppMlCompact': 'ПП МЛ компактни цевки ОД',
    'nav.products.manholes': 'Шахти',
    'nav.products.drainage': 'Конти Кан дренажа',
    'nav.products.gasPipeline': 'Систем за гасоводи',
    'nav.products.cableProtection': 'Заштита на кабли',
    'nav.downloads.brochures': 'Брошури',
    'nav.downloads.certificates': 'Сертификати',
    'nav.contact.career': 'Кариера',
    
    // Hero Section
    'hero.title.line1': 'Непревзойдени европски',
    'hero.title.line2': 'стандарди',
    'hero.title.line3': 'за прецизност на цевководи',
    'hero.banner.title': 'ВИСОКО-КВАЛИТЕТНИ ЦЕВКИ',
    'hero.banner.subtitle': 'ДВИЖЕЈЌИ НАПРЕДОК СО ИНОВАЦИИ',
    
    // About Section
    'about.title': 'За нас',
    'about.description': 'Извозно-ориентирана македонска компанија за производство на ПЕ и ПП цевки од 1975 година. Посветени сме на испорака на најквалитетни решенија за цевководи со европски стандарди.',
    'about.text1': 'Конти Хидропласт е извозно-ориентирана македонска компанија за производство на ПЕ (полиетилен) и ПП (полипропилен) цевки.',
    'about.text2': 'Лоцирана во Јужна Македонија, општина Гевгелија, Конти Хидропласт беше основана во 1975 година како мала фабрика за производство на алати и елементи од инјекциски обликувана пластика.',
    'about.text3': 'По успешниот почеток потпомогнат од искуството стекнато со успешно реализирани проекти во Република Македонија, денес нашата компанија е извозно-ориентирана, и 95% од нејзините производи се извезуваат на меѓународните пазари.',
    'about.mission': 'Нашата мисија е да обезбедиме иновативни и сигурни системи за цевки кои ги задоволуваат развојните потреби на нашите клиенти ширум светот.',
    'about.vision': 'Да бидеме водечки производител на ПЕ и ПП цевки во регионот, познати по квалитет, иновации и еколошка одговорност.',
    
    // Statistics
    'stats.years': 'Години',
    'stats.products': 'Производи',
    'stats.projects': 'Проекти',
    'stats.employees': 'Вработени',
    'stats.turnover': 'Промет',
    
    // Products
    'products.title': 'Производи',
    'products.subtitle': 'Високо-квалитетни ПЕ и ПП решенија за цевки за различни примени',
    'products.waterSupply': 'СИСТЕМИ ЗА ВОДОСНАБДУВАЊЕ',
    'products.sewerage': 'КАНАЛИЗАЦИСКИ СИСТЕМИ',
    'products.learnMore': 'Дознај повеќе',
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
    'common.readMore': 'Прочитај повеќе',
    'common.learnMore': 'Дознај повеќе',
    'common.viewAll': 'Види сé',
    'common.backToTop': 'Назад на врв',
    'common.download': 'Преземи',
    'common.apply': 'Аплицирај',
    'common.submit': 'Поднеси',
    'common.cancel': 'Откажи',
    'common.close': 'Затвори',
    'common.search': 'Барај',
    'common.filter': 'Филтрирај',
    'common.sort': 'Сортирај',
    'common.previous': 'Претходна',
    'common.next': 'Следна',

    // About Us Page
    'aboutUs.title': 'За нас',
    'aboutUs.heroTitle': 'Нашата приказна',
    'aboutUs.heroSubtitle': 'Пионери во извонредност во производство на цевки од 1975 година',
    'aboutUs.companyOverview': 'Преглед на компанијата',
    'aboutUs.missionTitle': 'Мисија',
    'aboutUs.visionTitle': 'Визија',
    'aboutUs.valuesTitle': 'Вредности',
    'aboutUs.timelineTitle': 'Нашето патување',
    'aboutUs.leadership': 'Раководство',
    'aboutUs.facilities': 'Нашите објекти',
    'aboutUs.gallery': 'Галерија',

    // Products Pages
    'productsPage.title': 'Наши производи',
    'productsPage.subtitle': 'Сеопфатни решенија за цевководи',
    'productsPage.waterSupply': 'Системи за водоснабдување',
    'productsPage.sewerageTitle': 'Канализациски системи',
    'productsPage.gasTitle': 'Системи за гасоводи',
    'productsPage.cableTitle': 'Заштита на кабли',
    'productsPage.specifications': 'Технички спецификации',
    'productsPage.applications': 'Примени',
    'productsPage.features': 'Клучни карактеристики',
    'productsPage.benefits': 'Придобивки',

    // Water Supply Systems
    'waterSupply.title': 'Системи за водоснабдување',
    'waterSupply.subtitle': 'Сигурни ПЕ цевки за дистрибуција на вода',
    'waterSupply.description': 'Високо-квалитетни полиетиленски цевки дизајнирани за дистрибуција на питка вода и општински водни системи.',

    // Gas Pipeline Systems
    'gasPipeline.title': 'Системи за гасоводи',
    'gasPipeline.subtitle': 'Сигурни и трајни решенија за дистрибуција на гас',
    'gasPipeline.description': 'Специјализирани ПЕ цевки за дистрибуција на природен гас со подобрени безбедносни карактеристики.',

    // Cable Protection
    'cableProtection.title': 'Системи за заштита на кабли',
    'cableProtection.subtitle': 'Заштитување на критичната инфраструктура',
    'cableProtection.description': 'Робусни кондуит системи за заштита на телекомуникациски и електрични кабли.',

    // Konti Kan Products
    'kontiKan.pipes.title': 'HDPE Конти Кан ОД',
    'kontiKan.pipes.subtitle': 'Полиетиленски цевки со висока густина',
    'kontiKan.drainage.title': 'Конти Кан дренажа',
    'kontiKan.drainage.subtitle': 'Напредни дренажни решенија',
    'kontiKan.spiral.title': 'Конти Кан спирални HDPE/ID',
    'kontiKan.spiral.subtitle': 'Спирални цевки со голем дијаметар',

    // PP HM Products
    'ppHm.pipes.title': 'PPHM Конти Кан ИД',
    'ppHm.pipes.subtitle': 'Полипропиленски цевки со висок модул',
    'ppHm.smooth.title': 'ПП МЛ компактни цевки ОД',
    'ppHm.smooth.subtitle': 'Полипропиленски цевки со мазна надворешност',

    // Manholes
    'manholes.title': 'Шахти',
    'manholes.subtitle': 'Комплетни шахтни системи',
    'manholes.description': 'Сеопфатни шахтни решенија за канализација и пристап до комунални услуги.',

    // News Page
    'newsPage.title': 'Најнови вести',
    'newsPage.subtitle': 'Индустриски ажурирања и компаниски вести',
    'newsPage.noNews': 'Нема достапни вести',
    'newsPage.loadMore': 'Вчитај повеќе статии',
    'newsPage.backToNews': 'Назад кон вести',

    // Certificates Page
    'certificates.title': 'Сертификати и стандарди',
    'certificates.subtitle': 'Осигурување на квалитет и усогласеност',
    'certificates.quality': 'Управување со квалитет',
    'certificates.environmental': 'Еколошки стандарди',
    'certificates.safety': 'Безбедносни сертификати',
    'certificates.product': 'Сертификати за производи',

    // Brochures Page
    'brochures.title': 'Брошури за производи',
    'brochures.subtitle': 'Техничка документација и информации за производи',
    'brochures.downloadPdf': 'Преземи PDF',
    'brochures.viewDetails': 'Види детали',

    // Career Page
    'career.title': 'Можности за кариера',
    'career.subtitle': 'Придружи се на нашиот растечки тим',
    'career.description': 'Биди дел од нашата мисија за испорака на извонредност во производството на цевки.',
    'career.openPositions': 'Отворени позиции',
    'career.noPositions': 'Нема достапни отворени позиции',
    'career.applicationForm': 'Формулар за апликација',
    'career.personalInfo': 'Лични информации',
    'career.firstName': 'Име',
    'career.lastName': 'Презиме',
    'career.email': 'Е-пошта',
    'career.phone': 'Телефонски број',
    'career.position': 'Позиција за која аплицираш',
    'career.resume': 'Прикачи биографија',
    'career.coverLetter': 'Мотивационо писмо',
    'career.submitApplication': 'Поднеси апликација',

    // Gallery Pages
    'gallery.title': 'Галерија',
    'gallery.production': 'Производство',
    'gallery.qualityControl': 'Контрола на квалитет',
    'gallery.storage': 'Складирање',
    'gallery.projects': 'Проекти',
    'gallery.facilities': 'Нашите објекти',
    'gallery.viewImage': 'Види слика',
    'gallery.closeImage': 'Затвори слика',

    // Admin Panel
    'admin.title': 'Админ панел',
    'admin.dashboard': 'Контролна табла',
    'admin.news': 'Управување со вести',
    'admin.products': 'Производи',
    'admin.gallery': 'Галерија',
    'admin.certificates': 'Сертификати',
    'admin.teams': 'Членови на тимот',
    'admin.positions': 'Позиции',
    'admin.brochures': 'Брошури',
    'admin.contacts': 'Контакт пораки',
    'admin.applications': 'Апликации за работа',
    'admin.settings': 'Поставки',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.products': 'Produkte',
    'nav.downloads': 'Downloads',
    'nav.news': 'Nachrichten',
    'nav.contact': 'Kontakt',
    'nav.certifications': 'Zertifizierungen',
    'nav.technical': 'Technische Dokumentation',
    'nav.brochures': 'Produktbroschüren',
    'nav.products.all': 'Alle Produkte',
    'nav.products.waterSupply': 'Wasserversorgungssysteme',
    'nav.products.sewerage': 'Abwassersysteme',
    'nav.products.hdpeKontiKan': 'HDPE Konti Kan OD',
    'nav.products.pphmKontiKan': 'PPHM Konti Kan ID',
    'nav.products.spiralKontiKan': 'Konti kan spiral HDPE/ID',
    'nav.products.ppMlCompact': 'PP ML Kompaktrohre OD',
    'nav.products.manholes': 'Schächte',
    'nav.products.drainage': 'Konti Kan Drainage',
    'nav.products.gasPipeline': 'Gasleitungssystem',
    'nav.products.cableProtection': 'Kabelschutz',
    'nav.downloads.brochures': 'Broschüren',
    'nav.downloads.certificates': 'Zertifikate',
    'nav.contact.career': 'Karriere',
    
    // Hero Section
    'hero.title.line1': 'Unvergleichliche europäische',
    'hero.title.line2': 'Standards',
    'hero.title.line3': 'für Rohrleitungspräzision',
    'hero.banner.title': 'HOCHWERTIGE ROHRE',
    'hero.banner.subtitle': 'FORTSCHRITT DURCH INNOVATION',
    
    // About Section
    'about.title': 'Über uns',
    'about.description': 'Exportorientiertes mazedonisches Unternehmen für die Herstellung von PE- und PP-Rohren seit 1975. Wir sind verpflichtet, höchste Qualität bei Rohrleitungslösungen mit europäischen Standards zu liefern.',
    'about.text1': 'Konti Hidroplast ist ein exportorientiertes mazedonisches Unternehmen für die Herstellung von PE- (Polyethylen) und PP- (Polypropylen) Rohren.',
    'about.text2': 'In Südmazedonien gelegen, Gemeinde Gevgelija, wurde Konti Hidroplast 1975 als kleine Fabrik für die Herstellung von Werkzeugen und Elementen aus spritzgegossenem Kunststoff gegründet.',
    'about.text3': 'Nach dem erfolgreichen Start, unterstützt durch die Erfahrung aus erfolgreich realisierten Projekten in der Republik Mazedonien, ist unser Unternehmen heute exportorientiert und 95% seiner Produkte werden auf internationale Märkte exportiert.',
    'about.mission': 'Unsere Mission ist es, innovative und zuverlässige Rohrsysteme bereitzustellen, die den sich entwickelnden Bedürfnissen unserer Kunden weltweit gerecht werden.',
    'about.vision': 'Der führende Hersteller von PE- und PP-Rohren in der Region zu sein, bekannt für Qualität, Innovation und Umweltverantwortung.',
    
    // Statistics
    'stats.years': 'Jahre',
    'stats.products': 'Produkte',
    'stats.projects': 'Projekte',
    'stats.employees': 'Mitarbeiter',
    'stats.turnover': 'Umsatz',
    
    // Products
    'products.title': 'Produkte',
    'products.subtitle': 'Hochwertige PE- und PP-Rohrlösungen für verschiedene Anwendungen',
    'products.waterSupply': 'WASSERVERSORGUNGSSYSTEME',
    'products.sewerage': 'ABWASSERSYSTEME',
    'products.learnMore': 'Mehr erfahren',
    'products.pe.title': 'PE-Rohre',
    'products.pe.description': 'Polyethylen-Rohre für Wasserversorgung, Gasverteilung und industrielle Anwendungen.',
    'products.pp.title': 'PP-Rohre',
    'products.pp.description': 'Polypropylen-Rohre für chemische Beständigkeit und Hochtemperaturanwendungen.',
    'products.fittings.title': 'Rohrfittings',
    'products.fittings.description': 'Komplettes Sortiment an Fittings und Zubehör für alle Rohrsysteme.',
    'products.systems.title': 'Komplette Systeme',
    'products.systems.description': 'Entwickelte Rohrleitungssysteme für komplexe industrielle und kommunale Projekte.',
    
    // News
    'news.title': 'Neueste Nachrichten',
    'news.subtitle': 'Bleiben Sie über unsere neuesten Entwicklungen und Brancheneinblicke auf dem Laufenden',
    'news.more': 'Mehr Nachrichten lesen',
    
    // Contact
    'contact.title': 'Kontaktieren Sie uns',
    'contact.subtitle': 'Nehmen Sie Kontakt mit unserem Team für Anfragen und Support auf',
    'contact.address': 'Adresse',
    'contact.phone': 'Telefon',
    'contact.email': 'E-Mail',
    'contact.form.name': 'Vollständiger Name',
    'contact.form.email': 'E-Mail-Adresse',
    'contact.form.message': 'Nachricht',
    'contact.form.send': 'Nachricht senden',
    
    // Footer
    'footer.company': 'Unternehmen',
    'footer.products': 'Produkte',
    'footer.support': 'Support',
    'footer.contact': 'Kontakt',
    'footer.rights': 'Alle Rechte vorbehalten.',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Ein Fehler ist aufgetreten',
    'common.success': 'Erfolgreich',
    'common.readMore': 'Mehr lesen',
    'common.learnMore': 'Mehr erfahren',
    'common.viewAll': 'Alle anzeigen',
    'common.backToTop': 'Nach oben',
    'common.download': 'Herunterladen',
    'common.apply': 'Bewerben',
    'common.submit': 'Senden',
    'common.cancel': 'Abbrechen',
    'common.close': 'Schließen',
    'common.search': 'Suchen',
    'common.filter': 'Filtern',
    'common.sort': 'Sortieren',
    'common.previous': 'Vorherige',
    'common.next': 'Nächste',

    // About Us Page
    'aboutUs.title': 'Über uns',
    'aboutUs.heroTitle': 'Unsere Geschichte',
    'aboutUs.heroSubtitle': 'Pioniere der Exzellenz in der Rohrherstellung seit 1975',
    'aboutUs.companyOverview': 'Unternehmensübersicht',
    'aboutUs.missionTitle': 'Mission',
    'aboutUs.visionTitle': 'Vision',
    'aboutUs.valuesTitle': 'Werte',
    'aboutUs.timelineTitle': 'Unsere Reise',
    'aboutUs.leadership': 'Führung',
    'aboutUs.facilities': 'Unsere Anlagen',
    'aboutUs.gallery': 'Galerie',

    // Products Pages
    'productsPage.title': 'Unsere Produkte',
    'productsPage.subtitle': 'Umfassende Rohrleitungslösungen',
    'productsPage.waterSupply': 'Wasserversorgungssysteme',
    'productsPage.sewerageTitle': 'Abwassersysteme',
    'productsPage.gasTitle': 'Gasleitungssysteme',
    'productsPage.cableTitle': 'Kabelschutz',
    'productsPage.specifications': 'Technische Spezifikationen',
    'productsPage.applications': 'Anwendungen',
    'productsPage.features': 'Hauptmerkmale',
    'productsPage.benefits': 'Vorteile',

    // Water Supply Systems
    'waterSupply.title': 'Wasserversorgungssysteme',
    'waterSupply.subtitle': 'Zuverlässige PE-Rohre für Wasserverteilung',
    'waterSupply.description': 'Hochwertige Polyethylen-Rohre für Trinkwasserverteilung und kommunale Wassersysteme.',

    // Gas Pipeline Systems
    'gasPipeline.title': 'Gasleitungssysteme',
    'gasPipeline.subtitle': 'Sichere und langlebige Gasverteilungslösungen',
    'gasPipeline.description': 'Spezialisierte PE-Rohre für Erdgasverteilung mit verbesserten Sicherheitsmerkmalen.',

    // Cable Protection
    'cableProtection.title': 'Kabelschutzsysteme',
    'cableProtection.subtitle': 'Schutz kritischer Infrastrukturen',
    'cableProtection.description': 'Robuste Rohrsysteme für den Schutz von Telekommunikations- und Elektrokabeln.',

    // Konti Kan Products
    'kontiKan.pipes.title': 'HDPE Konti Kan OD',
    'kontiKan.pipes.subtitle': 'Hochdichte Polyethylen-Rohre',
    'kontiKan.drainage.title': 'Konti Kan Drainage',
    'kontiKan.drainage.subtitle': 'Fortschrittliche Entwässerungslösungen',
    'kontiKan.spiral.title': 'Konti Kan Spiral HDPE/ID',
    'kontiKan.spiral.subtitle': 'Spiralrohre mit großem Durchmesser',

    // PP HM Products
    'ppHm.pipes.title': 'PPHM Konti Kan ID',
    'ppHm.pipes.subtitle': 'Polypropylen-Rohre mit hohem Modul',
    'ppHm.smooth.title': 'PP ML Kompaktrohre OD',
    'ppHm.smooth.subtitle': 'Polypropylen-Rohre mit glatter Außenseite',

    // Manholes
    'manholes.title': 'Schächte',
    'manholes.subtitle': 'Komplette Schachtsysteme',
    'manholes.description': 'Umfassende Schachtlösungen für Abwasser und Versorgungszugang.',

    // News Page
    'newsPage.title': 'Aktuelle Nachrichten',
    'newsPage.subtitle': 'Branchenupdates und Unternehmensnews',
    'newsPage.noNews': 'Keine Nachrichtenartikel verfügbar',
    'newsPage.loadMore': 'Weitere Artikel laden',
    'newsPage.backToNews': 'Zurück zu den Nachrichten',

    // Certificates Page
    'certificates.title': 'Zertifikate & Standards',
    'certificates.subtitle': 'Qualitätssicherung und Compliance',
    'certificates.quality': 'Qualitätsmanagement',
    'certificates.environmental': 'Umweltstandards',
    'certificates.safety': 'Sicherheitszertifikate',
    'certificates.product': 'Produktzertifikate',

    // Brochures Page
    'brochures.title': 'Produktbroschüren',
    'brochures.subtitle': 'Technische Dokumentation und Produktinformationen',
    'brochures.downloadPdf': 'PDF herunterladen',
    'brochures.viewDetails': 'Details anzeigen',

    // Career Page
    'career.title': 'Karrieremöglichkeiten',
    'career.subtitle': 'Werden Sie Teil unseres wachsenden Teams',
    'career.description': 'Seien Sie Teil unserer Mission, Exzellenz in der Rohrherstellung zu liefern.',
    'career.openPositions': 'Offene Stellen',
    'career.noPositions': 'Keine offenen Stellen verfügbar',
    'career.applicationForm': 'Bewerbungsformular',
    'career.personalInfo': 'Persönliche Informationen',
    'career.firstName': 'Vorname',
    'career.lastName': 'Nachname',
    'career.email': 'E-Mail',
    'career.phone': 'Telefonnummer',
    'career.position': 'Beworbene Position',
    'career.resume': 'Lebenslauf hochladen',
    'career.coverLetter': 'Anschreiben',
    'career.submitApplication': 'Bewerbung senden',

    // Gallery Pages
    'gallery.title': 'Galerie',
    'gallery.production': 'Produktion',
    'gallery.qualityControl': 'Qualitätskontrolle',
    'gallery.storage': 'Lagerung',
    'gallery.projects': 'Projekte',
    'gallery.facilities': 'Unsere Anlagen',
    'gallery.viewImage': 'Bild anzeigen',
    'gallery.closeImage': 'Bild schließen',

    // Admin Panel
    'admin.title': 'Admin-Panel',
    'admin.dashboard': 'Dashboard',
    'admin.news': 'News-Verwaltung',
    'admin.products': 'Produkte',
    'admin.gallery': 'Galerie',
    'admin.certificates': 'Zertifikate',
    'admin.teams': 'Teammitglieder',
    'admin.positions': 'Positionen',
    'admin.brochures': 'Broschüren',
    'admin.contacts': 'Kontaktnachrichten',
    'admin.applications': 'Bewerbungen',
    'admin.settings': 'Einstellungen',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem('konti-language');
    return (saved === 'mk' || saved === 'en' || saved === 'de') ? saved : 'en';
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