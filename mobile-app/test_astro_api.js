const ADMIN_URL = 'http://10.210.37.64:4000'; // Updated to your current IP

const testData = {
    birthData: {
        day: 15,
        month: 8,
        year: 1995,
        hour: 10,
        min: 30,
        lat: 28.6139,
        lon: 77.2090,
        tzone: 5.5
    },
    language: 'en'
};

async function testAstroApi() {
    console.log(`\n🚀 Testing Astrology Mega-API...`);
    console.log(`📍 Endpoint: ${ADMIN_URL}/api/astrology/kundli`);
    console.log(`📊 Testing with: ${JSON.stringify(testData.birthData)}\n`);

    try {
        const start = Date.now();
        const response = await fetch(`${ADMIN_URL}/api/astrology/kundli`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });

        const duration = Date.now() - start;
        console.log(`⏱️ Request completed in ${duration}ms`);

        if (!response.ok) {
            console.error(`❌ API Error: ${response.status} ${response.statusText}`);
            const errBody = await response.text();
            console.error(`Body: ${errBody}`);
            return;
        }

        const result = await response.json();
        
        if (result.success) {
            console.log(`✅ Success! Data received.\n`);
            
            const keys = Object.keys(result.data);
            console.log(`📝 Received Sections:`);
            keys.forEach(key => {
                const data = result.data[key];
                const status = (data && !data.error) ? '✅' : '❌';
                const type = typeof data;
                const preview = type === 'string' ? `${data.substring(0, 50)}...` : JSON.stringify(data).substring(0, 50) + '...';
                console.log(`  ${status} ${key.padEnd(15)} | ${preview}`);
            });

            // Check for specific common issues
            if (result.data.chart_d1 && result.data.chart_d1.error) {
                console.warn(`\n⚠️ Warning: Chart D1 failed to load.`);
            }
            if (result.data.core && result.data.core.error) {
                console.warn(`\n⚠️ Warning: Core Astro Details failed to load.`);
            }

        } else {
            console.error(`❌ API returned success: false`);
            console.log(result);
        }
    } catch (error) {
        console.error(`💥 Connection Failed: ${error.message}`);
        console.log(`\nTip: Ensure your backend is running at ${ADMIN_URL}`);
    }
}

testAstroApi();
