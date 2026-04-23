const axios = require('axios');
const cheerio = require('cheerio');

async function probePanchang() {
  const url = 'https://panchang.astrosage.com/panchang/aajkapanchang?language=en';
  console.log('Probing URL:', url);
  
  try {
    const { data } = await axios.get(url, {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
      },
      timeout: 20000
    });
    const $ = cheerio.load(data);

    const result = {};

    // 1. Basic Date info
    result.date = $('.daily-panchang-title-date').text().trim();
    console.log('Date:', result.date);

    // 2. Main Panchang Grid (Tithi, Nakshatra, etc)
    // Looking for tables or grid items
    console.log('\n--- Extraction via Tables ---');
    $('table tr').each((i, el) => {
      const label = $(el).find('td').first().text().trim();
      const value = $(el).find('td').last().text().trim();
      if (label && value) {
        console.log(`${label}: ${value}`);
      }
    });

    console.log('\n--- Extraction via ui-grid items ---');
     $('.ui-grid-item').each((i, el) => {
      const label = $(el).find('.ui-label').text().trim();
      const value = $(el).find('.ui-value').text().trim();
       if (label && value) {
        console.log(`${label}: ${value}`);
      }
    });

    // Check specific IDs if known
    
  } catch (e) {
    console.error('Probe failed:', e.message);
  }
}

probePanchang();
