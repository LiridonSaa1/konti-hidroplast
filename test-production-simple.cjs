const https = require('https');

async function testProductionAPI() {
  const baseUrl = 'https://upbeat-chandrasekhar.84-46-246-41.plesk.page';
  
  console.log('=== Testing Production Server API ===');
  console.log(`Testing: ${baseUrl}`);
  
  // Test 1: Check if server responds
  try {
    const response = await fetch(`${baseUrl}/api/contact`);
    console.log('✅ Server responds to /api/contact');
    console.log('Status:', response.status);
    
    if (response.status === 200) {
      const text = await response.text();
      console.log('Response preview:', text.substring(0, 200));
      
      if (text.includes('<!DOCTYPE')) {
        console.log('❌ API endpoint returning HTML instead of JSON');
        console.log('💡 This suggests the API route is not properly configured');
      }
    }
  } catch (error) {
    console.log('❌ Error testing /api/contact:', error.message);
  }
  
  // Test 2: Check if there's a health endpoint
  try {
    const response = await fetch(`${baseUrl}/api/health`);
    console.log('\n✅ Server responds to /api/health');
    console.log('Status:', response.status);
  } catch (error) {
    console.log('\n❌ No /api/health endpoint');
  }
  
  console.log('\n=== Analysis ===');
  console.log('The issue is likely one of these:');
  console.log('1. Environment variables not set on production server');
  console.log('2. API routes not properly configured');
  console.log('3. Server not restarted after configuration changes');
  console.log('4. Different deployment setup than localhost');
}

testProductionAPI();
