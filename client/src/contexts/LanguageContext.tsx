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
    "hero.videoTitle": "Konti Hidroplast Corporate Video",

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
    "products.gasPipeline": "GAS PIPELINE SYSTEM",
    "products.cableProtection": "CABLE PROTECTION",
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
    "news.errorLoading": "Failed to load news articles",
    "news.noArticles": "No news articles available",
    "news.noDescription": "Read more about this news article",

    // Testimonials
    "testimonials.petar.quote":
      "As your long-term partner, we are very happy to work with you and your company. Over the years, we have received very good service, great quality of products, fast and competent responses from Konti Hidroplast.All employees are responsive, competent and well-known in the products you produce. We always receive the right decision for choosing the right product. We highly recommend Konti Hidroplast to all our partners and customers.",
    "testimonials.petar.author": "Petar Ermenliev",
    "testimonials.petar.company": "Eurocom 2000",
    "testimonials.alex.quote":
      "Working with Konti Hidroplast has been a truly positive experience. Their professionalism, attention to detail, and commitment to delivering high-quality products & services consistently exceed our expectations. The team's expertise and responsiveness make every project smooth and efficient, and their dedication to customer satisfaction is evident in everything they do. We truly value our partnership and highly recommend Konti Hidroplast to anyone seeking reliable products and solutions",
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
    "aboutUs.projectsTitle": "Projects",
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
    "aboutUs.since1975": "Since 1975",
    "aboutUs.leadershipMessage": "Leadership Message",
    "aboutUs.leadershipTitle": "Building the Future of Infrastructure",
    "aboutUs.leadershipDescription1": "At Konti Hidroplast, our mission has always been clear: to lead with innovation, deliver quality by European standards, and stay ahead of the curve in our industry. We are committed to creating sustainable solutions, expanding into new markets, and sharing knowledge with all who seek to grow.",
    "aboutUs.leadershipDescription2": "Together, we build not just for today, but for a future our next generations will be proud of.",
    "aboutUs.leaderName": "Boris Madjunkov",
    "aboutUs.leaderPosition": "General Director",
    "aboutUs.teamTitle": "Our Team",
    "aboutUs.contactUsButton": "Contact Us",
    "aboutUs.noTeamMembers": "No Team Members Yet",
    "aboutUs.teamMembersDescription": "Team members will appear here once they are added to the database.",
    "aboutUs.displayingIn": "Displaying in:",
    "aboutUs.fallback": "fallback",
    "aboutUs.downloadPdf": "Download PDF",
    "aboutUs.noProjectsAvailable": "No Projects Available",
    "aboutUs.projectsDescription": "Projects will appear here once they are added to the database.",
    "aboutUs.productsTitle": "Products",
    "aboutUs.waterSupplySystems": "WATER SUPPLY SYSTEMS",
    "aboutUs.sewerageSystems": "SEWERAGE SYSTEMS",
    "aboutUs.gasPipelineSystem": "GAS PIPELINE SYSTEM",
    "aboutUs.cableProtection": "CABLE PROTECTION",
    "aboutUs.galleryTitle": "Gallery",
    "aboutUs.viewGallery": "View Gallery",
    "aboutUs.noGalleryCategories": "No Gallery Categories",
    "aboutUs.galleryCategoriesDescription": "Gallery categories will appear here once they are added.",
    "aboutUs.getInTouchTitle": "Get in Touch: Connect with Us Today!",
    "aboutUs.getInTouchDescription": "Need more information about our cable protection solutions? Contact our team of experts.",
    "aboutUs.englishLang": "🇺🇸 English",
    "aboutUs.macedonianLang": "🇲🇰 Македонски",
    "aboutUs.germanLang": "🇩🇪 Deutsch",

    // Products Pages
    "productsPage.heroHighQualityPipes": "HIGH-QUALITY PIPES",
    "productsPage.heroManufacturingExcellence": "Manufacturing Excellence",
    "productsPage.heroIsoCertified": "ISO Certified",
    "productsPage.heroImageAlt": "High-quality PE and PP pipe systems in manufacturing facility",
    "productsPage.heroDrivingProgress": "Driving Progress With Innovation",
    "productsPage.productRange": "Product Range",
    "productsPage.applicationDescription1": "Konti Hidroplast products find a broad range of applications in the industrial and utilities market on a worldwide scale. The water and gas distribution enterprises are important sectors for high integrity products where the maintenance of water quality and the safe transport of gaseous fuels are of paramount importance.",
    "productsPage.applicationDescription2": "Industrial applications include alternative energy installations in landfill gas systems to effluent transportation and mineral slurry. Products are widely used in pipeline installation, repair and maintenance.",
    "productsPage.peTechnicalAlt": "PE Pipe Technical Specifications Diagram",
    "productsPage.peFlowAlt": "PE Technical Specifications Flow Diagram",
    "productsPage.metaDescription": "Explore our comprehensive range of PE and PP pipes for water supply, sewerage, gas pipeline systems, and cable protection. Quality products meeting international standards.",
    
    // Water Supply Systems Page
    "waterSupply.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "waterSupply.waterSupplySystem": "WATER SUPPLY SYSTEM",
    "waterSupply.heroDescription": "High-quality polyethylene pipes for potable water distribution networks, meeting the highest standards for safety and durability.",
    "waterSupply.yearsLifespan": "50+ Years Lifespan",
    "waterSupply.recyclable": "100% Recyclable",
    "waterSupply.premiumQuality": "Premium Quality",
    "waterSupply.technicalSpecifications": "Technical Specifications",
    "waterSupply.colorDescription": "The pipes' color is black with an inner white layer and coextruded blue lines, or blue with an inner white layer.",
    "waterSupply.diameterRange": "The range of diameters is from DN 16mm to DN 630mm, and the pressures are from PN 6 to PN 32 bar.",
    "waterSupply.smallPipesDescription": "Pipes of the DN-16-110mm range are easily bended, so they can be wound in coils of different lengths, and the requirements for fittings and the time for installation can be reduced. Pipes of range 125-800mm are produced in straight pipes of 6 or 12m.",
    "waterSupply.generalProperties": "General Properties",
    "waterSupply.lowSpecificWeight": "Low specific weight",
    "waterSupply.flexibility": "Flexibility",
    "waterSupply.goodChemicalResistance": "Good chemical resistance",
    "waterSupply.excellentWeldingOptions": "Excellent welding options",
    "waterSupply.smoothInternalSurface": "Smooth internal surface resistant to deposits",
    "waterSupply.suitableForDrinkingWater": "Suitable for drinking water",
    "waterSupply.longLifespan": "Long lifespan (more than 50 years)",
    "waterSupply.recyclingPossibility": "100% recycling possibility",
    "waterSupply.peWaterSupplyPipes": "PE Water-Supply Pipes",
    "waterSupply.pe80": "PE-80",
    "waterSupply.pe100": "PE-100",
    "waterSupply.pe100RC": "PE-100 RC",
    "waterSupply.pe80Description": "High density polyethylene pipes designed for medium-pressure water supply applications",
    "waterSupply.designStress": "Design stress: σ=6.3МПа",
    "waterSupply.mrs": "MRS: 8",
    "waterSupply.factorOfSafety": "Factor of safety: C=1.25",
    "waterSupply.color": "Color: black with blue coextruded lines or light blue",
    "waterSupply.operatingTemperature": "Operating Temperature: -20°C to +60°C",
    "waterSupply.serviceLife": "Service life of 50+ years under normal operating conditions",
    "waterSupply.downloadSpecs": "Download Specifications",
    "waterSupply.downloadBrochure": "Download Brochure",
    "waterSupply.peFittings": "PE Fittings",
    "waterSupply.buttWelding": "Butt Welding",
    "waterSupply.fittingStubEnds": "Fitting Stub Ends (Welding Collars)",
    "waterSupply.fittingFFPiece": "Fitting – FF Piece",
    "waterSupply.fittingMetalFlange": "Fitting – Metal Flange",
    "waterSupply.fittingElbow11": "Fitting – Elbow 11°-12°-30°",
    "waterSupply.fittingElbow45": "Fitting – Elbow 45°",
    "waterSupply.fittingElbow60": "Fitting – Elbow 60°",
    "waterSupply.fittingElbow90": "Fitting – Elbow 90°",
    "waterSupply.fittingConcentricReducer": "Fitting – Concentric Reducer",
    "waterSupply.fittingEndCup": "Fitting – End Cup",
    "waterSupply.fittingTeeOutlet": "Fitting – Tee Outlet Without Reinforcement",
    "waterSupply.fittingTeeOutletReducer": "Fitting – Tee Outlet Reducer",
    
    // Mechanical Fittings
    "waterSupply.mechanicalFittings": "Mechanical Fittings",
    "waterSupply.mechanicalFittingsDescription": "Compression fittings for quick and reliable pipe connections",
    "waterSupply.coupling": "Coupling",
    "waterSupply.reducerCoupling": "Reducer Coupling",
    "waterSupply.adapterCouplingMale": "Adapter Coupling Male",
    "waterSupply.adapterCouplingFemale": "Adapter Coupling Female",
    "waterSupply.lineEnd": "Line End",
    "waterSupply.reducingCoupling90": "Reducing Coupling 90°",
    "waterSupply.teeMaleThread90": "Tee Male Thread 90°",
    "waterSupply.teeFemaleThread90": "Tee Female Thread 90°",
    "waterSupply.equalTee90": "Equal Tee 90°",
    "waterSupply.elbow90": "Elbow 90°",
    "waterSupply.2BoltSaddle": "2 Bolt Saddle",
    "waterSupply.4BoltSaddleFemaleThread": "4 Bolt Saddle Female Thread",
    "waterSupply.6BoltSaddleFemaleThread": "6 Bolt Saddle Female Thread",
    
    // Electrofusion Fittings
    "waterSupply.electrofusionFittings": "Electrofusion Fittings",
    "waterSupply.electrofusionFittingsDescription": "Electric welded fittings for automated and precise pipe joining",
    "waterSupply.electrofusionSocket": "Electrofusion Socket",
    "waterSupply.electrofusionTeeOutlet": "Electrofusion Tee Outlet",
    "waterSupply.electrofusionTeeReducer": "Electrofusion Tee Reducer",
    "waterSupply.electrofusionElbow45": "Electrofusion Elbow 45°",
    "waterSupply.electrofusionElbow90": "Electrofusion Elbow 90°",
    "waterSupply.electrofusionReducer": "Electrofusion Reducer",
    "waterSupply.electrofusionEndCap": "Electrofusion End Cap",
    
    // PE Pipe Specifications

    "waterSupply.pe100Description": "Third generation PE of high density for high-pressure applications and critical utility services",
    "waterSupply.pe100DesignStress": "Design stress: σ=8.0 МПа",
    "waterSupply.pe100MRS": "MRS: 10",
    "waterSupply.pe100FactorOfSafety": "Factor of safety: C=1.25",
    "waterSupply.pe100Color": "Color: black with blue coextruded lines or blue",
    "waterSupply.pe100OperatingTemp": "Operating temperature: -40°C to +60°C",
    "waterSupply.pe100PressureRatings": "Pressure ratings up to PN 32",
    "waterSupply.pe100RCDescription": "Specialized variant with greater resistance to slow crack growth and environmental stress cracking",
    "waterSupply.pe100RCMaterial": "Material: High quality PE 100-RC material and PE 100",
    "waterSupply.pe100RCStandards": "Standards: EN 12201-2 and PAS 1075",
    "waterSupply.pe100RCProjectElongation": "Project elongation: σ=8.0МПа",
    "waterSupply.pe100RCFactorOfSafety": "Factor of safety: C=1.25",
    "waterSupply.pe100RCColor": "Color: Black with yellow or orange lines, or entirely orange",
    "waterSupply.pe100RCServiceLife": "Service life of 100+ years under normal operating conditions",
    
    // Gas Pipeline Systems
    "gasPipeline.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "gasPipeline.gasPipelineSystem": "GAS PIPELINE SYSTEM",
    "gasPipeline.heroDescription": "High-quality polyethylene pipes for gas distribution networks, meeting the highest standards for safety and reliability up to 10 bar working pressure.",
    "gasPipeline.upTo10Bar": "Up to 10 Bar",
    "gasPipeline.enStandards": "EN 1555-2 & ISO 4437",
    "gasPipeline.gasPipelineSystems": "Gas Pipeline Systems",
    "gasPipeline.premiumQuality": "Premium Quality",
    "gasPipeline.technicalSpecifications": "Technical Specifications",
    "gasPipeline.pipeDescription": "Polyethylene gas pipes are made of PE 80 and PE 100 materials, and are intended for distribution of gas through a network, up to working pressure of 10 bar.",
    "gasPipeline.pe80Description": "PE 80 (Medium Density Polyethylene) are designed for medium-pressure applications and offer good flexibility and durability.",
    "gasPipeline.pe100Description": "PE 100 (High-Density Polyethylene) have higher density and strength compared to PE 80 and are designed for high-pressure systems with enhanced safety features.",
    "gasPipeline.generalProperties": "General Properties",
    "gasPipeline.workingPressure": "Working pressure up to 10 bar",
    "gasPipeline.chemicalResistance": "Excellent chemical resistance",
    "gasPipeline.weldingCapabilities": "Superior welding capabilities",
    "gasPipeline.smoothSurface": "Smooth internal surface",
    "gasPipeline.suitableForGas": "Suitable for gas distribution",
    "gasPipeline.longLifespan": "Long lifespan (more than 50 years)",
    "gasPipeline.recyclingPossibility": "100% recycling possibility",
    "gasPipeline.compliesWithStandards": "Complies with EN 1555-2 and ISO 4437",
    "gasPipeline.gasPipelinePipes": "Gas Pipeline Pipes",
    "gasPipeline.gas": "GAS",
    "gasPipeline.petroleumDerivatives": "Petroleum Derivatives",
    "gasPipeline.colorStandards": "Color: Black with longitudinal yellow lines, or yellow color for PE 80, and black with yellow lines or orange color for PE 100",
    "gasPipeline.standards": "Standards: EN 1555-2 and ISO 4437",
    "gasPipeline.pe80Applications": "PE 80: Designed for medium-pressure applications with good flexibility and durability",
    "gasPipeline.pe80SuitableFor": "PE 80: Suitable for smaller diameter and lower pressure systems",
    "gasPipeline.pe100Strength": "PE 100: Higher density and strength compared to PE 80, designed for high-pressure systems",
    "gasPipeline.pe100WallThickness": "PE 100: Enables thinner wall thickness for the same pressure class, leading to reduced weight and cost savings",
    "gasPipeline.pe100ServiceLife": "PE 100: Longer service life due to improved resistance to stress cracking and environmental stress",
    "gasPipeline.pe80vs100": "PE 80 is preferred for low to medium-pressure systems with smaller diameters, while PE 100 is ideal for high-pressure systems, larger diameters, and long-term, demanding applications",
    "gasPipeline.downloadSpecs": "Download Specifications",
    "gasPipeline.downloadBrochure": "Download Brochure",
    "gasPipeline.peFittings": "PE Fittings",
    "gasPipeline.buttWelding": "Butt Welding",
    "gasPipeline.contactTitle": "Get in Touch: Connect with Us Today!",
    "gasPipeline.contactDescription": "Need more information about our gas pipeline solutions? Contact our team of experts.",
    "gasPipeline.contactUs": "Contact Us",
    
    // Konti Petrol Pipes
    "gasPipeline.kontiPetrolDescription": "Konti Petrol gas pipe is a double-layered pipe with outer black surface made of PE100 standards, the same that apply for the classic PE i.e. EN 1555 or ISO 4437.",
    "gasPipeline.kontiPetrolColor": "Color: Black with orange longitudinal lines on the outer layer, and orange inner layer",
    "gasPipeline.organicResistance": "Excellent resistance to volatile organic compounds from petroleum derivatives and prevents their crossing in the environment",
    "gasPipeline.groundwaterProtection": "Protecting groundwater from impurities from the oil derivatives",
    "gasPipeline.temperatureResistance": "Resistance to extreme temperatures 35°C to 85°C",
    "gasPipeline.higherChemicalResistance": "Higher chemical resistance of the pipe",
    "gasPipeline.abrasionResistance": "Excellent resistance to abrasion",
    "gasPipeline.applicationFuel": "Application: Transport of petrol diesel and other fuels in stations and refinery",
    "gasPipeline.applicationGas": "Application: Gas distribution",
    "gasPipeline.applicationIndustrial": "Application: Special industrial application",
    "gasPipeline.applicationGeothermal": "Application: Geothermal and city heating",
    "gasPipeline.dimensions": "Dimensions: PE100-PE100-X pipes are produced in dimensions from 20mm to 250mm",
    
    // Cable Protection Systems
    "cableProtection.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "cableProtection.cableProtectionSystems": "CABLE PROTECTION SYSTEMS",
    "cableProtection.heroDescription": "High-Density Polyethylene (HDPE) pipes with externally smooth and internally ribbed surfaces in the 32–75 mm diameter range designed for cable protection purposes.",
    "cableProtection.undergroundInstallation": "Underground Installation",
    "cableProtection.corrosionResistant": "Corrosion Resistant",
    "cableProtection.premiumQuality": "Premium Quality",
    "cableProtection.cableProtection": "Cable Protection",
    "cableProtection.mainDescription": "High-Density Polyethylene (HDPE) pipes with externally smooth and internally ribbed surfaces in the 32–75 mm diameter range are designed for cable protection purposes. Polyethylene pipes for cable protection can be:",
    "cableProtection.kontiKanDuct": "Konti Kan Duct Cable protection – Polyethylene pipes, HDPE, externally smooth, internally serrated with a small diameter.",
    "cableProtection.kontiKanOptic": "Konti Kan Optic Cable protection– Polyethylene double-layered corrugated pipes with outer corrugated and inner smooth surface.",
    "cableProtection.dividedIn": "These pipes are divided in:",
    "cableProtection.electroFlex450": "KONTI KAN ELECTRO FLEX 450 N",
    "cableProtection.electroFlex750": "KONTI KAN ELECTRO FLEX 750 N",
    "cableProtection.optical": "KONTI KAN OPTICAL",
    "cableProtection.products": "Cable Protection Products",
    "cableProtection.kontiKanDuctProtection": "Konti Kan Duct Cable Protection",
    "cableProtection.kontiKanOpticProtection": "Konti Kan Optic Cable Protection",
    
    // Konti Kan Duct Cable Protection
    "cableProtection.ductDescription": "The polyethylene pipes with small diameter are used for installing cable canalization, for underground placement. Mainly they are used as protection for optic cables, coaxial optic cables for distributive systems and other functional nets. They are also used for classical telecommunication cables with smaller diameter. Their exterior surface is smooth with longitudinal ribbed interior, and they are produced in coils up to 500 m.",
    "cableProtection.applications": "Applications",
    "cableProtection.applicationElectrical": "Protection for electrical power cables, fiber optics, and telecommunication cables.",
    "cableProtection.applicationInfrastructure": "Suitable for installation in urban, industrial, and rural infrastructure projects.",
    "cableProtection.materialProperties": "Material Properties",
    "cableProtection.materialHDPE": "Made from high-density polyethylene (HDPE), resistant to corrosion, abrasion, and environmental stress cracking.",
    "cableProtection.flexibility": "Excellent flexibility, making installation in curved pathways easier without the need for additional fittings.",
    "cableProtection.chemicalResistance": "Inert to most chemicals, ensuring longevity even in aggressive environments.",
    "cableProtection.dimensions": "Dimensions",
    "cableProtection.nominalDiameter": "Nominal outer diameter: 32–75 mm",
    "cableProtection.singlePipe": "Single pipe in diameters 32, 40 and 50 mm",
    "cableProtection.doublePipe": "Double (twin) pipe in diameters 32, 40, 50 mm",
    "cableProtection.quadruplePipe": "Quadruple pipes, composed by two different dimensions of 32 and 40 mm",
    "cableProtection.downloadSpecs": "Download Specifications",
    "cableProtection.downloadBrochure": "Download Brochure",
    "cableProtection.contactTitle": "Get in Touch: Connect with Us Today!",
    "cableProtection.contactDescription": "Need more information about our cable protection solutions? Contact our team of experts.",
    "cableProtection.contactUs": "Contact Us",
    
    // Konti Kan Optic Cable Protection
    "cableProtection.opticDescription": "These HDPE pipes are used for protection or holders of the protection pipes, especially for passage of roads and bridges. They are double wall pipes within the smooth interior and the exterior surface is corrugated.Pipes with bigger diameters that are used for insertion of a bundle of pipes for protection of optic cables and for road or bridge passage. They are produced in black, red and yellow color, but also in any special color requested by the customer.",
    "cableProtection.opticApplications": "Applications",
    "cableProtection.opticApplicationPower": "Protecting power cables, telecommunication cables, and fiber optics",
    "cableProtection.opticApplicationUnderground": "Suitable for underground installations in urban, rural, or industrial environments",
    "cableProtection.opticApplicationInfrastructure": "Ideal for infrastructure projects requiring high mechanical protection",
    "cableProtection.characteristics": "Characteristics",
    "cableProtection.madeFromHDPE": "Made from HDPE with exceptional resistance to wear, corrosion, and environmental degradation",
    "cableProtection.nominalDiameterRange": "Nominal Diameter Range: 75 mm to 200 mm (outer diameter)",
    "cableProtection.productionForm": "Produced in straight form of 6 and 12 m, or in 50 m coils",
    "cableProtection.chemicalInert": "Inert to most chemicals, acids, and bases, making it suitable for diverse soil conditions",
    "cableProtection.uvStabilized": "UV-stabilized variants are available for outdoor installations",
    "cableProtection.deformationResistance": "Strong resistance to deformation under soil or static loads",
    "cableProtection.temperatureRange": "Suitable for a wide temperature range (-40°C to +60°C)",
    "cableProtection.serviceLife": "Long service life (50+ years), reducing maintenance and replacement needs",
    "cableProtection.compliance": "In compliance with international standards, such as EN 50086, EN 61386, EN 13476-3",
    
    // HDPE Konti Kan Sewage Pipes
    "sewagePipes.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "sewagePipes.hdpeKontiKan": "HDPE KONTI KAN",
    "sewagePipes.sewagePipe": "SEWAGE PIPE",
    "sewagePipes.heroDescription": "HDPE corrugated sewage pipes excel in durability, hydraulic efficiency, and structural performance, making them a preferred choice for sewage and drainage systems.",
    "sewagePipes.yearsLifespan": "50+ Years Lifespan",
    "sewagePipes.recyclable": "100% Recyclable",
    "sewagePipes.premiumQuality": "Premium Quality",
    "sewagePipes.technicalSpecifications": "Technical Specifications",
    "sewagePipes.mainDescription": "HDPE corrugated sewage pipes excel in durability, hydraulic efficiency, and structural performance, making them a preferred choice for sewage and drainage systems. Their lightweight, flexibility, and chemical resistance further enhance their suitability for a wide range of applications.",
    "sewagePipes.commonStandards": "Common standards for HDPE corrugated pipes: EN 13476-1 and EN 13476-3",
    "sewagePipes.hdpeKontiKanPipes": "HDPE Konti Kan Pipes",
    "sewagePipes.hdpeKontiKanTitle": "HDPE Konti Kan",
    "sewagePipes.pipeDescription": "HDPE (High-Density Polyethylene) corrugated pipes are widely used in sewage and drainage systems due to their excellent performance characteristics.",
    
    // Material Properties
    "sewagePipes.materialProperties": "Material Properties:",
    "sewagePipes.hdpeMaterial": "High-Density Polyethylene (HDPE)",
    "sewagePipes.lightweightDurable": "Lightweight yet durable.",
    "sewagePipes.chemicalResistance": "Excellent chemical resistance, making it ideal for sewage applications.",
    "sewagePipes.nonCorrosive": "Non-corrosive and resistant to biological and chemical attacks from wastewater.",
    
    // Applications
    "sewagePipes.application": "Application:",
    "sewagePipes.municipalSewage": "Municipal sewage systems.",
    "sewagePipes.stormwaterDrainage": "Stormwater drainage.",
    "sewagePipes.industrialWastewater": "Industrial wastewater systems.",
    "sewagePipes.agriculturalDrainage": "Agricultural drainage.",
    
    // Characteristics
    "sewagePipes.characteristics": "Characteristics:",
    "sewagePipes.stiffnessRatings": "Common stiffness ratings: SN 4, SN 6, SN 8, or higher, depending on the application.",
    "sewagePipes.dimensionRange": "Dimension range: DN/OD 110-1200mm",
    "sewagePipes.color": "Color: Outer black with inner light grey",
    "sewagePipes.smoothInnerSurface": "Smooth Inner Surface: minimizes friction, allowing efficient flow of sewage and wastewater.",
    "sewagePipes.highFlowCapacity": "High flow capacity due to low Manning's coefficient (commonly 0.009).",
    "sewagePipes.corrugatedOuterWall": "Corrugated Outer Wall: enhances structural strength while reducing material weight.",
    "sewagePipes.uvResistance": "High resistance to UV degradation.",
    "sewagePipes.flexibleResistant": "Flexible and resistant to cracking.",
    "sewagePipes.serviceLife": "50+ years in standard operating conditions.",
    "sewagePipes.easyHandling": "Easier to handle and transport compared to concrete or steel.",
    "sewagePipes.temperatureRange": "Operates effectively within a temperature range of -40°C to +60°C.",
    "sewagePipes.fullyRecyclable": "Fully recyclable at the end of its service life.",
    "sewagePipes.downloadSpecs": "Download Specs",
    "sewagePipes.downloadBrochure": "Download Brochure",
    
    // Manufacturing and Fittings
    "sewagePipes.hdpeKontiKanManufacturing": "HDPE Konti Kan Manufacturing",
    "sewagePipes.kontiKanFittings": "Konti Kan Fittings",
    
    // Injection Molding Fittings
    "sewagePipes.injectionMolding": "Injection Molding",
    "sewagePipes.injectionMoldingDescription": "Precision injection molded fittings for reliable connections",
    "sewagePipes.injectionMoldingElbow": "Injection molding elbow",
    "sewagePipes.injectionMoldingYBranch": "Injection molding Y-branch",
    "sewagePipes.injectionMoldingYBranchReducer": "Injection molding Y-branch Reducer",
    "sewagePipes.injectionMoldingTeeReducer": "Injection molding TEE Reducer",
    "sewagePipes.injectionMoldingReducer": "Injection molding Reducer",
    
    // Welded Fittings
    "sewagePipes.weldedFittings": "Welded Fittings",
    "sewagePipes.weldedFittingsDescription": "High-strength welded fittings for permanent connections",
    "sewagePipes.weldedElbow11": "Welded elbow 11",
    "sewagePipes.weldedElbow60": "Welded elbow 60",
    "sewagePipes.weldedElbow90": "Welded elbow 90",
    "sewagePipes.weldedYBranch": "Welded Y-branch",
    "sewagePipes.weldedYBranchReducer": "Welded Y-branch Reducer",
    "sewagePipes.weldedReducer": "Welded Reducer",
    "sewagePipes.weldedEndCap": "Welded End cap",
    
    // Connection Components
    "sewagePipes.connectionComponents": "Connection Components",
    "sewagePipes.connectionComponentsDescription": "Essential components for secure pipe connections",
    "sewagePipes.socket": "Socket",
    "sewagePipes.flexAdapter": "Flex Adapter",
    "sewagePipes.gasket": "Gasket",
    
    // Contact
    "sewagePipes.contactTitle": "Get in Touch: Connect with Us Today!",
    "sewagePipes.contactDescription": "Need more information about our Konti Kan sewage pipe solutions? Contact our team of experts.",
    "sewagePipes.contactDescriptionGeneral": "Need more information about our sewage pipe solutions? Contact our team of experts.",
    "sewagePipes.contactUs": "Contact Us",
    
    // PP HM Konti Kan Sewage Pipes
    "ppHmPipes.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "ppHmPipes.ppHmKontiKan": "PP HM KONTI KAN",
    "ppHmPipes.sewagePipe": "SEWAGE PIPE",
    "ppHmPipes.heroDescription": "PP double-wall corrugated pipes are an excellent choice for heavy-duty sewage and drainage systems, offering superior durability, chemical resistance, and hydraulic efficiency.",
    "ppHmPipes.yearsLifespan": "50+ Years Lifespan",
    "ppHmPipes.recyclable": "100% Recyclable",
    "ppHmPipes.ppHmKontiKanSewagePipe": "PP HM Konti Kan Sewage Pipe",
    "ppHmPipes.premiumQuality": "Premium Quality",
    "ppHmPipes.technicalSpecifications": "Technical Specifications",
    "ppHmPipes.mainDescription": "PP (Polypropylene) double-wall corrugated pipes are widely used for drainage, sewage, and stormwater management systems due to their excellent material properties and structural design. Common international standards for PP double-wall corrugated pipes include:",
    "ppHmPipes.standardEN13476": "EN 13476-1 and EN 13476-3: Production standard for structured-wall plastic pipes.",
    "ppHmPipes.standardISO21138": "ISO 21138: Specifications for non-pressure drainage and sewerage systems.",
    "ppHmPipes.standardASTM": "ASTM F2736/F2764: Standards for polypropylene corrugated pipes.",
    "ppHmPipes.ppHmKontiKanPipes": "PP HM Konti Kan Pipes",
    "ppHmPipes.ppHmKontiKanTitle": "PP HM Konti Kan",
    "ppHmPipes.pipeDescription": "PP (Polypropylene) double-wall corrugated pipes are widely used for drainage, sewage, and stormwater management systems due to their excellent material properties and structural design.",
    
    // Material Properties
    "ppHmPipes.materialProperties": "Material Properties:",
    "ppHmPipes.ppMaterial": "Polypropylene (PP)",
    "ppHmPipes.strengthToWeightRatio": "High strength-to-weight ratio",
    "ppHmPipes.chemicalThermalResistance": "Greater chemical and thermal resistance compared to HDPE",
    "ppHmPipes.abrasionResistance": "Excellent resistance to abrasion, making it ideal for sewage applications",
    "ppHmPipes.rigidDurable": "More rigid and durable in higher temperatures than HDPE",
    
    // Applications
    "ppHmPipes.application": "Application:",
    "ppHmPipes.municipalIndustrialWastewater": "Municipal and industrial wastewater systems",
    "ppHmPipes.stormwaterHarvesting": "Stormwater, rainwater harvesting, and subsoil drainage",
    "ppHmPipes.roadRailInfrastructure": "Road and rail infrastructure, as culverts and drainage pipes",
    
    // Characteristics
    "ppHmPipes.characteristics": "Characteristics:",
    "ppHmPipes.corrugatedStructure": "Strong corrugated structure for deep burial or heavy traffic loads",
    "ppHmPipes.smoothInnerWall": "Smooth inner wall ensures low resistance to flow, improving hydraulic performance",
    "ppHmPipes.stiffnessRatings": "High stiffness ratings (SN 4, SN 6, SN 8, 10, 12, 16)",
    "ppHmPipes.dimensionRange": "Dimension range: DN/ID 100-1200mm",
    "ppHmPipes.color": "Color: Outer black with inner light grey",
    "ppHmPipes.manningsCoefficient": "Manning's coefficient is typically 0.009, which minimizes clogging and sediment buildup",
    "ppHmPipes.highFlowRates": "Designed to handle high flow rates in drainage and sewage systems",
    "ppHmPipes.uvStabilized": "UV-stabilized for applications exposed to sunlight",
    "ppHmPipes.serviceLife": "Typically exceeds 50 years under normal operating conditions",
    "ppHmPipes.temperatureRange": "Can operate between -20°C and +90°C, with short-term resistance to higher temperatures",
    "ppHmPipes.fullyRecyclable": "Fully recyclable, making it an eco-friendly option",
    "ppHmPipes.downloadSpecs": "Download Specs",
    "ppHmPipes.downloadBrochure": "Download Brochure",
    
    // Manufacturing and Fittings
    "ppHmPipes.ppHmManufacturing": "PP HM Manufacturing",
    "ppHmPipes.ppHmFittings": "PP HM Fittings",
    
    // Injection Molding Fittings
    "ppHmPipes.injectionMolding": "Injection Molding",
    "ppHmPipes.injectionMoldingElbow": "Injection Molding Elbow",
    "ppHmPipes.injectionMoldingTee": "Injection Molding Tee",
    "ppHmPipes.injectionMoldingYBranch": "Injection Molding Y-branch",
    "ppHmPipes.injectionMoldingYBranchReducer": "Injection Molding Y-branch Reducer",
    "ppHmPipes.injectionMoldingTeeReducer": "Injection Molding Tee Reducer",
    "ppHmPipes.injectionMoldingReducer": "Injection Molding Reducer",
    
    // Welded Fittings
    "ppHmPipes.weldedFittings": "Welded Fittings",
    "ppHmPipes.weldedElbow11": "Welded Elbow 11°",
    "ppHmPipes.weldedElbow22": "Welded Elbow 22°",
    "ppHmPipes.weldedElbow30": "Welded Elbow 30°",
    "ppHmPipes.weldedElbow45": "Welded Elbow 45°",
    "ppHmPipes.weldedElbow60": "Welded Elbow 60°",
    "ppHmPipes.weldedElbow90": "Welded Elbow 90°",
    "ppHmPipes.weldedTee": "Welded Tee",
    "ppHmPipes.weldedYBranch": "Welded Y-branch",
    "ppHmPipes.weldedTeeReducer": "Welded Tee Reducer",
    "ppHmPipes.weldedYBranchReducer": "Welded Y-branch Reducer",
    "ppHmPipes.weldedReducer": "Welded Reducer",
    "ppHmPipes.weldedEndCap": "Welded End Cap",
    
    // Connection Components
    "ppHmPipes.connectionComponents": "Connection Components",
    "ppHmPipes.socket": "Socket",
    "ppHmPipes.flexAdapter": "Flex Adapter",
    "ppHmPipes.gasket": "Gasket",
    
    // Contact
    "ppHmPipes.contactTitle": "Get in Touch: Connect with Us Today!",
    "ppHmPipes.contactDescriptionPpHm": "Need more information about our PP HM sewage pipe solutions? Contact our team of experts.",
    "ppHmPipes.contactDescriptionGeneral": "Need more information about our PP HM pipe solutions? Contact our team of experts.",
    "ppHmPipes.contactUs": "Contact Us",
    
    // KONTI KAN SPIRAL Pipes
    "spiralPipes.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "spiralPipes.kontiKanSpiral": "KONTI KAN SPIRAL",
    "spiralPipes.hdpeId": "HDPE / ID",
    "spiralPipes.heroDescription": "Clients and engineers as ideal pipe material for many pressure and non-pressure applications such as water distribution; gravity sewer, rehabilitation projects and manholes recognize polyethylene.",
    "spiralPipes.yearsLifespan": "50+ Years Lifespan",
    "spiralPipes.recyclable": "100% Recyclable",
    "spiralPipes.manufacturing": "KONTI KAN SPIRAL pipes manufacturing",
    "spiralPipes.premiumQuality": "Premium Quality",
    "spiralPipes.productOverview": "Product Overview",
    "spiralPipes.latestDevelopment": "Latest development of production of Konti Hidroplast is manufacturing sewage pipes for non-pressure applications. Konti Kan Spiral pipe and complete range of Konti Kan Spiral fittings.",
    "spiralPipes.constructionDescription": "Konti Kan Spiral pipes are made of hollow PE-HD sections helically wound on a drum with a specific diameter. Konti Kan Spiral Pipe provides all technical advantages of equivalent polyethylene solid wall pipe with substantial saving in weight combining greater ease of installation with increased cost effectiveness. Its unique structure can offer a range of pipe sizes and ring stiffness, depending of customers requirements.",
    "spiralPipes.rawMaterialCharacteristics": "The characteristics of raw material and the technology of production are combined to insure application in:",
    "spiralPipes.municipalityInfrastructure": "Municipality for infrastructure objects",
    "spiralPipes.industry": "Industry",
    "spiralPipes.roadsBuilding": "Roads building",
    "spiralPipes.reconstruction": "Reconstruction",
    "spiralPipes.technicalAdvantages": "Konti Kan Spiral provides all technical advantages as well as polyethylene or polypropylene pipes with solid wall, the only difference is that Konti Kan Spiral are significantly lighter in weight and thus for the installation, which is also financially viable.",
    "spiralPipes.colorLength": "Color: Black (other color on request) | Length: 6m",
    "spiralPipes.connectionMethods": "For connection of the pipes and fittings Konti Kan spiral pipe are use the following methods:",
    "spiralPipes.socketEpdm": "Connection with socket +EPDM gasket",
    "spiralPipes.extrusionWeldingBoth": "Extrusion welding from both side",
    "spiralPipes.extrusionWeldingInside": "Extrusion welding inside",
    "spiralPipes.threadConnection": "Connection with thread with inside welding or with thermo shrink tape",
    "spiralPipes.electroFusion": "Electro fusion connection",
    "spiralPipes.metalConnection": "Connection with metal part with inside rubber layer",
    "spiralPipes.buttWelding": "But welding",
    "spiralPipes.kontiKanSpiralPipes": "KONTI KAN SPIRAL Pipes",
    "spiralPipes.pipeDescription": "KONTI KAN SPIRAL PIPE is made of PEHD profile spirally wound on a drum with a specific diameter. It contains all technical advantages of equivalent polyethylene pipes with full walls significantly decreasing the weight, providing much easier installation and increased efficiency.",
    
    // Material Properties
    "spiralPipes.materialProperties": "Material Properties:",
    "spiralPipes.hdpeMaterial": "High-Density Polyethylene (HDPE)",
    "spiralPipes.lightweightStrong": "Lightweight but strong, with high tensile strength",
    "spiralPipes.chemicalBiologicalResistance": "Excellent resistance to chemical and biological degradation",
    "spiralPipes.flexibleResistant": "Flexible and resistant to environmental stress cracking",
    
    // Applications
    "spiralPipes.application": "Application:",
    "spiralPipes.sewerageStormwater": "Sewerage and stormwater drainage systems",
    "spiralPipes.waterTransportStorage": "Large-scale water transport and storage",
    "spiralPipes.industrialEffluent": "Industrial effluent pipelines",
    "spiralPipes.culvertsIrrigation": "Culverts and irrigation systems",
    "spiralPipes.ventilationDucts": "Ventilation ducts in mines",
    
    // Characteristics
    "spiralPipes.characteristics": "Characteristics:",
    "spiralPipes.stiffnessClasses": "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or even higher for specific applications",
    "spiralPipes.diameterRange": "Suitable for pipes with diameters ranging from Ø 1300 – 2000 mm",
    "spiralPipes.color": "Color: Black (other color on request)",
    "spiralPipes.length": "Length: 6m",
    "spiralPipes.acidAlkalineResistance": "Resistant to both acidic and alkaline environments",
    "spiralPipes.serviceLife": "Service life of over 50 years under normal conditions",
    "spiralPipes.aboveGroundUse": "Can be used above ground with UV-stabilized formulations",
    "spiralPipes.temperatureRange": "Functional between -40°C to +60°C",
    "spiralPipes.fullyRecyclable": "Fully recyclable",
    "spiralPipes.downloadSpecs": "Download Specs",
    "spiralPipes.downloadBrochure": "Download Brochure",
    
    // Manufacturing and Standards
    "spiralPipes.kontiKanSpiralManufacturing": "KONTI KAN SPIRAL Manufacturing",
    "spiralPipes.connectionMethodsStandards": "Connection Methods & Standards",
    "spiralPipes.referenceStandards": "Reference Standards",
    "spiralPipes.applicationColumn": "Application",
    "spiralPipes.standardEN13476_1": "EN 13476-1:2007",
    "spiralPipes.sewageSystem": "Sewage System – waste water and combined systems",
    "spiralPipes.standardEN13476_2": "EN 13476-2:2007",
    "spiralPipes.buildingHighways": "When building highways",
    "spiralPipes.standardEN476": "EN 476:2001",
    "spiralPipes.drainageSurfaceWater": "Drainage of surface water",
    "spiralPipes.standardEN1610": "EN 1610:2002",
    "spiralPipes.residentialDrainage": "Residential drainage systems",
    "spiralPipes.standardEN1852": "EN 1852-1:1999",
    "spiralPipes.industrialPipelines": "Industrial pipelines",
    "spiralPipes.standardENV1046": "ENV 1046:2002 (Y)",
    "spiralPipes.underwaterInstallations": "Underwater installations",
    "spiralPipes.standardSFS5906": "SFS 5906:2004",
    "spiralPipes.renovation": "Renovation",
    
    // Contact
    "spiralPipes.contactTitle": "Get in Touch: Connect with Us Today!",
    "spiralPipes.contactDescriptionSpecific": "Need more information about our KONTI KAN SPIRAL pipe solutions? Contact our team of experts.",
    "spiralPipes.contactDescriptionGeneral": "Need more information about our spiral pipe solutions? Contact our team of experts.",
    "spiralPipes.contactUs": "Contact Us",
    
    // PP ML COMPACT PIPE
    "ppMlCompact.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "ppMlCompact.ppMl": "PP ML",
    "ppMlCompact.compact": "COMPACT",
    "ppMlCompact.pipe": "PIPE",
    "ppMlCompact.heroDescription": "PP ML (Polypropylene Multi-Layer) solid pipes are designed specifically for sewage and drainage systems, offering a combination of durability, efficiency, and environmental sustainability.",
    "ppMlCompact.yearsLifespan": "50+ Years Lifespan",
    "ppMlCompact.recyclable": "100% Recyclable",
    "ppMlCompact.tripleLayered": "Triple-Layered",
    "ppMlCompact.ppMlCompactPipe": "PP ML COMPACT PIPE",
    "ppMlCompact.premiumQuality": "Premium Quality",
    "ppMlCompact.technicalSpecifications": "Technical Specifications",
    "ppMlCompact.mainDescription": "PP ML compact pipe is made of high module polypropylene (PP-HM) as its basic material, with three layers. Each of the three layers has a different modified formula of the basic material, which gives specific performances in the entire quality of the pipe.",
    "ppMlCompact.productionStandard": "Production standard: EN 13476-2:2007 (Type А1) and ONR 201513:2011",
    "ppMlCompact.tripleLayeredPipe": "TRIPLE-LAYERED PIPE",
    "ppMlCompact.tripleLayerDescription": "PP ML (Three-Layer) solid pipes provide a robust, efficient, and eco-friendly solution for modern sewage systems. Their combination of structural strength, hydraulic performance, and chemical resistance makes them ideal for both municipal and industrial wastewater applications.",
    
    // Layer Construction
    "ppMlCompact.layerConstruction": "Layer Construction:",
    "ppMlCompact.innerLayer": "INNER LAYER:",
    "ppMlCompact.innerLayerDescription": "Made of modified PP with guaranteed high chemical and abrasive resistance. The smooth surface ensures good flow and prevents deposits.",
    "ppMlCompact.middleLayer": "MIDDLE LAYER:",
    "ppMlCompact.middleLayerDescription": "Impact resistant layer, even at low temperatures.",
    "ppMlCompact.outerLayer": "OUTER LAYER:",
    "ppMlCompact.outerLayerDescription": "Made of high quality PP, filled with mineral modifier; highly resistant to atmospheric agents and surface damaging. The modified PP formula ensures high UV protection, allowing external storage.",
    
    // Application
    "ppMlCompact.application": "Application:",
    "ppMlCompact.residentialMunicipalIndustrial": "Residential, municipal, and industrial wastewater systems",
    "ppMlCompact.stormwaterManagement": "Stormwater management and subsoil drainage",
    "ppMlCompact.chemicalEffluents": "Transport of chemical effluents and process water",
    "ppMlCompact.highLoadApplications": "High-load applications like culverts under roads and railways",
    
    // Characteristics
    "ppMlCompact.characteristics": "Characteristics:",
    "ppMlCompact.color": "Color: Outer orange-brown/middle black and inner light color",
    "ppMlCompact.dimensions": "Dimensions: from DN / OD 160 to 500 mm with complete range of fittings",
    "ppMlCompact.availableClasses": "Available in different classes: SN 8, SN 10, SN 12, SN 16 KN/m²",
    "ppMlCompact.manningsCoefficient": "Manning's coefficient typically around 0.009, reducing clogging",
    "ppMlCompact.serviceLife": "Expected service life exceeds 50 years under normal conditions",
    "ppMlCompact.aboveGroundSuitable": "Suitable for above-ground and exposed installations with UV-stabilized outer layers",
    "ppMlCompact.temperatureRange": "Can operate between -20°C and +90°C",
    "ppMlCompact.fullyRecyclable": "Fully recyclable material and energy-efficient production",
    "ppMlCompact.downloadSpecs": "Download Specs",
    "ppMlCompact.downloadBrochure": "Download Brochure",
    "ppMlCompact.installation": "PP ML COMPACT PIPE Installation",
    "ppMlCompact.crossSection": "PP ML COMPACT PIPE Cross Section",
    
    // Contact
    "ppMlCompact.contactTitle": "Get in Touch: Connect with Us Today!",
    "ppMlCompact.contactDescriptionSpecific": "Need more information about our PP ML COMPACT PIPE solutions? Contact our team of experts.",
    "ppMlCompact.contactDescriptionGeneral": "Need more information about our PP HM smooth OD solutions? Contact our team of experts.",
    "ppMlCompact.contactUs": "Contact Us",
    
    // Manholes
    "manholes.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "manholes.manholes": "MANHOLES",
    "manholes.heroDescription": "Both PP (Polypropylene) and HDPE (High-Density Polyethylene) manholes are widely used in modern drainage and sewage systems, offering a range of advantages in terms of durability, efficiency, and ease of installation.",
    "manholes.yearsLifespan": "50+ Years Lifespan",
    "manholes.recyclable": "100% Recyclable",
    "manholes.premiumQuality": "Premium Quality",
    "manholes.structuralForms": "Structural Forms",
    "manholes.structuralFormsDescription": "By structural form, HDPE and PP manholes can be:",
    "manholes.injectionMolded": "Injection molded – Konti Rigid manhole",
    "manholes.manufactured": "Manufactured, combination of injection molding part and corrugate pipe",
    "manholes.specialManhole": "Special manhole – tailor made, special construction of manholes (non standard). These manholes can be manufactured from KONTI KAN SPIRAL PIPE, inlet and outlet from KONTI KAN pipes.",
    
    // Key Applications
    "manholes.keyApplications": "Key Applications",
    "manholes.municipalIndustrial": "Municipal and industrial manholes",
    "manholes.sewerStormwater": "Sewer and storm water manholes",
    "manholes.siphonStructure": "Siphon structure",
    "manholes.pumpStations": "Pump stations",
    "manholes.bioTreatment": "Bio treatment of sewage",
    "manholes.sanitarySewer": "Sanitary-Sewer systems",
    "manholes.landfills": "Landfills",
    "manholes.chemicalPlants": "Chemical plants",
    
    // Manhole Types
    "manholes.manholesTypes": "Manholes Types",
    "manholes.hdpeManholes": "HDPE MANHOLES",
    "manholes.ppManholes": "PP MANHOLES",
    
    // HDPE Manholes
    "manholes.hdpeDescription": "HDPE manholes exhibit high structural strength and rigidity, capable of handling both dynamic and static loads, including traffic loads and deep burial. While stiff, HDPE manholes also have a certain degree of flexibility, allowing them to absorb slight ground movements without cracking.",
    "manholes.hdpeChemicalResistance": "HDPE is highly resistant to a wide range of chemicals, including acids, bases, and salts, making it suitable for sewage and industrial waste environments.",
    "manholes.hdpeMaterial": "High-Density Polyethylene (HDPE)",
    "manholes.hdpeChemicalBiological": "Excellent chemical and biological resistance",
    "manholes.hdpeServiceLife": "50+ years service life",
    "manholes.hdpeTemperatureRange": "-40°C to +60°C (short-term higher resistance)",
    "manholes.hdpeSmoothSurface": "Smooth inner surface, reduced friction",
    "manholes.hdpeStiffnessFlexibility": "High stiffness and flexibility for traffic loads",
    "manholes.hdpeLightweight": "Lightweight, quick installation",
    "manholes.hdpeRecyclable": "Fully recyclable, environmentally friendly",
    "manholes.hdpeAffordable": "Affordable, low long-term maintenance",
    "manholes.hdpeCostEffective": "More cost-effective than concrete alternatives",
    "manholes.downloadBrochure": "Download Brochure",
    
    // PP Manholes - Advantages
    "manholes.ppAdvantages": "Advantages of KONTI Rigid PP Manholes",
    "manholes.ppChemicalResistance": "Chemical Resistance",
    "manholes.ppChemicalResistanceDesc": "In comparison to the concrete manholes",
    "manholes.ppEconomic": "Economic",
    "manholes.ppEconomicDesc": "Reduced material costs due to optimized chamber nominal diameter",
    "manholes.ppDurable": "Durable",
    "manholes.ppDurableDesc": "Corrosion-resistant material polypropylene increases durability and protects the environment",
    "manholes.ppLeakTight": "100% Leak-tight",
    "manholes.ppLeakTightDesc": "Complete sealing ensures no leakage",
    "manholes.ppSafeInspection": "Safe and Inspection-friendly",
    "manholes.ppSafeInspectionDesc": "Inspection-friendly color orange",
    "manholes.ppFavorableInstallation": "Favorable Installation",
    "manholes.ppFavorableInstallationDesc": "Modular system ensures easy handling on the construction site",
    "manholes.ppLowerCosts": "Lower Costs",
    "manholes.ppLowerCostsDesc": "Lower wage and equipment costs due to weight and assembly advantages",
    "manholes.ppBuiltInSlope": "Built-in Slope",
    "manholes.ppBuiltInSlopeDesc": "Integrated slope design for optimal flow",
    
    // Connection Compatibility
    "manholes.connectionCompatibility": "Connection Compatibility",
    "manholes.connectionDescription": "Connection can be made with different kind of pipes:",
    "manholes.ppSmoothPipe": "Polypropylene smooth pipe",
    "manholes.pvcPipe": "PVC pipe",
    "manholes.castIron": "Cast Iron",
    "manholes.grpPipe": "GRP pipe",
    "manholes.clayPipe": "Clay pipe",
    "manholes.corrugatePipe": "Corrugate pipe",
    
    // PP Manholes Technical
    "manholes.ppDescription": "PP manholes are an excellent choice for modern sewage, stormwater, and drainage systems. They excel in chemical and biological resistance with a material that offers long-term durability, cost-effectiveness, and easy installation, making them suitable for a wide range of applications, including residential, municipal, and industrial infrastructure.",
    "manholes.ppMaterial": "Polypropylene (PP)",
    "manholes.ppChemicalBiological": "Excellent chemical and biological resistance",
    "manholes.ppServiceLife": "50+ years service life",
    "manholes.ppTemperatureRange": "-20°C to +90°C",
    "manholes.ppSmoothSurface": "Smooth inner surface, self-cleaning",
    "manholes.ppCompliesEN124": "Complies with EN 124 for heavy loads",
    "manholes.ppEasyTransport": "Easy transport, modular design",
    "manholes.ppRecyclable": "Fully recyclable, energy-efficient",
    "manholes.ppCostEffective": "Cost-effective, low maintenance",
    
    // Contact
    "manholes.contactTitle": "Get in Touch: Connect with Us Today!",
    "manholes.contactDescription": "Need more information about our manhole solutions? Contact our team of experts.",
    "manholes.contactUs": "Contact Us",
    
    // Drainage
    "drainage.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "drainage.kontikan": "KONTIKAN",
    "drainage.drainage": "DRAINAGE",
    "drainage.heroDescription": "Drainage Polypropylene (PP) pipes are widely used in drainage systems for managing groundwater, excess surface water, and wastewater. These pipes are designed with precision slots or perforations to allow water infiltration.",
    "drainage.yearsLifespan": "50+ Years Lifespan",
    "drainage.recyclable": "100% Recyclable",
    "drainage.premiumQuality": "Premium Quality",
    
    // Standards & Compliance
    "drainage.standardsCompliance": "Standards & Compliance",
    "drainage.standardsDescription": "PP slotted pipes are manufactured to comply with standards such as EN 1852, EN 13476, DIN 4262-1 (TYPE R3) or equivalent local drainage pipe regulations, ensuring quality and reliability.",
    "drainage.slotPatternsDescription": "Available with different slot patterns (e.g., longitudinal, spiral, or circumferential) to optimize water collection based on the application.",
    
    // Slot Patterns
    "drainage.slotPatternsAvailable": "Slot Patterns Available",
    "drainage.ppPartiallyPerforated": "PP - Partially perforated",
    "drainage.optimizedControlledInfiltration": "Optimized for controlled water infiltration",
    "drainage.mpMultipurpose": "MP - Multipurpose",
    "drainage.versatileSolution": "Versatile solution for various applications",
    "drainage.fpFullyPerforated": "FP - Fully perforated",
    "drainage.maximumWaterCollection": "Maximum water collection capacity",
    
    // Key Applications
    "drainage.keyApplications": "Key Applications",
    "drainage.applicationsDescription": "Suitable for agriculture (irrigation), infrastructure projects (road and slope drainage), and residential or commercial water management systems. Can be easily connected to other drainage components, such as catch basins and manholes, using standard fittings.",
    "drainage.agriculture": "Agriculture (irrigation)",
    "drainage.infrastructureProjects": "Infrastructure projects (road and slope drainage)",
    "drainage.residentialWaterManagement": "Residential water management systems",
    "drainage.commercialWaterManagement": "Commercial water management systems",
    "drainage.subsurfaceDrainage": "Subsurface drainage",
    "drainage.slopeStabilization": "Slope stabilization",
    "drainage.groundwaterManagement": "Groundwater management",
    "drainage.surfaceWaterManagement": "Surface water management",
    
    // KONTI DREN
    "drainage.kontiDren": "KONTI DREN",
    "drainage.kontiDrenDescription": "Drainage PP pipes offer an efficient, durable, and eco-friendly solution for managing water in a variety of drainage applications. Their lightweight nature, structural strength, and long lifespan make them a cost-effective choice for modern water management systems.",
    "drainage.materialDescription": "Polypropylene is resistant to wear and tear, ensuring long-term performance in harsh environments. PP pipes are highly resistant to chemicals, including acids, alkalis, and salts commonly found in wastewater and drainage applications.",
    
    // Characteristics
    "drainage.durableChemicalResistant": "Durable, chemical-resistant, non-corrosive",
    "drainage.smoothInnerSurface": "Smooth inner surface, controlled infiltration",
    "drainage.highRingStiffness": "High ring stiffness, flexible under soil pressure",
    "drainage.temperatureRange": "Operates between -20°C and +90°C",
    "drainage.optimizedInfiltration": "Optimized for water infiltration, debris exclusion",
    "drainage.pipeRange": "Range of pipe: DN 110-1000 mm",
    "drainage.uvStabilized": "UV-stabilized, eco-friendly, recyclable",
    "drainage.lightweightEasyInstall": "Lightweight, easy to transport and install",
    "drainage.minimalMaintenance": "Minimal maintenance due to clog resistance and durability",
    "drainage.serviceLife": "Service life 50+ years",
    
    // Downloads
    "drainage.downloadSpecs": "Download Specs",
    "drainage.downloadBrochure": "Download Brochure",
    
    // Contact
    "drainage.contactTitle": "Get in Touch: Connect with Us Today!",
    "drainage.contactDescriptionCableProtection": "Need more information about our cable protection solutions? Contact our team of experts.",
    "drainage.contactDescriptionDrainage": "Need more information about our drainage solutions? Contact our team of experts.",
    "drainage.contactUs": "Contact Us",
    
    // Common Product Page Elements
    "productPages.engineeredForExcellence": "ENGINEERED FOR EXCELLENCE",
    "productPages.premiumQuality": "Premium Quality",
    "productPages.technicalSpecifications": "Technical Specifications",
    "productPages.generalProperties": "General Properties",
    "productPages.downloadSpecs": "Download Specs",
    "productPages.downloadBrochure": "Download Brochure",
    "productPages.downloadPdf": "Download PDF",
    "productPages.learnMore": "Learn More",
    "productPages.contactExperts": "Contact our team of experts",
    "productPages.needMoreInfo": "Need more information about our",
    "productPages.solutions": "solutions",
    "productPages.qualityAssurance": "QUALITY ASSURANCE",
    "productPages.productDocumentation": "PRODUCT DOCUMENTATION",
    "productPages.productBrochures": "PRODUCT BROCHURES",
    "productPages.andCatalogs": "& CATALOGS",
    "productPages.brochuresDescription": "Download comprehensive product documentation, technical specifications, and catalogs for all our pipe and fitting solutions.",
    "productPages.certificatesStandards": "Certificates & Standards",
    "productPages.qualityCertificates": "QUALITY CERTIFICATES",
    "productPages.andStandards": "& STANDARDS",
    "productPages.certificatesDescription": "Official certificates and quality assurance documentation demonstrating our commitment to international standards and environmental responsibility.",
    "productPages.isoCertified": "ISO Certified",
    "productPages.qualityAssured": "Quality Assured",
    "productPages.europeanStandards": "European Standards",
    "productPages.loadingCertificates": "Loading certificates...",
    "productPages.errorLoadingCertificates": "Error loading certificates. Using cached data.",
    "productPages.certificateOnly": "Certificate Only",
    "productPages.download": "Download",
    
    // News Page
    "newsPage.latestUpdates": "LATEST UPDATES",
    "newsPage.fromKonti": "FROM KONTI",
    "newsPage.loadingArticles": "Loading news articles...",
    "newsPage.loading": "Loading...",
    "newsPage.readMore": "Read More",
    "newsPage.noImage": "No Image",
    "newsPage.newsCategory": "NEWS",
    "newsPage.noDescription": "No description available",
    "newsPage.showingArticles": "Showing {current} of {total} articles",
    "newsPage.noNewsYet": "No News Articles Yet",
    "newsPage.checkBackSoon": "Check back soon for the latest updates and insights from Konti Hidroplast.",
    "newsPage.allArticlesShown": "You've seen all our latest news articles!",
    "newsPage.checkBackMore": "Check back soon for more updates and insights.",
    "newsPage.wantToStayUpdated": "Want to stay updated with our latest news and innovations? Contact our team for more information.",
    
    // Career Page
    "careerPage.joinOurTeam": "JOIN OUR TEAM",
    "careerPage.alwaysOnLookout": "ALWAYS ON THE",
    "careerPage.lookoutFor": "LOOKOUT FOR",
    "careerPage.topTalent": "TOP TALENT",
    "careerPage.heroDescription": "Join Konti Hidroplast and become part of a team dedicated to excellence in pipe manufacturing. We're looking for talented professionals to grow with us.",
    "careerPage.dynamicTeam": "Dynamic Team",
    "careerPage.professionalGrowth": "Professional Growth",
    "careerPage.careerDevelopment": "Career Development",
    "careerPage.apply": "Apply",
    "careerPage.applyDescription": "Submit your application to join our team of talented professionals.",
    "careerPage.fullName": "Full Name*",
    "careerPage.email": "E-mail*",
    "careerPage.phoneNumber": "Phone number*",
    "careerPage.message": "Message",
    "careerPage.uploadFile": "Click or drag a file to this area to upload *",
    "careerPage.fileFormats": "PDF, DOC, DOCX (Max 10MB)",
    "careerPage.clickToChange": "Click to change file",
    "careerPage.submitting": "Submitting...",
    "careerPage.submit": "Submit",
    "careerPage.contactInformation": "Contact Information",
    "careerPage.applicationSubmitted": "Application Submitted!",
    "careerPage.thankYouMessage": "Thank you for your interest. We'll review your application and get back to you soon.",
    "careerPage.submissionFailed": "Submission Failed",
    "careerPage.submissionError": "There was an error submitting your application. Please try again.",
    
    // Not Found Page
    "notFound.title": "404 Page Not Found",
    "notFound.message": "Did you forget to add the page to the router?",
    
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
    "newsPage.insights": "INSIGHTS",
    
    // Common translations
    "common.news": "News",
    "common.contactUs": "Contact Us",
    
    // Contact translations
    "contact.getInTouch": "Get in Touch",
    "contact.needMoreInfo": "Need more information? Contact our team for more details.",
    "contact.connectWithUs": "Get in Touch: Connect with Us Today!",
    "contact.stayUpdated": "Want to stay updated with our latest news and innovations? Contact our team for more information.",
    
    // Brochures Page
    "brochures.currentLanguage": "Current Language:",
    "brochures.productBrochures": "Product Brochures",
    "brochures.noBrochuresAvailable": "No brochures available for",
    "brochures.switchLanguages": "Switch languages or check back later for updated content.",
    "brochures.noPdfAvailable": "No PDF Available",

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
    "hero.title.line1": "Непревзојдени европски",
    "hero.title.line2": "стандарди",
    "hero.title.line3": "за прецизност на цевководи",
    "hero.banner.title": "ВИСОКО-КВАЛИТЕТНИ ЦЕВКИ",
    "hero.banner.subtitle": "ДВИЖЕЈЌИ НАПРЕДОК СО ИНОВАЦИИ",
    "hero.videoTitle": "Конти Хидропласт корпоративно видео",

    // About Us
    "aboutUs.title": "За нас",
    "aboutUs.subtitle": "Нашата мисија",
    "aboutUs.mission": "Мисија",
    "aboutUs.missionText":
      "Да водиме со инновации, да доставуваме по европски стандарди и да бидеме предни во индустријата.",
    "aboutUs.vision": "Визија",
    "aboutUs.visionText":
      "Да бидеме водечка компанија во производството на цевки со фокус на околната средина и безбедност на работниците.",
    "aboutUs.values": "Вредности",
    "aboutUs.valuesText":
      "Конти Хидропласт е посветена да води индустријата со висококвалитетни, еколошки пријателски цевки, приоритетизирајќи заштита на околната средина и безбедност на работниците.",
    "aboutUs.timelineTitle": "Нашата патека",
    "aboutUs.projectsTitle": "Проекти",
    "aboutUs.leadership": "Руководство",
    "aboutUs.facilities": "Нашите инсталации",
    "aboutUs.gallery": "Галерија",
    "aboutUs.manufacturingExcellence": "Изработка од врв",
    "aboutUs.companyStory": "Историја на компанијата",
    "aboutUs.companyStoryText1":
      "Конти Хидропласт е основана во 1975 година со цел да се изгради солидна основа за производство на висококвалитетни цевки од полиетилен.",
    "aboutUs.companyStoryText2":
      "Од тога време, компанијата се развиваше и експанзираше, водејќи се со стремеж да доставува највисоки стандарди на квалитет и услуги на своите клиенти.",
    "aboutUs.companyStoryText3":
      "Конти Хидропласт постана позната на пазарот со квалитетна достава и постоянно примена на флексибилност во операциите, што е многу важно во индустрија каде комплексноста на управување со сите процеси е доста висока.",
    "aboutUs.companyStoryText4":
      "Еден од кључните фактори за одржливост во тешко конкуренција е постоянното инвестирање во инновативни технологии и постигање општо технолошки напредок. Комбинацијата на сите кључни фактори придонесуваат за тоа Конти Хидропласт да игра важна улога на домашниот и страниот пазар со постоянство присуство на сите главни и помални инфраструктурни проекти.",
    "aboutUs.since1975": "Од 1975 година",
    "aboutUs.leadershipMessage": "Порака од руководството",
    "aboutUs.leadershipTitle": "Изградување на иднината на инфраструктурата",
    "aboutUs.leadershipDescription1": "Конти Хидропласт, нашата мисија е винаги била јасна: да водиме со инновации, да доставуваме по европски стандарди и да бидеме предни во нашата индустрија. Ние сме посветени да создаваме одржливи решения, да се прошируваме на нови пазари и да споделуваме познавања со сите кои бараат да растат.",
    "aboutUs.leadershipDescription2": "Нашата визија е да бидеме водечка компанија во производството на цевки со фокус на околната средина и безбедност на работниците. Ние сме посветени да доставуваме висококвалитетни производи, да бидеме инновативни и да се погрижиме за нашите работници и заедница.",
    "aboutUs.leadershipDescription3": "Нашата мисија е да бидеме водечка компанија во производството на цевки со фокус на околната средина и безбедност на работниците. Ние сме посветени да доставуваме висококвалитетни производи, да бидеме инновативни и да се погрижиме за нашите работници и заедница.",

    // Products
    "productsPage.title": "Нашите производи",
    "productsPage.subtitle": "Целосна решение за цевководи",
    "productsPage.waterSupply": "Системи за водоснабдување",
    "productsPage.sewerageTitle": "Канализациски системи",
    "productsPage.gasTitle": "Системи за гасоводи",
    "productsPage.cableTitle": "Заштита на кабли",
    "productsPage.specifications": "Технички спецификации",
    "productsPage.applications": "Апликации",
    "productsPage.features": "Клучни карактеристики",
    "productsPage.benefits": "Бенефити",

    // Water Supply Systems
    "waterSupply.title": "Системи за водоснабдување",
    "waterSupply.subtitle": "Поуздани PE цевки за дистрибуција на вода",
    "waterSupply.description":
      "Висококвалитетни полиетиленски цевки дизајнирани за дистрибуција на пиејна вода и општински водоснабдувачки системи.",

    // Gas Pipeline Systems
    "gasPipeline.title": "Системи за гасоводи",
    "gasPipeline.subtitle": "Безбедни и трајни решения за дистрибуција на гас",
    "gasPipeline.description":
      "Специјализирани PE цевки за дистрибуција на природен гас со подобрувани безбедни карактеристики.",

    // Cable Protection
    "cableProtection.title": "Системи за заштита на кабли",
    "cableProtection.subtitle": "Заштита на критични инфраструктури",
    "cableProtection.description":
      "Робусни кондукти за телекомуникации и електрични кабли.",

    // Konti Kan Products
    "kontiKan.pipes.title": "HDPE Конти Кан ОД",
    "kontiKan.pipes.subtitle": "Високогустина полиетиленски цевки",
    "kontiKan.drainage.title": "Конти Кан дренажа",
    "kontiKan.drainage.subtitle": "Напредни решения за дренажа",
    "kontiKan.spiral.title": "Конти Кан спирални HDPE/ID",
    "kontiKan.spiral.subtitle": "Цевки со голем пречник со спирална конструкција",

    // PP HM Products
    "ppHm.pipes.title": "PPHM Конти Кан ИД",
    "ppHm.pipes.subtitle": "Полипропиленски цевки со висок модул",
    "ppHm.smooth.title": "ПП МЛ компактни цевки ОД",
    "ppHm.smooth.subtitle": "Цевки од полипропилен со глатка површина",

    // Manholes
    "manholes.title": "Шахти",
    "manholes.subtitle": "Целосна решение за шахти",
    "manholes.description":
      "Целосна решение за шахти за канализација и пристап до услуги.",

    // News Page
    "newsPage.title": "Најнови вести",
    "newsPage.subtitle": "Индустриски новости и компаниски вести",
    "newsPage.noNews": "Нема достапни вести",
    "newsPage.loadMore": "Вчитај повеќе вести",
    "newsPage.backToNews": "Назад кон вестите",
    "newsPage.noContent.line1":
      "Оваа вест сега се ажурира со повеќе детални содржини.",
    "newsPage.noContent.line2": "Проверете подоцна за целосната вест.",
    "newsPage.insights": "ИНСАЈТИ",
    
    // Common translations
    "common.news": "Вести",
    "common.contactUs": "Контактирајте не",
    
    // Contact translations
    "contact.getInTouch": "Стигнете до нас",
    "contact.needMoreInfo": "Потребни ви се повеќе информации? Контактирајте го нашиот тим за повеќе детали.",
    "contact.connectWithUs": "Стигнете до нас: Стигнете во контакт со нас денес!",
    "contact.stayUpdated": "Сакате да бидете во тек со нашите најнови вести и инновации? Контактирајте го нашиот тим за повеќе информации.",
    
    // Brochures Page
    "brochures.currentLanguage": "Тековен јазик:",
    "brochures.productBrochures": "Брошури за производи",
    "brochures.noBrochuresAvailable": "Нема достапни брошури за",
    "brochures.switchLanguages": "Променете јазик или проверете подоцна за ажурирано содржина.",
    "brochures.noPdfAvailable": "Нема достапен PDF",

    // Certificates Page
    "certificates.title": "Сертификати и стандарди",
    "certificates.subtitle": "Осигурување на квалитет и соодветност",
    "certificates.quality": "Управување со квалитет",
    "certificates.environmental": "Еколошки стандарди",
    "certificates.safety": "Безбедни сертификати",
    "certificates.product": "Сертификати за производи",

    // Brochures Page
    "brochures.title": "Брошури за производи",
    "brochures.subtitle": "Техничка документација и информации за производи",
    "brochures.downloadPdf": "Преземи PDF",
    "brochures.viewDetails": "Погледни детали",

    // Career Page
    "career.title": "Кариерни прилики",
    "career.subtitle": "Придружете се на нашиот растечки тим",
    "career.description":
      "Бидете дел од нашата мисија да доставуваме одличност во производството на цевки.",
    "career.openPositions": "Отворени позиции",
    "career.noPositions": "Нема достапни отворени позиции",
    "career.applicationForm": "Апликациска форма",
    "career.personalInfo": "Лични информации",
    "career.firstName": "Име",
    "career.lastName": "Презиме",
    "career.email": "Е-пошта",
    "career.phone": "Телефонски број",
    "career.position": "Позиција на која се аплицира",
    "career.resume": "Подигни CV",
    "career.coverLetter": "Мотивационо писмо",
    "career.submitApplication": "Подигни апликација",

    // Gallery Pages
    "gallery.title": "Галерија",
    "gallery.production": "Производство",
    "gallery.qualityControl": "Контрола на квалитет",
    "gallery.storage": "Складирање",
    "gallery.projects": "Проекти",
    "gallery.facilities": "Нашите инсталации",
    "gallery.viewImage": "Погледни слика",
    "gallery.closeImage": "Затвори слика",

    // Admin Panel
    "admin.title": "Админ панел",
    "admin.dashboard": "Контролна табла",
    "admin.overview": "Преглед",
    "admin.logout": "Одјави се",
    "admin.welcome": "Добредојдовте во Админ панелот",
    "admin.statistics": "Статистики",
    "admin.quickActions": "Брзи акции",
    "admin.systemInfo": "Информации за системот",

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
    "admin.contacts": "Пораки од контакти",
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
    "admin.create": "Креирај",
    "admin.view": "Погледни",
    "admin.manage": "Управувај",
    "admin.upload": "Подигни",
    "admin.download": "Преземи",
    "admin.export": "Извези",
    "admin.import": "Увези",
    "admin.search": "Пребарувај",
    "admin.filter": "Филтрирај",
    "admin.sort": "Подреди",
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
    "admin.error": "Се појави грешка",
    "admin.success": "Операцијата е успешно завршена",
    "admin.warning": "Предупредување",
    "admin.confirm.delete": "Дали сте сигурни дека сакате да го избришете овој предмет?",
    "admin.noData": "Нема достапни податоци",
    "admin.selectFile": "Избери датотека",
    "admin.dragDropFile": "Повлечете и спуштете датотека овде или кликнете за да изберете",
    "admin.fileUploaded": "Датотеката е успешно подигната",
    "admin.fileUploadError": "Грешка при подигање на датотека",

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
    "admin.form.placeholder.search": "Типкајте за пребарување...",

    // Admin Tables
    "admin.table.actions": "Акции",
    "admin.table.createdAt": "Креирано",
    "admin.table.updatedAt": "Ажурирано",
    "admin.table.status": "Статус",
    "admin.table.noResults": "Нема пронајдени резултати",
    "admin.table.showing": "Прикажувам",
    "admin.table.of": "од",
    "admin.table.entries": "записи",
    "admin.table.previous": "Претходно",
    "admin.table.next": "Следно",

    // News Management
    "admin.news.title": "Управување со вести",
    "admin.news.addArticle": "Додај нова вест",
    "admin.news.editArticle": "Уреди вест",
    "admin.news.articles": "Вести",
    "admin.news.published": "Објавено",
    "admin.news.draft": "Нацрт",
    "admin.news.sections": "Секции на вести",
    "admin.news.addSection": "Додај секција",
    "admin.news.sectionType": "Тип на секција",
    "admin.news.textOnly": "Само текст",
    "admin.news.imageOnly": "Само слика",
    "admin.news.textWithImage": "Текст со слика",
    "admin.news.imagePosition": "Позиција на слика",
    "admin.news.left": "Лево",
    "admin.news.right": "Десно",

    // Gallery Management
    "admin.gallery.title": "Управување со галерија",
    "admin.gallery.categories": "Категории на галерија",
    "admin.gallery.items": "Предмети во галерија",
    "admin.gallery.addCategory": "Додај категорија",
    "admin.gallery.addItem": "Додај предмет",
    "admin.gallery.selectCategory": "Избери категорија",

    // Certificate Management
    "admin.certificates.title": "Управување со сертификати",
    "admin.certificates.categories": "Категории на сертификати",
    "admin.certificates.subcategories": "Подкатегории",
    "admin.certificates.addCertificate": "Додај сертификат",
    "admin.certificates.uploadPdf": "Подигни PDF",

    // Team Management
    "admin.teams.title": "Управување со тимот",
    "admin.teams.members": "Членови на тимот",
    "admin.teams.addMember": "Додај член на тимот",
    "admin.teams.editMember": "Уреди член на тимот",
    "admin.teams.firstName": "Име",
    "admin.teams.lastName": "Презиме",
    "admin.teams.role": "Улога",
    "admin.teams.department": "Оддел",
    "admin.teams.bio": "Биографија",
    "admin.teams.photo": "Слика",

    // Brochures Management
    "admin.brochures.title": "Управување со брошури",
    "admin.brochures.categories": "Категории на брошури",
    "admin.brochures.addBrochure": "Додај брошура",
    "admin.brochures.uploadFile": "Подигни датотека",
    "admin.brochures.language": "Јазик",

    // Contact Messages
    "admin.contacts.title": "Пораки од контакти",
    "admin.contacts.unread": "Непрочитано",
    "admin.contacts.read": "Прочитано",
    "admin.contacts.markAsRead": "Означи како прочитано",
    "admin.contacts.reply": "Одговори",
    "admin.contacts.subject": "Предмет",
    "admin.contacts.from": "Од",
    "admin.contacts.sentAt": "Испратено на",

    // Job Applications
    "admin.applications.title": "Апликации за работа",
    "admin.applications.applicant": "Апликант",
    "admin.applications.appliedFor": "Аплицира за",
    "admin.applications.appliedAt": "Аплицира на",
    "admin.applications.resume": "CV",
    "admin.applications.coverLetter": "Мотивационо писмо",
    "admin.applications.review": "Преглед",
    "admin.applications.accept": "Прифати",
    "admin.applications.reject": "Одбиј",

    // System Settings
    "admin.settings.title": "Поставки на системот",
    "admin.settings.general": "Општи поставки",
    "admin.settings.email": "Конфигурација на е-пошта",
    "admin.settings.backup": "Резервни копии и враќање",
    "admin.settings.users": "Управување со корисници",
    "admin.settings.permissions": "Дозволи",
    "admin.settings.maintenance": "Режим на одржување",
    "admin.settings.logs": "Дневници на системот",
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
