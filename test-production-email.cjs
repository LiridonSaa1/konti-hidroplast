const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(args));

async function testProductionEmail() {
  try {
    console.log('=== Testing Production Email Configuration ===');
    
    // Get the base URL from command line or use default
    const baseUrl = process.argv[2] || 'https://your-production-domain.com';
    
    console.log(`Testing against: ${baseUrl}`);
    
    // Test 1: Check if server is accessible
    console.log('\n1. Testing server accessibility...');
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      console.log('Server response status:', response.status);
      if (response.ok) {
        console.log('✅ Server is accessible');
      } else {
        console.log('⚠️ Server responded but with status:', response.status);
      }
    } catch (error) {
      console.log('❌ Server not accessible:', error.message);
      console.log('💡 Make sure to replace "your-production-domain.com" with your actual domain');
      return;
    }
    
    // Test 2: Test contact form submission
    console.log('\n2. Testing contact form submission...');
    try {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: 'Production Test User',
          email: 'test@example.com',
          phone: '123456789',
          company: 'Test Company',
          message: 'This is a production test message to check email functionality'
        })
      });
      
      const result = await response.json();
      console.log('Response status:', response.status);
      console.log('Response body:', result);
      
      if (result.emailsSent) {
        console.log('✅ Emails were sent successfully!');
      } else {
        console.log('❌ Emails were not sent. Check Brevo configuration.');
        console.log('\n🔧 To fix this:');
        console.log('1. Check your production environment variables');
        console.log('2. Ensure BREVO_SMTP_LOGIN, BREVO_SMTP_KEY, and BREVO_SENDER_EMAIL are set');
        console.log('3. Verify your Brevo SMTP credentials');
        console.log('4. Restart your production server');
      }
    } catch (error) {
      console.log('❌ Error testing contact form:', error.message);
    }
    
    console.log('\n=== Test Complete ===');
    
  } catch (error) {
    console.error('Error in test:', error.message);
  }
}

// Usage: node test-production-email.cjs https://yourdomain.com
testProductionEmail();
