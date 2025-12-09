import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronDown, Download, Play, Check, CheckCircle } from "lucide-react";

// KONTI KAN SPIRAL pipes translation helper function
const translateSpiralPipeText = (text: string, t: any) => {
  const translations: { [key: string]: string } = {
    // Page titles and headers
    "KONTI KAN SPIRAL": t("spiralPipes.kontiKanSpiral"),
    "KONTI KAN SPIRAL Pipes": t("spiralPipes.kontiKanSpiralPipes"),
    "KONTI KAN SPIRAL Manufacturing": t("spiralPipes.kontiKanSpiralManufacturing"),
    
    // Descriptions
    "Polyethylen wird von Kunden und Ingenieuren als ideales Rohrmaterial für zahlreiche Druck- und Nichtdruckanwendungen anerkannt – darunter Wasserversorgung, Freispiegelkanäle, Sanierungsprojekte und Schächte.": t("spiralPipes.heroDescription"),
    "KONTI KAN SPIRAL PIPE is made of PEHD profile spirally wound on a drum with a specific diameter. It contains all technical advantages of equivalent polyethylene pipes with full walls significantly decreasing the weight, providing much easier installation and increased efficiency.": t("spiralPipes.pipeDescription"),
    "Latest development of production of Konti Hidroplast is manufacturing sewage pipes for non-pressure applications. Konti Kan Spiral pipe and complete range of Konti Kan Spiral fittings.": t("spiralPipes.latestDevelopment"),
    "Konti Kan Spiral pipes are made of hollow PE-HD sections helically wound on a drum with a specific diameter. Konti Kan Spiral Pipe provides all technical advantages of equivalent polyethylene solid wall pipe with substantial saving in weight combining greater ease of installation with increased cost effectiveness. Its unique structure can offer a range of pipe sizes and ring stiffness, depending of customers requirements.": t("spiralPipes.constructionDescription"),
    "The characteristics of raw material and the technology of production are combined to insure application in:": t("spiralPipes.rawMaterialCharacteristics"),
    "Konti Kan Spiral provides all technical advantages as well as polyethylene or polypropylene pipes with solid wall, the only difference is that Konti Kan Spiral are significantly lighter in weight and thus for the installation, which is also financially viable.": t("spiralPipes.technicalAdvantages"),
    
    // Technical specifications and features
    "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or even higher for specific applications": t("spiralPipes.stiffnessClasses"),
    "Suitable for pipes with diameters ranging from Ø 1300 – 2000 mm": t("spiralPipes.diameterRange"),
    "Color: Black (other color on request)": t("spiralPipes.color"),
    "Length: 6m": t("spiralPipes.length"),
    "Service life of over 50 years under normal conditions": t("spiralPipes.serviceLife"),
    "Fully recyclable": t("spiralPipes.fullyRecyclable"),
    "Color: Black (other color on request) | Length: 6m": t("spiralPipes.colorLength"),
    
    // Material properties
    "High-Density Polyethylene (HDPE)": t("spiralPipes.hdpeMaterial"),
    "Lightweight but strong, with high tensile strength": t("spiralPipes.lightweightStrong"),
    "Excellent resistance to chemical and biological degradation": t("spiralPipes.chemicalBiologicalResistance"),
    "Flexible and resistant to environmental stress cracking": t("spiralPipes.flexibleResistant"),
    
    // Applications
    "Sewerage and stormwater drainage systems": t("spiralPipes.sewerageStormwater"),
    "Large-scale water transport and storage": t("spiralPipes.waterTransportStorage"),
    "Industrial effluent pipelines": t("spiralPipes.industrialEffluent"),
    "Culverts and irrigation systems": t("spiralPipes.culvertsIrrigation"),
    "Ventilation ducts in mines": t("spiralPipes.ventilationDucts"),
    "Municipality for infrastructure objects": t("spiralPipes.municipalityInfrastructure"),
    "Industry": t("spiralPipes.industry"),
    "Roads building": t("spiralPipes.roadsBuilding"),
    "Reconstruction": t("spiralPipes.reconstruction"),
    
    // Characteristics
    "Resistant to both acidic and alkaline environments": t("spiralPipes.acidAlkalineResistance"),
    "Can be used above ground with UV-stabilized formulations": t("spiralPipes.aboveGroundUse"),
    "Functional between -40°C to +60°C": t("spiralPipes.temperatureRange"),
    
    // Connection methods
    "For connection of the pipes and fittings Konti Kan spiral pipe are use the following methods:": t("spiralPipes.connectionMethods"),
    "Connection with socket +EPDM gasket": t("spiralPipes.socketEpdm"),
    "Extrusion welding from both side": t("spiralPipes.extrusionWeldingBoth"),
    "Extrusion welding inside": t("spiralPipes.extrusionWeldingInside"),
    "Connection with thread with inside welding or with thermo shrink tape": t("spiralPipes.threadConnection"),
    "Electro fusion connection": t("spiralPipes.electroFusion"),
    "Connection with metal part with inside rubber layer": t("spiralPipes.metalConnection"),
    "But welding": t("spiralPipes.buttWelding"),
    "Connection Methods": t("spiralPipes.connectionMethodsStandards"),
    "Various connection methods for Konti Kan spiral pipes": t("spiralPipes.connectionMethods"),
    
    // Standards table
    "Connection Methods & Standards": t("spiralPipes.connectionMethodsStandards"),
    "Reference Standards": t("spiralPipes.referenceStandards"),
    "Application": t("spiralPipes.applicationColumn"),
    "EN 13476-1:2007": t("spiralPipes.standardEN13476_1"),
    "Sewage System – waste water and combined systems": t("spiralPipes.sewageSystem"),
    "EN 13476-2:2007": t("spiralPipes.standardEN13476_2"),
    "When building highways": t("spiralPipes.buildingHighways"),
    "EN 476:2001": t("spiralPipes.standardEN476"),
    "Drainage of surface water": t("spiralPipes.drainageSurfaceWater"),
    "EN 1610:2002": t("spiralPipes.standardEN1610"),
    "Residential drainage systems": t("spiralPipes.residentialDrainage"),
    "EN 1852-1:1999": t("spiralPipes.standardEN1852"),
    "Industrial pipelines": t("spiralPipes.industrialPipelines"),
    "ENV 1046:2002 (Y)": t("spiralPipes.standardENV1046"),
    "Underwater installations": t("spiralPipes.underwaterInstallations"),
    "SFS 5906:2004": t("spiralPipes.standardSFS5906"),
    "Renovation": t("spiralPipes.renovation"),
    
    // Section headers
    "Material Properties:": t("spiralPipes.materialProperties"),
    "Application:": t("spiralPipes.application"),
    "Characteristics:": t("spiralPipes.characteristics"),
    
    // Missing characteristics that need mapping
    "Suitable for pipes with diameters ranging from Ø 1300 – 2000 mm, often used in large-scale infrastructure projects.": t("spiralPipes.diameterRange"),
    "Industry, Roads building, Reconstruction": "Industry, Roads building, Reconstruction", // This seems to be a concatenated string, handle individually
  };
  return translations[text] || text;
};

