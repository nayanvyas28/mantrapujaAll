const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'http://supabasekong-ikokgwcgw8s44s4g0kckwgsw.34.93.68.183.sslip.io';
// Using SERVICE ROLE KEY to bypass RLS
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    let log = '';
    const logMsg = (msg) => {
        console.log(msg);
        log += msg + '\n';
    };

    logMsg('--- STARTING FIX WITH SERVICE ROLE KEY ---');

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
                const { error, count } = await supabase
                    .from('poojas')
                    .update({ is_featured: false }, { count: 'exact' }) // Request count
                    .eq('id', entry.id)
                    .select(); // Select to confirm

                if (error) logMsg(`  FAILED: ${error.message}`);
                else logMsg(`  SUCCESS? (Check next line)`);
            }
        }
    }

    // 2. Ensure Vishnu Puja is featured
    const { data: vishnuEntries, error: vError } = await supabase
        .from('poojas')
        .select('id, name, is_featured')
        .ilike('name', '%Vishnu%Puja%');

    if (vError) logMsg(`Error fetching Vishnu Puja: ${vError.message}`);
    else {
        logMsg(`Found ${vishnuEntries.length} Vishnu Puja entries.`);
        const target = vishnuEntries[0];
        if (target) {
            if (!target.is_featured) {
                logMsg(`Featuring Vishnu Puja: ${target.name} (${target.id})...`);
                const { error } = await supabase.from('poojas').update({ is_featured: true }).eq('id', target.id);
                if (error) logMsg(`FAILED: ${error.message}`);
                else logMsg(`SUCCESS`);
            } else {
                logMsg(`Vishnu Puja is already featured.`);
            }
        }
    }

    // FINAL CHECK
    const { data: finalFeatured } = await supabase
        .from('poojas')
        .select('name, is_featured')
        .eq('is_featured', true)
        .limit(20);

    logMsg('\n--- CURRENT FEATURED (Top 20) ---');
    if (finalFeatured) {
        finalFeatured.forEach(p => logMsg(`- ${p.name}`));
    }

    fs.writeFileSync('fix_output_v3.txt', log);
}

run();
