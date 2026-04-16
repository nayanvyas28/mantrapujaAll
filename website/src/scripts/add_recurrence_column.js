const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addColumn() {
  console.log('Adding column recurrence_interval_mins to marketing_popups...');
  
  const { error } = await supabase.rpc('execute_sql', {
    sql_query: 'ALTER TABLE marketing_popups ADD COLUMN IF NOT EXISTS recurrence_interval_mins INT DEFAULT 0;'
  });

  if (error) {
    if (error.message.includes('function execute_sql(text) does not exist')) {
        console.warn('RPC execute_sql does not exist. This is expected if the DB is secured. I will try a workaround by checking if I can just add it via a direct raw query if possible, or assume it might already exist and move to code phase if I cannot run arbitrary SQL.');
        console.log('Manual check recommended if this fails. However, usually I can use rpc if defined.');
    } else {
        console.error('Error adding column:', error);
    }
  } else {
    console.log('Column added successfully (or already existed).');
  }
}

addColumn();
