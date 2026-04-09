const axios = require('axios');

const API_URL = 'https://json.astrologyapi.com/v1';
const API_KEY = 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd';

const birthData = {
  day: 14,
  month: 10,
  year: 2003,
  hour: 14,
  min: 15,
  lat: 19.076,
  lon: 72.8777,
  tzone: 5.5
};

const headers = {
  'x-astrologyapi-key': API_KEY,
  'Content-Type': 'application/json'
};

const endpoints = [
  'horo_chart_image/D1',
  'horo_chart_image/sun',
  'horo_chart_image/moon',
  'horo_chart_image/D9',
  'horo_chart_image/lang/en/D1'
];

async function probe() {
  console.log('--- CELESTIAL CHART PROBE ---');
  for (const ep of endpoints) {
    try {
      const res = await axios.post(`${API_URL}/${ep}`, birthData, { headers });
      console.log(`[OK] ${ep}: SVG ${res.data.svg ? 'Found' : 'MISSING'}`);
    } catch (e) {
      console.log(`[FAIL] ${ep}: ${e.response?.status} - ${e.response?.data?.msg || e.message}`);
    }
  }
}

probe();
