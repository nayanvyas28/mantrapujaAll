const axios = require('axios');

const API_KEY = 'ak-66b9096f4750db40bac3636c3ab52a00122319d0';
const API_URL = 'https://json.astrologyapi.com/v1';

async function probe() {
  const birthData = {
    day: 12, month: 3, year: 1993,
    hour: 14, min: 15,
    lat: 19.076, lon: 72.8777, tzone: 5.5
  };

  const headers = { 'x-astrologyapi-key': API_KEY, 'Content-Type': 'application/json' };

  try {
    const endpoints = [
       '/career_report', 
       '/finance_report',
       '/match_astakoot_points',  // checking marriage/partner
       '/life_reports/career',  // Alternative path
       '/varshaphal_details'      // Year-based career/finance
    ];
    
    for (const ep of endpoints) {
        try {
            const res = await axios.post(`${API_URL}${ep}`, birthData, { headers });
            console.log(`\n==== ${ep} SUCCESS ====`);
            console.log("Object keys:", Object.keys(res.data).slice(0, 5).join(", "));
        } catch (e) {
            console.log(`\n==== ${ep} FAILED ====`);
            console.log(e.response?.data?.msg || e.message);
        }
    }
  } catch (err) {
    console.log("FAILED DEETS:", err.message);
  }
}
probe();
