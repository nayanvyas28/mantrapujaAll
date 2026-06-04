const axios = require('axios');
const cheerio = require('cheerio');
const { supabase } = require('../utils/supabase');

class HoroscopeService {
    /**
     * Builds the AstroSage scraping URL for the given sign and period.
     */
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

    /**
     * Scrapes AstroSage to fetch fresh horoscope details.
     */
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
            // ── Weekly: uses .ui-sign-heading + .ui-sign-content-box pattern ──
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

                // If it's a teaser with a "More" link, fetch the full content
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

                // Extract date prefix
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

        } else {
            // ── Monthly / Yearly: uses h2[id] + p structure inside main .ui-sign-content-box ──
            let mainBox = null;
            const periodTitle = period === 'monthly' ? 'monthly' : 'yearly';

            $('div.ui-sign-content-box').each(function () {
                const h1Text = $(this).find('h1').first().text().toLowerCase();
                if (h1Text.includes(periodTitle)) {
                    mainBox = $(this);
                    return false; // break
                }
            });

            if (mainBox) {
                const dateText = mainBox.find('.text-muted b').first().text().trim();
                if (dateText) result.date_label = dateText;

                const sections = [];
                const skipHeadings = /advice/i;

                mainBox.find('h2[id]').each(function () {
                    const heading = $(this).attr('id') || $(this).text().trim();
                    
                    const paragraphs = [];
                    let next = $(this).next();
                    while (next.length && next.prop('tagName') !== 'H2') {
                        if (next.prop('tagName') === 'P') {
                            const t = next.text().trim();
                            if (t.length > 40) paragraphs.push(t);
                        }
                        next = next.next();
                    }

                    const body = paragraphs.join('\n\n').replace(/\s+/g, ' ').trim();
                    if (body.length > 60 && !skipHeadings.test(heading)) {
                        sections.push({ heading, body });
                    } else if (skipHeadings.test(heading) && paragraphs.length > 0) {
                        result.remedy = paragraphs.join(' ').replace(/\s+/g, ' ').trim();
                    }
                });

                if (sections.length > 0) {
                    result.content = sections[0].body;
                    result.sections = sections.slice(1);
                } else {
                    result.content = `${period.charAt(0).toUpperCase() + period.slice(1)} prediction is being prepared. Check back soon!`;
                }
            } else {
                result.content = `${period.charAt(0).toUpperCase() + period.slice(1)} prediction is being prepared. Check back soon!`;
            }
        }

        if (!result.content) {
            result.content = "The stars are aligning. A detailed prediction is being prepared. Check back soon!";
        }

        return result;
    }

    /**
     * Retrieves horoscope from cache or fetches a fresh one, caching the result in Supabase.
     */
    static async getHoroscope(sign, period) {
        // Calculate the cache key date based on the period (using India timezone)
        const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        const nowKolkata = new Date(`${todayStr}T00:00:00Z`);
        let referenceDateStr = todayStr;

        if (period === 'monthly') {
            referenceDateStr = `${nowKolkata.getUTCFullYear()}-${String(nowKolkata.getUTCMonth() + 1).padStart(2, '0')}-01`;
        } else if (period === 'yearly') {
            referenceDateStr = `${nowKolkata.getUTCFullYear()}-01-01`;
        } else if (period === 'weekly') {
            const day = nowKolkata.getUTCDay() || 7; // Sunday = 7, Monday = 1
            const monday = new Date(nowKolkata);
            monday.setUTCDate(nowKolkata.getUTCDate() - (day - 1));
            referenceDateStr = monday.toISOString().split('T')[0];
        }

        if (!supabase) {
            return { sign, period_type: period, content: 'Service temporarily unavailable.', reference_date: referenceDateStr };
        }

        // 1. Try DB cache first
        const { data: existing } = await supabase
            .from('horoscopes')
            .select('*')
            .eq('sign', sign.toLowerCase())
            .eq('period_type', period)
            .eq('reference_date', referenceDateStr)
            .maybeSingle();

        if (existing) return existing;

        // 2. Scrape fresh
        const scraped = await this.fetchFromAstroSage(sign, period);

        const newData = {
            sign: sign.toLowerCase(),
            period_type: period,
            content: scraped.content || '',
            date_label: scraped.date_label,
            lucky_number: scraped.lucky_number,
            lucky_color: scraped.lucky_color,
            remedy: scraped.remedy,
            ratings: scraped.ratings || null,
            sections: scraped.sections || null,
            reference_date: referenceDateStr,
        };

        // 3. Save to DB
        const { data: saved, error: saveError } = await supabase
            .from('horoscopes')
            .upsert(newData, { onConflict: 'sign,period_type,reference_date' })
            .select()
            .single();

        if (saveError) {
            console.error('[HoroscopeService] DB save error:', saveError.message);
            return newData;
        }

        return saved;
    }
}

module.exports = HoroscopeService;
