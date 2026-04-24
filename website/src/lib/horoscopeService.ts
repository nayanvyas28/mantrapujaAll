
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as cheerio from 'cheerio';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface HoroscopeRating {
    label: string;
    score: number; // 1-5
}

export interface HoroscopeData {
    sign: string;
    period_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    content: string;           // main prediction text
    date_label?: string;       // "April 23, 2026"
    lucky_number?: string;
    lucky_color?: string;
    remedy?: string;
    ratings?: HoroscopeRating[];
    sections?: { heading: string; body: string }[];  // weekly/monthly sub-sections
    reference_date: string;    // ISO date
}

export class HoroscopeService {

    static buildUrl(sign: string, period: string): string {
        const s = sign.toLowerCase();
        switch (period) {
            case 'daily':   return `https://www.astrosage.com/horoscope/daily-${s}-horoscope.asp`;
            case 'weekly':  return `https://www.astrosage.com/horoscope/weekly-${s}-horoscope.asp`;
            case 'monthly': return `https://www.astrosage.com/horoscope/monthly-${s}-horoscope.asp`;
            case 'yearly':  return `https://www.astrosage.com/horoscope/yearly-${s}-horoscope.asp`;
            default: throw new Error('Invalid period');
        }
    }

    /** Parse star rating from a grid cell — count filled stars (star2.gif) */
    static parseStarScore(html: string): number {
        const matches = html.match(/star2\.gif/g);
        return matches ? matches.length : 0;
    }

    static async fetchFromAstroSage(sign: string, period: string): Promise<Partial<HoroscopeData>> {
        const url = this.buildUrl(sign, period);

        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml',
            },
            timeout: 20000,
        });

        const $ = cheerio.load(html);
        const result: Partial<HoroscopeData> = {};

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
            const ratings: HoroscopeRating[] = [];
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
            const sections: { heading: string; body: string }[] = [];
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
                        // Try to find the content div first, then fall back to the main content box
                        const fullBody = $sub('.ui-sign-content-box .content').first().text().trim() || 
                                       $sub('.ui-sign-content-box').first().text().trim();
                        
                        if (fullBody && fullBody.length > 100) {
                            rawBody = fullBody;
                        }
                    } catch (e: any) {
                        console.warn(`Failed to fetch sub-content for ${heading}:`, e.message);
                    }
                }

                // Extract date prefix. It typically looks like: "Monday, April 20, 2026 - Sunday, April 26, 2026"
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
            // Find the content box that has an h1 matching this period
            let mainBox: cheerio.Cheerio<any> | null = null;
            const periodTitle = period === 'monthly' ? 'monthly' : 'yearly';

            $('div.ui-sign-content-box').each(function () {
                const h1Text = $(this).find('h1').first().text().toLowerCase();
                if (h1Text.includes(periodTitle)) {
                    mainBox = $(this) as any;
                    return false; // break
                }
            });

            if (mainBox) {
                // Extract the date label from the text-muted b tag
                const dateText = (mainBox as cheerio.Cheerio<any>).find('.text-muted b').first().text().trim();
                if (dateText) result.date_label = dateText;

                const sections: { heading: string; body: string }[] = [];
                const skipHeadings = /advice/i;

                (mainBox as cheerio.Cheerio<any>).find('h2[id]').each(function () {
                    const heading = $(this).attr('id') || $(this).text().trim();
                    
                    // Collect ALL p siblings until next h2
                    const paragraphs: string[] = [];
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
                        // Advice → save as remedy
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

    static async getHoroscope(sign: string, period: 'daily' | 'weekly' | 'monthly' | 'yearly'): Promise<HoroscopeData> {
        // Calculate the cache key date based on the period
        const now = new Date();
        let referenceDateStr = now.toISOString().split('T')[0]; // Default to today

        if (period === 'monthly') {
            referenceDateStr = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]; // 1st of month
        } else if (period === 'yearly') {
            referenceDateStr = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0]; // Jan 1st
        } else if (period === 'weekly') {
            // Find Monday of the current week
            const day = now.getDay() || 7; // Get current day number, converting Sun. to 7
            if (day !== 1) now.setHours(-24 * (day - 1)); 
            referenceDateStr = now.toISOString().split('T')[0];
        }

        // 1. Try DB cache first
        const { data: existing } = await supabase
            .from('horoscopes')
            .select('*')
            .eq('sign', sign.toLowerCase())
            .eq('period_type', period)
            .eq('reference_date', referenceDateStr)
            .maybeSingle();

        if (existing) return existing as HoroscopeData;

        // 2. Scrape fresh
        const scraped = await this.fetchFromAstroSage(sign, period);

        const newData: HoroscopeData = {
            sign: sign.toLowerCase(),
            period_type: period,
            content: scraped.content || '',
            date_label: scraped.date_label,
            lucky_number: scraped.lucky_number,
            lucky_color: scraped.lucky_color,
            remedy: scraped.remedy,
            ratings: scraped.ratings,
            sections: scraped.sections,
            reference_date: referenceDateStr,
        };

        // 3. Save to DB (non-blocking on failure)
        const { data: saved, error: saveError } = await supabase
            .from('horoscopes')
            .upsert(newData, { onConflict: 'sign,period_type,reference_date' })
            .select()
            .single();

        if (saveError) {
            console.error('[HoroscopeService] DB save error:', saveError.message);
            return newData;
        }

        return saved as HoroscopeData;
    }
}
