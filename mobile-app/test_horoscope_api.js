const ADMIN_URL = 'http://localhost:4000'; // Backend server port

async function testHoroscopeApi() {
    const sign = 'aries';
    const period = 'daily';
    
    console.log(`\n🔮 Testing Horoscope/Rashifal API...`);
    console.log(`📍 Endpoint: ${ADMIN_URL}/api/astrology/horoscope?sign=${sign}&period=${period}\n`);

    try {
        const start = Date.now();
        const response = await fetch(`${ADMIN_URL}/api/astrology/horoscope?sign=${sign}&period=${period}`);

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
            console.log(`📝 Sign: ${result.data.sign.toUpperCase()}`);
            console.log(`📅 Period: ${result.data.period_type}`);
            console.log(`🏷️ Date Label: ${result.data.date_label || 'N/A'}`);
            console.log(`🟢 Lucky Number: ${result.data.lucky_number || 'N/A'}`);
            console.log(`🔵 Lucky Color: ${result.data.lucky_color || 'N/A'}`);
            console.log(`💊 Remedy: ${result.data.remedy || 'N/A'}`);
            console.log(`\n📖 Content:\n${result.data.content}\n`);
            
            if (result.data.ratings) {
                console.log(`⭐ Ratings:`);
                result.data.ratings.forEach(r => {
                    console.log(`  - ${r.label}: ${'★'.repeat(r.score)}${'☆'.repeat(5 - r.score)} (${r.score}/5)`);
                });
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

testHoroscopeApi();
