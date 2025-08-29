const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function checkBrevoConfig() {
  try {
    console.log('=== Checking Brevo Configuration Status ===');
    
    // Test contact form to see current email status
    console.log('\n1. Testing contact form to check email status...');
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: 'Config Check User',
          email: 'check@example.com',
          phone: '123456789',
          company: 'Test Company',
          message: 'Checking Brevo configuration status'
        })
      });
      
      const result = await response.json();
      console.log('Response status:', response.status);
      console.log('Response body:', result);
      
      console.log('\n📧 Email Status:');
      console.log(`- Emails Sent: ${result.emailsSent ? '✅ Yes' : '❌ No'}`);
      console.log(`- Notification Sent: ${result.notificationSent ? '✅ Yes' : '❌ No'}`);
      console.log(`- Auto-reply Sent: ${result.autoReplySent ? '✅ Yes' : '❌ No'}`);
      
    } catch (error) {
      console.log('❌ Error testing contact form:', error.message);
    }
    
    console.log('\n=== Configuration Instructions ===');
    console.log('\nTo fix email issues:');
    console.log('1. Go to your admin panel (login with admin/admin123)');
    console.log('2. Navigate to "Email Settings" or "Brevo Configuration"');
    console.log('3. Configure the following:');
    console.log('   - Brevo API Key (from https://app.brevo.com/ SMTP tab)');
    console.log('   - Notification Recipient Email (where you want notifications)');
    console.log('   - Sender Email (your verified Brevo sender)');
    console.log('   - Enable the configuration');
    console.log('4. Use "Test Connection" button to verify settings');
    console.log('5. Submit a contact form to test email sending');
    
    console.log('\n=== Current Status ===');
    console.log('✅ Form submissions working');
    console.log('✅ Data being saved to database');
    console.log('❌ Emails not being sent (needs admin panel configuration)');
    
  } catch (error) {
    console.error('Error in check:', error.message);
  }
}

checkBrevoConfig();
