const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testBrevoConfig() {
  try {
    const response = await fetch('http://localhost:5000/api/admin/brevo-config');
    const result = await response.json();
    console.log('Brevo config status:', response.status);
    console.log('Brevo config:', result);
  } catch (error) {
    console.error('Error testing Brevo config:', error.message);
  }
}

testBrevoConfig();
