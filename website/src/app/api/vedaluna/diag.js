const fetch = require('node-fetch');

const API_KEY = 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd';

async function testEP(url) {
    const res = await fetch(`https://json.astrologyapi.com/v1/${url}`, {
        method: 'POST',
        headers: {
            'x-astrologyapi-key': `${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            day: 14, month: 10, year: 2003,
            hour: 14, min: 15,
            lat: 19.076, lon: 72.8777,
            tzone: 5.5
        })
    });
    const data = await res.json();
    console.log(`--- ${url} ---`);
    console.log(res.status === 200 ? 'SUCCESS' : `FAILED: ${data.msg || data.message || 'Unknown'}`);
    if (res.status !== 200) console.log(JSON.stringify(data, null, 2));
}

async function run() {
    await testEP('astro_details');
    await testEP('life_forecast');
    await testEP('rudraksha_suggestion');
}

run();
