const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testEndpoints() {
  console.log('Testing endpoints...\n');

  // Test 1: Contact form
  console.log('1. Testing contact form...');
  try {
    const contactResponse = await fetch('http://localhost:5000/api/contact', {
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

    console.log('Contact form status:', contactResponse.status);
    const contactResult = await contactResponse.json();
    console.log('Contact form response:', JSON.stringify(contactResult, null, 2));
  } catch (error) {
    console.error('Contact form error:', error.message);
  }

  console.log('\n2. Testing job application...');
  try {
    const jobResponse = await fetch('http://localhost:5000/api/job-applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@example.com',
        phoneNumber: '123456789',
        position: 'Software Developer',
        experience: '5 years',
        coverLetter: 'This is a test application'
      })
    });

    console.log('Job application status:', jobResponse.status);
    const jobResult = await jobResponse.json();
    console.log('Job application response:', JSON.stringify(jobResult, null, 2));
  } catch (error) {
    console.error('Job application error:', error.message);
  }

  console.log('\n3. Testing server health...');
  try {
    const healthResponse = await fetch('http://localhost:5000/api/health');
    console.log('Health status:', healthResponse.status);
    const healthResult = await healthResponse.json();
    console.log('Health response:', JSON.stringify(healthResult, null, 2));
  } catch (error) {
    console.error('Health check error:', error.message);
  }
}

testEndpoints();
