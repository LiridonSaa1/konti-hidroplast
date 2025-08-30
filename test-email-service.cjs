// Test the email service methods directly
require('dotenv').config();

async function testEmailService() {
  console.log('🔍 Testing Email Service Methods...\n');
  
  try {
    // Import the service using dynamic import
    const { BrevoService } = await import('./server/services/brevoService.js');
    const brevoService = new BrevoService();
    
    console.log('✅ Email service imported successfully');
    
    // Test configuration
    console.log('\n📊 Testing Configuration...');
    const isConfigured = await brevoService.isBrevoConfigured();
    console.log('Brevo configured:', isConfigured);
    
    if (!isConfigured) {
      console.log('❌ Brevo not configured - cannot test email methods');
      return;
    }
    
    // Test connection
    console.log('\n🔐 Testing Connection...');
    const connectionResult = await brevoService.testConnection();
    console.log('Connection result:', connectionResult);
    
    // Test contact notification
    console.log('\n📧 Testing Contact Notification...');
    const testContactData = {
      fullName: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      company: 'Test Company',
      message: 'This is a test message from the email service test.'
    };
    
    const contactResult = await brevoService.sendContactNotification(testContactData);
    console.log('Contact notification result:', contactResult);
    
    // Test auto-reply
    console.log('\n📧 Testing Auto-Reply...');
    const autoReplyResult = await brevoService.sendAutoReply(testContactData);
    console.log('Auto-reply result:', autoReplyResult);
    
    console.log('\n✅ All tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testEmailService();
