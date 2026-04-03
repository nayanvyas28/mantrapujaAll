const axios = require('axios');
const fs = require('fs');

const API_KEY = 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd';
const API_URL = 'https://json.astrologyapi.com/v1';

async function probe() {
  const birthData = {
    day: 12, month: 3, year: 1993,
    hour: 14, min: 15,
    lat: 19.076, lon: 72.8777, tzone: 5.5,
    name: 'User'
  };

  const headers = { 'x-astrologyapi-key': API_KEY, 'Content-Type': 'application/json' };

  try {
    const dasha = await axios.post(`${API_URL}/major_vdasha`, birthData, { headers });
    console.log("== MAJOR VDASHA ==");
    console.log(JSON.stringify(dasha.data.slice(0, 2), null, 2));

    const numTable = await axios.post(`${API_URL}/numero_table`, birthData, { headers });
    console.log("\n== NUMERO TABLE ==");
    console.log(Object.keys(numTable.data).join(", "));
    
    const numReport = await axios.post(`${API_URL}/numero_report`, birthData, { headers });
    console.log("\n== NUMERO REPORT ==");
    console.log(JSON.stringify(numReport.data.map(r => r.title), null, 2));
    
  } catch (err) {
    console.log(err.response?.data?.msg || err.message);
  }
}
probe();
