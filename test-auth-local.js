// Test authentication locally
async function testAuth() {
  try {
    console.log('Testing authentication at http://localhost:3001/api/auth/callback/credentials\n');

    const response = await fetch('http://localhost:3001/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: 'sales@livatosolutions.com',
        password: 'your-password-here', // Replace with actual password
        redirect: 'false',
        json: 'true'
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const text = await response.text();
    console.log('Response body:', text);

    if (response.ok) {
      console.log('\n✅ Authentication successful!');
    } else {
      console.log('\n❌ Authentication failed');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAuth();
