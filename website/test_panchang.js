const axios = require('axios');
const cheerio = require('cheerio');

async function testPanchang() {
    const url = 'https://panchang.astrosage.com/panchang/aajkapanchang?language=en';
    console.log('Fetching:', url);
    
    try {
        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            }
        });

        const $ = cheerio.load(html);
        const result = {
            panchang_for_today: {},
            sun_moon_calculations: {},
            hindu_month_year: {},
            inauspicious_timings: {},
            auspicious_timings: {},
        };

        const titleText = $('title').text().trim();
        result.title = titleText.split('Panchangam for')[0].trim();
        result.location = titleText.split('Panchangam for')[1]?.trim();

        const parseSection = (sectionTitle, targetObj) => {
            console.log(`\nParsing Section: ${sectionTitle}`);
            const h4 = $(`h4:contains("${sectionTitle}")`);
            if (h4.length === 0) {
                console.log(`  Header "${sectionTitle}" not found`);
                return;
            }
            h4.next('.row').find('.pan-row').each((_, el) => {
                const label = $(el).find('div').first().text().trim();
                let value = $(el).find('div').last().text().trim();
                value = value.replace(/\s+/g, ' ').trim();
                if (label && value) {
                    console.log(`  - ${label}: ${value}`);
                    targetObj[label] = value;
                }
            });
        };

        parseSection('Panchang For Today', result.panchang_for_today);
        parseSection('Sun And Moon Calculations', result.sun_moon_calculations);
        parseSection('Hindu Month And Year', result.hindu_month_year);
        parseSection('Inauspicious Timings', result.inauspicious_timings);
        parseSection('Auspicious Timings', result.auspicious_timings);

        console.log('\nFINAL RESULT:', JSON.stringify(result, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testPanchang();
