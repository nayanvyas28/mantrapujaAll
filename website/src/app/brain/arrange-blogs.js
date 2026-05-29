
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function categorizeBlogs() {
  console.log("🛠️  Categorizing Unarranged Blogs...");

  const { data: uncategorized } = await supabase
    .from('Final_blog')
    .select('id, slug, title')
    .or('category.is.null,category.eq."",category.eq.Uncategorized');

  if (!uncategorized || uncategorized.length === 0) {
    console.log("✅ No uncategorized blogs left.");
    return;
  }

  console.log(`- Found ${uncategorized.length} blogs to arrange.`);

  const keywordGroups = {
    'Rituals & Festivals': ['puja', 'festival', 'vrat', 'holi', 'diwali', 'navratri', 'celebration', 'rituals', 'jatara'],
    'Gods & Deities': ['shiva', 'krishna', 'rama', 'hanuman', 'ganesha', 'durga', 'vishnu', 'lakshmi', 'shakti', 'mahakal', 'mata', 'god'],
    'Places & Temples': ['temple', 'river', 'kashi', 'varanasi', 'amritsar', 'ayodhya', 'pilgrimage', 'ghat', 'yatra', 'abode', 'kshetra'],
    'Philosophy & Texts': ['tantra', 'yoga', 'mantra', 'chalisa', 'scripture', 'philosophy', 'bhajan', 'om', 'verse'],
    'Culture & Traditions': ['customs', 'tradition', 'culture', 'heritage', 'maharashtra', 'india', 'rite', 'journey']
  };

  let totalUpdated = 0;

  for (const blog of uncategorized) {
    let category = 'Spiritual'; // Default
    const titleLower = (blog.title || '').toLowerCase();
    const slugLower = (blog.slug || '').toLowerCase();
    
    for (const [group, keywords] of Object.entries(keywordGroups)) {
      if (keywords.some(kw => titleLower.includes(kw) || slugLower.includes(kw))) {
        category = group;
        break;
      }
    }

    const { error } = await supabase
      .from('Final_blog')
      .update({ category })
      .eq('id', blog.id);

    if (error) {
      console.error(`❌ Error updating ${blog.slug}:`, error.message);
    } else {
      totalUpdated++;
    }
  }

  console.log(`\n✅ Successfully arranged ${totalUpdated} blogs into proper categories.`);
}

categorizeBlogs();
