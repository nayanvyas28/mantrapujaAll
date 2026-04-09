
const { createClient } = require('@supabase/supabase-js');

// Load from .env.local logic (simplified for script)
const SUPABASE_URL = "http://supabasekong-ikokgwcgw8s44s4g0kckwgsw.34.93.68.183.sslip.io";
const SUPABASE_SERVICE_ROLE_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoic2VydmljZV9yb2xlIn0.BXBg0x_XqZXJIpNO3O0SwRlgyfRa1pg6A0hyngwEPro";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
    console.log("Seeding database at:", SUPABASE_URL);

    const { data, error } = await supabase
        .from('blogs')
        .insert([
            {
                title: "New GCP Database Test",
                slug: "gcp-db-test-" + Date.now(),
                content: "<h2>GCP Database Connection Success!</h2><p>This blog post confirms your app is now connected to the new GCP-hosted Supabase instance.</p>",
                published: true,
                image_url: "https://via.placeholder.com/800x400?text=GCP+DB+Success",
                tags: ["test", "gcp", "migration"]
            }
        ])
        .select();

    if (error) {
        console.error("Error seeding database:", error);
    } else {
        console.log("Success! Inserted blog:", data);
    }
}

seed();
