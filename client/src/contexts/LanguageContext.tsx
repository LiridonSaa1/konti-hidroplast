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
    'news.title': 'News',
    'news.subtitle': 'Stay updated with our latest developments and industry insights',
    'news.readMore': 'Read More',
    'news.viewAll': 'View All News',
    'news.article1.title': 'Innovations in Pipe Inspection and Maintenance Technologies',
    'news.article1.excerpt': 'Latest advancements in pipeline maintenance technologies...',
    'news.article2.title': 'Konti Hidroplast Donated €100,000 to Hospital in Gevgelija',
    'news.article2.excerpt': 'Supporting our community with significant healthcare...',
    'news.article3.title': 'EPD – Environmental Product Declaration',
    'news.article3.excerpt': 'Our commitment to environmental transparency and...',
    
    // Testimonials
    'testimonials.petar.quote': 'As your long-term partner, we are very happy to work with you and your company. Over the years, we have received very good service, great quality of products, fast and competent responses from Konti Hidroplast. All employees are responsive, competent and well-known in the products you produce.',
    'testimonials.petar.author': 'Petar Ermenliev',
    'testimonials.petar.company': 'Eurocom 2000',
    'testimonials.alex.quote': 'Working with Konti Hidroplast has been a truly positive experience. Their professionalism, attention to detail, and commitment to delivering high-quality products & services consistently exceed our expectations. The team\'s expertise and responsiveness make every project smooth and efficient.',
    'testimonials.alex.author': 'Alex Negrescu',
    'testimonials.alex.company': 'General Manager, Dematek Water Management',
    
    // Contact
    'contact.title': 'Get in Touch: Connect with Us Today!',
    'contact.subtitle': 'Ready to discuss your pipeline needs? We\'re here to help.',
    'contact.form.title': 'Send us a Message',
    'contact.form.subtitle': 'We\'ll get back to you within 24 hours',
    'contact.form.name': 'Full Name *',
    'contact.form.name.placeholder': 'Enter your full name',
    'contact.form.email': 'Email Address *',
    'contact.form.email.placeholder': 'your.email@company.com',
    'contact.form.phone': 'Phone Number',
    'contact.form.phone.placeholder': '+389 XX XXX XXX',
    'contact.form.company': 'Company',
    'contact.form.company.placeholder': 'Your company name',
    'contact.form.message': 'Message *',
    'contact.form.message.placeholder': 'Tell us about your pipeline needs...',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.trust.secure': 'Secure & Private',
    'contact.trust.response': '24h Response',
    'contact.trust.support': 'Expert Support',
    'contact.validation.error': 'Validation Error',
    'contact.validation.required': 'Please fill in all required fields.',
    'contact.validation.email': 'Invalid Email',
    'contact.validation.email.message': 'Please enter a valid email address.',
    'contact.success.title': 'Message Sent!',
    'contact.success.message': 'Thank you for your message. We\'ll get back to you soon.',
    'contact.error.title': 'Error',
    'contact.error.message': 'Failed to send message. Please try again.',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    
    // Footer
    'footer.description': 'Export-oriented Macedonian company for production of PE and PP pipes. Founded in 1975, we are committed to delivering unmatched European standards for pipeline precision.',
    'footer.quickLinks': 'Quick Links',
    'footer.aboutUs': 'About Us',
    'footer.products': 'Products',
    'footer.news': 'News',
    'footer.contact': 'Contact',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.contactInfo': 'Contact Info',
    'footer.address': 'Industriska 6, 5480 Gevgelija, North Macedonia',
    'footer.copyright': '© 2025 Urban Rohr. All rights reserved.',
    
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
    'aboutUs.missionText': 'Promoting new technologies while adhering to stringent EU standards. With certified quality and competitive pricing, we embrace regulations and ecological responsibility.',
    'aboutUs.visionTitle': 'Vision',
    'aboutUs.visionText': 'A modern factory, a leader in the region for development and production of plastic products for infrastructure buildings, within the frames of an environmentally safe system with maximum safety for all stakeholders.',
    'aboutUs.valuesTitle': 'Values',
    'aboutUs.valuesText': 'At Konti Hidroplast, we\'re dedicated to leading the industry with top-quality, eco-friendly pipes while prioritizing environmental protection and employee safety.',
    'aboutUs.timelineTitle': 'Our Journey',
    'aboutUs.leadership': 'Leadership',
    'aboutUs.facilities': 'Our Facilities',
    'aboutUs.gallery': 'Gallery',
    'aboutUs.manufacturingExcellence': 'Manufacturing Excellence',
    'aboutUs.isoCertified': 'ISO Certified',
    'aboutUs.corporate2024': 'Corporate 2024',
    'aboutUs.companyStoryText1': 'Following the successful start aided by the experience gained by successfully realized projects in the Republic of North Macedonia, today our company is export-oriented, and 95% of its products are exported in international markets.',
    'aboutUs.companyStoryText2': 'Besides the experience, our large range of products and top quality, by all internationally recognized standards, enabled us to get access to international markets. Our current production program covers all fields of application: pipes and hoses for water supply systems, sewage systems, PE and PP manholes, pipes for transporting gas and oil products, pipes and hoses for protection of telecommunication cables, drainage systems and fittings for all dimensions, which also range from a minimum diameter of 12mm up to 2000mm.',
    'aboutUs.companyStoryText3': 'Konti Hidroplast became known to the market through quality supply and constant application of flexibility in operation, which is very important in an industry where the complexity of managing all processes is quite high.',
    'aboutUs.companyStoryText4': 'One of the key factors for sustainability despite tough competition is constant reinvestment in innovative technologies and pursuing general technological progress. The combination of all these key factors are contributing for Konti Hidroplast to play an important role in the domestic and foreign markets with the constant presence of all major and minor infrastructure projects.',
    
    // Timeline entries
    'timeline.1990.title': 'Beginnings',
    'timeline.1990.description': 'Konti Hidroplast has started its manufacturing production in 1990 with one single production line of polyethylene pipes, with a total number of 10 employees.',
    'timeline.1994.title': 'New products and production lines',
    'timeline.1994.description': 'By 1994, the production program expanded with an additional 5 production lines. In addition to polyethylene hoses and LDPE pipes, Konti Hidroplast began to expand its production program with new types of products and the development of a wider range of dimensions. With the development of new classes of polyethylene (PE), the use of PE pipes for household installations and pressure systems also expanded. With the use of second-generation polyethylene, such as PE63 and PE80, we started producing pipes for domestic installations with a pressure capacity of up to 16 bars. The range of dimensions increased with pipes up to F110mm.',
    'timeline.1996.title': 'Third Generation',
    'timeline.1996.description': 'In 1996 were manufactured the first pipes of a third generation polyethylene material, specifically PE 100. This allowed the pipes to be used in installations with a working pressure of 32 bars. That year, we also began producing gas transportation pipes for use in installations with a working pressure of 10 bars, as well as pipes that can be used in various other industries. We increased the range of dimensions once again, with the largest dimension now being F160mm.',
    'timeline.1998.title': 'ISO 9001',
    'timeline.1998.description': 'In 1998 the dimensional range is increased once again. Now, the largest dimension being F250mm. That year, Konti Hidroplast obtained the ISO 9001 certificate for its management quality system.',
    'timeline.1999-2000.title': 'International Offices',
    'timeline.1999-2000.description': 'In 1999-2000 Konti Hidroplast began expanding its representations with opening its first offices abroad in Serbia and Bulgaria. But, the expanding did not stop there, today Konti Hidroplast has office representations in all of the Balkan countries. In 2001 Konti Hidroplast achieved the greatest expansion of its production capacities to that date with the acquisition of two complete extrusion lines. The first extrusion line expanded the range of pipes for domestic installations, producing pipes up to F400mm, while the second extrusion line was intended for the production of double-layer polyethylene pipes for sewage with dimensions up to F315mm. That year, in addition to the ISO 9001 certification, we also received the ISO 14001 certification for the environmental management system.',
    'timeline.2002.title': 'New capacities',
    'timeline.2002.description': 'In 2002, the company expanded its capacities and product range with an additional production line for household installations, as well as sewage pipes with dimensions up to F630mm.',
    'timeline.2003.title': 'New International Offices',
    'timeline.2003.description': 'In 2003 were opened new company representations in Albania, Bosnia & Herzegovina and Croatia.',
    'timeline.2004.title': 'New Product',
    'timeline.2004.description': 'In 2004 began the production of a new product, the spiral sewage pipes with a diameter up to F1200mm.',
    'timeline.2006.title': 'New Production Line',
    'timeline.2006.description': 'In 2006 was installed a new production line for ribbed double-layer pipes with a diameter of up to F1200mm',
    'timeline.2008.title': 'New Capacity Increase',
    'timeline.2008.description': 'In 2008, we increased the production capacity of ribbed pipes with an additional production line, as well as a line for pressure pipes.',
    'timeline.2009.title': 'PP HM',
    'timeline.2009.description': 'In 2009, Konti Hidroplast expanded its production lines and product range with a new product, the PP HM pipes.',
    'timeline.2011.title': 'New Line and Machines',
    'timeline.2011.description': 'Two new injection molding machines for the production of sewer fittings and a new production line for spiral pipes in the dimensional range of 1300-2000 mm.',
    'timeline.2013.title': 'Expansion and Renovation',
    'timeline.2013.description': 'Expansion of the factory\'s storage space with new areas. A new production line for pressure pipes up to 110 mm in diameter. Two new machines for perforating pressure pipes. Complete renovation of the area surrounding the factory.',
    'timeline.2014.title': 'New Production Line',
    'timeline.2014.description': 'A new production line for pressure pipes up to F 500 mm and reorganization of production capacities and separation of fitting production from extrusion.',
    'timeline.2015.title': 'OD 1000',
    'timeline.2015.description': 'Replacement of the OD 1000 line with a new European-made line for pipes up to F 630 mm. Expansion of the ID 1000 production line to include the OD 1000 dimension.',
    'timeline.2016-2017.title': 'New Acquisitions',
    'timeline.2016-2017.description': 'Procurement of a "cross head" extrusion die for the production of PE 100 RC Type 3 with an external protective layer (PE or PP) in dimensions ranging from 75 to 400 mm. Procurement of an injection molding machine with a capacity of up to 20 kg per shot. Acquisition of two new scanners, eccentricity indicators from the beginning of the process.',
    'timeline.2018.title': 'OD 315',
    'timeline.2018.description': 'Replacement of the base of the oldest corrugator (OD 315) with a new one.',
    'timeline.2019.title': 'Two New Halls',
    'timeline.2019.description': 'Construction of two new halls for storing raw materials.',
    'timeline.2020-2021.title': 'New Hall with Three Production Lines',
    'timeline.2020-2021.description': 'Construction of a new hall to expand production capacities. Installation of three new production lines for pressure pipes: 20-63 mm with a capacity of 300 kg/h, 63-250 mm with a capacity of 600 kg/h, 250-630 mm with a capacity of 1000 kg/h.',
    'timeline.2022.title': 'New Corrugated Pipe Line and New Machines',
    'timeline.2022.description': 'A new high-productivity, energy-efficient production line for corrugated pipes in the 160-315 mm dimensional range. Improvement of the corrugated pipe production process by enhancing the welding of fittings, including the acquisition of three automatic inline welding machines for fitting attachment to pipes.',
    
    // Additional About Us texts
    'aboutUs.noProjectsAvailable': 'No Projects Available',
    'aboutUs.noProjectsText': 'Projects will appear here once they are added to the database.',
    'aboutUs.downloadPdf': 'Download PDF',

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
    'news.title': 'Вести',
    'news.subtitle': 'Останете во тек со нашите најнови развојни активности и индустриски увиди',
    'news.readMore': 'Прочитај повеќе',
    'news.viewAll': 'Види ги сите вести',
    'news.article1.title': 'Иновации во технологиите за инспекција и одржување на цевки',
    'news.article1.excerpt': 'Најновите напредоци во технологиите за одржување на цевководи...',
    'news.article2.title': 'Конти Хидропласт донираше €100.000 на болницата во Гевгелија',
    'news.article2.excerpt': 'Поддршка на нашата заедница со значителна здравствена помош...',
    'news.article3.title': 'EPD – Еколошка декларација за производ',
    'news.article3.excerpt': 'Нашата посветеност кон еколошка транспарентност и...',
    
    // Testimonials
    'testimonials.petar.quote': 'Како ваш долгорочен партнер, многу сме среќни да работиме со вас и вашата компанија. Низ годините, добивме многу добра услуга, одличен квалитет на производи, брзи и компетентни одговори од Конти Хидропласт. Сите вработени се одговорни, компетентни и добро познати во производите што ги произведувате.',
    'testimonials.petar.author': 'Петар Ерменлиев',
    'testimonials.petar.company': 'Еврокон 2000',
    'testimonials.alex.quote': 'Работењето со Конти Хидропласт беше навистина позитивно искуство. Нивниот професионализам, внимание кон деталите и посветеноста во испораката на висококвалитетни производи и услуги постојано ги надминуваат нашите очекувања. Експертизата на тимот и одговорноста го прават секој проект мирен и ефикасен.',
    'testimonials.alex.author': 'Алекс Негреску',
    'testimonials.alex.company': 'Генерален менаџер, Дематек управување со води',
    
    // Contact
    'contact.title': 'Стапете во контакт: Поврзете се со нас денес!',
    'contact.subtitle': 'Подготвени сте да разговарате за вашите потреби за цевководи? Ние сме тука да помогнеме.',
    'contact.form.title': 'Испратете ни порака',
    'contact.form.subtitle': 'Ќе ви одговориме во рок од 24 часа',
    'contact.form.name': 'Цело име *',
    'contact.form.name.placeholder': 'Внесете го вашето цело име',
    'contact.form.email': 'Е-пошта адреса *',
    'contact.form.email.placeholder': 'vashe.ime@kompanija.com',
    'contact.form.phone': 'Телефонски број',
    'contact.form.phone.placeholder': '+389 XX XXX XXX',
    'contact.form.company': 'Компанија',
    'contact.form.company.placeholder': 'Името на вашата компанија',
    'contact.form.message': 'Порака *',
    'contact.form.message.placeholder': 'Кажете ни за вашите потреби за цевководи...',
    'contact.form.send': 'Испрати порака',
    'contact.form.sending': 'Се испраќа...',
    'contact.trust.secure': 'Безбедно и приватно',
    'contact.trust.response': 'Одговор за 24ч',
    'contact.trust.support': 'Експертска поддршка',
    'contact.validation.error': 'Грешка во валидација',
    'contact.validation.required': 'Ве молиме пополнете ги сите задолжителни полиња.',
    'contact.validation.email': 'Невалидна е-пошта',
    'contact.validation.email.message': 'Ве молиме внесете валидна е-пошта адреса.',
    'contact.success.title': 'Пораката е испратена!',
    'contact.success.message': 'Ви благодариме за вашата порака. Наскоро ќе ви одговориме.',
    'contact.error.title': 'Грешка',
    'contact.error.message': 'Неуспешно испраќање на пораката. Ве молиме обидете се повторно.',
    'contact.address': 'Адреса',
    'contact.phone': 'Телефон',
    
    // Footer
    'footer.description': 'Извозно-ориентирана македонска компанија за производство на ПЕ и ПП цевки. Основана во 1975 година, посветени сме на испорака на непревземени европски стандарди за прецизност на цевководи.',
    'footer.quickLinks': 'Брзи врски',
    'footer.aboutUs': 'За нас',
    'footer.products': 'Производи',
    'footer.news': 'Вести',
    'footer.contact': 'Контакт',
    'footer.privacyPolicy': 'Политика за приватност',
    'footer.contactInfo': 'Контакт информации',
    'footer.address': 'Индустриска 6, 5480 Гевгелија, Северна Македонија',
    'footer.copyright': '© 2025 Урбан Рор. Сите права се задржани.',
    
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
    'aboutUs.missionText': 'Промовирање на нови технологии додека се придржуваме до строги ЕУ стандарди. Со сертифициран квалитет и конкурентни цени, ги прифаќаме регулативите и еколошката одговорност.',
    'aboutUs.visionTitle': 'Визија',
    'aboutUs.visionText': 'Модерна фабрика, лидер во регионот за развој и производство на пластични производи за инфраструктурни објекти, во рамките на еколошки безбеден систем со максимална безбедност за сите заинтересирани страни.',
    'aboutUs.valuesTitle': 'Вредности',
    'aboutUs.valuesText': 'Во Конти Хидропласт, посветени сме на водење на индустријата со врвен квалитет, еколошки цевки додека даваме приоритет на заштитата на животната средина и безбедноста на вработените.',
    'aboutUs.timelineTitle': 'Нашето патување',
    'aboutUs.leadership': 'Раководство',
    'aboutUs.facilities': 'Нашите објекти',
    'aboutUs.gallery': 'Галерија',
    'aboutUs.manufacturingExcellence': 'Производна извонредност',
    'aboutUs.isoCertified': 'ИСО сертифицирано',
    'aboutUs.corporate2024': 'Корпоративно 2024',
    'aboutUs.companyStoryText1': 'По успешниот почеток потпомогнат од искуството стекнато со успешно реализирани проекти во Република Северна Македонија, денес нашата компанија е извозно-ориентирана, и 95% од нејзините производи се извезуваат на меѓународните пазари.',
    'aboutUs.companyStoryText2': 'Покрај искуството, нашиот голем асортиман на производи и врвен квалитет, според сите меѓународно признати стандарди, ни овозможи да добиеме пристап до меѓународните пазари. Нашата моментална производна програма ги покрива сите области на примена: цевки и црева за водоводни системи, канализациони системи, ПЕ и ПП шахти, цевки за транспорт на гас и нафтени деривати, цевки и црева за заштита на телекомуникациски кабли, дренажни системи и фитинзи за сите димензии, кои исто така варираат од минимален дијаметар од 12мм до 2000мм.',
    'aboutUs.companyStoryText3': 'Конти Хидропласт стана познат на пазарот преку квалитетна снабденост и постојана примена на флексибилност во работењето, што е многу важно во индустрија каде што сложеноста на управување со сите процеси е прилично висока.',
    'aboutUs.companyStoryText4': 'Еден од клучните фактори за одржливост и покрај жестоката конкуренција е постојаното реинвестирање во иновативни технологии и следење на општиот технолошки напредок. Комбинацијата на сите овие клучни фактори придонесуваат Конти Хидропласт да игра важна улога на домашните и странските пазари со постојаното присуство на сите големи и мали инфраструктурни проекти.',
    
    // Timeline entries
    'timeline.1990.title': 'Почетоци',
    'timeline.1990.description': 'Конти Хидропласт ја започна својата производствена дејност во 1990 година со една единствена производна линија за полиетиленски цевки, со вкупен број од 10 вработени.',
    'timeline.1994.title': 'Нови производи и производни линии',
    'timeline.1994.description': 'До 1994 година, производната програма се прошири со дополнителни 5 производни линии. Покрај полиетиленските црева и LDPE цевки, Конти Хидропласт почна да ја прошируваат својата производна програма со нови типови производи и развој на поширок асортиман димензии. Со развојот на нови класи полиетилен (PE), употребата на PE цевки за домашни инсталации и притисочни системи исто така се прошири. Со употребата на втора генерација полиетилен, како што се PE63 и PE80, започнавме со производство на цевки за домашни инсталации со притисочен капацитет до 16 бари. Опсегот на димензиите се зголеми со цевки до F110мм.',
    'timeline.1996.title': 'Трета генерација',
    'timeline.1996.description': 'Во 1996 година се произведоа првите цевки од трета генерација полиетиленски материјал, конкретно PE 100. Ова им овозможи на цевките да се користат во инсталации со работен притисок од 32 бари. Таа година, исто така започнавме со производство на цевки за транспорт на гас за употреба во инсталации со работен притисок од 10 бари, како и цевки што можат да се користат во различни други индустрии. Го зголемивме опсегот на димензиите повторно, со најголемата димензија сега F160мм.',
    'timeline.1998.title': 'ИСО 9001',
    'timeline.1998.description': 'Во 1998 година димензионалниот опсег повторно е зголемен. Сега, најголемата димензија е F250мм. Таа година, Конти Хидропласт го доби сертификатот ИСО 9001 за својот систем за управување со квалитет.',
    'timeline.1999-2000.title': 'Меѓународни канцеларии',
    'timeline.1999-2000.description': 'Во 1999-2000 Конти Хидропласт почна да ги прошируваат своите претставништва со отварање на првите канцеларии во странство во Србија и Бугарија. Но, проширувањето не запре таму, денес Конти Хидропласт има канцелариски претставништва во сите балкански земји. Во 2001 Конти Хидропласт постигна најголемо проширување на своите производни капацитети до тој датум со набавката на две комплетни екструзиски линии. Првата екструзиска линија го прошири асортиманот на цевки за домашни инсталации, произведувајќи цевки до F400мм, додека втората екструзиска линија беше наменета за производство на двослојни полиетиленски цевки за канализација со димензии до F315мм. Таа година, покрај сертификацијата ИСО 9001, го добивме и сертификатот ИСО 14001 за системот за управување со животната средина.',
    'timeline.2002.title': 'Нови капацитети',
    'timeline.2002.description': 'Во 2002 година, компанијата ги прошири своите капацитети и асортиман производи со дополнителна производна линија за домашни инсталации, како и канализациски цевки со димензии до F630мм.',
    'timeline.2003.title': 'Нови меѓународни канцеларии',
    'timeline.2003.description': 'Во 2003 година се отворија нови претставништва на компанијата во Албанија, Босна и Херцеговина и Хрватска.',
    'timeline.2004.title': 'Нов производ',
    'timeline.2004.description': 'Во 2004 година започна производството на нов производ, спиралните канализациски цевки со дијаметар до F1200мм.',
    'timeline.2006.title': 'Нова производна линија',
    'timeline.2006.description': 'Во 2006 година е инсталирана нова производна линија за ребрести двослојни цевки со дијаметар до F1200мм',
    'timeline.2008.title': 'Зголемување на нов капацитет',
    'timeline.2008.description': 'Во 2008 година, го зголемивме производниот капацитет на ребрести цевки со дополнителна производна линија, како и линија за притисочни цевки.',
    'timeline.2009.title': 'PP HM',
    'timeline.2009.description': 'Во 2009 година, Конти Хидропласт ги прошири своите производни линии и асортиман производи со нов производ, PP HM цевките.',
    'timeline.2011.title': 'Нова линија и машини',
    'timeline.2011.description': 'Две нови машини за инјекциско леење за производство на канализациски фитинзи и нова производна линија за спирални цевки во димензионалниот опсег 1300-2000 мм.',
    'timeline.2013.title': 'Проширување и реновирање',
    'timeline.2013.description': 'Проширување на складишниот простор на фабриката со нови области. Нова производна линија за притисочни цевки до 110 мм во дијаметар. Две нови машини за перфорирање на притисочни цевки. Комплетно реновирање на областа околу фабриката.',
    'timeline.2014.title': 'Нова производна линија',
    'timeline.2014.description': 'Нова производна линија за притисочни цевки до F 500 мм и реорганизација на производните капацитети и одделување на производството на фитинзи од екструзијата.',
    'timeline.2015.title': 'OD 1000',
    'timeline.2015.description': 'Замена на OD 1000 линијата со нова европска линија за цевки до F 630 мм. Проширување на ID 1000 производната линија за да ја вклучи OD 1000 димензијата.',
    'timeline.2016-2017.title': 'Нови набавки',
    'timeline.2016-2017.description': 'Набавка на "cross head" екструзиска матрица за производство на PE 100 RC Type 3 со надворешен заштитен слој (PE или PP) во димензии од 75 до 400 мм. Набавка на машина за инјекциско леење со капацитет до 20 кг по удар. Набавка на два нови скенери, индикатори за ексцентричност од почетокот на процесот.',
    'timeline.2018.title': 'OD 315',
    'timeline.2018.description': 'Замена на базата на најстариот коругатор (OD 315) со нова.',
    'timeline.2019.title': 'Две нови хали',
    'timeline.2019.description': 'Изградба на две нови хали за складирање суровини.',
    'timeline.2020-2021.title': 'Нова хала со три производни линии',
    'timeline.2020-2021.description': 'Изградба на нова хала за проширување на производните капацитети. Инсталирање на три нови производни линии за притисочни цевки: 20-63 мм со капацитет од 300 кг/ч, 63-250 мм со капацитет од 600 кг/ч, 250-630 мм со капацитет од 1000 кг/ч.',
    'timeline.2022.title': 'Нова линија за коругирани цевки и нови машини',
    'timeline.2022.description': 'Нова високопродуктивна, енергетски ефикасна производна линија за коругирани цевки во димензионалниот опсег 160-315 мм. Подобрување на процесот за производство на коругирани цевки со подобрување на заварувањето на фитинзи, вклучувајќи набавка на три автоматски inline машини за заварување за прицврстување на фитинзи на цевки.',
    
    // Additional About Us texts
    'aboutUs.noProjectsAvailable': 'Нема достапни проекти',
    'aboutUs.noProjectsText': 'Проектите ќе се појават овде откако ќе бидат додадени во базата на податоци.',
    'aboutUs.downloadPdf': 'Преземи PDF',

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
    'news.title': 'Nachrichten',
    'news.subtitle': 'Bleiben Sie über unsere neuesten Entwicklungen und Brancheneinblicke auf dem Laufenden',
    'news.readMore': 'Mehr lesen',
    'news.viewAll': 'Alle Nachrichten ansehen',
    'news.article1.title': 'Innovationen in der Rohrinspektion und Wartungstechnologie',
    'news.article1.excerpt': 'Neueste Fortschritte in der Pipeline-Wartungstechnologie...',
    'news.article2.title': 'Konti Hidroplast spendete €100.000 an das Krankenhaus in Gevgelija',
    'news.article2.excerpt': 'Unterstützung unserer Gemeinde mit erheblicher Gesundheitsversorgung...',
    'news.article3.title': 'EPD – Umwelt-Produktdeklaration',
    'news.article3.excerpt': 'Unser Engagement für Umwelttransparenz und...',
    
    // Testimonials
    'testimonials.petar.quote': 'Als Ihr langfristiger Partner sind wir sehr glücklich, mit Ihnen und Ihrem Unternehmen zu arbeiten. Über die Jahre haben wir sehr guten Service, große Qualität der Produkte und schnelle, kompetente Antworten von Konti Hidroplast erhalten. Alle Mitarbeiter sind reaktionsschnell, kompetent und bekannt für die Produkte, die Sie herstellen.',
    'testimonials.petar.author': 'Petar Ermenliev',
    'testimonials.petar.company': 'Eurocom 2000',
    'testimonials.alex.quote': 'Die Zusammenarbeit mit Konti Hidroplast war eine wirklich positive Erfahrung. Ihr Professionalität, Liebe zum Detail und Engagement für die Lieferung hochwertiger Produkte und Dienstleistungen übertreffen unsere Erwartungen kontinuierlich. Die Expertise und Reaktionsfähigkeit des Teams machen jedes Projekt reibungslos und effizient.',
    'testimonials.alex.author': 'Alex Negrescu',
    'testimonials.alex.company': 'General Manager, Dematek Wassermanagement',
    
    // Contact
    'contact.title': 'In Kontakt kommen: Verbinden Sie sich heute mit uns!',
    'contact.subtitle': 'Bereit, Ihre Pipeline-Bedürfnisse zu besprechen? Wir sind hier, um zu helfen.',
    'contact.form.title': 'Senden Sie uns eine Nachricht',
    'contact.form.subtitle': 'Wir melden uns innerhalb von 24 Stunden bei Ihnen',
    'contact.form.name': 'Vollständiger Name *',
    'contact.form.name.placeholder': 'Geben Sie Ihren vollständigen Namen ein',
    'contact.form.email': 'E-Mail-Adresse *',
    'contact.form.email.placeholder': 'ihre.email@unternehmen.com',
    'contact.form.phone': 'Telefonnummer',
    'contact.form.phone.placeholder': '+389 XX XXX XXX',
    'contact.form.company': 'Unternehmen',
    'contact.form.company.placeholder': 'Ihr Unternehmensname',
    'contact.form.message': 'Nachricht *',
    'contact.form.message.placeholder': 'Erzählen Sie uns von Ihren Pipeline-Bedürfnissen...',
    'contact.form.send': 'Nachricht senden',
    'contact.form.sending': 'Wird gesendet...',
    'contact.trust.secure': 'Sicher & Privat',
    'contact.trust.response': '24h Antwort',
    'contact.trust.support': 'Expertenunterstützung',
    'contact.validation.error': 'Validierungsfehler',
    'contact.validation.required': 'Bitte füllen Sie alle Pflichtfelder aus.',
    'contact.validation.email': 'Ungültige E-Mail',
    'contact.validation.email.message': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    'contact.success.title': 'Nachricht gesendet!',
    'contact.success.message': 'Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.',
    'contact.error.title': 'Fehler',
    'contact.error.message': 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    'contact.address': 'Adresse',
    'contact.phone': 'Telefon',
    
    // Footer
    'footer.description': 'Exportorientiertes mazedonisches Unternehmen für die Herstellung von PE- und PP-Rohren. Gegründet 1975, sind wir verpflichtet, unübertroffene europäische Standards für Pipeline-Präzision zu liefern.',
    'footer.quickLinks': 'Schnellzugriff',
    'footer.aboutUs': 'Über uns',
    'footer.products': 'Produkte',
    'footer.news': 'Nachrichten',
    'footer.contact': 'Kontakt',
    'footer.privacyPolicy': 'Datenschutzrichtlinie',
    'footer.contactInfo': 'Kontaktinformationen',
    'footer.address': 'Industriska 6, 5480 Gevgelija, Nordmazedonien',
    'footer.copyright': '© 2025 Urban Rohr. Alle Rechte vorbehalten.',
    
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
    'aboutUs.missionText': 'Förderung neuer Technologien unter Einhaltung strenger EU-Standards. Mit zertifizierter Qualität und wettbewerbsfähigen Preisen übernehmen wir Vorschriften und ökologische Verantwortung.',
    'aboutUs.visionTitle': 'Vision',
    'aboutUs.visionText': 'Eine moderne Fabrik, ein Marktführer in der Region für die Entwicklung und Produktion von Kunststoffprodukten für Infrastrukturbauten, innerhalb eines umweltfreundlichen Systems mit maximaler Sicherheit für alle Beteiligten.',
    'aboutUs.valuesTitle': 'Werte',
    'aboutUs.valuesText': 'Bei Konti Hidroplast sind wir bestrebt, die Branche mit hochwertigen, umweltfreundlichen Rohren anzuführen und dabei Umweltschutz und Mitarbeitersicherheit zu priorisieren.',
    'aboutUs.timelineTitle': 'Unsere Reise',
    'aboutUs.leadership': 'Führung',
    'aboutUs.facilities': 'Unsere Anlagen',
    'aboutUs.gallery': 'Galerie',
    'aboutUs.manufacturingExcellence': 'Herstellungsexzellenz',
    'aboutUs.isoCertified': 'ISO-zertifiziert',
    'aboutUs.corporate2024': 'Corporate 2024',
    'aboutUs.companyStoryText1': 'Nach dem erfolgreichen Start, unterstützt durch die Erfahrung aus erfolgreich realisierten Projekten in der Republik Nordmazedonien, ist unser Unternehmen heute exportorientiert und 95% seiner Produkte werden auf internationale Märkte exportiert.',
    'aboutUs.companyStoryText2': 'Neben der Erfahrung ermöglichten uns unsere große Produktpalette und Spitzenqualität nach allen international anerkannten Standards den Zugang zu internationalen Märkten. Unser aktuelles Produktionsprogramm deckt alle Anwendungsbereiche ab: Rohre und Schläuche für Wasserversorgungssysteme, Abwassersysteme, PE- und PP-Schächte, Rohre für den Transport von Gas- und Ölprodukten, Rohre und Schläuche zum Schutz von Telekommunikationskabeln, Entwässerungssysteme und Fittings für alle Dimensionen, die auch von einem Mindestdurchmesser von 12 mm bis 2000 mm reichen.',
    'aboutUs.companyStoryText3': 'Konti Hidroplast wurde auf dem Markt durch qualitativ hochwertige Lieferungen und die ständige Anwendung von Flexibilität im Betrieb bekannt, was in einer Branche, in der die Komplexität der Verwaltung aller Prozesse recht hoch ist, sehr wichtig ist.',
    'aboutUs.companyStoryText4': 'Einer der Schlüsselfaktoren für Nachhaltigkeit trotz harter Konkurrenz ist die kontinuierliche Reinvestition in innovative Technologien und das Verfolgen des allgemeinen technologischen Fortschritts. Die Kombination all dieser Schlüsselfaktoren trägt dazu bei, dass Konti Hidroplast eine wichtige Rolle auf den inländischen und ausländischen Märkten mit der ständigen Präsenz bei allen großen und kleinen Infrastrukturprojekten spielt.',
    
    // Timeline entries
    'timeline.1990.title': 'Anfänge',
    'timeline.1990.description': 'Konti Hidroplast hat 1990 seine Fertigungsproduktion mit einer einzigen Produktionslinie für Polyethylenrohre und insgesamt 10 Mitarbeitern begonnen.',
    'timeline.1994.title': 'Neue Produkte und Produktionslinien',
    'timeline.1994.description': 'Bis 1994 wurde das Produktionsprogramm um weitere 5 Produktionslinien erweitert. Zusätzlich zu Polyethylenschläuchen und LDPE-Rohren begann Konti Hidroplast, sein Produktionsprogramm mit neuen Produkttypen und der Entwicklung einer breiteren Palette von Dimensionen zu erweitern. Mit der Entwicklung neuer Polyethylenklassen (PE) erweiterte sich auch die Verwendung von PE-Rohren für Hausinstallationen und Drucksysteme. Mit der Verwendung von Polyethylen der zweiten Generation, wie PE63 und PE80, begannen wir mit der Herstellung von Rohren für Hausinstallationen mit einem Druckkapazität von bis zu 16 bar. Das Dimensionsspektrum vergrößerte sich mit Rohren bis F110mm.',
    'timeline.1996.title': 'Dritte Generation',
    'timeline.1996.description': 'Im Jahr 1996 wurden die ersten Rohre aus einem Polyethylenmaterial der dritten Generation hergestellt, speziell PE 100. Dies ermöglichte es, die Rohre in Installationen mit einem Arbeitsdruck von 32 bar zu verwenden. In diesem Jahr begannen wir auch mit der Herstellung von Gastransportrohren für den Einsatz in Installationen mit einem Arbeitsdruck von 10 bar sowie Rohren, die in verschiedenen anderen Industrien verwendet werden können. Wir vergrößerten das Dimensionsspektrum erneut, wobei die größte Dimension nun F160mm betrug.',
    'timeline.1998.title': 'ISO 9001',
    'timeline.1998.description': 'Im Jahr 1998 wurde das Dimensionsspektrum erneut vergrößert. Nun beträgt die größte Dimension F250mm. In diesem Jahr erhielt Konti Hidroplast das ISO 9001-Zertifikat für sein Qualitätsmanagementsystem.',
    'timeline.1999-2000.title': 'Internationale Büros',
    'timeline.1999-2000.description': 'In den Jahren 1999-2000 begann Konti Hidroplast seine Vertretungen zu erweitern, indem es seine ersten Büros im Ausland in Serbien und Bulgarien eröffnete. Aber die Expansion hörte dort nicht auf, heute hat Konti Hidroplast Bürovertretungen in allen Balkanländern. Im Jahr 2001 erzielte Konti Hidroplast die größte Erweiterung seiner Produktionskapazitäten bis zu diesem Datum mit dem Erwerb von zwei kompletten Extrusionslinien. Die erste Extrusionslinie erweiterte das Sortiment der Rohre für Hausinstallationen und produzierte Rohre bis F400mm, während die zweite Extrusionslinie für die Produktion von doppelschichtigen Polyethylenrohren für Abwasser mit Dimensionen bis F315mm bestimmt war. In diesem Jahr erhielten wir zusätzlich zur ISO 9001-Zertifizierung auch die ISO 14001-Zertifizierung für das Umweltmanagementsystem.',
    'timeline.2002.title': 'Neue Kapazitäten',
    'timeline.2002.description': 'Im Jahr 2002 erweiterte das Unternehmen seine Kapazitäten und Produktpalette um eine zusätzliche Produktionslinie für Hausinstallationen sowie Abwasserrohre mit Dimensionen bis F630mm.',
    'timeline.2003.title': 'Neue internationale Büros',
    'timeline.2003.description': 'Im Jahr 2003 wurden neue Unternehmensvertretungen in Albanien, Bosnien und Herzegowina und Kroatien eröffnet.',
    'timeline.2004.title': 'Neues Produkt',
    'timeline.2004.description': 'Im Jahr 2004 begann die Produktion eines neuen Produkts, der Spiralabwasserrohre mit einem Durchmesser bis F1200mm.',
    'timeline.2006.title': 'Neue Produktionslinie',
    'timeline.2006.description': 'Im Jahr 2006 wurde eine neue Produktionslinie für gerippte doppelschichtige Rohre mit einem Durchmesser von bis zu F1200mm installiert',
    'timeline.2008.title': 'Neue Kapazitätssteigerung',
    'timeline.2008.description': 'Im Jahr 2008 erhöhten wir die Produktionskapazität für gerippte Rohre mit einer zusätzlichen Produktionslinie sowie einer Linie für Druckrohre.',
    'timeline.2009.title': 'PP HM',
    'timeline.2009.description': 'Im Jahr 2009 erweiterte Konti Hidroplast seine Produktionslinien und Produktpalette um ein neues Produkt, die PP HM-Rohre.',
    'timeline.2011.title': 'Neue Linie und Maschinen',
    'timeline.2011.description': 'Zwei neue Spritzgussmaschinen für die Herstellung von Kanalfittings und eine neue Produktionslinie für Spiralrohre im Dimensionsbereich von 1300-2000 mm.',
    'timeline.2013.title': 'Erweiterung und Renovierung',
    'timeline.2013.description': 'Erweiterung der Lagerfläche der Fabrik mit neuen Bereichen. Eine neue Produktionslinie für Druckrohre bis 110 mm Durchmesser. Zwei neue Maschinen zum Perforieren von Druckrohren. Vollständige Renovierung des Bereichs um die Fabrik.',
    'timeline.2014.title': 'Neue Produktionslinie',
    'timeline.2014.description': 'Eine neue Produktionslinie für Druckrohre bis F 500 mm und Neuorganisation der Produktionskapazitäten und Trennung der Fitting-Produktion von der Extrusion.',
    'timeline.2015.title': 'OD 1000',
    'timeline.2015.description': 'Ersatz der OD 1000-Linie durch eine neue europäische Linie für Rohre bis F 630 mm. Erweiterung der ID 1000-Produktionslinie um die OD 1000-Dimension.',
    'timeline.2016-2017.title': 'Neue Akquisitionen',
    'timeline.2016-2017.description': 'Beschaffung eines "Cross Head" Extrusionswerkzeugs für die Herstellung von PE 100 RC Typ 3 mit einer äußeren Schutzschicht (PE oder PP) in Dimensionen von 75 bis 400 mm. Beschaffung einer Spritzgussmaschine mit einer Kapazität von bis zu 20 kg pro Schuss. Erwerb von zwei neuen Scannern, Exzentrizitätsindikatoren vom Anfang des Prozesses.',
    'timeline.2018.title': 'OD 315',
    'timeline.2018.description': 'Ersatz der Basis des ältesten Wellrohrs (OD 315) durch eine neue.',
    'timeline.2019.title': 'Zwei neue Hallen',
    'timeline.2019.description': 'Bau von zwei neuen Hallen zur Lagerung von Rohstoffen.',
    'timeline.2020-2021.title': 'Neue Halle mit drei Produktionslinien',
    'timeline.2020-2021.description': 'Bau einer neuen Halle zur Erweiterung der Produktionskapazitäten. Installation von drei neuen Produktionslinien für Druckrohre: 20-63 mm mit einer Kapazität von 300 kg/h, 63-250 mm mit einer Kapazität von 600 kg/h, 250-630 mm mit einer Kapazität von 1000 kg/h.',
    'timeline.2022.title': 'Neue Wellrohr-Linie und neue Maschinen',
    'timeline.2022.description': 'Eine neue hochproduktive, energieeffiziente Produktionslinie für Wellrohre im Dimensionsbereich 160-315 mm. Verbesserung des Wellrohr-Produktionsprozesses durch Verbesserung des Schweißens von Fittings, einschließlich der Beschaffung von drei automatischen Inline-Schweißmaschinen für die Befestigung von Fittings an Rohren.',
    
    // Additional About Us texts
    'aboutUs.noProjectsAvailable': 'Keine Projekte verfügbar',
    'aboutUs.noProjectsText': 'Projekte werden hier angezeigt, sobald sie zur Datenbank hinzugefügt werden.',
    'aboutUs.downloadPdf': 'PDF herunterladen',

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