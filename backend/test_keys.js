// Using global fetch from Node 20+

const keys = [
    { name: "Primary Key 1", user_id: "651550", api_key: "ak-36483fc8a7f94df8504faacc4db3a46cafb353bd" },
    { name: "Fallback Key 2", user_id: "637158", api_key: "ak-66b9096f4750db40bac3636c3ab52a00122319d0" },
    { name: "Premium Fallback", user_id: "629910", api_key: "d33e9d8924b10499e15df332f99580b0" }
];

const birthData = {
    day: 23, month: 4, year: 1995, hour: 10, min: 30, lat: 28.6139, lon: 77.2090, tzone: 5.5
};

async function testKeys() {
    for (const key of keys) {
        console.log(`Testing ${key.name} (${key.user_id})...`);
        const auth = `Basic ${Buffer.from(`${key.user_id}:${key.api_key}`).toString('base64')}`;
        try {
            const response = await fetch("https://json.astrologyapi.com/v1/health_report", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth,
                    'x-astrologyapi-key': key.api_key
                },
                body: JSON.stringify(birthData)
            });
            const data = await response.json();
            if (response.ok) {
                console.log(`✅ ${key.name} SUCCESS! Data length: ${JSON.stringify(data).length}`);
            } else {
                console.log(`❌ ${key.name} FAILED: ${data.msg || data.message || response.statusText}`);
            }
        } catch (err) {
            console.log(`❌ ${key.name} ERROR: ${err.message}`);
        }
        console.log('---');
    }
}

testKeys();
