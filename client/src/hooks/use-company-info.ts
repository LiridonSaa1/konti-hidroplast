import { useQuery } from "@tanstack/react-query";
import type { CompanyInfo } from "@shared/schema";

interface CompanyInfoData {
  companyName: string;
  email: string;
  phones: string[];
  address: string;
  logoUrl: string;
  description: string;
  socialLinkedIn: string;
  socialFacebook: string;
  socialInstagram: string;
}

export function useCompanyInfo() {
  const { data: companyInfo = [], isLoading, error } = useQuery<CompanyInfo[]>({
    queryKey: ["/api/admin/company-info"],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  // Transform array data to structured object
  const data: CompanyInfoData = (() => {
    const infoMap = companyInfo.reduce((acc: Record<string, string>, item: CompanyInfo) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);

    // Handle multiple phone numbers
    const phones = [];
    for (let i = 0; i < 5; i++) {
      const phoneKey = i === 0 ? 'phone' : `phone${i + 1}`;
      if (infoMap[phoneKey] && infoMap[phoneKey].trim()) {
        phones.push(infoMap[phoneKey]);
      }
    }

    return {
      companyName: infoMap.companyName || "",
      email: infoMap.email || "",
      phones,
      address: infoMap.address || "",
      logoUrl: infoMap.logoUrl || "",
      description: infoMap.description || "",
      socialLinkedIn: infoMap.socialLinkedIn || "",
      socialFacebook: infoMap.socialFacebook || "",
      socialInstagram: infoMap.socialInstagram || "",
    };
  })();

  return {
    data,
    isLoading,
    error,
    // Helper functions for common use cases
    hasPhone: data.phones.length > 0,
    hasSocialMedia: !!(data.socialLinkedIn || data.socialFacebook || data.socialInstagram),
    hasLogo: !!data.logoUrl,
    hasEmail: !!data.email,
    hasAddress: !!data.address,
  };
}