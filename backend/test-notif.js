const { supabase } = require('./src/utils/supabase');
const { Expo } = require('expo-server-sdk');

async function testPersistence() {
    process.env.SUPABASE_URL = 'https://clwexquptubzllihylyi.supabase.co'; // Hardcoded for test context
    
    console.log("Testing Notification Persistence...");
    
    const title = "Test Persistence Notification " + new Date().toLocaleTimeString();
    const body = "This is a test to verify it saves to the database history.";
    
    try {
        const { data: dbEntry, error: dbError } = await supabase
            .from('notifications')
            .insert([{
                title,
                message: body,
                type: 'TEST_PERFORMANCE',
            }])
            .select()
            .single();

        if (dbError) throw dbError;
        
        console.log("SUCCESS: Notification saved to DB with ID:", dbEntry.id);
        
        // Cleanup (optional)
        // await supabase.from('notifications').delete().eq('id', dbEntry.id);
        
    } catch (e) {
        console.error("FAILURE:", e.message);
    }
}

testPersistence();
