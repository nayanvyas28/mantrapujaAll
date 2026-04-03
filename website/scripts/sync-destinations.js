const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function sync() {
    console.log('Reading calibrated locations from src/data/spiritual-locations.ts...');
    const content = fs.readFileSync('src/data/spiritual-locations.ts', 'utf8');

    // Simple regex-based parser for the locations array
    const locations = [];
    const rowRegex = /\{ id: (\d+), name: "([^"]+)", slug: "([^"]+)", type: "([^"]+)", description: "([^"]+)", image: "([^"]+)", stateId: '([^']+)', x: ([\d.]+), y: ([\d.]+)/g;

    let match;
    while ((match = rowRegex.exec(content)) !== null) {
        locations.push({
            name: match[2],
            slug: match[3],
            type: match[4],
            description: match[5],
            images: [match[6]],
            state_id: match[7],
            x: parseFloat(match[8]),
            y: parseFloat(match[9]),
            is_featured: true
        });
    }

    console.log(`Found ${locations.length} locations to sync.`);

    // 1. Remove unintended hub/site entries
    console.log('Cleaning up Spiritual Hub, Sacred Site, Cultural Hub, Heritage Hub, and Industrial Hub entries...');
    const { error: deleteError } = await supabase
        .from('destinations')
        .delete()
        .in('type', ['Spiritual Hub', 'Sacred Site', 'Cultural Hub', 'Heritage Hub', 'Industrial Hub']);

    if (deleteError) {
        console.error('Error deleting unintended entries:', deleteError);
    }

    // 2. Apply 8-degree upward tilt (all) and targeted downward offset (Jyotirlingas only)
    console.log('Applying 8-degree upward tilt (all) and 25px downward offset (Jyotirlingas only)...');
    const tiltFactor = Math.tan(8 * Math.PI / 180); // tan(8°) ≈ 0.1405
    const jyotirlingaOffset = 25;

    for (const loc of locations) {
        // Base coordinate with tilt compensation
        let adjustedY = loc.y - (loc.x * tiltFactor);

        // Apply additional offset ONLY for Jyotirlingas
        if (loc.type === 'Jyotirlinga') {
            adjustedY += jyotirlingaOffset;
        }

        const syncLoc = {
            ...loc,
            y: parseFloat(adjustedY.toFixed(1))
        };

        const { error: updateError } = await supabase
            .from('destinations')
            .upsert(syncLoc, { onConflict: 'slug' });

        if (updateError) {
            console.error(`Error updating destination ${loc.slug}:`, updateError);
        } else {
            process.stdout.write('.');
        }
    }
    console.log('\nSync complete!');
}

sync().catch(console.error);
