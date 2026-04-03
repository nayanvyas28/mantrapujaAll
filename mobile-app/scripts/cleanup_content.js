const { createClient } = require('@supabase/supabase-js');

// --- CONFIGURATION ---
const SUPABASE_URL = 'https://s1.mantrapuja.com';
const SUPABASE_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoiYW5vbiJ9.8wPYbdpzTQ-caeOvS3nRH11ivAdTETmjmAoTivV2T80';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- SAFE DICTIONARY (SYNONYMS) ---
const SAFE_REPLACEMENTS = [
    { regex: /100%/gi, replacement: 'traditionally' },
    { regex: /Guaranteed/gi, replacement: 'traditionally believed' },
    { regex: /Guarantee/gi, replacement: 'belief' },
    { regex: /Fixed/gi, replacement: 'Sacred' },
    { regex: /Sure!/gi, replacement: 'Auspiciously,' },
    { regex: /Sure/gi, replacement: 'Sacred' },
    { regex: /Cure/gi, replacement: 'Balance' },
    { regex: /Heal/gi, replacement: 'Peace' },
    { regex: /Medicine/gi, replacement: 'Spiritual Practice' },
    { regex: /Illness/gi, replacement: 'Imbalance' },
    { regex: /Disease/gi, replacement: 'Energy Blockage' },
    { regex: /Wealth/gi, replacement: 'Prosperity' },
    { regex: /Rich/gi, replacement: 'Abundance' },
    { regex: /Jackpot/gi, replacement: 'Success' },
    { regex: /Gambling/gi, replacement: 'Chance' },
    { regex: /Miracle/gi, replacement: 'Blessing' },
    { regex: /Magic/gi, replacement: 'Divine Energy' },
    { regex: /Instantly/gi, replacement: 'Sacredly' },
    // Hindi Replacements
    { regex: /पक्का/gi, replacement: 'मान्यता है' },
    { regex: /निश्चित/gi, replacement: 'शुभ' },
    { regex: /चमत्कार/gi, replacement: 'आशीर्वाद' },
    { regex: /तुरंत/gi, replacement: 'पवित्र' },
    { regex: /इलाज/gi, replacement: 'शांति' },
    { regex: /बीमारी/gi, replacement: 'असंतुलन' },
    { regex: /अमीर/gi, replacement: 'सौभाग्यशाली' },
    { regex: /धन/gi, replacement: 'समृद्धि' }
];

const DELETION_KEYWORDS = [
    'Sure! Here is', 'Test Blog', 'Webhook automated', 'Dummy', 'Placeholder'
];

function sanitizeText(text) {
    if (!text || typeof text !== 'string') return text;
    let sanitized = text;
    SAFE_REPLACEMENTS.forEach(pair => {
        sanitized = sanitized.replace(pair.regex, pair.replacement);
    });
    return sanitized;
}

async function cleanupTable(tableName, textColumns) {
    console.log(`\n--- Cleaning table: ${tableName} ---`);
    
    // 1. Fetch data
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
        console.error(`Error fetching ${tableName}:`, error.message);
        return;
    }

    let deletedCount = 0;
    let updatedCount = 0;

    for (const row of data) {
        // Check for deletion (Placeholder/AI content)
        const rowString = JSON.stringify(row);
        const shouldDelete = DELETION_KEYWORDS.some(k => rowString.includes(k));

        if (shouldDelete) {
            const { error: delErr } = await supabase.from(tableName).delete().eq('id', row.id);
            if (!delErr) deletedCount++;
            else console.error(`Delete failed for ${row.id}:`, delErr.message);
            continue;
        }

        // Check for replacements
        let needsUpdate = false;
        const updates = {};
        
        textColumns.forEach(col => {
            if (row[col]) {
                const original = row[col];
                const sanitized = sanitizeText(original);
                if (original !== sanitized) {
                    updates[col] = sanitized;
                    needsUpdate = true;
                }
            }
        });

        if (needsUpdate) {
            console.log(`Updating ${tableName} record: ${row.name || row.title || row.id}...`);
            const { error: upErr } = await supabase.from(tableName).update(updates).eq('id', row.id);
            if (!upErr) {
                updatedCount++;
            } else {
                console.error(`❌ UPDATE FAILED for ${tableName} ID ${row.id}:`, upErr.message);
            }
        }
    }

    console.log(`Table ${tableName} Cleanup: Deletions: ${deletedCount}, Updates: ${updatedCount}`);
}

async function runCleanup() {
    console.log('Starting Content Guidelines Cleanup...');

    await cleanupTable('blogs', ['title', 'excerpt', 'content', 'meta_description']);
    await cleanupTable('products_99', ['name', 'description']);
    await cleanupTable('poojas', ['name', 'description', 'benefits', 'tagline', 'about_description']);
    await cleanupTable('destinations', ['name', 'description', 'tagline']);

    console.log('\n--- Cleanup Complete! ---');
    console.log('Running re-audit...');
}

runCleanup();
