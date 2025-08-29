const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testJobApplication() {
  try {
    const response = await fetch('http://localhost:5000/api/job-applications', {
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

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', result);
  } catch (error) {
    console.error('Error testing job application:', error.message);
  }
}

testJobApplication();
