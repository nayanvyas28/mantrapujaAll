
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function deepSearch() {
  console.log("🕵️  Initiating Deep Search for Missing/Unarranged Blogs...");

  // 1. Check for Duplicate Slugs in Final_blog
  console.log("Checking for duplicate slugs...");
  const { data: allBlogs } = await supabase.from('Final_blog').select('slug');
  const slugCounts = {};
  const duplicates = [];
  allBlogs.forEach(b => {
    slugCounts[b.slug] = (slugCounts[b.slug] || 0) + 1;
    if (slugCounts[b.slug] === 2) duplicates.push(b.slug);
  });
  console.log(`- Duplicates found: ${duplicates.length}`);
  if (duplicates.length > 0) console.log(duplicates);

  // 2. Check for "Legacy" tables that might have data not in Final_blog
  console.log("Comparing with potential legacy tables...");
  const legacyTables = ['blogs', 'post', 'blog_posts']; // Common legacy names
  
  for (const table of legacyTables) {
    try {
      const { data: legacyData, error } = await supabase.from(table).select('slug');
      if (error) {
        console.log(`- Table '${table}' does not exist or is inaccessible.`);
        continue;
      }
      
      const finalSlugs = new Set(allBlogs.map(b => b.slug));
      const missingSlugs = legacyData.filter(l => !finalSlugs.has(l.slug)).map(l => l.slug);
      
      console.log(`- Table '${table}' has ${legacyData.length} entries. Missing from Final_blog: ${missingSlugs.length}`);
      if (missingSlugs.length > 0) {
        console.log(`  First 10 missing: ${missingSlugs.slice(0, 10).join(', ')}`);
      }
    } catch (e) {
      // Ignore
    }
  }

  // 3. Check for Blogs with No Categories (Unarranged)
  console.log("Checking for 'Unarranged' blogs (no category)...");
  const { data: catCheck } = await supabase.from('Final_blog').select('slug, category');
  const uncategorized = catCheck.filter(b => !b.category || b.category === 'Uncategorized' || b.category === '');
  console.log(`- Uncategorized/Unarranged blogs: ${uncategorized.length}`);
  if (uncategorized.length > 0) {
    console.log(`  First 10: ${uncategorized.slice(0, 10).map(u => u.slug).join(', ')}`);
  }

  console.log("\n✅ Deep Search Complete.");
}

deepSearch();
