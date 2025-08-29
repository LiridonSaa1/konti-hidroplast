const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testSimple() {
  console.log('Testing simple functionality...\n');

  // Test 1: Check if server is running
  console.log('1. Checking server status...');
  try {
    const response = await fetch('http://localhost:5000/api/health');
    console.log('Server status:', response.status);
    const result = await response.json();
    console.log('Server response:', result);
  } catch (error) {
    console.error('Server not running:', error.message);
    return;
  }

  // Test 2: Test a simple GET endpoint
  console.log('\n2. Testing simple GET endpoint...');
  try {
    const response = await fetch('http://localhost:5000/api/company-info');
    console.log('Company info status:', response.status);
    const result = await response.json();
    console.log('Company info response:', typeof result);
  } catch (error) {
    console.error('Company info error:', error.message);
  }

  // Test 3: Test contact form with minimal data
  console.log('\n3. Testing contact form with minimal data...');
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Test',
        email: 'test@test.com',
        message: 'Test message'
      })
    });

    console.log('Contact form status:', response.status);
    const result = await response.json();
    console.log('Contact form response:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Contact form error:', error.message);
  }
}

testSimple();
