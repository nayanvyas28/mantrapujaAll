# 🔮 Standing Rashifal (Horoscope) API Package

This file is a standalone package containing both the **Express Backend Server API** and the **React Native/Android Client Fetcher**. You can copy-paste or download this file directly to use it on your other laptop.

---

## 1. Backend Code (Express Node.js)
Create a file named `rashifalApi.js` in your other project and paste this code:

```javascript
/**
 * Standalone Rashifal (Horoscope) API for Express (Node.js)
 * 
 * Install dependencies:
 * npm install express axios cheerio
 */
const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

class HoroscopeScraper {
    static buildUrl(sign, period) {
        const s = sign.toLowerCase();
        switch (period) {
            case 'daily':   return `https://www.astrosage.com/horoscope/daily-${s}-horoscope.asp`;
            case 'weekly':  return `https://www.astrosage.com/horoscope/weekly-${s}-horoscope.asp`;
            case 'monthly': return `https://www.astrosage.com/horoscope/monthly-${s}-horoscope.asp`;
            case 'yearly':  return `https://www.astrosage.com/horoscope/yearly-${s}-horoscope.asp`;
            default: throw new Error('Invalid period. Must be daily, weekly, monthly, or yearly');
        }
    }

    static async fetchFromAstroSage(sign, period) {
        const url = this.buildUrl(sign, period);

        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml',
            },
            timeout: 20000,
        });

        const $ = cheerio.load(html);
        const result = {
            sign: sign.toLowerCase(),
            period_type: period,
            reference_date: new Date().toISOString().split('T')[0]
        };

        result.date_label = $('.ui-large-hdg').first().text().trim() || undefined;

        if (period === 'daily') {
            const contentBlocks = $('.ui-large-content.text-justify');
            result.content = contentBlocks.first().text().trim();

            contentBlocks.each(function (i) {
                if (i === 0) return;
                const bLabel = $(this).find('b').text().replace(':-', '').trim().toLowerCase();
                const raw = $(this).text().trim();
                const value = raw.replace($(this).find('b').text(), '').trim();

                if (bLabel.includes('lucky number'))  result.lucky_number = value;
                else if (bLabel.includes('lucky color')) result.lucky_color = value;
                else if (bLabel.includes('remedy'))    result.remedy       = value;
            });

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

// Route Handler supporting GET and POST requests
router.all('/astrology/horoscope', async (req, res) => {
    try {
        const sign = req.query.sign || req.body.sign;
        const period = req.query.period || req.body.period || 'daily';

        if (!sign) {
            return res.status(400).json({ success: false, error: "Sign parameter is required (e.g. 'aries', 'taurus')" });
        }

        const validPeriods = ['daily', 'weekly', 'monthly', 'yearly'];
        if (!validPeriods.includes(period)) {
            return res.status(400).json({ success: false, error: "Invalid period. Must be daily, weekly, monthly, or yearly" });
        }

        const data = await HoroscopeScraper.fetchFromAstroSage(sign, period);
        return res.json({ success: true, data });
    } catch (error) {
        console.error('[HoroscopeAPI] Error:', error.message);
        return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});

module.exports = router;
```

---

## 2. Client-Side Code (React Native / Android App)
Drop this function into your API helper file in your mobile application:

```javascript
/**
 * React Native / Expo Client Service
 */

// Replace this with your backend domain or local IP (e.g., 'http://192.168.1.100:4000')
const BACKEND_URL = 'http://localhost:4000'; 

export const getRashifal = async (sign, period = 'daily') => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/astrology/horoscope?sign=${sign.toLowerCase()}&period=${period}`);
    
    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }
    
    const result = await response.json();
    if (result.success) {
      return result.data; // contains content, lucky_number, lucky_color, remedies, ratings
    } else {
      throw new Error(result.error || 'Failed to fetch Rashifal');
    }
  } catch (error) {
    console.error('[HoroscopeClient] Error fetching Rashifal:', error.message);
    throw error;
  }
};
```

---

## 3. How to Deploy & Use:
1. In your backend project on the other laptop, install the parsing dependencies:
   ```bash
   npm install axios cheerio
   ```
2. Mount the router in your main backend `index.js` file:
   ```javascript
   const rashifalRouter = require('./rashifalApi');
   app.use('/api', rashifalRouter);
   ```
3. Use the `getRashifal` client function in your Android UI components to query live data!
