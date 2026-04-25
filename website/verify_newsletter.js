const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyNewsletterSystem() {
    console.log("--- Newsletter Verification System ---");

    // 1. Check Subscriber Count
    const { count, error: countError } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.log("❌ Newsletter table doesn't exist or error:", countError.message);
    } else {
        console.log(`✅ Total Subscribers in DB: ${count}`);
    }

    // 2. Check Admins in Profiles
    const { data: admins, error: adminError } = await supabase
        .from('profiles')
        .select('email, role')
        .eq('role', 'admin');

    if (adminError) {
        console.log("❌ Role column doesn't exist in profiles table yet.");
    } else if (admins && admins.length > 0) {
        console.log("✅ Current Admins in DB:");
        admins.forEach(a => console.log(`   - ${a.email}`));
    } else {
        console.log("❌ No admins found in profiles table. This is why you can't see data!");
    }
    
    console.log("--------------------------------------");
}

verifyNewsletterSystem();
