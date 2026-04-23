async function testApi() {
    const url = `http://10.210.37.64:4000/api/pujas/detail/shiv-puja`;
    console.log(`Testing: ${url}`);
    try {
        const response = await fetch(url);
        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Response:', text.substring(0, 500));
    } catch (err) {
        console.error('Error:', err.message);
    }
}

testApi();
