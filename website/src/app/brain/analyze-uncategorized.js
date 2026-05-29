
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function analyzeUncategorized() {
  console.log("🧐 Analyzing 426 Uncategorized Blogs...");

  const { data: uncategorized } = await supabase
    .from('Final_blog')
    .select('slug, title')
    .or('category.is.null,category.eq."",category.eq.Uncategorized');

  if (!uncategorized) {
    console.log("No uncategorized blogs found.");
    return;
  }

  const keywordGroups = {
    'Rituals & Festivals': ['puja', 'festival', 'vrat', 'holi', 'diwali', 'navratri', 'celebration', 'rituals'],
    'Gods & Deities': ['shiva', 'krishna', 'rama', 'hanuman', 'ganesha', 'durga', 'vishnu', 'lakshmi'],
    'Places & Temples': ['temple', 'river', 'kashi', 'varanasi', 'amritsar', 'ayodhya', 'pilgrimage', 'ghat'],
    'Philosophy & Texts': ['tantra', 'yoga', 'mantra', 'chalisa', 'scripture', 'philosophy', 'bhajan'],
    'Culture & Traditions': ['customs', 'tradition', 'culture', 'heritage', 'maharashtra', 'india']
  };

  const results = {};
  Object.keys(keywordGroups).forEach(k => results[k] = []);
  results['Others'] = [];

  uncategorized.forEach(blog => {
    let assigned = false;
    const titleLower = (blog.title || '').toLowerCase();
    const slugLower = (blog.slug || '').toLowerCase();
    
    for (const [group, keywords] of Object.entries(keywordGroups)) {
      if (keywords.some(kw => titleLower.includes(kw) || slugLower.includes(kw))) {
        results[group].push(blog.slug);
        assigned = true;
        break;
      }
    }
    if (!assigned) results['Others'].push(blog.slug);
  });

  for (const [group, blogs] of Object.entries(results)) {
    console.log(`\n📂 Group: ${group} (${blogs.length} blogs)`);
    console.log(`  First 10: ${blogs.slice(0, 10).join(', ')}`);
  }
}

analyzeUncategorized();
