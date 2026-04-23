const axios = require('axios');
const cheerio = require('cheerio');

const signs = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];

async function checkSign(sign, period) {
  const url = `https://www.astrosage.com/horoscope/${period}-${sign}-horoscope.asp`;
  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
      timeout: 20000
    });
    const $ = cheerio.load(data);

    const periodTitle = period === 'monthly' ? 'monthly' : 'yearly';
    let mainBox = null;

    $('div.ui-sign-content-box').each(function() {
      const h1Text = $(this).find('h1').first().text().toLowerCase();
      if (h1Text.includes(periodTitle)) {
        mainBox = $(this);
        return false;
      }
    });

    if (!mainBox) {
      console.log(`  ❌ ${sign.padEnd(12)} | ${period} | No main box found (h1 with "${periodTitle}" not found)`);
      
      // Debug: show all h1s on the page
      const h1s = [];
      $('h1').each(function() { h1s.push($(this).text().trim()); });
      console.log(`             H1s found: ${JSON.stringify(h1s).substring(0, 150)}`);
      return;
    }

    const h2s = [];
    $(mainBox).find('h2[id]').each(function() { h2s.push($(this).attr('id')); });
    
    const firstP = $(mainBox).find('p').first().text().trim().substring(0, 80);
    
    if (h2s.length === 0) {
      console.log(`  ⚠️  ${sign.padEnd(12)} | ${period} | Box found but NO h2[id] sections. First p: "${firstP}"`);
    } else {
      console.log(`  ✅ ${sign.padEnd(12)} | ${period} | Sections: [${h2s.join(', ')}]`);
    }
  } catch(e) {
    console.log(`  💥 ${sign.padEnd(12)} | ${period} | ERROR: ${e.message}`);
  }
}

(async () => {
  for (const period of ['monthly', 'yearly']) {
    console.log(`\n\n============ ${period.toUpperCase()} ============`);
    for (const sign of signs) {
      await checkSign(sign, period);
      await new Promise(r => setTimeout(r, 500)); // small delay to avoid rate limiting
    }
  }
  console.log('\n\nDone!');
})().catch(console.error);
