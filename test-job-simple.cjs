const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testJobApplication() {
  try {
    console.log('=== Testing Job Application Form ===');
    
    const response = await fetch('http://localhost:3001/api/job-applications', {
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

    console.log('Job application status:', response.status);
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Job application submitted successfully:', result);
    } else {
      const error = await response.json();
      console.log('❌ Job application failed:', error);
    }
  } catch (error) {
    console.error('❌ Error testing job application:', error.message);
  }
}

testJobApplication();
