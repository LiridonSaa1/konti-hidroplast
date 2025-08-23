import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronDown, Download, Play, Check } from "lucide-react";

// KONTI KAN SPIRAL pipes translation helper function
const translateSpiralPipeText = (text: string, t: any) => {
  const translations: { [key: string]: string } = {
    // Page titles and headers
    "KONTI KAN SPIRAL": t("spiralPipes.kontiKanSpiral"),
    "KONTI KAN SPIRAL Pipes": t("spiralPipes.kontiKanSpiralPipes"),
    "KONTI KAN SPIRAL Manufacturing": t("spiralPipes.kontiKanSpiralManufacturing"),
    
    // Descriptions
    "Clients and engineers as ideal pipe material for many pressure and non-pressure applications such as water distribution; gravity sewer, rehabilitation projects and manholes recognize polyethylene.": t("spiralPipes.heroDescription"),
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
                Clients and engineers as ideal pipe material for many pressure
                and non-pressure applications such as water distribution;
                gravity sewer, rehabilitation projects and manholes recognize
                polyethylene.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    50+ Years Lifespan
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">100% Recyclable</span>
                </div>
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
                Clients and engineers as ideal pipe material for many pressure
                and non-pressure applications such as water distribution;
                gravity sewer, rehabilitation projects and manholes recognize
                polyethylene.
              </p>
              <p className="text-lg leading-relaxed">
                Latest development of production of Konti Hidroplast is
                manufacturing sewage pipes for non-pressure applications. Konti
                Kan Spiral pipe and complete range of Konti Kan Spiral fittings.
              </p>
              <p className="text-lg leading-relaxed">
                Konti Kan Spiral pipes are made of hollow PE-HD sections
                helically wound on a drum with a specific diameter. Konti Kan
                Spiral Pipe provides all technical advantages of equivalent
                polyethylene solid wall pipe with substantial saving in weight
                combining greater ease of installation with increased cost
                effectiveness. Its unique structure can offer a range of pipe
                sizes and ring stiffness, depending of customers requirements.
              </p>
              <p className="text-lg leading-relaxed">
                The characteristics of raw material and the technology of
                production are combined to insure application in:
              </p>
              <ul className="text-lg leading-relaxed list-disc list-inside ml-4">
                <li>Municipality for infrastructure objects</li>
                <li>Industry</li>
                <li>Roads building</li>
                <li>Reconstruction</li>
              </ul>
              <p className="text-lg leading-relaxed">
                Konti Kan Spiral provides all technical advantages as well as
                polyethylene or polypropylene pipes with solid wall, the only
                difference is that Konti Kan Spiral are significantly lighter in
                weight and thus for the installation, which is also financially
                viable.
              </p>
              <p className="text-lg leading-relaxed">
                <strong>Color:</strong> Black (other color on request) |{" "}
                <strong>Length:</strong> 6m
              </p>
              <p className="text-lg leading-relaxed">
                For connection of the pipes and fittings Konti Kan spiral pipe
                are use the following methods:
              </p>
              <ul className="text-lg leading-relaxed list-disc list-inside ml-4">
                <li>Connection with socket +EPDM gasket</li>
                <li>Extrusion welding from both side</li>
                <li>Extrusion welding inside</li>
                <li>
                  Connection with thread with inside welding or with thermo
                  shrink tape
                </li>
                <li>Electro fusion connection</li>
                <li>Connection with metal part with inside rubber layer</li>
                <li>But welding</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Konti Kan Spiral Pipes Section */}
      <section className="py-20 bg-[#1c2d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-white">
                KONTI KAN SPIRAL Pipes
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-white mb-6">
                  KONTI KAN SPIRAL PIPE is made of PEHD profile spirally wound
                  on a drum with a specific diameter. It contains all technical
                  advantages of equivalent polyethylene pipes with full walls
                  significantly decreasing the weight, providing much easier
                  installation and increased efficiency.
                </p>

                <h4 className="text-xl font-bold text-white mb-4">
                  Material Properties:
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "High-Density Polyethylene (HDPE)",
                    "Lightweight but strong, with high tensile strength",
                    "Excellent resistance to chemical and biological degradation",
                    "Flexible and resistant to environmental stress cracking",
                  ].map((property, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{translateSpiralPipeText(property, t)}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Application:
                </h4>
                <div className="space-y-3 mb-6">
                  {[
                    "Sewerage and stormwater drainage systems",
                    "Large-scale water transport and storage",
                    "Industrial effluent pipelines",
                    "Culverts and irrigation systems",
                    "Ventilation ducts in mines",
                  ].map((application, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{translateSpiralPipeText(application, t)}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xl font-bold text-white mb-4">
                  Characteristics:
                </h4>
                <div className="space-y-3 mb-8">
                  {[
                    "Common stiffness classes include SN 2, SN 4, SN 8, SN 12.5, or even higher for specific applications",
                    "Suitable for pipes with diameters ranging from Ø 1300 – 2000 mm",
                    "Color: Black (other color on request)",
                    "Length: 6m",
                    "Resistant to both acidic and alkaline environments",
                    "Service life of over 50 years under normal conditions",
                    "Can be used above ground with UV-stabilized formulations",
                    "Functional between -40°C to +60°C",
                    "Fully recyclable",
                    "Municipality for infrastructure objects",
                    "Industry, Roads building, Reconstruction",
                  ].map((characteristic, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white">{translateSpiralPipeText(characteristic, t)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Konti-Kan-Spiral-table-en.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#1c2d56] px-6 py-3 bg-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Specs
                  </a>
                  <a
                    href="https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/Broshura-KONTI-SPIRAL_EN_2021_compressed.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </a>
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
