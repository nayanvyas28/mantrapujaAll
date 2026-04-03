const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'http://supabasekong-ikokgwcgw8s44s4g0kckwgsw.34.93.68.183.sslip.io';
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoiYW5vbiJ9.8wPYbdpzTQ-caeOvS3nRH11ivAdTETmjmAoTivV2T80';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    let log = '';
    const logMsg = (msg) => {
        console.log(msg);
        log += msg + '\n';
    };

    logMsg('--- STARTING COMPREHENSIVE FIX ---');

    // 1. Find ALL Mangal Dosh entries
    const { data: mangalEntries, error: mError } = await supabase
        .from('poojas')
        .select('id, name, is_featured')
        .ilike('name', '%Mangal%Dosh%');

    if (mError) logMsg(`Error fetching Mangal Dosh: ${mError.message}`);
    else {
        logMsg(`Found ${mangalEntries.length} Mangal Dosh entries.`);
        for (const entry of mangalEntries) {
            logMsg(`- ${entry.name} (${entry.id}) Featured: ${entry.is_featured}`);
            if (entry.is_featured) {
                logMsg(`  -> Un-featuring...`);
                const { error } = await supabase.from('poojas').update({ is_featured: false }).eq('id', entry.id);
                if (error) logMsg(`  FAILED: ${error.message}`);
                else logMsg(`  SUCCESS`);
            }
        }
    }

    // 2. Ensure Vishnu Puja is featured
    // Feature ALL Vishnu Pujas found just in case, or just one
    const { data: vishnuEntries, error: vError } = await supabase
        .from('poojas')
        .select('id, name, is_featured')
        .ilike('name', '%Vishnu%Puja%');

    if (vError) logMsg(`Error fetching Vishnu Puja: ${vError.message}`);
    else {
        logMsg(`Found ${vishnuEntries.length} Vishnu Puja entries.`);
        // Just feature the first one if none are featured
        const alreadyFeatured = vishnuEntries.find(p => p.is_featured);
        if (alreadyFeatured) {
            logMsg(`Vishnu Puja is already featured: ${alreadyFeatured.name}`);
        } else if (vishnuEntries.length > 0) {
            const target = vishnuEntries[0];
            logMsg(`Featuring Vishnu Puja: ${target.name} (${target.id})...`);
            const { error } = await supabase.from('poojas').update({ is_featured: true }).eq('id', target.id);
            if (error) logMsg(`FAILED: ${error.message}`);
            else logMsg(`SUCCESS`);
        } else {
            logMsg('No Vishnu Puja found to feature!');
        }
    }

    // FINAL CHECK
    const { data: finalFeatured } = await supabase
        .from('poojas')
        .select('name, is_featured')
        .eq('is_featured', true)
        .limit(20); // Check more just in case

    logMsg('\n--- CURRENT FEATURED (Top 20) ---');
    if (finalFeatured) {
        finalFeatured.forEach(p => logMsg(`- ${p.name}`));
    }

    fs.writeFileSync('fix_output_v2.txt', log);
}

run();
