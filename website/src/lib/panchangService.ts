import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as cheerio from 'cheerio';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface PanchangData {
    reference_date: string;
    title: string;
    location: string;
    panchang_for_today: Record<string, string>;
    sun_moon_calculations: Record<string, string>;
    hindu_month_year: Record<string, string>;
    inauspicious_timings: Record<string, string>;
    auspicious_timings: Record<string, string>;
}

export class PanchangService {
    
    static async fetchPanchangFromAstroSage(): Promise<PanchangData> {
        const url = 'https://panchang.astrosage.com/panchang/aajkapanchang?language=en';
        
        const { data: html } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            timeout: 20000,
        });

        const $ = cheerio.load(html);
        
        const result: Partial<PanchangData> = {
            panchang_for_today: {},
            sun_moon_calculations: {},
            hindu_month_year: {},
            inauspicious_timings: {},
            auspicious_timings: {},
        };

        // Extract title and location from the <title> tag or <h1>
        const titleText = $('title').text().trim(); // "Today Panchang: Thursday, April 23, 2026 Panchangam for New Delhi, India"
        result.title = titleText.split('Panchangam for')[0].trim() || 'Today Panchang';
        result.location = titleText.split('Panchangam for')[1]?.trim() || 'New Delhi, India';

        const parseSection = (sectionTitle: string, targetObj: Record<string, string>) => {
            $(`h4:contains("${sectionTitle}")`).next('.row').find('.pan-row').each((_, el) => {
                const label = $(el).find('div').first().text().trim();
                let value = $(el).find('div').last().text().trim();
                // Clean up value (remove extra whitespace/newlines)
                value = value.replace(/\s+/g, ' ').trim();
                if (label && value) {
                    targetObj[label] = value;
                }
            });
        };

        parseSection('Panchang For Today', result.panchang_for_today!);
        parseSection('Sun And Moon Calculations', result.sun_moon_calculations!);
        parseSection('Hindu Month And Year', result.hindu_month_year!);
        parseSection('Inauspicious Timings', result.inauspicious_timings!);
        parseSection('Auspicious Timings', result.auspicious_timings!);

        result.reference_date = new Date().toISOString().split('T')[0];

        return result as PanchangData;
    }

    static async getTodayPanchang(): Promise<PanchangData> {
        const today = new Date().toISOString().split('T')[0];

        // 1. Check DB cache
        const { data: existing } = await supabase
            .from('panchangs')
            .select('*')
            .eq('reference_date', today)
            .maybeSingle();

        if (existing) {
            return {
                ...existing.data,
                reference_date: existing.reference_date
            } as PanchangData;
        }

        // 2. Fetch Fresh
        try {
            const freshData = await this.fetchPanchangFromAstroSage();
            
            // 3. Save to DB
            const { error: saveError } = await supabase
                .from('panchangs')
                .upsert({
                    reference_date: today,
                    data: freshData
                }, { onConflict: 'reference_date' });

            if (saveError) console.error('[PanchangService] DB Save Error:', saveError);
            
            return freshData;
        } catch (error) {
            console.error('[PanchangService] Fetch Error:', error);
            throw new Error('Failed to fetch panchang data');
        }
    }
}