// Konti Kan Spiral Pipe specifications data
const pipeSpecifications = [
  {
    id: "konti-kan-spiral",
    title: "KONTI KAN SPIRAL",
    description:
      "KONTI KAN SPIRAL PIPE is made of PEHD profile spirally wound on a drum with a specific diameter. Designed for large diameters and high stiffness requirements.",
    features: [
      "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or even higher",
      "Dimension range: Ø 1300 – 2000 mm",
      "Color: Black (other color on request)",
      "Length: 6m",
      "Service life of over 50 years under normal conditions",
      "Fully recyclable",
    ],
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral.jpg",
    specifications:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Spiral-table-en.pdf",
    brochure:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-KONTI-SPIRAL_EN_2021_compressed.pdf",
  },
];

// Fitting types data
const fittingTypes = [
  {
    id: "connection-methods",
    title: "Connection Methods",
    description: "Various connection methods for Konti Kan spiral pipes",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Gogo_20240824_9420-24.jpg",
    items: [
      {
        name: "Connection with socket +EPDM gasket",
        pdf: null,
      },
      {
        name: "Extrusion welding from both side",
        pdf: null,
      },
      {
        name: "Extrusion welding inside",
        pdf: null,
      },
      {
        name: "Connection with thread with inside welding",
        pdf: null,
      },
      {
        name: "Electro fusion connection",
        pdf: null,
      },
      {
        name: "Connection with metal part with inside rubber layer",
        pdf: null,
      },
      {
        name: "But welding",
        pdf: null,
      },
    ],
  },
  {
    id: "reference-standards",
    title: "Reference Standards",
    description: "Compliance standards for various applications",
    image:
      "https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Gogo_20240824_9415-19.jpg",
    items: [
      {
        standard: "EN 13476-1:2007",
        application: "Sewage System – waste water and combined systems",
      },
      {
        standard: "EN 13476-2:2007",
        application: "When building highways",
      },
      {
        standard: "EN 476:2001",
        application: "Drainage of surface water",
      },
      {
        standard: "EN 1610:2002",
        application: "Residential drainage systems",
      },
      {
        standard: "EN 1852-1:1999",
        application: "Industrial pipelines",
      },
      {
        standard: "ENV 1046:2002 (Y)",
        application: "Underwater installations",
      },
      {
        standard: "SFS 5906:2004",
        application: "Renovation",
      },
    ],
  },
];

function KontiKanSpiralPipesPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTab, setActiveTab] = useState("konti-kan-spiral");
  const [activeFittingTab, setActiveFittingTab] =
    useState("connection-methods");
  const [activeProductTab, setActiveProductTab] = useState<"hdpe" | "pphm" | "spiral" | "ppml" | "manholes" | "drainage">("spiral");
  const productTabs = [
    { id: "hdpe", label: t("nav.products.hdpeKontiKan") },
    { id: "pphm", label: t("nav.products.pphmKontiKan") },
    { id: "spiral", label: t("nav.products.spiralKontiKan") },
    { id: "ppml", label: t("nav.products.ppMlCompact") },
    { id: "manholes", label: t("nav.products.manholes") },
    { id: "drainage", label: t("nav.products.drainage") },
  ];
  const handleBrochureDownload = (product: any) => {
    // Redirect to brochures page with parameter to auto-open modal
    setLocation('/brochures?from=products');
  };


  useEffect(() => {
    // Set page title
    document.title = `KONTI KAN SPIRAL – HDPE / ID - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "KONTI KAN SPIRAL PIPE is made of PEHD profile spirally wound on a drum with a specific diameter. Designed for large diameters and high stiffness requirements.",
      );
    }
  }, []);

  const referenceStandards = [
    {
      standard: "EN 13476-1:2007",
      application: "Sewage System – waste water and combined systems",
    },
    { standard: "EN 13476-2:2007", application: "When building highways" },
    { standard: "EN 476:2001", application: "Drainage of surface water" },
    { standard: "EN 1610:2002", application: "Residential drainage systems" },
    { standard: "EN 1852-1:1999", application: "Industrial pipelines" },
    { standard: "ENV 1046:2002 (У)", application: "Underwater installations" },
    { standard: "SFS 5906:2004", application: "Renovation" },
  ];

  const connectionMethods = [
    "Connection with socket +EPDM gasket",
    "Extrusion welding from both side",
    "Extrusion welding inside",
    "Connection with thread with inside welding or with thermo shrink tape",
    "Electro fusion connection",
    "Connection with metal part with inside rubber layer",
    "But welding",
  ];

  const materialProperties = [
    "High-Density Polyethylene (HDPE)",
    "Lightweight but strong, with high tensile strength.",
    "Excellent resistance to chemical and biological degradation.",
    "Flexible and resistant to environmental stress cracking.",
  ];

  const applications = [
    "Sewerage and stormwater drainage systems.",
    "Large-scale water transport and storage.",
    "Industrial effluent pipelines.",
    "Culverts and irrigation systems.",
    "Ventilation ducts in mines.",
  ];

  const characteristics = [
    "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or even higher for specific applications.",
    "Suitable for pipes with diameters ranging from Ø 1300 – 2000 mm, often used in large-scale infrastructure projects.",
    "Resistant to both acidic and alkaline environments.",
    "Service life of over 50 years under normal conditions.",
    "Can be used above ground with UV-stabilized formulations.",
    "Functional between -40°C to +60°C, with short-term resistance to higher temperatures.",
    "Fully recyclable.",
  ];

  const usageAreas = [
    "Municipality for infrastructure objects",
    "Industry",
    "Roads building",
    "Reconstruction",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="h-full w-full bg-gradient-to-l from-white/20 to-transparent transform skew-x-12"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
                <span className="text-sm font-medium">
                  ENGINEERED FOR EXCELLENCE
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                KONTI KAN
                <br />
                <span className="text-red-500">SPIRAL</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  HDPE / ID
                </span>
              </h1>
              <p
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                data-testid="hero-description"
              >
              Polyethylen wird von Kunden und Ingenieuren als ideales Rohrmaterial für zahlreiche Druck- und Nichtdruckanwendungen anerkannt – darunter Wasserversorgung, Freispiegelkanäle, Sanierungsprojekte und Schächte.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    100 % recycelbar Lebensdauer von über 50 Jahren
                  </span>
                </div>
                {/* <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">100% Recyclable</span>
                </div> */}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Gogo_20240824_9415-19.jpg"
                  alt="KONTI KAN SPIRAL pipes manufacturing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 text-white px-4 py-2 rounded-full shadow-lg bg-[#ef4444]">
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Product Overview
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
              Polyethylen wird von Kunden und Ingenieuren als ideales Rohrmaterial für zahlreiche Druck- und Nichtdruckanwendungen anerkannt – darunter Wasserversorgung, Freispiegelkanäle, Sanierungsprojekte sowie der Bau von Schächten.
              </p>
              <p className="text-lg leading-relaxed">
              Die jüngste Entwicklung bei Konti Hidroplast ist die Herstellung von Abwasserrohren für Anwendungen ohne Betriebsdruck: Konti Kan Spiralrohre und das vollständige Sortiment an Konti Kan Spiralformstücken.
              </p>
              <p className="text-lg leading-relaxed">
              Konti Kan Spiralrohre bestehen aus hohlprofiligen PE-HD-Bändern, die spiralförmig auf einen Dorn mit definiertem Durchmesser aufgewickelt werden. Diese Bauweise vereint sämtliche technischen Vorteile eines vergleichbaren Vollwandrohres aus Polyethylen mit einer deutlichen Gewichtsreduzierung. Dadurch lassen sich die Rohre einfacher installieren und wirtschaftlicher einsetzen. Aufgrund ihrer speziellen Struktur können unterschiedliche Rohrdimensionen und Ringsteifigkeiten je nach Kundenanforderung hergestellt werden.
              </p>
              <p className="text-lg leading-relaxed">
              Die Eigenschaften des Rohmaterials sowie die angewandte Produktionstechnologie gewährleisten eine zuverlässige Nutzung in folgenden Bereichen:
              </p>
              <ul className="text-lg leading-relaxed list-disc list-inside ml-4">
                <li>Kommunale Infrastrukturprojekte</li>
                <li>Industrieanlagen</li>
                <li>Straßenbau</li>
                <li>Sanierungs- und Rekonstruktionsprojekte</li>
              </ul>
              <p className="text-lg leading-relaxed">
              Konti Kan Spiral provides all technical advantages as well as polyethylene or polypropylene pipes with solid wall, the only difference is that Konti Kan Spiral are significantly lighter in weight and thus for the installation, which is also financially viable.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>Color:</strong> Black (other color on request) |{" "}
                <strong>Length:</strong> 6m
              </p>
              <p className="text-lg leading-relaxed">
              Verbindungsmöglichkeiten für Konti Kan Spiralrohre und -formstücke:
              </p>
              <ul className="text-lg leading-relaxed list-disc list-inside ml-4">
                <li>Verbindung mit Muffe und EPDM-Dichtung</li>
                <li>Extrusionsschweißen von beiden Seiten</li>
                <li>Extrusionsschweißen von innen</li>
                <li>Verbindung über Gewinde mit innenliegendem Schweißprozess oder mit Schrumpfband
                </li>
                <li>Elektroschweißverbindung</li>
                <li>Verbindung über Metallteile mit innenliegender Gummischicht</li>
                <li>Stumpfschweißen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

       {/* Sewerage sub-products tabs */}
       <section className="py-6 bg-[#1c2d56]">
        <div className="max-w-6xl mx-auto px-1 sm:px-6 lg:px-1">
          <div className="bg-white/10 rounded-xl p-2 flex flex-wrap gap-3">
            {productTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveProductTab(tab.id as typeof activeProductTab)}
                className={`px-4 py-2 rounded-lg text-sm md:text-base transition-all ${
                  activeProductTab === tab.id
                    ? "bg-white text-[#1c2d56] font-semibold shadow"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* HDPE Konti Kan Pipes Section */}
      {activeProductTab === "hdpe" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("sewagePipes.hdpeKontiKanPipes")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t("sewagePipes.hdpeKontiKanTitle")}
                </h3>
                <p className="text-white mb-6">
                  {t("sewagePipes.pipeDescription")}
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("sewagePipes.materialProperties")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("sewagePipes.hdpeMaterial"),
                    t("sewagePipes.lightweightDurable"),
                    t("sewagePipes.chemicalResistance"),
                    t("sewagePipes.nonCorrosive"),
                  ].map((property, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{property}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("sewagePipes.application")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("sewagePipes.municipalSewage"),
                    t("sewagePipes.stormwaterDrainage"),
                    t("sewagePipes.industrialWastewater"),
                    t("sewagePipes.agriculturalDrainage"),
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("sewagePipes.characteristics")}
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    t("sewagePipes.stiffnessRatings"),
                    t("sewagePipes.dimensionRange"),
                    t("sewagePipes.color"),
                    t("sewagePipes.smoothInnerSurface"),
                    t("sewagePipes.highFlowCapacity"),
                    t("sewagePipes.corrugatedOuterWall"),
                    t("sewagePipes.uvResistance"),
                    t("sewagePipes.flexibleResistant"),
                    t("sewagePipes.serviceLife"),
                    t("sewagePipes.easyHandling"),
                    t("sewagePipes.temperatureRange"),
                    t("sewagePipes.fullyRecyclable"),
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleBrochureDownload({
                      id: 'konti-kan-pipes',
                      title: 'Konti Kan Pipes and Fittings',
                      brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-Konti-Kan-siv_EN-2021-so-korekcii-MART-2021-2.pdf'
                    })}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("sewagePipes.downloadBrochure")}
                  </button>
                </div>
              </div>

              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/09/konti-kan-1.jpg"
                      alt={t("sewagePipes.hdpeKontiKanPipes")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="/attached_assets/Konti-Hidroplast-Proizvodstvo-27-1 (1)_1755354410219.jpg"
                      alt={t("sewagePipes.hdpeKontiKanManufacturing")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Konti Kan Drainage content (inline tab) */}
      {activeProductTab === "drainage" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("drainage.kontiDren")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white mb-6">
                {t("drainage.kontiDrenDescription")}
              </p>
              <p className="text-white mb-6">
                {t("drainage.materialDescription")}
              </p>

              <div className="space-y-3 mb-8">
                {[
                  t("drainage.durableChemicalResistant"),
                  t("drainage.smoothInnerSurface"),
                  t("drainage.highRingStiffness"),
                  t("drainage.temperatureRange"),
                  t("drainage.optimizedInfiltration"),
                  t("drainage.pipeRange"),
                  t("drainage.uvStabilized"),
                  t("drainage.lightweightEasyInstall"),
                  t("drainage.minimalMaintenance"),
                  t("drainage.serviceLife"),
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleBrochureDownload({
                    id: 'konti-kan-drainage',
                    title: 'Konti Kan Drainage',
                    brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/konti-kan-drenaza-en.pdf'
                  })}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("productPages.downloadPdf")}
                </button>
              </div>
            </div>

            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/drenazni-cevki-1.jpg"
                  alt="Konti Kan Drainage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
      {/* Schächte (Manholes) content (inline tab) */}
      {activeProductTab === "manholes" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("manholes.manholes")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tabs mimic: show HDPE by default with key bullets and image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {t("manholes.hdpeManholes")}
              </h3>
              <p className="text-white mb-6">
                {t("manholes.hdpeDescription")}
              </p>

              <div className="space-y-3 mb-8">
                {[
                  t("manholes.hdpeMaterial"),
                  t("manholes.hdpeChemicalBiological"),
                  t("manholes.hdpeServiceLife"),
                  t("manholes.hdpeTemperatureRange"),
                  t("manholes.hdpeSmoothSurface"),
                  t("manholes.hdpeStiffnessFlexibility"),
                  t("manholes.hdpeLightweight"),
                  t("manholes.hdpeRecyclable"),
                  t("manholes.hdpeAffordable"),
                  t("manholes.hdpeCostEffective"),
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleBrochureDownload({
                    id: 'manholes',
                    title: 'HDPE Manholes',
                    brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/sahti-en.pdf'
                  })}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("manholes.downloadBrochure")}
                </button>
              </div>
            </div>

            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/1-8.jpg"
                  alt="HDPE Manholes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* PP Manholes brief */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {t("manholes.ppManholes")}
              </h3>
              <p className="text-white mb-6">
                {t("manholes.ppDescription")}
              </p>
              <div className="space-y-3 mb-8">
                {[
                  t("manholes.ppMaterial"),
                  t("manholes.ppTemperatureRange"),
                  t("manholes.ppSmoothSurface"),
                  t("manholes.ppCompliesEN124"),
                  t("manholes.ppEasyTransport"),
                  t("manholes.ppRecyclable"),
                  t("manholes.ppCostEffective"),
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleBrochureDownload({
                    id: 'pp-manholes',
                    title: 'PP Manholes',
                    brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-en.pdf'
                  })}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("manholes.downloadBrochure")}
                </button>
              </div>
            </div>

            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/polipropilenski-sahti-1.jpg"
                  alt="PP Manholes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
      {/* PPHM Konti Kan ID content (inline tab) */}
      {activeProductTab === "pphm" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("ppHmPipes.ppHmKontiKanPipes")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t("ppHmPipes.ppHmKontiKanTitle")}
                </h3>
                <p className="text-white mb-6">
                  {t("ppHmPipes.pipeDescription")}
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("ppHmPipes.materialProperties")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("ppHmPipes.ppMaterial"),
                    t("ppHmPipes.strengthToWeightRatio"),
                    t("ppHmPipes.chemicalThermalResistance"),
                    t("ppHmPipes.abrasionResistance"),
                    t("ppHmPipes.rigidDurable"),
                  ].map((property, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{property}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("ppHmPipes.application")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("ppHmPipes.municipalIndustrialWastewater"),
                    t("ppHmPipes.stormwaterHarvesting"),
                    t("ppHmPipes.roadRailInfrastructure"),
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("ppHmPipes.characteristics")}
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    t("ppHmPipes.corrugatedStructure"),
                    t("ppHmPipes.smoothInnerWall"),
                    t("ppHmPipes.stiffnessRatings"),
                    t("ppHmPipes.dimensionRange"),
                    t("ppHmPipes.color"),
                    t("ppHmPipes.manningsCoefficient"),
                    t("ppHmPipes.highFlowRates"),
                    t("ppHmPipes.uvStabilized"),
                    t("ppHmPipes.serviceLife"),
                    t("ppHmPipes.temperatureRange"),
                    t("ppHmPipes.fullyRecyclable"),
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleBrochureDownload({
                      id: 'pp-hm-pipes',
                      title: 'PP-HM Pipes and Fittings',
                      brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-PPHM_EN-2024_posledna-promena_MART_compressed.pdf'
                    })}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("ppHmPipes.downloadBrochure")}
                  </button>
                </div>
              </div>

              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/1000x1000-2.jpg"
                      alt={t("ppHmPipes.ppHmKontiKanPipes")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/1000x1000.jpg"
                      alt={t("ppHmPipes.ppHmManufacturing")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Konti Kan Spiral HDPE/ID content (inline tab) */}
      {activeProductTab === "spiral" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                {t("spiralPipes.kontiKanSpiralPipes")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t("spiralPipes.kontiKanSpiral")}
                </h3>
                <p className="text-white mb-6">
                  {t("spiralPipes.heroDescription")}
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("spiralPipes.materialProperties")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("spiralPipes.hdpeMaterial"),
                    t("spiralPipes.lightweightStrong"),
                    t("spiralPipes.chemicalBiologicalResistance"),
                    t("spiralPipes.flexibleResistant"),
                  ].map((property, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{property}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("spiralPipes.application")}
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    t("spiralPipes.sewerageStormwater"),
                    t("spiralPipes.waterTransportStorage"),
                    t("spiralPipes.industrialEffluent"),
                    t("spiralPipes.culvertsIrrigation"),
                    t("spiralPipes.ventilationDucts"),
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  {t("spiralPipes.characteristics")}
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    t("spiralPipes.stiffnessClasses"),
                    t("spiralPipes.diameterRange"),
                    t("spiralPipes.colorLength"),
                    t("spiralPipes.acidAlkalineResistance"),
                    t("spiralPipes.serviceLife"),
                    t("spiralPipes.aboveGroundUse"),
                    t("spiralPipes.temperatureRange"),
                    t("spiralPipes.fullyRecyclable"),
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleBrochureDownload({
                      id: 'konti-kan-spiral',
                      title: 'Konti Kan Spiral Pipes',
                      brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-KONTI-SPIRAL_EN_2021_compressed.pdf'
                    })}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("productPages.downloadPdf")}
                  </button>
                </div>
              </div>

              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/konti-kan-spiral.jpg"
                      alt="KONTI KAN SPIRAL Pipes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Gogo_20240824_9420-24.jpg"
                      alt="KONTI KAN SPIRAL Manufacturing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* PP ML Kompaktrohre OD (PP-HM Smooth OD) content (inline tab) */}
      {activeProductTab === "ppml" && (
      <section className="py-10 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                Material Properties
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-white mb-6">
                  PP-HM smooth OD pipes are manufactured using high-modulus polypropylene, providing superior mechanical properties and long-term performance in demanding applications.
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  Material Properties:
                </h4>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-orange-300 mb-2">Polypropylene High Modulus (PP-HM):</h5>
                    <p className="text-white text-sm">High stiffness and strength for demanding applications</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-gray-300 mb-2">High stiffness and strength for demanding applications:</h5>
                    <p className="text-white text-sm">Excellent resistance to chemicals and biological degradation</p>
                  </div>
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h5 className="font-bold text-yellow-300 mb-2">Superior dimensional stability and creep resistance:</h5>
                    <p className="text-white text-sm">Superior dimensional stability and creep resistance</p>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Application:
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "Sewerage and stormwater drainage systems",
                    "Industrial effluent and chemical waste pipelines",
                    "High-temperature applications",
                    "Chemical processing plants",
                    "Municipal infrastructure projects",
                    "Agricultural drainage systems",
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Characteristics:
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    "High ring stiffness for structural integrity",
                    "Excellent chemical resistance to acids, bases, and solvents",
                    "Superior temperature resistance up to 90°C",
                    "Low thermal expansion coefficient",
                    "High impact resistance and toughness",
                    "Smooth inner surface for optimal flow",
                    "UV-stabilized for outdoor applications",
                    "Lightweight and easy to handle",
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{characteristic}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleBrochureDownload({
                      id: 'pp-hm-smooth-od',
                      title: 'PP-HM Smooth OD Pipes',
                      brochure: 'https://konti-hidroplast.com.mk/wp-content/uploads/2024/12/Broshura-Cevki-PPHM-Smooth-Wall_EN2021_compressed.pdf'
                    })}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </button>
                </div>
              </div>

              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/pphm-smooth1-min.jpg"
                      alt="PP-HM SMOOTH OD Installation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] bg-black rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src="https://konti-hidroplast.com.mk/wp-content/uploads/2024/11/pphm-smooth-2-min.jpg"
                      alt="PP-HM SMOOTH OD Cross Section"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* KONTI KAN SPIRAL Connection & Standards Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                Connection Methods & Standards
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Reference Standards
                    </th>
                    <th className="border border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Application
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      standard: "EN 13476-1:2007",
                      application:
                        "Sewage System – waste water and combined systems",
                    },
                    {
                      standard: "EN 13476-2:2007",
                      application: "When building highways",
                    },
                    {
                      standard: "EN 476:2001",
                      application: "Drainage of surface water",
                    },
                    {
                      standard: "EN 1610:2002",
                      application: "Residential drainage systems",
                    },
                    {
                      standard: "EN 1852-1:1999",
                      application: "Industrial pipelines",
                    },
                    {
                      standard: "ENV 1046:2002 (Y)",
                      application: "Underwater installations",
                    },
                    {
                      standard: "SFS 5906:2004",
                      application: "Renovation",
                    },
                  ].map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-6 py-4 text-sm font-medium text-[#1c2d56]">
                        {translateSpiralPipeText(item.standard, t)}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-sm text-gray-700">
                        {translateSpiralPipeText(item.application, t)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("aboutUs.getInTouchTitle")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {t("productPages.needMoreInfo")} products and {t("productPages.solutions")}? {t("productPages.contactExperts")}.
            </p>
            <Button
              onClick={() => {
                // Store scroll target in sessionStorage
                sessionStorage.setItem("scrollToContact", "true");
                // Navigate to home page
                setLocation("/");
              }}
              className="px-8 py-4 rounded-lg font-semibold text-lg text-white bg-[#1c2d56] hover:bg-[#1c2d56]/90 transition-colors"
              data-testid="contact-button"
            >
              {t("aboutUs.contactUsButton")}
            </Button>
          </div>
        </div>
      </section>
      <Footer />
      
    </div>
  );
}

export default KontiKanSpiralPipesPage;
