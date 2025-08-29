const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testDebug() {
  try {
    console.log('=== Testing with detailed error logging ===');
    
    // Test health endpoint first
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3001/api/health');
    const healthResult = await healthResponse.json();
    console.log('Health status:', healthResponse.status);
    console.log('Health result:', healthResult);
    
    // Test contact endpoint
    console.log('\n2. Testing contact endpoint...');
    const contactResponse = await fetch('http://localhost:3001/api/contact', {
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

    console.log('Contact status:', contactResponse.status);
    const contactResult = await contactResponse.json();
    console.log('Contact result:', contactResult);
    
    // Test job applications endpoint
    console.log('\n3. Testing job applications endpoint...');
    const jobResponse = await fetch('http://localhost:3001/api/job-applications', {
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

    console.log('Job status:', jobResponse.status);
    const jobResult = await jobResponse.json();
    console.log('Job result:', jobResult);
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testDebug();
