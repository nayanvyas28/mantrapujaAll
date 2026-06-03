const axios = require('axios');
const cheerio = require('cheerio');

class IndependentScraper {
    static buildUrl(sign, period) {
        const s = sign.toLowerCase();
        switch (period) {
            case 'daily':   return `https://www.astrosage.com/horoscope/daily-${s}-horoscope.asp`;
            case 'weekly':  return `https://www.astrosage.com/horoscope/weekly-${s}-horoscope.asp`;
            case 'monthly': return `https://www.astrosage.com/horoscope/monthly-${s}-horoscope.asp`;
            case 'yearly':  return `https://www.astrosage.com/horoscope/yearly-${s}-horoscope.asp`;
            default: throw new Error('Invalid period');
        }
    }

    static async fetchFromAstroSage(sign, period) {
        const url = this.buildUrl(sign, period);
        console.log(`📡 Fetching and scraping AstroSage: ${url}`);

        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml',
            },
            timeout: 20000,
        });

        const $ = cheerio.load(html);
        const result = {};

        // ── Date label ──────────────────────────────────────────────
        result.date_label = $('.ui-large-hdg').first().text().trim() || undefined;

        if (period === 'daily') {
            // ── Main prediction ──────────────────────────────────────
            const contentBlocks = $('.ui-large-content.text-justify');
            result.content = contentBlocks.first().text().trim();

            // ── Lucky / Remedy rows ──────────────────────────────────
            contentBlocks.each(function (i) {
                if (i === 0) return; // skip main prediction
                const bLabel = $(this).find('b').text().replace(':-', '').trim().toLowerCase();
                const raw = $(this).text().trim();
                const value = raw.replace($(this).find('b').text(), '').trim();

                if (bLabel.includes('lucky number'))  result.lucky_number = value;
                else if (bLabel.includes('lucky color')) result.lucky_color = value;
                else if (bLabel.includes('remedy'))    result.remedy       = value;
            });

            // ── Star Ratings ─────────────────────────────────────────
            const ratings = [];
            $('h2').each(function () {
                if (!$(this).text().includes("Rating")) return;
                $(this).next('.show-grid').find('.col-sm-4').each(function () {
                    const label = $(this).find('b').text().replace(':', '').trim();
                    const score = $(this).find('img[src*="star2"]').length;
                    if (label) ratings.push({ label, score });
                });
            });
            if (ratings.length > 0) result.ratings = ratings;

        } else if (period === 'weekly') {
            const sections = [];
            const headings = $('.ui-sign-heading').toArray();

            for (const hElement of headings) {
                const $h = $(hElement);
                const heading = $h.text().replace(/»/g, '').trim();
                const headingLower = heading.toLowerCase();

                if (!headingLower.includes('weekly')) continue;
                if (headingLower.match(/select|compatibility|facts|characteristics/i)) continue;

                let contentBox = $h.next('.ui-sign-content-box');
                if (contentBox.length === 0) {
                    contentBox = $h.nextAll('.ui-sign-content-box').first();
                }

                if (contentBox.length === 0) continue;

                let rawBody = contentBox.text().trim();
                const moreLink = contentBox.find('a[href*="weekly-"]').attr('href');

                if (moreLink && (rawBody.includes('...') || rawBody.length < 300)) {
                    try {
                        const subUrl = moreLink.startsWith('http') ? moreLink : `https://www.astrosage.com${moreLink}`;
                        const { data: subHtml } = await axios.get(subUrl, { 
                            headers: { 'User-Agent': 'Mozilla/5.0' },
                            timeout: 5000 
                        });
                        const $sub = cheerio.load(subHtml);
                        const fullBody = $sub('.ui-sign-content-box .content').first().text().trim() || 
                                       $sub('.ui-sign-content-box').first().text().trim();
                        
                        if (fullBody && fullBody.length > 100) {
                            rawBody = fullBody;
                        }
                    } catch (e) {
                        console.warn(`Failed to fetch weekly sub-content for ${heading}:`, e.message);
                    }
                }

                const dateMatch = rawBody.match(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)[^.]{0,80}\d{4}\s*/i);
                if (dateMatch && !result.date_label) {
                    result.date_label = dateMatch[0].trim();
                }

                const body = rawBody
                    .replace(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)[^.]{0,80}\d{4}\s*/i, '')
                    .replace(/\.\.\.More\s*$/i, '')
                    .replace(/Read More$/i, '')
                    .replace(/\s+/g, ' ')
                    .trim();

                if (body.length > 40) sections.push({ heading, body });
            }

            if (sections.length > 0) {
                result.content = sections[0].body;
                result.sections = sections.slice(1);
            } else {
                result.content = "Weekly prediction is being prepared. Check back soon!";
            }
        }

        return result;
    }
}

async function runTest() {
    try {
        console.log('--- STARTING INDEPENDENT HOROSCOPE SCRAPER TEST ---');
        
        // Test Aries daily
        const ariesDaily = await IndependentScraper.fetchFromAstroSage('aries', 'daily');
        console.log('✅ Aries Daily Rashifal Extracted Successfully:');
        console.log(JSON.stringify(ariesDaily, null, 2));

        console.log('\n------------------------------------\n');

        // Test Leo weekly
        const leoWeekly = await IndependentScraper.fetchFromAstroSage('leo', 'weekly');
        console.log('✅ Leo Weekly Rashifal Extracted Successfully:');
        console.log(JSON.stringify(leoWeekly, null, 2));

        console.log('--- TEST RUN COMPLETED SUCCESSFULLY ---');
    } catch (error) {
        console.error('❌ Test Failed:', error);
    }
}

runTest();
