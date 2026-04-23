const cheerio = require('cheerio');
const axios = require('axios');

async function scrapeHoro(sunsign) {
    try {
        const url = `https://www.astrosage.com/horoscope/daily-${sunsign}-horoscope.asp`;
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
            }
        });
        const $ = cheerio.load(data);
        
        // Find the horoscope text.
        // It usually is inside some paragraph.
        // The python repo used //*[@id="roundborder"]/div[2]/div[3]/div[3]/div[2]/text()
        
        // In modern Astrosage, maybe we can search for the text.
        // Let's print out all <p> tags and see if we can identify it.
        const pTags = [];
        $('p').each((i, el) => {
            const text = $(el).text().trim();
            if(text.length > 50) pTags.push({ i, text });
        });
        console.log("P Tags:", pTags);

        // Or specifically look for the structural classes
        let specific = $('#roundborder').text() ? "Found roundborder" : "No roundborder";
        console.log(specific);

    } catch (e) {
        console.error(e);
    }
}

scrapeHoro('aries');
