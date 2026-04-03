const { supabase } = require('./supabase');
const { callInternalAstro } = require('./astroInternal');

/**
 * Resolves {tithi} and {festivals} placeholders in a string
 * using current astrology data, incorporating structured markers 
 * for the mobile app to render rich UI chips.
 */
async function resolveNotificationPlaceholders(text) {
    if (!text) return text;
    if (!text.includes('{tithi}') && !text.includes('{festivals}')) return text;

    try {
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        
        let tithiName = null;
        let festivalNames = null;

        // 1. Resolve Tithi
        if (text.includes('{tithi}')) {
            try {
                const panchang = await callInternalAstro('panchang/daily', {});
                tithiName = panchang.tithi?.details?.tithi_name;
            } catch (e) {
                console.error('[AstroResolver] Tithi fetch failed:', e.message);
            }
        }

        // 2. Resolve Festivals
        if (text.includes('{festivals}')) {
            try {
                const { data: festivals } = await supabase
                    .from('festivals')
                    .select('name')
                    .eq('date', dateStr);
                
                if (festivals && festivals.length > 0) {
                    festivalNames = festivals.map(f => f.name).join(', ');
                }
            } catch (e) {
                console.error('[AstroResolver] Festival fetch failed:', e.message);
            }
        }

        // 3. Structured Replacement
        let resolvedText = text;
        
        if (tithiName) {
            resolvedText = resolvedText.replace(/{tithi}/g, `[TITHI: ${tithiName}]`);
        } else {
            resolvedText = resolvedText.replace(/{tithi}/g, 'Auspicious Day');
        }

        if (festivalNames) {
            resolvedText = resolvedText.replace(/{festivals}/g, `[FEST: ${festivalNames}]`);
        } else {
            resolvedText = resolvedText.replace(/{festivals}/g, 'Spiritual Celebration');
        }

        return resolvedText;

    } catch (err) {
        console.error('[AstroResolver] Critical Failure:', err);
        return text;
    }
}

module.exports = { resolveNotificationPlaceholders };
