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

function stripHtml(html: string) {
    if (!html) return html;
    // Replace <br> or <p> tags with spaces to avoid joining words
    let text = html.replace(/<br\s*\/?>/gi, ' ');
    text = text.replace(/<\/?p>/gi, ' ');
    text = text.replace(/<\/?div>/gi, ' ');
    // Remove all other HTML tags
    text = text.replace(/<[^>]+>/g, '');
    // Decode common entities
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    // Replace multiple whitespace with single space
    text = text.replace(/\s+/g, ' ');
    return text.trim();
}

async function run() {
    console.log('Fetching poojas...');
    const { data: poojas, error } = await supabase.from('poojas').select('id, name, description, about_description, tagline, seo_description');

    if (error) {
        console.error('Error fetching poojas:', error);
        return;
    }

    console.log(`Found ${poojas.length} poojas to process.`);
    let updatedCount = 0;

    for (const pooja of poojas) {
        let hasChanges = false;
        const updates: any = {};

        const fieldsToClean = ['description', 'about_description', 'tagline', 'seo_description'];

        for (const field of fieldsToClean) {
            const originalVal = (pooja as any)[field];
            if (originalVal) {
                const cleanedVal = stripHtml(originalVal);
                if (cleanedVal !== originalVal) {
                    updates[field] = cleanedVal;
                    hasChanges = true;
                }
            }
        }

        if (hasChanges) {
            const { error: updateError } = await supabase
                .from('poojas')
                .update(updates)
                .eq('id', pooja.id);

            if (updateError) {
                console.error(`Failed to update pooja ${pooja.id} (${pooja.name}):`, updateError);
            } else {
                updatedCount++;
                console.log(`Cleaned HTML for: ${pooja.name}`);
            }
        }
    }

    console.log(`\nSuccessfully stripped HTML from ${updatedCount} poojas in the database.`);
}

run();
