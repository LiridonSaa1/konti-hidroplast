const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testStorage() {
  try {
    console.log('=== Testing Storage Directly ===');
    
    // Test if we can create a simple contact message
    console.log('1. Testing contact message creation...');
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
    if (contactResponse.ok) {
      const contactResult = await contactResponse.json();
      console.log('✅ Contact message created successfully:', contactResult);
    } else {
      const contactError = await contactResponse.json();
      console.log('❌ Contact message failed:', contactError);
    }
    
    // Test if we can retrieve contact messages
    console.log('\n2. Testing contact message retrieval...');
    const getContactResponse = await fetch('http://localhost:3001/api/admin/contact-messages');
    console.log('Get contact status:', getContactResponse.status);
    if (getContactResponse.ok) {
      const messages = await getContactResponse.json();
      console.log('✅ Retrieved contact messages:', messages.length);
    } else {
      console.log('❌ Failed to retrieve contact messages');
    }
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testStorage();
