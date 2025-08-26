import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompanyInfo } from "@/hooks/use-company-info";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  Download,
  Shield,
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { CertificateCategory, CertificateSubcategory, Certificate } from "@shared/schema";
import { PDFPreview } from "@/components/ui/pdf-preview";

// Interface for organized certificate data
interface OrganizedCategory {
  id: number;
  title: string;
  description?: string;
  certificates?: Array<Certificate & { translatedTitle: string }>;
  subsections?: {
    id: number;
    title: string;
    description?: string;
    certificates: Array<Certificate & { translatedTitle: string }>;
  }[];
}

// Fetch certificate data from API
function useCertificateData() {
  const categories = useQuery<CertificateCategory[]>({
    queryKey: ['/api/certificate-categories'],
  });

  const subcategories = useQuery<CertificateSubcategory[]>({
    queryKey: ['/api/certificate-subcategories'],
  });

  const certificates = useQuery<Certificate[]>({
    queryKey: ['/api/certificates'],
  });

  return {
    categories,
    subcategories,
    certificates,
    isLoading: categories.isLoading || subcategories.isLoading || certificates.isLoading,
    error: categories.error || subcategories.error || certificates.error,
  };
}

// Utility function to get translated title
function getTranslatedTitle(item: { title: string; translations?: any }, language: string): string {
  if (!item.translations || !item.translations[language]?.title) {
    return item.title; // Fallback to default title
  }
  return item.translations[language].title;
}

// Utility function to get translated description
function getTranslatedDescription(item: { description?: string | null; translations?: any }, language: string): string {
  if (!item.translations || !item.translations[language]?.description) {
    return item.description || ""; // Fallback to default description
  }
  return item.translations[language].description;
}

// Organize data into the structure needed for display
function organizeData(
  categories: CertificateCategory[],
  subcategories: CertificateSubcategory[],
  certificates: Certificate[],
  language: string
): OrganizedCategory[] {
  const organizedCategories: OrganizedCategory[] = [];
  
  for (const category of categories) {
    const categorySubcategories = subcategories.filter(sub => sub.categoryId === category.id);
    
    if (categorySubcategories.length > 0) {
      // Has subcategories - organize certificates under subcategories
      const subsections = categorySubcategories
        .map(subcategory => ({
          id: subcategory.id,
          title: getTranslatedTitle(subcategory, language),
          description: getTranslatedDescription(subcategory, language),
          certificates: certificates
            .filter(cert => cert.subcategoryId === subcategory.id)
            .map(cert => ({
              ...cert,
              translatedTitle: getTranslatedTitle(cert, language)
            })),
        }))
        .filter(subsection => subsection.certificates.length > 0); // Only include subcategories with certificates

      // Only add category if it has subcategories with certificates
      if (subsections.length > 0) {
        organizedCategories.push({
          id: category.id,
          title: getTranslatedTitle(category, language),
          description: getTranslatedDescription(category, language),
          subsections,
        });
      }
    } else {
      // No subcategories - show certificates directly under category
      // Only include certificates that don't have a subcategoryId (to avoid duplicates)
      const categoryCertificates = certificates
        .filter(cert => cert.categoryId === category.id && !cert.subcategoryId)
        .map(cert => ({
          ...cert,
          translatedTitle: getTranslatedTitle(cert, language)
        }));

      if (categoryCertificates.length > 0) {
        organizedCategories.push({
          id: category.id,
          title: getTranslatedTitle(category, language),
          description: getTranslatedDescription(category, language),
          certificates: categoryCertificates,
        });
      }
    }
  }
  
  return organizedCategories;
}

