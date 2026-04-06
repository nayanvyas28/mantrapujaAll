const axios = require('axios');

const API_KEY = 'ak-66b9096f4750db40bac3636c3ab52a00122319d0';
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
    console.log("--- ASTROLOGY API PLAN DIAGNOSTIC ---");
    
    try {
      await axios.post(`${API_URL}/astro_details`, birthData, { headers });
      console.log("✓ Core Details: AUTHORIZED");
    } catch (e) {
      console.log("X Core Details: " + (e.response?.data?.msg || e.message));
    }

    try {
      await axios.post(`${API_URL}/birth_panchang`, birthData, { headers });
      console.log("✓ Birth Panchang: AUTHORIZED");
    } catch (e) {
      console.log("X Birth Panchang: " + (e.response?.data?.msg || e.message));
    }

    try {
      await axios.post(`${API_URL}/major_vdasha`, birthData, { headers });
      console.log("✓ Major Dasha: AUTHORIZED");
    } catch (e) {
      console.log("X Major Dasha: " + (e.response?.data?.msg || e.message));
    }

    console.log("--- DIAGNOSTIC COMPLETE ---");

  } catch (err) {
    console.log("CRITICAL_FAIL: " + err.message);
  }
}
diagnose();
