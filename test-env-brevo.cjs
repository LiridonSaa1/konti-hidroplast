require('dotenv').config();
const { BrevoService } = require('./server/services/brevoService.js');

async function testBrevoConfig() {
  console.log('=== Testing Brevo Configuration from Environment Variables ===');
  
  try {
    const brevoService = new BrevoService();
    const config = await brevoService.getConfig();
    
    if (config) {
      console.log('✅ Brevo configuration loaded successfully from environment variables');
      console.log('📧 Sender Email:', config.senderEmail);
      console.log('🔑 Has API Key:', !!config.apiKey);
      console.log('📝 Sender Name:', config.senderName);
      console.log('📬 Recipient Email:', config.recipientEmail);
      console.log('✅ Is Active:', config.isActive);
    } else {
      console.log('❌ No Brevo configuration found');
      console.log('💡 Make sure you have set BREVO_API_KEY and BREVO_SENDER_EMAIL in your .env file');
    }
  } catch (error) {
    console.error('❌ Error testing Brevo configuration:', error);
  }
}

testBrevoConfig();
