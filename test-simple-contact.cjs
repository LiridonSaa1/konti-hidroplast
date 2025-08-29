const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testSimpleContact() {
  try {
    console.log('Testing simple contact form...');
    
    const response = await fetch('http://localhost:5000/api/contact', {
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

    console.log('Response status:', response.status);
    const result = await response.json();
    console.log('Response body:', result);
    
    if (response.ok) {
      console.log('✅ Contact form test passed!');
    } else {
      console.log('❌ Contact form test failed!');
    }
  } catch (error) {
    console.error('❌ Error testing contact form:', error.message);
  }
}

testSimpleContact();
