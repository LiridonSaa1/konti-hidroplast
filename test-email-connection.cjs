const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testEmailConnection() {
  try {
    console.log('=== Testing Email Connection ===');
    
    // Test 1: Check if Brevo config endpoint is accessible
    console.log('\n1. Testing Brevo config endpoint...');
    try {
      const response = await fetch('http://localhost:3001/api/admin/brevo-config');
      console.log('Response status:', response.status);
      if (response.status === 401) {
        console.log('✅ Endpoint accessible (requires authentication)');
      } else {
        console.log('Response body:', await response.text());
      }
    } catch (error) {
      console.log('❌ Error accessing endpoint:', error.message);
    }
    
    // Test 2: Test contact form submission (this should trigger email sending)
    console.log('\n2. Testing contact form submission...');
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: 'Email Test User',
          email: 'test@example.com',
          phone: '123456789',
          company: 'Test Company',
          message: 'This is a test message to check email functionality'
        })
      });
      
      const result = await response.json();
      console.log('Response status:', response.status);
      console.log('Response body:', result);
      
      if (result.emailsSent) {
        console.log('✅ Emails were sent successfully!');
      } else {
        console.log('❌ Emails were not sent. Check Brevo configuration.');
      }
    } catch (error) {
      console.log('❌ Error testing contact form:', error.message);
    }
    
    console.log('\n=== Test Complete ===');
    console.log('\nTo fix email issues:');
    console.log('1. Go to https://app.brevo.com/');
    console.log('2. Get your SMTP key from SMTP tab');
    console.log('3. Verify your sender email in Senders list');
    console.log('4. Update the .env file with real credentials');
    console.log('5. Restart the server');
    
  } catch (error) {
    console.error('Error in test:', error.message);
  }
}

testEmailConnection();
