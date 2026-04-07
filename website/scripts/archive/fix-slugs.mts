import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// A simple slugifier mapping Hindi characters to Latin roughly
// Or better yet, we can just allow the actual Hindi text as the slug!
// Supabase/Postgres text fields allow Unicode, and Next.js routers support Unicode slugs.
function generateSlug(title: string): string {
    // Convert to lowercase, replace spaces with hyphens, remove multiple hyphens, and remove special punctuation
    return title
        .toLowerCase()
        .replace(/[,\.!?;:'"()\[\]{}|\\/]/g, '')  // Remove punctuation
        .replace(/\s+/g, '-')                      // Replace spaces with hyphens
        .replace(/-+/g, '-')                       // Collapse multiple hyphens
        .replace(/^-|-$/g, '');                    // Trim hyphens from start and end
}

async function run() {
    console.log('Fetching poojas...');
    const { data: poojas, error } = await supabase.from('poojas').select('id, name, slug');

    if (error) {
        console.error('Error fetching poojas:', error);
        return;
    }

    let updatedCount = 0;

    for (const pooja of poojas) {
        // If the slug is entirely numeric or empty
        if (!pooja.slug || /^\d+$/.test(pooja.slug)) {
            let newSlug = generateSlug(pooja.name);

            // Check for collision
            const { data: existing } = await supabase.from('poojas').select('id').eq('slug', newSlug).neq('id', pooja.id).single();
            if (existing) {
                newSlug = `${newSlug}-${pooja.id.substring(0, 4)}`; // add salt
            }

            console.log(`Updating "${pooja.name}"\n  Old Slug: ${pooja.slug}\n  New Slug: ${newSlug}`);

            const { error: updateError } = await supabase
                .from('poojas')
                .update({ slug: newSlug })
                .eq('id', pooja.id);

            if (updateError) {
                console.error(`Failed to update pooja ${pooja.id}:`, updateError.message);
            } else {
                updatedCount++;
            }
        }
    }

    console.log(`\nSuccessfully updated ${updatedCount} poojas with numeric slugs.`);
}

run();
