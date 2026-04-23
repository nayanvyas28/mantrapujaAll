const ADMIN_URL = 'http://10.210.37.64:4000';

async function testConnection() {
    console.log(`Checking connection to: ${ADMIN_URL}/health ...`);
    try {
        const start = Date.now();
        const res = await fetch(`${ADMIN_URL}/health`);
        const duration = Date.now() - start;
        if (res.ok) {
            console.log(`✅ Success! Backend responded in ${duration}ms`);
            const data = await res.json();
            console.log('Backend Data:', data);
        } else {
            console.error(`❌ Backend returned status: ${res.status}`);
        }
    } catch (err) {
        console.error(`💥 Connection Failed: ${err.message}`);
        console.log('\n--- Troubleshooting ---');
        console.log('1. Ensure backend is running (run: node src/index.js in backend folder)');
        console.log('2. Check if IP 10.210.37.64 is still your local IP (run: ipconfig)');
        console.log('3. Ensure your phone is on the SAME Wi-Fi as your laptop.');
    }
}

testConnection();
