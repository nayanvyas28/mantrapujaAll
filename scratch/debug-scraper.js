
const axios = require('axios');
const cheerio = require('cheerio');

async function debugScraper() {
    const url = 'https://www.astrosage.com/horoscope/daily-aries-horoscope.asp';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    console.log("Found p tags:", $('p').length);
    
    const boilerplate = [
        'will help you to get information',
        'day to day or routine tasks',
        'personalized predictions',
        'connect live',
        'Moon sign',
        'ascendant',
        'generalized predictions',
        'Rating',
        'rating'
    ];

    $('p').each((i, el) => {
        const text = $(el).text().trim();
        if (text.length < 5) return;
        
        const isBoilerplate = boilerplate.some(phrase => text.toLowerCase().includes(phrase.toLowerCase()));
        const isShort = text.length < 80;
        
        console.log(`[P ${i}] Len: ${text.length} | Boilerplate: ${isBoilerplate} | Short: ${isShort}`);
        if (!isBoilerplate && !isShort) {
            console.log("   >>> SELECTED: " + text.substring(0, 50) + "...");
        } else {
            console.log("   REJECTED: " + text.substring(0, 50) + "...");
        }
    });
}
debugScraper();
