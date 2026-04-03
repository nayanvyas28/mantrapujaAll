const fs = require('fs');

const locationDetailsContent = fs.readFileSync('/Users/sahilpatel/Documents/Mantra_Pooja/kasam_se_last/mantrapujalatest1/src/data/location-details.ts', 'utf8');

// Slugs found in the database
const dbSlugs = [
    'badrinath', 'dwarka', 'puri', 'rameswaram', 'kedarnath', 'somnath', 'ujjain', 'varanasi',
    'kamakhya', 'kolkata-kali', 'haridwar', 'prayagraj', 'nashik', 'test-slug', 'omkareshwar',
    'mahakaleshwar', 'kashi-vishwanath', 'baidyanath', 'trimbakeshwar', 'bhimashankar',
    'nageshwar', 'rameswaram-jyotirlinga', 'mallikarjuna', 'kolkata-kalighat', 'guwahati-kamakhya',
    'grishneshwar', 'shillong', 'gangtok', 'imphal', 'kohima', 'aizawl', 'port-blair',
    'vaishno-devi', 'srinagar', 'leh', 'kangra', 'shimla', 'amritsar', 'prayagraj-alopi-devi',
    'varanasi-vishalakshi', 'vindhyachal', 'gaya', 'patna', 'rajgir', 'ujjain-shakti',
    'jabalpur', 'jaipur', 'jodhpur', 'udaipur', 'chittorgarh', 'nashik-shakti',
    'mumbai-mumbadevi', 'kolhapur', 'tuljapur', 'amravati', 'puri-shakti', 'cuttack',
    'berhampur', 'hyderabad', 'warangal', 'vijayawada', 'srikakulam', 'tirupati',
    'mangaluru', 'udupi', 'chennai', 'kanchipuram', 'madurai', 'rameswaram-shakti',
    'coimbatore', 'thiruvananthapuram', 'kollam', 'thrissur', 'agartala', 'hampi'
];

function extractDetails(content) {
    const details = {};
    const slugs = ['kashi-vishwanath', 'haridwar', 'kedarnath'];
    slugs.forEach(slug => {
        const start = content.indexOf(`'${slug}': {`);
        if (start === -1) return;
        let depth = 0;
        let end = -1;
        for (let i = start + slug.length + 3; i < content.length; i++) {
            if (content[i] === '{') depth++;
            if (content[i] === '}') {
                if (depth === 0) {
                    end = i + 1;
                    break;
                }
                depth--;
            }
        }
        if (end !== -1) {
            let objStr = content.substring(start + slug.length + 3, end);
            objStr = objStr.replace(/(\w+):/g, '"$1":');
            objStr = objStr.replace(/'/g, '"');
            // Fix trailing commas for JSON.parse
            objStr = objStr.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
            try {
                details[slug] = JSON.parse(objStr);
            } catch (e) {
                console.error(`Failed to parse details for ${slug}: ${e.message}`);
            }
        }
    });
    return details;
}

const details = extractDetails(locationDetailsContent);

const defaultContent = {
    significance: "A sacred destination steeped in Vedic tradition and spiritual energy.",
    history: "This holy site has been a center of pilgrimage for centuries, mentioned in ancient Puranas.",
    keyRituals: [
        { name: "Daily Prayers", description: "Traditional morning and evening prayers offered to the presiding deity." }
    ],
    highlights: [
        { name: "Main Shrine", description: "The central temple complex known for its spiritual vibrations." }
    ],
    travelInfo: {
        bestTime: "October to March",
        nearestAirport: "Varies - check major hubs",
        nearestRailway: "Well connected to major grids",
        howToReach: "Accessible by road and rail from nearby metro cities."
    },
    tips: ["Respect local customs", "Carry traditional attire"]
};

let sql = `-- Migration: Dynamize Destination Details
-- Description: Updates existing destinations with rich content mapping from location-details.ts

`;

dbSlugs.forEach(slug => {
    const locDetail = details[slug] || defaultContent;
    const nameFormatted = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    const content = JSON.stringify(locDetail).replace(/'/g, "''");
    const tagline = "Discover the Divine Essence of " + nameFormatted;
    const seoTitle = nameFormatted + " - Sacred Spiritual Destination | Mantra Pooja";
    const seoDesc = "Explore the spiritual significance, history, rituals, and travel information for " + nameFormatted + ". Book authentic Vedic services online.";
    const seoKeywords = slug.replace(/-/g, ', ') + ", spiritual, yatra, pilgrimage, mantra pooja";

    sql += `UPDATE public.destinations 
SET 
    tagline = '${tagline.replace(/'/g, "''")}',
    seo_title = '${seoTitle.replace(/'/g, "''")}',
    seo_description = '${seoDesc.replace(/'/g, "''")}',
    seo_keywords = '${seoKeywords.replace(/'/g, "''")}',
    content = '${content}'::jsonb,
    updated_at = NOW()
WHERE slug = '${slug}';\n\n`;
});

fs.writeFileSync('/Users/sahilpatel/Documents/Mantra_Pooja/kasam_se_last/mantrapujalatest1/supabase/migrations/20260218_dynamize_destinations.sql', sql);
console.log("Migration generated successfully: 20260218_dynamize_destinations.sql");
