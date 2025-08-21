import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "en" | "mk" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Translation keys and values
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.products": "Products",
    "nav.downloads": "Downloads",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.certifications": "Certifications",
    "nav.technical": "Technical Documentation",
    "nav.brochures": "Product Brochures",
    "nav.products.all": "All Products",
    "nav.products.waterSupply": "Water Supply Systems",
    "nav.products.sewerage": "Sewerage Systems",
    "nav.products.hdpeKontiKan": "HDPE Konti Kan OD",
    "nav.products.pphmKontiKan": "PPHM Konti Kan ID",
    "nav.products.spiralKontiKan": "Konti kan spiral HDPE/ID",
    "nav.products.ppMlCompact": "PP ML Compact Pipe OD",
    "nav.products.manholes": "Manholes",
    "nav.products.drainage": "Konti Kan Drainage",
    "nav.products.gasPipeline": "Gas Pipeline System",
    "nav.products.cableProtection": "Cable Protection",
    "nav.downloads.brochures": "Brochures",
    "nav.downloads.certificates": "Certificates",
    "nav.contact.career": "Career",

    // Hero Section
    "hero.title.line1": "Unmatched European",
    "hero.title.line2": "Standards",
    "hero.title.line3": "for Pipeline Precision",
    "hero.banner.title": "HIGH-QUALITY PIPES",
    "hero.banner.subtitle": "DRIVING PROGRESS WITH INNOVATION",

    // About Section
    "about.title": "About Us",
    "about.description":
      "Export-oriented Macedonian company for production of PE and PP pipes since 1975. We are committed to delivering the highest quality pipeline solutions with European standards.",
    "about.text1":
      "Konti Hidroplast is export oriented macedonian company for production of PE (polyethylene) and PP (polypropylene) pipes.",
    "about.text2":
      "Situated in Southern Macedonia, municipality of Gevgelija Konti Hidroplast was founded in 1975 as a small plant for production of tools and elements of injection molded plastic.",
    "about.text3":
      "Following the successful start aided by the experience gained by successfully realized projects in Republic of Macedonia, today our company is export-oriented, and 95% of its products are exported in international markets.",
    "about.mission":
      "Our mission is to provide innovative and reliable pipe systems that meet the evolving needs of our customers worldwide.",
    "about.vision":
      "To be the leading manufacturer of PE and PP pipes in the region, known for quality, innovation, and environmental responsibility.",

    // Statistics
    "stats.years": "Years",
    "stats.products": "Products",
    "stats.projects": "Projects",
    "stats.employees": "Employees",
    "stats.turnover": "Turnover",

    // Products
    "products.title": "Products",
    "products.subtitle":
      "High-quality PE and PP pipe solutions for various applications",
    "products.waterSupply": "WATER SUPPLY SYSTEMS",
    "products.sewerage": "SEWERAGE SYSTEMS",
    "products.learnMore": "Learn More",
    "products.pe.title": "PE Pipes",
    "products.pe.description":
      "Polyethylene pipes for water supply, gas distribution, and industrial applications.",
    "products.pp.title": "PP Pipes",
    "products.pp.description":
      "Polypropylene pipes for chemical resistance and high-temperature applications.",
    "products.fittings.title": "Pipe Fittings",
    "products.fittings.description":
      "Complete range of fittings and accessories for all pipe systems.",
    "products.systems.title": "Complete Systems",
    "products.systems.description":
      "Engineered pipeline systems for complex industrial and municipal projects.",

    // News
    "news.title": "News",
    "news.subtitle":
      "Stay updated with our latest developments and industry insights",
    "news.readMore": "Read More",
    "news.viewAll": "View All News",
    "news.article1.title":
      "Innovations in Pipe Inspection and Maintenance Technologies",
    "news.article1.excerpt":
      "Latest advancements in pipeline maintenance technologies...",
    "news.article2.title":
      "Konti Hidroplast Donated €100,000 to Hospital in Gevgelija",
    "news.article2.excerpt":
      "Supporting our community with significant healthcare...",
    "news.article3.title": "EPD – Environmental Product Declaration",
    "news.article3.excerpt":
      "Our commitment to environmental transparency and...",

    // Testimonials
    "testimonials.petar.quote":
      "As your long-term partner, we are very happy to work with you and your company. Over the years, we have received very good service, great quality of products, fast and competent responses from Konti Hidroplast.All employees are responsive, competent and well-known in the products you produce. We always receive the right decision for choosing the right product. We highly recommend Konti Hidroplast to all our partners and customers.",
    "testimonials.petar.author": "Petar Ermenliev",
    "testimonials.petar.company": "Eurocom 2000",
    "testimonials.alex.quote":
      "Working with Konti Hidroplast has been a truly positive experience. Their professionalism, attention to detail, and commitment to delivering high-quality products & services consistently exceed our expectations. The team’s expertise and responsiveness make every project smooth and efficient, and their dedication to customer satisfaction is evident in everything they do. We truly value our partnership and highly recommend Konti Hidroplast to anyone seeking reliable products and solutions",
    "testimonials.alex.author": "Alex Negrescu",
    "testimonials.alex.company": "General Manager, Dematek Water Management",

    // Contact
    "contact.title": "Get in Touch: Connect with Us Today!",
    "contact.subtitle":
      "Ready to discuss your pipeline needs? We're here to help.",
    "contact.form.title": "Send us a Message",
    "contact.form.subtitle": "We'll get back to you within 24 hours",
    "contact.form.name": "Full Name *",
    "contact.form.name.placeholder": "Enter your full name",
    "contact.form.email": "Email Address *",
    "contact.form.email.placeholder": "your.email@company.com",
    "contact.form.phone": "Phone Number",
    "contact.form.phone.placeholder": "+389 XX XXX XXX",
    "contact.form.company": "Company",
    "contact.form.company.placeholder": "Your company name",
    "contact.form.message": "Message *",
    "contact.form.message.placeholder": "Tell us about your pipeline needs...",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.trust.secure": "Secure & Private",
    "contact.trust.response": "24h Response",
    "contact.trust.support": "Expert Support",
    "contact.validation.error": "Validation Error",
    "contact.validation.required": "Please fill in all required fields.",
    "contact.validation.email": "Invalid Email",
    "contact.validation.email.message": "Please enter a valid email address.",
    "contact.success.title": "Message Sent!",
    "contact.success.message":
      "Thank you for your message. We'll get back to you soon.",
    "contact.error.title": "Error",
    "contact.error.message": "Failed to send message. Please try again.",
    "contact.address": "Address",
    "contact.phone": "Phone",

    // Footer
    "footer.description":
      "Export-oriented Macedonian company for production of PE and PP pipes. Founded in 1975, we are committed to delivering unmatched European standards for pipeline precision.",
    "footer.quickLinks": "Quick Links",
    "footer.aboutUs": "About Us",
    "footer.products": "Products",
    "footer.news": "News",
    "footer.contact": "Contact",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.contactInfo": "Contact Info",
    "footer.address": "Industriska 6, 5480 Gevgelija, North Macedonia",
    "footer.copyright": "© 2025 Urban Rohr. All rights reserved.",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.readMore": "Read More",
    "common.learnMore": "Learn More",
    "common.viewAll": "View All",
    "common.backToTop": "Back to Top",
    "common.download": "Download",
    "common.apply": "Apply",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.previous": "Previous",
    "common.next": "Next",

    // About Us Page
    "aboutUs.title": "About Us",
    "aboutUs.heroTitle": "Our Story",
    "aboutUs.heroSubtitle":
      "Pioneering Excellence in Pipe Manufacturing Since 1975",
    "aboutUs.companyOverview": "Company Overview",
    "aboutUs.missionTitle": "Mission",
    "aboutUs.missionText":
      "Promoting new technologies while adhering to stringent EU standards. With certified quality and competitive pricing, we embrace regulations and ecological responsibility.",
    "aboutUs.visionTitle": "Vision",
    "aboutUs.visionText":
      "A modern factory, a leader in the region for development and production of plastic products for infrastructure buildings, within the frames of an environmentally safe system with maximum safety for all stakeholders.",
    "aboutUs.valuesTitle": "Values",
    "aboutUs.valuesText":
      "At Konti Hidroplast, we're dedicated to leading the industry with top-quality, eco-friendly pipes while prioritizing environmental protection and employee safety.",
    "aboutUs.timelineTitle": "Our Journey",
    "aboutUs.leadership": "Leadership",
    "aboutUs.facilities": "Our Facilities",
    "aboutUs.gallery": "Gallery",
    "aboutUs.manufacturingExcellence": "Manufacturing Excellence",
    "aboutUs.isoCertified": "ISO Certified",
    "aboutUs.corporate2024": "Corporate 2024",
    "aboutUs.companyStoryText1":
      "Following the successful start aided by the experience gained by successfully realized projects in the Republic of North Macedonia, today our company is export-oriented, and 95% of its products are exported in international markets.",
    "aboutUs.companyStoryText2":
      "Besides the experience, our large range of products and top quality, by all internationally recognized standards, enabled us to get access to international markets. Our current production program covers all fields of application: pipes and hoses for water supply systems, sewage systems, PE and PP manholes, pipes for transporting gas and oil products, pipes and hoses for protection of telecommunication cables, drainage systems and fittings for all dimensions, which also range from a minimum diameter of 12mm up to 2000mm.",
    "aboutUs.companyStoryText3":
      "Konti Hidroplast became known to the market through quality supply and constant application of flexibility in operation, which is very important in an industry where the complexity of managing all processes is quite high.",
    "aboutUs.companyStoryText4":
      "One of the key factors for sustainability despite tough competition is constant reinvestment in innovative technologies and pursuing general technological progress. The combination of all these key factors are contributing for Konti Hidroplast to play an important role in the domestic and foreign markets with the constant presence of all major and minor infrastructure projects.",

    // Products Pages
    "productsPage.title": "Our Products",
    "productsPage.subtitle": "Comprehensive Pipeline Solutions",
    "productsPage.waterSupply": "Water Supply Systems",
    "productsPage.sewerageTitle": "Sewerage Systems",
    "productsPage.gasTitle": "Gas Pipeline Systems",
    "productsPage.cableTitle": "Cable Protection",
    "productsPage.specifications": "Technical Specifications",
    "productsPage.applications": "Applications",
    "productsPage.features": "Key Features",
    "productsPage.benefits": "Benefits",

    // Water Supply Systems
    "waterSupply.title": "Water Supply Systems",
    "waterSupply.subtitle": "Reliable PE Pipes for Water Distribution",
    "waterSupply.description":
      "High-quality polyethylene pipes designed for potable water distribution and municipal water systems.",

    // Gas Pipeline Systems
    "gasPipeline.title": "Gas Pipeline Systems",
    "gasPipeline.subtitle": "Safe and Durable Gas Distribution Solutions",
    "gasPipeline.description":
      "Specialized PE pipes for natural gas distribution with enhanced safety features.",

    // Cable Protection
    "cableProtection.title": "Cable Protection Systems",
    "cableProtection.subtitle": "Protecting Critical Infrastructure",
    "cableProtection.description":
      "Robust conduit systems for telecommunications and electrical cable protection.",

    // Konti Kan Products
    "kontiKan.pipes.title": "HDPE Konti Kan OD",
    "kontiKan.pipes.subtitle": "High-Density Polyethylene Pipes",
    "kontiKan.drainage.title": "Konti Kan Drainage",
    "kontiKan.drainage.subtitle": "Advanced Drainage Solutions",
    "kontiKan.spiral.title": "Konti Kan Spiral HDPE/ID",
    "kontiKan.spiral.subtitle": "Large Diameter Spiral Pipes",

    // PP HM Products
    "ppHm.pipes.title": "PPHM Konti Kan ID",
    "ppHm.pipes.subtitle": "Polypropylene High Modulus Pipes",
    "ppHm.smooth.title": "PP ML Compact Pipe OD",
    "ppHm.smooth.subtitle": "Smooth Exterior Polypropylene Pipes",

    // Manholes
    "manholes.title": "Manholes",
    "manholes.subtitle": "Complete Manhole Systems",
    "manholes.description":
      "Comprehensive manhole solutions for sewerage and utility access.",

    // News Page
    "newsPage.title": "Latest News",
    "newsPage.subtitle": "Industry Updates and Company News",
    "newsPage.noNews": "No news articles available",
    "newsPage.loadMore": "Load More Articles",
    "newsPage.backToNews": "Back to News",
    "newsPage.noContent.line1":
      "This article is currently being updated with more detailed content.",
    "newsPage.noContent.line2": "Please check back soon for the full article.",

    // Certificates Page
    "certificates.title": "Certificates & Standards",
    "certificates.subtitle": "Quality Assurance and Compliance",
    "certificates.quality": "Quality Management",
    "certificates.environmental": "Environmental Standards",
    "certificates.safety": "Safety Certifications",
    "certificates.product": "Product Certifications",

    // Brochures Page
    "brochures.title": "Product Brochures",
    "brochures.subtitle": "Technical Documentation and Product Information",
    "brochures.downloadPdf": "Download PDF",
    "brochures.viewDetails": "View Details",

    // Career Page
    "career.title": "Career Opportunities",
    "career.subtitle": "Join Our Growing Team",
    "career.description":
      "Be part of our mission to deliver excellence in pipe manufacturing.",
    "career.openPositions": "Open Positions",
    "career.noPositions": "No open positions available",
    "career.applicationForm": "Application Form",
    "career.personalInfo": "Personal Information",
    "career.firstName": "First Name",
    "career.lastName": "Last Name",
    "career.email": "Email",
    "career.phone": "Phone Number",
    "career.position": "Position Applied For",
    "career.resume": "Upload Resume",
    "career.coverLetter": "Cover Letter",
    "career.submitApplication": "Submit Application",

    // Gallery Pages
    "gallery.title": "Gallery",
    "gallery.production": "Production",
    "gallery.qualityControl": "Quality Control",
    "gallery.storage": "Storage",
    "gallery.projects": "Projects",
    "gallery.facilities": "Our Facilities",
    "gallery.viewImage": "View Image",
    "gallery.closeImage": "Close Image",

    // Admin Panel
    "admin.title": "Admin Panel",
    "admin.dashboard": "Dashboard",
    "admin.overview": "Overview",
    "admin.logout": "Logout",
    "admin.welcome": "Welcome to Admin Panel",
    "admin.statistics": "Statistics",
    "admin.quickActions": "Quick Actions",
    "admin.systemInfo": "System Information",

    // Admin Navigation
    "admin.content": "Content Management",
    "admin.news": "News Management",
    "admin.products": "Products",
    "admin.gallery": "Gallery",
    "admin.certificates": "Certificates",
    "admin.teams": "Team Members",
    "admin.positions": "Positions",
    "admin.brochures": "Brochures",
    "admin.documents": "Documents",
    "admin.media": "Media Management",
    "admin.company": "Company Info",
    "admin.communications": "Communications",
    "admin.contacts": "Contact Messages",
    "admin.applications": "Job Applications",
    "admin.settings": "Settings",
    "admin.config": "Configuration",

    // Admin Actions
    "admin.add": "Add New",
    "admin.edit": "Edit",
    "admin.delete": "Delete",
    "admin.save": "Save",
    "admin.cancel": "Cancel",
    "admin.update": "Update",
    "admin.create": "Create",
    "admin.view": "View",
    "admin.manage": "Manage",
    "admin.upload": "Upload",
    "admin.download": "Download",
    "admin.export": "Export",
    "admin.import": "Import",
    "admin.search": "Search",
    "admin.filter": "Filter",
    "admin.sort": "Sort",
    "admin.refresh": "Refresh",
    "admin.back": "Back",
    "admin.close": "Close",
    "admin.confirm": "Confirm",
    "admin.yes": "Yes",
    "admin.no": "No",

    // Admin Messages
    "admin.loading": "Loading...",
    "admin.saving": "Saving...",
    "admin.saved": "Saved successfully",
    "admin.error": "An error occurred",
    "admin.success": "Operation completed successfully",
    "admin.warning": "Warning",
    "admin.confirm.delete": "Are you sure you want to delete this item?",
    "admin.noData": "No data available",
    "admin.selectFile": "Select file",
    "admin.dragDropFile": "Drag and drop file here or click to select",
    "admin.fileUploaded": "File uploaded successfully",
    "admin.fileUploadError": "Error uploading file",

    // Admin Forms
    "admin.form.title": "Title",
    "admin.form.description": "Description",
    "admin.form.content": "Content",
    "admin.form.image": "Image",
    "admin.form.date": "Date",
    "admin.form.author": "Author",
    "admin.form.status": "Status",
    "admin.form.category": "Category",
    "admin.form.tags": "Tags",
    "admin.form.url": "URL",
    "admin.form.name": "Name",
    "admin.form.email": "Email",
    "admin.form.phone": "Phone",
    "admin.form.company": "Company",
    "admin.form.position": "Position",
    "admin.form.message": "Message",
    "admin.form.required": "Required field",
    "admin.form.optional": "Optional",
    "admin.form.placeholder.title": "Enter title...",
    "admin.form.placeholder.description": "Enter description...",
    "admin.form.placeholder.content": "Enter content...",
    "admin.form.placeholder.name": "Enter name...",
    "admin.form.placeholder.email": "Enter email...",
    "admin.form.placeholder.search": "Type to search...",

    // Admin Tables
    "admin.table.actions": "Actions",
    "admin.table.createdAt": "Created",
    "admin.table.updatedAt": "Updated",
    "admin.table.status": "Status",
    "admin.table.noResults": "No results found",
    "admin.table.showing": "Showing",
    "admin.table.of": "of",
    "admin.table.entries": "entries",
    "admin.table.previous": "Previous",
    "admin.table.next": "Next",

    // News Management
    "admin.news.title": "News Management",
    "admin.news.addArticle": "Add New Article",
    "admin.news.editArticle": "Edit Article",
    "admin.news.articles": "Articles",
    "admin.news.published": "Published",
    "admin.news.draft": "Draft",
    "admin.news.sections": "Article Sections",
    "admin.news.addSection": "Add Section",
    "admin.news.sectionType": "Section Type",
    "admin.news.textOnly": "Text Only",
    "admin.news.imageOnly": "Image Only",
    "admin.news.textWithImage": "Text with Image",
    "admin.news.imagePosition": "Image Position",
    "admin.news.left": "Left",
    "admin.news.right": "Right",

    // Gallery Management
    "admin.gallery.title": "Gallery Management",
    "admin.gallery.categories": "Gallery Categories",
    "admin.gallery.items": "Gallery Items",
    "admin.gallery.addCategory": "Add Category",
    "admin.gallery.addItem": "Add Item",
    "admin.gallery.selectCategory": "Select Category",

    // Certificate Management
    "admin.certificates.title": "Certificate Management",
    "admin.certificates.categories": "Certificate Categories",
    "admin.certificates.subcategories": "Subcategories",
    "admin.certificates.addCertificate": "Add Certificate",
    "admin.certificates.uploadPdf": "Upload PDF",

    // Team Management
    "admin.teams.title": "Team Management",
    "admin.teams.members": "Team Members",
    "admin.teams.addMember": "Add Team Member",
    "admin.teams.editMember": "Edit Team Member",
    "admin.teams.firstName": "First Name",
    "admin.teams.lastName": "Last Name",
    "admin.teams.role": "Role",
    "admin.teams.department": "Department",
    "admin.teams.bio": "Biography",
    "admin.teams.photo": "Photo",

    // Brochures Management
    "admin.brochures.title": "Brochures Management",
    "admin.brochures.categories": "Brochure Categories",
    "admin.brochures.addBrochure": "Add Brochure",
    "admin.brochures.uploadFile": "Upload File",
    "admin.brochures.language": "Language",

    // Contact Messages
    "admin.contacts.title": "Contact Messages",
    "admin.contacts.unread": "Unread",
    "admin.contacts.read": "Read",
    "admin.contacts.markAsRead": "Mark as Read",
    "admin.contacts.reply": "Reply",
    "admin.contacts.subject": "Subject",
    "admin.contacts.from": "From",
    "admin.contacts.sentAt": "Sent At",

    // Job Applications
    "admin.applications.title": "Job Applications",
    "admin.applications.applicant": "Applicant",
    "admin.applications.appliedFor": "Applied For",
    "admin.applications.appliedAt": "Applied At",
    "admin.applications.resume": "Resume",
    "admin.applications.coverLetter": "Cover Letter",
    "admin.applications.review": "Review",
    "admin.applications.accept": "Accept",
    "admin.applications.reject": "Reject",

    // System Settings
    "admin.settings.title": "System Settings",
    "admin.settings.general": "General Settings",
    "admin.settings.email": "Email Configuration",
    "admin.settings.backup": "Backup & Restore",
    "admin.settings.users": "User Management",
    "admin.settings.permissions": "Permissions",
    "admin.settings.maintenance": "Maintenance Mode",
    "admin.settings.logs": "System Logs",
  },
  mk: {
    // Navigation
    "nav.home": "Почетна",
    "nav.about": "За нас",
    "nav.products": "Производи",
    "nav.downloads": "Преземања",
    "nav.news": "Вести",
    "nav.contact": "Контакт",
    "nav.certifications": "Сертификати",
    "nav.technical": "Техничка документација",
    "nav.brochures": "Брошури за производи",
    "nav.products.all": "Сите производи",
    "nav.products.waterSupply": "Системи за водоснабдување",
    "nav.products.sewerage": "Канализациски системи",
    "nav.products.hdpeKontiKan": "HDPE Конти Кан ОД",
    "nav.products.pphmKontiKan": "PPHM Конти Кан ИД",
    "nav.products.spiralKontiKan": "Конти кан спирални HDPE/ID",
    "nav.products.ppMlCompact": "ПП МЛ компактни цевки ОД",
    "nav.products.manholes": "Шахти",
    "nav.products.drainage": "Конти Кан дренажа",
    "nav.products.gasPipeline": "Систем за гасоводи",
    "nav.products.cableProtection": "Заштита на кабли",
    "nav.downloads.brochures": "Брошури",
    "nav.downloads.certificates": "Сертификати",
    "nav.contact.career": "Кариера",

    // Hero Section
    "hero.title.line1": "Непревзойдени европски",
    "hero.title.line2": "стандарди",
    "hero.title.line3": "за прецизност на цевководи",
    "hero.banner.title": "ВИСОКО-КВАЛИТЕТНИ ЦЕВКИ",
    "hero.banner.subtitle": "ДВИЖЕЈЌИ НАПРЕДОК СО ИНОВАЦИИ",

    // About Section
    "about.title": "За нас",
    "about.description":
      "Извозно-ориентирана македонска компанија за производство на ПЕ и ПП цевки од 1975 година. Посветени сме на испорака на најквалитетни решенија за цевководи со европски стандарди.",
    "about.text1":
      "Конти Хидропласт е извозно-ориентирана македонска компанија за производство на ПЕ (полиетилен) и ПП (полипропилен) цевки.",
    "about.text2":
      "Лоцирана во Јужна Македонија, општина Гевгелија, Конти Хидропласт беше основана во 1975 година како мала фабрика за производство на алати и елементи од инјекциски обликувана пластика.",
    "about.text3":
      "По успешниот почеток потпомогнат од искуството стекнато со успешно реализирани проекти во Република Македонија, денес нашата компанија е извозно-ориентирана, и 95% од нејзините производи се извезуваат на меѓународните пазари.",
    "about.mission":
      "Нашата мисија е да обезбедиме иновативни и сигурни системи за цевки кои ги задоволуваат развојните потреби на нашите клиенти ширум светот.",
    "about.vision":
      "Да бидеме водечки производител на ПЕ и ПП цевки во регионот, познати по квалитет, иновации и еколошка одговорност.",

    // Statistics
    "stats.years": "Години",
    "stats.products": "Производи",
    "stats.projects": "Проекти",
    "stats.employees": "Вработени",
    "stats.turnover": "Промет",

    // Products
    "products.title": "Производи",
    "products.subtitle":
      "Високо-квалитетни ПЕ и ПП решенија за цевки за различни примени",
    "products.waterSupply": "СИСТЕМИ ЗА ВОДОСНАБДУВАЊЕ",
    "products.sewerage": "КАНАЛИЗАЦИСКИ СИСТЕМИ",
    "products.learnMore": "Дознај повеќе",
    "products.pe.title": "ПЕ цевки",
    "products.pe.description":
      "Полиетиленски цевки за водоснабдување, дистрибуција на гас и индустриски примени.",
    "products.pp.title": "ПП цевки",
    "products.pp.description":
      "Полипропиленски цевки за хемиска отпорност и високо-температурни примени.",
    "products.fittings.title": "Фитинзи за цевки",
    "products.fittings.description":
      "Комплетен асортиман на фитинзи и додатоци за сите системи за цевки.",
    "products.systems.title": "Комплетни системи",
    "products.systems.description":
      "Инженерски системи за цевководи за сложени индустриски и општински проекти.",

    // News
    "news.title": "Вести",
    "news.subtitle":
      "Останете во тек со нашите најнови развојни активности и индустриски увиди",
    "news.readMore": "Прочитај повеќе",
    "news.viewAll": "Види ги сите вести",
    "news.article1.title":
      "Иновации во технологиите за инспекција и одржување на цевки",
    "news.article1.excerpt":
      "Најновите напредоци во технологиите за одржување на цевководи...",
    "news.article2.title":
      "Конти Хидропласт донираше €100.000 на болницата во Гевгелија",
    "news.article2.excerpt":
      "Поддршка на нашата заедница со значителна здравствена помош...",
    "news.article3.title": "EPD – Еколошка декларација за производ",
    "news.article3.excerpt":
      "Нашата посветеност кон еколошка транспарентност и...",

    // Testimonials
    "testimonials.petar.quote":
      "Како ваш долгорочен партнер, многу сме среќни да работиме со вас и вашата компанија. Низ годините, добивме многу добра услуга, одличен квалитет на производи, брзи и компетентни одговори од Конти Хидропласт. Сите вработени се одговорни, компетентни и добро познати во производите што ги произведувате.",
    "testimonials.petar.author": "Петар Ерменлиев",
    "testimonials.petar.company": "Еврокон 2000",
    "testimonials.alex.quote":
      "Работењето со Конти Хидропласт беше навистина позитивно искуство. Нивниот професионализам, внимание кон деталите и посветеноста во испораката на висококвалитетни производи и услуги постојано ги надминуваат нашите очекувања. Експертизата на тимот и одговорноста го прават секој проект мирен и ефикасен.",
    "testimonials.alex.author": "Алекс Негреску",
    "testimonials.alex.company":
      "Генерален менаџер, Дематек управување со води",

    // Contact
    "contact.title": "Стапете во контакт: Поврзете се со нас денес!",
    "contact.subtitle":
      "Подготвени сте да разговарате за вашите потреби за цевководи? Ние сме тука да помогнеме.",
    "contact.form.title": "Испратете ни порака",
    "contact.form.subtitle": "Ќе ви одговориме во рок од 24 часа",
    "contact.form.name": "Цело име *",
    "contact.form.name.placeholder": "Внесете го вашето цело име",
    "contact.form.email": "Е-пошта адреса *",
    "contact.form.email.placeholder": "vashe.ime@kompanija.com",
    "contact.form.phone": "Телефонски број",
    "contact.form.phone.placeholder": "+389 XX XXX XXX",
    "contact.form.company": "Компанија",
    "contact.form.company.placeholder": "Името на вашата компанија",
    "contact.form.message": "Порака *",
    "contact.form.message.placeholder":
      "Кажете ни за вашите потреби за цевководи...",
    "contact.form.send": "Испрати порака",
    "contact.form.sending": "Се испраќа...",
    "contact.trust.secure": "Безбедно и приватно",
    "contact.trust.response": "Одговор за 24ч",
    "contact.trust.support": "Експертска поддршка",
    "contact.validation.error": "Грешка во валидација",
    "contact.validation.required":
      "Ве молиме пополнете ги сите задолжителни полиња.",
    "contact.validation.email": "Невалидна е-пошта",
    "contact.validation.email.message":
      "Ве молиме внесете валидна е-пошта адреса.",
    "contact.success.title": "Пораката n� испратена!",
    "contact.success.message":
      "Ви благодариме за вашата порака. Наскоро ќе ви одговориме.",
    "contact.error.title": "Грешка",
    "contact.error.message":
      "Неуспешно испраќање на пораката. Ве молиме обидете се повторно.",
    "contact.address": "Адреса",
    "contact.phone": "Телефон",

    // Footer
    "footer.description":
      "Извозно-ориентирана македонска компанија за производство на ПЕ и ПП цевки. Основана во 1975 година, посветени сме на испорака на непревземени европски стандарди за прецизност на цевководи.",
    "footer.quickLinks": "Брзи врски",
    "footer.aboutUs": "За нас",
    "footer.products": "Производи",
    "footer.news": "Вести",
    "footer.contact": "Контакт",
    "footer.privacyPolicy": "Политика за приватност",
    "footer.contactInfo": "Контакт информации",
    "footer.address": "Индустриска 6, 5480 Гевгелија, Северна Македонија",
    "footer.copyright": "© 2025 Урбан Рор. Сите права се задржани.",

    // Common
    "common.loading": "Се вчитува...",
    "common.error": "Настана грешка",
    "common.success": "Успешно",
    "common.readMore": "Прочитај повеќе",
    "common.learnMore": "Дознај повеќе",
    "common.viewAll": "Види сé",
    "common.backToTop": "Назад на врв",
    "common.download": "Преземи",
    "common.apply": "Аплицирај",
    "common.submit": "Поднеси",
    "common.cancel": "Откажи",
    "common.close": "Затвори",
    "common.search": "Барај",
    "common.filter": "Филтрирај",
    "common.sort": "Сортирај",
    "common.previous": "Претходна",
    "common.next": "Следна",

    // About Us Page
    "aboutUs.title": "За нас",
    "aboutUs.heroTitle": "Нашата приказна",
    "aboutUs.heroSubtitle":
      "Пионери во извонредност во производство на цевки од 1975 година",
    "aboutUs.companyOverview": "Преглед на компанијата",
    "aboutUs.missionTitle": "Мисија",
    "aboutUs.missionText":
      "Промовирање на нови технологии додека се придржуваме до строги ЕУ стандарди. Со сертифициран квалитет и конкурентни цени, ги прифаќаме регулативите и еколошката одговорност.",
    "aboutUs.visionTitle": "Визија",
    "aboutUs.visionText":
      "Модерна фабрика, лидер во регионот за развој и производство на пластични производи за инфраструктурни објекти, во рамките на еколошки безбеден систем со максимална безбедност за сите заинтересирани страни.",
    "aboutUs.valuesTitle": "Вредности",
    "aboutUs.valuesText":
      "Во Конти Хидропласт, посветени сме на водење на индустријата со врвен квалитет, еколошки цевки додека даваме приоритет на заштитата на животната средина и безбедноста на вработените.",
    "aboutUs.timelineTitle": "Нашето патување",
    "aboutUs.leadership": "Раководство",
    "aboutUs.facilities": "Нашите објекти",
    "aboutUs.gallery": "Галерија",
    "aboutUs.manufacturingExcellence": "Производна извонредност",
    "aboutUs.isoCertified": "ИСО сертифицирано",
    "aboutUs.corporate2024": "Корпоративно 2024",
    "aboutUs.companyStoryText1":
      "По успешниот почеток потпомогнат од искуството стекнато со успешно реализирани проекти во Република Северна Македонија, денес нашата компанија е извозно-ориентирана, и 95% од нејзините производи се извезуваат на меѓународните пазари.",
    "aboutUs.companyStoryText2":
      "Покрај искуството, нашиот голем асортиман на производи и врвен квалитет, според сите меѓународно признати стандарди, ни овозможи да добиеме пристап до меѓународните пазари. Нашата моментална производна програма ги покрива сите области на примена: цевки и црева за водоводни системи, канализациони системи, ПЕ и ПП шахти, цевки за транспорт на гас и нафтени деривати, цевки и црева за заштита на телекомуникациски кабли, дренажни системи и фитинзи за сите димензии, кои исто така варираат од минимален дијаметар од 12мм до 2000мм.",
    "aboutUs.companyStoryText3":
      "Конти Хидропласт стана познат на пазарот преку квалитетна снабденост и постојана примена на флексибилност во работењето, што е многу важно во индустрија каде што сложеноста на управување со сите процеси е прилично висока.",
    "aboutUs.companyStoryText4":
      "Еден од клучните фактори за одржливост и покрај жестоката конкуренција е постојаното реинвестирање во иновативни технологии и следење на општиот технолошки напредок. Комбинацијата на сите овие клучни фактори придонесуваат Конти Хидропласт да игра важна улога на домашните и странските пазари со постојаното присуство на сите големи и мали инфраструктурни проекти.",

    // Products Pages
    "productsPage.title": "Наши производи",
    "productsPage.subtitle": "Сеопфатни решенија за цевководи",
    "productsPage.waterSupply": "Системи за водоснабдување",
    "productsPage.sewerageTitle": "Канализациски системи",
    "productsPage.gasTitle": "Системи за гасоводи",
    "productsPage.cableTitle": "Заштита на кабли",
    "productsPage.specifications": "Технички спецификации",
    "productsPage.applications": "Примени",
    "productsPage.features": "Клучни карактеристики",
    "productsPage.benefits": "Придобивки",

    // Water Supply Systems
    "waterSupply.title": "Системи за водоснабдување",
    "waterSupply.subtitle": "Сигурни ПЕ цевки за дистрибуција на вода",
    "waterSupply.description":
      "Високо-квалитетни полиетиленски цевки дизајнирани за дистрибуција на питка вода и општински водни системи.",

    // Gas Pipeline Systems
    "gasPipeline.title": "Системи за гасоводи",
    "gasPipeline.subtitle": "Сигурни и трајни решенија за дистрибуција на гас",
    "gasPipeline.description":
      "Специјализирани ПЕ цевки за дистрибуција на природен гас со подобрени безбедносни карактеристики.",

    // Cable Protection
    "cableProtection.title": "Системи за заштита на кабли",
    "cableProtection.subtitle": "Заштитување на критичната инфраструктура",
    "cableProtection.description":
      "Робусни кондуит системи за заштита на телекомуникациски и електрични кабли.",

    // Konti Kan Products
    "kontiKan.pipes.title": "HDPE Конти Кан ОД",
    "kontiKan.pipes.subtitle": "Полиетиленски цевки со висока густина",
    "kontiKan.drainage.title": "Конти Кан дренажа",
    "kontiKan.drainage.subtitle": "Напредни дренажни решенија",
    "kontiKan.spiral.title": "Конти Кан спирални HDPE/ID",
    "kontiKan.spiral.subtitle": "Спирални цевки со голем дијаметар",

    // PP HM Products
    "ppHm.pipes.title": "PPHM Конти Кан ИД",
    "ppHm.pipes.subtitle": "Полипропиленски цевки со висок модул",
    "ppHm.smooth.title": "ПП МЛ компактни цевки ОД",
    "ppHm.smooth.subtitle": "Полипропиленски цевки со мазна надворешност",

    // Manholes
    "manholes.title": "Шахти",
    "manholes.subtitle": "Комплетни шахтни системи",
    "manholes.description":
      "Сеопфатни шахтни решенија за канализација и пристап до комунални услуги.",

    // News Page
    "newsPage.title": "Најнови вести",
    "newsPage.subtitle": "Индустриски ажурирања и компаниски вести",
    "newsPage.noNews": "Нема достапни вести",
    "newsPage.loadMore": "Вчитај повеќе статии",
    "newsPage.backToNews": "Назад кон вести",
    "newsPage.noContent.line1":
      "Оваа статија моментално се ажурира со детални содржини.",
    "newsPage.noContent.line2":
      "Ве молиме повторно проверете наскоро за целосната статија.",

    // Certificates Page
    "certificates.title": "Сертификати и стандарди",
    "certificates.subtitle": "Осигурување на квалитет и усогласеност",
    "certificates.quality": "Управување со квалитет",
    "certificates.environmental": "Еколошки стандарди",
    "certificates.safety": "Безбедносни сертификати",
    "certificates.product": "Сертификати за производи",

    // Brochures Page
    "brochures.title": "Брошури за производи",
    "brochures.subtitle": "Техничка документација и информации за производи",
    "brochures.downloadPdf": "Преземи PDF",
    "brochures.viewDetails": "Види детали",

    // Career Page
    "career.title": "Можности за кариера",
    "career.subtitle": "Придружи се на нашиот растечки тим",
    "career.description":
      "Биди дел од нашата мисија за испорака на извонредност во производството на цевки.",
    "career.openPositions": "Отворени позиции",
    "career.noPositions": "Нема достапни отворени позиции",
    "career.applicationForm": "Формулар за апликација",
    "career.personalInfo": "Лични информации",
    "career.firstName": "Име",
    "career.lastName": "Презиме",
    "career.email": "Е-пошта",
    "career.phone": "Телефонски број",
    "career.position": "Позиција за која аплицираш",
    "career.resume": "Прикачи биографија",
    "career.coverLetter": "Мотивационо писмо",
    "career.submitApplication": "Поднеси апликација",

    // Gallery Pages
    "gallery.title": "Галерија",
    "gallery.production": "Производство",
    "gallery.qualityControl": "Контрола на квалитет",
    "gallery.storage": "Складирање",
    "gallery.projects": "Проекти",
    "gallery.facilities": "Нашите објекти",
    "gallery.viewImage": "Види слика",
    "gallery.closeImage": "Затвори слика",

    // Admin Panel
    "admin.title": "Админ панел",
    "admin.dashboard": "Контролна табла",
    "admin.overview": "Преглед",
    "admin.logout": "Одјави се",
    "admin.welcome": "Добредојдовте во админ панелот",
    "admin.statistics": "Статистики",
    "admin.quickActions": "Брзи акции",
    "admin.systemInfo": "Системски информации",

    // Admin Navigation
    "admin.content": "Управување со содржина",
    "admin.news": "Управување со вести",
    "admin.products": "Производи",
    "admin.gallery": "Галерија",
    "admin.certificates": "Сертификати",
    "admin.teams": "Членови на тимот",
    "admin.positions": "Позиции",
    "admin.brochures": "Брошури",
    "admin.documents": "Документи",
    "admin.media": "Управување со медиуми",
    "admin.company": "Информации за компанијата",
    "admin.communications": "Комуникации",
    "admin.contacts": "Контакт пораки",
    "admin.applications": "Апликации за работа",
    "admin.settings": "Поставки",
    "admin.config": "Конфигурација",

    // Admin Actions
    "admin.add": "Додај ново",
    "admin.edit": "Уреди",
    "admin.delete": "Избриши",
    "admin.save": "Зачувај",
    "admin.cancel": "Откажи",
    "admin.update": "Ажурирај",
    "admin.create": "Создај",
    "admin.view": "Погледни",
    "admin.manage": "Управувај",
    "admin.upload": "Прикачи",
    "admin.download": "Преземи",
    "admin.export": "Извези",
    "admin.import": "Увези",
    "admin.search": "Барај",
    "admin.filter": "Филтрирај",
    "admin.sort": "Сортирај",
    "admin.refresh": "Освежи",
    "admin.back": "Назад",
    "admin.close": "Затвори",
    "admin.confirm": "Потврди",
    "admin.yes": "Да",
    "admin.no": "Не",

    // Admin Messages
    "admin.loading": "Се вчитува...",
    "admin.saving": "Се зачувува...",
    "admin.saved": "Успешно зачувано",
    "admin.error": "Се случи грешка",
    "admin.success": "Операцијата е успешно завршена",
    "admin.warning": "Предупредување",
    "admin.confirm.delete":
      "Дали сте сигурни дека сакате да го избришете овој елемент?",
    "admin.noData": "Нема достапни податоци",
    "admin.selectFile": "Изберете датотека",
    "admin.dragDropFile":
      "Повлечете и спуштете датотека овде или кликнете за избор",
    "admin.fileUploaded": "Датотеката е успешно прикачена",
    "admin.fileUploadError": "Грешка при прикачување на датотеката",

    // Admin Forms
    "admin.form.title": "Наслов",
    "admin.form.description": "Опис",
    "admin.form.content": "Содржина",
    "admin.form.image": "Слика",
    "admin.form.date": "Датум",
    "admin.form.author": "Автор",
    "admin.form.status": "Статус",
    "admin.form.category": "Категорија",
    "admin.form.tags": "Ознаки",
    "admin.form.url": "URL",
    "admin.form.name": "Име",
    "admin.form.email": "Е-пошта",
    "admin.form.phone": "Телефон",
    "admin.form.company": "Компанија",
    "admin.form.position": "Позиција",
    "admin.form.message": "Порака",
    "admin.form.required": "Задолжително поле",
    "admin.form.optional": "Опционално",
    "admin.form.placeholder.title": "Внесете наслов...",
    "admin.form.placeholder.description": "Внесете опис...",
    "admin.form.placeholder.content": "Внесете содржина...",
    "admin.form.placeholder.name": "Внесете име...",
    "admin.form.placeholder.email": "Внесете е-пошта...",
    "admin.form.placeholder.search": "Напишете за барање...",

    // Admin Tables
    "admin.table.actions": "Акции",
    "admin.table.createdAt": "Создадено",
    "admin.table.updatedAt": "Ажурирано",
    "admin.table.status": "Статус",
    "admin.table.noResults": "Нема резултати",
    "admin.table.showing": "Приказува",
    "admin.table.of": "од",
    "admin.table.entries": "записи",
    "admin.table.previous": "Претходна",
    "admin.table.next": "Следна",

    // News Management
    "admin.news.title": "Управување со вести",
    "admin.news.addArticle": "Додај нова статија",
    "admin.news.editArticle": "Уреди статија",
    "admin.news.articles": "Статии",
    "admin.news.published": "Објавено",
    "admin.news.draft": "Нацрт",
    "admin.news.sections": "Секции на статијата",
    "admin.news.addSection": "Додај секција",
    "admin.news.sectionType": "Тип на секција",
    "admin.news.textOnly": "Само текст",
    "admin.news.imageOnly": "Само слика",
    "admin.news.textWithImage": "Текст со слика",
    "admin.news.imagePosition": "Позиција на сликата",
    "admin.news.left": "Лево",
    "admin.news.right": "Десно",

    // Gallery Management
    "admin.gallery.title": "Управување со галерија",
    "admin.gallery.categories": "Категории на галерија",
    "admin.gallery.items": "Елементи на галерија",
    "admin.gallery.addCategory": "Додај категорија",
    "admin.gallery.addItem": "Додај елемент",
    "admin.gallery.selectCategory": "Изберете категорија",

    // Certificate Management
    "admin.certificates.title": "Управување со сертификати",
    "admin.certificates.categories": "Категории на сертификати",
    "admin.certificates.subcategories": "Поткатегории",
    "admin.certificates.addCertificate": "Додај сертификат",
    "admin.certificates.uploadPdf": "Прикачи PDF",

    // Team Management
    "admin.teams.title": "Управување со тим",
    "admin.teams.members": "Членови на тимот",
    "admin.teams.addMember": "Додај член на тимот",
    "admin.teams.editMember": "Уреди член на тимот",
    "admin.teams.firstName": "Име",
    "admin.teams.lastName": "Презиме",
    "admin.teams.role": "Улога",
    "admin.teams.department": "Оддел",
    "admin.teams.bio": "Биографија",
    "admin.teams.photo": "Фотографија",

    // Brochures Management
    "admin.brochures.title": "Управување со брошури",
    "admin.brochures.categories": "Категории на брошури",
    "admin.brochures.addBrochure": "Додај брошура",
    "admin.brochures.uploadFile": "Прикачи датотека",
    "admin.brochures.language": "Јазик",

    // Contact Messages
    "admin.contacts.title": "Контакт пораки",
    "admin.contacts.unread": "Непрочитани",
    "admin.contacts.read": "Прочитани",
    "admin.contacts.markAsRead": "Означи како прочитано",
    "admin.contacts.reply": "Одговори",
    "admin.contacts.subject": "Предмет",
    "admin.contacts.from": "Од",
    "admin.contacts.sentAt": "Испратено на",

    // Job Applications
    "admin.applications.title": "Апликации за работа",
    "admin.applications.applicant": "Кандидат",
    "admin.applications.appliedFor": "Аплицирано за",
    "admin.applications.appliedAt": "Аплицирано на",
    "admin.applications.resume": "Биографија",
    "admin.applications.coverLetter": "Мотивационо писмо",
    "admin.applications.review": "Ревизија",
    "admin.applications.accept": "Прифати",
    "admin.applications.reject": "Отфрли",

    // System Settings
    "admin.settings.title": "Системски поставки",
    "admin.settings.general": "Општи поставки",
    "admin.settings.email": "Конфигурација на е-пошта",
    "admin.settings.backup": "Резервно копирање и враќање",
    "admin.settings.users": "Управување со корисници",
    "admin.settings.permissions": "Дозволи",
    "admin.settings.maintenance": "Режим на одржување",
    "admin.settings.logs": "Системски логови",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.about": "Über uns",
    "nav.products": "Produkte",
    "nav.downloads": "Downloads",
    "nav.news": "Nachrichten",
    "nav.contact": "Kontakt",
    "nav.certifications": "Zertifizierungen",
    "nav.technical": "Technische Dokumentation",
    "nav.brochures": "Produktbroschüren",
    "nav.products.all": "Alle Produkte",
    "nav.products.waterSupply": "Wasserversorgungssysteme",
    "nav.products.sewerage": "Abwassersysteme",
    "nav.products.hdpeKontiKan": "HDPE Konti Kan OD",
    "nav.products.pphmKontiKan": "PPHM Konti Kan ID",
    "nav.products.spiralKontiKan": "Konti kan spiral HDPE/ID",
    "nav.products.ppMlCompact": "PP ML Kompaktrohre OD",
    "nav.products.manholes": "Schächte",
    "nav.products.drainage": "Konti Kan Drainage",
    "nav.products.gasPipeline": "Gasleitungssystem",
    "nav.products.cableProtection": "Kabelschutz",
    "nav.downloads.brochures": "Broschüren",
    "nav.downloads.certificates": "Zertifikate",
    "nav.contact.career": "Karriere",

    // Hero Section
    "hero.title.line1": "Unvergleichliche europäische",
    "hero.title.line2": "Standards",
    "hero.title.line3": "für Rohrleitungspräzision",
    "hero.banner.title": "HOCHWERTIGE ROHRE",
    "hero.banner.subtitle": "FORTSCHRITT DURCH INNOVATION",

    // About Section
    "about.title": "Über uns",
    "about.description":
      "Exportorientiertes mazedonisches Unternehmen für die Herstellung von PE- und PP-Rohren seit 1975. Wir sind verpflichtet, höchste Qualität bei Rohrleitungslösungen mit europäischen Standards zu liefern.",
    "about.text1":
      "Konti Hidroplast ist ein exportorientiertes mazedonisches Unternehmen für die Herstellung von PE- (Polyethylen) und PP- (Polypropylen) Rohren.",
    "about.text2":
      "In Südmazedonien gelegen, Gemeinde Gevgelija, wurde Konti Hidroplast 1975 als kleine Fabrik für die Herstellung von Werkzeugen und Elementen aus spritzgegossenem Kunststoff gegründet.",
    "about.text3":
      "Nach dem erfolgreichen Start, unterstützt durch die Erfahrung aus erfolgreich realisierten Projekten in der Republik Mazedonien, ist unser Unternehmen heute exportorientiert und 95% seiner Produkte werden auf internationale Märkte exportiert.",
    "about.mission":
      "Unsere Mission ist es, innovative und zuverlässige Rohrsysteme bereitzustellen, die den sich entwickelnden Bedürfnissen unserer Kunden weltweit gerecht werden.",
    "about.vision":
      "Der führende Hersteller von PE- und PP-Rohren in der Region zu sein, bekannt für Qualität, Innovation und Umweltverantwortung.",

    // Statistics
    "stats.years": "Jahre",
    "stats.products": "Produkte",
    "stats.projects": "Projekte",
    "stats.employees": "Mitarbeiter",
    "stats.turnover": "Umsatz",

    // Products
    "products.title": "Produkte",
    "products.subtitle":
      "Hochwertige PE- und PP-Rohrlösungen für verschiedene Anwendungen",
    "products.waterSupply": "WASSERVERSORGUNGSSYSTEME",
    "products.sewerage": "ABWASSERSYSTEME",
    "products.learnMore": "Mehr erfahren",
    "products.pe.title": "PE-Rohre",
    "products.pe.description":
      "Polyethylen-Rohre für Wasserversorgung, Gasverteilung und industrielle Anwendungen.",
    "products.pp.title": "PP-Rohre",
    "products.pp.description":
      "Polypropylen-Rohre für chemische Beständigkeit und Hochtemperaturanwendungen.",
    "products.fittings.title": "Rohrfittings",
    "products.fittings.description":
      "Komplettes Sortiment an Fittings und Zubehör für alle Rohrsysteme.",
    "products.systems.title": "Komplette Systeme",
    "products.systems.description":
      "Entwickelte Rohrleitungssysteme für komplexe industrielle und kommunale Projekte.",

    // News
    "news.title": "Nachrichten",
    "news.subtitle":
      "Bleiben Sie über unsere neuesten Entwicklungen und Brancheneinblicke auf dem Laufenden",
    "news.readMore": "Mehr lesen",
    "news.viewAll": "Alle Nachrichten ansehen",
    "news.article1.title":
      "Innovationen in der Rohrinspektion und Wartungstechnologie",
    "news.article1.excerpt":
      "Neueste Fortschritte in der Pipeline-Wartungstechnologie...",
    "news.article2.title":
      "Konti Hidroplast spendete €100.000 an das Krankenhaus in Gevgelija",
    "news.article2.excerpt":
      "Unterstützung unserer Gemeinde mit erheblicher Gesundheitsversorgung...",
    "news.article3.title": "EPD – Umwelt-Produktdeklaration",
    "news.article3.excerpt": "Unser Engagement für Umwelttransparenz und...",

    // Testimonials
    "testimonials.petar.quote":
      "Als Ihr langfristiger Partner sind wir sehr glücklich, mit Ihnen und Ihrem Unternehmen zu arbeiten. Über die Jahre haben wir sehr guten Service, große Qualität der Produkte und schnelle, kompetente Antworten von Konti Hidroplast erhalten. Alle Mitarbeiter sind reaktionsschnell, kompetent und bekannt für die Produkte, die Sie herstellen.",
    "testimonials.petar.author": "Petar Ermenliev",
    "testimonials.petar.company": "Eurocom 2000",
    "testimonials.alex.quote":
      "Die Zusammenarbeit mit Konti Hidroplast war eine wirklich positive Erfahrung. Ihr Professionalität, Liebe zum Detail und Engagement für die Lieferung hochwertiger Produkte und Dienstleistungen übertreffen unsere Erwartungen kontinuierlich. Die Expertise und Reaktionsfähigkeit des Teams machen jedes Projekt reibungslos und effizient.",
    "testimonials.alex.author": "Alex Negrescu",
    "testimonials.alex.company": "General Manager, Dematek Wassermanagement",

    // Contact
    "contact.title": "In Kontakt kommen: Verbinden Sie sich heute mit uns!",
    "contact.subtitle":
      "Bereit, Ihre Pipeline-Bedürfnisse zu besprechen? Wir sind hier, um zu helfen.",
    "contact.form.title": "Senden Sie uns eine Nachricht",
    "contact.form.subtitle":
      "Wir melden uns innerhalb von 24 Stunden bei Ihnen",
    "contact.form.name": "Vollständiger Name *",
    "contact.form.name.placeholder": "Geben Sie Ihren vollständigen Namen ein",
    "contact.form.email": "E-Mail-Adresse *",
    "contact.form.email.placeholder": "ihre.email@unternehmen.com",
    "contact.form.phone": "Telefonnummer",
    "contact.form.phone.placeholder": "+389 XX XXX XXX",
    "contact.form.company": "Unternehmen",
    "contact.form.company.placeholder": "Ihr Unternehmensname",
    "contact.form.message": "Nachricht *",
    "contact.form.message.placeholder":
      "Erzählen Sie uns von Ihren Pipeline-Bedürfnissen...",
    "contact.form.send": "Nachricht senden",
    "contact.form.sending": "Wird gesendet...",
    "contact.trust.secure": "Sicher & Privat",
    "contact.trust.response": "24h Antwort",
    "contact.trust.support": "Expertenunterstützung",
    "contact.validation.error": "Validierungsfehler",
    "contact.validation.required": "Bitte füllen Sie alle Pflichtfelder aus.",
    "contact.validation.email": "Ungültige E-Mail",
    "contact.validation.email.message":
      "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    "contact.success.title": "Nachricht gesendet!",
    "contact.success.message":
      "Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.",
    "contact.error.title": "Fehler",
    "contact.error.message":
      "Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
    "contact.address": "Adresse",
    "contact.phone": "Telefon",

    // Footer
    "footer.description":
      "Exportorientiertes mazedonisches Unternehmen für die Herstellung von PE- und PP-Rohren. Gegründet 1975, sind wir verpflichtet, unübertroffene europäische Standards für Pipeline-Präzision zu liefern.",
    "footer.quickLinks": "Schnellzugriff",
    "footer.aboutUs": "Über uns",
    "footer.products": "Produkte",
    "footer.news": "Nachrichten",
    "footer.contact": "Kontakt",
    "footer.privacyPolicy": "Datenschutzrichtlinie",
    "footer.contactInfo": "Kontaktinformationen",
    "footer.address": "Industriska 6, 5480 Gevgelija, Nordmazedonien",
    "footer.copyright": "© 2025 Urban Rohr. Alle Rechte vorbehalten.",

    // Common
    "common.loading": "Laden...",
    "common.error": "Ein Fehler ist aufgetreten",
    "common.success": "Erfolgreich",
    "common.readMore": "Mehr lesen",
    "common.learnMore": "Mehr erfahren",
    "common.viewAll": "Alle anzeigen",
    "common.backToTop": "Nach oben",
    "common.download": "Herunterladen",
    "common.apply": "Bewerben",
    "common.submit": "Senden",
    "common.cancel": "Abbrechen",
    "common.close": "Schließen",
    "common.search": "Suchen",
    "common.filter": "Filtern",
    "common.sort": "Sortieren",
    "common.previous": "Vorherige",
    "common.next": "Nächste",

    // About Us Page
    "aboutUs.title": "Über uns",
    "aboutUs.heroTitle": "Unsere Geschichte",
    "aboutUs.heroSubtitle":
      "Pioniere der Exzellenz in der Rohrherstellung seit 1975",
    "aboutUs.companyOverview": "Unternehmensübersicht",
    "aboutUs.missionTitle": "Mission",
    "aboutUs.missionText":
      "Förderung neuer Technologien unter Einhaltung strenger EU-Standards. Mit zertifizierter Qualität und wettbewerbsfähigen Preisen übernehmen wir Vorschriften und ökologische Verantwortung.",
    "aboutUs.visionTitle": "Vision",
    "aboutUs.visionText":
      "Eine moderne Fabrik, ein Marktführer in der Region für die Entwicklung und Produktion von Kunststoffprodukten für Infrastrukturbauten, innerhalb eines umweltfreundlichen Systems mit maximaler Sicherheit für alle Beteiligten.",
    "aboutUs.valuesTitle": "Werte",
    "aboutUs.valuesText":
      "Bei Konti Hidroplast sind wir bestrebt, die Branche mit hochwertigen, umweltfreundlichen Rohren anzuführen und dabei Umweltschutz und Mitarbeitersicherheit zu priorisieren.",
    "aboutUs.timelineTitle": "Unsere Reise",
    "aboutUs.leadership": "Führung",
    "aboutUs.facilities": "Unsere Anlagen",
    "aboutUs.gallery": "Galerie",
    "aboutUs.manufacturingExcellence": "Herstellungsexzellenz",
    "aboutUs.isoCertified": "ISO-zertifiziert",
    "aboutUs.corporate2024": "Corporate 2024",
    "aboutUs.companyStoryText1":
      "Nach dem erfolgreichen Start, unterstützt durch die Erfahrung aus erfolgreich realisierten Projekten in der Republik Nordmazedonien, ist unser Unternehmen heute exportorientiert und 95% seiner Produkte werden auf internationale Märkte exportiert.",
    "aboutUs.companyStoryText2":
      "Neben der Erfahrung ermöglichten uns unsere große Produktpalette und Spitzenqualität nach allen international anerkannten Standards den Zugang zu internationalen Märkten. Unser aktuelles Produktionsprogramm deckt alle Anwendungsbereiche ab: Rohre und Schläuche für Wasserversorgungssysteme, Abwassersysteme, PE- und PP-Schächte, Rohre für den Transport von Gas- und Ölprodukten, Rohre und Schläuche zum Schutz von Telekommunikationskabeln, Entwässerungssysteme und Fittings für alle Dimensionen, die auch von einem Mindestdurchmesser von 12 mm bis 2000 mm reichen.",
    "aboutUs.companyStoryText3":
      "Konti Hidroplast wurde auf dem Markt durch qualitativ hochwertige Lieferungen und die ständige Anwendung von Flexibilität im Betrieb bekannt, was in einer Branche, in der die Komplexität der Verwaltung aller Prozesse recht hoch ist, sehr wichtig ist.",
    "aboutUs.companyStoryText4":
      "Einer der Schlüsselfaktoren für Nachhaltigkeit trotz harter Konkurrenz ist die kontinuierliche Reinvestition in innovative Technologien und das Verfolgen des allgemeinen technologischen Fortschritts. Die Kombination all dieser Schlüsselfaktoren trägt dazu bei, dass Konti Hidroplast eine wichtige Rolle auf den inländischen und ausländischen Märkten mit der ständigen Präsenz bei allen großen und kleinen Infrastrukturprojekten spielt.",

    // Products Pages
    "productsPage.title": "Unsere Produkte",
    "productsPage.subtitle": "Umfassende Rohrleitungslösungen",
    "productsPage.waterSupply": "Wasserversorgungssysteme",
    "productsPage.sewerageTitle": "Abwassersysteme",
    "productsPage.gasTitle": "Gasleitungssysteme",
    "productsPage.cableTitle": "Kabelschutz",
    "productsPage.specifications": "Technische Spezifikationen",
    "productsPage.applications": "Anwendungen",
    "productsPage.features": "Hauptmerkmale",
    "productsPage.benefits": "Vorteile",

    // Water Supply Systems
    "waterSupply.title": "Wasserversorgungssysteme",
    "waterSupply.subtitle": "Zuverlässige PE-Rohre für Wasserverteilung",
    "waterSupply.description":
      "Hochwertige Polyethylen-Rohre für Trinkwasserverteilung und kommunale Wassersysteme.",

    // Gas Pipeline Systems
    "gasPipeline.title": "Gasleitungssysteme",
    "gasPipeline.subtitle": "Sichere und langlebige Gasverteilungslösungen",
    "gasPipeline.description":
      "Spezialisierte PE-Rohre für Erdgasverteilung mit verbesserten Sicherheitsmerkmalen.",

    // Cable Protection
    "cableProtection.title": "Kabelschutzsysteme",
    "cableProtection.subtitle": "Schutz kritischer Infrastrukturen",
    "cableProtection.description":
      "Robuste Rohrsysteme für den Schutz von Telekommunikations- und Elektrokabeln.",

    // Konti Kan Products
    "kontiKan.pipes.title": "HDPE Konti Kan OD",
    "kontiKan.pipes.subtitle": "Hochdichte Polyethylen-Rohre",
    "kontiKan.drainage.title": "Konti Kan Drainage",
    "kontiKan.drainage.subtitle": "Fortschrittliche Entwässerungslösungen",
    "kontiKan.spiral.title": "Konti Kan Spiral HDPE/ID",
    "kontiKan.spiral.subtitle": "Spiralrohre mit großem Durchmesser",

    // PP HM Products
    "ppHm.pipes.title": "PPHM Konti Kan ID",
    "ppHm.pipes.subtitle": "Polypropylen-Rohre mit hohem Modul",
    "ppHm.smooth.title": "PP ML Kompaktrohre OD",
    "ppHm.smooth.subtitle": "Polypropylen-Rohre mit glatter Außenseite",

    // Manholes
    "manholes.title": "Schächte",
    "manholes.subtitle": "Komplette Schachtsysteme",
    "manholes.description":
      "Umfassende Schachtlösungen für Abwasser und Versorgungszugang.",

    // News Page
    "newsPage.title": "Aktuelle Nachrichten",
    "newsPage.subtitle": "Branchenupdates und Unternehmensnews",
    "newsPage.noNews": "Keine Nachrichtenartikel verfügbar",
    "newsPage.loadMore": "Weitere Artikel laden",
    "newsPage.backToNews": "Zurück zu den Nachrichten",
    "newsPage.noContent.line1":
      "Dieser Artikel wird derzeit mit detaillierteren Inhalten aktualisiert.",
    "newsPage.noContent.line2":
      "Bitte schauen Sie bald wieder vorbei für den vollständigen Artikel.",

    // Certificates Page
    "certificates.title": "Zertifikate & Standards",
    "certificates.subtitle": "Qualitätssicherung und Compliance",
    "certificates.quality": "Qualitätsmanagement",
    "certificates.environmental": "Umweltstandards",
    "certificates.safety": "Sicherheitszertifikate",
    "certificates.product": "Produktzertifikate",

    // Brochures Page
    "brochures.title": "Produktbroschüren",
    "brochures.subtitle": "Technische Dokumentation und Produktinformationen",
    "brochures.downloadPdf": "PDF herunterladen",
    "brochures.viewDetails": "Details anzeigen",

    // Career Page
    "career.title": "Karrieremöglichkeiten",
    "career.subtitle": "Werden Sie Teil unseres wachsenden Teams",
    "career.description":
      "Seien Sie Teil unserer Mission, Exzellenz in der Rohrherstellung zu liefern.",
    "career.openPositions": "Offene Stellen",
    "career.noPositions": "Keine offenen Stellen verfügbar",
    "career.applicationForm": "Bewerbungsformular",
    "career.personalInfo": "Persönliche Informationen",
    "career.firstName": "Vorname",
    "career.lastName": "Nachname",
    "career.email": "E-Mail",
    "career.phone": "Telefonnummer",
    "career.position": "Beworbene Position",
    "career.resume": "Lebenslauf hochladen",
    "career.coverLetter": "Anschreiben",
    "career.submitApplication": "Bewerbung senden",

    // Gallery Pages
    "gallery.title": "Galerie",
    "gallery.production": "Produktion",
    "gallery.qualityControl": "Qualitätskontrolle",
    "gallery.storage": "Lagerung",
    "gallery.projects": "Projekte",
    "gallery.facilities": "Unsere Anlagen",
    "gallery.viewImage": "Bild anzeigen",
    "gallery.closeImage": "Bild schließen",

    // Admin Panel
    "admin.title": "Admin-Panel",
    "admin.dashboard": "Dashboard",
    "admin.overview": "Übersicht",
    "admin.logout": "Abmelden",
    "admin.welcome": "Willkommen im Admin-Panel",
    "admin.statistics": "Statistiken",
    "admin.quickActions": "Schnellaktionen",
    "admin.systemInfo": "Systeminformationen",

    // Admin Navigation
    "admin.content": "Content-Management",
    "admin.news": "News-Verwaltung",
    "admin.products": "Produkte",
    "admin.gallery": "Galerie",
    "admin.certificates": "Zertifikate",
    "admin.teams": "Teammitglieder",
    "admin.positions": "Positionen",
    "admin.brochures": "Broschüren",
    "admin.documents": "Dokumente",
    "admin.media": "Medienverwaltung",
    "admin.company": "Unternehmensinformationen",
    "admin.communications": "Kommunikation",
    "admin.contacts": "Kontaktnachrichten",
    "admin.applications": "Bewerbungen",
    "admin.settings": "Einstellungen",
    "admin.config": "Konfiguration",

    // Admin Actions
    "admin.add": "Neu hinzufügen",
    "admin.edit": "Bearbeiten",
    "admin.delete": "Löschen",
    "admin.save": "Speichern",
    "admin.cancel": "Abbrechen",
    "admin.update": "Aktualisieren",
    "admin.create": "Erstellen",
    "admin.view": "Anzeigen",
    "admin.manage": "Verwalten",
    "admin.upload": "Hochladen",
    "admin.download": "Herunterladen",
    "admin.export": "Exportieren",
    "admin.import": "Importieren",
    "admin.search": "Suchen",
    "admin.filter": "Filtern",
    "admin.sort": "Sortieren",
    "admin.refresh": "Aktualisieren",
    "admin.back": "Zurück",
    "admin.close": "Schließen",
    "admin.confirm": "Bestätigen",
    "admin.yes": "Ja",
    "admin.no": "Nein",

    // Admin Messages
    "admin.loading": "Wird geladen...",
    "admin.saving": "Speichern...",
    "admin.saved": "Erfolgreich gespeichert",
    "admin.error": "Ein Fehler ist aufgetreten",
    "admin.success": "Vorgang erfolgreich abgeschlossen",
    "admin.warning": "Warnung",
    "admin.confirm.delete":
      "Sind Sie sicher, dass Sie dieses Element löschen möchten?",
    "admin.noData": "Keine Daten verfügbar",
    "admin.selectFile": "Datei auswählen",
    "admin.dragDropFile": "Datei hier hineinziehen oder klicken zum Auswählen",
    "admin.fileUploaded": "Datei erfolgreich hochgeladen",
    "admin.fileUploadError": "Fehler beim Hochladen der Datei",

    // Admin Forms
    "admin.form.title": "Titel",
    "admin.form.description": "Beschreibung",
    "admin.form.content": "Inhalt",
    "admin.form.image": "Bild",
    "admin.form.date": "Datum",
    "admin.form.author": "Autor",
    "admin.form.status": "Status",
    "admin.form.category": "Kategorie",
    "admin.form.tags": "Tags",
    "admin.form.url": "URL",
    "admin.form.name": "Name",
    "admin.form.email": "E-Mail",
    "admin.form.phone": "Telefon",
    "admin.form.company": "Unternehmen",
    "admin.form.position": "Position",
    "admin.form.message": "Nachricht",
    "admin.form.required": "Pflichtfeld",
    "admin.form.optional": "Optional",
    "admin.form.placeholder.title": "Titel eingeben...",
    "admin.form.placeholder.description": "Beschreibung eingeben...",
    "admin.form.placeholder.content": "Inhalt eingeben...",
    "admin.form.placeholder.name": "Name eingeben...",
    "admin.form.placeholder.email": "E-Mail eingeben...",
    "admin.form.placeholder.search": "Zum Suchen tippen...",

    // Admin Tables
    "admin.table.actions": "Aktionen",
    "admin.table.createdAt": "Erstellt",
    "admin.table.updatedAt": "Aktualisiert",
    "admin.table.status": "Status",
    "admin.table.noResults": "Keine Ergebnisse gefunden",
    "admin.table.showing": "Zeige",
    "admin.table.of": "von",
    "admin.table.entries": "Einträge",
    "admin.table.previous": "Vorherige",
    "admin.table.next": "Nächste",

    // News Management
    "admin.news.title": "News-Verwaltung",
    "admin.news.addArticle": "Neuen Artikel hinzufügen",
    "admin.news.editArticle": "Artikel bearbeiten",
    "admin.news.articles": "Artikel",
    "admin.news.published": "Veröffentlicht",
    "admin.news.draft": "Entwurf",
    "admin.news.sections": "Artikel-Abschnitte",
    "admin.news.addSection": "Abschnitt hinzufügen",
    "admin.news.sectionType": "Abschnittstyp",
    "admin.news.textOnly": "Nur Text",
    "admin.news.imageOnly": "Nur Bild",
    "admin.news.textWithImage": "Text mit Bild",
    "admin.news.imagePosition": "Bildposition",
    "admin.news.left": "Links",
    "admin.news.right": "Rechts",

    // Gallery Management
    "admin.gallery.title": "Galerie-Verwaltung",
    "admin.gallery.categories": "Galerie-Kategorien",
    "admin.gallery.items": "Galerie-Elemente",
    "admin.gallery.addCategory": "Kategorie hinzufügen",
    "admin.gallery.addItem": "Element hinzufügen",
    "admin.gallery.selectCategory": "Kategorie auswählen",

    // Certificate Management
    "admin.certificates.title": "Zertifikat-Verwaltung",
    "admin.certificates.categories": "Zertifikat-Kategorien",
    "admin.certificates.subcategories": "Unterkategorien",
    "admin.certificates.addCertificate": "Zertifikat hinzufügen",
    "admin.certificates.uploadPdf": "PDF hochladen",

    // Team Management
    "admin.teams.title": "Team-Verwaltung",
    "admin.teams.members": "Teammitglieder",
    "admin.teams.addMember": "Teammitglied hinzufügen",
    "admin.teams.editMember": "Teammitglied bearbeiten",
    "admin.teams.firstName": "Vorname",
    "admin.teams.lastName": "Nachname",
    "admin.teams.role": "Rolle",
    "admin.teams.department": "Abteilung",
    "admin.teams.bio": "Biografie",
    "admin.teams.photo": "Foto",

    // Brochures Management
    "admin.brochures.title": "Broschüren-Verwaltung",
    "admin.brochures.categories": "Broschüren-Kategorien",
    "admin.brochures.addBrochure": "Broschüre hinzufügen",
    "admin.brochures.uploadFile": "Datei hochladen",
    "admin.brochures.language": "Sprache",

    // Contact Messages
    "admin.contacts.title": "Kontaktnachrichten",
    "admin.contacts.unread": "Ungelesen",
    "admin.contacts.read": "Gelesen",
    "admin.contacts.markAsRead": "Als gelesen markieren",
    "admin.contacts.reply": "Antworten",
    "admin.contacts.subject": "Betreff",
    "admin.contacts.from": "Von",
    "admin.contacts.sentAt": "Gesendet am",

    // Job Applications
    "admin.applications.title": "Bewerbungen",
    "admin.applications.applicant": "Bewerber",
    "admin.applications.appliedFor": "Beworben für",
    "admin.applications.appliedAt": "Beworben am",
    "admin.applications.resume": "Lebenslauf",
    "admin.applications.coverLetter": "Anschreiben",
    "admin.applications.review": "Überprüfung",
    "admin.applications.accept": "Akzeptieren",
    "admin.applications.reject": "Ablehnen",

    // System Settings
    "admin.settings.title": "Systemeinstellungen",
    "admin.settings.general": "Allgemeine Einstellungen",
    "admin.settings.email": "E-Mail-Konfiguration",
    "admin.settings.backup": "Backup & Wiederherstellung",
    "admin.settings.users": "Benutzerverwaltung",
    "admin.settings.permissions": "Berechtigungen",
    "admin.settings.maintenance": "Wartungsmodus",
    "admin.settings.logs": "Systemprotokolle",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem("konti-language");
    return saved === "mk" || saved === "en" || saved === "de" ? saved : "en";
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("konti-language", language);

    // Update document language attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
