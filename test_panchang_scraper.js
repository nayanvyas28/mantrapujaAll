const axios = require('axios');
const cheerio = require('cheerio');

class PanchangScraper {
    static async fetchPanchangFromAstroSage() {
        const url = 'https://panchang.astrosage.com/panchang/aajkapanchang?language=en';
        console.log(`📡 Fetching and scraping Panchang from: ${url}`);
        
        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml',
            },
            timeout: 20000,
        });

        const $ = cheerio.load(html);
        
        const result = {
            reference_date: new Date().toISOString().split('T')[0],
            title: '',
            location: '',
            panchang_for_today: {},
            sun_moon_calculations: {},
            hindu_month_year: {},
            inauspicious_timings: {},
            auspicious_timings: {},
        };

        const titleText = $('title').text().trim();
        result.title = titleText.split('Panchangam for')[0].trim() || 'Today Panchang';
        result.location = titleText.split('Panchangam for')[1]?.trim() || 'New Delhi, India';

        const parseSection = (sectionTitle, targetObj) => {
            $(`h4:contains("${sectionTitle}")`).next('.row').find('.pan-row').each((_, el) => {
                const label = $(el).find('div').first().text().trim();
                let value = $(el).find('div').last().text().trim();
                value = value.replace(/\s+/g, ' ').trim();
                if (label && value) {
                    targetObj[label] = value;
                }
            });
        };

        parseSection('Panchang For Today', result.panchang_for_today);
        parseSection('Sun And Moon Calculations', result.sun_moon_calculations);
        parseSection('Hindu Month And Year', result.hindu_month_year);
        parseSection('Inauspicious Timings', result.inauspicious_timings);
        parseSection('Auspicious Timings', result.auspicious_timings);

        return result;
    }
}

async function runTest() {
    try {
        console.log('--- STARTING PANCHANG SCRAPER TEST ---');
        const data = await PanchangScraper.fetchPanchangFromAstroSage();
        console.log('✅ Panchang Data Extracted Successfully:');
        console.log(JSON.stringify(data, null, 2));
        console.log('--- TEST RUN COMPLETED SUCCESSFULLY ---');
    } catch (error) {
        console.error('❌ Test Failed:', error);
    }
}

runTest();
