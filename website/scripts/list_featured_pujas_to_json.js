const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'http://supabasekong-ikokgwcgw8s44s4g0kckwgsw.34.93.68.183.sslip.io';
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoiYW5vbiJ9.8wPYbdpzTQ-caeOvS3nRH11ivAdTETmjmAoTivV2T80';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listPujas() {
    const output = {
        featured: [],
        candidates: []
    };

    const { data: featured, error: fError } = await supabase
        .from('poojas')
        .select('id, name, is_featured, images')
        .eq('is_featured', true);

    if (fError) console.error(fError);
    else {
        output.featured = featured.map(p => ({
            id: p.id,
            name: p.name,
            images_count: p.images ? p.images.length : 0
        }));
    }

    const { data: candidates, error: cError } = await supabase
        .from('poojas')
        .select('id, name, is_featured, images')
        .eq('is_featured', false)
        .not('images', 'is', null) // Ensure images is not null
        .gt('images', '[]')         // Ensure images array is not empty (if stored as jsonb array)
        .limit(20);

    // Note: .gt('images', '[]') might not work depending on column type. 
    // If it's text[] or jsonb, checking length is better done in app if raw query hard.
    // For now, let's just get them and filter in JS.

    // Better query to ensure we get something
    const { data: allCandidates, error: acError } = await supabase
        .from('poojas')
        .select('id, name, is_featured, images')
        .eq('is_featured', false)
        .limit(100);

    if (acError) console.error(acError);
    else {
        output.candidates = allCandidates
            .filter(p => p.images && p.images.length > 0)
            .map(p => ({
                id: p.id,
                name: p.name,
                images_count: p.images.length
            }))
            .slice(0, 20);
    }

    fs.writeFileSync('featured_pujas.json', JSON.stringify(output, null, 2));
    console.log('Wrote to featured_pujas.json');
}

listPujas();
