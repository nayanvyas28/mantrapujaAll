const axios = require('axios');
const fs = require('fs');

async function savePanchangHtml() {
  const url = 'https://panchang.astrosage.com/panchang/aajkapanchang?language=en';
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 20000
    });
    fs.writeFileSync('panchang.html', data);
    console.log('Saved to panchang.html');
  } catch (e) {
    console.error('Failed:', e.message);
  }
}
savePanchangHtml();
