const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://s1.mantrapuja.com';
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectTable() {
    console.log('Inspecting "settings" table...');
    
    // Try to get one row to see columns
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching settings:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log('Columns found:', Object.keys(data[0]));
        console.log('Sample row:', data[0]);
    } else {
        console.log('Table is empty. Checking schema via RPC if available or just trying a dummy insert...');
        
        // Try a dummy insert to see what fails
        const { error: insertError } = await supabase
            .from('settings')
            .insert([{ key: 'test_key', value: 'test_value' }]);
        
        if (insertError) {
            console.error('Insert test failed:', insertError);
        } else {
            console.log('Insert test succeeded. Deleting test key...');
            await supabase.from('settings').delete().eq('key', 'test_key');
        }
    }
}

inspectTable();
