import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://s1.mantrapuja.com';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoiYW5vbiJ9.8wPYbdpzTQ-caeOvS3nRH11ivAdTETmjmAoTivV2T80';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const tables = ['poojas', 'blogs', 'destinations', 'products_99', 'festivals', 'locations'];

    for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        console.log(`\nTable: ${table}`);
        if (error) {
            console.error('Error:', error.message);
        } else if (data && data.length > 0) {
            console.log('Columns:', Object.keys(data[0]));
        } else {
            console.log('No data, but table might exist.');
        }
    }
}

test();
