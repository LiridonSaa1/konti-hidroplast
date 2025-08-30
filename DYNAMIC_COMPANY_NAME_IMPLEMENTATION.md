# Dynamic Company Name Implementation

## Overview
This document outlines the comprehensive changes made to replace hardcoded "Konti Hidroplast" references with dynamic company information throughout the project.

## Changes Made

### 1. Language Context Updates (`client/src/contexts/LanguageContext.tsx`)

#### English Translations Updated:
- `hero.videoTitle`: "Konti Hidroplast Corporate Video" → "Corporate Video"
- `about.text1`: "Konti Hidroplast is export oriented..." → "We are an export oriented..."
- `about.text2`: "Situated in Southern Macedonia, municipality of Gevgelija Konti Hidroplast was founded..." → "Situated in Southern Macedonia, municipality of Gevgelija, we were founded..."
- `news.article2.title`: "Konti Hidroplast Donated €100,000..." → "Company Donated €100,000..."
- `testimonials.petar.quote`: Removed "Konti Hidroplast" references, replaced with "the company"
- `testimonials.alex.quote`: Removed "Konti Hidroplast" references, replaced with "the company"
- `aboutUs.leadershipDescription1`: "At Konti Hidroplast, our mission..." → "At our company, our mission..."
- `aboutUs.companyStoryText3`: "Konti Hidroplast became known..." → "Our company became known..."
- `aboutUs.companyStoryText4`: "contributing for Konti Hidroplast to play..." → "contributing for our company to play..."
- `productsPage.applicationDescription1`: "Konti Hidroplast products find..." → "Our products find..."
- `spiralPipes.latestDevelopment`: "Latest development of production of Konti Hidroplast..." → "Latest development of production..."
- `newsPage.checkBackSoon`: "Check back soon for the latest updates and insights from Konti Hidroplast." → "Check back soon for the latest updates and insights from our company."
- `careerPage.heroDescription`: "Join Konti Hidroplast and become..." → "Join our company and become..."

#### German Translations Updated:
- `hero.videoTitle`: "Konti Hidroplast Unternehmensvideo" → "Unternehmensvideo"
- `about.text1`: "Konti Hidroplast ist ein exportorientiertes..." → "Wir sind ein exportorientiertes..."
- `about.text2`: "wurde Konti Hidroplast 1975 als kleine Fabrik..." → "wurden wir 1975 als kleine Fabrik..."
- `news.article2.title`: "Konti Hidroplast spendete €100.000..." → "Unternehmen spendete €100.000..."
- `testimonials.petar.quote`: "Antworten von Konti Hidroplast erhalten" → "Antworten vom Unternehmen erhalten"
- `testimonials.alex.quote`: "Die Zusammenarbeit mit Konti Hidroplast war..." → "Die Zusammenarbeit mit dem Unternehmen war..."
- `aboutUs.valuesText`: "Bei Konti Hidroplast sind wir bestrebt..." → "Bei unserem Unternehmen sind wir bestrebt..."
- `aboutUs.companyStoryText3`: "Konti Hidroplast wurde auf dem Markt..." → "Unser Unternehmen wurde auf dem Markt..."
- `aboutUs.companyStoryText4`: "dass Konti Hidroplast eine wichtige Rolle..." → "dass unser Unternehmen eine wichtige Rolle..."
- `aboutUs.leadershipDescription1`: "Bei Konti Hidroplast war unsere Mission..." → "Bei unserem Unternehmen war unsere Mission..."
- `productsPage.applicationDescription1`: "Konti Hidroplast-Produkte finden..." → "Unsere Produkte finden..."
- `spiralPipes.latestDevelopment`: "Die neueste Entwicklung in der Produktion von Konti Hidroplast..." → "Die neueste Entwicklung in der Produktion..."
- `newsPage.checkBackSoon`: "Schauen Sie bald wieder vorbei für die neuesten Updates und Einblicke von Konti Hidroplast." → "Schauen Sie bald wieder vorbei für die neuesten Updates und Einblicke von unserem Unternehmen."
- `careerPage.heroDescription`: "Treten Sie Konti Hidroplast bei..." → "Treten Sie unserem Unternehmen bei..."

**Note**: Legal company names in privacy policy translations remain as "Konti Hidroplast Dooel Gevgelija" as these are formal legal references.

### 2. Component Updates

#### About Section (`client/src/components/about-section.tsx`):
- `alt` attribute: "Konti Hidroplast Corporate Video Thumbnail" → "Corporate Video Thumbnail"
- `aria-label`: "Play Konti Hidroplast Corporate Video" → "Play Corporate Video"
- `title`: "Konti Hidroplast Corporate Video" → "Corporate Video"

