
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CATEGORIES = [
  { name: "Astrology & Predictions", slug: "astrology-predictions" },
  { name: "Puja & Rituals", slug: "puja-rituals" },
  { name: "Sacred Places & Yatra", slug: "sacred-places-yatra" },
  { name: "Devta & Divine Knowledge", slug: "devta-divine-knowledge" },
  { name: "Scriptures & Ancient Wisdom", slug: "scriptures-ancient-wisdom" },
  { name: "Life Guidance & Problems", slug: "life-guidance-problems" },
  { name: "Devotional Culture", slug: "devotional-culture" }
];

async function seed() {
  console.log("Seeding categories...");
  for (const cat of CATEGORIES) {
    const { data, error } = await supabase
      .from('blog_categories')
      .upsert(cat, { onConflict: 'name' });
    
    if (error) {
      console.error(`Failed to seed ${cat.name}:`, error.message);
    } else {
      console.log(`Successfully seeded ${cat.name}`);
    }
  }
}

seed();
