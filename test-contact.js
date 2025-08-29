const fetch = require('node-fetch');

async function testContactForm() {
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '123456789',
        company: 'Test Company',
        message: 'This is a test message'
      })
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', result);
  } catch (error) {
    console.error('Error testing contact form:', error.message);
  }
}

testContactForm();
