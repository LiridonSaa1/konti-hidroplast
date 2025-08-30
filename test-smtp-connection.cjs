// Test SMTP connection with Brevo
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testSMTPConnection() {
  console.log('🔍 Testing Brevo SMTP Connection...\n');
  
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // Use STARTTLS
      requireTLS: true, // Require TLS encryption
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_KEY
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    console.log('📧 SMTP Configuration:');
    console.log(`   Host: smtp-relay.brevo.com`);
    console.log(`   Port: 587`);
    console.log(`   Login: ${process.env.BREVO_SMTP_LOGIN}`);
    console.log(`   Key: ${process.env.BREVO_SMTP_KEY.substring(0, 8)}...`);
    console.log('');

    console.log('🔐 Testing connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    console.log('\n📤 Testing email sending...');
    const testEmail = {
      from: `"Test" <${process.env.BREVO_SENDER_EMAIL}>`,
      to: process.env.BREVO_SENDER_EMAIL,
      subject: 'SMTP Test - Brevo Connection',
      text: 'This is a test email to verify Brevo SMTP connection is working correctly.',
      html: '<p>This is a test email to verify Brevo SMTP connection is working correctly.</p>'
    };
    
    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${result.messageId}`);
    
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('🔑 Authentication failed - check your SMTP login and key');
    } else if (error.code === 'ECONNECTION') {
      console.log('🌐 Connection failed - check your network and SMTP settings');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('⏰ Connection timeout - check your network connection');
    }
  }
}

testSMTPConnection();
