
const { createClient } = require('@supabase/supabase-js');

async function auditLinks() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('--- STARTING LINK AUDIT ---\n');

    // 1. Audit Locations
    const { data: destinations } = await supabase.from('destinations').select('slug, name');
    const footerCities = [
        "Varanasi", "Rishikesh", "Haridwar", "Ayodhya", "Mathura", "Vrindavan", "Dwarka", "Puri", "Rameswaram", "Tirupati",
        "Ujjain", "Nashik", "Kedarnath", "Badrinath", "Somnath", "Shirdi", "Vaishno Devi", "Amarnath", "Bodh Gaya", "Sarnath",
        "Mount Abu", "Delhi", "Mumbai", "Kolkata", "Jaipur", "Guruvayur", "Chidambaram", "Chitrakoot", "Indore", "Hyderabad",
        "Ahmedabad", "Lucknow", "Pune", "Mysuru", "Bangalore", "Kalahasti", "Kukke Subramanya", "Patna", "Nagpur", "Bhopal", 
        "Kanpur", "Ranchi", "Surat", "Vadodara"
    ];

    const slugMap = {
        "Varanasi": "kashi-vishwanath",
        "Ujjain": "mahakaleshwar",
        "Nashik": "trimbakeshwar",
        "Deoghar": "baidyanath",
        "Aurangabad": "grishneshwar",
        "Srisailam": "mallikarjuna",
        "Bodh Gaya": "gaya",
        "Vaishno Devi": "vaishno-devi"
    };

    const existingSlugs = new Set(destinations?.map(d => d.slug) || []);
    const brokenCities = footerCities.filter(name => {
        const slug = slugMap[name] || name.toLowerCase().replace(/\s+/g, '-');
        return !existingSlugs.has(slug);
    });

    console.log(`[Locations] Checked: ${footerCities.length}, Broken: ${brokenCities.length}`);
    if (brokenCities.length > 0) {
        console.log(`Broken City Links: ${brokenCities.join(', ')}`);
    }

    // 2. Audit Blogs
    const { data: blogs } = await supabase.from('Final_blog').select('slug, title, published').eq('published', true);
    const brokenBlogs = blogs?.filter(b => !b.slug) || [];
    console.log(`[Blogs] Checked: ${blogs?.length}, Broken: ${brokenBlogs.length}`);

    // 3. Audit Authors
    const { data: blogAuthors } = await supabase.from('Final_blog').select('author_name').not('author_name', 'is', null);
    const { data: dbAuthors } = await supabase.from('blog_authors').select('name');
    
    const validAuthorNames = new Set(dbAuthors?.map(a => a.name) || []);
    // Personas
    ['Mantra Guru Ji', 'Aacharya Dr. Ram Ramanuj', 'Pandit Ravi Shastri', 'Acharya Meera', 'Dr. Aryan Sharma'].forEach(n => validAuthorNames.add(n));

    const uniqueAuthorsInBlogs = [...new Set(blogAuthors?.map(b => b.author_name) || [])];
    const missingAuthors = uniqueAuthorsInBlogs.filter(name => !validAuthorNames.has(name));

    console.log(`[Authors] Checked: ${uniqueAuthorsInBlogs.length}, Unregistered (Ghost): ${missingAuthors.length}`);
    if (missingAuthors.length > 0) {
        console.log(`Ghost Authors (They work fine but are not in the author table): ${missingAuthors.join(', ')}`);
    }

    console.log('\n--- AUDIT COMPLETE ---');
}

auditLinks();
