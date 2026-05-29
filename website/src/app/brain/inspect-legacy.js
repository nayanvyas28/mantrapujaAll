
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspectLegacy() {
  const missing = [
    'achyuta-the-unwavering-an-exploration',
    'aditi-the-boundless-vedic-mother-goddess',
    'krishna-unveiling-divinity-philosophy-and-culture',
    'krishna-unveiling-the-divine-essence-and-teachings',
    'krishna-unveiling-the-divine-essence-of-love-and-wisdom',
    'krishna-unveiling-the-divine-in-hindu-tradition',
    'rama-the-embodiment-of-dharma-and-ideal-king',
    'shiva-the-destroyer-and-transformer'
  ];

  console.log("Checking legacy content for 8 missing slugs...");
  const { data: legacyBlogs } = await supabase
    .from('blogs')
    .select('*')
    .in('slug', missing);

  legacyBlogs.forEach(b => {
    const hasContent = b.blog_content || b.content;
    console.log(`- ${b.slug}: ${hasContent ? 'HAS CONTENT' : 'EMPTY'}`);
  });
}

inspectLegacy();
