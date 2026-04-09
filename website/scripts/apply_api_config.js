const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function update() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const api_config = {
        apis: [
            {
                id: 'node_1',
                name: 'Primary Key 1',
                user_id: '651550', 
                api_key: 'ak-36483fc8a7f94df8504faacc4db3a46cafb353bd',
                is_enabled: true,
                priority: 1
            },
            {
                id: 'node_2',
                name: 'Fallback Key 2',
                user_id: '637158', 
                api_key: 'ak-66b9096f4750db40bac3636c3ab52a00122319d0',
                is_enabled: true,
                priority: 2
            }
        ],
        load_balance_strategy: 'priority',
        failover_enabled: true
    };

    const { data, error } = await supabase
        .from('kundli_settings')
        .upsert({
            setting_key: 'api_config',
            setting_value: api_config,
            description: 'Refined Multi-API nodes for VedaNexus V1.2 Failover'
        }, { onConflict: 'setting_key' });

    if (error) {
        console.log('Error updating settings:', error.message);
    } else {
        console.log('API Settings successfully updated in Supabase.');
    }
}

update();
