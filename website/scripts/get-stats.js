
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getStats() {
    const tables = ['blogs', 'poojas', 'locations', 'festivals', 'categories', 'serving_cities'];
    const stats = {};

    console.log("📊 Content Counts:");
    for (const table of tables) {
        const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });
        
        if (error) {
            stats[table] = "Error: " + error.message;
        } else {
            stats[table] = count;
        }
    }
    console.table(stats);

    console.log("\n📈 Automation Logs (Success vs Failed):");
    const { data: logs, error: logError } = await supabase
        .from('system_logs')
        .select('message, status')
        .eq('event_type', 'automation');

    if (logError) {
        console.error("Error fetching logs:", logError.message);
    } else {
        const logStats = {};
        logs.forEach(log => {
            const type = log.message.split(' ')[0] || 'Unknown';
            if (!logStats[type]) logStats[type] = { success: 0, failed: 0, warning: 0 };
            logStats[type][log.status]++;
        });
        console.table(logStats);
    }
}

getStats();
