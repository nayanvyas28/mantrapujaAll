const axios = require('axios');
const fs = require('fs');

const API_KEY = 'ak-66b9096f4750db40bac3636c3ab52a00122319d0';
const API_URL = 'https://json.astrologyapi.com/v1';

async function probe() {
  const birthData = {
    day: 12, month: 3, year: 1993,
    hour: 14, min: 15,
    lat: 19.076, lon: 72.8777, tzone: 5.5,
    // Varshaphal requires the specific year for prediction
    year: 2026 
  };
  
  const vData = { ...birthData };

  const headers = { 'x-astrologyapi-key': API_KEY, 'Content-Type': 'application/json' };

  let output = '';

  try {
    const endpoints = [
       '/general_ascendant_report', // Ascendant details (personality)
       '/general_house_report/sun', // Sun in a specific house
       '/bhav_madhya',              // Houses details
       '/varshaphal_details',        // Yearly horoscope
       '/horoscope_prediction/daily' // Daily prediction
    ];
    
    for (const ep of endpoints) {
        try {
            const dataToUse = ep === '/varshaphal_details' ? vData : birthData;
            const res = await axios.post(`${API_URL}${ep}`, dataToUse, { headers });
            output += `\n==== ${ep} SUCCESS ====\n`;
            
            if (ep === '/general_ascendant_report') {
               output += `Data: ${JSON.stringify(res.data).slice(0, 100)}...\n`;
            } else if (ep === '/general_house_report/sun') {
               output += `Data: ${res.data.house_report.slice(0, 100)}...\n`;
            } else if (ep === '/horoscope_prediction/daily') {
               output += `Data: ${res.data.prediction_date} - ${Object.keys(res.data.prediction).join(', ')}\n`;
            } else {
               output += `Keys: ${Object.keys(res.data).slice(0, 5).join(", ")}\n`;
            }
        } catch (e) {
            output += `\n==== ${ep} FAILED ====\n`;
            output += (e.response?.data?.msg || e.message) + "\n";
        }
    }
    fs.writeFileSync('trial_capabilities.txt', output, 'utf8');
  } catch (err) {
    fs.writeFileSync('trial_capabilities.txt', err.message, 'utf8');
  }
}
probe();
