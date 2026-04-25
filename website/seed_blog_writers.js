
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const AUTHORS = [
  { name: "Pandit Rajesh Sharma", role: "Head Priest", avatar: "https://ui-avatars.com/api/?name=Rajesh+Sharma&background=f97316&color=fff&bold=true", bio: "Renowned Vedic scholar with 20+ years of experience in performing sacred rituals." },
  { name: "Acharya Meera Iyer", role: "Senior Astrologer", avatar: "https://ui-avatars.com/api/?name=Meera+Iyer&background=8b5cf6&color=fff&bold=true", bio: "Expert in Jyotish Shastra and planetary transits helping devotees find their path." },
  { name: "Dr. Ananya Deshmukh", role: "Vedic Scholar", avatar: "https://ui-avatars.com/api/?name=Ananya+Deshmukh&background=059669&color=fff&bold=true", bio: "Ph.D. in Sanskrit Scriptures, focusing on the scientific aspects of ancient mantras." },
  { name: "Swami Vishwananda", role: "Spiritual Guide", avatar: "https://ui-avatars.com/api/?name=Swami+Vishwananda&background=dc2626&color=fff&bold=true", bio: "Dedicated to spreading spiritual awareness through meditation and yogic practices." },
  { name: "Guru Ji Navneet", role: "Spiritual Mentor", avatar: "https://ui-avatars.com/api/?name=Guru+Ji+Navneet&background=ea580c&color=fff&bold=true", bio: "Founder and mentor, guiding the platform's vision towards universal spiritual growth." }
];

async function seed() {
  console.log("Seeding writers (Safe Mode)...");
  for (const author of AUTHORS) {
    // Check if exists first
    const { data: existing } = await supabase.from('blog_authors').select('id').eq('name', author.name).single();
    
    if (existing) {
      console.log(`${author.name} already exists, updating...`);
      await supabase.from('blog_authors').update(author).eq('id', existing.id);
    } else {
      console.log(`Inserting ${author.name}...`);
      await supabase.from('blog_authors').insert([author]);
    }
  }
  console.log("Writers seeding completed!");
}

seed();
