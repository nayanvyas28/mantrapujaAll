
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function integrityScan() {
  console.log("🔍 Launching Data Integrity Scanner (2,140 Blogs)...");
  
  // Audited Schema: id, slug, title, blog_content, content
  const { data: blogs, error } = await supabase
    .from('Final_blog')
    .select('id, slug, title, blog_content, content');

  if (error) {
    console.error("❌ Scan Error:", error);
    return;
  }

  let totalBroken = 0;
  let missingContent = 0;
  let malformedJson = 0;
  let missingMetadata = 0;
  let tooShort = 0;

  const brokenList = [];

  for (const blog of blogs) {
    let isBroken = false;
    let reason = "";

    // 1. Check for Missing Metadata
    if (!blog.title || !blog.slug) {
      isBroken = true;
      reason = "Missing Title or Slug";
      missingMetadata++;
    }

    // 2. Check for Missing Content
    const rawContent = blog.blog_content || blog.content;
    if (!rawContent) {
      isBroken = true;
      reason = "Empty Content Fields";
      missingContent++;
    } else {
      // 3. Check for Malformed JSON
      try {
        const parsed = (typeof rawContent === 'string') ? JSON.parse(rawContent) : rawContent;
        if (!parsed || (!parsed.sections && !parsed.introduction)) {
          isBroken = true;
          reason = "No Valid Structure (Sections/Intro)";
          malformedJson++;
        } else {
          // 4. Check for Content Length (Too Short)
          let fullText = "";
          if (parsed.sections) parsed.sections.forEach(s => fullText += (s.content || ""));
          if (parsed.introduction) fullText += parsed.introduction;
          
          if (fullText.length < 150) { 
            isBroken = true;
            reason = "Content Too Short (< 150 chars)";
            tooShort++;
          }
        }
      } catch (e) {
        isBroken = true;
        reason = "Invalid JSON Format";
        malformedJson++;
      }
    }

    if (isBroken) {
      totalBroken++;
      brokenList.push({ id: blog.id, slug: blog.slug, title: blog.title, reason });
    }
  }

  console.log("\n🛡️  DATA INTEGRITY REPORT");
  console.log("━━━━━━━━━━━━━━━━━━━━━");
  console.log(`✅ Healthy Entries: ${blogs.length - totalBroken}`);
  console.log(`❌ Total Broken Entries: ${totalBroken}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━");
  console.log(`- Missing Content: ${missingContent}`);
  console.log(`- Malformed/No Structure: ${malformedJson}`);
  console.log(`- Missing Meta (Title/Slug): ${missingMetadata}`);
  console.log(`- Too Short (Incomplete): ${tooShort}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━\n");

  if (brokenList.length > 0) {
    console.log("🚩 FIRST 20 BROKEN ENTRIES:");
    brokenList.slice(0, 20).forEach(b => console.log(`- [${b.reason}] ${b.title || 'UNTITLED'} (${b.slug || 'no-slug'})`));
  }
}

integrityScan();
