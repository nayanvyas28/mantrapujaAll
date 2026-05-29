require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkLeft() {
  const { data: blogs, error } = await supabase
    .from('Final_blog')
    .select('id, slug, title, blog_content, content');

  if (error) {
    console.error("❌ Scan Error:", error);
    return;
  }

  const healthySlugs = new Set();
  const brokenSlugs = new Set();

  for (const blog of blogs) {
    let isBroken = false;

    if (!blog.title || !blog.slug) {
      isBroken = true;
    }

    const rawContent = blog.blog_content || blog.content;
    if (!rawContent) {
      isBroken = true;
    } else {
      try {
        const parsed = (typeof rawContent === 'string') ? JSON.parse(rawContent) : rawContent;
        if (!parsed || (!parsed.sections && !parsed.introduction)) {
          isBroken = true;
        } else {
          let fullText = "";
          if (parsed.sections) parsed.sections.forEach(s => fullText += (s.content || ""));
          if (parsed.introduction) fullText += parsed.introduction;
          
          if (fullText.length < 150) { 
            isBroken = true;
          }
        }
      } catch (e) {
        isBroken = true;
      }
    }

    if (isBroken) {
      brokenSlugs.add(blog.slug);
    } else {
      healthySlugs.add(blog.slug);
    }
  }

  const actuallyBroken = [...brokenSlugs].filter(slug => !healthySlugs.has(slug));
  
  require('fs').writeFileSync('src/app/brain/remaining_slugs.json', JSON.stringify(actuallyBroken, null, 2));
  console.log(`Saved ${actuallyBroken.length} slugs to remaining_slugs.json`);
}

checkLeft();
