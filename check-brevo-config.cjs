// Load environment variables from .env file
require('dotenv').config();

async function checkConfig() {
  console.log('🔍 Checking Brevo Configuration Status...\n');
  
  try {
    // Check environment variables directly
    const envSmtpLogin = process.env.BREVO_SMTP_LOGIN;
    const envSmtpKey = process.env.BREVO_SMTP_KEY;
         const envSenderEmail = process.env.BREVO_SENDER_EMAIL;
    
    console.log('📊 Configuration Status:');
    
    if (!envSmtpLogin) {
      console.log('❌ BREVO_SMTP_LOGIN not set');
    } else {
      console.log(`✅ BREVO_SMTP_LOGIN: ${envSmtpLogin}`);
    }

    if (!envSmtpKey) {
      console.log('❌ BREVO_SMTP_KEY not set');
    } else {
      console.log(`✅ BREVO_SMTP_KEY: ${envSmtpKey.substring(0, 10)}...`);
    }

    if (!envSenderEmail) {
      console.log('❌ BREVO_SENDER_EMAIL not set');
    } else {
      console.log(`✅ BREVO_SENDER_EMAIL: ${envSenderEmail}`);
    }
    
    const configured = !!(envSmtpLogin && envSmtpKey && envSenderEmail);
    
    if (configured) {
      console.log('\n✅ Brevo is properly configured!');
      console.log('📧 Email functionality should work correctly.');
    } else {
      console.log('\n❌ Brevo is not properly configured.');
      console.log('📧 Email functionality will be disabled until configured.');
      console.log('');
      console.log('📧 To fix this, create a .env file in your project root with:');
      console.log('   BREVO_SMTP_LOGIN=your_email@gmail.com');
      console.log('   BREVO_SMTP_KEY=your_smtp_key_here');
      console.log('   BREVO_SENDER_EMAIL=your_email@gmail.com');
      console.log('🔑 Get your SMTP key from: https://app.brevo.com/settings/keys/smtp');
      console.log('📖 See BREVO_CONFIGURATION_GUIDE.md for detailed setup instructions');
    }
    
  } catch (error) {
    console.error('❌ Error checking configuration:', error.message);
  }
}

checkConfig();