// Legacy hardcoded data as fallback
const legacyCertificateCategories = [
  {
    id: "epd",
    title: "EPD – Environmental Product Declaration",
    certificates: [
      {
        title: "PE100 and PE 100 RC pipes",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/PE100-and-PE-100-RC-pipes.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/PE-100-PE-100-RC.pdf",
      },
      {
        title: "KONTI KAN PPHM pipes and fittings",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/KONTI-KAN-PPHM-pipes-and-fittings.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/KONTI-KAN-PPHM.pdf",
      },
      {
        title: "KONTI KAN HDPE pipes and fittings",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/KONTI-KAN-HDPE-pipes-and-fittings.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/KONTI-KAN-HDPE.pdf",
      },
      {
        title: "MANHOLES",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/Manholes.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/06/Manhole.pdf",
      },
    ],
  },
  {
    id: "quality-management",
    title: "Quality Management System",
    certificates: [
      {
        title: "IQNET-9001",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/IQNET-9001.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/04/IQNET-9001.pdf",
      },
      {
        title: "IQNET-14001",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/IQNET-14001.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/04/IQNET-14001.pdf",
      },
      {
        title: "IQNET-45001",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/IQNET-45001.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/04/IQNET-45001.pdf",
      },
      {
        title: "QAUSTRIA-9001",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/QAUSTRIA-9001.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/04/QAUSTRIA-9001.pdf",
      },
      {
        title: "QAUSTRIA-14001",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/QAUSTRIA-14001.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/04/QAUSTRIA-14001.pdf",
      },
      {
        title: "QAUSTRIA-45001",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/QAUSTRIA-45001.jpg",
        downloadUrl:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/04/QAUSTRIA-45001.pdf",
      },
    ],
  },
  {
    id: "water-supply",
    title: "Water-supply Systems",
    subsections: [
      {
        title: "Pressure pipe PE100 DN/OD 20-800mm",
        certificates: [
          {
            title: "DV-8146",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DV-8146.jpg",
            downloadUrl: "#",
          },
          {
            title: "DV-8141",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DV-8141.jpg",
            downloadUrl: "#",
          },
          {
            title: "IGH-2351",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/IGH-2351.jpg",
            downloadUrl: "#",
          },
          {
            title: "MIRTEC-12201-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/MIRTEC-12201-GR.jpg",
            downloadUrl: "#",
          },
          {
            title: "MIRTEC-12201-GR",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/MIRTEC-12201-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "BWA-EK-018-59-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BWA-EK-018-066-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "BS-31-PE100RC-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BS-31-PE100RC-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "IC-5213",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/IC-5213.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title: "PE 100 RC",
        certificates: [
          {
            title: "BS-31-PE100RC-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BS-31-PE100RC-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "IGH-2350",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/IGH-2350.jpg",
            downloadUrl: "#",
          },
          {
            title: "BWA-EK-018-066-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BWA-EK-018-066-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "BS-31-PE100RC-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BS-31-PE100RC-EN-1.jpg",
            downloadUrl: "#",
          },
          {
            title: "INSTA-CERT-5213",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/INSTA-CERT-5213.jpg",
            downloadUrl: "#",
          },
          {
            title: "INSTA-CERT-5213",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/INSTA-CERT-5213-1.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title: "PE 100 RC TYPE 1 DN/OD 20-800mm",
        certificates: [
          {
            title: "DW-8136-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DW-8136-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DW-8141-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DW-8141-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DW-8141-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DW-8141-EN-1.jpg",
            downloadUrl: "#",
          },
          {
            title: "P1R0642 2023 DE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/P1R0642_2023-06-20_EZ_2023_de.jpg",
            downloadUrl: "#",
          },
          {
            title: "P1R0642 2023 EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/P1R0642_2023-06-20_EZ_2023_en.jpg",
            downloadUrl: "#",
          },
          {
            title: "P1R0643 2023 DE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/P1R0643_2023-06-20_EZ_2023_de.jpg",
            downloadUrl: "#",
          },
          {
            title: "P1R0643 2023 EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/P1R0643_2023-06-20_EZ_2023_en.jpg",
            downloadUrl: "#",
          },
          {
            title: "P1R0644 2023 DE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/P1R0644_2023-06-20_EZ_2023_de.jpg",
            downloadUrl: "#",
          },
          {
            title: "P1R0644 2023 EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/P1R0644_2023-06-20_EZ_2023_en.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title: "PE 100 RC TYPE 2 DN/OD 20-800mm",
        certificates: [
          {
            title: "DVGW-8138-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DVGW-8138-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DVGW-8143-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DVGW-8143-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DVGW-8148-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DVGW-8148-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-645-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-645-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-645-DE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-645-DE.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-646-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-646-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-646-DE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-646-DE.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-647-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-647-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-647-DE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-647-DE.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-666-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-666-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-666-DE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-666-DE.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-667-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-667-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-667-DE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-667-DE.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title: "PE 100 RC type 3",
        certificates: [
          {
            title: "DW-8152",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DW-8152.jpg",
            downloadUrl: "#",
          },
          {
            title: "DW-8154",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DW-8154.jpg",
            downloadUrl: "#",
          },
          {
            title: "P1R0648 2023 EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/P1R0648_2023-06-20_EZ_2023_en.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-649-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-649-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "DIN-CERTCO-649-DE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DIN-CERTCO-649-DE.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title: "Hygiene certificates",
        certificates: [
          {
            title: "Hygiene Certificate 1",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/04/Scan2659_page-0001-min.jpg",
            downloadUrl: "#",
          },
          {
            title: "Hygiene Certificate 2",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/04/Scan2660_page-0001-min.jpg",
            downloadUrl: "#",
          },
          {
            title: "Hygiene Certificate 3",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/04/Scan2663_page-0001-min.jpg",
            downloadUrl: "#",
          },
        ],
      },
    ],
  },
  {
    id: "sewerage",
    title: "Sewerage Systems",
    subsections: [
      {
        title:
          "HDPE Konti Kan double wall corrugated sewage pipes DN/OD 110-1200mm",
        certificates: [
          {
            title: "BC-3793-BG",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BC-3793-BG-1.jpg",
            downloadUrl: "#",
          },
          {
            title: "MIRTEC-13476-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/MIRTEC-13476-EN.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title:
          "Konti Kan Spiral - PE/PP Spiral sewage non pressure pipe DN/ID 1300-200mm",
        certificates: [
          {
            title: "BC-3791-BG",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BC-3791-BG.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title: "PE/PP Manholes sewage system",
        certificates: [
          {
            title: "EXACT-0479-MANHOLE",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/EXACT-0479-MANHOLE.jpg",
            downloadUrl: "#",
          },
          {
            title: "AVIZ-46554",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/AVIZ-46554.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title:
          "PPHM Konti Kan double wall corrugated sewage pipe DN/ID 100-1200mm",
        certificates: [
          {
            title: "BC-3792-BG",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BC-3792-BG.jpg",
            downloadUrl: "#",
          },
          {
            title: "MIRTEC-13476-3-PP-GR",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/MIRTEC-13476-3-PP-GR.jpg",
            downloadUrl: "#",
          },
          {
            title: "IC-5210-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/IC-5210-EN.jpg",
            downloadUrl: "#",
          },
          {
            title: "BS-015-58-BG",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BS-015-58-BG.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title: "PP HM Smooth Pipe (Solid PP sewage pipe) DN/OD 110-500mm",
        certificates: [
          {
            title: "EXACT-0438-P",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/EXACT-0438-P.jpg",
            downloadUrl: "#",
          },
          {
            title: "EXACT-246",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/EXACT-246.jpg",
            downloadUrl: "#",
          },
          {
            title: "IGMAT-1852",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/IGMAT-1852.jpg",
            downloadUrl: "#",
          },
          {
            title: "BC-3794-BG",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/BC-3794-BG.jpg",
            downloadUrl: "#",
          },
        ],
      },
      {
        title: "Rubber Gasket",
        certificates: [
          {
            title: "EXACT-0394-P",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/EXACT-0394-P.jpg",
            downloadUrl: "#",
          },
          {
            title: "EXACT-0424-P",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/EXACT-0424-P.jpg",
            downloadUrl: "#",
          },
        ],
      },
    ],
  },
  {
    id: "gas",
    title: "Natural Gas pressure Pipe system DN/OD 20-800mm",
    certificates: [
      {
        title: "DVGW-8106",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DVGW-8106.jpg",
        downloadUrl: "#",
      },
      {
        title: "DVGW-8111",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DVGW-8111.jpg",
        downloadUrl: "#",
      },
      {
        title: "DVGW-8116",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/DVGW-8116.jpg",
        downloadUrl: "#",
      },
      {
        title: "IGH-2349",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/IGH-2349.jpg",
        downloadUrl: "#",
      },
      {
        title: "Gas Certificate",
        image:
          "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/gas.jpg",
        downloadUrl: "#",
      },
    ],
  },
  {
    id: "cable-protection",
    title: "Cable Protection",
    subsections: [
      {
        title:
          "Konti Kan Duct (HDPE double wall corrugated pipe DN/OD 40-200mm)",
        certificates: [
          {
            title: "EXACT-0466",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/EXACT-0466.jpg",
            downloadUrl: "#",
          },
          {
            title: "EXACT-0467",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/EXACT-0467.jpg",
            downloadUrl: "#",
          },
          {
            title: "MIRTEC-61386-EN",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2025/02/MIRTEC-61386-EN-scaled.jpg",
            downloadUrl: "#",
          },
          {
            title: "MIRTEC-61386-GR",
            image:
              "https://konti-hidroplast.com.mk/wp-content/uploads/2024/10/MIRTEC-61386-GR.jpg",
            downloadUrl: "#",
          },
        ],
      },
    ],
  },
];

function CertificatesPage() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const { data: companyInfo } = useCompanyInfo();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  // Fetch dynamic certificate data
  const { categories, subcategories, certificates, isLoading, error } = useCertificateData();
  
  // Organize data for display
  const organizedData = categories.data && subcategories.data && certificates.data 
    ? organizeData(categories.data, subcategories.data, certificates.data, language)
    : [] as OrganizedCategory[];

  // Fallback to legacy data if no dynamic data available
  const displayData = organizedData.length > 0 ? organizedData : legacyCertificateCategories;

  // Debug logging
  useEffect(() => {
    if (categories.data && subcategories.data && certificates.data) {
      console.log('=== Certificate Data Debug ===');
      console.log('Categories:', categories.data);
      console.log('Subcategories:', subcategories.data);
      console.log('Certificates:', certificates.data);
      console.log('Organized Data:', organizedData);
      console.log('Display Data:', displayData);
    }
  }, [categories.data, subcategories.data, certificates.data, organizedData, displayData]);

  // Reset active tab when language changes to avoid out-of-bounds errors
  useEffect(() => {
    if (displayData.length > 0 && activeTabIndex >= displayData.length) {
      setActiveTabIndex(0);
    }
  }, [language, displayData.length, activeTabIndex]);

  const nextTab = () => {
    setActiveTabIndex((prev) =>
      prev === displayData.length - 1 ? 0 : prev + 1,
    );
  };

  const prevTab = () => {
    setActiveTabIndex((prev) =>
      prev === 0 ? displayData.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    // Set page title
    document.title = `Certificates - ${companyInfo.companyName || "Konti Hidroplast"}`;

    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Download official certificates and quality assurance documentation for Konti Hidroplast's PE pipes, fittings, and sewerage systems. ISO certified quality management systems.",
      );
    }
  }, []);

  const CertificateCard = ({ certificate, categoryId, index }: { 
    certificate: (Certificate & { translatedTitle: string }) | { title: string; image?: string; imageUrl?: string; downloadUrl?: string; };
    categoryId: number | string;
    index: number;
  }) => {
    // Get the title to display - use translatedTitle if available, otherwise fall back to title
    const displayTitle = 'translatedTitle' in certificate ? certificate.translatedTitle : certificate.title;
    
    // Check if this is a Certificate type with pdfUrl
    const hasPdf = 'pdfUrl' in certificate && certificate.pdfUrl;
    const hasImage = 'image' in certificate ? certificate.image : certificate.imageUrl;
    
    return (
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        data-testid={`certificate-${categoryId}-${index}`}
      >
        <div className="aspect-[3/4] bg-gray-100">
          {hasImage ? (
            // Show image if available
            <img
              src={hasImage || '/placeholder-certificate.jpg'}
              alt={displayTitle}
              className="w-full h-full object-fill"
              loading="lazy"
            />
          ) : hasPdf ? (
            // Show PDF preview if no image but PDF exists
            <PDFPreview
              url={hasPdf}
              className="w-full h-full object-fill"
              data-testid={`pdf-preview-${categoryId}-${index}`}
            />
          ) : (
            // No files - show placeholder
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-8 h-8 text-gray-500" />
                </div>
                <div className="text-gray-500 text-sm">No Preview</div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-[#1c2d56] mb-3 line-clamp-2 min-h-[2.5rem]">
            {displayTitle}
          </h3>
          {certificate.downloadUrl && certificate.downloadUrl !== "#" ? (
            <a
              href={certificate.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center w-full justify-center px-3 py-2 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white text-sm rounded-lg transition-colors"
              data-testid={`download-${categoryId}-${index}`}
            >
              <Download className="w-3 h-3 mr-2" />
              {t("certificates.download")}
            </a>
          ) : hasPdf ? (
            // Show PDF download button if PDF exists
            <a
              href={hasPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center w-full justify-center px-3 py-2 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white text-sm rounded-lg transition-colors"
              data-testid={`pdf-download-${categoryId}-${index}`}
            >
              <Download className="w-3 h-3 mr-2" />
              View PDF
            </a>
          ) : (
            <button
              onClick={() => {
                if (hasImage) {
                  window.open(hasImage, '_blank', 'noopener,noreferrer');
                }
              }}
              className="inline-flex items-center w-full justify-center px-3 py-2 bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white text-sm rounded-lg transition-colors"
              data-testid={`certificate-${categoryId}-${index}`}
            >
              <Shield className="w-3 h-3 mr-2" />
              {t("productPages.certificateOnly")}
            </button>
          )}
        </div>
      </div>
    );
  };

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
          <div className="text-center">
            <div className="mb-6 text-white px-4 py-2 rounded-full inline-block bg-[#ef4444]">
              <span className="text-sm font-medium">{t("productPages.qualityAssurance")}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              {t("productPages.qualityCertificates")}<span className="text-red-500"> </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t("productPages.andStandards")}
              </span>
            </h1>
            <p
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
              data-testid="hero-description"
            >
              {t("productPages.certificatesDescription")}
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                {t("productPages.isoCertified")}
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                {t("productPages.qualityAssured")}
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                {t("productPages.europeanStandards")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section with Tabs */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
              <h2 className="text-4xl font-bold mx-8 text-[#1c2d56]">
                {t("productPages.certificatesStandards")}
              </h2>
              <div className="flex-1 max-w-32 h-0.5 bg-red-600"></div>
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-[#1c2d56] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">{t("certificates.loading")}</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{t("certificates.error")}</p>
            </div>
          )}

          {/* Tab Slider */}
          {!isLoading && displayData.length > 0 && (
            <div className="flex items-center justify-center mb-12">
            <button
              onClick={prevTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors mr-4"
              data-testid="tab-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-4 min-w-[300px] text-center">
              <h3 className="text-xl font-bold text-[#1c2d56] mb-1">
                {displayData[activeTabIndex]?.title || 'Loading...'}
              </h3>
              <div className="flex justify-center space-x-1 mt-3">
                {displayData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTabIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeTabIndex
                        ? "bg-[#1c2d56]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    data-testid={`tab-dot-${index}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextTab}
              className="p-2 rounded-full bg-[#1c2d56] hover:bg-[#1c2d56]/90 text-white transition-colors ml-4"
              data-testid="tab-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            </div>
          )}

          {/* Tab Content */}
          {!isLoading && displayData.map((category, index) => (
            <div
              key={category.id}
              className={`${activeTabIndex === index ? "block animate-fadeIn" : "hidden"} transition-all duration-500`}
            >
              {/* Category Header */}
              {/* <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#1c2d56] mb-4">
                  {category.title}
                </h2>
                {'description' in category && category.description && (
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {category.description}
                  </p>
                )}
              </div> */}

              {/* Simple certificate grid for categories without subsections */}
              {category.certificates && (
                <div className="space-y-8">
                  {/* <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-[#1c2d56]">
                      Direct Certificates
                    </h3>
                  </div> */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {category.certificates.map((certificate, index) => (
                      <CertificateCard
                        key={index}
                        certificate={certificate}
                        categoryId={category.id}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Subsections for complex categories */}
              {category.subsections && (
                <div className="space-y-12">
                  {category.subsections.map((subsection, subsectionIndex) => (
                    <div key={subsectionIndex} className="space-y-6">
                      {/* Subcategory Header */}
                      <div className="pl-6 py-4">
                        <h3 className="text-xl font-semibold text-[#1c2d56]">
                          {subsection.title}
                        </h3>
                        {'description' in subsection && subsection.description && (
                          <p className="text-gray-600 mt-2">{subsection.description}</p>
                        )}
                      </div>
                      
                      {/* Certificates Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {subsection.certificates.map((certificate, index) => (
                          <CertificateCard
                            key={index}
                            certificate={certificate}
                            categoryId={`${category.id}-${subsectionIndex}`}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

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

export default CertificatesPage;
