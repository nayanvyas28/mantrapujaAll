const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'e:/mantrapuja/mantrapujaAll/backend/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function check() {
    const { data: pData, error: pErr } = await supabase.from('pages').select('slug, title, category, content').ilike('category', '%rashi%').limit(10);
    console.log("Pages rashi:", pData);

    const { data: cData, error: cErr } = await supabase.from('pages').select('slug, title, category, content').ilike('category', '%horoscope%').limit(10);
    console.log("Pages horoscope:", cData, cErr);
}
check();