#### Products Page (`client/src/pages/products.tsx`):
- Hero title now dynamically splits company name:
  - First part: `{companyInfo.companyName?.split(' ')[0] || 'KONTI'}`
  - Remaining parts: `{companyInfo.companyName?.split(' ').slice(1).join(' ') || 'HIDROPLAST'}`

#### Apply Page (`client/src/pages/Apply.tsx`):
- Success message: "Thank you for your interest in joining Konti Hidroplast" → "Thank you for your interest in joining {companyInfo.companyName || 'our company'}"
- Hero description: "Be part of Konti Hidroplast's mission..." → "Be part of {companyInfo.companyName || 'our company'}'s mission..."
- Cover letter placeholder: "Tell us why you want to work at Konti Hidroplast..." → "Tell us why you want to work at {companyInfo.companyName || 'our company'}..."
- Form agreement: "By submitting this form, you agree to allow Konti Hidroplast..." → "By submitting this form, you agree to allow {companyInfo.companyName || 'our company'}..."

### 3. Server-Side Updates

#### Email Service (`server/services/emailService.ts`):
- Added optional `companyInfo` parameter to `sendBrochureDownloadEmail` method
- Email subject: "Your {brochureName} Brochure Download Link - {companyInfo?.companyName || 'Konti Hidroplast'}"
- Email content: All "Konti Hidroplast" references replaced with dynamic company information
- Contact information: Email, phone, and website now use dynamic values with fallbacks
- Footer: Copyright notice uses dynamic company name

#### Brevo Service (`server/services/brevoService.ts`):
- Auto-reply signature: "The Konti Hidroplast Team" → "The Company Team"

### 4. New Utility Functions (`client/src/lib/company-utils.ts`)

Created utility functions for consistent company name handling:
- `getCompanyNameFirstPart()`: Gets first part of company name
- `getCompanyNameRemainingParts()`: Gets remaining parts of company name
- `getCompanyNameWithFallback()`: Gets company name with customizable fallback
- `getCompanyNameForLegal()`: Gets company name for legal contexts
- `useCompanyInfoWithUtils()`: Hook combining company info with utility functions

## Implementation Details

### Fallback Strategy
- **General contexts**: Use "our company" or "the company" as fallback
- **Legal contexts**: Use "Konti Hidroplast" as fallback
- **Brand contexts**: Use "KONTI" and "HIDROPLAST" as fallbacks

### Dynamic Company Name Display
The company name is dynamically split for display purposes:
- First word (e.g., "KONTI") displayed in red
- Remaining words (e.g., "HIDROPLAST") displayed in gradient blue

### Database Integration
Company information is pulled from the `company_info` table with the key "companyName" and other related fields.

## Benefits

1. **Maintainability**: Company name changes only require database updates
2. **Consistency**: All references use the same source of truth
3. **Flexibility**: Easy to rebrand or change company information
4. **Localization**: Company names can be localized per language
5. **Professional**: Dynamic content appears more professional and up-to-date

## Usage Examples

### In Components:
```tsx
const { data: companyInfo } = useCompanyInfo();

// Display company name
<h1>{companyInfo.companyName || 'Our Company'}</h1>

// Split company name for styling
<span className="text-red-500">{companyInfo.companyName?.split(' ')[0] || 'KONTI'}</span>
<span className="text-blue-500">{companyInfo.companyName?.split(' ').slice(1).join(' ') || 'HIDROPLAST'}</span>
```

### With Utility Functions:
```tsx
import { useCompanyInfoWithUtils } from '@/lib/company-utils';

const { utils } = useCompanyInfoWithUtils();

// Use utility functions
<span>{utils.getCompanyNameFirstPart()}</span>
<span>{utils.getCompanyNameWithFallback('our company')}</span>
```

## Future Enhancements

1. **Company Logo**: Make company logo dynamic
2. **Company Colors**: Make brand colors configurable
3. **Company Address**: Make all contact information dynamic
4. **Multi-language Company Names**: Support different company names per language
5. **Company History**: Make company timeline and milestones dynamic

## Testing

To test the dynamic company name functionality:
1. Update the company name in the database (`company_info` table, key: "companyName")
2. Refresh the application
3. Verify that all references update accordingly
4. Check that fallbacks work when company info is not available

## Conclusion

The implementation successfully makes the company name "Konti Hidroplast" dynamic throughout the entire project. All hardcoded references have been replaced with dynamic content that pulls from the company information database, while maintaining appropriate fallbacks for different contexts.
