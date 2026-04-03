const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://supabasekong-ikokgwcgw8s44s4g0kckwgsw.34.93.68.183.sslip.io';
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoiYW5vbiJ9.8wPYbdpzTQ-caeOvS3nRH11ivAdTETmjmAoTivV2T80';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listPujas() {
    console.log('--- CURRENTLY FEATURED (Top 10) ---');
    const { data: featured, error: fError } = await supabase
        .from('poojas')
        .select('id, name, is_featured, images')
        .eq('is_featured', true)
        .limit(10);

    if (fError) console.error(fError);
    else {
        featured.forEach(p => console.log(`[FEATURED] ID: ${p.id} | ${p.name} | Images: ${p.images ? p.images.length : 0}`));
    }

    console.log('\n--- POTENTIAL REPLACEMENTS (English Names preferably) ---');
    const { data: candidates, error: cError } = await supabase
        .from('poojas')
        .select('id, name, is_featured, images')
        .eq('is_featured', false)
        .not('images', 'is', null)
        .ilike('name', '%Puja%') // Filter for English-like names to avoid encoding issues display
        .limit(20);

    if (cError) console.error(cError);
    else {
        candidates.forEach(p => {
            if (p.images && p.images.length > 0) {
                console.log(`[CANDIDATE] ID: ${p.id} | ${p.name} | Images: ${p.images.length}`);
            }
        });
    }
}

listPujas();
