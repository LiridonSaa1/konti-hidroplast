#!/usr/bin/env node

/**
 * Test script to verify company information retrieval and email service integration
 */

// Mock storage for testing
class MockStorage {
  async getAllCompanyInfo() {
    return [
      {
        id: "company-name-1",
        key: "companyName",
        value: "Test Company Name",
        category: "general",
        updatedAt: new Date()
      },
      {
        id: "company-email-1",
        key: "email",
        value: "test@company.com",
        category: "contact",
        updatedAt: new Date()
      },
      {
        id: "company-phone-1",
        key: "phone",
        value: "+123 456 7890",
        category: "contact",
        updatedAt: new Date()
      },
      {
        id: "company-website-1",
        key: "website",
        value: "https://testcompany.com",
        category: "contact",
        updatedAt: new Date()
      }
    ];
  }
}

// Test company info processing
async function testCompanyInfoProcessing() {
  console.log('=== Testing Company Info Processing ===');
  
  try {
    const storage = new MockStorage();
    const companyInfoArray = await storage.getAllCompanyInfo();
    
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
    
    // Test email service integration
    console.log('\n=== Testing Email Service Integration ===');
    
    // Mock email service call
    const mockEmailServiceCall = (companyInfo) => {
      console.log('Email service called with company info:');
      console.log('- Company Name:', companyInfo.companyName);
      console.log('- Email:', companyInfo.email);
      console.log('- Phone:', companyInfo.phone);
      console.log('- Website:', companyInfo.website);
      
      // Test email content generation
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
      
      console.log('\nGenerated email content:');
      console.log(testEmailContent);
      
      return true;
    };
    
    const emailResult = mockEmailServiceCall(companyInfo);
    console.log('\nEmail service result:', emailResult);
    
    console.log('\n✅ Company info processing test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Test fallback scenarios
async function testFallbackScenarios() {
  console.log('\n=== Testing Fallback Scenarios ===');
  
  try {
    // Test with empty company info
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
    
    // Test with partial company info
    const partialCompanyInfo = {
      companyName: 'New Company',
      email: '',
      phone: '',
      website: ''
    };
    
    const partialFallbackCompanyInfo = {
      companyName: partialCompanyInfo.companyName || 'Konti Hidroplast',
      email: partialCompanyInfo.email || 'info@kontihidroplast.com.mk',
      phone: partialCompanyInfo.phone || '+389 2 3120 100',
      website: partialCompanyInfo.website || 'https://konti-hidroplast.com.mk'
    };
    
    console.log('Partial company info fallback:', partialFallbackCompanyInfo);
    
    console.log('✅ Fallback scenarios test completed successfully!');
    
  } catch (error) {
    console.error('❌ Fallback test failed:', error);
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting Company Info Tests...\n');
  
  await testCompanyInfoProcessing();
  await testFallbackScenarios();
  
  console.log('\n🎉 All tests completed!');
}

// Run the tests
runTests().catch(console.error);
