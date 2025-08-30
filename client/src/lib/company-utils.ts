import { useCompanyInfo } from "@/hooks/use-company-info";

/**
 * Utility functions for working with company information
 */

/**
 * Get the first part of the company name (before the first space)
 * @param companyName - The full company name
 * @returns The first part of the company name or 'KONTI' as fallback
 */
export function getCompanyNameFirstPart(companyName?: string): string {
  if (!companyName) return 'KONTI';
  return companyName.split(' ')[0] || 'KONTI';
}

/**
 * Get the remaining parts of the company name (after the first space)
 * @param companyName - The full company name
 * @returns The remaining parts of the company name or 'HIDROPLAST' as fallback
 */
export function getCompanyNameRemainingParts(companyName?: string): string {
  if (!companyName) return 'HIDROPLAST';
  const parts = companyName.split(' ');
  return parts.slice(1).join(' ') || 'HIDROPLAST';
}

/**
 * Get a fallback company name if the dynamic one is not available
 * @param companyName - The dynamic company name
 * @param fallback - The fallback text to use
 * @returns The company name or fallback
 */
export function getCompanyNameWithFallback(companyName?: string, fallback: string = 'our company'): string {
  return companyName || fallback;
}

/**
 * Get a fallback company name for legal/formal contexts
 * @param companyName - The dynamic company name
 * @returns The company name or 'Konti Hidroplast' as fallback
 */
export function getCompanyNameForLegal(companyName?: string): string {
  return companyName || 'Konti Hidroplast';
}

/**
 * Hook to get company information with utility functions
 * @returns Company info and utility functions
 */
export function useCompanyInfoWithUtils() {
  const companyInfo = useCompanyInfo();
  
  return {
    ...companyInfo,
    utils: {
      getCompanyNameFirstPart: () => getCompanyNameFirstPart(companyInfo.data.companyName),
      getCompanyNameRemainingParts: () => getCompanyNameRemainingParts(companyInfo.data.companyName),
      getCompanyNameWithFallback: (fallback?: string) => getCompanyNameWithFallback(companyInfo.data.companyName, fallback),
      getCompanyNameForLegal: () => getCompanyNameForLegal(companyInfo.data.companyName),
    }
  };
}
