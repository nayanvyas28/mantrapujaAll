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

    logMsg('--- STARTING VERIFICATION ---');

    // Check Mangal Dosh
    const { data: mangal, error: mError } = await supabase
        .from('poojas')
        .select('id, name, is_featured')
        .ilike('name', '%Mangal%Dosh%')
        .single();

    if (mError) logMsg(`Error fetching Mangal Dosh: ${mError.message}`);
    else logMsg(`Mangal Dosh: ${mangal.name} (Featured: ${mangal.is_featured})`);

    // Check Vishnu Puja
    const { data: vishnu, error: vError } = await supabase
        .from('poojas')
        .select('id, name, is_featured')
        .ilike('name', '%Vishnu%Puja%')
        .single();

    if (vError) logMsg(`Error fetching Vishnu Puja: ${vError.message}`);
    else logMsg(`Vishnu Puja: ${vishnu.name} (Featured: ${vishnu.is_featured})`);


    // FIX
    if (mangal && mangal.is_featured) {
        logMsg('FIXING: Un-featuring Mangal Dosh...');
        const { error } = await supabase.from('poojas').update({ is_featured: false }).eq('id', mangal.id);
        if (error) logMsg(`FAILED: ${error.message}`);
        else logMsg('SUCCESS: Un-featured Mangal Dosh');
    } else {
        logMsg('Mangal Dosh is already NOT featured.');
    }

    if (vishnu && !vishnu.is_featured) {
        logMsg('FIXING: Featuring Vishnu Puja...');
        const { error } = await supabase.from('poojas').update({ is_featured: true }).eq('id', vishnu.id);
        if (error) logMsg(`FAILED: ${error.message}`);
        else logMsg('SUCCESS: Featured Vishnu Puja');
    } else {
        logMsg('Vishnu Puja is already known as featured (or not found).');
    }

    // FINAL CHECK
    const { data: finalFeatured } = await supabase
        .from('poojas')
        .select('name, is_featured')
        .eq('is_featured', true)
        .limit(10);

    logMsg('\n--- CURRENT TOP 10 FEATURED ---');
    if (finalFeatured) {
        finalFeatured.forEach(p => logMsg(`- ${p.name}`));
    }

    fs.writeFileSync('fix_output.txt', log);
}

run();
