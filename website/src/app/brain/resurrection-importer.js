
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function importResurrection() {
  console.log("🚀 Launching UPGRADED RESURRECTION IMPORTER (UUID + Upsert Mode)...");
  
  const brainDir = path.join(process.cwd(), 'src/app/brain');
  const files = fs.readdirSync(brainDir).filter(f => f.startsWith('resurrection_batch_') && f.endsWith('.json'));

  if (files.length === 0) {
    console.log("❌ No resurrection batches found.");
    return;
  }

  let totalUpserted = 0;

  for (const file of files) {
    const filePath = path.join(brainDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`📦 Processing ${file} (${data.length} blogs)...`);

    for (const blog of data) {
      // First, check if the record exists to preserve its ID
      const { data: existing, error: fetchError } = await supabase
        .from('Final_blog')
        .select('id')
        .eq('slug', blog.slug)
        .maybeSingle();

      const upsertData = { 
        slug: blog.slug,
        title: blog.title,
        blog_title: blog.title,
        blog_content: blog.blog_content,
        content: blog.blog_content.introduction + "\n\n" + (blog.blog_content.sections || []).map(s => s.heading + "\n" + s.content).join("\n\n"),
        excerpt: blog.blog_content.introduction.substring(0, 160),
        meta_title: blog.title + " | MantraPuja",
        meta_description: blog.blog_content.introduction.substring(0, 155),
        author_name: "MantraPuja Team",
        author_role: "Spiritual Guide",
        category: "Spiritual",
        is_active: true,
        published: true,
        updated_at: new Date().toISOString()
      };

      if (existing && existing.id) {
        upsertData.id = existing.id;
        console.log(`🔄 Matching existing ID for ${blog.slug}: ${upsertData.id}`);
      } else {
        upsertData.id = crypto.randomUUID();
        upsertData.created_at = new Date().toISOString();
        console.log(`✨ Assigning NEW UUID for ${blog.slug}: ${upsertData.id}`);
      }

      const { error } = await supabase
        .from('Final_blog')
        .upsert(upsertData, { onConflict: 'slug' });

      if (error) {
        console.error(`❌ Error upserting ${blog.slug}:`, error.message);
        if (error.details) console.error(`   Details: ${error.details}`);
      } else {
        console.log(`✅ Success: ${blog.slug}`);
        totalUpserted++;
      }
    }
  }

  console.log(`\n🏆 MISSION COMPLETE! Successfully resurrected ${totalUpserted} blogs.`);
}

importResurrection();
