const axios = require('axios');

const API_KEY = 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd';
const API_URL = 'https://json.astrologyapi.com/v1';

async function diagnose() {
  const birthData = {
    day: 12, month: 3, year: 1993,
    hour: 14, min: 15,
    lat: 19.076, lon: 72.8777, tzone: 5.5,
    name: 'User'
  };

  const headers = { 'x-astrologyapi-key': API_KEY, 'Content-Type': 'application/json' };

  try {
    console.log("Checking Astro Details...");
    const details = await axios.post(`${API_URL}/astro_details`, birthData, { headers });
    console.log("Details: SUCCESS");

    console.log("\nChecking Birth Panchang...");
    const panchang = await axios.post(`${API_URL}/birth_panchang`, birthData, { headers });
    console.log("Panchang: SUCCESS");

    console.log("\nChecking Major Dasha...");
    const dasha = await axios.post(`${API_URL}/major_vdasha`, birthData, { headers });
    console.log("Dasha: SUCCESS");

  } catch (err) {
    console.log("\nERROR DETECTED:");
    console.log(err.response?.data?.msg || err.message);
  }
}
diagnose();
