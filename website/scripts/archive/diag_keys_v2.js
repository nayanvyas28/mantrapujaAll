const fetch = require('node-fetch');

const API_KEY = 'ak-66b9096f4750db40bac3636c3ab52a00122319d0';
const API_URL = 'https://json.astrologyapi.com/v1';

async function testFetch() {
    const birthData = {
        day: 14, month: 10, year: 2003,
        hour: 14, min: 15,
        lat: 19.076, lon: 72.8777,
        tzone: 5.5, name: 'User'
    };

    const endpoints = [
        { key: 'core', url: 'astro_details' },
        { key: 'panchang', url: 'birth_panchang' },
        { key: 'numero_table', url: 'numero_table' },
        { key: 'current_dasha', url: 'current_vdasha' },
        { key: 'planets', url: 'planets' },
        { key: 'manglik', url: 'manglik' },
        { key: 'sadhesati', url: 'sadhesati_current_status' },
        { key: 'gemstone', url: 'basic_gem_suggestion' },
        { key: 'rudraksha', url: 'rudraksha_suggestion' }
    ];

    const headers = { 
        'x-astrologyapi-key': API_KEY,
        'Content-Type': 'application/json' 
    };

    for (const ep of endpoints) {
        process.stdout.write(`\n=== ENDPOINT: ${ep.url} [${ep.key}] ===\n`);
        const res = await fetch(`${API_URL}/${ep.url}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(birthData)
        });
        const data = await res.json();
        console.log(Object.keys(data).join(', '));
    }
}

testFetch();
