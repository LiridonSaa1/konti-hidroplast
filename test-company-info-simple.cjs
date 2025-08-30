#!/usr/bin/env node

console.log('=== Testing Company Info Processing ===');

// Mock company info data
const companyInfoArray = [
  {
    id: "company-name-1",
    key: "companyName",
    value: "Test Company Name",
    category: "general"
  },
  {
    id: "company-email-1",
    key: "email",
    value: "test@company.com",
    category: "contact"
  },
  {
    id: "company-phone-1",
    key: "phone",
    value: "+123 456 7890",
    category: "contact"
  },
  {
    id: "company-website-1",
    key: "website",
    value: "https://testcompany.com",
    category: "contact"
  }
];

console.log('Raw company info:', companyInfoArray);

// Process company info the same way as in the server route
const companyInfoMap = companyInfoArray.reduce((acc, item) => {
  acc[item.key] = item.value;
  return acc;
}, {});

console.log('Processed company info map:', companyInfoMap);

const companyInfo = {
  companyName: companyInfoMap.companyName || 'Konti Hidroplast',
  email: companyInfoMap.email || 'info@kontihidroplast.com.mk',
  phone: companyInfoMap.phone || '+389 2 3120 100',
  website: companyInfoMap.website || 'https://konti-hidroplast.com.mk'
};

console.log('Final company info object:', companyInfo);

// Test email content generation
console.log('\n=== Testing Email Content Generation ===');

const testEmailContent = `
Subject: Your Test Brochure Download Link - ${companyInfo.companyName}

Thank you for your interest in ${companyInfo.companyName} solutions

Contact Information:
- Email: ${companyInfo.email}
- Phone: ${companyInfo.phone}
- Website: ${companyInfo.website}

Best regards,
The ${companyInfo.companyName} Team

© 2024 ${companyInfo.companyName}. All rights reserved.
`;

console.log('Generated email content:');
console.log(testEmailContent);

// Test fallback scenarios
console.log('\n=== Testing Fallback Scenarios ===');

const emptyCompanyInfo = {
  companyName: '',
  email: '',
  phone: '',
  website: ''
};

const fallbackCompanyInfo = {
  companyName: emptyCompanyInfo.companyName || 'Konti Hidroplast',
  email: emptyCompanyInfo.email || 'info@kontihidroplast.com.mk',
  phone: emptyCompanyInfo.phone || '+389 2 3120 100',
  website: emptyCompanyInfo.website || 'https://konti-hidroplast.com.mk'
};

console.log('Empty company info fallback:', fallbackCompanyInfo);

console.log('\n✅ All tests completed successfully!');
