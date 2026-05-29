
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function migrateMissing() {
  const missingSlugs = [
    'achyuta-the-unwavering-an-exploration',
    'aditi-the-boundless-vedic-mother-goddess',
    'krishna-unveiling-divinity-philosophy-and-culture',
    'krishna-unveiling-the-divine-essence-and-teachings',
    'krishna-unveiling-the-divine-essence-of-love-and-wisdom',
    'krishna-unveiling-the-divine-in-hindu-tradition',
    'rama-the-embodiment-of-dharma-and-ideal-king',
    'shiva-the-destroyer-and-transformer'
  ];

  console.log(`🚀 Migrating ${missingSlugs.length} missing blogs from legacy 'blogs' table...`);

  const { data: legacyData, error: legacyError } = await supabase
    .from('blogs')
    .select('*')
    .in('slug', missingSlugs);

  if (legacyError) {
    console.error("❌ Error fetching legacy data:", legacyError);
    return;
  }

  for (const blog of legacyData) {
    const { data: existing } = await supabase
      .from('Final_blog')
      .select('id')
      .eq('slug', blog.slug)
      .maybeSingle();

    const upsertData = {
      slug: blog.slug,
      title: blog.title,
      blog_title: blog.title,
      blog_content: blog.blog_content || blog.content,
      content: typeof (blog.blog_content || blog.content) === 'string' ? (blog.blog_content || blog.content) : JSON.stringify(blog.blog_content || blog.content),
      category: blog.category || 'Spiritual',
      author_name: blog.author_name || "MantraPuja Team",
      author_role: blog.author_role || "Spiritual Guide",
      is_active: true,
      published: true,
      updated_at: new Date().toISOString()
    };

    if (existing && existing.id) {
      upsertData.id = existing.id;
    } else {
      upsertData.id = crypto.randomUUID();
      upsertData.created_at = new Date().toISOString();
    }

    const { error: insertError } = await supabase
      .from('Final_blog')
      .upsert(upsertData, { onConflict: 'slug' });

    if (insertError) {
      console.error(`❌ Error migrating ${blog.slug}:`, insertError.message);
    } else {
      console.log(`✅ Migrated: ${blog.slug}`);
    }
  }

  console.log("🏁 Migration Complete.");
}

migrateMissing();
