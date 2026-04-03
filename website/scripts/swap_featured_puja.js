const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://supabasekong-ikokgwcgw8s44s4g0kckwgsw.34.93.68.183.sslip.io';
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoiYW5vbiJ9.8wPYbdpzTQ-caeOvS3nRH11ivAdTETmjmAoTivV2T80';

const supabase = createClient(supabaseUrl, supabaseKey);

async function swapFeatured() {
    console.log('Swapping Mangal Dosh Nivaran with Vishnu Puja...');

    // 1. Un-feature Mangal Dosh Nivaran
    const { error: error1 } = await supabase
        .from('poojas')
        .update({ is_featured: false })
        .eq('id', 'f8c96f3a-3b22-4419-b61e-1aba0273edd2');

    if (error1) {
        console.error('Error removing Mangal Dosh:', error1);
        return;
    }
    console.log('Successfully removed Mangal Dosh Nivaran from featured.');

    // 2. Feature Vishnu Puja
    const { error: error2 } = await supabase
        .from('poojas')
        .update({ is_featured: true })
        .eq('id', '22757834-7b95-494c-8c81-190f01bbd437');

    if (error2) {
        console.error('Error adding Vishnu Puja:', error2);
        return;
    }
    console.log('Successfully added Vishnu Puja to featured.');
}

swapFeatured();
