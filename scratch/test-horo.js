
const { HoroscopeService } = require('./website/src/lib/horoscopeService');
require('dotenv').config({ path: 'website/.env.local' });

async function test() {
    console.log("Testing Aries Daily...");
    try {
        const data = await HoroscopeService.fetchFromAstroSage('aries', 'daily');
        console.log("Aries Daily Content Length:", data.length);
        console.log("Preview:", data.substring(0, 100) + "...");
    } catch (e) {
        console.error("Test failed:", e);
    }
}

test();
