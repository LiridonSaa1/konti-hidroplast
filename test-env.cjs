// Test environment variable loading
require('dotenv').config();

console.log('🔍 Testing Environment Variables...\n');

console.log('All environment variables:');
console.log(process.env);

console.log('\n--- Specific Brevo variables ---');
console.log('BREVO_SMTP_LOGIN:', process.env.BREVO_SMTP_LOGIN);
console.log('BREVO_SMTP_KEY:', process.env.BREVO_SMTP_KEY);
console.log('BREVO_SENDER_EMAIL:', process.env.BREVO_SENDER_EMAIL);

console.log('\n--- File contents ---');
const fs = require('fs');
if (fs.existsSync('.env')) {
  console.log('.env file exists and contains:');
  console.log(fs.readFileSync('.env', 'utf8'));
} else {
  console.log('.env file does not exist');
}
